import './_Header.scss'
import { logo } from '../../../assets'
import { dropDown } from '../../../utils'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

// import store
import store from '../../../store'

// MUI component
import { 
    Paper,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';

// MUI icon
import LogoutIcon from '@mui/icons-material/Logout';

const Header = ({ role, activeIn }) => {
    const history = useHistory()

    const currentState = useSelector(state => state)
    const linkStyle = {
        textDecoration: 'none',
        color: 'var(--color-third)'
    }

    const handleLogout = () => {
        const email = currentState.user.email
        const password = currentState.user.password

        toast.success("Logout success")
        store.dispatch({
            type: 'LOGOUT',
            payload: {
                email: email,
                password: password
            }
        })

        history.push('/')
    }

    return (
        <header className="header">
            {
                role === 'admin' ?
                <>
                    <Link to="/">
                        <img src={logo} alt="This is literature" />
                    </Link>
                    <nav>
                        <img className="profile-image" onClick={dropDown} src={currentState.user.avatar} alt="Click to use dropdown" />
                        <Paper className="dropdown">
                            <List
                                component="div"
                                aria-labelledby="nested-list-subheader"
                                >
                                <ListItemButton onClick={handleLogout}>
                                    <ListItemIcon>
                                        <LogoutIcon sx={{color: 'var(--secondary)'}} />
                                    </ListItemIcon>
                                    <ListItemText sx={{ color: 'var(--primary)' }} primary="Logout" />
                                </ListItemButton>
                            </List>
                        </Paper>
                    </nav>
                </>
                :
                <>
                    <nav>
                        <ul>
                            <li className={activeIn === 'profile' ? 'active' : ''}><Link style={linkStyle} to="/profile">Profile</Link></li>
                            <li className={activeIn === 'collection' ? 'active' : ''}><Link style={linkStyle} to="/collection">My Collection</Link></li>
                            <li className={activeIn === 'add-literature' ? 'active' : ''}><Link style={linkStyle} to="/add-literature">Add Literature</Link></li>
                            <li onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</li>
                        </ul>
                    </nav>
                    <Link to="/">
                        <img src={logo} alt="This is literature" />
                    </Link>
                </>
            }
        </header>
    )
}

export default Header
