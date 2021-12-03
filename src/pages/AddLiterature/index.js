import { Header, ContainerAddLiterature } from '../../components'
import { handleAnyChange } from '../../utils'
import { API } from '../../config'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const AddLiterature = () => {
    console.clear()
    const currentState = useSelector(state => state)

    const [openDialog, setOpenDialog] = useState(false)
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

            const body = formData
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
            
            const response = await API.post('/literature', body, config)
            toast.success(response.data.message || 'Add literature finished')
        } catch (error) {
            const message = error?.response?.data?.message || error?.response?.data?.error?.message
            toast.error(message ?? 'Unknow error')
        }
    }

    const handler = {
        handleChange: (e) => handleAnyChange(e, form, setForm, setPreview),
        handleSubmit: () => setOpenDialog(true),
        handleDisAgree: () => setOpenDialog(false),
        handleAgree: () => {
            handleAddLiterature()
            setOpenDialog(false)
        },
        onDocumentLoadSuccess: ({ numPages }) => {
            setForm({
                ...form,
                title: form.attache[0].name.split('.')[0],
                pages: numPages,
                author: currentState.user.fullName
            })

        }
    }

    const dataDialog = {
        openDialog,
        setOpenDialog
    }
    
    return (
        <>
            <Header activeIn="add-literature" />
            <ContainerAddLiterature 
                dataDialog={dataDialog}
                handler={handler}
                form={form}
                preview={preview}
            />
        </>
    )
}

export default AddLiterature
