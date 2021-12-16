import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import AsignacionAlumno from '../components/asignaciones/AsignacionAlumno';
import { ALUMNO_ENDPOINT } from '../utils/endPoints';

export default function AsignacionesPorAlumno() {

    const user = useSelector(state => state.auth.user);
    const [asignaciones, setAsignaciones] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [fila, setFila] = useState(0);

    useEffect(() => {
        axios.get(`${ALUMNO_ENDPOINT}/${user.carne}/asignaciones`).then(response => {
            setAsignaciones(response.data);
            setFetching(false);//Esto es para indicar que ya se hizo la petición
        }).catch(e => {
            setFetching(false);//Capturando algún error
        });
    }, []);

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
