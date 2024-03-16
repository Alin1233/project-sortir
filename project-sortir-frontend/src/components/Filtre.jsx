/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import SearchBar from './SearchBar'
import SearchParCampus from './SearchParCampus'
import SearchParDate from './SearchParDate'
import { Heading, VStack, Box, Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import dateFunctions from '../helpers/dateFunctions'
const Filtre = (props) => {
    const [searchCampus, setSearchCampus] = useState("");
    const [searchNom, setSearchNom] = useState("");
    const [searchDate1, setSearchDate1] = useState("")
    const [searchDate2, setSearchDate2] = useState("")
    const [originalSorties, setOriginalSorties] = useState([...props.sorties]);
    const [checkBox, setcheckBox] = useState(['organisateur','inscrit','nonInscrit','passee'])

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

      const handleCheckbox = (value)=> {
        console.log(value)
      }

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
            <VStack align="start">
              <CheckboxGroup colorScheme="green" defaultValue={checkBox[1]}  onChange={(value) => handleCheckbox(value)}>
                <Checkbox value={checkBox[0]}>Sorties dont je suis l'organisateur</Checkbox>
                <Checkbox value={checkBox[1]}>Sorties où je suis inscrit</Checkbox>
                <Checkbox value={checkBox[2]}>Sorties auxquelles je ne suis pas inscrit</Checkbox>
                <Checkbox value={checkBox[3]}>Sorties passées</Checkbox>
              </CheckboxGroup>
            </VStack>
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