import axios from 'axios';

const axiosBase = axios.create({
    baseURL: 'https://evangadi-forum-backend-4szj.onrender.com/api',
})

export default axiosBase;
