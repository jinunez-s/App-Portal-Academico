import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Navigation from './layouts/Navigation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CarrerasTecnias from './pages/CarrerasTecnicas';
import Login from './pages/Login';

import { Provider } from 'react-redux';
import store from './store';
import checkForToken from './utils/checkForToken';
import PrivateRoute from './utils/PrivateRoute'; //Se creo el PrivateRoute para hacer la ruta privada y que solo acceda aquel que ya inicio sesion exitosamente
checkForToken();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navigation></Navigation>
        </div>
        <Container>
          <Switch>
            <PrivateRoute exact path="/" component={CarrerasTecnias}></PrivateRoute>
            <Route exact path="/carreras-tecnicas" component={CarrerasTecnias}></Route>
            <Route exact path="/login" component={Login}></Route>
          </Switch>
        </Container>
      </Router>
    </Provider>

  )
}

export default App;
//Hacer un formulario