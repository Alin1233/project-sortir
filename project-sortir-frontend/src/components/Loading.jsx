import {Flex, Spinner, Text} from "@chakra-ui/react";

const  Loading = () => {

    return (
        <div>
            <Flex justifyContent="center" alignItems="center" height="100vh">
                <Text fontSize='2xl' mb="3" color="gray.700"> Chargement en cours  ... </Text>&nbsp; &nbsp;<Spinner   thickness='4px'
                                                                                                                      speed='0.65s'
                                                                                                                      emptyColor='gray.200'
                                                                                                                      color='teal.400'
                                                                                                                      size='xl'
            />
            </Flex>
        </div>
    );
};
export default Loading;