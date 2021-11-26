import './App.css'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'


// import API
import { checkUser, setAuthToken } from '../config'

// import pages
import Routes from '../config/Route/Routes'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
    console.clear()
  const currentState = useSelector(state => state)
    
  useEffect(()=> {
      if (localStorage.token) {
          setAuthToken(localStorage.token)
      }
  }, [currentState])

  useEffect(()=> {
      checkUser()
  }, [])
  
  return <Routes />
}

export default App;
