import axios from 'axios';

const api = axios.create({
    baseURL: 'https://yugidjango-django-production.up.railway.app/api/v2',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`
    }
    return config
})

export default api