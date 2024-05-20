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
        navigate(`/perfilAlumno/${correo || coordinador_correo}`);
    }

    const RedireccionarInvetigador = (correo) => {
        navigate(`/perfilInvestigador/${correo}`);
    }

    const redireccionarRecuperarContraseña = () => {
      navigate(`/recuperarContraseña`);
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
                <div className='lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2'>
                    <h1 className='text-center font-semibold mb-4 text-2xl  whitespace-nowrap text-slate-700'>Iniciar Sesión</h1>
                    <br></br>
                    <form onSubmit={handleSubmit}>
                        <div class="flex flex-col  justify-center items-center  space-y-6">
                            <input 
                            type="text" 
                            id="email" 
                            name="email" 
                            placeholder="Correo " 
                            class="w-80 appearance-none rounded-full border-0 bg-slate-500 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                            <div>
                                <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="Contraseña" 
                                class="w-80 appearance-none rounded-full border-0 bg-slate-500 p-2 px-4 focus:bg-slate-800 focus:ring-2 " 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                                <p id="validation" class="text-center text-orange-500 italic text-sm"></p>
                            </div>
 
                            <div class="relative inline-flex">
                                <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero" /></svg>
                                <select 
                                class="w-80 appearance-none rounded-full border-0 bg-slate-500 p-2 px-4 focus:bg-slate-700 focus:ring-2 text-white "
                                value={userType}
                                onChange={(e) => setUserType (e.target.value)}
                                >

                                   <option value=""> Seleccionar opcion </option>
                                    <option value="investigador">Investigador</option>
                                    <option value="alumno interno">Alumno Interno</option>
                                    <option value="alumno externo">Alumno externo</option>
 
                                </select>
                            </div>
 
 
                        </div>
                        <br></br>
                        <div className="mb-6 text-gray-800 text-center">
                            <button
                                type='submit'
                                className='dark:bg-slate-500 text-center hover:bg-gray-500 text-white font-semibold rounded-full py-2 px-4 w-middle'
                                >
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
 
 
                    <div className="mb-6 text-gray-800 text-center">
 
                        <a className="hover:underline " onClick={() => redireccionarRecuperarContraseña(userType.email)}> Recuperar Contraseña</a>
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