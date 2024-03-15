import axios from 'axios'

const baseUrl = 'http://localhost:8000'

const getCampusNomParId = async (id) =>{
    const url = baseUrl+id
    const response = await axios.get(url)
    return response.data.nom
}

const getAllCampusNoms = async () => {
    const url = baseUrl+"/api/campuses"
    const response = await axios.get(url)
    const data = response.data
    const campuses = data['hydra:member'].map(campus => ({
        id: campus.id,
        nom: campus.nom
    }));
    return campuses;
    
}
export default {getCampusNomParId, getAllCampusNoms}