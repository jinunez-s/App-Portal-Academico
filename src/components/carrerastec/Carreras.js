import React from "react";
import {Card, Badge, Button} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';

//Crear un componente para mostrar las carreras tecnicas
//Carreras de Components
export default function Carreras({carreraData}){
    return (
        <Card className = "mb-4">
            <Card.Header className="d-flex justify-content-between">
                <div>
                    <Badge variant="secondary" className="mr-2"> Nombres: </Badge>
                </div>
                <div>
                    <Button variant="primary" size="sm" className="mr-2">Ver Pensum</Button>
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Title>
                    <Link>Carrera: {carreraData.nombre}</Link>
                </Card.Title>
                <Card.Text>
                    Codigo de carrera: {carreraData.codigoCarrera}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}