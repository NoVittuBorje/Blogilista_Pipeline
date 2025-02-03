import axios from 'axios'

function getCurrentURL () {
  return window.location.href
}

// Example
const url = getCurrentURL()
const baseUrl = url+'api/login'
const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }