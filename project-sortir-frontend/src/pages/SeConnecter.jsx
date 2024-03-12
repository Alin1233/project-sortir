/* eslint-disable react/prop-types */
import { useState } from "react";
import serviceUser from '../services/serviceUser'
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
const SeConnecter = (props) => {

  const[mail, setMail] = useState('');
  const[motdepasse, setMotdepasse] = useState('');


  const handleSubmit = async(e) => {
    e.preventDefault();
    //vérifier que le mot de passe et l'adresse email sont corrects
    const response = await serviceUser.connecterUser(mail, motdepasse)
    console.log(response);
    if(response !== undefined){
      //si oui, créer un cookie et définir l'utilisateur actuel comme utilisateur récupéré sur le serveur
      window.localStorage.setItem('loggedUser', JSON.stringify(response))
      props.setUser(response)
    }
  };

  return (
    <Box as="div">
    <form onSubmit={handleSubmit}>
      <FormControl id="mail">
        <FormLabel>Mail:</FormLabel>
        <Input type='text' name='mail' value={mail} onChange={(e) => setMail(e.target.value)} />
      </FormControl>
      <FormControl id="motdepasse">
        <FormLabel>Mot de passe:</FormLabel>
        <Input type='text' name='motdepasse' value={motdepasse} onChange={(e) => setMotdepasse(e.target.value)} />
      </FormControl>
      <Button type="submit">Connexion</Button>
    </form>
  </Box>
  )
}

export default SeConnecter