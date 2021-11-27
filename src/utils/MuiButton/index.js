const muiRedButton = {
    backgroundColor: 'var(--btn-primary)',
    '&:hover': {
        backgroundColor: 'var(--btn-primary-effect)',
    }
}

const muiWhiteButton = {
    color: 'var(--primary)',
    backgroundColor: 'var(--btn-secondary)',
    '&:hover': {
        backgroundColor: 'var(--btn-secondary-effect)',
    }
}

const muiButtonCancel = {
    backgroundColor: '#FF0742',
    marginRight: '2px',
    '&:hover': {
        backgroundColor: '#e7476c'
    }
}

const muiButtonApprove = {
    backgroundColor: '#0ACF83',
    marginLeft: '2px',
    '&:hover': {
        backgroundColor: '#31d898'
    }
}

export { muiRedButton, muiWhiteButton, muiButtonCancel, muiButtonApprove }
