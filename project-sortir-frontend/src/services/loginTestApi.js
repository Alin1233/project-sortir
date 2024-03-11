import axios from 'axios';
const baseUrl = 'http://localhost:8000/api/login'
 const testApi = async () =>{
    const user = {
        username: "user@example.com",
        password: "ola"
    }
    try {
        const response = await axios.post(baseUrl, user);
        console.log(response.data);
    } catch (error) {
        console.log(error)
    }
}

testApi()