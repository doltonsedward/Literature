import './_LandingPage.scss'
import { logo, coverImg } from "../../assets"

// MUI component
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import { muiRedButton, muiWhiteButton } from '../../utils'
import { Gap } from '../../components'
import { useState } from 'react'
import Login from '../../components/molecules/Login'

const LandingPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    
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
                        <Typography variant="h1" component="div" sx={{ width: 614, fontFamily: 'Times New Roman' }}>source of intelligence</Typography>
                        <Gap height={44} />
                        <Typography variant="subtitle1" component="div" sx={{ width: 408, height: 107 }}>Sign-up and receive unlimited accesss to all of your literatur - share your literature.</Typography>
                        <div className="wrapper-button">
                            <Button variant="contained" sx={signUpButton}>Sign up</Button>
                            <Button variant="contained" sx={signInButton} onClick={()=> setIsModalOpen(true)}>Sign in</Button>
                        </div>
                    </div>
                    <div className="section-two">
                        <img src={coverImg} alt="When you want to buy a book" />
                    </div>
            </div>
            <Login isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </div>
    )
}

export default LandingPage
