/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import serviceSortie from "../services/serviceSortie";
import { Table, Thead, Tbody, Tr, Th, Td, Spinner, Flex } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import Filtre from "../components/Filtre";

const Accueil = (props) => {
  
  const [currentDate, setCurrentDate] = useState(new Date())
  const [sorties, setSorties] = useState(null)
  const formattedDate = currentDate.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await serviceSortie.getAllSorties();
      setSorties(response)
    };
  
    fetchData();
  }, []);
  const handleParticiperClick = (idSortie) =>{
    const idUser = props.user.id
    console.log(idSortie)
    console.log(props.user.id)
  }
  //data is loading
  if(sorties===null){
    return <Flex justifyContent="center" alignItems="center" height="100vh">
              <Spinner />
          </Flex>
  }

  return (
    <div>
      <p>Accueil</p>
      <p>Date do jour: {formattedDate}</p>
      <p>Participant: {props.user.nom}</p>
      <Filtre sorties={sorties} setSorties={setSorties}/>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nom de la sortie</Th>
            <Th>Date de la sortie</Th>
            <Th>Cloture</Th>
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
              <Td>{sortie.nom}</Td>
              <Td>{sortie.dateHeureDebut}</Td>
              <Td>{sortie.dateLimiteInscription}</Td>
              <Td> {sortie.participants.length} /{sortie.nbInscriptionMax}</Td>
              <Td>{sortie.etat}</Td>
              <Td>{sortie.participants.includes(props.user.id) ? 'Inscrit' : <Button onClick={()=>handleParticiperClick(sortie.id)}>Participer</Button>}</Td>
              <Td>{sortie.organisateur}</Td>
              <Td>Actions</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  )
}

export default Accueil