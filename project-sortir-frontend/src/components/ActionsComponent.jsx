
import {Menu,MenuButton,MenuList,MenuItem,Button,} from '@chakra-ui/react'
  import { ChevronDownIcon } from '@chakra-ui/icons';

const ActionsComponent = (props) => {
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Actions
            </MenuButton>
            <MenuList>
                <MenuItem>Modifier</MenuItem>
                <MenuItem>Publier</MenuItem>
                <MenuItem>Supprimer</MenuItem>
                <MenuItem>Se désister</MenuItem>
            </MenuList>
        </Menu>
    )
}

export default ActionsComponent