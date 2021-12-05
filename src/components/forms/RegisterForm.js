import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function RegisterForm({ errores, onSubmitCallback }) {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        onSubmitCallback({username, password, nombres, apellidos, email, telefono, direccion});
    }

    return (
        <Form onSubmit = {submitForm}>            
            <Form.Group control='username'>
                <Form.Label>Username</Form.Label>
                <Form.Control type='text' value={username} onChange = {e => setUserName(e.target.value)} placeholder='username' isInvalid={errores.username}>
                </Form.Control>            
            <Form.Control.Feedback type='invalid'>
                {errores.username}
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group control='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' value={password} onChange = {e => setPassword(e.target.value)} placeholder='password' isInvalid={errores.password}>                    
                </Form.Control>            
            <Form.Control.Feedback type='invalid'>
                {errores.password}
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group control='nombres'>
                <Form.Label>Nombres</Form.Label>
                <Form.Control type='text' value={nombres} onChange = {e => setNombres(e.target.value)} placeholder='Nombres' isInvalid={errores.nombres}>                    
                </Form.Control>            
            <Form.Control.Feedback type='invalid'>
                {errores.nombres}
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group control='apellidos'>
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type='text' value={apellidos} onChange = {e => setApellidos(e.target.value)} placeholder='Apellidos' isInvalid={errores.apellidos}>                    
                </Form.Control>            
            <Form.Control.Feedback type='invalid'>
                {errores.apellidos}
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group control='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' value={email} onChange = {e => setEmail(e.target.value)} placeholder='email' isInvalid={errores.email}>                    
                </Form.Control>            
            <Form.Control.Feedback type='invalid'>
                {errores.email}
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group control='telefono'>
                <Form.Label>Telefono</Form.Label>
                <Form.Control type='tel' value={telefono} onChange = {e => setTelefono(e.target.value)} placeholder='telefono' isInvalid={errores.telefono}>                    
                </Form.Control>            
            <Form.Control.Feedback type='invalid'>
                {errores.telefono}
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group control='direccion'>
                <Form.Label>Direccion</Form.Label>
                <Form.Control type='textarea' value={direccion} onChange = {e => setDireccion(e.target.value)} placeholder='direccion' isInvalid={errores.direccion}>                    
                </Form.Control>            
            <Form.Control.Feedback type='invalid'>
                {errores.direccion}
            </Form.Control.Feedback>

            </Form.Group>
            <Button variant='primary' type='submit'>
                Registrar
            </Button>
        </Form>
    )
}