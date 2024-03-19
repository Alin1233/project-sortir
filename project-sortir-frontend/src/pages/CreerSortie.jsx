/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Center, Box, FormControl, FormLabel, Input, Button, Grid, VStack, Textarea, Flex, Select } from "@chakra-ui/react"
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

    const[lieuxVille, setLieuxVille] = useState('')
    const [villes, setVilles] = useState(null)

    //notification
    const [notification, setNotification] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    //si l'utilisateur est nul, redirection à la connexion
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
    useDocumentTitle('Golaf! | Créer une sortie')

    useEffect(()=>{
        const fetchVilles = async() => {
            const responseVilles = await serviceVille.getAllVilles()
            setLieuxVille(responseVilles[0].lieux)
            setVilles(responseVilles)
            setRue(responseVilles[0].lieux[0].rue)
            setCodePostal(responseVilles[0].codePostal)
            setLatitude(responseVilles[0].lieux[0].latitude)
            setLatitude(responseVilles[0].lieux[0].longitude)
            setVille(responseVilles[0].nom)
            setLieu(responseVilles[0].lieux[0].nom)
        }
        fetchVilles()
    },[])

    const handleSubmit = async(e) =>{
        e.preventDefault();
        let etat = null;
        if (e.nativeEvent.submitter.name === 'register') {
            etat = 'Creee'
        } else if (e.nativeEvent.submitter.name === 'publish') {
            etat = 'Ouverte'
        }
        const  sortie = {
            nom: nom,
            duree:duree,
            nbInscriptionMax:nbPlaces,
            infosSortie:description,
            etat:etat,
            nomLieu:lieu,
            rue:rue,
            codePostal: codePostal,
            latitude: latitude,
            longitude: longitude,
            organisateur: props.user,
            campus: props.user.campus.nom,
            dateHeureDebut: dateDebut,
            dateLimiteInscription:dateLimit,
            ville: ville
        }
        const response = await serviceSortie.creerSortie(sortie);
        if (response.status === 200) {
            setNotification({ status: 'success', description: 'Sortie créée avec succès' });
            setIsVisible(true);
            setTimeout(() => setIsVisible(false), 5000);
          }else{
            setNotification({ status: 'error', description: 'Une erreur est survenue, essayez à nouveau' });
            setIsVisible(true);
            setTimeout(() => setIsVisible(false), 5000);
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
    return (
        <Box >
            {notification && (
            <Box >
                <Notification status={notification.status} description={notification.description} isVisible={isVisible} />
            </Box>
            )}
        <Center  h="100vh" mt="-100px">
            <Box as="form" onSubmit={handleSubmit} w="50%" p="5" bg="white" boxShadow="md">
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <VStack align="stretch">
                        <FormControl id="nom">
                            <FormLabel>Nom de la sortie:</FormLabel>
                            <Input type='text' name='nom' value={nom} onChange={(e) => setNom(e.target.value)} size="md" />
                        </FormControl>
                        <FormControl id="dateDebut">
                            <FormLabel>Date et heure de la sortie:</FormLabel>
                            <Input type='datetime-local' name='dateDebut' value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} size="md" />
                        </FormControl>
                        <FormControl id="dateLimit">
                            <FormLabel>Date limite d'inscription:</FormLabel>
                            <Input type='datetime-local' name='dateLimit' value={dateLimit} onChange={(e) => setDateLimit(e.target.value)} size="md" />
                        </FormControl>
                            <FormControl id="nbPlaces">
                            <FormLabel>Nombre de Places:</FormLabel>
                            <Input type='number' name='nbPlaces' value={nbPlaces} onChange={(e) => setNbPlaces(e.target.value)} size="md" />
                        </FormControl>
                        <FormControl id="duree">
                            <FormLabel>Durée:</FormLabel>
                            <Input type='text' name='duree' value={duree} onChange={(e) => setDuree(e.target.value)} size="md" />
                        </FormControl>
                        <FormControl id="description">
                            <FormLabel>Description et infos:</FormLabel>
                            <Textarea name='description' value={description} onChange={(e) => setDescription(e.target.value)} size="md" />
                        </FormControl>
                        <FormControl id="campus">
                            <FormLabel>Campus:</FormLabel>
                            <Input type='text' disabled name='campus' defaultValue={props.user && props.user.campus ? props.user.campus.nom : ''} size="md" />
                        </FormControl>
                    </VStack>
                    <VStack align="stretch">
                        <FormControl id="ville">
                            <FormLabel>Ville:</FormLabel>
                            <Select name='ville' onChange={(e) => setVille(e.target.value)} defaultValue={ville}>
                                {villes.map((ville) => (
                                    <option key={ville.id} value={ville.nom}>
                                    {ville.nom}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                            <FormControl id="lieu">
                            <FormLabel>Lieu:</FormLabel>
                            <Select name='lieu' onChange={(e) => setLieu(e.target.value)} defaultValue={lieu}>
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
                </Grid>
                <Flex justify="space-between">
                    <Button type="submit" name="register">Register</Button>
                    <Button type="submit" name="publish">Publier la sortie</Button>
                 </Flex>
            </Box>
            <Box w="400px" h="400px">
                    <MapComponent longitude={longitude} latitude={latitude}/>
            </Box>

        </Center>
    </Box>
)

}

export default CreerSortie