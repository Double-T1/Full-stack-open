import axios from 'axios' //ES6 module
const baseUrl = "/api/login"

const login = async credentials => {
    const res = await axios.post(baseUrl,credentials)
    return res.data
}

export default {login}