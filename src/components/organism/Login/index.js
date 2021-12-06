import './_Login.scss'
import { Gap, GoogleLoginBtn, Input, MuiAlert } from '../..';
import { loginStyle, loginSession } from '../../../utils';

// MUI component
import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { 
    Typography,
    Modal,
    Backdrop,
    Box,
    Fade
} from '@mui/material';

const Login = ({ isOpen, setIsOpen }) => {
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [message, setMessage] = React.useState('Loading..')
    const [severity, setSeverity] = React.useState('info')

    const [form, setForm] = React.useState({
        email: "",
        password: ""
    })

    const handler = {
        handleLogin: ()=> loginSession(form, setOpen, setMessage, setSeverity, setLoading),
        handleCloseLogin: ()=> setOpen(false),
        handleClose: ()=> setIsOpen(false),
        handleChange: e => {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        },
        handleEnterPressed: (e) => {
            if (e.keyCode === 13) {
                this.handleLogin()
            }
        }
    }
    
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpen}
                onClose={handler.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
            >
                <Fade in={isOpen}>
                    <Box sx={loginStyle.wrapper}>
                        <Box sx={{ padding: '41px 33px 37px', borderRadius: '5px' }}>
                            <Typography variant="h2" component="div">Sign in</Typography>
                            <Gap height={29} />
                            <Input name="email" value={form.email} onChange={handler.handleChange} placeholder="Email" />
                            <Gap height={20} />
                            <Input type="password" name="password" value={form.password} onChange={handler.handleChange} placeholder="Password" />
                            <Gap height={36} />
                            <LoadingButton
                                onClick={handler.handleLogin}
                                onKeyDown={handler.handleEnterPressed}
                                loading={loading}
                                sx={loginStyle.submitBtn}
                                variant="contained"
                            >
                                sign in
                            </LoadingButton>
                            <GoogleLoginBtn />
                            {/* <Typography variant="subtitle1" component="p" sx={loginStyle.textStyles}>or</Typography> */}
                            {/* <GoogleLoginBtn setMessage={setMessage} setSeverity={setSeverity} /> */}
                        </Box>
                    </Box>
                </Fade>
            </Modal>
            <MuiAlert 
                open={open} 
                severity={severity} 
                message={message} 
                closeButton={handler.handleClose}
                closeAlert={handler.handleCloseLogin}
            />
        </div>
    )
}

export default Login
