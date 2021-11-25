import './_Header.scss'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { logo } from '../../../assets'

// import store
import store from '../../../store'

const Header = () => {
    const history = useHistory()

    const currentState = useSelector(state => state)
    const linkStyle = {
        textDecoration: 'none',
        color: 'var(--color-third)'
    }

    const handleLogout = () => {
        const email = currentState.user.email
        const password = currentState.user.password
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
            <nav>
                <ul >
                    <li><Link style={linkStyle} to="/profile">Profile</Link></li>
                    <li><Link style={linkStyle} to="/profile">My Collection</Link></li>
                    <li><Link style={linkStyle} to="/profile">Add Literature</Link></li>
                    <li onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</li>
                </ul>
            </nav>
            <img src={logo} alt="This is literature" />
        </header>
    )
}

export default Header
