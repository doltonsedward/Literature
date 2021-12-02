import { DialogTitle, DialogContent } from "../.."

import { 
    Button,
    Dialog,
    DialogActions,
} from "@mui/material"

const DialogAddLiterature = ({ fullScreen, open, setOpen, onAgree, onDisagree }) => {
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
            aria-labelledby="responsive-dialog-addliterature-title"
        >
            <DialogTitle id="responsive-dialog-addliterature-title">Add literature ?</DialogTitle>
            <DialogContent>
                You can check again and postpone by pressing the cancel button to add literature if you are not sure
            </DialogContent>
            <DialogActions>
            <Button autoFocus sx={confirmButton} onClick={onDisagree}>
                Cancel
            </Button>
            <Button sx={confirmButton} onClick={onAgree} autoFocus>
                Add literature
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogAddLiterature
