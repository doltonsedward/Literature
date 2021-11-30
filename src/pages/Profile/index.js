import './_Profile.scss'
import { BoxProfle, Gap, Header, ProfileFAQ, TabsProfile } from '../../components'
import { API } from '../../config'
import { muiWhiteButton, saveProfile } from '../../utils'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

// MUI component
import React, { useEffect } from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

import { 
    Button, 
    Typography
} from '@mui/material'

const Profile = () => {
    console.clear()
    const currentState = useSelector(state => state)
    const { email, phone, address, gender, avatar } = currentState?.user

    const [openModal, setOpenModal] = useState(false)
    const [ownerLiterature, setOwnerLiterature] = useState([])
    const [preview, setPreview] = useState(avatar)
    const [editable, setEditable] = useState(false)
    const [form, setForm] = useState({
        email,
        phone, 
        address,
        gender,
        avatar
    })
    
    const getOwnerLiterature = async () => {
        try {
            const response = await API.get('/profile/' + currentState.user.id + '/literature')
            
            setOwnerLiterature(response?.data.literatures)
        } catch (error) {
            const message = error.response.data.message || 'Unknow error'
            toast.error(message)
        }
    }
    
    useEffect(()=> {
        getOwnerLiterature()
    }, [])
    
    const handler = {
        handleSaveProfile: ()=> saveProfile(form, editable, setEditable),
        handleClickOpen: ()=> setOpenModal(true),
        handleClose: ()=> setOpenModal(false),
    }

    // styling
    const newMuiRedButton = { marginRight: '10px' }
    
    return (
        <>
            <Header activeIn="profile" />
            <div className="profile literature-default-padding">
                <Typography variant="h2" component="div" className="heading">Profile</Typography>
                <Gap height={39} />

                <div className="wrapper-action-button">
                    <Button variant="contained" sx={newMuiRedButton} onClick={()=> setEditable(!editable)}>edit</Button>
                    <Button variant="contained" sx={muiWhiteButton} onClick={handler.handleSaveProfile}>save</Button>
                    <HelpOutlineIcon sx={{ marginLeft: 1, cursor: 'pointer' }} onClick={handler.handleClickOpen} />
                </div>
                <BoxProfle editable={editable} form={form} preview={preview} setForm={setForm} setPreview={setPreview} />
                <Gap height={61} />

                <Typography variant="h1" component="h1" className="heading">My Literature</Typography>
                <Gap height={41} />
                <Typography variant="subtitle1" component="p">
                    Total {ownerLiterature.length} all literature
                </Typography>
                <TabsProfile data={ownerLiterature} />

                <ProfileFAQ openModal={openModal} handleClose={handler.handleClose} />
                <Gap height={20} />
            </div>
        </>
    )
}

export default Profile
