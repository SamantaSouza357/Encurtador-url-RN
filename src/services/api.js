import axios from 'axios';

export const key = 'edd55755400e4b8a2562d359c03c9e0a5fbc8c41';

//base url : https://api-ssl.bitly.com/v4/shorten


const api = axios.create({
    baseURL: 'https://api-ssl.bitly.com/v4',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
    }
})

export default api;