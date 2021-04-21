import React, { useEffect, useState } from 'react'
import { auth } from './firebase'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Admin from './components/Admin'
import Inicio from './components/Inicio'
import Tareas from './components/Tareas'



function App() {

  const [firebaseUser, setFirebaseUser] = useState(false)
  
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      console.log(user)
      if (user) {
        setFirebaseUser(user)
      } else {
        setFirebaseUser(null)
      }
    })
    
  },[])


  return firebaseUser !== false ? (
    <Router>
    <div className="container mt-3 text-center">
        <div className="row my-4">
          <div className="col-md-12">
          <Navbar firebaseUser={firebaseUser} />
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
  ) :
  (
  // <div className="text-center spinner-border" style={{width: "3rem;", height: "3rem;"}} role="status">
  //   <span class="sr-only">Loading...</span>
  // </div>
      <div class="container spinner-border text-success text-center" role="status">
  <span class="sr-only">Loading...</span>
</div>
  )
}

export default App;
