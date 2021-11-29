import React, { useState } from 'react'

// MUI component
import { 
    Typography,
    Modal,
    Backdrop,
    Box,
    Fade,
    Button,
    Snackbar,
    IconButton,
    Alert
} from '@mui/material';

import { Gap, Input } from '../..'
import { muiRedButton } from '../../../utils'

// import API
import { API } from '../../../config/API'

const Register = ({ isOpen, setIsOpen }) => {
    const [open, setOpen] = React.useState(false)
    const [message, setMessage] = React.useState('Loading..')
    const [severity, setSeverity] = React.useState('info')

    const [form, setForm] = useState({
        email: "",
        password: "",
        fullName: "",
        gender: "",
        phone: "",
        address: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const registerSession = async () => {
        setOpen(true)
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            }

            const body = JSON.stringify(form)

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

    const handleCloseRegister = () => setOpen(false)
    
    const handleClose = () => setIsOpen(false)

    // mui logic
    const action = (
        <>
            <Button color="secondary" size="small" onClick={handleClose}>
                CLOSE
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
            </IconButton>
        </>
    )

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'var(--primary)',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const submitBtn = {
        ...muiRedButton,
        width: '100%', 
        height: 50
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
            >
                <Fade in={isOpen}>
                    <Box sx={style}>
                        <Box sx={{ padding: '41px 33px 37px', borderRadius: '5px' }}>
                            <Typography variant="h2" component="div">Sign up</Typography>
                            <Gap height={29} />
                            <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
                            <Gap height={20} />
                            <Input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />
                            <Gap height={20} />
                            <Input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" />
                            <Gap height={20} />
                            <Input name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" />
                            <Gap height={20} />
                            <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
                            <Gap height={20} />
                            <Input name="address" value={form.address} onChange={handleChange} variant="field" placeholder="Address" />
                            <Gap height={36} />
                            <Button variant="contained" sx={submitBtn} onClick={registerSession}>Sign up</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
            <Snackbar sx={{
                position: 'fixed',
                bottom: 0,
                zIndex: 99999999999,
                transform: 'translate(50px, -25px) scale(1.2)'
            }}
                open={open}
                autoHideDuration={6000}
                onClose={handleCloseRegister}
                action={action}
            >
                <Alert onClose={handleCloseRegister} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Register
