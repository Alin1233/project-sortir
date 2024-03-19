import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Button,
    Stack
} from "@chakra-ui/react";

const CustomDrawer = ({ isOpen, onClose, drawerType }) => {
    const getTitleByType = (type) => {
        switch (type) {
            case 'AjouterVille': return 'Ajouter une Ville';
            // Ajoutez d'autres cas selon le type
            default: return '';
        }
    };

    const getContentByType = (type) => {
        switch (type) {
            case 'AjouterVille':
                return (
                    <Stack spacing='24px'>
                        {/* Contenu spécifique à Ajouter Ville */}
                    </Stack>
                );
            // Ajoutez d'autres cas pour les différents types
            default: return <div></div>;
        }
    };

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">
                    {getTitleByType(drawerType)}
                </DrawerHeader>
                <DrawerBody>
                    {getContentByType(drawerType)}
                </DrawerBody>
                <DrawerFooter borderTopWidth="1px">
                    <Button variant="outline" mr={3} onClick={onClose}>Annuler</Button>
                    <Button colorScheme="blue">Soumettre</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default CustomDrawer;