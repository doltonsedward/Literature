import './_Profile.scss'
import { BoxProfle, Gap } from '../../components'
import { API } from '../../config'
import { muiRedButton, muiWhiteButton } from '../../utils'
import { useState } from 'react'
import { useSelector } from 'react-redux'

// MUI component
import { Button, Typography } from '@mui/material'

const Profile = () => {
    const currentState = useSelector(state => state)
    const { email, phone, address, gender, avatar } = currentState?.user

    const [preview, setPreview] = useState(avatar)
    const [editable, setEditable] = useState(false)
    const [form, setForm] = useState({
        email,
        phone, 
        address,
        gender,
        avatar
    })
    
    const newMuiRedButton = {
        ...muiRedButton,
        marginRight: '10px'
    }

    console.log(form)

    const handleSubmit = async () => {
        try {
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

            await API.patch('/user', body, config)
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="profile literature-default-padding">
            <Typography variant="h2" component="div" className="heading">Profile</Typography>
            <Gap height={39} />

            <div className="wrapper-action-button">
                <Button variant="contained" sx={newMuiRedButton} onClick={()=> setEditable(!editable)}>edit</Button>
                <Button variant="contained" sx={muiWhiteButton} onClick={handleSubmit}>post</Button>
            </div>
            <BoxProfle editable={editable} form={form} preview={preview} setForm={setForm} setPreview={setPreview} />
            <Gap height={61} />

            <Typography variant="h2" component="div" className="heading">My Literature</Typography>
        </div>
    )
}

export default Profile
