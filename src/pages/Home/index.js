import './_Home.scss'
import React from 'react';
import { iconSearch, logo } from "../../assets"
import { Input, Gap } from '../../components'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { pushNotif } from '../../utils';

// import API
import { API, checkUser, setAuthToken } from '../../config'

// MUI component
import { Button } from '@mui/material'

const Home = () => {
    const currentState = useSelector(state => state)
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
            const status = error.response.data.status
            const message = error.response.data.message
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

    // for fetching setauth again
    useEffect(()=> {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
    }, [currentState])
    
    useEffect(()=> {
        getLiterature()
        checkUser()
    }, [])

    const handleSubmit = () => {
        localStorage.setItem("search", JSON.stringify(inputData))
        history.push('/search-result')
    }
    
    return (
        <div className="homepage literature-default-padding">
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
