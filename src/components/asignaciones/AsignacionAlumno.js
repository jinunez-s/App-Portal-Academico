import React, { useEffect, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import moment from 'moment';
import axios from 'axios';
import { ASIGNACIONES_ENDPOINT, CLASES_ENDPOINT } from '../../utils/endPoints';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getAsignacionesPorAlumno } from '../../actions/alumnoActions';

export default function AsignacionAlumno({asignacionData, registro, user }) {

    const [clases, setClases] =useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);//Controlar que se muestre o no el formulario
    const handleShow = () => setShow(true); //
    const [claseId, setClaseId] = useState(asignacionData.clase.claseId);
    const [asignacionAlumno, setAsignacionAlumno] = useState({fechaAsignacion:asignacionData.fechaAsignacion, alumno: {carne: asignacionData.alumno.carne}, clase: {claseId: asignacionData.clase.claseId}});

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${CLASES_ENDPOINT}`).then(({data}) => {
            setClases(data);
        }).catch(error => {
            if(error.status === 401){
                dispatch(logoutUser);
            }else{
                history.push('/');
            }
        });
    },[]);

    const actualizarAsignacion = async() => {
        try{
            asignacionAlumno.fechaAsignacion = moment(new Date()).format('YYYY-MM-DD');
            asignacionAlumno.clase.claseId = claseId;
            const response = await axios.put(`${ASIGNACIONES_ENDPOINT}/${asignacionData.asignacionId}`, AsignacionAlumno);
            await dispatch(getAsignacionesPorAlumno(user.carne));
            Swal.fire({
                title: 'Actualizado',
                text: `${response.data.Mensaje}`,
                icon: 'success'
            }).then(resultado => {
                if(resultado.isConfirmed){
                    setShow(false);
                }
            });
        }catch(error){
            if(error.status === 401){
                Swal.fire('Actualización asignación', `Error: ${error.message}`, 'error');
                setShow(false);
                dispatch(logoutUser());
            }else{
                Swal.fire('Actualización asignación', `Error: ${error.message}`, 'error');
                setShow(false);
            }
        }
    }
    const eliminarAsignacion = async (uuid) => {
        try {
            const resultado = await Swal.fire({
                title: '¿Está seguro de eliminar el registro?',
                text: `${asignacionData.clase.descripcion},`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, quiero eliminarlo!'
            });
            if(resultado.isConfirmed){
                const response = await axios.delete(`${ASIGNACIONES_ENDPOINT}/${uuid}`);
                await dispatch(getAsignacionesPorAlumno(user.carne))
            }
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
                            <Form.Control className='bg bg-light' 
                                plaintext readOnly defaultValue={user.carne}
                                //type='text'
                                //value={user.carne}
                                //placeholder='Número de carné'
                            />
                        </Form.Group>
                        <Form.Group control='apellidos'>
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control className='bg bg-light'
                                plaintext readOnly defaultValue={user.apellidos}
                            //type='text'
                            //value={user.apellidos}
                            //placeholder='Apellidos del alumno'
                            />
                        </Form.Group>
                        <Form.Group control='nombres'>
                            <Form.Label>Nombres</Form.Label>
                            <Form.Control className='bg bg-light'
                                plaintext readOnly defaultValue={user.nombres}
                            //type='text'
                            //value={user.nombres}
                            //placeholder='Nombres del alumno'
                            />
                        </Form.Group>
                        <Form.Group control='descripcion'>
                            <Form.Label>Clases</Form.Label>
                            <Form.Control as='select' value={claseId} onChange={e => {setClaseId(e.target.value)}}>
                            {
                                clases && clases.map((clase, index) => {
                                    return (
                                        <option key={clase.claseId} value={clase.claseId}>{clase.descripcion}</option>
                                    )
                                })
                            }
                            </Form.Control>                            
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleClose} variant="secondary">Cerrar</Button>
                    <Button variant="primary" onClick={actualizarAsignacion}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
