import { toast } from 'react-toastify'
import store from "../../store"

// import API
import { API } from "../../config"

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

export default loginSession