import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import { Gap, Input } from '../..';
import { muiRedButton } from '../../../utils';

const Register = ({ isOpen, setIsOpen }) => {
    const handleClose = () => setIsOpen(false)

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
                            <Typography variant="h2" component="div">Sign in</Typography>
                            <Gap height={29} />
                            <Input type="email" placeholder="Email" />
                            <Gap height={20} />
                            <Input type="password" placeholder="Password" />
                            <Gap height={20} />
                            <Input placeholder="Full Name" />
                            <Gap height={20} />
                            <Input placeholder="Gender" />
                            <Gap height={20} />
                            <Input placeholder="Phone" />
                            <Gap height={20} />
                            <Input placeholder="Address" />
                            <Gap height={36} />
                            <Button variant="contained" sx={submitBtn}>sign in</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default Register
