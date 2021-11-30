import './Verification.scss'

import { Gap, Header } from "../../../components"
import { muiButtonApprove, muiButtonCancel } from '../../../utils'
import { toast } from 'react-toastify'

// import API
import { API } from '../../../config';

// MUI component
import * as React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { 
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    Typography 
} from '@mui/material'
import { Link } from 'react-router-dom';


const Verification = () => {
    const [literatures, setLiteratures] = React.useState([])

    const getAllData = async () => {
        try {
            const response = await API.get('/literatures/admin')
            setLiteratures(response.data.literatures)
        } catch (error) {
            const message = error.response.data.message || 'Unknow error'
            toast.error(message)
        }
    }

    const handleAction = async (actionName, literatureId) => {
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
    } 

    // MUI logic
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    React.useEffect(() => {
        getAllData()
    }, [])
    
    return (
        <>
            <Header role="admin" />
            <div className="admin literature-default-padding">
                <Typography 
                    variant="h1" 
                    component="h1" 
                    fontFamily="Avenir" 
                    fontSize={36}
                    className="title"
                >
                    Book verification
                </Typography>
                <Gap height={29} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>User or author</TableCell>
                            <TableCell>ISBN</TableCell>
                            <TableCell>Literature</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {literatures
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((item, i) => {
                            let statusStyle = ''
                            switch (item.status) {
                                case 'Waiting to be verified':
                                case 'Waiting':
                                    statusStyle = '#F7941E'
                                    break;

                                case 'Approve':
                                    statusStyle = '#0ACF83'
                                    break;

                                case 'Cancel':
                                    statusStyle = '#FF0742'
                                    break;
                            
                                default:
                                    break;
                            }
                            
                            return (
                                <TableRow
                                    hover
                                    key={i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {i + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {item.author}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {item.ISBN}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Link to={item.attache}>{item.title}</Link>
                                    </TableCell>
                                    <TableCell component="th" scope="row" sx={{ color: statusStyle }}>
                                        {item.status}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {
                                            item.status === 'Approve' ?
                                            <CheckCircleIcon sx={{ color: '#0ACF83' }} />
                                            :
                                            <>
                                                <Button variant="contained" sx={muiButtonCancel} onClick={()=> handleAction('Cancel', item.id)}>cancel</Button>
                                                <Button variant="contained" sx={muiButtonApprove} onClick={()=> handleAction('Approve', item.id)}>approve</Button>
                                            </>
                                        }
                                    </TableCell>
                                </TableRow>
                            )}
                        )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={literatures.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </>
    )
}

export default Verification
