import { imgBlank } from '../../../assets'
import { Typography } from "@mui/material"

const BlankImage = () => {
    return (
        <div className="blank-image">
            <img src={imgBlank} alt="your literature is empty, get a rest" />
            <Typography variant="subtitle1" component="p" className="cover-empty-image">Your literature is empty right now</Typography>
        </div>
    )
}

export default BlankImage
