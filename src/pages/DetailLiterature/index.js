import './DetailLiterature.scss'
import { API } from '../../config/API'
import { downloadPDF, pushNotif } from '../../utils'
import { iconCollection, iconDownload } from '../../assets'
import { Header } from '../../components'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

// PDF render
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

// MUI component
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { 
    Button, 
    Typography 
} from '@mui/material'

const DetailLiterature = () => {
    const { literature_id } = useParams()

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [collection, setCollection] = useState({})
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

    const getCollection = async () => {
        try {
            const response = await API.get('/collection/' + literature_id)

            setCollection(response.data.literature)
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
            const status = 'Success'

            if (collection) {
                await API.delete('/collection/' + collection.id)
                getCollection()
                
                return pushNotif({
                    title: status,
                    message: `${literature.title} remove from collection`
                }, status)
            } else {
                const body = {
                    name: 'Things to do'
                }

                await API.post('/collection/' + literature_id, body)
                getCollection()
                
                return pushNotif({
                    title: status,
                    message: `${literature.title} add to collection`
                }, status)
            }
            
        } catch (error) {
            pushNotif({
                title: 'Error',
                message: 'Unknow error'
            })
        }
    }

    // PDF render session
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }
    // close pdf render

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
        getCollection()
    }, [])
    
    return (
        <>
            <Header />
            <div className="detail-literature literature-default-padding">
                <div className="section-one">
                    <div className="wrapper-pdf">
                        <div className="button-pages" onClick={(e)=> e.stopPropagation()}>
                            <div className="inner-button-pages">
                                <Button 
                                    variant="contained"
                                    className="prev-button btn"
                                    disabled={pageNumber <= 1} 
                                    onClick={previousPage}
                                >
                                    <KeyboardArrowLeftIcon />
                                </Button>
                                <Typography variant="subtitle1" component="span" className="detail">{pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}</Typography>
                                <Button
                                    variant="contained"
                                    className="next-button btn"
                                    disabled={pageNumber >= numPages}
                                    onClick={nextPage}
                                >
                                    <KeyboardArrowRightIcon />
                                </Button>
                            </div>
                        </div>
                        {literature?.attache && (
                            <Document
                                file={literature.attache}
                                onLoadSuccess={onDocumentLoadSuccess}
                                options={{ workerSrc: "/pdf.worker.js" }}
                                className="pdf-reader"
                            >
                                <Page 
                                    pageNumber={pageNumber} 
                                    renderTextLayer={false}
                                />
                            </Document>
                        )}
                    </div>
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
                            <Typography variant="subtitle2" component="p">{numPages}</Typography>
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
                    <Button variant="contained" onClick={handleCollection}>
                        {
                            collection ?
                            <p>remove from collection <BookmarkRemoveIcon className="icon" /></p>
                            :
                            <p>add to collection <img src={iconCollection} className="icon" alt="add to your collection" /></p>
                        } 
                        
                    </Button>
                </div>
            </div>
        </>
    )
}

export default DetailLiterature
