import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; //se inyecta el token de cualquier llamada
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;