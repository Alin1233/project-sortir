/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Link, Heading, VStack, Box, Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import serviceSortie from "../services/serviceSortie";
import { Table, Thead, Tbody, Tr, Th, Td, Spinner, Flex, Text, Icon, SimpleGrid, HStack, Avatar, useBreakpointValue  } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import Filtre from "../components/Filtre";
import axios from "axios";
import dateFunctions from "../helpers/dateFunctions";
import ActionsComponent from "../components/ActionsComponent";
import { ChevronDownIcon, CheckIcon, TimeIcon, LockIcon, CalendarIcon, ViewIcon  } from '@chakra-ui/icons';

const Accueil = (props) => {
  
  const [currentDate, setCurrentDate] = useState(new Date())
  const [sorties, setSorties] = useState(null)
  const [updateData, setUpdateData] = useState(false);

  const formattedDate = currentDate.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  useEffect(() => {
    const fetchData = async () => {
      const filter = ['inscrit']
      if (props.user) {
      const response = await serviceSortie.getAllSortiesByFilter(filter, props.user.id)
      setSorties(response)
      setUpdateData(false);}
    };
    fetchData();
  }, [props.user, updateData]);

    function useDocumentTitle(title) {
        useEffect(() => {
            document.title = title;
        }, [title]);
    }
    useDocumentTitle('Golaf! | Accueil')

  const handleParticiperClick = async(idSortie) =>{
    const idUser = props.user.id
    const data = {
      idSortie: idSortie,
      idParticipant: idUser
    }
    const response = await serviceSortie.addParticipant(data)
    setUpdateData(true);
  }
  //effet popover et design
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
  setIsOpen(!isOpen);
  };
  //design pour smartphone
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  //data is loading
  if(sorties===null || props.user ===null ){
    return <Flex justifyContent="center" alignItems="center" height="100vh">
              <Spinner />
          </Flex>
  }

  return (
    <div>
        <Box>
          <Flex justifyContent="space-between" alignItems="center" p={5}>
            <Heading as="h1" size="lg"  textAlign="center">
              Accueil
            </Heading>
            <Text >
              Date du jour: {formattedDate} <Icon as={CalendarIcon}/>
            </Text>
          </Flex>
        </Box>
        <Popover isOpen={isOpen} onOpen={handleOpen} onClose={handleOpen}>
            <PopoverTrigger>
                <Button>Filtrer les sorties <ChevronDownIcon /></Button>
            </PopoverTrigger>
            <PopoverContent>
            <Filtre sorties={sorties} setSorties={setSorties}/>
            </PopoverContent>
        </Popover>
        <SimpleGrid columns={columns} spacing={10} ml={{base: "0", md: isOpen ? "350" : "0"}} mt={{base: isOpen ? "450" : "0", md: "0"}}>
    {sorties.map(sortie => (
        <Box key={sortie.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p="6"  bgColor="blue.50">
            <VStack align="center" spacing="4">
                <HStack spacing="4">
                    <Text fontSize="xl" fontWeight="bold">
                        <Link as={RouterLink} to={`/details/${sortie.id}`}>{sortie.nom}</Link>
                    </Text>
                    <Icon as={ViewIcon} />
                    <ActionsComponent/>
                </HStack>
                <Text><TimeIcon /> {dateFunctions.formatDateHour(sortie.dateHeureDebut)}</Text>
                <Text><LockIcon /> {dateFunctions.formatDate(sortie.dateLimiteInscription)}</Text>
                <VStack align="center" spacing="1">
                  <Text>Inscrits / Places:</Text>
                  <Text>{sortie.participants.length} / {sortie.nbInscriptionMax}</Text>
                </VStack>
                <Text>Etat: {sortie.etat}</Text>
                <Flex align="center">
                  <Text mr={2}>Organisateur: {sortie.organisateur}</Text>
                   <Avatar name={props.user.nom}/>
                </Flex>
                <HStack>
                    <Text>Inscrit:</Text>
                    {props.user 
                        ? sortie.participants.includes(props.user.id) 
                            ? <CheckIcon boxSize="20px" color="green.500" />
                            : <Button onClick={()=>handleParticiperClick(sortie.id)}>Participer</Button>
                        : <Link as={RouterLink} to="/connecter">Se Connecter</Link>
                    }
                </HStack>
            </VStack>
        </Box>
    ))}
        </SimpleGrid>
    </div>
);
}

export default Accueil