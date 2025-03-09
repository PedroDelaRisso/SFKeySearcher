import axios from 'axios';

const api = axios.create({
    baseURL: 'https://oauth.reddit.com'
});

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('accessToken');
    if (!config.url!.includes('access_token')) {
        config.headers!.Authorization = `bearer ${token}`;
    }
    return config;
});

export default api;