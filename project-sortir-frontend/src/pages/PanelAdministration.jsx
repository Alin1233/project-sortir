import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom"
import serviceIsAdmin from "../services/serviceIsAdmin.js";
import {
    Box,
    Button,
    Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent,
    DrawerFooter, DrawerHeader, DrawerOverlay,
    FormLabel,
    Heading, Input, InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Select, Stack, Textarea, useDisclosure
} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
const PanelAdministration = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        if (props.user === null) {
            navigate('/connecter');
            return;
        }
        const checkAdmin = async () => {
            try {
                // eslint-disable-next-line react/prop-types
                const userId = props.user.id;
                const checkAdmin = await serviceIsAdmin.checkAdmin(userId);
               if (checkAdmin.isAdmin === false) {
                    navigate('/');
                }
            } catch (error) {
                console.error("L'affichage de la page nécessite une élevation des droits :", error);
            }
        };

       checkAdmin();
        // eslint-disable-next-line react/prop-types
    }, [navigate, props.user]);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()

    return (
        <div>
            <Center mb="6">
                <Heading as='h1' size='3xl' color="teal.500">PANNEAU D'ADMINISTRATION</Heading>
            </Center>

            <Button leftIcon={<AddIcon />} colorScheme='teal' size='xl' onClick={onOpen}>
                Create user
            </Button>



            <Drawer
                isOpen={isOpen}
                placement='right'
                initialFocusRef={firstField}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        Create a new account
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing='24px'>
                            <Box>
                                <FormLabel htmlFor='username'>Name</FormLabel>
                                <Input
                                    ref={firstField}
                                    id='username'
                                    placeholder='Please enter user name'
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor='url'>Url</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon>http://</InputLeftAddon>
                                    <Input
                                        type='url'
                                        id='url'
                                        placeholder='Please enter domain'
                                    />
                                    <InputRightAddon>.com</InputRightAddon>
                                </InputGroup>
                            </Box>

                            <Box>
                                <FormLabel htmlFor='owner'>Select Owner</FormLabel>
                                <Select id='owner' defaultValue='segun'>
                                    <option value='segun'>Segun Adebayo</option>
                                    <option value='kola'>Kola Tioluwani</option>
                                </Select>
                            </Box>

                            <Box>
                                <FormLabel htmlFor='desc'>Description</FormLabel>
                                <Textarea id='desc' />
                            </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Submit</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </div>
     );
};
export default PanelAdministration