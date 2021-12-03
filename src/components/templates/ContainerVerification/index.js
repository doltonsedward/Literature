import { Gap, TableContainerVerification } from '../..'

// MUI component
import { TablePagination, Typography } from '@mui/material'

const ContainerVerification = ({ handler, getter }) => {
    const { literatures, page, rowsPerPage } = getter
    const { handleAction, handleChangePage, handleChangeRowsPerPage } = handler
    
    return (
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
            <TableContainerVerification 
                getter={{ literatures, page, rowsPerPage }}
                handler={{ handleAction }}
            />
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
    )
}

export default ContainerVerification
