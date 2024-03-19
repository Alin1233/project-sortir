import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import serviceIsAdmin from "../services/serviceIsAdmin.js";
import {
    Box,
    Button,
    Center, Divider,
    Heading, SimpleGrid,
    useDisclosure
} from "@chakra-ui/react";
import {AddIcon, DeleteIcon, TimeIcon} from "@chakra-ui/icons";
import DrawerTypesPanelAdmin from "../components/DrawerTypesPanelAdmin.jsx";
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

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [drawerType, setDrawerType] = React.useState('');

    const handleOpenDrawer = (type) => {
        setDrawerType(type);
        onOpen();
    };

    return (
        <div>
            <Center mb="6">
                <Heading mt={50} fontWeight='extrabold' as='h1' size='3xl' color="teal.500">PANNEAU D'ADMINISTRATION</Heading>
            </Center>
<Center>
            <SimpleGrid mt={100} columns={2} spacing={1}>
            <Button padding={10} fontWeight='extrabold' fontSize='4xl' leftIcon={<AddIcon />} colorScheme='green' onClick={() => handleOpenDrawer('AjouterVille')}>
                Ajouter une ville
            </Button>
            <Button padding={10} fontWeight='extrabold' fontSize='4xl' leftIcon={<DeleteIcon />} colorScheme='red' onClick={() => handleOpenDrawer('AjouterVille')}>
                Supprimer une ville
            </Button>


            <Button mt={50} padding={10} fontWeight='extrabold' fontSize='4xl' leftIcon={<AddIcon />} colorScheme='green' onClick={() => handleOpenDrawer('AjouterVille')}>
                Ajouter un lieu
                </Button>
            <Button mt={50} padding={10} fontWeight='extrabold' fontSize='4xl' leftIcon={<DeleteIcon />} colorScheme='red' onClick={() => handleOpenDrawer('AjouterVille')}>
                Supprimer un lieu
            </Button>


            <Button mt={50} padding={10} fontWeight='extrabold' fontSize='4xl' leftIcon={<AddIcon />} colorScheme='green' onClick={() => handleOpenDrawer('AjouterVille')}>
                Créer un groupe privé
            </Button>
            <Button mt={50} padding={10} fontWeight='extrabold' fontSize='4xl' leftIcon={<DeleteIcon />} colorScheme='red' onClick={() => handleOpenDrawer('AjouterVille')}>
                Supprimer un groupe privé
            </Button>

            <Button mt={50} padding={10} fontWeight='extrabold' fontSize='4xl' leftIcon={<AddIcon />} colorScheme='green' onClick={() => handleOpenDrawer('AjouterVille')}>
                Créer un utilisateur
                </Button>
            <Button mt={50} padding={10} fontWeight='extrabold' fontSize='4xl' leftIcon={<TimeIcon />} colorScheme='orange' onClick={() => handleOpenDrawer('AjouterVille')}>
                Désactiver un utilisateur
            </Button>
            <Button padding={10} fontWeight='extrabold' fontSize='4xl' leftIcon={<DeleteIcon />} colorScheme='red' onClick={() => handleOpenDrawer('AjouterVille')}>
                Supprimer un utilisateur
            </Button>
            </SimpleGrid>
</Center>

            <CustomDrawer isOpen={isOpen} onClose={onClose} drawerType={drawerType} />
        </div>
    );
};

export default PanelAdministration