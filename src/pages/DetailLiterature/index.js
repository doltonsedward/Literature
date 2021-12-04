import { API } from '../../config/API'
import { downloadPDF, getDetailLiterature, getCollection } from '../../utils'
import { ContainerDetailLiterature, Header } from '../../components'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const DetailLiterature = () => {
    const history = useHistory()
    const currentState = useSelector(state => state)
    const { literature_id } = useParams()

    const [openDialog, setOpenDialog] = useState(false)
    const [inputMakeSure, setInputMakeSure] = useState('')
    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [collection, setCollection] = useState({})
    const [literature, setLiterature] = useState({})

    const handleCollection = async () => {
        try {
            if (collection) {
                await API.delete('/collection/' + collection.id)
                getCollection(API, setCollection, literature_id, toast)
                
                toast.success(`${literature.title} remove from collection`)
            } else {
                await API.post('/collection/' + literature_id)
                getCollection(API, setCollection, literature_id, toast)
                
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
            const message = error?.response?.data.message || 'Unknow error'
            toast.error(message)
        }
    }

    
    const handler = {
        handleCollection,
        handleCheckInput: (e) => setInputMakeSure(e.target.value),
        changePage: (offset) => setPageNumber(prevPageNumber => prevPageNumber + offset), // handle when page pdf change
        previousPage: () => handler.changePage(-1), // handle to prev page pdf
        nextPage: () => handler.changePage(1), // handle to next page pdf
        onDisagree: () => setOpenDialog(false),
        onAgree: () => {
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
        getDetailLiterature(API, setLiterature, literature_id, toast)
        getCollection(API, setCollection, literature_id, toast)
    }, [])

    const author = currentState.user.fullName
    
    const dataToChild = { currentState, author }
    const dataDialog = { openDialog, setOpenDialog }
    const stateToChild = { literature, inputMakeSure, numPages, pageNumber, collection }

    return (
        <>
            <Header />
            <ContainerDetailLiterature 
                otherData={dataToChild}
                dataDialog={dataDialog}
                handler={handler} 
                getter={stateToChild}
            />
        </>
    )
}

export default DetailLiterature
