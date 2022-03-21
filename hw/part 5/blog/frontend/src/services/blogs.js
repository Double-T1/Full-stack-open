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
  console.log("start sending to backend")

  try {
    const res = await axios.put(`${baseUrl}/${id}`,{likes: newLikes},config) 
    return res.data
  } catch (e) {
    console.log(e)
  }
}

const clearAll = async () => {
  await axios.delete(baseUrl)
  return 
}
 
export default { getAll, addOne ,setToken , clearAll, updateLikes}