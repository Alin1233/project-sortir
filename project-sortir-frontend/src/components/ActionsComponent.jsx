/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import {Menu,MenuButton,MenuList,MenuItem,Button,} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons';
import serviceSortie from '../services/serviceSortie';

const ActionsComponent = (props) => {
    const handleSeDesister = async (sortieId, userId)=> {
        const response = await serviceSortie.seDesister(sortieId,userId)
        props.setUpdateData(true)
    }
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Actions
            </MenuButton>
            <MenuList>
                <MenuItem>Modifier</MenuItem>
                <MenuItem>Supprimer</MenuItem>
                <MenuItem>Publier</MenuItem>
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