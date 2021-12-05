import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';


//no se valida la informacion del usuario que va creando

export default function AsignacionClaseForm({ parametroDescripcion, errores, onSubmitCallback}) { //Dos props (errores y onSubmitCallback)
    const user = useSelector(state => state.auth.user);
    const [carne, setCarne] = useState(user.carne);
    const [apellidos, setApellidos] = useState(user.apellidos);
    const [nombres, setNombres] = useState(user.nombres);
    const [descripcion, setDescripcion] = useState(parametroDescripcion);

    const registrarAsginacion = (e) => {
        e.preventDefault();
        onSubmitCallback();
    }

    return (
        <Form onSubmit={registrarAsginacion}>
            <Form.Group control='carne'>
                <Form.Label>Carné</Form.Label>
                <Form.Control type='text' value={carne} onChange={e => setCarne(e.target.value)} placeholder='Número de carné' isInvalid={errores.carne} />
                <Form.Control.Feedback type='isvalid'>
                    {errores.carne}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group control='apellidos'>
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type='text' value={apellidos} onChange={e => setApellidos(e.target.value)} placeholder='Apellidos del alumno' isInvalid={errores.apellidos} />
                <Form.Control.Feedback type='isvalid'>
                    {errores.apellidos}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group control='nombres'>
                <Form.Label>Nombres</Form.Label>
                <Form.Control type='text' value={nombres} onChange={e => setNombres(e.target.value)} placeholder='Nombres del alumno' isInvalid={errores.nombres} />
                <Form.Control.Feedback type='isvalid'>
                    {errores.nombres}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group control='descripcion'>
                <Form.Label>Descripcion</Form.Label>
                <Form.Control type='text' value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder='Descripcion' isInvalid={errores.descripcion} />
                <Form.Control.Feedback type='isvalid'>
                    {errores.descripcion}
                </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">Generar registro</Button>

        </Form>
    )
}
