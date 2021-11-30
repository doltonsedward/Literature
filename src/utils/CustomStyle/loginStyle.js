import { muiWhiteButton } from ".."

const loginStyle = {
    wrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'var(--primary)',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 'var(--border-trendy)'
    },
    submitBtn: {
        ...muiWhiteButton,
        width: '100%', 
        height: 50,
        color: 'var(--primary)',
        '&.MuiLoadingButton-root': {
            backgroundColor: 'var(--third)'
        }
    },
    textStyles: {
        fontSize: 18, 
        textAlign: 'center', 
        marginTop: '15px', 
        marginBottom: '15px'
    }
}

export default loginStyle