import React, { useEffect, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import moment from 'moment';
import axios from 'axios';
import { ASIGNACIONES_ENDPOINT } from '../../utils/endPoints';

export default function AsignacionAlumno({asignacionData, registro, user }) {

    const [clases, setClases] =useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);//Controlar que se muestre o no el formulario
    const handleShow = () => setShow(true); //

    useEffect(() => {
        axios.get(`${ASIGNACIONES_ENDPOINT}`).then(({data}) => {
            console.log(data);
            setClases(data);
        })
    },[]);

    const eliminarAsignacion = (uuid) => {
        try {
            Swal.fire({
                title: '¿Está seguro de eliminar el registro?',
                text: `${asignacionData.clase.descripcion},`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, quiero eliminarlo!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`${ASIGNACIONES_ENDPOINT}/${uuid}`).then(({ data }) => {
                        Swal.fire({
                            Title: 'Eliminado!',
                            text: `${data.Mensaje}`,
                            icon: 'success'
                        }).then(result => {
                            if (result.isConfirmed) {
                                window.location.assign('/asignaciones-alumno');
                            }
                        });
                    }).catch(error => {
                        console.log(error);
                    });
                }
            });
        } catch (error) {
            Swal.fire('Eliminar asignación', `Error: ${error.response.data}`, 'error');
        }
    }

    const [contador, setContador] = useState(registro + 1);

    return (
        <>
            <tr>
                <td>{contador}</td>
                <td>{asignacionData.clase.descripcion}</td>
                <td>{moment(asignacionData.clase.horario.horarioInicio, 'HH:mm:ss').format('HH-mm')} : {moment(asignacionData.clase.horario.horarioFinal, 'HH:mm:ss').format('HH-mm')}</td>
                <td>{asignacionData.clase.salon.nombreSalon}</td>
                <td>{asignacionData.clase.instructor.apellidos} {asignacionData.clase.instructor.nombres}</td>
                <td><Button onClick={handleShow} variant="primary" size="sm" className="mr-2">Editar</Button></td>
                <td><Button onClick={() => eliminarAsignacion(asignacionData.asignacionId)} variant="danger" size="sm" className="mr-2">Eliminar</Button></td>
            </tr>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Asignación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group control='carne'>
                            <Form.Label>Carné</Form.Label>
                            <Form.Control type='text'
                                value={user.carne}
                                placeholder='Número de carné'
                            />
                        </Form.Group>
                        <Form.Group control='apellidos'>
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control type='text'
                                value={user.apellidos}
                                placeholder='Apellidos del alumno'
                            />
                        </Form.Group>
                        <Form.Group control='nombres'>
                            <Form.Label>Nombres</Form.Label>
                            <Form.Control type='text'
                                value={user.nombres}
                                placeholder='Nombres del alumno'
                            />
                        </Form.Group>
                        <Form.Group control='descripcion'>
                            <Form.Label>Clases</Form.Label>
                            <Form.Control type='select'                                 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant="secondary">Cerrar</Button>
                    <Button variant="primary">Guardar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
