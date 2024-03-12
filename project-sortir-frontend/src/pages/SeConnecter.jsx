import { useState } from "react";
import serviceUser from '../services/serviceUser'
const SeConnecter = () => {

  const[mail, setMail] = useState(' ');
  const[motdepasse, setMotdepasse] = useState(' ');
  const handleSubmit = (e) => {
    e.preventDefault();
    const respone = serviceUser.connecterUser(mail, motdepasse).then(res => console.log(res))
    console.log(respone);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Mail:</label>
        <input type='text' name='identifiant' value={mail} onChange={(e) => setMail(e.target.value)}></input>
        <label>Mot de passe:</label>
        <input type='text' name='motdepasse' value={motdepasse} onChange={(e) => setMotdepasse(e.target.value)}></input>
        <button type="submit">Connexion</button>
      </form>
    </div>
  )
}

export default SeConnecter