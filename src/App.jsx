// import React, { useEffect, useState } from 'react'
// import { firebase } from './firebase'
// import { db, auth } from './firebase'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Admin from './components/Admin'
import Inicio from './components/Inicio'
import Tareas from './components/Tareas'



function App() {

  return (
    <Router>
    <div className="container mt-3">
        <div className="row my-4">
          <div className="col-md-12">
          <Navbar />
            <Switch>
              <Route path="/" exact>
                <Inicio />
              </Route> 
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/tareas">
                <Tareas />
              </Route>
              <Route path="/admin">
                <Admin />
              </Route>
            </Switch>
          </div>  
        </div>
    </div>
    </Router>
  );
}

export default App;
