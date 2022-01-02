import axios from "axios";
import { SET_ASIGNACIONES_POR_ALUMNO } from "./types";
import { ALUMNO_ENDPOINT } from "../utils/endPoints";

export const getAsignacionesPorAlumno = (carne) => dispatch => {
    return new Promise((resolve, reject) =>{
        axios.get(`${ALUMNO_ENDPOINT}/${carne}/asignaciones`).then(response =>{
            dispatch({
                type: SET_ASIGNACIONES_POR_ALUMNO, //nombre del redux
                payload: {fetched: true, asignaciones: response.data} //fetched: se fue a traer la data a la base de datos
            });
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    }); //Nueva promesa que tiene 2 resultados, resolve & reject cuando no se pueda resolver esa promesa. 
}
//