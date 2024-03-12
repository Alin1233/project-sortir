import { useState } from "react"
import { Center, Box, FormControl, FormLabel, Input, Button, Grid, VStack } from "@chakra-ui/react"
const CreerSortie = () => {

    const[nom, setNom] = useState(null)
    const[dateDebut, setDateDebut] = useState(null)
    const[dateLimit, setDateLimit] = useState(null)
    const[nbPlaces, setNbPlaces] = useState(null)
    const[duree, setDuree] = useState(null)
    const[description, setDescription] = useState(null)
    const [campus, setCampus] = useState(null)
    const [ville, setVille] = useState(null)
    const [lieu, setLieu] = useState(null)
    const [rue, setRue] = useState(null)
    const [codePostal, setCodePostal] = useState(null)
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)

    const handleSubmit = () =>{
        console.log("ola");
    }
    

    return (
        <Center as="div" h="100vh" mt="-100px">
            <Box as="form" onSubmit={handleSubmit} w="50%" p="5" bg="white" boxShadow="md">
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <VStack align="stretch">
                        <FormControl id="nom">
                            <FormLabel>Nom:</FormLabel>
                            <Input type='text' name='nom' value={nom} onChange={(e) => setNom(e.target.value)} size="md" />
                        </FormControl>
                        <FormControl id="dateDebut">
                            <FormLabel>Date Debut:</FormLabel>
                            <Input type='date' name='dateDebut' value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} size="md" />
                        </FormControl>
                        <FormControl id="dateLimit">
                            <FormLabel>Date Limit:</FormLabel>
                            <Input type='date' name='dateLimit' value={dateLimit} onChange={(e) => setDateLimit(e.target.value)} size="md" />
                        </FormControl>
                            <FormControl id="nbPlaces">
                            <FormLabel>Nombre de Places:</FormLabel>
                            <Input type='number' name='nbPlaces' value={nbPlaces} onChange={(e) => setNbPlaces(e.target.value)} size="md" />
                        </FormControl>
                        <FormControl id="duree">
                            <FormLabel>Durée:</FormLabel>
                            <Input type='text' name='duree' value={duree} onChange={(e) => setDuree(e.target.value)} size="md" />
                        </FormControl>
                            <FormControl id="description">
                            <FormLabel>Description:</FormLabel>
                            <Input type='text' name='description' value={description} onChange={(e) => setDescription(e.target.value)} size="md" />
                        </FormControl>
                        <FormControl id="campus">
                            <FormLabel>Campus:</FormLabel>
                            <Input type='text' name='campus' value={campus} onChange={(e) => setCampus(e.target.value)} size="md" />
                        </FormControl>
                    </VStack>
                    <VStack align="stretch">
                        <FormControl id="ville">
                            <FormLabel>Ville:</FormLabel>
                            <Input type='text' name='ville' value={ville} onChange={(e) => setVille(e.target.value)} size="md" />
                        </FormControl>
                            <FormControl id="lieu">
                            <FormLabel>Lieu:</FormLabel>
                            <Input type='text' name='lieu' value={lieu} onChange={(e) => setLieu(e.target.value)} size="md" />
                        </FormControl>
                            <FormControl id="rue">
                            <FormLabel>Rue:</FormLabel>
                            <Input type='text' name='rue' value={rue} onChange={(e) => setRue(e.target.value)} size="md" />
                        </FormControl>
                            <FormControl id="codePostal">
                            <FormLabel>Code Postal:</FormLabel>
                            <Input type='text' name='codePostal' value={codePostal} onChange={(e) => setCodePostal(e.target.value)} size="md" />
                        </FormControl>
                            <FormControl id="latitude">
                            <FormLabel>Latitude:</FormLabel>
                            <Input type='text' name='latitude' value={latitude} onChange={(e) => setLatitude(e.target.value)} size="md" />
                        </FormControl>
                            <FormControl id="longitude">
                            <FormLabel>Longitude:</FormLabel>
                            <Input type='text' name='longitude' value={longitude} onChange={(e) => setLongitude(e.target.value)} size="md" />
                        </FormControl>
                    </VStack>
                </Grid>
                <Button type="submit">Create</Button>
            </Box>
        </Center>
)

}

export default CreerSortie