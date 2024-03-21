/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import {Menu,MenuButton,MenuList,MenuItem,Button,} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons';
import serviceSortie from '../services/serviceSortie';
import Notification from './Notification';
import { useState } from 'react';
import { Link } from '@chakra-ui/react';

import { Link as RouterLink } from "react-router-dom";

const ActionsComponent = (props) => {

    const [isHovered, setIsHovered] = useState(false);

    const handleSeDesister = async (sortieId, userId)=> {
        const response = await serviceSortie.seDesister(sortieId,userId)
        if (response.status === 200) {
            props.setNotification({ status: 'success', description: 'Vous avez renoncé à votre participation avec succès' });
            props.setIsVisible(true);
            setTimeout(() => props.setIsVisible(false), 5000);
          }else{
            props.setNotification({ status: 'error', description: 'Une erreur est survenue, essayez à nouveau' });
            props.setIsVisible(true);
            setTimeout(() => props.setIsVisible(false), 5000);
          }
        props.setUpdateData(true)
        
    }
    const handlePublier = async(sortieId)=>{
        const response = await serviceSortie.publierSortie(sortieId)
        if (response.status === 200) {
            props.setNotification({ status: 'success', description: 'Vous avez publié la sortie avec succès!' });
            props.setIsVisible(true);
            setTimeout(() => props.setIsVisible(false), 5000);
          }else{
            props.setNotification({ status: 'error', description: 'Une erreur est survenue, essayez à nouveau' });
            props.setIsVisible(true);
            setTimeout(() => props.setIsVisible(false), 5000);
          }
        props.setUpdateData(true)
    }
    return (
        <Menu>
            <MenuButton color='white' backgroundColor='teal.500' _hover={{ bg: 'teal' }} as={Button} rightIcon={<ChevronDownIcon />}>
                Actions
            </MenuButton>
            <MenuList>
                {(props.sortie.etat === "Creee" || props.sortie.etat === "Ouverte") && (props.sortie.organisateur.nom === props.user.nom || props.user.isAdmin)
                ?
                    <MenuItem as={Button}>  <Link as={RouterLink} to={`/modifier/${props.sortie.id}`} id={props.sortie.id} mr="4">Modifier</Link></MenuItem>
                :   null

                }
                {(props.sortie.etat === "Creee" || props.sortie.etat === "Ouverte") && (props.sortie.organisateur.nom === props.user.nom || props.user.isAdmin)
                ?
                    <MenuItem as={Button}>  <Link as={RouterLink} to={`/annuler/${props.sortie.id}`} id={props.sortie.id} mr="4">Annuler</Link></MenuItem>
                :   null
                }
                {props.sortie.etat === "Creee" && (props.sortie.organisateur.id === props.user.id || props.user.isAdmin === true )
                ?
                    <MenuItem _hover={{ textDecoration: "underline" }} as={Button} onClick={()=>handlePublier(props.sortie.id)}>Publier la sortie</MenuItem>
                :   null
                }
                {props.sortie.participants.includes(props.user.id) && (props.sortie.etat === "Creee" ||props.sortie.etat === "Ouverte" )
                ?
                    <MenuItem _hover={{ textDecoration: "underline" }} as={Button} onClick={()=>handleSeDesister(props.sortie.id, props.user.id)}>Se désister</MenuItem>
                :   null
                }
                {!((props.sortie.etat === "Creee" || props.sortie.etat === "Ouverte") && (props.sortie.organisateur.nom === props.user.nom || props.user.isAdmin)) && !(props.sortie.etat === "Creee" && (props.sortie.organisateur.id === props.user.id || props.user.isAdmin === true )) && !(props.sortie.participants.includes(props.user.id) && (props.sortie.etat === "Creee" ||props.sortie.etat === "Ouverte" ))
                ?
                    <MenuItem as={Button}>Aucune action n'est disponible</MenuItem>
                :   null
                }
            </MenuList>
        </Menu>
    )
}

export default ActionsComponent