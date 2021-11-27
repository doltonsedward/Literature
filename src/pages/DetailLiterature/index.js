import './DetailLiterature.scss'
import { API } from '../../config/API'
import { downloadPDF, pushNotif } from '../../utils'
import { Header } from '../../components'

// MUI component
import { Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { iconCollection, iconDownload } from '../../assets'

const DetailLiterature = () => {
    const { literature_id } = useParams()

    const [literature, setLiterature] = useState({})

    const getLiterature = async (req, res) => {
        try {
            const response = await API.get('/literature/' + literature_id)

            setLiterature(response.data.literature)
        } catch (error) {
            const status = error.response.data.status
            const message = error.response.data.message
            pushNotif({
                title: status,
                message
            })
        }
    }

    const handleCollection = async () => {
        try {
            await API.post('/collection/' + literature_id)
            
            const status = 'Success'
            pushNotif({
                title: status,
                message: `${literature.title} add to collection`
            }, status)
        } catch (error) {
            pushNotif({
                title: 'Error',
                message: 'Unknow error'
            })
        }
    }

    const download = () => {
        downloadPDF(literature.attache, String(literature.title))
        const status = 'Success'
        pushNotif({
            title: status,
            message: 'Download literature finished',
        }, status)
    }

    useEffect(() => {
        getLiterature()
    }, [])
    
    return (
        <>
            <Header />
            <div className="detail-literature literature-default-padding">
                <div className="section-one">
                    {literature?.attache && <embed src={literature?.attache} />}
                    <ul>
                        <li>
                            <Typography variant="h1" component="h1" className="title">{literature?.title}</Typography>
                            <Typography variant="subtitle2" component="p">{literature?.author}</Typography>
                        </li>
                        <li>
                            <Typography variant="subtitle1" component="h2" className="body">Publication Date</Typography>
                            <Typography variant="subtitle2" component="p">{literature?.publication_date}</Typography>
                        </li>
                        <li>
                            <Typography variant="subtitle1" component="h2" className="body">Pages</Typography>
                            <Typography variant="subtitle2" component="p">{literature?.pages}</Typography>
                        </li>
                        <li>
                            <Typography variant="subtitle1" component="h2" className="body isbn">ISBN</Typography>
                            <Typography variant="subtitle2" component="p">{literature?.pages}</Typography>
                        </li>
                        <li>
                            <Button variant="contained" onClick={download}>download <img src={iconDownload} alt="download your literature here" /></Button>
                        </li>
                    </ul>
                </div>
                <div className="section-two">
                    <Button variant="contained" onClick={handleCollection}>add to collection <img src={iconCollection} alt="add to your collection" /></Button>
                </div>
            </div>
        </>
    )
}

export default DetailLiterature
