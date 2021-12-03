import { Gap } from "../.."
import { toast } from 'react-toastify'

// import MUI component
import { 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Input,
    useMediaQuery,
    useTheme
} from "@mui/material"

const DialogDetailLiterature = ({ author, open, setOpen, onAgree, onDisagree, onCheckInput, inputMakeSure }) => {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

    const confirmButton = {
        color: '#1e74c9',
        '&:hover': {
           backgroundColor: 'rgba(46, 190, 209, .15)' 
        }
    }
    
    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="responsive-dialog-detailliterature-title"
        >
            <DialogTitle id="responsive-dialog-detailliterature-title">
                {"Delete literature ?"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                <p>When you delete this literature, nothing will be returned. deletion will be permanent. Do it wisely</p>
                <Gap height={5} />
                <p>Type this <b>{author}</b></p>
                <Gap height={10} />
                <Input fullWidth color="success" onChange={onCheckInput} aria-label="description" />
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button autoFocus sx={confirmButton} onClick={onDisagree}>
                Cancel
            </Button>
            {
                author === inputMakeSure ?
                <Button sx={confirmButton} onClick={onAgree} autoFocus>
                    Delete literature
                </Button>
                :
                <Button sx={confirmButton} onClick={()=> toast.error('Wrong input')} autoFocus>
                    Delete literature
                </Button>
            }
            </DialogActions>
        </Dialog>
    )
}

export default DialogDetailLiterature
