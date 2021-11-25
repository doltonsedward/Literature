import './_Header.scss'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { logo } from '../../../assets'

// import store
import store from '../../../store'

const Header = () => {
    const history = useHistory()
    const currentPath = history.location.pathname

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
                    <li className={currentPath === '/profile' ? 'active' : ''}><Link style={linkStyle} to="/profile">Profile</Link></li>
                    <li className={currentPath === '/collection' ? 'active' : ''}><Link style={linkStyle} to="/collection">My Collection</Link></li>
                    <li className={currentPath === '/add-literature' ? 'active' : ''}><Link style={linkStyle} to="/add-literature">Add Literature</Link></li>
                    <li onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</li>
                </ul>
            </nav>
            <img src={logo} alt="This is literature" />
        </header>
    )
}

export default Header
