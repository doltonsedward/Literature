import { muiRedButton } from ".."

const registerStyle = {
    wrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: '100vh', 
        overflow: 'auto',
        bgcolor: 'var(--primary)',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 'var(--border-trendy)',
        '::-webkit-scrollbar': {
            width: '12px'
        },
        '::-webkit-scrollbar-track': {
            background: 'var(--secondary-effect)',
            borderRadius: '20px',  
        },
        '::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--third)',
            borderRadius: '20px',  
        }
    },
    submitBtn: {
        ...muiRedButton,
        width: '100%', 
        height: 50
    },
    textStyles: {
        fontSize: 18, 
        textAlign: 'center', 
        marginTop: '15px', 
        marginBottom: '15px'
    }
}

export default registerStyle