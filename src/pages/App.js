import './App.css'
import store from '../store'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// import my component
import { Header } from '../components'
import LandingPage from './LandingPage'
import Home from './Home'

// import API
import { API, setAuthToken, UserLoginRoute } from '../config'
import SearchResult from './SearchResult'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  const currentState = useSelector(state => state)
    
  useEffect(()=> {
      if (localStorage.token) {
          setAuthToken(localStorage.token)
      }
  }, [currentState])

  const checkUser = async () => {
      try {
          const response = await API.get('/check-auth')

          if (response.status === 404) {
              return store.dispatch({
                  type: "AUTH_ERROR",
              });
          }
          
          let payload = response.data.data.user
          
          payload.token = localStorage.token;

          store.dispatch({
              type: "USER_SUCCESS",
              payload,
            });
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(()=> {
      checkUser()
  }, [])
  
  return (
    <Router>
      {currentState.isLogin ? <Header /> : null}
      <Switch>
        {currentState.isLogin && (
          <>
            <Route exact path="/">
                <Home /> 
            </Route>
            <UserLoginRoute path="/search-result" component={SearchResult} />
          </>
        )}
        
        <Route exact path="/">
          <LandingPage />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
