import './_Home.scss'
import React from 'react';
import { iconSearch, logo } from "../../assets"
import { Input, Gap, Header, ContainerSearchResult } from '../../components'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

// import API
import { API, checkUser, setAuthToken } from '../../config'

// MUI component
import { Button } from '@mui/material'

const Home = () => {
    const [dataLiterature, setDataLiterature] = useState([])
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [inputData, setInputData] = useState({
        title: '',
        public_year: ""
    })

    const getLiterature = async (type) => {
        try {
            let response 
            if (type === 'search') {
                response = await API.get(`/search-literatures?${inputData.title ? `title=${inputData.title}&` : ''}${inputData.public_year ? `public_year=${inputData.public_year}` : ''}`)
            } else {
                response = await API.get('/literatures') 
            }
            
            setDataLiterature(response.data.literatures)
        } catch (error) {
            const message = error.response?.data?.message || 'Unknow error'
            toast.error(message)
        }
    }

    const handler = {
        handleChange: (e) => {
            setInputData({
                ...inputData,
                [e.target.name]: e.target.value
            })
        },
        handleSubmit: () => {
            setIsSearchActive(true)
            getLiterature('search')
        },
        handleSearch: () => {
            getLiterature('search')
        }
    } 

    useEffect(()=> {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }

        checkUser()
        getLiterature()
    }, [])

    const fetchingHandler = { getLiterature }
    const stateToChild = { dataLiterature, inputData }
    
    return (
        <>
            <Header />
            {
                isSearchActive ? 
                <ContainerSearchResult 
                    fetching={fetchingHandler}
                    handler={handler}
                    getter={stateToChild}
                />
                :
                <div className="homepage literature-default-padding">
                    <img src={logo} width={489} alt="for searching your book" />
                    <Gap height={40} />
                    <div className="wrapper-search-list">
                        <div className="wrapper-input-autocomplete">
                            <Input style={{ width: 600, height: 50 }} name="title" value={inputData.title} list="literature" onChange={handler.handleChange} placeholder="Search for literature" />
                            <datalist id="literature" style={{ height: 200, overflowX: 'hidden' }}>
                                {dataLiterature.map((item, i) => {
                                    return <option key={i} value={item.title} />
                                })}
                            </datalist>
                        </div>
                        <Button onClick={handler.handleSubmit}><img src={iconSearch} alt="button for searching list book" /></Button>
                    </div>
                </div>
            }
        </>
    )
}

export default Home
