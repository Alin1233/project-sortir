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
        return error.response.status
    }
}


const getAllSortiesByFilter = async (filter, userId) => {
    const url = baseUrl+"/getallbyfilter";
    try {
        //obtenir un tableau de sorties
        const response = await axios.get(url, { params: { filter: JSON.stringify(filter),userId } });
        const sorties = response.data.sorties;
        return sorties
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
        return response.status
    } catch (error) {
        console.error(error);
    }
}
const seDesister = async (sortieId,userId) =>{
    const url = baseUrl+"/sedesister"
    try {
        const response = await axios.delete(url+`/${sortieId}/${userId}`)
        return response
    } catch (error) {
        console.error(error);
        return error.status
    }
}
const publierSortie = async (sortieId) => {
    const url = baseUrl+"/publier"
    try {
        const response = await axios.put(url+`/${sortieId}`)
        return response
    } catch (error) {
        console.error(error);
        return error.status
    }
}


const annulerSortie = async(data) =>{
    const id = data.sortieId
    const url = baseUrl+'/annuler/'+ id;
    try {
        const response = await axios.post(url, data)
        return response
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
    const url = `http://localhost:8000/supprimersortie/`+ id;
    try {
        const response = await axios.post(url,id)
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
export default {creerSortie, addParticipant, getSortie, annulerSortie, getDetailsSortie, supprimerSortie, modifierSortie, seDesister, publierSortie, getAllSortiesByFilter}

