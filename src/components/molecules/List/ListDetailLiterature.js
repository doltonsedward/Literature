import { iconDownload } from "../../../assets"

import { Typography, Button } from '@mui/material'

const ListDetailLiterature = ({ data, onDownload, numPages }) => {
    return (
        <ul>
            <li>
                <Typography variant="h1" component="h1" className="title">{data?.title}</Typography>
                <Typography variant="subtitle2" component="p">{data?.author}</Typography>
            </li>
            <li>
                <Typography variant="subtitle1" component="h2" className="body">Publication Date</Typography>
                <Typography variant="subtitle2" component="p">{data?.publication_date}</Typography>
            </li>
            <li>
                <Typography variant="subtitle1" component="h2" className="body">Pages</Typography>
                <Typography variant="subtitle2" component="p">{numPages}</Typography>
            </li>
            <li>
                <Typography variant="subtitle1" component="h2" className="body isbn">ISBN</Typography>
                <Typography variant="subtitle2" component="p">{data?.ISBN}</Typography>
            </li>
            <li>
                <Button variant="contained" onClick={onDownload}>download <img src={iconDownload} alt="download your literature here" /></Button>
            </li>
        </ul>
    )
}

export default ListDetailLiterature
