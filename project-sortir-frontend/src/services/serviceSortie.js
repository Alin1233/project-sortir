import axios from 'axios'
import serviceLieu from "./serviceLieu.js";
import serviceVille from "./serviceVille.js";
import serviceParticipantsSortie from "./serviceParticipantsSortie.js";

const baseUrl = 'http://localhost:8000'

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
        return sorties
    } catch (error) {
       console.error(error);
    }
}

const getSortie = async (id) => {
    const url = `http://localhost:8000/details/${id}`;
    try{
        const response = await axios.get(url);
        let sortie = response.data; // Assumant que la réponse directe est l'objet sortie


        // Mise à jour de la sortie selon l'URL utilisé

        const responseCampusNom = await axios.get(`${baseUrl}${sortie.campus}`);
        sortie.campus = responseCampusNom.data.nom;

        const responseEtatLibelle = await axios.get(`${baseUrl}${sortie.etat}`);
        sortie.etat = responseEtatLibelle.data.libelle;

        const responseOrganisateurNom = await axios.get(`${baseUrl}${sortie.organisateur}`);
        sortie.organisateur = responseOrganisateurNom.data.nom;

        const responseLieu = await axios.get(`${baseUrl}${sortie.lieu}`);
        sortie.lieu = responseLieu.data.nom;


        let allParticipantsId = [];

        for(let index = 0; index < sortie.participants.length; index++){
            let participant = sortie.participants[index];
            let dernierCaractere = participant[participant.length - 1];
            allParticipantsId.push(dernierCaractere);
        }



        const lieu = await serviceLieu.getLieuById(sortie.lieu)
        console.log(lieu)
        const ville = await serviceVille.getVilleById(lieu[0]?.id)
        const participants = await serviceParticipantsSortie.getParticipantsById(allParticipantsId, sortie.id);

        return {
            responseSortie: sortie,
            responseLieu: lieu,
            responseVille : ville,
            responseParticipants : participants
        };

    } catch(error){
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

const annulerSortie = async(data) =>{
    const id = data.sortieId
    const url = baseUrl+'/annuler/'+ id;
    try {
        return await axios.post(url, data)
    } catch (error) {
        console.error(error);
    }
}

const getDetailsSortie = async (id) =>{
    const url = `http://localhost:8000/getDetails/${id}`;
    try {
         const response= await axios.get(url)
        return response.data.details
    }  catch(error) {
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

const supprimerSortie = async(id) =>{
    const url = `http://localhost:8000/supprimer/${id}`;
    try {
        const response = await axios.post(url, id)
        return response
    }  catch(error) {
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

const modifierSortie = async(sortie)=>{
    const url = `http://localhost:8000/modifier/${sortie.id}`
    try {
        const response = await axios.post(url, sortie)
        console.log(response)
        return response
    }  catch(error) {
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
export default {creerSortie, getAllSorties, addParticipant, getSortie, annulerSortie, getDetailsSortie, supprimerSortie, modifierSortie}

