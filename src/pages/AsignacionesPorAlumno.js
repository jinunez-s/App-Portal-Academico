import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { getAsignacionesPorAlumno } from '../actions/alumnoActions';
import AsignacionAlumno from '../components/asignaciones/AsignacionAlumno';
import { ALUMNO_ENDPOINT } from '../utils/endPoints';

export default function AsignacionesPorAlumno() {

    const user = useSelector(state => state.auth.user);    
    const [fetching, setFetching] = useState(true);
    const [fila, setFila] = useState(0);
    const asignaciones = useSelector(state => state.asignaciones.asignaciones);//error
    const fetched = useSelector(state => state.asignaciones.fetched);
    const dispatch = useDispatch();


    useEffect(() => {
        async function fetchedAsignaciones(){
            if(!fetched){
                try{
                    setFetching(true);
                    await dispatch(getAsignacionesPorAlumno(user.carne));
                    setFetching(false);
                }catch(error){
                    console.log(error);
                }
            }
        }
        fetchedAsignaciones();
    }, [dispatch, fetched]);

    return (
        <div>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Descripción</th>
                        <th>Horario</th>
                        <th>Salon</th>
                        <th>Instructor</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        asignaciones && asignaciones.map((asignacion, index) => <AsignacionAlumno key={asignacion.asignacionId} asignacionData={asignacion} registro={index} user={user} ></AsignacionAlumno>)
                    }
                </tbody>
            </Table>
        </div>
    )
}
