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
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Actions
            </MenuButton>
            <MenuList>
            <MenuItem as={Button}>  <Link as={RouterLink} to={`/modifier/${props.sortie.id}`} id={props.sortie.id} mr="4">Modifier</Link></MenuItem>
            <MenuItem as={Button}>  <Link as={RouterLink} to={`/annuler/${props.sortie.id}`} id={props.sortie.id} mr="4">Annuler</Link></MenuItem>
                {props.sortie.etat === "Creee" && (props.sortie.organisateur.id === props.user.id || props.user.isAdmin === true )
                ?
                    <MenuItem as={Button} onClick={()=>handlePublier(props.sortie.id)}>Publier</MenuItem>
                :   null
                }
                {props.sortie.participants.includes(props.user.id)
                ?
                    <MenuItem as={Button} onClick={()=>handleSeDesister(props.sortie.id, props.user.id)}>Se désister</MenuItem>
                :   null
                }
            </MenuList>
        </Menu>
    )
}

export default ActionsComponent