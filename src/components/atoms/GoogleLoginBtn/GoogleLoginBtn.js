// import GoogleLogin library
import GoogleLogin from 'react-google-login'
import { toast } from 'react-toastify'

// import API here
import { API } from '../../../config'
import store from '../../../store'

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
    
    // clientId = 1076583809766-ilvker9mnu7fi30n5u0r7to2f5v2odg9.apps.googleusercontent.com
    return (
        <GoogleLogin 
            clientId="1076583809766-ilvker9mnu7fi30n5u0r7to2f5v2odg9.apps.googleusercontent.com"
            buttonText="Login"
            className="google-login-btn"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
        />
    )
}

export default GoogleLoginBtn