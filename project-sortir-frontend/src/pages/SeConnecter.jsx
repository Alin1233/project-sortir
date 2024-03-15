/* eslint-disable react/prop-types */
import {useEffect, useState} from "react";
import serviceUser from '../services/serviceUser'
import {Box, Button, FormControl, FormLabel, Input, Center, Checkbox, Grid} from "@chakra-ui/react";
const SeConnecter = (props) => {

  const[mail, setMail] = useState('');
  const[motdepasse, setMotdepasse] = useState('');
  const[resterConnecter, setResterConnecter]=useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();
    //vérifier que le mot de passe et l'adresse email sont corrects
    const response = await serviceUser.connecterUser(mail, motdepasse)
    if (resterConnecter){
      window.localStorage.setItem("stayCo; expires=15770000", JSON.stringify(response))
    }
    if(response !== undefined){
      //si oui, créer un cookie et définir l'utilisateur actuel comme utilisateur récupéré sur le serveur
      window.localStorage.setItem('loggedUser', JSON.stringify(response))
      console.log(response)
      props.setUser(response)
      window.location.assign('/')
    }else{
      alert('Erreur lors de votre saisis de vos identifiants veuillez réessayer svp')
    }
  };

  useEffect(()=>{
    const stayCo=window.localStorage.getItem('stayCo')
    console.log(stayCo)
    if (stayCo){
            const stayCoDecode = JSON.parse(stayCo)
            console.log(stayCoDecode)
            }
          },
  [])

  return (
    <Center as="div" h="100vh" mt="-200px">
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