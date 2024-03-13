import axios from 'axios'

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

        
        const response = await axios.get(url);
        const sorties = response.data.sorties;
        
        const updatedSorties = await Promise.all(sorties.map(async sortie => {
            
            const responseEtatLibbele = await axios.get(baseUrl + sortie.etat);
            sortie.etat = responseEtatLibbele.data.libelle;

            const responseOrganisateurNom = await axios.get(baseUrl+sortie.organisateur)
            sortie.organisateur = responseOrganisateurNom.data.nom
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
export default {creerSortie, getAllSorties}