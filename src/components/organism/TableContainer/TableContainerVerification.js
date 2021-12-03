import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material'
import { TableBodyVerification } from '../..'

const TableContainerVerification = ({ getter, handler }) => {
    return (
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
                <TableBodyVerification 
                    UIComponent={{ TableBody, TableRow, TableCell }}
                    getter={getter}
                    handler={handler}
                />
            </Table>
        </TableContainer>
    )
}

export default TableContainerVerification
