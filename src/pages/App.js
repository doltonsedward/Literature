import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// import my component
import { Header } from '../components'
import LandingPage from './LandingPage'

// import pages

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
