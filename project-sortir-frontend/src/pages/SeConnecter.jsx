/* eslint-disable react/prop-types */
import { useState } from "react";
import serviceUser from '../services/serviceUser'
import {Box, Button, FormControl, FormLabel, Input, Center, Checkbox, Grid} from "@chakra-ui/react";
import Notification from "../components/Notification";
const SeConnecter = (props) => {

  const[mail, setMail] = useState('');
  const[motdepasse, setMotdepasse] = useState('');

  //notification
  const [notification, setNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    //vérifier que le mot de passe et l'adresse email sont corrects
    const response = await serviceUser.connecterUser(mail, motdepasse)
    if(response !== undefined){
      //si oui, créer un cookie et définir l'utilisateur actuel comme utilisateur récupéré sur le serveur
      window.localStorage.setItem('loggedUser', JSON.stringify(response))
      props.setUser(response)
      setNotification({ status: 'success', description: 'Connexion réussie!' });
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 5000);
      window.location.assign('/')
    }else{
      setNotification({ status: 'error', description: 'Mauvais mot de passe ou email, essayez encore !' });
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 5000);
    }
  };

  return (
    <Center as="div" h="100vh" mt="-200px">
      {notification && <Notification status={notification.status} description={notification.description} isVisible={isVisible} />}
      <Box as="form" onSubmit={handleSubmit} w="50%">
        <FormControl id="mail">
          <FormLabel>Mail:</FormLabel>
          <Input type='text' name='mail' value={mail} onChange={(e) => setMail(e.target.value)} size="md" />
        </FormControl>
        <FormControl id="motdepasse">
          <FormLabel>Mot de passe:</FormLabel>
          <Input type='text' name='motdepasse' value={motdepasse} onChange={(e) => setMotdepasse(e.target.value)} size="md" />
        </FormControl>
        <Grid mt={3} templateColumns="repeat(2, 1fr)" gap={10}>
          <Button type="submit">Connexion</Button>
          <Checkbox>Rester Connecté</Checkbox>
        </Grid>
      </Box>
    </Center>
  );
}

export default SeConnecter