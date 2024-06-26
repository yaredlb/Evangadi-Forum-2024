import axios from 'axios';

const axiosBase = axios.create({
    baseURL: 'http://localhost:3307/api',
})

export default axiosBase;