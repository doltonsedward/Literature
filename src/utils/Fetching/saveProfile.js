import { toast } from 'react-toastify'

// import API
import { API, checkUser } from "../../config"

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

export default saveProfile