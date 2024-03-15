/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import SearchBar from './SearchBar'
import SearchParCampus from './SearchParCampus'
import SearchParDate from './SearchParDate'
import { Heading, VStack, Box } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import dateFunctions from '../helpers/dateFunctions'
const Filtre = (props) => {
    const [searchCampus, setSearchCampus] = useState("");
    const [searchNom, setSearchNom] = useState("");
    const [searchDate1, setSearchDate1] = useState("")
    const [searchDate2, setSearchDate2] = useState("")
    const [originalSorties, setOriginalSorties] = useState([...props.sorties]);
    

    useEffect(() => {
        let filteredSorties = [...originalSorties];
       
        if (searchNom) {
          filteredSorties = filteredSorties.filter(sortie => sortie.nom.includes(searchNom));
        }
        if (searchCampus) {
          filteredSorties = filteredSorties.filter(sortie => sortie.campus === searchCampus);
        }
        if(searchDate1 && searchDate2){
          filteredSorties = filteredSorties.filter(sortie=>
            dateFunctions.dateComparison(searchDate1,sortie.dateHeureDebut,searchDate2)
          )
        }
        
        props.setSorties(searchNom || searchCampus || searchDate1 || searchDate2 ? filteredSorties : originalSorties);
      }, [searchNom, searchCampus, searchDate1, searchDate2]);

      return (
        <VStack
            spacing={5}
            align="start"
            p={5}
            borderRadius="md"
            boxShadow="lg"
            bg="white"
        >
            <Heading size="lg">Filtrer les sorties</Heading>
            <Box w="100%">
                <SearchBar searchNom={searchNom} setSearchNom={setSearchNom} />
            </Box>
            <Box w="100%">
                <SearchParDate searchDate1={searchDate1} setSearchDate1={setSearchDate1} searchDate2={searchDate2} setSearchDate2={setSearchDate2}/>
            </Box>
            <Box w="100%">
                <SearchParCampus value={searchCampus} onChange={(e) => setSearchCampus(e.target.value)} />
            </Box>
        </VStack>
    );
}

export default Filtre