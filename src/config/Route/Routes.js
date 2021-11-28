import '../../assets/scss/loading.scss'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { PrivateRoute } from '..'

// import pages
import LandingPage from '../../pages/LandingPage'
import Home from '../../pages/Home'
import Profile from '../../pages/Profile'
import MyCollection from '../../pages/MyCollection'
import AddLiterature from '../../pages/AddLiterature'
import DetailLiterature from '../../pages/DetailLiterature'
import { Verification } from '../../pages/Admin'

const Routes = () => {
    const currentState = useSelector(state => state)
    
    return (
        <>
            {currentState.isLoading ? (
                <div className="loading-section">
                    <div className="loading">
                        <p>loading</p>
                        <span></span>
                    </div>
                </div>
            ) : (
            <Router>
                <Switch>
                    <>
                        {
                            currentState.isLogin && currentState.user.role !== 'admin' ?
                            <>
                                <Route exact path="/">
                                    <Home />
                                </Route>
                                <Route exact path="/profile">
                                    <Profile />
                                </Route>
                                <Route path="/collection">
                                    <MyCollection />
                                </Route>
                                <Route path="/literature/:literature_id">
                                    <DetailLiterature />
                                </Route>
                                <Route path="/add-literature">
                                    <AddLiterature />
                                </Route>
                                <PrivateRoute path="/admin">
                                    <Verification />
                                </PrivateRoute>
                            </>
                            :
                            <>
                                {currentState.user?.role === 'admin' && <Redirect to="/admin" />}
                                <Route exact path="/">
                                    <LandingPage />
                                </Route>
                                <PrivateRoute path="/admin">
                                    <Verification />
                                </PrivateRoute>
                            </>
                        }
                    </>
                </Switch>
            </Router>
            )}
        </>
    );
}

export default Routes
