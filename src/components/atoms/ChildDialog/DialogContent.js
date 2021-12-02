import { DialogContent as Content, DialogContentText } from "@mui/material"

const DialogContent = ({ children }) => {
    return (
        <Content>
            <DialogContentText>
                {children}
            </DialogContentText>
        </Content>
    )
}

export default DialogContent