import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function RegisterForm({ errores, onSumbitCallback }) {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        onSumbitCallback({username, password, firstName, lastName, email, phone, address});
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

            <Form.Group control='firstName'>
                <Form.Label>Nombres</Form.Label>
                <Form.Control type='text' value={firstName} onChange = {e => setFirstName(e.target.value)} placeholder='Nombres' isInvalid={errores.firstName}>                    
                </Form.Control>            
            <Form.Control.Feedback type='invalid'>
                {errores.firstName}
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group control='lastName'>
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type='text' value={lastName} onChange = {e => setLastName(e.target.value)} placeholder='Apellidos' isInvalid={errores.lastName}>                    
                </Form.Control>            
            <Form.Control.Feedback type='invalid'>
                {errores.lastName}
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

            <Form.Group control='phone'>
                <Form.Label>Telefono</Form.Label>
                <Form.Control type='tel' value={phone} onChange = {e => setPhone(e.target.value)} placeholder='phone' isInvalid={errores.phone}>                    
                </Form.Control>            
            <Form.Control.Feedback type='invalid'>
                {errores.phone}
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group control='address'>
                <Form.Label>Direccion</Form.Label>
                <Form.Control type='textarea' value={address} onChange = {e => setAddress(e.target.value)} placeholder='Direccion' isInvalid={errores.address}>                    
                </Form.Control>            
            <Form.Control.Feedback type='invalid'>
                {errores.address}
            </Form.Control.Feedback>

            </Form.Group>
            <Button variant='primary' type='submit'>
                Registrar
            </Button>
        </Form>
    )
}