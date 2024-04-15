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
                text: 'Bienvenido',
                icon: 'success',
                confirmButtonText: 'Cool'
              })
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Error al Iniciar Sesión',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        }
    };

    return (
        <>
            <NavbarSimple />
            <div className="bg-gray-100 flex justify-center items-center h-screen">
                <div className='lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2'>
                    <h1 className='text-2x1 font-semibold mb-4'>Iniciar Sesión</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label htmlFor="correo" className='block text-gray-600'>Correo: </label>
                            <input
                                type="email" name="email" id="email"
                                className='w-full border boder-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                                
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="password" className='block text-gray-600'>Contraseña: </label>
                            <input type="password" id='password' name='password'
                                className='w-full border boder-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                                
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="userType" className="block text-gray-600">Tipo de Usuario:</label>
                            <select
                                id="userType"
                                name="userType"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                                required
                            >
                                <option value="">Selecciona un tipo</option>
                                <option value="alumno interno">Alumno Interno</option>
                                <option value="investigador">Investigador</option>
                                <option value="alumno externo">Alumno Externo</option>
                            </select>
                        </div>
                        <button
                            type='submit'
                            className='mb-6 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full'
                        >
                            Iniciar Sesión
                        </button>
                    </form>

                    <div className="mb-6 text-blue-500 text-center">
                        <a href="#" className="hover:underline">Recuperar Contraseña</a>
                    </div>
                </div>
                <div className='w-1/2 h-screen hidden lg:block'>
                    <img src="../src/assets/image1.jpg" alt="CCAI" className="object-cover w-full h-full" />
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