import axios from 'axios'

const baseUrl ='http://localhost:3001/persons'
const getAll = () => {
    return axios.get(baseUrl).then(res => res.data)
}

const insert = newObj => {
    return axios.post(baseUrl,newObj).then(res => res.data)
}

const nullify = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id,newObj) => {
    const req =  axios.put(`${baseUrl}/${id}`, newObj)
    return req.then(res => res.data)
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll,insert,nullify,update}