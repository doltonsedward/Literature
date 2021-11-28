import React, { useState, forwardRef } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { 
    Button, 
    Typography,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Slide,
    Accordion,
    AccordionDetails,
    AccordionSummary
} from '@mui/material'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const ProfileFAQ = ({ openModal, handleClose }) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    return (
        <Dialog
            fullScreen
            open={openModal}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative', background: 'var(--primary)' }}>
                <Toolbar>
                    <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    >
                    <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Profile FAQ
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose} sx={{ '&:hover': { background: 'rgba(225,225,225,.17)' } }}>
                        oke, got it
                    </Button>
                </Toolbar>
            </AppBar>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    How i can edit profile?
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>You can edit profile, but first read this FAQ</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        To be able to edit your profile, first press the edit button then make sure you have at least changed your avatar
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>How can I save changes to the profile?</Typography>
                <Typography sx={{ color: 'text.secondary' }}>Click the save button</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        You can save changes to your profile by pressing the save button but only if you have changed your avatar. 
                        Don't worry, your data is safe. 
                        If you press the save button but don't change your avatar, there will be a notification that you must upload an image first
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Dialog>
    )
}

export default ProfileFAQ
