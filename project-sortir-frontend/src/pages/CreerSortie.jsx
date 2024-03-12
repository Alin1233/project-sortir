/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Center, Box, FormControl, FormLabel, Input, Button, Grid, VStack, Textarea } from "@chakra-ui/react"
const CreerSortie = (props) => {

    const[nom, setNom] = useState('')
    const[dateDebut, setDateDebut] = useState('')
    const[dateLimit, setDateLimit] = useState('')
    const[nbPlaces, setNbPlaces] = useState('')
    const[duree, setDuree] = useState('')
    const[description, setDescription] = useState('')
    const [campus, setCampus] = useState('')
    const [ville, setVille] = useState('')
    const [lieu, setLieu] = useState('')
    const [rue, setRue] = useState('')
    const [codePostal, setCodePostal] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    //si l'utilisateur est nul, redirection à la connexion
    const navigate = useNavigate();
    useEffect(() => {
        if (props.user === null) {
            navigate('/connecter');
        }
    }, [navigate, props.user]);
    

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(props.user.campus.nom);
    }
    

    return (
        <Center as="div" h="100vh" mt="-100px">
            <Box as="form" onSubmit={handleSubmit} w="50%" p="5" bg="white" boxShadow="md">
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <VStack align="stretch">
                        <FormControl id="nom">
                            <FormLabel>Nom de la sortie:</FormLabel>
                            <Input type='text' name='nom' value={nom} onChange={(e) => setNom(e.target.value)} size="md" />
                        </FormControl>
                        <FormControl id="dateDebut">
                            <FormLabel>Date et heure de la sortie:</FormLabel>
                            <Input type='date' name='dateDebut' value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} size="md" />
                        </FormControl>
                        <FormControl id="dateLimit">
                            <FormLabel>Date limite d'inscription:</FormLabel>
                            <Input type='date' name='dateLimit' value={dateLimit} onChange={(e) => setDateLimit(e.target.value)} size="md" />
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
                            <Input type='text' disabled name='campus' defaultValue={props.user && props.user.campus ? props.user.campus.nom : ''} onChange={(e) => setCampus(e.target.value)} size="md" />
                        </FormControl>
                    </VStack>
                    <VStack align="stretch">
                        <FormControl id="ville">
                            <FormLabel>Ville:</FormLabel>
                            <Input type='text' name='ville' value={ville} onChange={(e) => setVille(e.target.value)} size="md" />
                        </FormControl>
                            <FormControl id="lieu">
                            <FormLabel>Lieu:</FormLabel>
                            <Input type='text' name='lieu' value={lieu} onChange={(e) => setLieu(e.target.value)} size="md" />
                        </FormControl>
                            <FormControl id="rue">
                            <FormLabel>Rue:</FormLabel>
                            <Input type='text' name='rue' value={rue} onChange={(e) => setRue(e.target.value)} size="md" />
                        </FormControl>
                            <FormControl id="codePostal">
                            <FormLabel>Code Postal:</FormLabel>
                            <Input type='text' name='codePostal' value={codePostal} onChange={(e) => setCodePostal(e.target.value)} size="md" />
                        </FormControl>
                            <FormControl id="latitude">
                            <FormLabel>Latitude:</FormLabel>
                            <Input type='text' name='latitude' value={latitude} onChange={(e) => setLatitude(e.target.value)} size="md" />
                        </FormControl>
                            <FormControl id="longitude">
                            <FormLabel>Longitude:</FormLabel>
                            <Input type='text' name='longitude' value={longitude} onChange={(e) => setLongitude(e.target.value)} size="md" />
                        </FormControl>
                    </VStack>
                </Grid>
                <Button type="submit">Create</Button>
            </Box>
        </Center>
)

}

export default CreerSortie