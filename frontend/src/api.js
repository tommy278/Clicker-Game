import axios from 'axios';

const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL || "https://clicker-game-1.onrender.com",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config
})

export default api;