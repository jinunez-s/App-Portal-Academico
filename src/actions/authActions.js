import axios from 'axios';
import { LOGIN_ENDPOINT, APP_USERNAME, APP_PASSWORD } from '../utils/endPoints';
import qs from 'querystring';
import setAuthToken from '../utils/setAuthToken';
import { SET_CURRENT_USER } from './types';

export const logInUser = (userData) => dispatch => {
    const token = Buffer.from(`${APP_USERNAME}:${APP_PASSWORD}`, 'utf8').toString('base64');
    const config = {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${token}`
        }
    }
    userData = { ...userData, grant_type: 'password' }
    return new Promise((resolve, reject) => {
        axios.post(LOGIN_ENDPOINT, qs.stringify(userData), config).then(response => {
            const { access_token } = response.data;
            localStorage.setItem('token', access_token);
            setAuthToken(access_token);
            //Convierte el valor a tipo JSON para luego guardarlo en la variable Payload
            const payload = JSON.parse(atob(access_token.split('.')[1]));//posicion 1 que es donde esta la información del usuario del token, el token se divide en tres codigos el segundo [1] lugar 1 en un arreglo es donde se encuentra la información de interes del usuario
            dispatch(setCurrentUser({ user: payload, loggedIn: true }));
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const setCurrentUser = ({ user, loggedIn }) => {
    return {
        type: SET_CURRENT_USER,
        payload: { user, loggedIn }
    };
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('token');
    setAuthToken(false);
    dispatch(setCurrentUser({ user: {}, loggedIn: false }));
}