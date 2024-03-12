import { useState } from "react";
import serviceUser from '../services/serviceUser'
const SeConnecter = () => {

  const[identifiant, setIdentifiant] = useState(' ');
  const[motdepasse, setMotdepasse] = useState(' ');
  const handleSubmit = (e) => {
    e.preventDefault();
    const respone = serviceUser.connecterUser(identifiant, motdepasse).then(res => console.log(res))
    console.log(respone);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Identifant:</label>
        <input type='text' name='identifiant' value={identifiant} onChange={(e) => setIdentifiant(e.target.value)}></input>
        <label>Mot de passe:</label>
        <input type='text' name='motdepasse' value={motdepasse} onChange={(e) => setMotdepasse(e.target.value)}></input>
        <button type="submit">Connexion</button>
      </form>
    </div>
  )
}

export default SeConnecter