import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { format } from "date-fns";
import fr from 'date-fns/locale/fr';
import serviceSortie from "../services/serviceSortie.js";
import {
    Badge,
    Box, Button,
    Center,
    Flex,
    Grid, GridItem,
    Heading,
    List,
    ListIcon,
    ListItem, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Text, useDisclosure
} from "@chakra-ui/react";
import Loading from "../components/Loading.jsx";
import MapComponent from "../components/MapComponent.jsx";

const DetailsSortie = () => {
    const id = 5; // ID fixe, considérez d'utiliser useParams() pour un ID dynamique si nécessaire
    const [sortie, setSortie] = useState(null);
    const [lieu, setLieu] = useState(null);
    const [ville, setVille] = useState(null);
    const [participants, setParticipants] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const fetchSortie = async () => {
            try {
                const {responseSortie, responseLieu, responseVille, responseParticipants} = await serviceSortie.getSortie(id);
                if (responseSortie && responseLieu) {
                    setSortie(responseSortie);
                    setLieu(responseLieu);
                    setVille(responseVille);
                    setParticipants(responseParticipants);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des détails de la sortie :", error);
            }
        };
        fetchSortie();
    }, []); // Dépendances vides pour exécuter une fois

// Effet pour réagir aux changements de `lieu`
    useEffect(() => {
    }, [lieu]);

    function useDocumentTitle(title) {
        useEffect(() => {
            document.title = title;
        }, [title]);
    }
    useDocumentTitle('Golaf! | Détails')

    if (!sortie && !lieu && !ville) {
        return (
            <div>
                <Loading/>
            </div>
        );
    }

    return (


        <div>
            <Center mb="6">
                <Heading as='h1' size='3xl' color="teal.400">Détails</Heading>
            </Center>

            <Center>
                <Box minW="1000px" minH="auto" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="gray.50"
                     boxShadow="2xl">
                    <Box p={6}>
                        <Heading size="xl" my={4} color="teal.600">
                            {sortie.nom}
                        </Heading>

                        <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]} gap={10} alignItems="start">
                            <Box>
                                <Text fontSize='2xl' mb="3" color="gray.700">Date & Heure de la sortie : <Box as="span"
                                                                                                              fontWeight="bold">{format(sortie.dateHeureDebut, "d MMMM yyyy à HH:mm", {locale: fr})}</Box></Text>
                                <Text fontSize='2xl' mb="3" color="gray.700">Date limite d'inscription : <Box as="span"
                                                                                                              fontWeight="bold">{format(sortie.dateLimiteInscription, "d MMMM yyyy à HH:mm", {locale: fr})}</Box></Text>
                                <Text fontSize='2xl' mb="3" color="gray.700">Nombre de places : <Box as="span"
                                                                                                     fontWeight="bold">{sortie.nbInscriptionMax}</Box></Text>
                                <Text fontSize='2xl' mb="3" color="gray.700">Durée : <Box as="span"
                                                                                          fontWeight="bold">{sortie.duree} minutes</Box></Text>
                                <Text fontSize='2xl' mb="3" color="gray.700">Informations supplémentaires : <Box
                                    as="span" fontWeight="bold">{sortie.infosSortie}</Box></Text>
                                <Text fontSize='2xl' mb="3" color="gray.700">Organisateur : <Box as="span"
                                                                                                 fontWeight="bold">{sortie.organisateur}</Box></Text>
                            </Box>
                            <Box>
                                <Text fontSize='2xl' mb="3" color="gray.700">Campus : <Box as="span"
                                                                                           fontWeight="bold">{sortie.campus}</Box></Text>
                                <Text fontSize='2xl' mb="3" color="gray.700">Lieu : <Box as="span"
                                                                                         fontWeight="bold">{sortie.lieu}</Box></Text>
                                <Text fontSize='2xl' mb="3" color="gray.700">Rue : <Box as="span"
                                                                                        fontWeight="bold">{lieu[0]?.rue}</Box></Text>
                                <Text fontSize='2xl' mb="3" color="gray.700">Code postal : <Box as="span"
                                                                                                fontWeight="bold">{ville.codePostal}, {ville.nom}</Box></Text>
                                <Text fontSize='2xl' mb="3" color="gray.700">Latitude : <Box as="span"
                                                                                             fontWeight="bold">{lieu[0]?.latitude}</Box></Text>
                                <Text fontSize='2xl' mb="3" color="gray.700">Longitude : <Box as="span"
                                                                                              fontWeight="bold">{lieu[0]?.longitude}</Box></Text>
                            </Box>
                        </Grid>
                    </Box>
                </Box>
            </Center>



            <Grid templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]} gap={6} p={5}>
                <GridItem colSpan={2}>
                    <Heading as="h2" size="xl" mb={4}>Participants de la Sortie</Heading>
                    <List spacing={3}>
                        {participants.map((participant, index) => (
                            <ListItem key={index} fontSize="xl">
                                <ListIcon as='' color="teal.600" />
                                <Badge colorScheme="teal" ml="10" fontSize="large">{participant.nom}</Badge>
                            </ListItem>
                        ))}
                    </List>
                </GridItem>

                <GridItem colStart={3}>
                    <Button onClick={onOpen} colorScheme="teal">Afficher sur la carte</Button>

                    <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
                        <ModalOverlay/>
                        <ModalContent>
                            <ModalHeader>Carte</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody>
                                <MapComponent longitude={lieu[0]?.latitude} latitude={lieu[0]?.longitude}/>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} onClick={onClose}>
                                    Fermer
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </GridItem>
            </Grid>


        </div>
    )
};

export default DetailsSortie;