import React, { useEffect, useState } from 'react'
// import { firebase } from './firebase'
import { db } from '../firebase'

const Tareas = () => {

const [tareas, setTareas] = useState([])
  const [tarea, setTarea] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState('')
  
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // const db = firebase.firestore()
        const data = await db.collection('tareas').get()
        console.log('Data', data.docs)
        // needs to check
        const arrayData = await data.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        console.log(arrayData)
        setTareas(arrayData)
        // console.log('Tareas: ' , tareas)
      } catch (error) {
        console.log('Error', error)
      }
    }

    obtenerDatos()
    
  }, [])

  const agregar = async (e) => {
    e.preventDefault()

    if ( !tarea.trim() ) {
      console.log('Elemento vacio')
      return
    }
    
    try {
      // const db = firebase.firestore()
      const nuevaTarea = {
        nombre: tarea,
        // edad: tarea.edad,
        fecha: Date.now()
      }
      const data = await db.collection('tareas').add(nuevaTarea)
      
      setTareas([
        ...tareas,
        {...nuevaTarea, id: data.id}
      ])

      setTarea('')

    } catch (error) {
      console.log(error)
    }

    console.log(tarea)
  }

  const eliminar = async (id) => {
    try {
      // const db = firebase.firestore()
    
      // const elementoEliminado = await db.collection('tareas').doc(id).delete()
      await db.collection('tareas').doc(id).delete()

      // Este es para ver el nuevo arreglo en la UI, se filtra por el id que se recive directamente del evento onclick del boton eliminar
      const nuevoArray = tareas.filter(tarea => tarea.id !== id)
      setTareas(nuevoArray)      
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  const modoEditar = (item) => {
    setModoEdicion(true)
    setTarea(item.nombre)
    setId(item.id)
  }

  const editar = async (e) => {
     e.preventDefault()
      if (!tarea.trim()) {
        console.log('Empty')
        return
      }
    try {
      // No necesitamos guardar la respuesta
      // const db = firebase.firestore()
      await db.collection('tareas').doc(id).update({
        nombre: tarea
      })

      const arrayEditado = tareas.map(item => (
        item.id === id ? { id: item.id, fecha: item.fecha, nombre: tarea } : item
      ))

      setTareas(arrayEditado)
      setModoEdicion(false)
      setTarea('')
      setId('')

    } catch (error) {
      console.log('Error: ', error)
    }
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {
              tareas.map(tarea => (
                <li className="list-group-item" key={tarea.id}>
                  {tarea.nombre}
                  <button
                    className="btn btn-danger btn-sm float-right"
                    onClick={() => eliminar(tarea.id)}
                  >Delete</button>
                  <button
                    className="btn btn-warning btn-sm float-right mr-2"
                    onClick={() => modoEditar(tarea)}
                  >Edit</button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="col-md-6">
         <h3>{!modoEdicion? 'Form' : 'Edit'}</h3>
          <form onSubmit={!modoEdicion ? agregar : editar}>
            <input
              type="text"
              placeholder="Escribe una tarea"
              className="form-control mb-2"
              onChange={ e => setTarea(e.target.value)}
              value={tarea}
            />
            <button
              className={!modoEdicion ? "btn btn-dark btn-block" : "btn btn-warning btn-block"}
              type="submit"
            >{!modoEdicion ? 'Add': 'Edit'}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Tareas
