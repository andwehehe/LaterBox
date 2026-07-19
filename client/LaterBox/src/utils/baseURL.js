import axios from 'axios';

const base = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

export default base;