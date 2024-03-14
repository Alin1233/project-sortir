/* eslint-disable react/prop-types */
import { Input, VStack,Box, Text } from "@chakra-ui/react"

const SearchParDate = (props) => {
  const handleSearch1 = (e) => {
    const newValue = e.target.value;
    props.setSearchDate1(newValue);
  };
  const handleSearch2 = (e) => {
    const newValue = e.target.value;
    props.setSearchDate2(newValue);
  };
  return (
    <VStack spacing={3} align="start">
        <Box w="100%">
            <Text mb={1}>Entre:</Text>
            <Input type='date' name='dateLimit' value={props.searchDate1} onChange={handleSearch1} size="md" maxW="300px" />
        </Box>
        <Box w="100%">
            <Text mb={1}>Et:</Text>
            <Input type='date' name='dateLimit' value={props.searchDate2} onChange={handleSearch2} size="md" maxW="300px" />
        </Box>
    </VStack>
);
}

export default SearchParDate