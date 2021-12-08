const initialValue = {
    isLoading: true,
    isLogin: false,
    user: {}
}

const rootReducer = (state = initialValue, action) => {
    const { type, payload } = action

    switch (type) {
        case 'AUTH_SUCCESS':
        case 'LOGIN':
            localStorage.setItem('token', payload.token)
            
            return {
                isLoading: false,
                isLogin: true,
                user: payload
            }
        
        case 'AUTH_ERROR':
        case 'LOGOUT':
            localStorage.removeItem('token')
            
            return {
                isLoading: false,
                isLogin: false,
                user: null
            }

        case 'STOP_LOADING':
            return {
                ...state,
                isLoading: false
            }
            
        default:
            return state
    }
}


export default rootReducer;