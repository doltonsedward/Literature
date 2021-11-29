import './AddLiterature.scss'
import { Input, Gap, Header } from '../../components'
import { pdfStyle } from '../../assets'
import { pushNotif } from '../../utils'
import { API } from '../../config'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

// MUI component
import { 
    Button,
    Typography,
    Skeleton
} from "@mui/material"

const AddLiterature = () => {
    console.clear()

    const currentState = useSelector(state => state)

    const [preview, setPreview] = useState('')
    const [form, setForm] = useState({
        title: "",
        publication_date: "",
        pages: "",
        ISBN: "",
        author: "",
        attache: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value
        })

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
        }
    }

    const handleSubmit = async () => {
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

            pushNotif({
                title: response?.data.status,
                message: response?.data.message
            }, 'success')
        } catch (error) {
            const status = error?.response?.data.status
            const message = error?.response?.data.message || error?.response?.data.error.message
            pushNotif({
                title: status ? status : 'Error',
                message: message ? message : 'Unknow error'
            })
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
    
    return (
        <>
            <Header activeIn="add-literature" />
            <div className="add-literature literature-default-padding">
                <Typography variant="h2" component="h1" style={{ fontSize: 36 }}>Add Literature</Typography>
                <Gap height={50} />
                <ul className="list-input">
                    <li>
                        <Input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
                    </li>
                    <li>
                        <Input type="date" name="publication_date" onChange={handleChange} placeholder="Publication Date" />
                    </li>
                    <li>
                        <Input type="number" name="pages" value={form.pages} onChange={handleChange} placeholder="Pages" />
                    </li>
                    <li>
                        <Input type="number" name="ISBN" value={form.ISBN} onChange={handleChange} placeholder="ISBN" />
                    </li>
                    <li>
                        <Input name="author" value={form.author} onChange={handleChange} placeholder="Author, ex: Doltons Ed, Astiana" />
                    </li>
                    <li>
                        <Input name="attache" variant="file" onChange={handleChange} />
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
                <Button variant="contained" sx={submitButton} onClick={handleSubmit}>add literature</Button>
                <Gap height={77} />
            </div>
        </>
    )
}

export default AddLiterature
