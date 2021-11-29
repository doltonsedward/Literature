import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router"

const UserLoginRoute = ({ ...rest }) => {
    const userLogin = useSelector(state => state.isLogin)
    return (
        <>
            {/* need watched */}
            {userLogin ? <Route {...rest} /> : <Redirect to="/" />}
            {/* props have history, location, match, staticContext */}
        </>
    )
}

const PrivateRoute = ({ ...rest }) => {
    const user = useSelector(state => state.user)
    const getAccess = user?.role === 'admin' ? true : false
    return (
        <>
            {/* need watched */}
            {getAccess ? <Route {...rest} /> : <Redirect to="/" />}
            {/* props have history, location, match, staticContext */}
        </>
    )
}

export { UserLoginRoute, PrivateRoute }
