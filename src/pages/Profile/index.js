import './_Profile.scss'
import { BoxProfle, Gap, Header, ProfileFAQ } from '../../components'
import { API, checkUser } from '../../config'
import { muiWhiteButton, pushNotif } from '../../utils'
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

    // MUI logic
    const handleClickOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };
    // close 

    useEffect(()=> {
        getOwnerLiterature()
    }, [])

    const handleSubmit = async () => {
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
                    <Button variant="contained" sx={muiWhiteButton} onClick={handleSubmit}>save</Button>
                    <HelpOutlineIcon sx={{ marginLeft: 1, cursor: 'pointer' }} onClick={handleClickOpen} />
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

                <ProfileFAQ openModal={openModal} handleClose={handleClose} />
                <Gap height={75} />
            </div>
        </>
    )
}

export default Profile
