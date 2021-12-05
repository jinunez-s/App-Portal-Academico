import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function LoginForm({ errores, onSubmitCallback }) {

    const [username, setUsername] = useState('julionun');
    const [password, setPassword] = useState('Kalum.2021');

    const submitForm = (e) => {
        e.preventDefault();
        onSubmitCallback({ username, password });
    }

    return (
        <Form onSubmit={submitForm}>
            <Form.Group control='username'>
                <Form.Label>Username</Form.Label>
                <Form.Control type='text' value={username} onChange={e => setUsername(e.target.value)} placeholder='username' isInvalid={errores.username}>
                </Form.Control>
                <Form.Control.Feedback type='invalid'>
                    {errores.username}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group control='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='password' isInvalid={errores.password}>
                </Form.Control>
                <Form.Control.Feedback type='invalid'>
                    {errores.password}
                </Form.Control.Feedback>
            </Form.Group>
            <Button variant='primary' type='submit'>
                Iniciar Sesion
            </Button>

        </Form>
    )
}
