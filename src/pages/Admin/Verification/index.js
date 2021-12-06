import './Verification.scss'

import { ContainerVerification, Header } from "../../../components"
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react';

// import API
import { API } from '../../../config';

const Verification = () => {
    const [literatures, setLiteratures] = useState([])
    // MUI logic
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const getAllData = async () => {
        try {
            const response = await API.get('/literatures/admin')
            setLiteratures(response.data.literatures)
        } catch (error) {
            const message = error.response.data.message || 'Unknow error'
            toast.error(message)
        }
    }

    const handler = {
        handleAction: async (actionName, literatureId) => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
    
                const body = { status: actionName }
    
                const response = await API.patch('/literature/' + literatureId, body, config)
                const { message } = response.data || 'Success change data'
                toast.success(message)
    
                getAllData()
            } catch (error) {
                const { message } = error?.response?.data
                toast.error(message)
            }
        },
        handleChangePage: (event, newPage) => {
            setPage(newPage)
        },
        handleChangeRowsPerPage: (event) => {
            setRowsPerPage(parseInt(event.target.value, 10))
            setPage(0)
        }
    }

    useEffect(() => {
        getAllData()
    }, [])

    const stateToChild = {
        literatures, 
        page, 
        rowsPerPage
    }
    
    return (
        <>
            <Header role="admin" />
            <ContainerVerification 
                handler={handler}
                getter={stateToChild}
            />
        </>
    )
}

export default Verification
