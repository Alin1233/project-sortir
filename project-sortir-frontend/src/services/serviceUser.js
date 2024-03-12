import axios from 'axios'

const baseUrl = 'http://localhost:8000'
const connecterUser = async (identifiant, motdepasse) => {
    const url = baseUrl+'/connecter'
    try {
        const response = await axios.post(url, {identifiant, motdepasse})
        return response.data
    } catch (error) {
        console.error(error);
    }
}
export default {connecterUser}