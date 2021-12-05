import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import validator from 'validator';
import RegisterForm from '../components/forms/RegisterForm';
import { isObjectEmpty, isNumber } from '../utils/helpers';
import { logInUser, accountCreated } from '../actions/authActions';


export default function RegisterUser() {
    const [errores, setErrores] = useState({})
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const history = useHistory();
    useEffect(() => {
        if (loggedIn) {
            history.push('/carreras-tecnicas');
        }
    });
    const registerUser = ({ nombres, apellidos, direccion, telefono, username, password, email }) => {
        const errores = {};
        setErrores(errores);
        if(validator.isEmpty(username)) {
            errores.username = 'El campo de apellidos no debe estar vacio';
        }
        if(validator.isEmpty(password)) {
            errores.password = 'El campo de password no debe estar vacio';
        }
        if(validator.isEmpty(nombres)) {
            errores.nombres = 'El campo de nombres no debe estar vacio';
        }
        if(validator.isEmpty(apellidos)) {
            errores.apellidos = 'El campo de apellidos no debe estar vacio';
        }
        if(validator.isEmpty(email)) {
            errores.email = 'El campo de email no es valido';
        }
        if(!isNumber(telefono)) {
            errores.telefono = 'El campo de telefono no es valido';
        }
        if(validator.isEmpty(direccion)) {
            errores.direccion = 'El campo de direccion no debe estar vacio';
        }
        if(!isObjectEmpty(errores)) {
            setErrores(errores)
            return;
        }
        dispatch(accountCreated({ username, password, nombres, apellidos, email, telefono, direccion })).then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Crear cuenta',
                text: `Bienvenido al sistema ${response.data.Usuario.apellidos} ${response.data.Usuario.nombres}`,
                footer: '<a href="#">Kalum v1.0.0</a>'
            }).then(result => {
                if (result.isConfirmed) {
                    dispatch(logInUser({ username, password }));
                }
            })
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Crear cuenta',
                text: `Error al crear la cuenta`,
                footer: '<a href="#">Kalum v1.0.0</a>'
            });
            setErrores({ error: 'Ocurrio un error al momento de generar la solicitud' });
        });
    }
    return (
        <Container>
            <Row>
                <Col sm="12" md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
                    <Card body>
                        <h3> Crear Cuenta</h3>
                        <hr></hr>
                        <RegisterForm errores={errores} onSubmitCallback={registerUser}>
                        </RegisterForm>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}