import {
    BrowserRouter as Router,
    Routes, Route, useParams
} from 'react-router-dom'
import Accueil from './pages/Accueil'
import Profile from './pages/Profile'
import SeConnecter from './pages/SeConnecter'
import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import CreerSortie from './pages/CreerSortie'
import Sortie from './pages/Sortie'
import AutreProfilUtilisateur from "./pages/AutreProfilUtilisateur.jsx";
import DetailsSortie from "./pages/DetailsSortie.jsx";
import AnnulerSortie from "./pages/AnnulerSortie.jsx";
import ModificationSortie from "./pages/ModificationSortie.jsx";
import PanelAdministration from "./pages/PanelAdministration.jsx";




function App() {

    //l'utilisateur connecté actuel
    const[user, setUser] = useState (null)
    let { userId } = useParams();

    useEffect(()=>{
      //vérifier s'il existe un cookie contenant l'utilisateur actuel
      const loggedUser = window.localStorage.getItem("loggedUser")
      if(loggedUser){
        const user = JSON.parse(loggedUser)
        //s'il existe, définit l'utilisateur actuel avec le cookie de l'utilisateur
        setUser(user)
      }
    },[])
    function useDocumentTitle(title) {
        useEffect(() => {
            document.title = title;
        }, [title]);
    }
    useDocumentTitle('Golaf! | Annuler une sortie')
    return (
      <>
        <Router>
          <NavBar user={user} setUser={setUser}/>
          <Routes>
            <Route path="/" element={<Accueil user={user}/>} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser}/>} />
            <Route path="/connecter" element={<SeConnecter user={user} setUser={setUser}/>} />
            <Route path="/creer" element={<CreerSortie user={user}/>} />
            <Route path="/sortie/:id" element={<Sortie/>} />
            <Route path="/profile/:userId" element={<AutreProfilUtilisateur id={userId}/>}/>
            <Route path="/details/:id" element={<DetailsSortie/>} />
            <Route path="/annuler/:sortieId" element={<AnnulerSortie/>}/>
            <Route path="/modifier/:sortieId" element={<ModificationSortie/>}/>
            <Route path="/administration" element={<PanelAdministration user={user}/>} />
          </Routes>
        </Router>
      </>
    )
}

export default App
