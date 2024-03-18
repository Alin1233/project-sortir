import {Box, Button, Center, FormControl, FormLabel, Heading, Text, Textarea, VStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import serviceSortie from "../services/serviceSortie.js";


const AnnulerSortie = () => {

    const sortieId  = useParams().sortieId;



    const [nom, setNom]=useState('')
    const [campus, setCampus]=useState( '')
    const [dateDebut, setDateDebut]=useState( '')
    const [motif, setMotif]=useState( '')
    const [nomLieu, setNomLieu]=useState('')
    const [rue, setRue]=useState('')
    const [codePostal, setCodePostal]=useState('')
    const [ville, setVille]=useState('')
    const [dateNonFormate, setDateNonFormate]=useState('')



    useEffect(()=> {
        const responseId = async ()=>{
            //récupération de toutes les infos via adresse api de l'utilisateur via l'id que l'on récupere dans l'url
            const response = await serviceSortie.getSortie(sortieId);
            console.log(response)
            setNom(response.responseSortie.nom)
            setDateNonFormate(response.responseSortie.dateHeureDebut)

            setCampus(response.responseSortie.campus)
            setVille(response.responseVille.nom)
            setCodePostal(response.responseVille.codePostal)
            setRue(response.responseLieu[0].rue)
            setNomLieu(response.responseLieu[0].nom)
            const date = new Date(dateNonFormate);
            const jour = date.getDate();
            const heure = date.getHours();
            const minute = date.getMinutes();
            const mois = date.getMonth() + 1;
            const annee = date.getFullYear();
            setDateDebut( `${jour}/${mois}/${annee} à ${heure}h${minute}`);


        }
        responseId();
        []});

    const handleClickRetour = ()=>{
        window.location.assign('/')
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await serviceSortie.annulerSortie(sortieId)
        console.log(response)
    }

    return(
        <Box>
            <Center mt="100px" p={5}>
                <Heading textDecoration="underline">Annuler une Sortie</Heading>
            </Center>
            <Center>
                <Box as="form" onSubmit={handleSubmit} w="50%" p="5" bg="white" boxShadow="md"  backgroundColor="#FFFAFA">
                    <Center>
                        <VStack align="stretch">

                            <Text>Nom de la sortie : {nom}</Text>
                            <Text>Date de la sortie :  {dateDebut}</Text>
                            <Text>Campus : {campus}</Text>
                            <Text>Lieu : {nomLieu},  {rue} {codePostal} {ville}</Text>
                            <FormControl id="description">
                                <FormLabel>Motif :</FormLabel>
                                <Textarea name='description' value={motif} onChange={(e) => setMotif(e.target.value)} size="md" />
                            </FormControl>
                            <Button type="submit" colorScheme='teal' name="register" >Enregistrer</Button>
                            <Button onClick={handleClickRetour}>Annuler</Button>
                        </VStack>
                    </Center>
                </Box>
            </Center>

        </Box>
    )
}

export default AnnulerSortie