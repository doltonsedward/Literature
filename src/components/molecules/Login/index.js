import './_Login.scss'
import { Gap, Input } from '../..';
import { muiWhiteButton, pushNotif } from '../../../utils';
import store from '../../../store';

// MUI component
import * as React from 'react';
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

// import API
import { API } from '../../../config/API'

const Login = ({ isOpen, setIsOpen }) => {
    const [open, setOpen] = React.useState(false)
    const [message, setMessage] = React.useState('Loading..')
    const [severity, setSeverity] = React.useState('success')

    const [form, setForm] = React.useState({
        email: "",
        password: ""
    })

    const handleCloseLogin = () => setOpen(false)
    
    const handleClose = () => setIsOpen(false)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const loginSession = async () => {
        setOpen(true)
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            }

            const body = JSON.stringify(form)

            const response = await API.post('/login', body, config)

            if (response?.status === 200) {
                store.dispatch({ 
                    type: 'LOGIN', 
                    payload: response.data.user
                })    

                pushNotif({
                    title: 'Login successfully',
                    message: 'Welcome back user'
                })
            }
            
        } catch (error) {
            console.log(error)
            setMessage('Email or password are incorrect')
            setSeverity('error')
        }
    }

    
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
    }

    const submitBtn = {
        ...muiWhiteButton,
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
                            <Typography variant="h2" component="div">Sign in</Typography>
                            <Gap height={29} />
                            <Input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
                            <Gap height={20} />
                            <Input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />
                            <Gap height={36} />
                            <Button variant="contained" sx={submitBtn} onClick={loginSession}>sign in</Button>
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
                onClose={handleCloseLogin}
                action={action}
            >
                <Alert onClose={handleCloseLogin} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Login
