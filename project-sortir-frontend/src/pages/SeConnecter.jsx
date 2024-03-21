/* eslint-disable react/prop-types */
import {useEffect, useState} from "react";
import serviceUser from '../services/serviceUser'
import {Box, Button, FormControl, FormLabel, Input, Center, Checkbox, Grid} from "@chakra-ui/react";
import Notification from "../components/Notification";
const SeConnecter = (props) => {

  const[mail, setMail] = useState('');
  const[motdepasse, setMotdepasse] = useState('');
  const[resterConnecter, setResterConnecter]=useState(false)

  //notification
  const [notification, setNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    //vérifier que le mot de passe et l'adresse email sont corrects
    const response = await serviceUser.connecterUser(mail, motdepasse)
    if (resterConnecter && response !==undefined){
      document.cookie = 'stayCo='+response.id+'; path=/; max-age= 60'
      //window.localStorage.setItem("stayCo", JSON.stringify(response))
    }
    if(response !== undefined){
      //si oui, créer un cookie et définir l'utilisateur actuel comme utilisateur récupéré sur le serveur
      window.localStorage.setItem('loggedUser', JSON.stringify(response))
      props.setUser(response)
      setNotification({ status: 'success', description: 'Connexion réussie! Vous allez être redirigé vers l\'accueil' });
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        window.location.assign('/');
      }, 1000);
    }else{
      setNotification({ status: 'error', description: 'Mauvais mot de passe ou email, essayez encore !' });
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 5000);
    }
  };

  useEffect(()=>{
    const cookies =document.cookie
    const cookieArray = cookies.split('; ');
    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i];
      const parts = cookie.split('=');
      const name = parts[0];
      const value = parts[1];

      if (name==="stayCo"){
        const connection=async()=>{
          const response = await serviceUser.cookieConnection(value)
          if (response!==undefined){
            window.localStorage.setItem('loggedUser', JSON.stringify(response))
            props.setUser(response)
            window.location.assign('/')
          }
        }
        connection();
      }
    }
            []})

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
          <Input type='password' name='motdepasse' value={motdepasse} onChange={(e) => setMotdepasse(e.target.value)} size="md" />
        </FormControl>
        <Grid mt={3} templateColumns="repeat(2, 1fr)" gap={10}>
          <Button type="submit">Connexion</Button>
          <Checkbox checked={false} onChange={setResterConnecter}>Rester Connecté</Checkbox>
        </Grid>
      </Box>
    </Center>
  );
}

export default SeConnecter