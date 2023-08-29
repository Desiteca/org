import { useState } from 'react';
import './App.css';
import { v4 as uuid} from 'uuid';
import Header from './componentes/header/Header.js';
import Formulario from './componentes/formulario/Formulario';
import MiOrg from './componentes/MiOrg';
import Equipo from './componentes/Equipo/Iindex';
import Footer from './componentes/Footer';

function App() {
  const [mostrarFormulario, actualizarMostrar] = useState(false)
  const [colaboradores, actualizarColaboradores] = useState([{
      id: uuid(),
      equipo:"Programación",
      foto:"https://github.com/harlandlohora.png",
      nombre:"Harland Lohara",
      puesto:"Instructor",
      fav: true
  }])

  const [equipos, actualizarEquipos] = useState([
    {
      id: uuid(),
      titulo: "Programación",
      colorPrimario: "#57c278",
      colorSecundario: "#D9f7e9", 
    },
    {
      id: uuid(),
      titulo: "Front End",
      colorPrimario: "#82cffa",
      colorSecundario: "#e8f8ff", 
    },
    {
      id: uuid(),
      titulo: "Data Science",
      colorPrimario: "#a6d157",
      colorSecundario: "#f0f8e2", 
    },
    {
      id: uuid(),
      titulo: "Devops",
      colorPrimario: "#e06b69",
      colorSecundario: "#fde7e8", 
    },
    {
      id: uuid(),
      titulo: "UX y Diseño",
      colorPrimario: "#db6ebf",
      colorSecundario: "#fae9f5", 
    },
    {
      id: uuid(),
      titulo:  "Móvil",
      colorPrimario: "#ffba05",
      colorSecundario: "#fff5d9", 
    },
    {
      id: uuid(),
      titulo: "Innovación y Gestión",
      colorPrimario: "#ff8a29",
      colorSecundario: "#ffeedf", 
    },
])

  //Ternario --> condición ? seMuestra : noSeMuestra
  //condicion && seMuestra
  
  const cambiarMostrar = () => {
    actualizarMostrar(!mostrarFormulario)
  }

  //Registrar colaborador

  const registrarColaborador = (colaborador) => {
    console.log("Nuevo colaborador", colaborador)
    //Spread operator
    actualizarColaboradores([...colaboradores, colaborador])
  }

  //Eliminar colaborador
  const eliminarColaborador = (id) => {
    console.log(" Delate", id);
    const nuevosColaboradores = colaboradores.filter((colaborador) => colaborador.id !== id)
    actualizarColaboradores(nuevosColaboradores)

  }

  //actualizar color de equipo
  const actualizarColor = (color, id) => {
    console.log("Actualizar: ", color, id)
    const equiposActualizados = equipos.map((equipo) => {
      if(equipo.id === id){
        equipo.colorPrimario = color
      }

      return equipo
    })

    actualizarEquipos(equiposActualizados)
  }

  //Crear equipo
  const crearEquipo =(nuevoEquipo) => {
    console.log(nuevoEquipo)
    actualizarEquipos([...equipos, {...nuevoEquipo, id: uuid()}])
  }

  const like = (id) => {
    console.log("Like ", id)
    const colaboradoresActualizados = colaboradores.map((colaborador) => {
      if(colaborador.id === id){
        colaborador.fav = !colaborador.fav
      }
      return colaborador
    })

    actualizarColaboradores(colaboradoresActualizados)
  }

  return (
    <div>
      <Header/>
      {/*mostrarFormulario ? <Formulario/> : <></>*/}
      {
      mostrarFormulario && <Formulario 
          equipos={equipos.map((equipo) => equipo.titulo)}
          registrarColaborador={registrarColaborador}
          crearEquipo={crearEquipo}
        />
      }

      <MiOrg cambiarMostrar={cambiarMostrar} />
      {
        equipos.map((equipo) => <Equipo 
          datos={equipo} 
          key={equipo.titulo} 
          colaboradores={colaboradores.filter(colaborador => colaborador.equipo === equipo.titulo)}
          eliminarColaborador={eliminarColaborador}
          actualizarColor={actualizarColor}
          like={like}
          />)
      }
      <Footer/>
    </div>
  );
}

export default App;
