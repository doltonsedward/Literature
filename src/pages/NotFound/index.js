import './NotFound.scss'
import { Button, Typography } from "@mui/material"
import { Header } from "../../components"
import { useHistory } from 'react-router'

const NotFound = () => {
    const history = useHistory()

    return (
        <>
            <Header />
            <div className="notfound-pages literature-default-padding">
                <Typography>Oopss, maybe you access the wrong address</Typography>
                <Button variant="contained" onClick={()=> history.goBack()}>Go back</Button>
            </div>
        </>
    )
}

export default NotFound
