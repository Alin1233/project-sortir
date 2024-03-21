/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Center, Box, FormControl, FormLabel, Input, Button, Grid, VStack, Textarea, Flex, Select, Heading } from "@chakra-ui/react"
import serviceSortie from "../services/serviceSortie"
import serviceVille from "../services/serviceVille"
import MapComponent from "../components/MapComponent"
import Loading from "../components/Loading"
import Notification from "../components/Notification";
const CreerSortie = (props) => {

    const[nom, setNom] = useState('')
    const[dateDebut, setDateDebut] = useState('')
    const[dateLimit, setDateLimit] = useState('')
    const[nbPlaces, setNbPlaces] = useState('')
    const[duree, setDuree] = useState('')
    const[description, setDescription] = useState('')
    const [ville, setVille] = useState('')
    const [lieu, setLieu] = useState('')
    const [rue, setRue] = useState('')
    const [codePostal, setCodePostal] = useState('')
    const [latitude, setLatitude] = useState( 47.227479546104746)
    const [longitude, setLongitude] = useState(-1.5507239538023578)
    const [date, setDate]=useState('')
    const [messagePlace, setMessagePlace] =useState('')
    const [messageDuree , setMessageDuree]=useState('')
    const [chargement, setChargement] = useState(true);

    const[lieuxVille, setLieuxVille] = useState('')
    const [villes, setVilles] = useState(null)

    //notification
    const [notification, setNotification] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    //si l'utilisateur est nul, redirection à la connexion

    /*const navigate = useNavigate();
    useEffect(() => {
        if (props.user === null) {
            navigate('/connecter');
        }
    }, [navigate, props.user]);*/

    function useDocumentTitle(title) {
        useEffect(() => {
            document.title = title;
        }, [title]);
    }
    useDocumentTitle('Golaf! | Créer une sortie')

    function verifChiffrePositif(param){
        if(param<=0){
            return false
        }
        return true
    }

    function dateDuJour(){
        const dateActuelle = new Date();
        return  dateActuelle.toISOString().slice(0, 16);
    }

    useEffect(()=>{
        setDate(dateDuJour);
        const fetchVilles = async() => {
            const responseVilles = await serviceVille.getAllVilles()
            setLieuxVille(responseVilles[0].lieux)
            setVilles(responseVilles)
            setRue(responseVilles[0].lieux[0].rue)
            setCodePostal(responseVilles[0].codePostal)
            setLatitude(responseVilles[0].lieux[0].latitude)
            setLongitude(responseVilles[0].lieux[0].longitude)
            setVille(responseVilles[0].nom)
            setLieu(responseVilles[0].lieux[0].nom)
        }
        fetchVilles()
    },[])

    useEffect(() => {
        // Vérifier si les props sont prêts
        if (props.user !== null) {
            setChargement(false);
        }//On vérifie que le user ait bien une session ouverte sinon sa le retourne a l'accueil
        else if(localStorage.getItem('loggedUser')===null){
                window.location.assign(('/'))
            }
        }, [props.user]);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        let etat = null;
        if (e.nativeEvent.submitter.name === 'register') {
            etat = 'Creee'
        } else if (e.nativeEvent.submitter.name === 'publish') {
            etat = 'Ouverte'
        }
        if (!verifChiffrePositif(duree) || !verifChiffrePositif(nbPlaces)){
            setNotification({ status: 'error', description: 'Tu ne sais pas lire Bruh!' });
            setIsVisible(true);
            setTimeout(() => setIsVisible(false), 5000);
        }else {
            const sortie = {
                nom: nom,
                duree: duree,
                nbInscriptionMax: nbPlaces,
                infosSortie: description,
                etat: etat,
                nomLieu: lieu,
                rue: rue,
                codePostal: codePostal,
                latitude: latitude,
                longitude: longitude,
                organisateur: props.user,
                campus: props.user.campus.nom,
                dateHeureDebut: dateDebut,
                dateLimiteInscription: dateLimit,
                ville: ville
            }
            const response = await serviceSortie.creerSortie(sortie);
            if (response.status === 200) {
                setNotification({status: 'success', description: 'Sortie créée avec succès'});
                setIsVisible(true);
                setTimeout(() => {
                    setIsVisible(false);
                    window.location.assign('/');
                  }, 2000);
            } else {
                setNotification({status: 'error', description: 'Une erreur est survenue, essayez à nouveau'});
                setIsVisible(true);
                setTimeout(() => setIsVisible(false), 5000);
            }
        }
    }
    useEffect(() => {
        if (villes) {
            const selectedVille = villes.find(v => v.nom === ville);
            if (selectedVille && selectedVille.lieux[0]) {
                setCodePostal(selectedVille.codePostal);
                setLieuxVille(selectedVille.lieux);
                setLieu(selectedVille.lieux[0].nom); 
            }
        }
    }, [ville, villes]);
    
    useEffect(() => {
        if (lieuxVille) {
            const selectedLieu = lieuxVille.find(l => l.nom === lieu)
            if(selectedLieu){
                setRue(selectedLieu.rue)
                setLatitude(selectedLieu.latitude)
                setLongitude(selectedLieu.longitude)
            }
        }
    }, [lieu, lieuxVille]);

    if(villes === null){
        return <Loading/>
    }
    if(chargement){
        return <div><Loading/></div>;
    }

    return (
        <Box >
            {notification && (
            <Box >
                <Notification status={notification.status} description={notification.description} isVisible={isVisible} />
            </Box>
            )}
        <Center mt="10vh">
            <Heading as="h2" size="xl" color="teal.500"  mt="-100">Créer une sortie</Heading>                                                        
        </Center>
        <Center  h="100vh" mt="-120px">
            <Box as="form" onSubmit={handleSubmit} w="50%" p="5" bg="gray.100" boxShadow="md"  borderColor='teal.500' borderWidth="5px"  borderRadius="20px">
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <VStack align="stretch">
                        <FormControl id="nom">
                            <FormLabel>Nom de la sortie:</FormLabel>
                            <Input bg="white" type='text' name='nom' value={nom} onChange={(e) => setNom(e.target.value)} size="md" />
                        </FormControl>
                        <FormControl id="dateDebut">
                            <FormLabel>Date et heure de la sortie:</FormLabel>
                            <Input bg="white" type='datetime-local' name='dateDebut' value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} size="md" min={date}/>
                        </FormControl>
                        <FormControl id="dateLimit">
                            <FormLabel>Date limite d'inscription:</FormLabel>
                            <Input bg="white" max={dateDebut} type='datetime-local' name='dateLimit' value={dateLimit} onChange={(e) => setDateLimit(e.target.value)} size="md" min={date} />
                        </FormControl>
                            <FormControl id="nbPlaces">
                            <FormLabel>Nombre de Places: {messagePlace}</FormLabel>
                            <Input bg="white" type='number' name='nbPlaces' value={nbPlaces} onChange={(e) => verifChiffrePositif(e.target.value)?(setNbPlaces(e.target.value) + setMessagePlace('')):(setNbPlaces(e.target.value)+ setMessagePlace('Veuillez choisir un nombre de places positif!'))} size="md" />
                        </FormControl>
                        <FormControl id="duree">
                            <FormLabel>Durée: {messageDuree}</FormLabel>
                            <Input bg="white" type='number' name='duree' value={duree} onChange={(e) => verifChiffrePositif(e.target.value)?(setDuree(e.target.value) + setMessageDuree('')):(setDuree(e.target.value)+ setMessageDuree('Veuillez choisir une durée positive!'))} size="md" />
                        </FormControl>
                        <FormControl id="description">
                            <FormLabel>Description et infos:</FormLabel>
                            <Textarea bg="white" name='description' value={description} onChange={(e) => setDescription(e.target.value)} size="md" />
                        </FormControl>
                        <FormControl id="campus">
                            <FormLabel>Campus:</FormLabel>
                            <Input  bg="white" type='text' disabled name='campus' defaultValue={props.user && props.user.campus ? props.user.campus.nom : ''} size="md" />
                        </FormControl>
                    </VStack>
                    <VStack align="stretch">
                        <FormControl id="ville">
                            <FormLabel>Ville:</FormLabel>
                            <Select bg="white" name='ville' onChange={(e) => setVille(e.target.value)} defaultValue={ville}>
                                {villes.map((ville) => (
                                    <option key={ville.id} value={ville.nom}>
                                    {ville.nom}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                            <FormControl id="lieu">
                            <FormLabel>Lieu:</FormLabel>
                            <Select bg="white" name='lieu' onChange={(e) => setLieu(e.target.value)} defaultValue={lieu}>
                                {lieuxVille.map((lieu) => (
                                    <option key={lieu.id} value={lieu.nom}>
                                    {lieu.nom}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl id="rue">
                            <FormLabel>Rue:</FormLabel>
                            <Input disabled type='text' name='rue' value={rue} size="md" />
                        </FormControl>
                            <FormControl id="codePostal">
                            <FormLabel>Code Postal:</FormLabel>
                            <Input disabled type='text' name='codePostal' value={codePostal}  size="md" />
                        </FormControl>
                        <FormControl id="latitude">
                            <FormLabel>Latitude:</FormLabel>
                            <Input disabled type='number' name='latitude' value={latitude} size="md" />
                        </FormControl>
                        <FormControl id="longitude">
                            <FormLabel>Longitude:</FormLabel>
                            <Input disabled type='number' name='longitude' value={longitude} size="md" />
                        </FormControl>
                    </VStack>
                    <Box ml="10px" w="400px" h="400px" mt="120px">
                             <MapComponent longitude={longitude} latitude={latitude}/>
                    </Box>
                </Grid>
                <Flex justify="space-between">
                    <Button type="submit" name="register" colorScheme='teal'>Register</Button>
                    <Button type="submit" name="publish" colorScheme='teal'>Publier la sortie</Button>
                 </Flex>
            </Box>
        </Center>
    </Box>
)

}

export default CreerSortie