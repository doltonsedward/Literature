import './GoogleLoginBtn.scss'

// import GoogleLogin library
import GoogleLogin from 'react-google-login'
import { toast } from 'react-toastify'
import store from '../../../store'

// import API here
import { API } from '../../../config'
import { Button } from '@mui/material'
import { muiWhiteButton } from '../../../utils'
import { iconGoogle } from '../../../assets'

const GoogleLoginBtn = () => {
    const responseGoogle = async (response) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const body = {
                token: response.tokenId
            }
            
            const responseAuth = await API.post('/auth/google', body, config) 

            if (responseAuth.status === 200) {
                store.dispatch({
                    type: 'LOGIN',
                    payload: responseAuth.data.user
                })
                
                const fullName = responseAuth?.data?.user?.fullName
                toast.success('Login success, welcome ' + fullName)
            }

        } catch (error) {
            const message = error?.response?.data?.message || error?.message
            toast.error(message)
        }
    }

    const styleButton = {
        ...muiWhiteButton,
        width: '100%',
        height: 50,
        color: 'var(--third)',
        backgroundColor: 'transparent',
        border: '1px solid var(--third)',
        '&:hover': {
            color: 'var(--primary)',
            backgroundColor: 'var(--third)',
            border: '1px solid var(--third)',
        }
    }

    return (
        <GoogleLogin 
            clientId="1076583809766-ilvker9mnu7fi30n5u0r7to2f5v2odg9.apps.googleusercontent.com"
            render={renderProps => (
                <Button 
                    variant="outlined" 
                    onClick={renderProps.onClick} 
                    sx={styleButton}
                >
                    <img width={30} src={iconGoogle} style={{ marginRight: 10 }} alt="login with google" /> 
                    Sign in with google
                </Button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
        />
    )
}

export default GoogleLoginBtn