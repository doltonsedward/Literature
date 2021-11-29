// import API
import { API, checkUser } from "../../config"

import { pushNotif } from ".."
import store from "../../store"

const registerSession = async (data, setOpen, setMessage, setSeverity) => {
    setOpen(true)
    
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }

        const body = JSON.stringify(data)

        const response = await API.post('/register', body, config)

        if (response?.status === 200) {
            setMessage('Register Success')
            setSeverity('success')
        } 
    } catch (error) {
        const messageError = error?.response?.data?.error?.message || error.response.data.message
        setMessage(messageError)
        setSeverity('error')
    }
}

const loginSession = async (data, setOpen, setMessage, setSeverity, setLoading) => {
    setOpen(true)
    setLoading(true)
    
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }

        const body = JSON.stringify(data)

        const response = await API.post('/login', body, config)

        if (response?.status === 200) {
            setTimeout(()=> {
                setLoading(false)

                store.dispatch({ 
                    type: 'LOGIN', 
                    payload: response.data.user
                })    

                pushNotif({
                    title: 'Login successfully',
                    message: 'Welcome to literature'
                }, 'success')
            }, 1000)
        } 
        
    } catch (error) {
        setTimeout(()=> {
            setLoading(false)

            const message = error?.response?.data.message || error?.response?.data?.error.message
            setMessage(message)
            setSeverity('error')
        }, 1000)

    }
}

const saveProfile = async (form, editable, setEditable) => {
    try {
        if (typeof form.avatar === 'object') {
            const formData = new FormData()
            formData.set('email', form.email)
            formData.set('phone', form.phone)
            formData.set('gender', form.gender)
            formData.set('address', form.address)
            formData.set('avatar', form.avatar[0], form.avatar[0].filename)

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            const body = formData

            const response = await API.patch('/user', body, config)

            pushNotif({
                title: response?.data.status,
                message: response?.data.message
            }, 'success')
        } else {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const body = form

            const response = await API.patch('/user/specific', body, config)

            pushNotif({
                title: response?.data.status,
                message: response?.data.message
            }, 'success')
        }

        checkUser()
        setEditable(!editable)
    } catch (error) {
        console.log(error)
        if (!editable) {
            return pushNotif({
                title: "Error",
                message: "Click the edit button first"
            })
        }

        pushNotif({
            title: "Error",
            message: "You must upload photo first"
        })
    }
}

export { registerSession, loginSession, saveProfile }