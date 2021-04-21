import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { withRouter } from 'react-router-dom'
import Tareas from './Tareas'

const Admin = (props) => {

  const [user, setUser] = useState(null)

  // let userSaved

  useEffect(() => {

    if (auth().currentUser) {
     let userSaved = auth().currentUser
      setUser(userSaved)
      console.log('usuario existente: ', auth().currentUser)
      console.log('Dentro del state: ', user)
    } else {
      console.log('no usuario')
      console.log(auth().currentUser)
      console.log('dentro de else user: ', user)
      props.history.push('/login')
    }
    
  },[props.history, user])

  return (
    <div className="container text-center mt-4">
      <h2>Welcome</h2>
      {
        // Si usuario no es null ?
        user && (
          <div className="text-center">
            <h3>{user.email}</h3>
            <hr/>
            <Tareas user ={user}/>

          </div>
        )
      }
    </div>
  )
}

export default withRouter(Admin)
