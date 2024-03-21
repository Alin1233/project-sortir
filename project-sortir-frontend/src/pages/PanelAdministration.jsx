import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import serviceIsAdmin from "../services/serviceIsAdmin.js";
import {
    Button,
    Center,
    Heading, SimpleGrid,
    useDisclosure
} from "@chakra-ui/react";
import {AddIcon, CalendarIcon, DeleteIcon, TimeIcon} from "@chakra-ui/icons";
import CustomDrawer from "../components/DrawerTypesPanelAdmin.jsx";
import Loading from "../components/Loading.jsx";

const PanelAdministration = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (props.user === null) {
            window.location.assign('/')
            return <div><Loading/></div>;
        }

        const checkAdminStatus = async () => {
            try {
                const userId = props.user.id;
                const isAdminResponse = await serviceIsAdmin.checkAdmin(userId);
                if (isAdminResponse.isAdmin === false) {
                    navigate('/');
                }
            } catch (error) {
                console.error("L'affichage de la page nécessite une élevation des droits :", error);
            }
        };

        checkAdminStatus();
    }, [navigate, props.user]);

    function useDocumentTitle(title) {
        useEffect(() => {
            document.title = title;
        }, [title]);
    }

    useDocumentTitle('Golaf! | Panneau d\'administration')

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [drawerType, setDrawerType] = React.useState('');

    const handleOpenDrawer = (type) => {
        setDrawerType(type);
        onOpen();
    };

    return (
        <div>
            <Center mb="6">
                <Heading mt={50} fontWeight='extrabold' as='h1' fontSize='5em' color="teal.500">PANNEAU D'ADMINISTRATION</Heading>
            </Center>
<Center>
            <SimpleGrid mt={100} columns={2} spacing={1}>
            <Button padding={10} fontWeight='extrabold' fontSize='4xl' leftIcon={<AddIcon />} colorScheme='green' onClick={() => handleOpenDrawer('AjouterVille')}>
                Ajouter une ville
            </Button>
            <Button padding={10} fontWeight='extrabold' fontSize='4xl' leftIcon={<DeleteIcon />} colorScheme='red' onClick={() => handleOpenDrawer('SupprimerVille')}>
                Supprimer une ville
            </Button>


            <Button mt={50} padding={10} fontWeight='extrabold' fontSize='4xl' leftIcon={<AddIcon />} colorScheme='green' onClick={() => handleOpenDrawer('AjouterLieu')}>
                Ajouter un lieu
                </Button>
            <Button mt={50} padding={10} fontWeight='extrabold' fontSize='4xl' leftIcon={<DeleteIcon />} colorScheme='red' onClick={() => handleOpenDrawer('SupprimerLieu')}>
                Supprimer un lieu
            </Button>


            <Button mt={50} padding={10} fontWeight='extrabold' fontSize='4xl' leftIcon={<AddIcon />} colorScheme='green' onClick={() => handleOpenDrawer('CreerGroupe')}>
                Créer un groupe privé
            </Button>
            <Button mt={50} padding={10} fontWeight='extrabold' fontSize='4xl' leftIcon={<DeleteIcon />} colorScheme='red' onClick={() => handleOpenDrawer('SupprimerGroupe')}>
                Supprimer un groupe privé
            </Button>

            <Button mt={50} padding={10} fontWeight='extrabold' fontSize='4xl' leftIcon={<AddIcon />} colorScheme='green' onClick={() => handleOpenDrawer('CreerUtilisateur')}>
                Créer un utilisateur
                </Button>
            <Button mt={50} padding={10} fontWeight='extrabold' fontSize='4xl' leftIcon={<TimeIcon />} colorScheme='orange' onClick={() => handleOpenDrawer('DesactiverUtilisateur')}>
                Désactiver un utilisateur
            </Button>
            <Button padding={10} fontWeight='extrabold' fontSize='4xl' leftIcon={<DeleteIcon />} colorScheme='red' onClick={() => handleOpenDrawer('SupprimerUtilisateur')}>
                Supprimer un utilisateur
            </Button>
            <Button padding={10} fontWeight='extrabold' fontSize='4xl' leftIcon={<TimeIcon />} colorScheme='blue' onClick={() => handleOpenDrawer('ActiverUtilisateur')}>
                Activer un utilisateur
            </Button>

            <Button mt={50} padding={10} fontWeight='extrabold' fontSize='4xl' leftIcon={<CalendarIcon />} colorScheme='orange' onClick={() => handleOpenDrawer('AnnulerSortie')}>
                Annuler une sortie
            </Button>

            </SimpleGrid>
    </Center>

            <CustomDrawer isOpen={isOpen} onClose={onClose} drawerType={drawerType} />
        </div>
    );
};

export default PanelAdministration