import {Box, Button, Center, Heading, Image, Text, VStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import serviceAutreProfil from "../services/serviceAutreProfil.js";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../components/Loading.jsx";
import BackButton from "../components/BackButton.jsx";

const AutreProfilUtilisateur =()=>{

    let { userId } = useParams();
    const[prenom,setPrenom]=useState('');
    const[nom,setNom]=useState('');
    const[telephone,setTelephone]=useState('');
    const[email,setEmail]=useState('');
    const[campus,setCampus]=useState('');
    const[pseudo, setPseudo]=useState('');
    const[image, setImage] = useState('');

    useEffect(()=> {
        const responseId = async ()=>{
            //récupération de toutes les infos via adresse api de l'utilisateur via l'id que l'on récupere dans l'url
            const response = await serviceAutreProfil.getAutreProfil(userId);
            setPseudo(response.pseudo);
            setTelephone(response.telephone);
            setNom(response.nom);
            setPrenom(response.prenom);
            setEmail(response.email);
            setCampus(response.campusNom);
            setImage(response.image)
        }
        responseId();
        []});

    function useDocumentTitle(title) {
        useEffect(() => {
            document.title = title;
        }, [title]);
    }
    useDocumentTitle('Golaf! | Profil de '+pseudo);

    if (userId===undefined) {
        return(
            <div>
                <Loading/>
            </div>
        );
    }

    return (
        <Box>
            <Center mt="100px" p={5}>
                <Heading textDecoration="underline">{pseudo}</Heading>
            </Center>
            <Center>
                <Box boxSize='sm'>
                    <VStack align="stretch" >
                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <Image src={`http://localhost:8000/getimage/${image}`} alt='Hummm' borderRadius="full" />
                    </VStack>
                </Box>
                <Box  w="30%" p="5" bg="white" boxShadow="md" borderRadius="full" backgroundColor="#FFFAFA">
                    <Center>
                        <VStack align="stretch">

                            <Text>Prénom : {prenom}</Text>
                            <Text>Nom : {nom}</Text>
                            <Text>Téléphone : {telephone}</Text>
                            <Text>Email : {email}</Text>
                            <Text>Campus : {campus}</Text>
                        </VStack>
                    </Center>
                </Box>
            </Center>
            <Center>
               <BackButton />
            </Center>

        </Box>
)}

export default AutreProfilUtilisateur