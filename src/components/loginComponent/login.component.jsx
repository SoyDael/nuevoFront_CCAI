import React, { useState } from 'react';
import { login, getPerfilEstudiante } from '../../api/APIS';
import NavbarSimple from '../navbarComponents/NavbarSimple';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [perfilEstudiante, setPerfilEstudiante] = useState(null); // Estado para almacenar el perfil del estudiante

    const navigate = useNavigate();


    const redireccionarAlumnoInterno = (correo) => {
        navigate(`/perfilAlumno/${correo}`);
    }

    const RedireccionarInvetigador = (correo) => {
        navigate(`/perfilInvestigador/${correo}`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login({ correo: email, password: password, tipo: userType });
            const token = response.token;
            console.log(token);
            localStorage.setItem('token', token);

            // Después de iniciar sesión con éxito, obtén el perfil del estudiante
            const perfilResponse = await getPerfilEstudiante(email); // Suponiendo que esta función devuelve el perfil del estudiante
            setPerfilEstudiante(perfilResponse); // Almacena el perfil del estudiante en el estado

            // Redirecciona según el tipo de usuario seleccionado
            if (userType === 'alumno interno' && localStorage.getItem('token')) {
                redireccionarAlumnoInterno(email);
            } else if (userType === 'investigador' && localStorage.getItem('token')) {
                RedireccionarInvetigador(email);
            } else if (userType === 'alumno externo' && localStorage.getItem('token')) {
                window.location.href = '/perfilActividades/id';
            }
            Swal.fire({
                title: 'Bienvenido',
                text: 'Inicio de sesión exitoso.'  ,
                icon: 'success',
                confirmButtonText: 'Aceptar'
              })
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            Swal.fire({
                title: 'Oops!',
                text: 'Error al iniciar sesión, verifica tus credenciales.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              })
        }
    };

    return (
        <>
            <NavbarSimple />
            <div className="bg-slate-200 flex justify-center items-center h-screen">
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-2x1 font-semibold mb-4">Iniciar Sesión</h1>
          <form onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="email"
                class="block py-3 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                padding="10px"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label
                for="floating_first_name"
                class="peer-focus:font-medium absolute text-sm text-neutral-800  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Correo:{" "}
              </label>
            </div>
 
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                id="password"
                name="password"
                class="block py-3 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  peer"
                placeholder=" "
                padding="10px"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label
                for="floating_first_name"
                class="peer-focus:font-medium absolute text-sm text-neutral-800 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                {" "}
                Contraseña:{" "}
              </label>
            </div>
 
            <div className="relative z-0 w-full mb-5 group peer-focus:font-medium block text-gray-900  appearance-none  focus:outline-none focus:ring-0 focus:border-gray-600 peer">
              <label htmlFor="userType" className="block text-gray-800">
                Tipo de Usuario:
              </label>
              <select
                name="floating_company"
                id="floating_company"
                class="block py-3 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
              >
                <option class="text-gray-500 " value="">
                  Selecciona un tipo
                </option>
                <option value="alumno interno">Alumno Interno</option>
                <option value="investigador">Investigador</option>
                <option value="alumno externo">Alumno Externo</option>
              </select>
            </div>
 
            <button
              type="submit"
              className="mb-6 bg-gray-700 hover:bg-gray-500 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Iniciar Sesión
            </button>
          </form>
 
          <div className="mb-6 text-gray-800 text-center">
            <a href="#" className="hover:underline">
              Recuperar Contraseña
            </a>
          </div>
        </div>
        <div className="w-1/2 h-screen hidden lg:block">
          <img
            src="../src/assets/loginCCAI.jpg"
            alt="CCAI"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
        </>
    );
};

export default Login;

{/**
     <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Correo electrónico:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Iniciar sesión</button>
            </form>
            <button onClick={redireccionar}>Registrar</button>
        </div>
*/}