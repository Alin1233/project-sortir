import { Input, Box, Text, Button } from "@chakra-ui/react";
import { useState } from "react";
import Papa from 'papaparse'
const InscrireCSV = () => {
    const [fileName, setFileName] = useState("");
    const handleFile = (event) => {
        const file = event.target.files[0];
        const name = file.name;
        Papa.parse(event.target.files[0],{
            header:true,
            skipEmptyLines:true,
            complete: (result) => {
                setFileName(name);
                result.data.map((data)=>{
                    console.log(data)
                })
            }
        })
        event.target.value = null;
    }
    return (
        <Box w="200px" py={3} px={4} borderWidth={1} borderRadius="md">
          <Text>{fileName || "No file chosen"}</Text>
          <Input
            type="file"
            name="file"
            accept=".csv"
            onChange={handleFile}
            display="none"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button as="span" colorScheme="teal" size="sm" mt={2}>
              Choose File
            </Button>
          </label>
        </Box>
      );

}

export default InscrireCSV;