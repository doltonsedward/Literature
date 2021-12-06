import React, { useState } from 'react'

// MUI component
import { 
    Typography,
    Modal,
    Backdrop,
    Box,
    Fade,
    Button,
} from '@mui/material';

import { Gap, Input, GoogleLoginBtn, MuiAlert } from '../..'
import { registerStyle, handleChange, registerSession } from '../../../utils'

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

    const handler = {
        handleRegister: ()=> registerSession(form, setOpen, setMessage, setSeverity),
        handleCloseRegister: ()=> setOpen(false),
        handleClose: ()=> setIsOpen(false),
        onInputChange: (e) => handleChange(e, form, setForm)
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpen}
                onClose={handler.handleClose}
                disableScrollLock={true}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
            >
                <Fade in={isOpen}>
                    <Box sx={registerStyle.wrapper}>
                        <Box sx={{ padding: '41px 33px 37px', borderRadius: '5px' }}>
                            <Typography variant="h2" component="div">Sign up</Typography>
                            <Gap height={29} />
                            <Input type="email" name="email" value={form.email} onChange={handler.onInputChange} placeholder="Email" />
                            <Gap height={20} />
                            <Input type="password" name="password" value={form.password} onChange={handler.onInputChange} placeholder="Password" />
                            <Gap height={20} />
                            <Input name="fullName" value={form.fullName} onChange={handler.onInputChange} placeholder="Full Name" />
                            <Gap height={20} />
                            <Input name="gender" value={form.gender} onChange={handler.onInputChange} placeholder="Gender" />
                            <Gap height={20} />
                            <Input name="phone" value={form.phone} onChange={handler.onInputChange} placeholder="Phone" />
                            <Gap height={20} />
                            <Input name="address" value={form.address} onChange={handler.onInputChange} variant="field" placeholder="Address" />
                            <Gap height={36} />
                            <Button variant="contained" sx={registerStyle.submitBtn} onClick={handler.handleRegister}>Sign up</Button>
                            {/* <Typography variant="subtitle1" component="p" style={registerStyle.textStyles}>or</Typography>
                            <GoogleLoginBtn setMessage={setMessage} setSeverity={setSeverity} /> */}
                        </Box>
                    </Box>
                </Fade>
            </Modal>

            <MuiAlert 
                open={open} 
                severity={severity} 
                message={message} 
                closeButton={handler.handleClose}
                closeAlert={handler.handleCloseRegister}
            />
        </div>
    )
}

export default Register
