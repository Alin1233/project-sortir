/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { InputGroup, Input, InputRightElement, Button } from "@chakra-ui/react";
const SearchBar = (props) => {

    const [searchNom, setSearchNom] = useState("");
    const [originalSorties, setOriginalSorties] = useState([...props.sorties]);

    const handleSearch = (e) => {
        const newValue = e.target.value;
        setSearchNom(newValue);
        if (newValue === "") {
            // Si le champ de recherches est vide, revenir aux valeurs d'origine.
            props.setSorties(originalSorties);
        } else {
            // Sinon, filtre basé sur les entrées de la recherche
            const sortiesFiltre = props.sorties.filter(sortie => sortie.nom.includes(newValue));
            props.setSorties(sortiesFiltre);
        }
    };
    return  (
        
          <Input
            placeholder="Search..."
            value={searchNom}
            onChange={handleSearch}
          />
          
      );
}

export default SearchBar