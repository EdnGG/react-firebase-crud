import React, { useState, useCallback } from 'react'
import { auth, db } from '../firebase'

const Login = () => {

  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState(null)
  const [esRegistro, setEsRegistro] = useState(true)

  const procesarDatos = async (e) => {
    e.preventDefault()
    if (!usuario.trim()) {
      console.log('campo nombre vacio')
      setError('campo nombre vacio')
      return
    }
    if (!contrasena.trim()) {
      console.log('campo contrasena vacio')
      setError('campo contrasena vacio')
      return
    }
    if (contrasena.length < 6) {
      console.log('password debe ser mayor a 6 caracteres')
      setError('password debe ser mayor a 6 caracteres')
      return
    }

    setError(null)

    if (esRegistro) {
      registrar()
    }
  }

  const registrar = useCallback( async () => {
    try {
      const res = await auth().createUserWithEmailAndPassword(usuario, contrasena)
      console.log('Response: ', res.user)
    } catch (error) {
      console.log('Error creando usuario: ', error)
      if (error.code === 'auth/invalid-email') {
        setError('Email es no valido')
      }
      if (error.code === 'auth/email-already-in-use') {
        setError('Usuario ya existe')
      }
    }
  }, [usuario, contrasena])

  return (
    <div className="mt-5">
      <h3 className="text-center">
        {
          esRegistro ? 'User Register' : 'Access Login'
        }
      </h3>
      <hr />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          <form onSubmit={procesarDatos}>
            {
              error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )
            }
            <input
              type="text"
              placeholder="Email"
              className="form-control mb-2"
              onChange={ e => setUsuario(e.target.value)}
              value={usuario}
            />
            <input
              type="text"
              placeholder="Password"
              className="form-control mb-2"
              onChange={ e => setContrasena(e.target.value)}
              value={contrasena}
            />
            <button
              className="btn btn-dark btn-block "
              type="submit"
            >
             {
              esRegistro ? 'Register' : 'Login'
            }
            </button>
            <button
              className="btn btn-info btn-block btn-sm"
              onClick={() => setEsRegistro(!esRegistro)}
              type="button"
            >
              {
                esRegistro ? 'Already have an account?': 'Need an account?'
              }
              
            </button>

          </form>
        </div>
      </div>
      
    </div>
  )
}

export default Login
