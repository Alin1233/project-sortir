/* eslint-disable no-unused-vars */
import {Box, Button, Center, Heading, Image, Text, VStack, SimpleGrid, HStack,Icon, Link, Flex, Avatar, Spacer, Stack} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import serviceAutreProfil from "../services/serviceAutreProfil.js";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../components/Loading.jsx";
import BackButton from "../components/BackButton.jsx";
import serviceSortie from "../services/serviceSortie.js";
import dateFunctions from "../helpers/dateFunctions.js";
import { ChevronDownIcon, CheckIcon, TimeIcon, LockIcon, CalendarIcon, ViewIcon  } from '@chakra-ui/icons';
import { useBreakpointValue } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import ActionsComponent from "../components/ActionsComponent.jsx";
const AutreProfilUtilisateur =()=>{

    let { userId } = useParams();
    const[prenom,setPrenom]=useState('');
    const[nom,setNom]=useState('');
    const[telephone,setTelephone]=useState('');
    const[email,setEmail]=useState('');
    const[campus,setCampus]=useState('');
    const[pseudo, setPseudo]=useState('');
    const[image, setImage] = useState('');
    const [sortiesUser, setSortiesUser] = useState('');

    useEffect(()=> {
        const responseId = async ()=>{
            //récupération de toutes les infos via adresse api de l'utilisateur via l'id que l'on récupere dans l'url
            const response = await serviceAutreProfil.getAutreProfil(userId);
            setPseudo(response.pseudo);
            setTelephone(response.telephone);
            setNom(response.nom);
            setPrenom(response.prenom);
            setEmail(response.email);
            setCampus(response.campusNom);
            setImage(response.image)
        }
        responseId();
        const getSortiesUser = async () => {
            const response = await serviceSortie.getAllSortiesByFilter(['inscrit'],userId)
            setSortiesUser(response)
            console.log(response);
        }
        getSortiesUser();

        },[userId]);

    function useDocumentTitle(title) {
        useEffect(() => {
            document.title = title;
        }, [title]);
    }
    useDocumentTitle('Golaf! | Profil de '+pseudo);

    const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });
    const [updateData, setUpdateData] = useState(false);
    //notification
    const [notification, setNotification] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const [isVisibleButton, setIsVisibleButton] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
  

    if (userId===undefined) {
        return(
            <div>
                <Loading/>
            </div>
        );
    }

    return (
        <Box>
          <Center mt="100px" p={5}>
            <Heading textDecoration="underline">{pseudo}</Heading>
          </Center>
          <Center>
            <Box boxSize='sm'>
              <VStack align="stretch" >
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <Image src={`http://localhost:8000/getimage/${image}`} alt='Hummm' borderRadius="full" />
              </VStack>
            </Box>
            <Box  w="30%" p="5" bg="white" boxShadow="md" borderRadius="full" backgroundColor="#FFFAFA">
              <Center>
                <VStack align="stretch">
                  <Text>Prénom : {prenom}</Text>
                  <Text>Nom : {nom}</Text>
                  <Text>Téléphone : {telephone}</Text>
                  <Text>Email : {email}</Text>
                  <Text>Campus : {campus}</Text>
                </VStack>
              </Center>
            </Box>
          </Center>
          <Stack direction="row" spacing={4} justify="center" mt={4}>
            <BackButton />
            <Button onClick={toggleVisibility} colorScheme='teal'>
              {isVisible ? 'Cacher les sorties où cet utilisateur est inscrit' : 'Afficher les sorties où cet utilisateur est inscrit'}
            </Button>
          </Stack>
          {isVisible && (
            <SimpleGrid columns={columns} spacing={10} mt={4}>
              {sortiesUser && sortiesUser.map(sortie => (
                <Box key={sortie.id} borderWidth="5px" borderRadius="30px" overflow="hidden" p="6" boxShadow='dark-lg' borderColor='teal.500' m={{base: "4", md: "0"}}>
                  <VStack align="center" spacing="4">
                    <HStack spacing="4">
                      <Text fontSize="xl" fontWeight="bold">
                        <Link as={RouterLink} to={`/details/${sortie.id}`}>{sortie.nom}</Link>
                      </Text>
                      <Icon as={ViewIcon} />
                    </HStack>
                    <Text fontWeight="bold"><TimeIcon /> {dateFunctions.formatDateHour(sortie.dateHeureDebut)}</Text>
                    <Text fontWeight="bold"><LockIcon /> {dateFunctions.formatDate(sortie.dateLimiteInscription)}</Text>
                    <VStack align="center" spacing="1">
                      <Text fontWeight="bold">Inscrits / Places:</Text>
                      <Text fontWeight="bold">{sortie.participants.length} / {sortie.nbInscriptionMax}</Text>
                    </VStack>
                    <Text fontWeight="bold">Etat: {sortie.etat}</Text>
                    <Flex align="center">
                      <Text mr={2} fontWeight="bold">Organisateur: <Link as={RouterLink} to={`/profile/${sortie.organisateur.id}`}>{sortie.organisateur.nom}</Link></Text>
                      <Avatar name={sortie.organisateur.nom} src={`http://localhost:8000/getimage/${sortie.organisateur.image}`}/>
                    </Flex>
                    <HStack>
                      <Text fontWeight="bold">Inscrit:</Text>
                      <CheckIcon boxSize="20px" color="green.500" />
                    </HStack>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
      );
        
    }

export default AutreProfilUtilisateur