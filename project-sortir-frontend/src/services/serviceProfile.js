import axios from 'axios'

const baseUrl = 'http://localhost:8000'

const getCampus = async () => {
    const url =  baseUrl + '/api/campuses?page=1'
    try {
        const response= await axios.get(url)

        return response.data['hydra:member'].map(campus=>({
            id:campus.id,
            nom: campus.nom
        }))
    }catch (error) {
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
const modifierProfile = async (data) => {
    const url = baseUrl+'/profile/modifier'
    try {
        return await axios.post(url, data)
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

//const getUser = async ()
export default {modifierProfile, getCampus}