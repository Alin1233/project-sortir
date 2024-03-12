import axios from 'axios'

const baseUrl = 'http://localhost:8000'
const creerSortie = async (data) => {
    const url = baseUrl+'/creer'
    try {
        const response = await axios.post(url,data)
        return response
    } catch (error) {
        console.error(error);
    }
}
export default {creerSortie}