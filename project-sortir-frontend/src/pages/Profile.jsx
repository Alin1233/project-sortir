import {Box, Button, FormControl, FormLabel, Input, Center, Grid, VStack, Flex, Select, Image} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import serviceProfile from "../services/serviceProfile.js";
//import {request} from "axios";

const Profile = (props) => {

  //Etats, données

  const [pseudo, setPseudo]=useState('')
  const [nom, setNom]=useState('')
  const [prenom, setPrenom]=useState('')
  const [telephone, setTelephone]=useState('')
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const[confirmPassword,setConfirmPassword]=useState('')
  const [campus, setCampus]=useState('')
  const lisTest=['a','b','c']

//Comportements

  //Vérifie si User est connecté sinon le renvoie vers page de connection
  const navigate = useNavigate();
  useEffect(() => {
    if (props.user === null) {
      navigate('/connecter');
    }
  }, [navigate, props.user]);


  //Vérifie mot de passe et renvoie les infos vers BDD
  const handleSubmit=async(e)=> {
    e.preventDefault();
    if (password === confirmPassword){
      const user = {
        pseudo: pseudo,
        nom: nom,
        prenom: prenom,
        telephone: telephone,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        campus: campus
      }
      console.log(user)
      const response = await serviceProfile.modifierProfile(user);
      console.log(response)
    }else{
      alert('Attention votre mot de passe ne correspond pas à votre confirmation')
    }
  }

  const [list, setList]=useState(null);
  useEffect( ()=> {
    const requestCampus = async () =>{
      const resp = await serviceProfile.getCampus();
      setCampus(resp)
    }
    requestCampus();
    console.log(campus)
    },[]) ;
    /*useEffect(() => {
      const fetchData = async () => {
        const response = await serviceCampus.getAllCampusNoms();
        setCampuses(response)
      };
      fetchData();
    }, []);*/

    /*const objetCampus = result[1];
      const nomObjetCampus = objetCampus['nom']
      setCampus(nomObjetCampus)});*/
    //setCampus(requestCampus['campus']);



if (campus===null){
  return <div>Loading</div> }

//Affichage

  return (
      <Center h="100vh" mt="-50px">
        <Box boxSize='sm'>
          <VStack align="stretch">
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Image src="../img/IWantYou.png" alt='Hummm' />
          </VStack>
        </Box>
        <Box as="form" onSubmit={handleSubmit} w="50%" p="5" bg="white" boxShadow="md">
          <Grid templateColumns="auto" gap={6}>

            <VStack align="stretch">
              <FormControl id="pseudo">
                <FormLabel>Pseudo : </FormLabel>
                <Input type='text' name='pseudo' value={pseudo} onChange={(e) => setPseudo(e.target.value)} size="md" required={true}/>
              </FormControl>
              <FormControl id="prenom">
                <FormLabel>Prénom:</FormLabel>
                <Input type='text' name='prenom' value={prenom} onChange={(e) => setPrenom(e.target.value)} size="md" />
              </FormControl>
              <FormControl id="nom">
                <FormLabel>Nom :</FormLabel>
                <Input type='text' name='nom' value={nom} onChange={(e) => setNom(e.target.value)} size="md" />
              </FormControl>
              <FormControl id="telephone">
                <FormLabel>Telephone :</FormLabel>
                <Input type='text' name='telephone' value={telephone} onChange={(e) => setTelephone(e.target.value)} size="md" />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email :</FormLabel>
                <Input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} size="md" required={true}/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Mot de Passe:</FormLabel>
                <Input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} size="md" required={true}/>
              </FormControl>
              <FormControl id="confirmPassword">
                <FormLabel>Confirmation du Mot de Passe:</FormLabel>
                <Input type='password' name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} size="md" required={true}/>
              </FormControl>
              <FormControl id="campus">
                <FormLabel>Campus :</FormLabel>
                <Select onChange={(e)=>setCampus(e.target.value)} placeholder='Sélectionne une option'>
                  {campus.map((campus) => (
                      <option key={campus.id} value={campus.nom}>
                        {campus.nom}
                      </option>
                  ))}
                </Select>
              </FormControl>
            </VStack>
          </Grid>
          <Flex justify="space-between">
            <Button type="submit" name="register">Enregistrer</Button>
            <Button type="reset" name="reset">Annuler</Button>
          </Flex>
        </Box>
      </Center>
  )
}

export default Profile