import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Button,
    Text, Center, FormControl, FormLabel, Input, VStack, Select, Textarea, useToast, Box, Icon, Flex
} from "@chakra-ui/react";
import {AddIcon, CalendarIcon, CheckCircleIcon, DeleteIcon, TimeIcon, WarningIcon} from "@chakra-ui/icons";
// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import servicePanelAdmin from "../services/servicePanelAdmin.js";
import serviceProfile from "../services/serviceProfile.js";


// eslint-disable-next-line react/prop-types
const CustomDrawer = ({ isOpen, onClose, drawerType }) => {

    const [nomVille, setNomVille] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [selectedVilleId, setSelectedVilleId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [campusListe, setCampusList] = useState ( null)
    const [selectedCampusId, setSelectedCampusId] = useState('');
    const [idUser, setIdUser] = useState('');
    const [idSortie, setIdSortie] = useState('');
    const [motifAnnulation, setMotifAnnulation] = useState('');
    const [nomLieu, setNomLieu] = useState('');
    const [rueLieu, setRueLieu] = useState('');
    const [latitudeLieu, setLatitudeLieu] = useState('');
    const [longitudeLieu, setLongitudeLieu] = useState('');

    const[lieuxVille, setLieuxVille] = useState('');
    const [villes, setVilles] = useState(null);

    const toast = useToast();
    const [ville, setVille] = useState('');
    const [lieu, setLieu] = useState('');
    const [rue, setRue] = useState('');
    const[selectedLieu, setSelectedLieu] = useState('');

    const chargerVillesAvecLieux = async() => {
        const responseVilles = await servicePanelAdmin.getAllVilles()
        setLieuxVille(responseVilles[0].lieux)
        setVilles(responseVilles)
        setRue(responseVilles[0].lieux[0].rue)
        setCodePostal(responseVilles[0].codePostal)
        setVille(responseVilles[0].nom)
        setLieu(responseVilles[0].lieux[0].nom)
    }

    const chargerCampus = async () =>{
        try {
            const campus = await serviceProfile.getCampus();

            if(campus){
                setCampusList(campus)
            }
        }catch (error) {
            console.error("Erreur lors de la récupération des détails de la sortie :", error);
        }
    }



    useEffect(() => {
        chargerCampus();
        chargerVillesAvecLieux();
    }, []);

    useEffect(() => {
        if (nomVille) {
            const selectedVille = villes.find(v => v.nom === nomVille);
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
            }
        }
    }, [lieu, lieuxVille]);


    const handleSubmitAjoutVille = async (event) => {

        event.preventDefault();


        const ville = {
            nomVille: nomVille,
            codePostal: codePostal
        }

        const response = await servicePanelAdmin.addCity(ville)

        await chargerVillesAvecLieux();


        if(response.data.message === "Ville créée avec succès"){
            return (
                toast({
                    render: () => (
                        <Box
                            color="white"
                            px={5}
                            py={3}
                            bg="green.500"
                            borderRadius="lg"
                            display="flex"
                            alignItems="start"
                            fontSize="2em"
                            fontWeight="bold"
                            boxShadow="lg"
                            maxWidth="100%"
                        >
                            <Flex flexDirection="column" alignItems="center" textAlign="center">
                                <Icon as={CheckCircleIcon} w={10} h={10} mr={3} mt={1} />
                                <Text flex="1">
                                    Ville créée avec succès.
                                </Text>
                            </Flex>
                        </Box>
                    ),
                    isClosable: true,
                    position: "top",
                })
            )
        }else if(response.data.error === "Le nom de la ville et son code postal sont requis"){
            return (
                toast({
                    render: () => (
                        <Box
                            color="white"
                            px={5}
                            py={3}
                            bg="red.500"
                            borderRadius="lg"
                            display="flex"
                            alignItems="start"
                            fontSize="2em"
                            fontWeight="bold"
                            boxShadow="lg"
                            maxWidth="100%"
                        >
                            <Flex flexDirection="column" alignItems="center" textAlign="center">
                                <Icon as={WarningIcon} w={10} h={10} mr={3} mt={1} />

                                <Text flex="1">
                                    Veuillez saisir tous les champs du formulaire
                                </Text>
                            </Flex>
                        </Box>
                    ),
                    isClosable: true,
                    position: "top",
                })
            )
        }
    };

    const handleVilleChange = (event) => {
        setSelectedVilleId(event.target.value);
        console.log(selectedVilleId)
    };
    const handleLieuChange = (event) => {
        setSelectedLieu(event.target.value);
        console.log(selectedLieu)
    };
    const handleCampusChange = (event) => {
        setSelectedCampusId(event.target.value);
    };

    const handleSubmitSuppressionVille = async (event) => {

        event.preventDefault();
        console.log(selectedVilleId)
        const ville = {
            idVille: selectedVilleId,
        }

        const response = await servicePanelAdmin.deleteCity(ville);

        await chargerVillesAvecLieux();

        if(response.data.message === "Ville supprimée avec succès"){
            return (
                toast({
                    render: () => (
                        <Box
                            color="white"
                            px={5}
                            py={3}
                            bg="green.500"
                            borderRadius="lg"
                            display="flex"
                            alignItems="start"
                            fontSize="2em"
                            fontWeight="bold"
                            boxShadow="lg"
                            maxWidth="100%"
                        >
                            <Flex flexDirection="column" alignItems="center" textAlign="center">
                                <Icon as={CheckCircleIcon} w={10} h={10} mr={3} mt={1} />
                                <Text flex="1">
                                    Ville supprimée avec succès.
                                </Text>
                            </Flex>
                        </Box>
                    ),
                    isClosable: true,
                    position: "top",
                })
            )
        }else if(response.data.error === "Veuillez sélectionner une ville"){
            return (
                toast({
                    render: () => (
                        <Box
                            color="white"
                            px={5}
                            py={3}
                            bg="red.500"
                            borderRadius="lg"
                            display="flex"
                            alignItems="start"
                            fontSize="2em"
                            fontWeight="bold"
                            boxShadow="lg"
                            maxWidth="100%"
                        >
                            <Flex flexDirection="column" alignItems="center" textAlign="center">
                                <Icon as={WarningIcon} w={10} h={10} mr={3} mt={1} />

                                <Text flex="1">
                                    Veuillez sélectionner une ville à supprimer.
                                </Text>
                            </Flex>
                        </Box>
                    ),
                    isClosable: true,
                    position: "top",
                })
            )
        }
    }

    const handleSubmitAjoutUtilisateur = async (event) => {

        event.preventDefault()

        const user ={
            email : email,
            password : password,
            idCampus : parseInt(selectedCampusId)
        }
        console.log(user)

        const response = await servicePanelAdmin.addUser(user);

        if(response.data.message === "Utilisateur crée avec succès"){
            return (
                toast({
                    render: () => (
                        <Box
                            color="white"
                            px={5}
                            py={3}
                            bg="green.500"
                            borderRadius="lg"
                            display="flex"
                            alignItems="start"
                            fontSize="2em"
                            fontWeight="bold"
                            boxShadow="lg"
                            maxWidth="100%"
                        >
                            <Flex flexDirection="column" alignItems="center" textAlign="center">
                                <Icon as={CheckCircleIcon} w={10} h={10} mr={3} mt={1} />
                                <Text flex="1">
                                    Utilisateur crée avec succès.
                                </Text>
                            </Flex>
                        </Box>
                    ),
                    isClosable: true,
                    position: "top",
                })
            )
        }else if(response.data.error === "Mail, mot de passe et campus requis"){
            return (
                toast({
                    render: () => (
                        <Box
                            color="white"
                            px={5}
                            py={3}
                            bg="red.500"
                            borderRadius="lg"
                            display="flex"
                            alignItems="start"
                            fontSize="2em"
                            fontWeight="bold"
                            boxShadow="lg"
                            maxWidth="100%"
                        >
                            <Flex flexDirection="column" alignItems="center" textAlign="center">
                                <Icon as={WarningIcon} w={10} h={10} mr={3} mt={1} />

                                <Text flex="1">
                                    Veuillez renseigner tous les champs.
                                </Text>
                            </Flex>
                        </Box>
                    ),
                    isClosable: true,
                    position: "top",
                })
            )
        }
        }

    const handleSubmitDesactiverUtilisateur = async (event) => {
        event.preventDefault()

        const userBan = {
            idUser: idUser,
        }

        const response = await servicePanelAdmin.banUser(userBan);
        console.log(response)

        if(response.data.message === 'Utilisateur désactivé'){
            return (
                toast({
                    render: () => (
                        <Box
                            color="white"
                            px={5}
                            py={3}
                            bg="green.500"
                            borderRadius="lg"
                            display="flex"
                            alignItems="start"
                            fontSize="2em"
                            fontWeight="bold"
                            boxShadow="lg"
                            maxWidth="100%"
                        >
                            <Flex flexDirection="column" alignItems="center" textAlign="center">
                                <Icon as={CheckCircleIcon} w={10} h={10} mr={3} mt={1} />
                                <Text flex="1">
                                    Utilisateur désactivé avec succès.
                                </Text>
                            </Flex>
                        </Box>
                    ),
                    isClosable: true,
                    position: "top",
                })
            )
        }else if(response.data.error === 'Veuillez renseigner un ID utilisateur valide' || response.data.message ==='Utilisateur non trouvé'){
            return (
                toast({
                    render: () => (
                        <Box
                            color="white"
                            px={5}
                            py={3}
                            bg="red.500"
                            borderRadius="lg"
                            display="flex"
                            alignItems="start"
                            fontSize="2em"
                            fontWeight="bold"
                            boxShadow="lg"
                            maxWidth="100%"
                        >
                            <Flex flexDirection="column" alignItems="center" textAlign="center">
                                <Icon as={WarningIcon} w={10} h={10} mr={3} mt={1} />

                                <Text flex="1">
                                    Veuillez indiquer un ID utilisateur valide.
                                </Text>
                            </Flex>
                        </Box>
                    ),
                    isClosable: true,
                    position: "top",
                })
            )
        }
    }

    const handleSubmitActiverUtilisateur = async (event) => {
        event.preventDefault()

        const userUnban = {
            idUser: idUser,
        }

        const response = await servicePanelAdmin.unbanUser(userUnban)

        if(response.data.message === "Utilisateur activé"){
            return (
                toast({
                    render: () => (
                        <Box
                            color="white"
                            px={5}
                            py={3}
                            bg="green.500"
                            borderRadius="lg"
                            display="flex"
                            alignItems="start"
                            fontSize="2em"
                            fontWeight="bold"
                            boxShadow="lg"
                            maxWidth="100%"
                        >
                            <Flex flexDirection="column" alignItems="center" textAlign="center">
                                <Icon as={CheckCircleIcon} w={10} h={10} mr={3} mt={1} />
                                <Text flex="1">
                                    Utilisateur activé avec succès.
                                </Text>
                            </Flex>
                        </Box>
                    ),
                    isClosable: true,
                    position: "top",
                })
            )
        }else if(response.data.error === 'Veuillez renseigner un ID utilisateur valide' || response.data.message ==='Utilisateur non trouvé'){
            return (
                toast({
                    render: () => (
                        <Box
                            color="white"
                            px={5}
                            py={3}
                            bg="red.500"
                            borderRadius="lg"
                            display="flex"
                            alignItems="start"
                            fontSize="2em"
                            fontWeight="bold"
                            boxShadow="lg"
                            maxWidth="100%"
                        >
                            <Flex flexDirection="column" alignItems="center" textAlign="center">
                                <Icon as={WarningIcon} w={10} h={10} mr={3} mt={1} />

                                <Text flex="1">
                                    Veuillez indiquer un ID utilisateur valide.
                                </Text>
                            </Flex>
                        </Box>
                    ),
                    isClosable: true,
                    position: "top",
                })
            )
        }
    }

    const handleSubmitSuppressionUtilisateur = async (event) => {
        event.preventDefault()

        const userDelete = {
            idUser: idUser,
        }

        const response = await servicePanelAdmin.deleteUser(userDelete)

        if(response.data.message === "Utilisateur supprimé"){
            return (
                toast({
                    render: () => (
                        <Box
                            color="white"
                            px={5}
                            py={3}
                            bg="green.500"
                            borderRadius="lg"
                            display="flex"
                            alignItems="start"
                            fontSize="2em"
                            fontWeight="bold"
                            boxShadow="lg"
                            maxWidth="100%"
                        >
                            <Flex flexDirection="column" alignItems="center" textAlign="center">
                                <Icon as={CheckCircleIcon} w={10} h={10} mr={3} mt={1} />
                                <Text flex="1">
                                    Utilisateur supprimé avec succès.
                                </Text>
                            </Flex>
                        </Box>
                    ),
                    isClosable: true,
                    position: "top",
                })
            )
        }else if(response.data.error === 'Veuillez renseigner un ID utilisateur valide' || response.data.message ==='Utilisateur non trouvé'){
            return (
                toast({
                    render: () => (
                        <Box
                            color="white"
                            px={5}
                            py={3}
                            bg="red.500"
                            borderRadius="lg"
                            display="flex"
                            alignItems="start"
                            fontSize="2em"
                            fontWeight="bold"
                            boxShadow="lg"
                            maxWidth="100%"
                        >
                            <Flex flexDirection="column" alignItems="center" textAlign="center">
                                <Icon as={WarningIcon} w={10} h={10} mr={3} mt={1} />

                                <Text flex="1">
                                    Veuillez indiquer un ID utilisateur valide.
                                </Text>
                            </Flex>
                        </Box>
                    ),
                    isClosable: true,
                    position: "top",
                })
            )
        }
    }

    const handleSubmitAnnulerSortie = async (event) => {
        event.preventDefault()

        const sortie = {
            idSortie: idSortie,
            motifAnnulation: motifAnnulation,
        }

        const response = await servicePanelAdmin.cancelSortie(sortie)

        if(response.data.message ==="Sortie annulée."){
            return (
                toast({
                    render: () => (
                        <Box
                            color="white"
                            px={5}
                            py={3}
                            bg="green.500"
                            borderRadius="lg"
                            display="flex"
                            alignItems="start"
                            fontSize="2em"
                            fontWeight="bold"
                            boxShadow="lg"
                            maxWidth="100%"
                        >
                            <Flex flexDirection="column" alignItems="center" textAlign="center">
                                <Icon as={CheckCircleIcon} w={10} h={10} mr={3} mt={1} />
                                <Text flex="1">
                                    Sortie annulée avec succès.
                                </Text>
                            </Flex>
                        </Box>
                    ),
                    isClosable: true,
                    position: "top",
                })
            )
        }else if(response.data.message === 'Sortie non trouvée.' || response.data.message === 'Etat non trouvé.' || response.data.error || response.data.message === 'Motif non renseigné'){
            return (
                toast({
                    render: () => (
                        <Box
                            color="white"
                            px={5}
                            py={3}
                            bg="red.500"
                            borderRadius="lg"
                            display="flex"
                            alignItems="start"
                            fontSize="2em"
                            fontWeight="bold"
                            boxShadow="lg"
                            maxWidth="100%"
                        >
                            <Flex flexDirection="column" alignItems="center" textAlign="center">
                                <Icon as={WarningIcon} w={10} h={10} mr={3} mt={1} />

                                <Text flex="1">
                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                    Erreur lors de l'annulation de la sortie, veuillez vérifier que tous les champs soient bien remplis.
                                </Text>
                            </Flex>
                        </Box>
                    ),
                    isClosable: true,
                    position: "top",
                })
            )
        }
    }


    const handleSubmitAjoutLieu = async (event) => {
        event.preventDefault()

        const lieu = {
            idVille: selectedVilleId,
            nomLieu: nomLieu,
            rueLieu: rueLieu,
            latitudeLieu: latitudeLieu,
            longitudeLieu: longitudeLieu
        }

        const response = await servicePanelAdmin.addLieu(lieu);
        chargerVillesAvecLieux();

        if(response.data.message === 'Lieu crée avec succès'){
            return (
                toast({
                    render: () => (
                        <Box
                            color="white"
                            px={5}
                            py={3}
                            bg="green.500"
                            borderRadius="lg"
                            display="flex"
                            alignItems="start"
                            fontSize="2em"
                            fontWeight="bold"
                            boxShadow="lg"
                            maxWidth="100%"
                        >
                            <Flex flexDirection="column" alignItems="center" textAlign="center">
                                <Icon as={CheckCircleIcon} w={10} h={10} mr={3} mt={1} />
                                <Text flex="1">
                                    Lieu crée avec succès.
                                </Text>
                            </Flex>
                        </Box>
                    ),
                    isClosable: true,
                    position: "top",
                })
            )
            }else if(response.data.error === 'Veuillez renseigner tous les champs' || response.data.error){
            return (
                toast({
                    render: () => (
                        <Box
                            color="white"
                            px={5}
                            py={3}
                            bg="red.500"
                            borderRadius="lg"
                            display="flex"
                            alignItems="start"
                            fontSize="2em"
                            fontWeight="bold"
                            boxShadow="lg"
                            maxWidth="100%"
                        >
                            <Flex flexDirection="column" alignItems="center" textAlign="center">
                                <Icon as={WarningIcon} w={10} h={10} mr={3} mt={1} />

                                <Text flex="1">
                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                    Erreur lors de la création du lieu, veuillez renseigner tous les champs.
                                </Text>
                            </Flex>
                        </Box>
                    ),
                    isClosable: true,
                    position: "top",
                })
            )
        }
    }



    const handleSubmitSuppressionLieu = async (event) => {

        event.preventDefault()

        const lieu = {
            idLieu: selectedLieu,
        }

        const response = await servicePanelAdmin.deleteLieu(lieu)
        chargerVillesAvecLieux();

        if(response.data.message === 'Lieu supprimé avec succès'){
            return (
                toast({
                    render: () => (
                        <Box
                            color="white"
                            px={5}
                            py={3}
                            bg="green.500"
                            borderRadius="lg"
                            display="flex"
                            alignItems="start"
                            fontSize="2em"
                            fontWeight="bold"
                            boxShadow="lg"
                            maxWidth="100%"
                        >
                            <Flex flexDirection="column" alignItems="center" textAlign="center">
                                <Icon as={CheckCircleIcon} w={10} h={10} mr={3} mt={1} />
                                <Text flex="1">
                                    Lieu supprimé avec succès.
                                </Text>
                            </Flex>
                        </Box>
                    ),
                    isClosable: true,
                    position: "top",
                })
            )
        }else if(response.data.error === 'Veuillez sélectionner un lieu' || response.data.error){
            return (
                toast({
                    render: () => (
                        <Box
                            color="white"
                            px={5}
                            py={3}
                            bg="red.500"
                            borderRadius="lg"
                            display="flex"
                            alignItems="start"
                            fontSize="2em"
                            fontWeight="bold"
                            boxShadow="lg"
                            maxWidth="100%"
                        >
                            <Flex flexDirection="column" alignItems="center" textAlign="center">
                                <Icon as={WarningIcon} w={10} h={10} mr={3} mt={1} />

                                <Text flex="1">
                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                    Erreur lors de la suppression du lieu, veuillez renseigner tous les champs.
                                </Text>
                            </Flex>
                        </Box>
                    ),
                    isClosable: true,
                    position: "top",
                })
            )
        }
    }

    const getTitleByType = (type) => {
        switch (type) {
            case 'AjouterVille':return  (<DrawerHeader bgColor='green.500'>
                <Center>
                    <Text fontSize='3xl' fontWeight='bold'>
                        <AddIcon mt={10} mb={10}/> Ajouter une ville
                </Text>
            </Center>
                                        </DrawerHeader>);
            case 'SupprimerVille':return    (<DrawerHeader size='500px' bgColor='red.500'>
                <Center>
                    <Text fontSize='3xl' fontWeight='bold'>
                        <DeleteIcon mt={10} mb={10}/>  Supprimer une ville
                    </Text>
                </Center>
                                            </DrawerHeader>);
            case 'AjouterLieu':return   (<DrawerHeader bgColor='green.500'>
                <Center>
                    <Text fontSize='3xl' fontWeight='bold'>
                        <AddIcon mt={10} mb={10}/> Ajouter un lieu
                    </Text>
                </Center>
                                        </DrawerHeader>);
            case 'SupprimerLieu':return (<DrawerHeader bgColor='red.500'>
                <Center>
                    <Text fontSize='3xl' fontWeight='bold'>
                        <DeleteIcon mt={10} mb={10}/>  Supprimer un lieu
                    </Text>
                </Center>
                                        </DrawerHeader>);
            case 'CreerGroupe':return   (<DrawerHeader bgColor='green.500'>
                <Center>
                    <Text fontSize='3xl' fontWeight='bold'>
                        <AddIcon mt={10} mb={10}/> Créer un groupe
                    </Text>
                </Center>
                                        </DrawerHeader>);
            case 'SupprimerGroupe':return   (<DrawerHeader bgColor='red.500'>
                <Center>
                    <Text fontSize='3xl' fontWeight='bold'>
                        <DeleteIcon mt={10} mb={10}/> Supprimer un groupe
                    </Text>
                </Center>
                                            </DrawerHeader>);
            case 'CreerUtilisateur':return  (<DrawerHeader bgColor='green.500'>
                <Center>
                    <Text fontSize='3xl' fontWeight='bold'>
                        <AddIcon mt={10} mb={10}/> Créer un utilisateur
                    </Text>
                </Center>
                                            </DrawerHeader>);
            case 'DesactiverUtilisateur':return (<DrawerHeader bgColor='orange.500'>
                <Center>
                    <Text fontSize='3xl' fontWeight='bold'>
                        <TimeIcon mt={10} mb={10}/>    Désactiver un utilisateur
                    </Text>
                </Center>
                                                </DrawerHeader>);
            case 'SupprimerUtilisateur':return  (<DrawerHeader bgColor='red.500'>
                <Center>
                    <Text fontSize='3xl' fontWeight='bold'>
                        <DeleteIcon mt={10} mb={10}/>  Supprimer un utilisateur
                    </Text>
                </Center>
                                                </DrawerHeader>);
            case 'ActiverUtilisateur':return  (<DrawerHeader bgColor='blue.500'>
                <Center>
                    <Text fontSize='3xl' fontWeight='bold'>
                        <TimeIcon mt={10} mb={10}/> Activer un utilisateur
                    </Text>
                </Center>
            </DrawerHeader>);
            case 'AnnulerSortie':return  (<DrawerHeader bgColor='orange.500'>
                <Center>
                    <Text fontSize='3xl' fontWeight='bold'>
                        <CalendarIcon mt={10} mb={10}/> Annuler une sortie
                    </Text>
                </Center>
            </DrawerHeader>);
            // Ajoutez d'autres cas selon le type
            default: return '';
        }
    };

    const getContentByType = (type) => {
        switch (type) {
            case 'AjouterVille':
                return (
                    <>
                        <form onSubmit={handleSubmitAjoutVille}>
                            <DrawerBody>
                                <VStack align="stretch">
                                    <FormControl id="nomVille">
                                        <FormLabel fontSize='2xl' fontWeight='bold'>Nom de la ville :</FormLabel>
                                        <Input outlineColor='teal' type='text' size="md" name='nom' value={nomVille} onChange={e => setNomVille(e.target.value)}/>
                                    </FormControl>
                                    <FormControl id="codePostal">
                                        <FormLabel fontSize='2xl' fontWeight='bold' >Code postal :</FormLabel>
                                        <Input outlineColor='teal' type='text' size="md" name='codePostal' value={codePostal} onChange={e => setCodePostal(e.target.value)}/>
                                    </FormControl>
                                </VStack>
                                <Center>
                                    <DrawerFooter mt={5}>
                                        <Button colorScheme='red' mr={10} onClick={onClose}>Annuler</Button>
                                        <Button type='submit' colorScheme="teal"  onClick={onClose}>Envoyer</Button>
                                    </DrawerFooter>
                                </Center>
                            </DrawerBody>
                        </form>
            </>
                );
            case 'SupprimerVille':
                return (
                    <>
                        <form onSubmit={handleSubmitSuppressionVille}>
                            <DrawerBody>
                                <VStack align="stretch">
                                    <FormControl id="idVille">
                                        <FormLabel fontSize='2xl' fontWeight='bold'>Veuillez sélectionner la ville à supprimer :</FormLabel>
                                        <Select outlineColor='teal' name='idVille' onChange={handleVilleChange}
                                                value={selectedVilleId}>
                                            <option value="">Sélectionnez une ville</option>
                                            {villes.map((ville, index) => ( // Étape 4
                                                <option key={index} value={ville.id}>{ville.nom}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </VStack>
                                <Center>
                                    <DrawerFooter mt={5}>
                                        <Button colorScheme='red' mr={10} onClick={onClose}>Annuler</Button>
                                        <Button type='submit' colorScheme="teal" onClick={onClose} >Envoyer</Button>
                                    </DrawerFooter>
                                </Center>
                            </DrawerBody>
                        </form>
                    </>
                );
            case 'AjouterLieu':
                return (
                    <>
                        <form onSubmit={handleSubmitAjoutLieu}>
                            <DrawerBody>
                                <VStack align="stretch">
                                    <FormControl id="idVille">
                                        <FormLabel fontSize='2xl' fontWeight='bold'>Veuillez sélectionner la ville où se situe le lieu :</FormLabel>
                                        <Select outlineColor='teal' name='idVille' onChange={handleVilleChange}
                                                value={selectedVilleId}>
                                            <option value="">Sélectionnez une ville</option>
                                            {villes.map((ville, index) => ( // Étape 4
                                                <option key={index} value={ville.id}>{ville.nom}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl id="nomLieu">
                                        <FormLabel fontSize='2xl' fontWeight='bold'>Nom du lieu :</FormLabel>
                                        <Input outlineColor='teal' type='text' size="md" name='nomLieu' value={nomLieu} onChange={e => setNomLieu(e.target.value)}/>
                                    </FormControl>
                                    <FormControl id="rueLieu">
                                        <FormLabel fontSize='2xl' fontWeight='bold'>Précisez la rue du lieu :</FormLabel>
                                        <Input outlineColor='teal' type='text' size="md" name='rueLieu' value={rueLieu} onChange={e => setRueLieu(e.target.value)}/>                </FormControl>
                                    <FormControl id="rueLieu">
                                        <FormLabel fontSize='2xl' fontWeight='bold'>Latitude du lieu :</FormLabel>
                                        <Input outlineColor='teal' type='text' size="md" name='latitudeLieu' value={latitudeLieu} onChange={e => setLatitudeLieu(e.target.value)}/>                </FormControl>
                                    <FormControl id="rueLieu">
                                        <FormLabel fontSize='2xl' fontWeight='bold'>Longitude du lieu :</FormLabel>
                                        <Input outlineColor='teal' type='text' size="md" name='longitudeLieu' value={longitudeLieu} onChange={e => setLongitudeLieu(e.target.value)}/>                </FormControl>
                                </VStack>
                                <Center>
                                    <DrawerFooter mt={5}>
                                        <Button colorScheme='red' mr={10} onClick={onClose}>Annuler</Button>
                                        <Button type='submit' colorScheme="teal" onClick={onClose}>Envoyer</Button>
                                    </DrawerFooter>
                                </Center>
                            </DrawerBody>
                        </form>
                    </>
                );
            case 'SupprimerLieu':
                return (
                    <>
                        <form onSubmit={handleSubmitSuppressionLieu}>
                            <DrawerBody>
                                <VStack align="stretch">
                                    <FormControl id="ville">
                                        <FormLabel fontSize='2xl' fontWeight='bold'>Veuillez sélectionner la ville du
                                            lieu à supprimer :</FormLabel>
                                        <Select name='ville' onChange={handleVilleChange} value={selectedVilleId}>
                                            <option value="">Sélectionnez une ville</option>
                                            {villes.map((ville) => (
                                                <option key={ville.id} value={ville.nom}>
                                                    {ville.nom}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl id="lieu">
                                        <FormLabel fontSize='2xl' fontWeight='bold'>Veuillez sélectionner le lieu à
                                            supprimer :</FormLabel>
                                        <Select name='idLieu' onChange={handleLieuChange} isDisabled={!selectedVilleId}
                                                value={selectedLieu}>
                                            {lieuxVille.map((lieu, index) => (
                                                <option key={index} value={lieu.id}>
                                                    {lieu.nom} ({lieu.id})
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </VStack>
                                <Center>
                                    <DrawerFooter mt={5}>
                                        <Button colorScheme='red' mr={10} onClick={onClose}>Annuler</Button>
                                        <Button type='submit' colorScheme="teal" onClick={onClose}>Envoyer</Button>
                                    </DrawerFooter>
                                </Center>
                            </DrawerBody>
                        </form>
                    </>
                );
            case 'CreerGroupe':
                return (
                    <>
                        <DrawerBody>
                            <VStack align="stretch">
                                <FormControl id="nomVille">
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Veuillez indiquer la ville où se situe
                                        le lieu :</FormLabel>
                                    <Select outlineColor='teal' name='ville'>

                                    </Select>
                                </FormControl>
                                <FormControl id="nomLieu">
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Nom du lieu :</FormLabel>
                                    <Input outlineColor='teal' type='text' name='nom' size="md"/>
                                </FormControl>
                                <FormControl id="rueLieu">
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Précisez la rue du lieu :</FormLabel>
                                    <Input outlineColor='teal' type='text' name='dateDebut' size="md"/>
                                </FormControl>
                                <FormControl id="rueLieu">
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Latitude du lieu :</FormLabel>
                                    <Input outlineColor='teal' type='text' name='dateDebut' size="md"/>
                                </FormControl>
                                <FormControl id="rueLieu">
                                <FormLabel fontSize='2xl' fontWeight='bold'>Longitude du lieu :</FormLabel>
                                    <Input outlineColor='teal' type='text' name='dateDebut' size="md" />
                                </FormControl>
                            </VStack>
                            <Center>
                                <DrawerFooter mt={5}>
                                    <Button colorScheme='red' mr={10} onClick={onClose}>Annuler</Button>
                                    <Button colorScheme="teal">Envoyer</Button>
                                </DrawerFooter>
                            </Center>
                        </DrawerBody>
                    </>
                );
            case 'SupprimerGroupe':
                return (
                    <>
                        <DrawerBody>
                            <VStack align="stretch">
                                <FormControl id="nomGroupe">
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Veuillez sélectionner le groupe privé à supprimer :</FormLabel>
                                    <Select outlineColor='teal' name='nomGroupe'>
                                    </Select>
                                </FormControl>
                            </VStack>
                            <Center>
                                <DrawerFooter mt={5}>
                                    <Button colorScheme='red' mr={10} onClick={onClose}>Annuler</Button>
                                    <Button colorScheme="teal">Envoyer</Button>
                                </DrawerFooter>
                            </Center>
                        </DrawerBody>
                    </>
                );
            case 'CreerUtilisateur':
                return (
                    <>
                        <form onSubmit={handleSubmitAjoutUtilisateur}>
                        <DrawerBody>
                            <VStack align="stretch">
                                <FormControl id="mail">
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Adresse e-mail :</FormLabel>
                                    <Input outlineColor='teal' type='email' size="md" name='email' value={email} onChange={e => setEmail(e.target.value)} />
                                </FormControl>
                                <FormControl id="password">
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Mot de passe :</FormLabel>
                                    <Input outlineColor='teal' type='text' size='md' name='password' value={password} onChange={e => setPassword(e.target.value)}/>
                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Veuillez sélectionner le campus de l'utilisateur :</FormLabel>
                                    <Select outlineColor='teal' name='idCampus' onChange={handleCampusChange}
                                            value={selectedCampusId}>
                                        <option value="">Sélectionnez un campus</option>
                                        {campusListe.map((campus, index) => ( // Étape 4
                                            <option key={index} value={campus.id}>{campus.nom}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </VStack>
                            <Center>
                                <DrawerFooter mt={5}>
                                    <Button colorScheme='red' mr={10} onClick={onClose}>Annuler</Button>
                                    <Button  type='submit' colorScheme="teal" onClick={onClose} >Envoyer</Button>
                                </DrawerFooter>
                            </Center>
                        </DrawerBody>
                    </form>
                    </>
                );
            case 'DesactiverUtilisateur':
                return (
                    <>
                        <form onSubmit={handleSubmitDesactiverUtilisateur}>
                            <DrawerBody>
                                <VStack align="stretch">
                                    <FormControl id="idUser">
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        <FormLabel fontSize='2xl' fontWeight='bold'>ID de l'utilisateur à désactiver :</FormLabel>
                                        <Input outlineColor='teal' type='text' size='md' name='idUser' value={idUser} onChange={e => setIdUser(e.target.value)}/>
                                    </FormControl>
                                </VStack>
                                <Center>
                                    <DrawerFooter mt={5}>
                                        <Button colorScheme='red' mr={10} onClick={onClose}>Annuler</Button>
                                        <Button type='submit' colorScheme="teal" onClick={onClose}>Envoyer</Button>
                                    </DrawerFooter>
                                </Center>
                            </DrawerBody>
                        </form>
                    </>
                );
            case 'SupprimerUtilisateur':
                return (
                    <>
                        <form onSubmit={handleSubmitSuppressionUtilisateur}>
                            <DrawerBody>
                                <VStack align="stretch">
                                    <FormControl id="idUser">
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        <FormLabel fontSize='2xl' fontWeight='bold'>ID de l'utilisateur à supprimer :</FormLabel>
                                        <Input outlineColor='teal' type='text' size='md' name='idUser' value={idUser} onChange={e => setIdUser(e.target.value)}/>
                                    </FormControl>
                                </VStack>
                                <Center>
                                    <DrawerFooter mt={5}>
                                        <Button colorScheme='red' mr={10} onClick={onClose}>Annuler</Button>
                                        <Button type='submit' colorScheme="teal" onClick={onClose}>Envoyer</Button>
                                    </DrawerFooter>
                                </Center>
                            </DrawerBody>
                        </form>
                    </>
                );
            case 'ActiverUtilisateur':
                return (
                    <>
                        <form onSubmit={handleSubmitActiverUtilisateur}>
                            <DrawerBody>
                                <VStack align="stretch">
                                    <FormControl id="idUser">
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        <FormLabel fontSize='2xl' fontWeight='bold'>ID de l'utilisateur à activer :</FormLabel>
                                        <Input outlineColor='teal' type='text' size='md' name='idUser' value={idUser} onChange={e => setIdUser(e.target.value)}/>
                                    </FormControl>
                                </VStack>
                                <Center>
                                    <DrawerFooter mt={5}>
                                        <Button colorScheme='red' mr={10} onClick={onClose}>Annuler</Button>
                                        <Button type='submit' colorScheme="teal" onClick={onClose} >Envoyer</Button>
                                    </DrawerFooter>
                                </Center>
                            </DrawerBody>
                        </form>
                    </>
                );
            case 'AnnulerSortie':
                return (
                    <>
                        <form onSubmit={handleSubmitAnnulerSortie}>
                            <DrawerBody>
                                <VStack align="stretch">

                                    <FormControl id="idSortie">
                                        <FormLabel fontSize='2xl' fontWeight='bold'>ID de la sortie :</FormLabel>
                                        <Input outlineColor='teal' type='text' size='md' name='idUser' value={idSortie} onChange={e => setIdSortie(e.target.value)}/>
                                    </FormControl>
                                    <FormControl>
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        <FormLabel fontSize='2xl' fontWeight='bold'>Motif d'annulation (sera envoyé par mail aux participants) :</FormLabel>
                                        <Textarea outlineColor='teal' type='text' size='md' name='idUser' value={motifAnnulation} onChange={e => setMotifAnnulation(e.target.value)}/>
                                    </FormControl>

                                </VStack>
                                <Center>
                                    <DrawerFooter mt={5}>
                                        <Button colorScheme='red' mr={10} onClick={onClose}>Annuler</Button>
                                        <Button type='submit' colorScheme="teal" onClick={onClose}>Envoyer</Button>
                                    </DrawerFooter>
                                </Center>
                            </DrawerBody>
                        </form>
                    </>
                );
            // Ajoutez d'autres cas pour les différents types
            default: return <div></div>;
        }
    };

    return (
        <Drawer size='xl' isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                    {getTitleByType(drawerType)}
                    {getContentByType(drawerType)}
            </DrawerContent>
        </Drawer>
    );
};

export default CustomDrawer;