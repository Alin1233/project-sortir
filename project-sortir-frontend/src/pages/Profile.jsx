/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  VStack
} from "@chakra-ui/react";
import {useEffect,  useState} from "react";
import { useNavigate} from "react-router-dom";
import serviceProfile from "../services/serviceProfile.js";
import Loading from "../components/Loading.jsx";
import UploadImg from "../components/UploadImg.jsx";




const Profile = (props) => {

  const [pseudo, setPseudo]=useState(props.user && props.user.pseudo ? props.user.pseudo : '')
  const [nom, setNom]=useState(props.user && props.user.nom ? props.user.nom : '')
  const [prenom, setPrenom]=useState(props.user && props.user.prenom ? props.user.prenom : '')
  const [telephone, setTelephone]=useState(props.user && props.user.telephone ? props.user.telephone : '')
  const [email, setEmail]=useState(props.user && props.user.mail ? props.user.mail : '')
  const [password, setPassword]=useState('')
  const[confirmPassword,setConfirmPassword]=useState('')
  const [campus, setCampus]=useState(props.user && props.user.campus ? props.user.campus : '')
  const [campusList, setCampusList] = useState ( null)
  const [telephoneInvalide, setTelephoneInvalide]=useState('')
  const[image, setImage]=useState('defaut')
  const [chargement, setChargement] = useState(true);

  useEffect( ()=> {
    const requestCampus = async () =>{
      const resp = await serviceProfile.getCampus();
      setCampusList(resp)
    }
    requestCampus();
  },[]) ;

  useEffect(() => {
    // Vérifier si les props sont prêts
    if (props.user !== null) {
      // Les props sont prêts, arrêter le chargement et charger la page
      setChargement(false);
      setImage(props.user.image)
      setPseudo(props.user.pseudo)
      setNom(props.user.nom)
      setPrenom(props.user.prenom)
      setTelephone(props.user.telephone)
      setEmail(props.user.mail)
    }//On vérifie que le user ait bien une session ouverte sinon sa le retourne a l'accueil
    else if(localStorage.getItem('loggedUser')===null){
      window.location.assign(('/'))
    }
  }, [props.user]);


  function useDocumentTitle(title) {
    useEffect(() => {
      document.title = title;
    }, [title]);
  }
  useDocumentTitle('Golaf! | Mon profil')


  //Etats, données
  

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
        campus: campus,

      }
      console.log(user)
      const response = await serviceProfile.modifierProfile(user);
      /*const responseImage = await serviceProfile.uploadImage(image);
      console.log(responseImage)*/
      window.localStorage.setItem('loggedUser', JSON.stringify(response))
      props.setUser(response)
      console.log(response)
      if (response.status===500){
        alert('Erreur venant du serveur, profil non modifié')
      }else if(response.status===200){
        alert('Vous avez bien modifié votre profil avec succès')
        console.log(response)
      }
    }else{
      alert('Attention votre mot de passe ne correspond pas à votre confirmation')
    }
  }

  const handleClick = () =>{
    window.location.assign('/')
  }
  function validerNumeroTelephone(e) {
    // Expression régulière pour valider un numéro de téléphone
    const regex = /^\d{10}$/; // Vous pouvez ajuster cette expression régulière en fonction du format de numéro de téléphone que vous attendez
    return regex.test(e);
  }


  if (campusList===null){
    return <div><Loading/></div>
  }
  if(chargement){
    return <div><Loading/></div>;
  }



//Affichage


  return (

    <Box>
    <Center mt="10vh">
      <Heading as="h2" size="xl" color="teal.500"  mt="-100">Mon Profil</Heading>
    </Center>
    <Flex direction="row" justify="center" align="start"   gap={9}>
    <Center   gap={9} >
      <Box boxSize='sm' p="5" borderRadius="md">
        <VStack align="stretch" spacing={5} >
          <Image src={`http://localhost:8000/getimage/${image}`} alt='Hummm' borderRadius="full"/>
          <UploadImg user={props.user} setUser={props.setUser}/>
        </VStack>
      </Box>
      <Box as="form" onSubmit={handleSubmit} w={"auto"} p="5" bg="gray.100" boxShadow="lg" borderRadius="md" borderColor='teal.500' borderWidth="5px">
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <VStack align="stretch" spacing={5}>

                <FormControl id="pseudo">
                  <FormLabel>Pseudo : </FormLabel>
                  <Input bg="white" type='text' name='pseudo' value={pseudo} onChange={(e) => setPseudo(e.target.value)} size="md" required={true}/>
                </FormControl>
                <FormControl id="prenom">
                  <FormLabel>Prénom:</FormLabel>
                  <Input  bg="white" type='text' name='prenom' value={prenom} onChange={(e) => setPrenom(e.target.value)} size="md"/>
                </FormControl>
                <FormControl id="nom">
                  <FormLabel>Nom :</FormLabel>
                  <Input  bg="white" type='text' name='nom' value={nom} onChange={(e) => setNom(e.target.value)} size="md"/>
                </FormControl>
                <FormControl id="telephone">
                  <FormLabel>Telephone : {telephoneInvalide}</FormLabel>
                  <Input  bg="white" type='text' name='telephone' value={telephone} onChange={(e) => validerNumeroTelephone(e.target.value)?
                      (setTelephone(e.target.value) + setTelephoneInvalide(''))
                      :
                      (setTelephone(e.target.value) + setTelephoneInvalide('Numero de telephone invalide'))} size="md"/>
                </FormControl>
                </VStack>
                <VStack align="stretch" spacing={5}>
                <FormControl id="email">
                  <FormLabel>Email :</FormLabel>
                  <Input  bg="white" type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} size="md" required={true}/>
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Mot de Passe:</FormLabel>
                  <Input bg="white" type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} size="md" required={true}/>
                </FormControl>
                <FormControl id="confirmPassword">
                  <FormLabel>Confirmation du Mot de Passe:</FormLabel>
                  <Input bg="white" type='password' name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} size="md" required={true}/>
                </FormControl>
                <FormControl id="campus">
                  <FormLabel>Campus :</FormLabel>
                  <Select bg="white" value={campus} onChange={(e)=>{setCampus(e.target.value)}} placeholder="Sélectionner un campus" required={true}>
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
                <Button type="reset" colorScheme='red' variant="outline" name="reset" onClick={handleClick}>Annuler</Button>
            </Flex>
    </Box>
  </Center>
  </Flex>
</Box>
  )
}

export default Profile