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
      </Routes>
    </BrowserRouter>
  );
          
}

export default App;
