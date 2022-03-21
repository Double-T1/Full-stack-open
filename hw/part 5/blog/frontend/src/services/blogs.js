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

const updateLikes = async ({id,newLikes}) => {
  const config = {
    headers : {"Authorization": token}
  }
  const res = await axios.put(`${baseUrl}/${id}`,{likes: newLikes},config) 
  return res.data
}

const removeOne = async ({id}) => {
  const config = {
    headers : {"Authorization": token}
  }
  await axios.delete(`${baseUrl}/${id}`,config)
  return 
}

const clearAll = async () => {
  await axios.delete(baseUrl)
  return 
}
 
export default { getAll, addOne ,setToken , clearAll, removeOne, updateLikes}