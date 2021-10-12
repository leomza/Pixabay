import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  //Aca defino los State que usaré en la APP
  //Primero defino el State de busqueda y lo inicio como un String vacio:
  const [busqueda, guardarBusqueda] = useState('')

  //Creo otro State para guardar las imagenes que resulten de la busqueda:
  const [imagenes, guardarImagenes] = useState([])

  //Para el PAGINATOR debo agregar dos State más: -Uno dira la página en que nos encontramos(lo inicializo en 1 ya que siempre empiezo desde la pagina 1) y otro dirá la cantidad de páginas que hay en total(tambien lo inicializo en 1 ya que asi sea que no hay resultados siempre hay al menos una pagina)
  const [paginaActual, guardarPaginaActual] = useState(1)
  const [totalPaginas, guardarTotalPaginas] = useState(1)

  //Cuando esa busqueda cambie usaré useEffect para volver a consultar a la API (como dependencia tomo la "busqueda" y cuando cambie de página)
  useEffect(() => {
    const consultarApi = async () => {
      //Para asegurarme que apenas abro la pagina y la "busqueda" este vacia no haga ninguna consulta:
      if (busqueda === '') {
        return
      }

      const imagenesPorPagina = 30;
      const appKey = '23817928-d2d12c83343cce4c6f391a356';
      const url = `https://pixabay.com/api/?key=${appKey}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      //Por ultimo guardo la "busqueda" en el State
      guardarImagenes(resultado.hits);

      //Para hacer el PAGINATOR aqui voy a calcular el total de páginas que tengo con la busqueda realizada:
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);

      //Para que luego de la busqueda la pantalla se mueva automaticamente hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });
    }
    consultarApi();
  }, [busqueda, paginaActual])

  //Aca voy a definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
    if (nuevaPaginaActual === 0) return; //Hago esto para que la pagina no pueda ser negativa 
    guardarPaginaActual(nuevaPaginaActual);
  }

  //Aca voy a definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;
    if (nuevaPaginaActual > totalPaginas) return; //Hago esto para que la pagina no pueda ser mayor que la cantidad total de paginas 
    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center"> Buscador de Imagenes</p>
        <Formulario guardarBusqueda={guardarBusqueda} guardarPaginaActual={guardarPaginaActual}/>
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />

        {/* Aca voy a agregar botones para avanzar o retroceder de pagina en el PAGINATOR */}
        {(paginaActual === 1) ? null : (<button type="button" className="bbtn btn-info mr-1" onClick={paginaAnterior}>&laquo; Anterior</button>)} {/* Cuando la pagina es "1" no se mostrará el boton de "Anterior" */}
        {(paginaActual === totalPaginas) ? null : (<button type="button" className="bbtn btn-info" onClick={paginaSiguiente}>Siguiente &raquo;</button>)
        }
      </div>
    </div>
  );
}

export default App;
