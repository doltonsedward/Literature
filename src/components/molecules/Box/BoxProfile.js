import './_Box.scss'
import { iconEmail, iconGender, iconLocation, iconPhone } from '../../../assets'
import { muiRedButton } from '../../../utils'
import { Gap, Input } from '../..'
import { useSelector } from 'react-redux'

// MUI component
import { Box, Typography, Button } from '@mui/material'

const BoxProfile = ({ editable, form, preview, setForm, setPreview }) => {
    const currentState = useSelector(state => state)
    const { email, phone, address, gender, avatar } = currentState?.user

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value
        })

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
        }
    }

    const muiBlockButton = {
        ...muiRedButton,
        backgroundColor: 'var(--btn-block)',
        cursor: 'no-drop'
    }
    
    return (
        <Box className="box-profile">
            <ul className="list-sosmed">
                {
                    editable ?
                    <>
                        <li>
                            <img src={iconEmail} alt="your email here" />
                            <Input name="email" value={form.email} onChange={handleChange} placeholder="Email.." />
                        </li>
                        <li>
                            <img src={iconGender} alt="your gender here" />
                            <Input name="gender" value={form.gender} onChange={handleChange} placeholder="Gender.." />
                        </li>
                        <li>
                            <img src={iconPhone} alt="your phone number here" />
                            <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone.." />
                        </li>
                        <li>
                            <img src={iconLocation} alt="your location here" />
                            <Input variant="field" name="address" value={form.address} onChange={handleChange} placeholder="Address.." />
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <img src={iconEmail} alt="your email here" />
                            <Typography variant="subtitle1">{email}</Typography>
                        </li>
                        <li>
                            <img src={iconGender} alt="your gender here" />
                            <Typography variant="subtitle1">{gender ?? '-'}</Typography>
                        </li>
                        <li>
                            <img src={iconPhone} alt="your phone number here" />
                            <Typography variant="subtitle1">{phone}</Typography>
                        </li>
                        <li>
                            <img src={iconLocation} alt="your location here" />
                            <Typography variant="subtitle1">{address}</Typography>
                        </li>
                    </>
                }
            </ul>
            <div className="profile-pic">
                <div id="preview-thumbnail">
                    <img src={preview ? preview : avatar} width={226} style={{ borderRadius: 'var(--border-trendy)' }} alt="your photo here" />
                </div>
                <Gap height={14} />
                {
                    editable ?
                    <Button variant="contained" fullWidth sx={muiRedButton} className="button-input-file"> 
                        <input className="input-file__profile" name="avatar" type="file" style={{width: '280px'}} id="inputFileProfile" onChange={handleChange}  />
                        Choose photo
                    </Button>
                    :
                    <Button variant="contained" fullWidth sx={muiBlockButton} className="button-input-file">Choose photo</Button>
                }
            </div>
        </Box>
    )
}

export default BoxProfile
