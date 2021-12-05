import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Jumbotron } from 'react-bootstrap';
import Carreras from '../components/carrerastec/Carreras';
import { CARRERAS_ENDPOINT } from '../utils/endPoints';

//Carreras de Pages
export default function CarrerasTecnias(){
    const [listaCarreras, setListaCarreras] = useState([]);//Objeto 
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        axios.get(CARRERAS_ENDPOINT).then(response => {
            console.log(response.data);
            setListaCarreras(response.data);
            setFetching(false); //Para evitar varias peticiones
        }).catch(e => {
            setFetching(false);
        })
    }, []);


    return (
        <div>
            <Jumbotron>
                <h1>Carreras técnicas disponibles</h1>
            </Jumbotron>
            <div>
                {listaCarreras.map(carreras => <Carreras key={carreras.codigoCarrera} carreraData={carreras}></Carreras>)}
            </div>
        </div>
    )
}