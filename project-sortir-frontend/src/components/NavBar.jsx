/* eslint-disable react/prop-types */
import { Box, Button, Link, Flex, Image, Heading } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import logo from '../assets/logo.jpg'
const NavBar = (props) => {
    //Quand quelqu'un clique sur "log out", le cookie est supprimé et l'utilisateur actuel est déclaré null
    const handeleLogout = () =>{
        window.localStorage.removeItem("loggedUser")
        props.setUser(null)
    }
    return (
        <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="teal.500" color="white">
            <Box>
            <Flex align="center">
                <Image src={logo} alt="Logo" boxSize="100px" borderRadius="full"/>
                <Heading size="lg" ml="4">Sortir avec Olaf!</Heading>
            </Flex>
            </Box>
            <Box>
                <Link as={RouterLink} to="/" mr="4">Accueil</Link>
                <Link as={RouterLink} to="/profile" mr="4">Profile</Link>
                {props.user ? (
                    <Button onClick={handeleLogout} variant="link" colorScheme="black" mr="4">
                        Welcome {props.user.nom}, Log Out
                    </Button>
                ) : (
                    <Link as={RouterLink} to="/connecter">Se Connecter</Link>
                )}
            </Box>
        </Flex>
    );
}

export default NavBar