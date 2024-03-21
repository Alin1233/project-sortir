import {
    Input,
    Box,
    Text,
    Button,
    Flex,
    DrawerBody,
    VStack,
    Center,
    DrawerFooter,
    Icon,
    useToast
} from "@chakra-ui/react";
import React, { useState } from "react";
import Papa from 'papaparse'
import serviceIsAdmin from "../services/serviceIsAdmin";
import {CheckCircleIcon, WarningIcon} from "@chakra-ui/icons";
// eslint-disable-next-line react/prop-types
const InscrireCSV = ({ isOpen, onClose, drawerType }) => {
    const [fileName, setFileName] = useState("");
    const toast = useToast();
    const handleFile = (event) => {
        const file = event.target.files[0];
        const name = file.name;
        Papa.parse(event.target.files[0],{
            header:true,
            skipEmptyLines:true,
            complete: (result) => {
                setFileName(name);
                result.data.map(async(d)=>{
                    const participant = {
                      mail:d.mail,
                      password:d.password,
                      campusNom:d.campus
                    }
                    const response = await serviceIsAdmin.createParticipant(participant)
                    console.log(response);
                    if(response.data.message === "Participant créé"){
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
                                                Utilisateurs créés avec succès
                                            </Text>
                                        </Flex>
                                    </Box>
                                ),
                                isClosable: true,
                                position: "top",
                            })
                        )
                    }else if(response.data.error){
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
                                                Erreur lors de la création des utilisateurs, veuillez charger un fichier valide et réessayer.
                                            </Text>
                                        </Flex>
                                    </Box>
                                ),
                                isClosable: true,
                                position: "top",
                            })
                        )
                    }
                })
            }
        })
        event.target.value = null;
    }
    return (
        <form>
            <DrawerBody>
                <VStack align="center">
                    <Flex direction="column" alignItems='center' justifyContent='center'>
                        <Box minW="200px" py={3} px={4} borderWidth={1} borderRadius="md" textAlign="center">
                            <Text fontSize='2xl' fontWeight='bold'>{fileName || "Aucun fichier choisi"}</Text>
                            <Flex direction="column" alignItems="center">
                                <Input
                                    type="file"
                                    name="file"
                                    accept=".csv"
                                    onChange={handleFile}
                                    display="none"
                                    id="file-upload"
                                />
                                <label htmlFor="file-upload">
                                    <Button as="span" colorScheme="teal" mt={2}>
                                        Charger un fichier .CSV
                                    </Button>
                                </label>
                            </Flex>
                        </Box>
                    </Flex>
                </VStack>
                <Center>

                </Center>
            </DrawerBody>
        </form>
    );

}

export default InscrireCSV;