import React, { useState } from 'react'
import Error from './Error'

const Formulario = ({ guardarBusqueda }) => {
  //Inicializo la variable en la cual se recibira lo que el usuario escriba en el buscador
  const [termino, guardarTermino] = useState('')

  //Creo otro State para mostrar o no el Error si es que lo hubiese
  const [error, guardarError] = useState(false)

  const buscarImagenes = e => {
    e.preventDefault()

    //Primero validare que el buscador NO este vacio
    if (termino.trim() === '') {
      guardarError(true)
      return
    }
    guardarError(false)

    //Luego envio el termino de busqueda hacia el Componente Principal
    guardarBusqueda(termino)
  }

  return (
    <form onSubmit={buscarImagenes}>
      <div className='row'>
        <div className='form-group col-md-8'>
          <input
            type='text'
            className='form-control form-control-lg'
            placeholder='Busca una imagen, ejemplo: futbol o café'
            onChange={e => guardarTermino(e.target.value)}
          />
        </div>
        <div className='form-group col-md-4'>
          <input
            type='submit'
            className='btn btn-lg btn-danger btn-block'
            value='Buscar'
          />
        </div>
      </div>

      {error ? <Error mensaje='Agrega un término de búsqueda' /> : null}
    </form>
  )
}

export default Formulario
