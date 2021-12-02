import './DetailLiterature.scss'
import { API } from '../../config/API'
import { downloadPDF } from '../../utils'
import { iconCollection } from '../../assets'
import { DialogDetailLiterature, Header, ListDetailLiterature } from '../../components'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { toast } from 'react-toastify'

// PDF render
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

// MUI component
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import { 
    useMediaQuery,
    Typography,
    Button
} from '@mui/material'
import { useSelector } from 'react-redux'

const DetailLiterature = () => {
    const history = useHistory()
    const currentState = useSelector(state => state)
    const { literature_id } = useParams()

    // MUI state and logic
    const [openDialog, setOpenDialog] = useState(false)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
    // close

    const [inputMakeSure, setInputMakeSure] = useState('')
    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [collection, setCollection] = useState({})
    const [literature, setLiterature] = useState({})

    const getLiterature = async () => {
        try {
            const response = await API.get('/literature/' + literature_id)

            setLiterature(response.data.literature)
        } catch (error) {
            const message = error.response.data.message || 'Unknow error'
            toast.error(message)
        }
    }

    const getCollection = async () => {
        try {
            const response = await API.get('/collection/' + literature_id)

            setCollection(response.data.literature)
        } catch (error) {
            const message = error?.response?.data.message || 'Unknow error'
            toast.error(message)
        }
    }

    const handleCollection = async () => {
        try {
            if (collection) {
                await API.delete('/collection/' + collection.id)
                getCollection()
                
                toast.success(`${literature.title} remove from collection`)
            } else {
                await API.post('/collection/' + literature_id)
                getCollection()
                
                toast.success(`${literature.title} add to collection`)
            }
            
        } catch (error) {
            const message = error?.response?.data.message || 'Unknow error'
            toast.error(message)
        }
    }

    const handleDeleteLiterature = async () => {
        try {
            const response = await API.delete('/literature/' + literature_id)

            if (response.status === 'success') return toast.success(`${literature.title} delete finished`)
            history.push('/profile')
        } catch (error) {
            toast.error("Unknow error")
        }
    }

    const handler = {
        handleCheckInput: (e) => setInputMakeSure(e.target.value),
        changePage: (offset) => setPageNumber(prevPageNumber => prevPageNumber + offset), // handle when page pdf change
        previousPage: () => handler.changePage(-1), // handle to prev page pdf
        nextPage: ()=> handler.changePage(1), // handle to next page pdf
        onDisagree: ()=> setOpenDialog(false),
        onAgree: ()=> {
            handleDeleteLiterature()
            setOpenDialog(false)
        },
        // handle when pdf render
        onDocumentLoadSuccess: ({ numPages }) => {
            setNumPages(numPages)
            setPageNumber(1)
        },
        download: () => {
            downloadPDF(literature.attache, String(literature.title))
            toast.success("Download literature finished")
        }
    }

    useEffect(() => {
        getLiterature()
        getCollection()
    }, [])

    const buttonAuthor = {
        color: 'lightblue',
        border: '1px solid lightblue',
        '&:hover': {
            border: '1px solid lightblue',
            opacity: '.7'
        }
    }

    const buttonDelete = {
        color: 'var(--warning)',
        border: '1px solid var(--warning)',
        '&:hover': {
            border: '1px solid var(--warning)',
            opacity: '.7'
        }
    }

    const author = currentState.user.fullName
    
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
                                    onClick={handler.previousPage}
                                >
                                    <KeyboardArrowLeftIcon />
                                </Button>
                                <Typography variant="subtitle1" component="span" className="detail">{pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}</Typography>
                                <Button
                                    variant="contained"
                                    className="next-button btn"
                                    disabled={pageNumber >= numPages}
                                    onClick={handler.nextPage}
                                >
                                    <KeyboardArrowRightIcon />
                                </Button>
                            </div>
                        </div>
                        {literature?.attache && (
                            <Document
                                file={literature.attache}
                                onLoadSuccess={handler.onDocumentLoadSuccess}
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
                    <ListDetailLiterature 
                        data={literature}
                        onDownload={handler.download}
                        numPages={numPages}
                    />
                </div>
                <div className="section-two">
                    {
                        literature.ownerLiterature?.fullName !== currentState.user.fullName ?
                        <Button variant="contained" onClick={handleCollection}>
                            {
                                collection ?
                                <p>remove from collection <BookmarkRemoveIcon className="icon" /></p>
                                : 
                                <p>add to collection <img src={iconCollection} className="icon" alt="add to your collection" /></p>
                            } 
                            
                        </Button>
                        : 
                        literature.status === 'Cancel' ?
                        <Button variant="outlined" sx={buttonDelete} onClick={()=> setOpenDialog(true)}>
                            <p>delete literature</p>
                        </Button>
                        :
                        <Button variant="outlined" sx={buttonAuthor}>
                            <p>you are the author</p>
                        </Button>
                    }
                </div>
            </div>
            <DialogDetailLiterature 
                author={author}
                fullScreen={fullScreen}
                open={openDialog}
                setOpen={setOpenDialog}
                onAgree={handler.onAgree}
                onDisagree={handler.onDisagree}
                onCheckInput={handler.handleCheckInput}
                inputMakeSure={inputMakeSure}
            />
        </>
    )
}

export default DetailLiterature
