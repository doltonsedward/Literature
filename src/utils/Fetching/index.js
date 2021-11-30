import { toast } from 'react-toastify'
import store from "../../store"

// import API
import { API, checkUser } from "../../config"

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
            store.dispatch({ 
                type: 'LOGIN', 
                payload: response.data.user
            }) 
            
            toast.success("Login success, Welcome " + response?.data?.user.fullName)
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

                toast.success("Login success, Welcome " + response?.data?.user.fullName)
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
        if (!editable) return toast.error("Click the edit button first")

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

            toast.success(response?.data.message)
        } else {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const body = form

            const response = await API.patch('/user/specific', body, config)

            toast.success(response?.data.message)
        }

        checkUser()
        setEditable(!editable)
    } catch (error) {
        toast.error("You must upload photo first")
    }
}

export { registerSession, loginSession, saveProfile }