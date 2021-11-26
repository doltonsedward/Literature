import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { UserLoginRoute } from './'

// import my component
import { Header } from '../../components'

// import pages
import LandingPage from '../../pages/LandingPage'
import Home from '../../pages/Home'
import SearchResult from '../../pages/SearchResult'
import Profile from '../../pages/Profile'
import MyCollection from '../../pages/MyCollection'

const Routes = () => {
    const currentState = useSelector(state => state)

    return (
        <Router>
            {currentState.isLogin ? <Header /> : null}
            <Switch>
            {currentState.isLogin && (
                <>
                <Route exact path="/">
                    <Home /> 
                </Route>
                <UserLoginRoute path="/search-result">
                    <SearchResult />
                </UserLoginRoute>
                <UserLoginRoute path="/profile">
                    <Profile />
                </UserLoginRoute>
                <UserLoginRoute path="/collection">
                    <MyCollection />
                </UserLoginRoute>
                </>
            )}
            
            <Route exact path="/">
                <LandingPage />
            </Route>

            </Switch>
        </Router>
    );
}

export default Routes
