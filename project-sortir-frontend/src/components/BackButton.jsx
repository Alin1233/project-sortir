import React from "react";
import { useNavigate } from 'react-router-dom';
import {Button} from "@chakra-ui/react";

function GoBackButton() {
    let navigate = useNavigate();

    function handleGoBack() {
        navigate(-1); // -1 permet de revenir à la page précédente
    }

    return (
        <Button fontWeight='extrabold'  fontSize='1em' colorScheme="teal" onClick={handleGoBack}>Retour</Button>
    );
}

export default GoBackButton;