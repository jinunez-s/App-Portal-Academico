import setAuthToken from "./setAuthToken"
import store from '../store';
import { setCurrentUser } from "../actions/authActions";
import { logoutUser } from "../actions/authActions";

const checkForToken = () => {
    if (localStorage.getItem('token')) {
        setAuthToken(localStorage.getItem('token'));
        const payload = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
        store.dispatch(setCurrentUser({ user: payload, loggedIn: true }));
        const currentTime = Math.floor(Date.now() / 1000);
        if (payload.expires_in < currentTime) {//valida si el token ya expiro porque si si entonces lo manda a hacer login otra vez
            store.dispatch(logoutUser());
            window.location.href = '/login';
        }
    }
}

export default checkForToken;