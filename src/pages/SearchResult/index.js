import './_SearchResult.scss'

import { iconSearch } from "../../assets"
import { Gap, Input } from '../../components'
import { useState, useEffect } from 'react'

// import API
import { API } from '../../config'

// MUI component
import { Button, Skeleton, Typography } from '@mui/material'
import { pushNotif } from '../../utils'

const SearchResult = () => {
    const searchKey = JSON.parse(localStorage.search)
    const [dataLiterature, setDataLiterature] = useState([])
    const [inputData, setInputData] = useState({
        title: !searchKey ? '' : searchKey.title,
        public_year: ""
    })

    const getLiterature = async () => {
        try {
            const response = await API.get(`/search-literatures?${inputData.title ? `title=${inputData.title}&` : ''}${inputData.public_year ? `public_year=${inputData.public_year}` : ''}`)

            setDataLiterature(response.data.literatures)
        } catch (error) {
            const status = error.response?.data.status
            const message = error.response?.data.message
            pushNotif({
                title: status,
                message
            })
        }
    }

    const handleChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        })
    }


    console.log(inputData)

    useEffect(()=> {
        getLiterature()
    }, [])

    const handleSubmit = () => {
        localStorage.setItem("search", JSON.stringify(inputData))
        getLiterature()
    }

    const [loading, setLoading] = useState(true)
    const [displayEmbed, setDisplayEmbed] = useState('none')

    setTimeout(()=> {
        setLoading(false)
        setDisplayEmbed('block')
    }, 2000)

    return (
        <div className="search-result literature-default-padding">
            <div className="wrapper-search-list">
                <div className="wrapper-input-autocomplete">
                    <Input style={{ width: 600, height: 50 }} name="title" value={inputData.title} list="literature" onChange={handleChange} placeholder="Search for literature" />
                    <datalist id="literature" style={{ height: 200, overflow: 'hidden' }}>
                        {dataLiterature.map((item, i) => {
                            return <option key={i} value={item.title} />
                        })}
                    </datalist>
                </div>
                <Button onClick={handleSubmit}><img src={iconSearch} alt="button for searching list book" /></Button>
            </div>
            <Gap height={51} />
            <div className="content-search-list">
                <div className="year-option">
                    <Typography variant="subtitle1" style={{ color: 'var(--secondary)', textAlign: 'center' }}>Anytime</Typography>
                    <select name="public_year" id="publicYear" onChange={handleChange}>
                        <option value="2011">Since 2011</option>
                        <option value="2012">Since 2012</option>
                        <option value="2013">Since 2013</option>
                        <option value="2014">Since 2014</option>
                        <option value="2015">Since 2015</option>
                        <option value="2016">Since 2016</option>
                        <option value="2017">Since 2017</option>
                        <option value="2018">Since 2018</option>
                        <option value="2019">Since 2019</option>
                        <option value="2020">Since 2020</option>
                        <option value="2021">Since 2021</option>
                    </select>
                </div>
                <div className="literatures">
                    <ul>
                        {dataLiterature.map((item, i) => {
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
                    </ul>
                    
                </div>
            </div>
        </div>
    )
}

export default SearchResult
