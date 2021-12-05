import React from 'react';
import {Card, Badge, Button} from 'react-bootstrap';
import {Link, NavLink, useHistory} from 'react-router-dom';
//Crear un componente para mostrar las clases de kinal
//Clase de components
export default function Clase({claseData}) {

    const history = useHistory();
    //Metodo Asignacion
    const asignarClase = (uuid) => {
        history.push(`/asignacion-clase/${uuid}`);
    }

    return (
        <Card className = "mb-4">
            <Card.Header className="d-flex justify-content-between">
                <div>
                    <Badge variant="secondary" className="mr-2">Instructor: {claseData.instructor.apellidos} {claseData.instructor.nombres} </Badge>
                </div>
                <div>
                    <Button onClick={() => asignarClase(claseData.claseId)} variant="primary" size="sm" className="mr-2">Asignar</Button>
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Title>
                    <Link to={`/asignacion-clase/${claseData.claseId}`}>Clase: {claseData.descripcion}</Link>
                </Card.Title>
                <Card.Text>
                    Ciclo: {claseData.ciclo}
                </Card.Text>
                <Card.Text>
                    Horario: {claseData.horario.horarioInicio} {claseData.horario.horarioFinal}
                </Card.Text>
                <Card.Text>
                    Cupo: Maximo: {claseData.cupoMaximo} Minimo: {claseData.cupoMinimo}
                </Card.Text>
                <Card.Text>
                    Ubicación: Salon {claseData.salon.nombreSalon} - {claseData.salon.descripcion}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
