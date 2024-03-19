/* eslint-disable react/prop-types */
import {Box, Button, Link, Flex, Image, Heading, Avatar, Tooltip, Text} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import logo from '../assets/logo.png'

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
                {props.user ?(
                    <Heading size="lg" ml="4">{props.user.nom}, Let's Golaf!</Heading>
                ) : (
                    <Heading size="lg" ml="4">Golaf!</Heading>
                )}
            </Flex>
            </Box>
            <Box>
                <Flex>
                    <Text fontSize='2xl' mb="3" color="white" fontWeight="extrabold"><Link as={RouterLink} to="/administration" mr="4">Administration</Link></Text>
                    <Text fontSize='2xl' mb="3" color="white" fontWeight="extrabold"><Link as={RouterLink} to="/" mr="4">Accueil</Link></Text>
                    <Text fontSize='2xl' mb="3" color="white" fontWeight="extrabold"><Link as={RouterLink} to="/profile" mr="4">Mon profil</Link></Text>
                    <Text fontSize='2xl' mb="3" color="white" fontWeight="extrabold"><Link as={RouterLink} to="/creer" mr="4">Créer une sortie</Link></Text>
                    <Text fontSize='2xl' mb="3" color="white" fontWeight="extrabold"><Link as={RouterLink} to={`/details/${props.user && props.user.id ? props.user.id : ''}`} mr="4">Détails sortie</Link></Text>
                    {props.user ? (
                        <Button onClick={handleLogout} variant="link" colorScheme="black" mr="4">
                            <Tooltip label='Se déconnecter!'>
                                <Avatar name={props.user.nom}/>
                            </Tooltip>
                        </Button>
                    ) : (
                        <Text fontSize='2xl' mb="3" color="white" fontWeight="extrabold"><Link as={RouterLink} to="/connecter">Se Connecter</Link></Text>
                    )}
               </Flex>
            </Box>
        </Flex>
    );
}

export default NavBar