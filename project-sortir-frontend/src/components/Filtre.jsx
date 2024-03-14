/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import SearchBar from './SearchBar'
import SearchParCampus from './SearchParCampus'
import SearchParDate from './SearchParDate'
import { Heading } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

const Filtre = (props) => {
    const [searchCampus, setSearchCampus] = useState("");
    const [searchNom, setSearchNom] = useState("");
    const [originalSorties, setOriginalSorties] = useState([...props.sorties]);
    

    useEffect(() => {
        let filteredSorties = [...originalSorties];
      
       
        if (searchNom) {
          filteredSorties = filteredSorties.filter(sortie => sortie.nom.includes(searchNom));
        }
        if (searchCampus) {
          filteredSorties = filteredSorties.filter(sortie => sortie.campus === searchCampus);
        }
      
        
        props.setSorties(searchNom || searchCampus ? filteredSorties : originalSorties);
      }, [searchNom, searchCampus]);

    return (
        <div>
            <Heading>Filtrer les sorties</Heading>
            <SearchBar searchNom={searchNom} setSearchNom={setSearchNom} />
            <SearchParDate/>
            <SearchParCampus value={searchCampus} onChange={(e) => setSearchCampus(e.target.value)} />
        </div>
    )
}

export default Filtre