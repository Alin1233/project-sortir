import axios from "axios";

const baseUrl = 'http://localhost:8000'

const checkAdmin = async (id) => {
    const url = baseUrl+'/isAdmin/'+id;
    try {
        const response = await axios.post(url)
        return response.data
    } catch (error) {
        console.error(error);
    }
}
export default {checkAdmin}