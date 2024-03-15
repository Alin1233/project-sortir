/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Center,
  Grid,
  VStack,
  Flex,
  Select,
  Image,
  Heading
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import serviceProfile from "../services/serviceProfile.js";
import Loading from "../components/Loading.jsx";

const Profile = (props) => {

  useEffect( ()=> {
    const requestCampus = async () =>{
      const resp = await serviceProfile.getCampus();
      setCampusList(resp)
    }
    requestCampus();
  },[]) ;

  //Vérifie si User est connecté sinon le renvoie vers page de connection
  const navigate = useNavigate();

  useEffect(() => {
    if (props.user === null) {
      navigate('/connecter');
    }
  }, [navigate, props.user]);

  function useDocumentTitle(title) {
    useEffect(() => {
      document.title = title;
    }, [title]);
  }
  useDocumentTitle('Golaf! | Mon profil')

  //Etats, données

  const [pseudo, setPseudo]=useState(props.user && props.user.pseudo ? props.user.pseudo : '')
  const [nom, setNom]=useState(props.user && props.user.nom ? props.user.nom : '')
  const [prenom, setPrenom]=useState(props.user && props.user.prenom ? props.user.prenom : '')
  const [telephone, setTelephone]=useState(props.user && props.user.telephone ? props.user.telephone : '')
  const [email, setEmail]=useState(props.user && props.user.mail ? props.user.mail : '')
  const [password, setPassword]=useState('')
  const[confirmPassword,setConfirmPassword]=useState('')
  const [campus, setCampus]=useState(null)
  const [campusList, setCampusList] = useState ( null)

//Comportements

  //Vérifie mot de passe et renvoie les infos vers BDD
  const handleSubmit=async(e)=> {
    e.preventDefault();
    if (password === confirmPassword){
      const user = {
        id: props.user.id,
        pseudo: pseudo,
        nom: nom,
        prenom: prenom,
        telephone: telephone,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        campus: campus
      }
      const response = await serviceProfile.modifierProfile(user);
      console.log(response)
      if (response.status===500){
        alert('Erreur venant du serveur, profil non modifié')
      }
      alert('Vous avez bien modifié votre profil avec succès')
    }else{
      alert('Attention votre mot de passe ne correspond pas à votre confirmation')
    }
  }
  if (campusList===null){
    return <div><Loading/></div>
  }
  if(props.user===null){
    return <div> <Loading/></div>;
  }


//Affichage

  return (
          <Box>
            <Center mt="100px">
              <Heading textDecoration="underline">Mon Profil</Heading>
            </Center>
            <Center h="100vh" mt="-200px" gap={9}>
              <Box boxSize='sm'>
                <VStack align="stretch" >
                  {/* eslint-disable-next-line react/jsx-no-undef */}
                  <Image src="../img/IWantYou.png" alt='Hummm' borderRadius="full" />
                </VStack>
              </Box>
              <Box as="form" onSubmit={handleSubmit} w="50%" p="5" bg="white" boxShadow="md" backgroundColor="#FFFAFA">
                <Grid templateColumns="auto" gap={6}>
                  <VStack align="stretch">
                    <FormControl id="pseudo">
                      <FormLabel>Pseudo : </FormLabel>
                      <Input type='text' name='pseudo' value={pseudo} onChange={(e) => setPseudo(e.target.value)} size="md" required={true}/>
                    </FormControl>
                    <FormControl id="prenom">
                      <FormLabel>Prénom:</FormLabel>
                      <Input type='text' name='prenom' value={prenom} onChange={(e) => setPrenom(e.target.value)} size="md"/>
                    </FormControl>
                    <FormControl id="nom">
                      <FormLabel>Nom :</FormLabel>
                      <Input type='text' name='nom' value={nom} onChange={(e) => setNom(e.target.value)} size="md"/>
                    </FormControl>
                    <FormControl id="telephone">
                      <FormLabel>Telephone :</FormLabel>
                      <Input type='text' name='telephone' value={telephone} onChange={(e) => setTelephone(e.target.value)} size="md"/>
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
                      <Select value={props.user.campus.nom} onChange={(e)=>setCampus(e.target.value)}>
                        {campusList.map((campusList) => (
                            <option key={campusList.id} value={campusList.nom}>
                              {campusList.nom}
                            </option>
                        ))}
                      </Select>
                    </FormControl>
                  </VStack>
                </Grid>
                <Flex justify="space-between" mt="20px">
                  <Button type="submit" colorScheme='teal' name="register">Enregistrer</Button>
                  <Button type="reset" name="reset">Annuler</Button>
                </Flex>
              </Box>
            </Center>
          </Box>
  )
}

export default Profile