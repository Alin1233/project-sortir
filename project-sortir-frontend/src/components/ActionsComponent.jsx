
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button, Link,
} from '@chakra-ui/react'
  import { ChevronDownIcon } from '@chakra-ui/icons';
import {Link as RouterLink} from "react-router-dom";

const ActionsComponent = (props) => {
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Actions
            </MenuButton>
            <MenuList>
                <MenuItem>Modifier</MenuItem>
                <MenuItem>Publier</MenuItem>
                <MenuItem><Link as={RouterLink} to={`/annuler/${props.sortie.id}`} id={props.sortie.id} mr="4">Supprimer</Link></MenuItem>
            </MenuList>
        </Menu>
    )
}

export default ActionsComponent