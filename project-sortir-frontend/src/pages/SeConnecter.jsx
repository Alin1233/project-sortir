/* eslint-disable react/prop-types */
import { useState } from "react";
import serviceUser from '../services/serviceUser'
const SeConnecter = (props) => {

  const[mail, setMail] = useState('');
  const[motdepasse, setMotdepasse] = useState('');


  const handleSubmit = async(e) => {
    e.preventDefault();
    //vérifier que le mot de passe et l'adresse email sont corrects
    const response = await serviceUser.connecterUser(mail, motdepasse)
    if(response !== undefined){
      //si oui, créer un cookie et définir l'utilisateur actuel comme utilisateur récupéré sur le serveur
      window.localStorage.setItem('loggedUser', JSON.stringify(response))
      props.setUser(response)
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Mail:</label>
        <input type='text' name='mail' value={mail} onChange={(e) => setMail(e.target.value)}></input>
        <label>Mot de passe:</label>
        <input type='text' name='motdepasse' value={motdepasse} onChange={(e) => setMotdepasse(e.target.value)}></input>
        <button type="submit">Connexion</button>
      </form>
    </div>
  )
}

export default SeConnecter