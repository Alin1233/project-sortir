import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Accueil from './pages/Accueil'
import Profile from './pages/Profile'
import SeConnecter from './pages/SeConnecter'

function App() {
  

    return (
      <>
      <Router>
          <div>
            <Link  to="/">Accueil</Link>
            <Link  to="/profile">Profile</Link>
            <Link  to="/connecter">Se Connecter</Link>
          </div>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connecter" element={<SeConnecter />} />
          </Routes>
        </Router>
      </>
    )
}

export default App
