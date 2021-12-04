import './App.css'
import { useEffect } from 'react'

// import API
import { checkUser, setAuthToken } from '../config'

// import pages
import Routes from '../config/Route/Routes'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  // console.clear()
  console.log(process.env.REACT_APP_BASE_API_URL)
  useEffect(()=> {
      checkUser()
  }, [])
  
  return <Routes />
}

export default App;
