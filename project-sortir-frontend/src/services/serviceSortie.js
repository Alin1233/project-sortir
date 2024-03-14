import axios from 'axios'

const baseUrl = 'http://localhost:8000'
import serviceCampus from './serviceCampus'
const creerSortie = async (data) => {
    const url = baseUrl+'/creer'
    try {
        const response = await axios.post(url,data)
        return response
    } catch (error) {
        console.error(error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    }
}

const getAllSorties = async () => {
    const url = baseUrl+"/getall";
    try {
        //obtenir un tableau de sorties
        const response = await axios.get(url);
        const sorties = response.data.sorties;
        //modifier chaque sortie dans le tableau
        const updatedSorties = await Promise.all(sorties.map(async sortie => {

            const campusNom = await serviceCampus.getCampusNomParId(sortie.campus)
            sortie.campus = campusNom
            //obtenir l'etat libbele et mofifier l'etat propriety dans la sortie
            const responseEtatLibbele = await axios.get(baseUrl + sortie.etat);
            sortie.etat = responseEtatLibbele.data.libelle;
            //obtenir le nom de l'organisateur et modifier la propriété de l'organisateur dans la sortie
            const responseOrganisateurNom = await axios.get(baseUrl+sortie.organisateur)
            sortie.organisateur = responseOrganisateurNom.data.nom
            //chaque sortie a un tableau de participants, modifiez-le pour obtenir un tableau des id des participants
            const updatedParticipants = await Promise.all(sortie.participants.map(async participant =>{
                //obtenir l'identifiant du participant
                const responseIdParticipant = await axios.get(baseUrl+participant)
                //la valeur du participant dans le tableau sortie.participants devient l'id
                participant = responseIdParticipant.data.id
                return participant
            }))
            sortie.participants = updatedParticipants
            return sortie;
        }));
    return updatedSorties;
    } catch (error) {
        console.error(error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    }
}
const addParticipant = async (data) => {
    const url = baseUrl+'/participate'
    try {
        const response = await axios.post(url, data)
        return response
    } catch (error) {
        console.error(error);
    }
}
export default {creerSortie, getAllSorties, addParticipant}