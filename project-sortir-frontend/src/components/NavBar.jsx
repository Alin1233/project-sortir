/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Box, Button, Link, Flex, Image, Heading, Avatar, Tooltip, Text, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from "react-router-dom";
import logo from '../assets/logo.png';
import { useBreakpointValue, VStack } from "@chakra-ui/react";
import { useRef } from "react";

const NavBar = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    props.setUser(null);
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="teal.500" color="white">
      <Box>
        <Flex align="center">
          <Link as={RouterLink} to="/" mr="4">
            <Image src={logo} alt="Logo" boxSize="100px" borderRadius="full" />
          </Link>
          {props.user ? (
            <Heading size="lg" ml="4">{props.user.nom}, Let's Golaf!</Heading>
          ) : (
            <Heading size="lg" ml="4">Golaf!</Heading>
          )}
        </Flex>
      </Box>
      {isMobile ? (
        <>
          <IconButton ref={btnRef} colorScheme="teal" onClick={onOpen} icon={<HamburgerIcon />} />
          <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>
                <DrawerBody>
                <VStack align="start" spacing={4}>
                {props.user ? (
                        <Button onClick={handleLogout} variant="link" colorScheme="black" mr="4">
                            <Tooltip label='Se déconnecter!'>
                            <Avatar src={`http://localhost:8000/getimage/${props.user.image}`} name={props.user.nom} />
                            </Tooltip>
                        </Button>
                        ) : (
                        <Text fontSize='1em' mb="3" color="black" fontWeight="extrabold"><Link as={RouterLink} to="/connecter">Se Connecter</Link></Text>
                        )}
                        {props.user?.isAdmin && (
                        <Text fontSize='1em' mb="3" color="black" fontWeight="extrabold"><Link as={RouterLink} to="/administration" mr="4">Administration</Link></Text>
                        )}
                        <Text fontSize='1em' mb="3" color="black" fontWeight="extrabold"><Link as={RouterLink} to="/" mr="4">Accueil</Link></Text>
                        <Text fontSize='1em' mb="3" color="black" fontWeight="extrabold"><Link as={RouterLink} to="/profile" mr="4">Mon profil</Link></Text>
                        <Text fontSize='1em' mb="3" color="black" fontWeight="extrabold"><Link as={RouterLink} to="/creer" mr="4">Créer une sortie</Link></Text>
                        
                    </VStack>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </>
      ) : (
        <Box display={{ base: isMobile ? "block" : "block" }}>
          <Flex align="center">
            {props.user?.isAdmin && (
              <Text fontSize='1em' mb="3" color="white" fontWeight="extrabold"><Link as={RouterLink} to="/administration" mr="4">Administration</Link></Text>
            )}
            <Text fontSize='1em' mb="3" color="white" fontWeight="extrabold"><Link as={RouterLink} to="/" mr="4">Accueil</Link></Text>
            <Text fontSize='1em' mb="3" color="white" fontWeight="extrabold"><Link as={RouterLink} to="/profile" mr="4">Mon profil</Link></Text>
            <Text fontSize='1em' mb="3" color="white" fontWeight="extrabold"><Link as={RouterLink} to="/creer" mr="4">Créer une sortie</Link></Text>
            {props.user ? (
              <Button onClick={handleLogout} variant="link" colorScheme="black" mr="4">
                <Tooltip label='Se déconnecter!'>
                  <Avatar src={`http://localhost:8000/getimage/${props.user.image}`} name={props.user.nom} />
                </Tooltip>
              </Button>
            ) : (
              <Text fontSize='1em' mb="3" color="white" fontWeight="extrabold"><Link as={RouterLink} to="/connecter">Se Connecter</Link></Text>
            )}
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default NavBar;