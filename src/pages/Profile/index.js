import './_Profile.scss'
import { BoxProfle, Gap, Header, ProfileFAQ } from '../../components'
import { API, checkUser } from '../../config'
import { muiWhiteButton, pushNotif, saveProfile } from '../../utils'
import { imgBlank, pdfStyle } from '../../assets'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

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
            const status = error?.response?.data.status
            const message = error?.response?.data.message
            pushNotif({
                title: status,
                message
            })
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
    const newMuiRedButton = {
        marginRight: '10px'
    }
    
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
                {
                    ownerLiterature.length ?
                    <ul className="list-owner-literature">
                        {ownerLiterature?.map((item, i) => {
                            return (
                                <li key={i}>
                                    <Document
                                        file={item.attache}
                                        className={pdfStyle.pdfreader}
                                        loading="Loading.."
                                    >
                                        <Page 
                                            pageNumber={1} 
                                            renderTextLayer={false}
                                        />
                                    </Document>
                                    <Typography variant="h2" component="h2" className="title">{item.title}</Typography>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="subtitle1" component="p" className="body">{item.author}</Typography>
                                        <Typography variant="subtitle1" component="p" className="body">{item.publication_date}</Typography>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    :
                    <div className="blank-image">
                        <img src={imgBlank} alt="your literature is empty, get a rest" />
                        <Typography variant="subtitle1" component="p" className="cover-empty-image">Your literature is empty right now</Typography>
                    </div>
                }

                <ProfileFAQ openModal={openModal} handleClose={handler.handleClose} />
                <Gap height={75} />
            </div>
        </>
    )
}

export default Profile
