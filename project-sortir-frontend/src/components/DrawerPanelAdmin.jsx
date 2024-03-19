import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Stack, Box, FormLabel, InputGroup, InputLeftAddon, InputRightAddon, Select, Textarea } from '@chakra-ui/react';

function DrawerPanelAdmin({ isOpen, onClose, drawerTitle, children }) {
    return (
        <Drawer size={'xl'} isOpen={isOpen} placement='right' onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth='1px'>{drawerTitle}</DrawerHeader>

                <DrawerBody>
                    {children}
                </DrawerBody>

                <DrawerFooter borderTopWidth='1px'>
                    <Button variant='outline' mr={3} onClick={onClose}>Cancel</Button>
                    <Button colorScheme='blue'>Submit</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
