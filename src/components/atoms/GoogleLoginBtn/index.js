import { API } from "../../../config"
import store from "../../../store"
import { muiWhiteButton, randomPass } from "../../../utils"
import { iconGoogle } from "../../../assets"
import { toast } from 'react-toastify'

import { Button } from '@mui/material'

// oauth
import GoogleLogin from 'react-google-login'

const GoogleLoginBtn = ({ setMessage, setSeverity }) => {
    const responseGoogle = async (response) => {
        const randomPassword = randomPass("Testing", 5, "Testes4")

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const body = {
                token: response.tokenId,
                password: randomPassword
            }

            const responseAuth = await API.post('/auth/google', body, config)

            if (responseAuth?.status === 200) {
                store.dispatch({ 
                    type: 'LOGIN', 
                    payload: responseAuth.data.user
                })    

                toast.success('Login success, Welcome ' + responseAuth?.data?.user.fullName)
            } 

        } catch (error) {
            const message = error?.response?.data.message || error?.response?.data?.error.message
            setMessage(message)
            setSeverity('error')
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
        <div>
            {/* use disabled={renderProps.disabled} for disable the button */}
            <GoogleLogin 
                clientId="1076583809766-f70m00reofepf768mcmue39qrm7gbch6.apps.googleusercontent.com"
                render={renderProps => (
                    <Button 
                        variant="outlined" 
                        onClick={renderProps.onClick} 
                        disabled={renderProps.disabled}
                        sx={styleButton}
                    >
                        <img width={30} src={iconGoogle} style={{ marginRight: 10 }} alt="login with google" /> 
                        Login with google
                    </Button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GoogleLoginBtn
