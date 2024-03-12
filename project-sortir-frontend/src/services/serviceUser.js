import axios from 'axios'

const baseUrl = 'http://localhost:8000/api'
const connecterUser = async (identifiant, motdepasse) => {
    const url = baseUrl+'/'
    try {
        const response = await axios.post(url, identifiant, motdepasse)
        return response
    } catch (error) {
        console.log(error);
    }
}
export {connecterUser}