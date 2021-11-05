import React, {useState, useEffect} from 'react';
import { Card, Container, Row, Col} from 'react-bootstrap';
import RegisterForm from '../components/forms/RegisterForm';
import validator from 'validator';
import { isObjectEmpty } from '../utils/helpers';
import { useSelector } from 'react-redux';
import { useDispatch} from 'react-redux';
import { logInUser } from '../actions/authActions';
import { useHistory } from 'react-router-dom';
export default function CarrerasTecnias(){
    
    const [errores, setErrores] = useState({});
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const history = useHistory();
    useEffect(() => {
        if(loggedIn){
            history.push('/');
        }
    });

    const register = ({ username, password, firstName, lastName, email, phone, address}) => {
        const errores = {};
        setErrores(errores);
        if(validator.isEmpty(username)){
            errores.username = 'El nombre de usuario es invalido';
        }if(validator.isEmpty(password)){
            errores.password = 'Contraseña invalida';
        }if(validator.isEmpty(firstName)){
            errores.firstName = 'Nombre invalido';
        }if(validator.isEmpty(lastName)){
            errores.lastName = 'Apellido invalido';
        }if(validator.isEmpty(email)){
            errores.email = 'Email invalido';
        }if(validator.isEmpty(phone)){
            errores.phone = 'Telefono invalido';
        }if(validator.isEmpty(address)){
            errores.address = 'Dirección invalida';
        }if(!isObjectEmpty(errores)){
            setErrores(errores);
            return;
        }
        /**Comoooooooooooooo */
        console.log(username,password);
        dispatch(logInUser({ username, password })).then(response => {
            console.log(response.data.access_toke);
        }).catch(error => {
            console.log(error);
        })
        /**Comoooooooooooooo */
    }



    
    return (
        <div>
            <h3>Listado de carreras técnicas</h3>
            <hr></hr>
            <Container className='mt-5'>
                <Row>
                    <Col sm='12' md={{ span: 8, offset: 2}} lg={{ span: 6, offset:3}}>
                        <Card body>
                            <h3>Registrarse</h3>
                            <hr></hr>
                                <RegisterForm errores={errores} onSumbitCallback={register}></RegisterForm>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};