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
import {AddIcon, CalendarIcon, CheckCircleIcon, DeleteIcon, SearchIcon, TimeIcon, WarningIcon} from "@chakra-ui/icons";
// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import servicePanelAdmin from "../services/servicePanelAdmin.js";
import serviceProfile from "../services/serviceProfile.js";


// eslint-disable-next-line react/prop-types
const CustomDrawer = ({ isOpen, onClose, drawerType }) => {

    const [nomVille, setNomVille] = useState('');
    const [villeListe, setVilleListe] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [selectedVilleId, setSelectedVilleId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [campusListe, setCampusList] = useState ( null)
    const [selectedCampusId, setSelectedCampusId] = useState('');
    const toast = useToast();
    const chargerVilles = async () => {
        try {
            const villes = await servicePanelAdmin.getAllVilles();
            if (villes) {
                setVilleListe(villes);


            }
        } catch (error) {
            console.error("Erreur lors de la récupération des détails de la sortie :", error);
        }

    };

    const chargerCampus = async () =>{
        try {
            const campus = await serviceProfile.getCampus();

            if(campus){
                setCampusList(campus)
                console.log(campus)
                console.log(campusListe)
            }
        }catch (error) {
            console.error("Erreur lors de la récupération des détails de la sortie :", error);
        }
    }


    useEffect(() => {
        chargerVilles();
        chargerCampus();
    }, []);


    const handleSubmitAjoutVille = async (event) => {

        event.preventDefault();


        const ville = {
            nomVille: nomVille,
            codePostal: codePostal
        }

        const response = await servicePanelAdmin.addCity(ville)

        await chargerVilles();


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
    };

    const handleCampusChange = (event) => {
        setSelectedCampusId(event.target.value);
    };

    const handleSubmitSuppressionVille = async (event) => {

        event.preventDefault();

        const ville = {
            idVille: selectedVilleId,
        }

        const response = await servicePanelAdmin.deleteCity(ville);

        await chargerVilles();

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
            case 'RechercherUtilisateur':return  (<DrawerHeader bgColor='blue.500'>
                <Center>
                    <Text fontSize='3xl' fontWeight='bold'>
                        <SearchIcon mt={10} mb={10}/> Rechercher un ID utilisateur
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
                                            {villeListe.map((ville, index) => ( // Étape 4
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
                        <DrawerBody>
                            <VStack align="stretch">
                                <FormControl id="nomVille">
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Veuillez indiquer la ville où se situe le lieu :</FormLabel>
                                    <Select outlineColor='teal' name='ville'>

                                    </Select>
                                </FormControl>
                                <FormControl id="nomLieu">
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Nom du lieu :</FormLabel>
                                    <Input outlineColor='teal' type='text' name='nom' size="md" />
                                </FormControl>
                                <FormControl id="rueLieu">
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Précisez la rue du lieu :</FormLabel>
                                    <Input outlineColor='teal' type='text' name='dateDebut' size="md" />
                                </FormControl>
                                <FormControl id="rueLieu">
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Latitude du lieu :</FormLabel>
                                    <Input outlineColor='teal' type='text' name='dateDebut' size="md" />
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
            case 'SupprimerLieu':
                return (
                    <>
                        <DrawerBody>
                            <VStack align="stretch">
                                <FormControl id="nomLieu">
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Veuillez sélectionner le lieu à supprimer :</FormLabel>
                                    <Select outlineColor='teal' name='ville'>
                                    ICI FAIRE REMONTER LISTE DE LIEUX
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
            case 'CreerGroupe':
                return (
                    <>
                        <DrawerBody>
                            <VStack align="stretch">
                                <FormControl id="nomVille">
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Veuillez indiquer la ville où se situe le lieu :</FormLabel>
                                    <Select outlineColor='teal' name='ville'>

                                    </Select>
                                </FormControl>
                                <FormControl id="nomLieu">
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Nom du lieu :</FormLabel>
                                    <Input outlineColor='teal' type='text' name='nom' size="md" />
                                </FormControl>
                                <FormControl id="rueLieu">
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Précisez la rue du lieu :</FormLabel>
                                    <Input outlineColor='teal' type='text' name='dateDebut' size="md" />
                                </FormControl>
                                <FormControl id="rueLieu">
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Latitude du lieu :</FormLabel>
                                    <Input outlineColor='teal' type='text' name='dateDebut' size="md" />
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
                        <DrawerBody>
                            <VStack align="stretch">
                                <FormControl id="idUser">
                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                    <FormLabel fontSize='2xl' fontWeight='bold'>ID de l'utilisateur :</FormLabel>
                                    <Input outlineColor='teal' type='text' name='nom' size="md" />
                                </FormControl>
                                <FormControl id="password">
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Durée de la désactivation (en jours, 0 pour réactiver) :</FormLabel>
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
            case 'SupprimerUtilisateur':
                return (
                    <>
                        <DrawerBody>
                            <VStack align="stretch">
                                <FormControl id="idUser">
                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                    <FormLabel fontSize='2xl' fontWeight='bold'>ID de l'utilisateur à supprimer :</FormLabel>
                                    <Input outlineColor='teal' type='text' name='nom' size="md" />
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
            case 'RechercherUtilisateur':
                return (
                    <>
                        <DrawerBody>
                            <VStack align="stretch">
                                <FormControl id="idUser">
                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Adresse e-mail de l'utilisateur :</FormLabel>
                                    <Input outlineColor='teal' type='text' name='nom' size="md" />
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
            case 'AnnulerSortie':
                return (
                    <>
                        <DrawerBody>
                            <VStack align="stretch">

                                <FormControl id="idSortie">
                                    <FormLabel fontSize='2xl' fontWeight='bold'>ID de la sortie :</FormLabel>
                                    <Input outlineColor='teal' type='text' name='idSortie' size="md" />
                                </FormControl>
                                <FormControl>
                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Motif d'annulation (sera envoyé par mail aux participants) :</FormLabel>
                                    <Textarea outlineColor='teal' type='text' name='motif' size="md"/>
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