/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { InputGroup, Input, InputRightElement, Button } from "@chakra-ui/react";
const SearchBar = (props) => {
    const handleSearch = (e) => {
        const newValue = e.target.value;
        props.setSearchNom(newValue);
    };

    return (
        <Input
            placeholder="Recherche par le nom de la sortie"
            value={props.searchNom}
            onChange={handleSearch}
        />
    );
}


export default SearchBar