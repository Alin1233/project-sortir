/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import SearchBar from './SearchBar'
import SearchParCampus from './SearchParCampus'
import SearchParDate from './SearchParDate'
import { Heading } from '@chakra-ui/react'
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
        <div>
            <Heading>Filtrer les sorties</Heading>
            <SearchBar searchNom={searchNom} setSearchNom={setSearchNom} />
            <SearchParDate searchDate1={searchDate1} setSearchDate1={setSearchDate1} searchDate2={searchDate2} setSearchDate2={setSearchDate2}/>
            <SearchParCampus value={searchCampus} onChange={(e) => setSearchCampus(e.target.value)} />
        </div>
    )
}

export default Filtre