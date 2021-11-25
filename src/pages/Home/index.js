import './_Home.scss'
import { iconSearch, logo } from "../../assets"
import { Input, Gap } from '../../components'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

// import API
import { API } from '../../config'

// MUI component
import { Button } from '@mui/material'


const Home = () => {
    const history = useHistory()
    const [dataLiterature, setDataLiterature] = useState([])
    const [inputData, setInputData] = useState({
        title: ""
    })

    const getLiterature = async () => {
        try {
            const response = await API.get('/literatures')

            setDataLiterature(response.data.literatures)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        })
    }
    
    useEffect(()=> {
        getLiterature()
    }, [])

    const handleSubmit = () => {
        localStorage.setItem("search", JSON.stringify(inputData))
        history.push('/search-result')
    }
    
    return (
        <div className="homepage">
            <img src={logo} width={489} alt="for searching your book" />
            <Gap height={40} />
            <div className="wrapper-search-list">
                <div className="wrapper-input-autocomplete">
                    <Input style={{ width: 600, height: 50 }} name="title" value={inputData.title} list="literature" onChange={handleChange} placeholder="Search for literature" />
                    <datalist id="literature" style={{ height: 200, overflowX: 'hidden' }}>
                        {dataLiterature.map((item, i) => {
                            return <option key={i} value={item.title} />
                        })}
                    </datalist>
                </div>
                <Button onClick={handleSubmit}><img src={iconSearch} alt="button for searching list book" /></Button>
            </div>
        </div>
    )
}

export default Home
