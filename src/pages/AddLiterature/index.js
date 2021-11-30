import './AddLiterature.scss'
import { Input, Gap, Header } from '../../components'
import { pdfStyle } from '../../assets'
import { handleAnyChange } from '../../utils'
import { API } from '../../config'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

// MUI component
import { useTheme } from '@mui/material/styles';
import { 
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useMediaQuery,
    Button,
    Typography,
    Skeleton
} from "@mui/material"

const AddLiterature = () => {
    console.clear()

    const currentState = useSelector(state => state)

    // MUI state and logic
    const [openDialog, setOpenDialog] = useState(false)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    // close

    const [preview, setPreview] = useState('')
    const [form, setForm] = useState({
        title: "",
        publication_date: "",
        pages: "",
        ISBN: "",
        author: "",
        attache: ""
    })

    const handleAddLiterature = async () => {
        try {
            const formData = new FormData()
            formData.set('title', form.title)
            formData.set('publication_date', form.publication_date)
            formData.set('pages', form.pages)
            formData.set('ISBN', form.ISBN)
            formData.set('author', form.author)
            formData.set('attache', form.attache[0], form.attache[0].filename)

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            const body = formData
            
            const response = await API.post('/literature', body, config)

            toast.success(response.data.message || 'Add literature finished')
        } catch (error) {
            const message = error.response.data.message || error.response.data.error.message

            toast.error(message ? message : 'Unknow error')
        }
    }

    const handler = {
        handleChange: (e)=> handleAnyChange(e, form, setForm, setPreview),
        handleSubmit: ()=> setOpenDialog(true),
        handleDisAgree: ()=> setOpenDialog(false),
        handleAgree: ()=> {
            handleAddLiterature()
            setOpenDialog(false)
        }
    }

    const onDocumentLoadSuccess = ({ numPages }) => {
        setForm({
            ...form,
            title: form.attache[0].name.split('.')[0],
            pages: numPages,
            author: currentState.user.fullName
        })
    }

    const submitButton = {
        float: 'right'
    }

    const confirmButton = {
        color: '#1e74c9',
        '&:hover': {
           backgroundColor: 'rgba(46, 190, 209, .15)' 
        }
    }
    
    return (
        <>
            <Header activeIn="add-literature" />
            <div className="add-literature literature-default-padding">
                <Typography variant="h2" component="h1" style={{ fontSize: 36 }}>Add Literature</Typography>
                <Gap height={50} />
                <ul className="list-input">
                    <li>
                        <Input name="title" value={form.title} onChange={handler.handleChange} placeholder="Title" />
                    </li>
                    <li>
                        <Input type="date" name="publication_date" onChange={handler.handleChange} placeholder="Publication Date" />
                    </li>
                    <li>
                        <Input type="number" name="pages" value={form.pages} onChange={handler.handleChange} placeholder="Pages" />
                    </li>
                    <li>
                        <Input type="number" name="ISBN" value={form.ISBN} onChange={handler.handleChange} placeholder="ISBN" />
                    </li>
                    <li>
                        <Input name="author" value={form.author} onChange={handler.handleChange} placeholder="Author, ex: Doltons Ed, Astiana" />
                    </li>
                    <li>
                        <Input name="attache" variant="file" onChange={handler.handleChange} />
                    </li>
                    <li>
                        {preview && (
                            <Document
                                file={form.attache[0]}
                                className={pdfStyle.pdfreader}
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading={<Skeleton variant="rectangular" width={200} height={270} />}
                            >
                                <Page 
                                    pageNumber={1} 
                                    renderTextLayer={false}
                                />
                            </Document>
                        )}
                    </li>
                </ul>
                <Gap height={55} />
                <Button variant="contained" sx={submitButton} onClick={handler.handleSubmit}>add literature</Button>
                <Dialog
                    fullScreen={fullScreen}
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Add literature ?"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        You can check again and postpone by pressing the cancel button to add literature if you are not sure
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button autoFocus sx={confirmButton} onClick={handler.handleDisAgree}>
                        Cancel
                    </Button>
                    <Button sx={confirmButton} onClick={handler.handleAgree} autoFocus>
                        Add literature
                    </Button>
                    </DialogActions>
                </Dialog>
                <Gap height={77} />
            </div>
        </>
    )
}

export default AddLiterature
