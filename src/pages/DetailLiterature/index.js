import './DetailLiterature.scss'
import { API } from '../../config/API'
import { downloadPDF } from '../../utils'
import { iconCollection, iconDownload } from '../../assets'
import { Gap, Header } from '../../components'
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
    Input,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
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
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    // close

    const [inputMakeSure, setInputMakeSure] = useState('')
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
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
            const message = error.response.data.message || 'Unknow error'
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
            toast.error("Unknow error")
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

    const handleCheckInput = (e) => {
        setInputMakeSure(e.target.value)
    }

    const handler = {
        handleDisAgree: ()=> setOpenDialog(false),
        handleAgree: ()=> {
            handleDeleteLiterature()
            setOpenDialog(false)
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
        toast.success("Download literature finished")
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

    const confirmButton = {
        color: '#1e74c9',
        '&:hover': {
           backgroundColor: 'rgba(46, 190, 209, .15)' 
        }
    }

    const author = currentState.user.fullName

    console.log(author == inputMakeSure)
    console.log(inputMakeSure)
    
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
            <Dialog
                fullScreen={fullScreen}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Delete literature ?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    <p>When you delete this literature, nothing will be returned. deletion will be permanent. Do it wisely</p>
                    <Gap height={5} />
                    <p>Type this <b>{author}</b></p>
                    <Gap height={10} />
                    <Input fullWidth color="success" onChange={handleCheckInput} aria-label="description" />
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button autoFocus sx={confirmButton} onClick={handler.handleDisAgree}>
                    Cancel
                </Button>
                {
                    author == inputMakeSure ?
                    <Button sx={confirmButton} onClick={handler.handleAgree} autoFocus>
                        Delete literature
                    </Button>
                    :
                    <Button sx={confirmButton} onClick={()=> toast.error('Wrong input')} autoFocus>
                        Delete literature
                    </Button>
                }
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DetailLiterature
