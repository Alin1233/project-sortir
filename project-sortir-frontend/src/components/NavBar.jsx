/* eslint-disable react/prop-types */
import { Box, Button, Link, Flex, Image, Heading, Avatar, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import logo from '../assets/FAVICON.png'
const NavBar = (props) => {
    //Quand quelqu'un clique sur "log out", le cookie est supprimé et l'utilisateur actuel est déclaré null
    const handleLogout = () =>{
        window.localStorage.removeItem("loggedUser")
        props.setUser(null)
    }
    return (
        <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="teal.500" color="white">
            <Box>
            <Flex align="center">
                <Link as={RouterLink} to="/" mr="4">
                <Image src={logo} alt="Logo" boxSize="100px" borderRadius="full"/>
                </Link>
                <Heading size="lg" ml="4">Golaf!</Heading>
            </Flex>
            </Box>
            <Box>
                <Link as={RouterLink} to="/" mr="4">Accueil</Link>
                <Link as={RouterLink} to="/profile" mr="4">Mon profil</Link>
                <Link as={RouterLink} to="/creer" mr="4">Créer une sortie</Link>
                <Link as={RouterLink} to={`/details/${props.user && props.user.id ? props.user.id : ''}`} mr="4">Détails sortie</Link>
                {props.user ? (
                    <Button onClick={handleLogout} variant="link" colorScheme="black" mr="4">
                        <Tooltip label='Se déconnecter!'>
                            <Avatar name={props.user.nom}/>
                        </Tooltip>
                    </Button>
                ) : (
                    <Link as={RouterLink} to="/connecter">Se Connecter</Link>
                )}
            </Box>
        </Flex>
    );
}

export default NavBar