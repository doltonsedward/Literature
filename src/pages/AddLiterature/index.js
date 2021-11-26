import './AddLiterature.scss'
import { Input, Gap } from '../../components'

// MUI component
import { 
    Button,
    Typography 
} from "@mui/material"
import { useState } from 'react'
import { muiRedButton, pushNotif } from '../../utils'
import { API } from '../../config'

const AddLiterature = () => {
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
                title: response.data.status,
                message: response.data.message
            })
        } catch (error) {
            const status = error.response.data.status
            const message = error.response.data.message
            pushNotif({
                title: status,
                message
            })
        }
    }

    const submitButton = {
        ...muiRedButton,
        float: 'right'
    }
    
    return (
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
                    {preview && <embed src={preview} />}
                </li>
            </ul>
            <Gap height={55} />
            <Button variant="contained" sx={submitButton} onClick={handleSubmit}>add literature</Button>
            <Gap height={77} />
        </div>
    )
}

export default AddLiterature
