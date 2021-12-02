import { DialogTitle as Title } from "@mui/material"

const DialogTitle = ({ id, children }) => {
    return (
        <Title id={id}>
            {children}
        </Title>
    )
}

export default DialogTitle