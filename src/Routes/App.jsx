import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  Login  from '../components/loginComponent/login.component.jsx';
import PerfilAlumno from '../components/AlumnosInternosComponent/perfilesComponents/perfilAlumno.jsx';
import EditarPerfil from '../components/AlumnosInternosComponent/EditarPerfil.jsx';
import PerfilActividades from '../components/AlumnosInternosComponent/actividades.component/perfilActiviades.component.jsx';
import UsuarioForm from '../components/usuarioComponent/usuarioComponent.jsx';
import Navbar from '../components/navbarComponents/Navbar.jsx';
import NavbarSimple from '../components/navbarComponents/NavbarSimple.jsx';
import DetallesActividades from '../components/AlumnosInternosComponent/actividades.component/ActividadesDetallesComponents/detallesActividades.jsx';
import ProyectoAlumnoInt from '../components/AlumnosInternosComponent/proyectoComponent/ProyectoAlumnoInt.jsx';
import PerfilComponent from '../components/investigadorComponent/perfilComponent/PerfilComponent.jsx';
import Proyectos from '../components/ProyectosComponent/Proyectos.jsx';
import DetallesProyecto from '../components/ProyectosComponent/detallesProyectoComponent/DetallesProyecto.jsx';
import Integrantes from '../components/ProyectosComponent/IntegrantesComponet/Integrantes.jsx';
import AsignarActividad from '../components/ProyectosComponent/AsigActComponent/AsignarActividad.jsx';
import AlumnoInterno from '../components/registroComponents/AlumnoInternoComponent/AlumnoInterno.jsx';
import ListadoAlumnos from '../components/AlumnosInternosComponent/ListadoAlumnos.jsx';
import AsigProyecto from '../components/ProyectosComponent/AsigProyComponent/AsigProyecto.jsx';
import RegistroPrograma from '../components/ProyectosComponent/programaComponent/RegistroPrograma.jsx';
import SlideBarPruebaAlumn from '../components/SlideBar/SlideBarPruebaAlumn.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usuario" element={<UsuarioForm />} />
        <Route path="/perfilAlumno/:correo" element={<PerfilAlumno />} />
        <Route path="/editarPerfil/:correo" element={<EditarPerfil />} />
        <Route path='/*' element={<Navbar/>} />
        <Route path='/navbarSimple' element={<NavbarSimple/>}/>
        <Route path='/perfilActividades/:correo_estudiante' element={<PerfilActividades />} />
        <Route path='/detallesActividad/:correo_estudiante' element={<DetallesActividades />} />
        <Route path='/proyectoAlumnoInt/:correo_estudiante' element={<ProyectoAlumnoInt />} />

        <Route path='/perfilInvestigador/:correo' element={<PerfilComponent />} /> /// Ruta Investigador
        <Route path='/proyectos/:correo' element={<Proyectos />} /> /// Ruta Proyectos
        <Route path='/detallesProyecto/:id_proyecto/:correo' element={<DetallesProyecto />} /> /// Ruta Detalles Proyecto
        <Route path='/integrantes/:id_proyecto/:correo' element={<Integrantes />} /> /// Ruta Integrantes
        <Route path='/asignarActividad/:id_proyecto/:correo/:id_estudiante/:correo_estudiante' element={<AsignarActividad />} /> /// Ruta Asignar Actividad
        <Route path='/alumnoInterno' element={<AlumnoInterno />} /> /// Ruta Alumno Interno
        <Route path='/listadoAlumnos/:correo' element={<ListadoAlumnos />} /> /// Ruta Listado Alumnos
        <Route path='/asignarProyecto/:coordinador_correo/:id_estudiante/:correo_estudiante' element={<AsigProyecto />} /> /// Ruta Asignar Proyecto
        <Route path='/registroPrograma/:correo/:id_estudiante/:estudiante_correo' element={<RegistroPrograma />} /> /// Ruta Registro Programa

        <Route path='/slideBarPruebaAlumn' element={<SlideBarPruebaAlumn />} />

      </Routes>
    </BrowserRouter>
  );
          
}

export default App;
