import { muiButtonCancel, muiButtonApprove } from '../../../utils'
import { Link } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Button } from '@mui/material'

const TableBodyVerification = ({ UIComponent, getter, handler: { handleAction } }) => {
    const { literatures, page, rowsPerPage } = getter
    const { TableBody, TableRow, TableCell } = UIComponent

    return (
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
                                item.status === 'Cancel' ?
                                <HighlightOffIcon sx={{ color: 'var(--text-color-warning)' }} />
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
    )
}

export default TableBodyVerification
