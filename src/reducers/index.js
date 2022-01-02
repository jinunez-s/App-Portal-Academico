import { combineReducers } from 'redux';
import asignacionesPorAlumnoReducer from './asignacionesPorAlumnoReducer';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer,
    asginaciones: asignacionesPorAlumnoReducer
});