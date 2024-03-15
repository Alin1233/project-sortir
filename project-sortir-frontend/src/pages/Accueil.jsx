/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Link, Heading, VStack, Box, Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import serviceSortie from "../services/serviceSortie";
import { Table, Thead, Tbody, Tr, Th, Td, Spinner, Flex, Text, Icon } from "@chakra-ui/react";
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
      const response = await serviceSortie.getAllSorties();
      setSorties(response)
      setUpdateData(false);
    };
    fetchData();
  }, [updateData]);

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

  //data is loading
  if(sorties===null ){
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
        <Table variant="simple" mt={isOpen ? "400" : "0"}>
            <Thead>
                <Tr>
                    <Th>Nom de la sortie</Th>
                    <Th> 
                      <Flex alignItems="center">
                        <Text marginRight="2">Date de la sortie</Text>
                        <TimeIcon />
                      </Flex>
                    </Th>
                    <Th>
                      <Flex alignItems="center">
                        <Text marginRight="2">Cloture</Text>
                        <LockIcon />
                      </Flex>
                    </Th>
                    <Th>Inscrits / Places</Th>
                    <Th>Etat</Th>
                    <Th>Inscrit</Th>
                    <Th>Organisateur</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {sorties.map(sortie => (
                    <Tr key={sortie.id}>
                        <Td><Link as={RouterLink} to={`/details/${sortie.id}`} mr="4">{sortie.nom} <ViewIcon/></Link></Td>
                        <Td>{dateFunctions.formatDateHour(sortie.dateHeureDebut)}</Td>
                        <Td>{dateFunctions.formatDate(sortie.dateLimiteInscription)}</Td>
                        <Td> {sortie.participants.length} /{sortie.nbInscriptionMax}</Td>
                        <Td>{sortie.etat}</Td>
                        <Td>
                          {props.user 
                            ? sortie.participants.includes(props.user.id) 
                              ? <CheckIcon boxSize="20px" color="green.500" />
                              : <Button onClick={()=>handleParticiperClick(sortie.id)}>Participer</Button>
                            : <Link as={RouterLink} to="/connecter">Se Connecter</Link>
                          }
                        </Td>
                        <Td>{sortie.organisateur}</Td>
                        <Td><ActionsComponent/></Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    </div>
);
}

export default Accueil