/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import SearchBar from './SearchBar'
import SearchParCampus from './SearchParCampus'
import SearchParDate from './SearchParDate'
import { Heading, VStack, Box, Checkbox, CheckboxGroup,Button } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import dateFunctions from '../helpers/dateFunctions'
import serviceSortie from '../services/serviceSortie'
const Filtre = (props) => {
    const [searchCampus, setSearchCampus] = useState("");
    const [searchNom, setSearchNom] = useState("");
    const [searchDate1, setSearchDate1] = useState("")
    const [searchDate2, setSearchDate2] = useState("")
    const [originalSorties, setOriginalSorties] = useState([...props.sorties]);
    const [checkboxValues, setCheckboxValues] = useState(['inscrit']);
    
    const [apiSorties, setApiSorties] = useState([...props.sorties]);

    useEffect(() => {
      let filteredSorties = [...apiSorties];
       
        if (searchNom) {
          filteredSorties = filteredSorties.filter(sortie => sortie.nom.toLowerCase().includes(searchNom.toLowerCase()));
        }
        if (searchCampus) {
          filteredSorties = filteredSorties.filter(sortie => sortie.campus === searchCampus);
        }
        if(searchDate1 && searchDate2){
          filteredSorties = filteredSorties.filter(sortie=>
            dateFunctions.dateComparison(searchDate1,sortie.dateHeureDebut,searchDate2)
          )
        }
        
        props.setSorties(searchNom || searchCampus || searchDate1 || searchDate2 ? filteredSorties : apiSorties);
      }, [searchNom, searchCampus, searchDate1, searchDate2, apiSorties]);

      const handleCheckbox = async(value) => {
          setCheckboxValues(value);
          const response = await serviceSortie.getAllSortiesByFilter(value, props.user.id);
          setApiSorties(response); 
          props.setSorties(response);
          
          
      };
      const handleResetClick = () => {
        setSearchCampus("")
        setSearchNom("")
        setSearchDate1("")
        setSearchDate2("")
        setCheckboxValues(['inscrit'])
        props.setUpdateData(true)
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
            <CheckboxGroup  colorScheme="green"  value={checkboxValues} onChange={handleCheckbox}>
              <Checkbox value="organisateur">Sorties dont je suis l'organisateur</Checkbox>
              <Checkbox value="inscrit">Sorties où je suis inscrit</Checkbox>
              <Checkbox value="nonInscrit">Sorties auxquelles je ne suis pas inscrit</Checkbox>
              <Checkbox value="passee">Sorties passées</Checkbox>
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
            <Box w="100%" display="flex" justifyContent="center">
              <Button onClick={handleResetClick}>Réinitialiser les filtres</Button>
            </Box>
        </VStack>
    );
}

export default Filtre