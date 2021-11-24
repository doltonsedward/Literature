const initialValue = {
    isLogin: false,
    user: {}
}

const rootReducer = (state = initialValue, action) => {
    const { type, payload } = action

    switch (type) {
        case 'USER_SUCCESS':
        case 'LOGIN':
            localStorage.setItem('token', payload.token)

            return {
                isLogin: true,
                user: payload
            }
        
        case 'AUTH_ERROR':
        case 'LOGOUT':
            localStorage.removeItem('token')
            
            return {
                isLogin: false,
                user: payload
            }

        case 'REGISTER':
            return {
                isLogin: false,
                user: payload
            }

        case 'IS_CHANGGING':
            return {
                ...state,
                isChangging: payload
            }
        default:
            return state
    }
}


export default rootReducer;