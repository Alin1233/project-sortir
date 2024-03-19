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
        const sortie = response.data.sorties;

        return sortie;

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
export default {creerSortie, getAllSorties, addParticipant, getSortie}

