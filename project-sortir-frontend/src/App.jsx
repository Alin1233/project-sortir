import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Accueil from './pages/Accueil'
import Profile from './pages/Profile'
import SeConnecter from './pages/SeConnecter'
import { useState, useEffect } from 'react'

function App() {

    //l'utilisateur connecté actuel
    const[user, setUser] = useState (null)

    useEffect(()=>{
      //vérifier s'il existe un cookie contenant l'utilisateur actuel
      const loggedUser = window.localStorage.getItem("loggedUser")
      if(loggedUser){
        const user = JSON.parse(loggedUser)
        //s'il existe, définit l'utilisateur actuel avec le cookie de l'utilisateur
        setUser(user)
      }
    },[])
    //Quand quelqu'un clique sur "log out", le cookie est supprimé et l'utilisateur actuel est déclaré null
    const handeleLogout = () =>{
      window.localStorage.removeItem("loggedUser")
      setUser(null)
    }

    return (
      <>
        <Router>
          <div>
            <Link  to="/">Accueil</Link>{"  "}
            <Link  to="/profile">Profile</Link>{"  "}
            {user ? (<button onClick={handeleLogout}>Log Out</button>) : (<Link to="/connecter">Se Connecter</Link>)}
          </div>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connecter" element={<SeConnecter user={user} setUser={setUser}/>} />
          </Routes>
        </Router>
      </>
    )
}

export default App
