import { 
    Skeleton, 
    Typography 
} from "@mui/material"
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
            setCollection(response.data.collection)
        } catch (error) {
            const status = error.response.data.status
            const message = error.response.data.message
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
        <div className="literature-default-padding">
            <Typography variant="h2" component="h1" style={{ fontSize: 36 }}>My Collection</Typography>
            {/* <ul>
                {fakeData.map((item, i) => {
                    return (
                        <li key={i}>
                            {loading && 
                                <Skeleton 
                                    style={{ backgroundColor: 'var(--third)', borderRadius: 'var(--border-trendy)', position: 'absolute' }} 
                                    variant="rectangular" 
                                    width={200} 
                                    height={270}
                                />
                            }

                            <embed src={item.attache} width={200} height={270} />
                            <Gap height={18} />
                            <p className="title-literature">{item.title}</p>
                            <Gap height={15} />
                            <div className="footer">
                                <Typography variant="subtitle1" style={{ color: 'var(--subtitle)' }}>{item.author}</Typography>
                                <Typography variant="subtitle1" style={{ color: 'var(--subtitle)' }}>{item.publication_date.split('-')[2]}</Typography>
                            </div>
                        </li>
                    )
                })}
            </ul> */}
        </div>
    )
}

export default MyCollection
