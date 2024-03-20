import axios from "axios";
const baseUrl = 'http://localhost:8000/admin'


const addUser = async (data) => {
    const url = baseUrl+'/add-user'
    try{
        const response = await axios.post(url, data)
        return response
    }catch(error){
        console.error(error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            return error.response
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

const getAllVilles = async () => {
    try {
        const url = baseUrl+"/villes"
        const response = await axios.get(url)
        return response.data.villes
    } catch (error) {
        console.error(error);
    }
}

const addCity = async (data) => {
    const url = baseUrl+'/add-city'
    try{
        console.log(data)
        const response = await axios.post(url, data)
        return response
    }catch(error){
        console.error(error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            return error.response
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

const deleteCity = async (data) => {
    const url = baseUrl+'/delete-city'
    try{
        console.log(data)
        const response = await axios.post(url, data)
        return response
    }catch(error){
        console.error(error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            return error.response
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

export default {addCity, getAllVilles, deleteCity, addUser}