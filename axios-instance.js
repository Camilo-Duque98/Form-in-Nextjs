import axios from 'axios'


const baseURL = 'http://localhost:3001/'

const instance = axios.create({
    baseURL,
    headers: {'Content-type':'application/json'}
})

export default instance