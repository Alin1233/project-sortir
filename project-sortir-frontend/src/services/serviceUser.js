import axios from 'axios'

const baseUrl = 'http://localhost:8000'
const connecterUser = async (mail, motdepasse) => {
    const url = baseUrl+'/connecter'
    try {
        const response = await axios.post(url, {mail, motdepasse})
        return response.data.participant
    } catch (error) {
        console.error(error);
    }
}

const cookieConnection =async (id)=>{
    const url = baseUrl+'/connecter/cookie'
    try {
        const response = await axios.post(url, {id})
        return response.data.participant
    } catch (error) {
        console.error(error);
    }
}
export default {connecterUser, cookieConnection}