/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import serviceProfile from '../services/serviceProfile';
import { Box, FormControl, Input, Button, VStack } from '@chakra-ui/react';
import {AddIcon} from '@chakra-ui/icons'

const UploadImg = (props) => {
  const fileInput = useRef();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('Choisissez une photo de profil');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', props.user.id);

    const response = await serviceProfile.uploadImage(formData);
    console.log(response);
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl id="file" visibility="hidden">
        <Input type="file" ref={fileInput} onChange={handleFileChange} />
      </FormControl>
      <VStack spacing={3} align="center">
        <Button onClick={() => fileInput.current.click()} colorScheme="red">
          {fileName}<AddIcon/>
        </Button>
        <Button type="submit" colorScheme="blue">
          Télécharger
        </Button>
      </VStack>
    </Box>
  );
}

export default UploadImg;