/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import {Menu,MenuButton,MenuList,MenuItem,Button,} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons';


const ActionsComponent = (props) => {
    const handleSeDesister = async ()=> {
        console.log("ola");
    }
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Actions
            </MenuButton>
            <MenuList>
                <MenuItem>Modifier</MenuItem>
                <MenuItem>Publier</MenuItem>
                <MenuItem>Supprimer</MenuItem>
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