import './MyCollection.scss'
import { imgBlank, pdfStyle } from '../../assets'
import { BlankImage, Gap, Header, LoadingPDF } from '../../components'
import { pushNotif } from "../../utils"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

// import API
import { API } from "../../config"

// MUI component
import { 
    Typography, 
    Button
} from "@mui/material"

const MyCollection = () => {
    const [isAction, setIsAction] = useState(false)
    const [collection, setCollection] = useState([])
    
    const getCollection = async () => {
        try {
            const response = await API.get('/collection')
            setCollection(response?.data.collection)
        } catch (error) {
            const status = error.response?.data.status
            const message = error.response?.data.message
            pushNotif({
                title: status,
                message
            })
        }
    }

    const handleRemoveCollection = async (literatureName, collectionId) => {
        try {
            const status = 'Success'
            await API.delete('/collection/' + collectionId)
            getCollection()
            
            pushNotif({
                title: status,
                message: `${literatureName} remove from collection`
            }, status)    
        } catch (error) {
            const message = error?.response?.data.message
            pushNotif({
                title: 'Error',
                message
            }, 'error')  
        }
    }

    useEffect(()=> {
        getCollection()
    }, [])

    const buttonStyle = `action-button${isAction ? ' active' : ''}`
    
    return (
        <>
            <Header activeIn="collection" />
            <div className="collection literature-default-padding">
                <div className="header-collection">
                    <Typography variant="h2" component="h1" style={{ fontSize: 36 }}>My Collection</Typography>
                    {
                        collection.length ?
                        <Button variant="contained" onClick={()=> setIsAction(!isAction)}>action</Button>
                        : null
                    }
                </div>
                <Gap height={41} />
                {
                    collection.length ? 
                    <ul className="list-collection">
                        {collection?.map((item, i) => {
                            return (
                                <li key={i}>
                                    <Link to={`/literature/${item.literature.id}`} style={{ color: 'var(--text-color-primary)', textDecoration: 'none' }}>
                                        <Document
                                            file={item.literature.attache}
                                            className={pdfStyle.pdfreader}
                                            loading={<LoadingPDF />}
                                        >
                                            <Page 
                                                pageNumber={1} 
                                                renderTextLayer={false}
                                            />
                                        </Document>
                                        <Gap height={18} />
                                        <p className="title-literature">{item.literature.title}</p>
                                        <Gap height={15} />
                                        <div className="footer">
                                            <Typography variant="subtitle1" style={{ color: 'var(--subtitle)' }}>{item.literature.author}</Typography>
                                            <Typography variant="subtitle1" style={{ color: 'var(--subtitle)' }}>{item.literature.publication_date.split('-')[2]}</Typography>
                                        </div>
                                    </Link>
                                    <Button variant="contained" className={buttonStyle} onClick={()=> handleRemoveCollection(item.literature.title, item.id)}>remove</Button>
                                </li>
                            )
                        })}
                    </ul>
                    :
                    <BlankImage />
                }
            </div>
        </>
    )
}

export default MyCollection
