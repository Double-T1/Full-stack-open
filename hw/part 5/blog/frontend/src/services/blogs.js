import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const addOne = async newObj => {
  const config = {
    headers : {"Authorization": token}
  }
  const res = await axios.post(baseUrl,newObj,config)
  return res.data
}
 
export default { getAll, addOne ,setToken }