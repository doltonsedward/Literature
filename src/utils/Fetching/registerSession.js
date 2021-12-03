import { toast } from 'react-toastify'
import store from "../../store"

// import API
import { API } from "../../config"

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

export default registerSession