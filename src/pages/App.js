import './App.css'
import store from '../store'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

// import API
import { API, setAuthToken } from '../config'

// import pages
import Routes from '../config/Route/Routes'

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
  
  return <Routes />
}

export default App;
