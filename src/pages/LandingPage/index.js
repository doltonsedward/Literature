import './_LandingPage.scss'
import { logo, coverImg } from "../../assets"

// MUI component
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import { muiRedButton, muiWhiteButton } from '../../utils'
import { Gap } from '../../components'
import { useState } from 'react'
import { Login, Register } from '../../components'

const LandingPage = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [isRegisterOpen, setIsRegisterOpen] = useState(false)
    
    const signUpButton = {
        ...muiRedButton,
        marginRight: '31px',
        width: '211px',
        height: '50px',
        maxWidth: '90%'
    }

    const signInButton = {
        ...muiWhiteButton,
        width: '211px',
        height: '50px',
        maxWidth: '90%'
    }

    return (
        <div className="landing-page">
            <img src={logo} alt="" />
            <div className="main">
                    <div className="section-one">
                        <Typography variant="h1" component="h1" sx={{ width: 614, fontStyle: 'italic' }}>source of intelligence</Typography>
                        <Gap height={44} />
                        <Typography variant="subtitle1" component="p" sx={{ width: 408, height: 107 }}>Sign-up and receive unlimited accesss to all of your literatur - share your literature.</Typography>
                        <div className="wrapper-button">
                            <Button variant="contained" sx={signUpButton} onClick={()=> setIsRegisterOpen(true)}>Sign up</Button>
                            <Button variant="contained" sx={signInButton} onClick={()=> setIsLoginOpen(true)}>Sign in</Button>
                        </div>
                    </div>
                    <div className="section-two">
                        <img src={coverImg} alt="When you want to buy a book" />
                    </div>
            </div>
            <Login isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
            <Register isOpen={isRegisterOpen} setIsOpen={setIsRegisterOpen} />
        </div>
    )
}

export default LandingPage
