import axios from 'axios';  

export const auth_instance = axios.create({
    baseURL: 'http://localhost:6969/auth/',
});

export const user_instance = axios.create({
    baseURL: 'http://localhost:6969/api/',
})