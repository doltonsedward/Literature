import './MyCollection.scss'
import { Gap } from '../../components'

// MUI component
import { Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { API } from "../../config"
import { pushNotif } from "../../utils"

const MyCollection = () => {
    const [collection, setCollection] = useState([])
    const currentState = useSelector(state => state)
    
    const getCollection = async () => {
        try {
            const response = await API.get('/collection/' + currentState.user.id)
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

    useEffect(()=> {
        getCollection()
    }, [])
    
    return (
        <div className="collection literature-default-padding">
            <Typography variant="h2" component="h1" style={{ fontSize: 36 }}>My Collection</Typography>
            <Gap height={41} />
            <ul className="list-collection">
                {collection?.map((item, i) => {
                    return (
                        <li key={i}>
                            <embed src={item.literature.attache} style={{ borderRadius: 10 }} width={200} height={270} />
                            <Gap height={18} />
                            <p className="title-literature">{item.literature.title}</p>
                            <Gap height={15} />
                            <div className="footer">
                                <Typography variant="subtitle1" style={{ color: 'var(--subtitle)' }}>{item.literature.author}</Typography>
                                <Typography variant="subtitle1" style={{ color: 'var(--subtitle)' }}>{item.literature.publication_date.split('-')[2]}</Typography>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default MyCollection
