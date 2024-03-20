import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Button,
    Text, Center, FormControl, FormLabel, Input, VStack, Select, Textarea
} from "@chakra-ui/react";
import {AddIcon, CalendarIcon, DeleteIcon, SearchIcon, TimeIcon} from "@chakra-ui/icons";
// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
const CustomDrawer = ({ isOpen, onClose, drawerType }) => {
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
                    <DrawerBody>
                        <VStack align="stretch">
                            <FormControl id="nomVille">
                                <FormLabel fontSize='2xl' fontWeight='bold'>Nom de la ville :</FormLabel>
                                <Input outlineColor='teal' type='text' name='nom' size="md" />
                            </FormControl>
                            <FormControl id="codePostal">
                                <FormLabel fontSize='2xl' fontWeight='bold'>Code postal :</FormLabel>
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
            case 'SupprimerVille':
                return (
                    <>
                        <DrawerBody>
                            <VStack align="stretch">
                                <FormControl id="nomVille">
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Veuillez sélectionner la ville à supprimer :</FormLabel>
                                    <Select outlineColor='teal' name='ville'>

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
                        <DrawerBody>
                            <VStack align="stretch">
                                <FormControl id="mail">
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Adresse e-mail :</FormLabel>
                                    <Input outlineColor='teal' type='text' name='nom' size="md" />
                                </FormControl>
                                <FormControl id="password">
                                    <FormLabel fontSize='2xl' fontWeight='bold'>Mot de passe :</FormLabel>
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