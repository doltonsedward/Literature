import { 
    Button,
    Snackbar,
    IconButton,
    Alert
} from '@mui/material'

const MuiAlert = ({ open, severity, message, closeButton, closeAlert }) => {
    const action = (
        <>
            <Button color="secondary" size="small" onClick={closeButton}>
                CLOSE
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={closeButton}
            >
            </IconButton>
        </>
    )
    
    return (
        <Snackbar sx={{
            position: 'fixed',
            bottom: 0,
            zIndex: 99999999999,
            transform: 'translate(50px, -25px) scale(1.2)'
        }}
            open={open}
            autoHideDuration={6000}
            onClose={closeAlert}
            action={action}
        >
            <Alert onClose={closeAlert} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default MuiAlert
