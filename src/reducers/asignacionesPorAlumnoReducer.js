import { SET_ASIGNACIONES_POR_ALUMNO } from '../actions/types';
const initialState = {asignaciones: [], fetched: false};

export default function asignacionesPorAlumnoReducer(state = initialState, action) {
    const { type, payload} = action;
    console.log(action);
    console.log(payload);
    switch(type){
        case SET_ASIGNACIONES_POR_ALUMNO:
            console.log(JSON.stringify(payload));
            return {
                ...state, //va a mostrar el estado que ya trae
                fetched: payload.fetched, // propiedad fetched 
                asignaciones: payload.asignaciones // va a traer la información que trae del payload
            }
        default: //si no se obtiene ese valor se obtiene el estado actual que se tiene
            return state; 
    }
}
