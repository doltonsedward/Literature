import { CircularProgress } from '@mui/material'

const LoadingPDF = () => {
    const wrapper = {
        width: 200,
        height: 270,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <div style={wrapper}>
            <CircularProgress />
        </div>
    )
}

export { LoadingPDF }
