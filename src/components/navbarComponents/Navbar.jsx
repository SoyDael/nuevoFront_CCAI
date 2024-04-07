import React, { useState, useEffect } from 'react';
import { navbarEstudiante } from '../../api/APIS';
import { useNavigate, useParams } from 'react-router-dom'

const Navbar = () => {

    const { correo } = useParams();

    const [perfilEstudiante, setPerfilEstudiante] = useState([]);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const navigate = useNavigate();

    const redireccionarEditar = () => {
        navigate(`/editarPerfil/${correo}`);
    }

    const redireccionarProyecto = () => {
        navigate(`/proyectoAlumnoInt/${correo}`);
    }

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    useEffect(() => {
        const fetchPerfilEstudiante = async () => {
            try {
                const perfil = await navbarEstudiante(correo);
                console.log(perfil);
                setPerfilEstudiante(perfil);
            } catch (error) {
                console.error('Error al obtener perfil:', error);
                alert('Error al obtener perfil. Por favor, inténtalo de nuevo.');
            }
        };
        fetchPerfilEstudiante();
    }, [correo]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-10 bg-indigo-100">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="../src/assets/logocai.jpg" className="h-8" alt="" />
                    <span className="ml-5 self-center text-2xl font-semibold whitespace-nowrap text-dark">CCAI</span>
                </a>
                <div className="relative">
                    <button
                        type="button"
                        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        id="user-menu-button"
                        aria-expanded={isUserMenuOpen ? "true" : "false"}
                        onClick={toggleUserMenu}
                    >
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 rounded-full" src="" alt="user photo" />
                    </button>

                    {isUserMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-indigo-100 dark:divide-gray-600">
                            <div className="px-4 py-3">
                                {perfilEstudiante.length > 0 && (
                                    <span className="block text-sm text-gray-900 dark:text-gray-500">{perfilEstudiante[0]?.nombres} {perfilEstudiante[0]?.apellido_p} {perfilEstudiante[0]?.apellido_m}</span>
                                )}
                                {perfilEstudiante.length > 0 && (
                                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{perfilEstudiante[0]?.tipo_programa}</span>
                                )}

                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-500 dark:hover:text-white"
                                        onClick={redireccionarEditar}
                                    >
                                        Editar Perfil
                                    </a>
                                </li>
                                <li>
                                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-500 dark:hover:text-white"
                                     onClick={redireccionarProyecto}
                                    >Ver Proyecto</a>
                                </li>
                                <li>
                                    <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-500 dark:hover:text-white" onClick={cerrarSesion}>Cerrar Sesion</a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;





{/**

       <nav class="fixed top-0 left-0 right-0 z-10 bg-slate-100">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="" className='flex items-center'>
                    <img src="../src/assets/logocai.jpg" class="h-8" alt="CCAI Logo" />
                    <span class="ml-5 self-center text-2xl font-semibold whitespace-nowrap text-dark">CCAI</span>
                </a>
                <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
                        <li><a href="./perfilActividades" class="block py-2 px-3 text-whith rounded md:bg-transparent md:text-zinc-700 md:p-0" >Proyecto</a></li>
                        <li><a href="" class="block py-2 px-3 text-white rounded md:bg-transparent md:text-zinc-700 md:p-0" >Menu</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    */}