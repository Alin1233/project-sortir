import { useState } from "react";

const SeConnecter = () => {

  const[identifiant, setIdentifiant] = useState(' ');
  const[motdepasse, setMotdepasse] = useState(' ');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(identifiant);
    console.log(motdepasse);
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