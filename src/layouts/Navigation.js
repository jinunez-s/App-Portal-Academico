import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/authActions';

export default function Navigation() {
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    //to=/clases es la ruta que debe coincidir con la ruta creada en App.js

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={NavLink} to={'/'}>
                Kalum
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="main-menu">
            </Navbar.Toggle>
            <Navbar.Collapse id="main-menu">
                <Nav className="mr-auto">
                    {loggedIn && <Nav.Link as={NavLink} to="/clases"> Clases </Nav.Link>}
                    {loggedIn && <Nav.Link as={NavLink} to="/carreras-tecnicas">Carreras Tecnicas</Nav.Link>}
                    {loggedIn && <Nav.Link as={NavLink} to="/asignaciones-alumno">Mis asignaciones</Nav.Link>}

                </Nav>
                <Nav>
                    {
                        !loggedIn ?
                            (<React.Fragment>
                                <Nav.Link as={NavLink} to="./login">
                                    Iniciar Sesión
                                </Nav.Link>
                            </React.Fragment>)
                            :
                            (<NavDropdown title={`${user.apellidos} ${user.nombres}`} id="menu-dropdown">
                                <NavDropdown.Item> Inscripción</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => dispatch(logoutUser())}>Log out</NavDropdown.Item>
                            </NavDropdown>)
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}