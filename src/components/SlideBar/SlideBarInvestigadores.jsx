import React, { useState, useRef, useEffect } from 'react';
import './SlideBar.css'
import { navbarInvestigador, createUsuario, registroEstudiante, consultaInvestigadores, registroProyecto } from '../../api/APIS'
import { useNavigate, useParams } from 'react-router-dom'

const SlideBarInvestigadores = () => {

    const { correo, coordinador_correo, correo_investigador } = useParams();
    const [perfilInvestigador, setPerfilInvestigador] = useState([]);
    const navigate = useNavigate();
    const [isUserMenuOpen, setUserMenuOpen] = useState(false);
    const [isAsideVisible, setIsAsideVisible] = useState(true);
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const [isKanbanOpen, setIsKanbanOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isProgramaOpen, setIsProgramaOpen] = useState(false);

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    const redireccionarEditar = () => {
        navigate(`/EditarPerfilInvestigador/${correo || coordinador_correo || correo_investigador} `);
    }

    const verPerfil = () => {
        navigate(`/perfilInvestigador/${correo || coordinador_correo || correo_investigador}`);
    }
    {/**  const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
        console.log('hola', isUserMenuOpen);
    }; */}

    const toggleUserMenu = () => {
        setUserMenuOpen(prevState => !prevState); // Cambia el estado de visibilidad del menú
    };

    const toggleAsideVisibility = () => {
        setIsAsideVisible(!isAsideVisible);
    };

    const redireccionarListadoAlumnos = () => {
        navigate(`/listadoAlumnos/${correo || coordinador_correo || correo_investigador}`);
    }

    const redireccionarPogramas = () => {
        navigate(`/programas/${correo || coordinador_correo || correo_investigador}`);
    }

    const redireccionarProyectos = () => {
        navigate(`/proyectos/${correo || coordinador_correo || correo_investigador}`);
    }


    // api consultaInvestigadores

    const [Investigador, setInvestigador] = useState([])
    const [titulo, setTitulo] = useState('');


    useEffect(() => {
        const fetchInvestigador = async () => {
            try {
                const investigador = await consultaInvestigadores();
                console.log(investigador);
                setInvestigador(investigador); // Almacena los proyectos del investigador en el estado
            } catch (error) {
                console.error('Error al obtener proyectos:', error);
                //alert('Error al obtener proyectos. Por favor, inténtalo de nuevo.');
            }
        };
        fetchInvestigador();
    }, []);

    useEffect(() => {
        const fetchPerfilInvestigador = async () => {
            try {
                const perfil = await navbarInvestigador(correo);
                console.log(perfil);
                setPerfilInvestigador(perfil);
            } catch (error) {
                console.error('Error al obtener perfil:', error);
                alert('Error al obtener perfil. Por favor, inténtalo de nuevo.');
            }
        };
        fetchPerfilInvestigador();
    }, [correo]);


    {/** Funcion de menu despegable */ }

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    // registro usuario
    const handleUsuario = async (formulario) => {
        const formData = new FormData(formulario);
        const usuario = Object.fromEntries(formData);

        try {
            await createUsuario(usuario);
            console.log("dimos clic", usuario);
            alert('Usuario añadido correctamente');
            formulario.reset();
        } catch (error) {
            console.error('Error al añadir usuario:', error);
            alert('Error al añadir usuario. Por favor, inténtelo de nuevo más tarde.');
        }
    };


    {/** Funcion de menu despegable alumno interno */ }

    const [showModal2, setShowModal2] = useState(false);

    const toggleModal2 = () => {
        setShowModal2(!showModal2);
    };

    // registro alumno interno
    const handleUsuarioInterno = async (formulario) => {
        const formData = new FormData(formulario);
        const estudiante = Object.fromEntries(formData);
        try {
            await registroEstudiante(estudiante);
            console.log("dimos clic", estudiante);
            alert('Usuario añadido correctamente');
            formulario.reset();
        } catch (error) {
            console.error('Error al añadir usuario:', error);
            alert('Error al añadir usuario. Por favor, inténtelo de nuevo más tarde.');
        }
    };

    const [showModal3, setShowModal3] = useState(false);

    const toggleModal3 = () => {
        setShowModal3(!showModal3);
    };

    const handleProyecto = async (formulario) => {
        const formData = new FormData(formulario);
        const data = Object.fromEntries(formData);
        console.log("Datos del proyecto ", data);
        try {
          const response = await registroProyecto(data, {titulo_esp: titulo});
          console.log(response);
          alert('Proyecto registrado con éxito');
        } catch (error) {
          console.error('Error al registrar proyecto:', error);
          alert('Error al registrar proyecto. Por favor, inténtalo de nuevo.');
        }
      }


    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-slate-950 bg-opacity-90 border-b border-slate-800">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            {/* Botón para mostrar u ocultar el Aside */}
                            <button
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                onClick={toggleAsideVisibility}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={toggleAsideVisibility}
                                className="flex ms-2 md:me-24"
                            >
                                <img src="../src/assets/logocai.jpg" className="h-8 me-3" alt="CCAI Logo" />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">CCAI</span>
                            </button>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div className="relative">
                                    <button
                                        type="button"
                                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                        id="user-menu-button"
                                        aria-expanded={isUserMenuOpen ? "true" : "false"}
                                        onClick={toggleUserMenu}
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                            alt="user photo"
                                        />
                                    </button>
                                </div>

                                {isUserMenuOpen && (
                                    <div
                                        className="absolute right-5 mt- w-48 bg-slate-800  divide-y divide-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:divide-gray-700"
                                        style={{ top: '100%' }}
                                    >
                                        <div className="px-4 py-3">
                                            {perfilInvestigador.length > 0 && (
                                                <span className="block text-sm text-gray-900 dark:text-gray-500">{perfilInvestigador[0]?.nombres} {perfilInvestigador[0]?.apellido_p} {perfilInvestigador[0]?.apellido_m}</span>
                                            )}
                                            {perfilInvestigador.length > 0 && (
                                                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{perfilInvestigador[0]?.tipo}</span>
                                            )}
                                        </div>
                                        <ul className="py-1 text-sm text-slate-300 dark:text-gray-300" aria-labelledby="user-menu-button">
                                            <li>
                                                <button className="w-full block px-4 py-2 rounded-lg hover:bg-slate-700 dark:hover:bg-gray-600"
                                                    onClick={verPerfil}>
                                                    Ver perfil
                                                </button>
                                            </li>
                                            <li>
                                                <button className="w-full block px-4 py-2 rounded-lg hover:bg-slate-700 dark:hover:bg-gray-600 "
                                                    onClick={redireccionarEditar}>
                                                    Editar perfil
                                                </button>
                                            </li>
                                            <li>
                                                <button className="w-full block px-4 py-2 rounded-lg hover:bg-slate-700 dark:hover:bg-gray-600"
                                                    onClick={cerrarSesion}>
                                                    Cerrar sesión
                                                </button>
                                            </li>

                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Aside: Mostrar u ocultar según el estado isAsideVisible */}
            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isAsideVisible ? "sm:translate-x-0" : "-translate-x-full"
                    } bg-slate-950 bg-opacity-60 border-r border-slate-800 dark:bg-gray-800 dark:border-gray-700`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-slate-950 bg-opacity-0 ">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <button
                                onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                                className="flex items-center justify-between w-full p-2 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-slate-300 group"
                            >
                                <span className="flex items-center">
                                    <svg
                                        className="w-5 h-5 text-slate-300 transition duration-75 group-hover:bg-slate-800 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 21"
                                    >
                                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                    </svg>
                                    <span className="ms-3">Proyectos</span>
                                </span>
                                <svg
                                    className={`w-4 h-4 transition-transform ${isDashboardOpen ? 'rotate-180' : ''}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            {isDashboardOpen && (
                                <ul className="pl-4 mt-2 space-y-2">
                                    <li>
                                        <button className="block p-2 rounded-lg text-slate-300 dark:text-white hover:bg-slate-800 dark:hover:bg-slate-300 group"
                                            onClick={redireccionarProyectos}>
                                            Ver proyectos
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={toggleModal3} className="flex items-center justify-between w-full p-2 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-slate-300 group">
                                            Registrar nuevo proyecto
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button
                                onClick={() => setIsKanbanOpen(!isKanbanOpen)}
                                className="flex items-center justify-between w-full p-2 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-slate-300 group"
                            >
                                <span className="flex items-center">
                                    <svg
                                        className="w-5 h-5 transition duration-75 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-slate-300 group"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 18 18"
                                    >
                                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286C10 17.169 10.831 18 11.857 18h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                    </svg>
                                    <span className="ms-3">Alumnos</span>
                                </span>
                                <svg
                                    className={`w-4 h-4 transition-transform ${isKanbanOpen ? 'rotate-180' : ''}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isKanbanOpen && (
                                <ul className="pl-4 mt-2 space-y-2">
                                    <li>
                                        <button className="block p-2 rounded-lg text-slate-300 dark:text-white hover:bg-slate-800 dark:hover:bg-slate-300 group"
                                            onClick={redireccionarListadoAlumnos}>
                                            Ver alumnos internos
                                        </button>
                                    </li>

                                </ul>
                            )}
                        </li>
                        <li>
                            <button
                                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                                className="flex items-center justify-between w-full p-2 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-slate-300 group"
                            >
                                <span className="flex items-center">
                                    <svg
                                        className="w-5 h-5 transition duration-75 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-slate-300 group"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M19 1H5c-1.657 0-3 1.343-3 3v16c0 1.657 1.343 3 3 3h14c1.657 0 3-1.343 3-3V4c0-1.657-1.343-3-3-3zm-4.176 8.73h-1.603V15.5h1.816c.864 0 1.522-.206 1.973-.62.448-.413.673-.98.673-1.696 0-.719-.222-1.29-.666-1.717-.447-.423-1.104-.637-1.978-.637zm-1.603-1.467h2.229c1.063 0 1.838-.262 2.325-.783.491-.523.737-1.181.737-1.972 0-.776-.246-1.426-.737-1.948-.488-.523-1.262-.784-2.325-.784h-2.229v5.487zm-3.927 0V15.5h1.555V8.732h-1.555zm1.555-1.468h-1.555V5.23h1.555v2.034zm-3.556 8.235V8.732H7.42v5.996H5.176z" />
                                    </svg>
                                    <span className="ms-3">Registro</span>
                                </span>
                                <svg
                                    className={`w-4 h-4 transition-transform ${isCalendarOpen ? 'rotate-180' : ''}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isCalendarOpen && (
                                <ul className="pl-4 mt-2 space-y-2">
                                    <li>
                                        <button className="block p-2 rounded-lg text-slate-300 dark:text-white hover:bg-slate-800 dark:hover:bg-slate-300 group"
                                            onClick={toggleModal}>
                                            Registrar nuevo usuario
                                        </button>
                                    </li>
                                    <li>
                                        <button className="block p-2 rounded-lg text-slate-300 dark:text-white hover:bg-slate-800 dark:hover:bg-slate-300 group"
                                            onClick={toggleModal2}>
                                            Registro alumno interno
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button
                                onClick={() => setIsProgramaOpen(!isProgramaOpen)}
                                className="flex items-center justify-between w-full p-2 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-slate-300 group"
                            >
                                <span className="flex items-center">
                                    <svg
                                        className="w-5 h-5 transition duration-75 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-slate-300 group"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M19 1H5c-1.657 0-3 1.343-3 3v16c0 1.657 1.343 3 3 3h14c1.657 0 3-1.343 3-3V4c0-1.657-1.343-3-3-3zm-4.176 8.73h-1.603V15.5h1.816c.864 0 1.522-.206 1.973-.62.448-.413.673-.98.673-1.696 0-.719-.222-1.29-.666-1.717-.447-.423-1.104-.637-1.978-.637zm-1.603-1.467h2.229c1.063 0 1.838-.262 2.325-.783.491-.523.737-1.181.737-1.972 0-.776-.246-1.426-.737-1.948-.488-.523-1.262-.784-2.325-.784h-2.229v5.487zm-3.927 0V15.5h1.555V8.732h-1.555zm1.555-1.468h-1.555V5.23h1.555v2.034zm-3.556 8.235V8.732H7.42v5.996H5.176z" />
                                    </svg>
                                    <span className="ms-3">Programa</span>
                                </span>
                                <svg
                                    className={`w-4 h-4 transition-transform ${isProgramaOpen ? 'rotate-180' : ''}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isProgramaOpen && (
                                <ul className="pl-4 mt-2 space-y-2">
                                    <li>
                                        <button className="block p-2 rounded-lg text-slate-300 dark:text-white hover:bg-slate-800 dark:hover:bg-slate-300 group"
                                        onClick={redireccionarPogramas}>
                                            Ver programas
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </aside>

            {/** Aqui inicia Registro Usuario */}
            {showModal && (
                <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-slate-200 border border-gray-200 rounded-lg shadow-lg p-1 max-w-lg">
                        <section className="bg-slate-200 dark:bg-gray-900">
                            <div className="max-w-2xl px-4 py-1 mx-auto lg:py-16 ">
                                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Registro Usuario</h2>
                                <form id='formulario'>
                                    <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                                        <div className="sm:col-span-2">
                                            <div className="flex flex-col">
                                                <label htmlFor="correo"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo: </label>
                                                <div className="flex items-center">
                                                    <input
                                                        type="email"
                                                        name="correo"
                                                        id="correo"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                        placeholder="Correo"
                                                        required=""
                                                    />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="sm:col-span-2">
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password: </label>
                                            <input type="password"
                                                name="password"
                                                id="password"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Password"
                                                required="" />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="tipo" className='block text-gray-600'>Tipo de usuario: </label>
                                            <select name="tipo" id="tipo"
                                                className='w-full border boder-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-center'>
                                                <option value="Investigador">Investigador</option>
                                                <option value="Alumno Interno">Alumno Interno</option>
                                                <option value="Alumno Externo">Alumno Externo</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                                <div className="flex justify-center">
                                    <button type='submit' onClick={() => handleUsuario(document.getElementById('formulario'))}
                                        className="text-sm font-medium text-white bg-blue-700 rounded-lg py-3 px-5 mr-4">Registrar</button>
                                    <button onClick={toggleModal} className="text-sm font-medium text-white bg-blue-700 rounded-lg py-1 px-3">Cerrar</button>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            )}

            {/** Aqui finaliza Registro Usuario */}

            {/** Aqui inicia Registro Alumno Interno */}
            {showModal2 && (
                <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-slate-200 border border-gray-200 rounded-lg shadow-lg p-1 max-w-lg">
                        <section className="bg-slate-200 dark:bg-gray-900">
                            <div className="max-w-2xl px-4 py-1 mx-auto lg:py-16 ">
                                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Registro Alumno Interno</h2>
                                <form class="max-w-xl mx-auto" id='formulario'>
                                    <div class="grid md:grid-cols-2 md:gap-6">
                                        <div class="relative z-0 w-full mb-5 group">
                                            <input
                                                type="text"
                                                name="matricula"
                                                id="matricula"
                                                class="block py-3 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" "
                                                required
                                            />
                                            <label
                                                htmlFor="matricula"
                                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                Matricula:
                                            </label>
                                        </div>
                                        <div class="relative z-0 w-full mb-5 group">
                                            <input
                                                type="text"
                                                name="nombres"
                                                id="nombres"
                                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" "
                                                required
                                            />
                                            <label
                                                htmlFor="nombres"
                                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                Nombre(s):
                                            </label>
                                        </div>
                                    </div>
                                    <div class="grid md:grid-cols-2 md:gap-6">
                                        <div class="relative z-0 w-full mb-5 group">
                                            <input
                                                type="text"
                                                name="apellido_p"
                                                id="apellido_p"
                                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" "
                                                required
                                            />
                                            <label
                                                htmlFor="apellido_p"
                                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                Apellido paterno:
                                            </label>
                                        </div>
                                        <div class="relative z-0 w-full mb-5 group">
                                            <input
                                                type="text"
                                                name="apellido_m"
                                                id="apellido_m"
                                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" "
                                                required
                                            />
                                            <label
                                                htmlFor="apellido_m"
                                                class="peer-focus: font-bold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                Apellido materno:
                                            </label>
                                        </div>
                                    </div>
                                    <div class="grid md:grid-cols-2 md:gap-6">
                                        <div class="relative z-0 w-full mb-5 group">
                                            <input
                                                type="text"
                                                name="correo"
                                                id="correo"
                                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" "
                                                required
                                            />
                                            <label
                                                htmlFor="correo"
                                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                Correo institucional:
                                            </label>
                                        </div>
                                        <div class="relative z-0 w-full mb-5 group">
                                            <input
                                                type="email"
                                                name="correo_adicional"
                                                id="correo_adicional"
                                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" "
                                                required
                                            />
                                            <label
                                                htmlFor="correo_adicional"
                                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                Correo adicional:
                                            </label>
                                        </div>
                                    </div>
                                    <div class="grid md:grid-cols-2 md:gap-6">
                                        <div class="relative z-0 w-full mb-5 group">
                                            <input
                                                type="tel"
                                                name="telefono"
                                                id="telefono"
                                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" "
                                                required
                                            />
                                            <label
                                                htmlFor="telefono"
                                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                Telefóno:
                                            </label>
                                        </div>
                                        <div class="relative z-0 w-full mb-5 group">
                                            <select type="text"
                                                name="division"
                                                id="division"
                                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" "
                                                required>

                                                <option value="" > Selecciona una opción </option>
                                                <option value="Ingenería Informática"  > Ingenería Informática </option>
                                                <option value="Ingenería en Sistemas Computacionales"> Ingenería en Sistemas Computacionales </option>
                                                <option value="Ingenería Electrónica"> Ingenería Electrónica </option>
                                                <option value="Ingenería Mecánica"> Ingenería Mecánica </option>
                                                <option value="Ingenería Bioquímica"> Ingenería Bioquímica </option>
                                                <option value="Ingenería Química"> Ingenería Química </option>
                                                <option value="Ingenería Industrial"> Ingenería Industrial </option>
                                                <option value="Ingenería Mecatrónica"> Ingenería Mecatrónica </option>
                                                <option value="Ingenería en Gestión Empresarial"> Ingenería en Gestión Empresarial </option>
                                                <option value="Ingenería Aeronáutica"> Ingenería Aeronáutica </option>
                                                <option value="Contador Público"> Contador Público </option>
                                            </select>
                                            <label
                                                htmlFor="division"
                                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                División:
                                            </label>
                                        </div>
                                    </div>
                                </form>
                                <div className="flex justify-center">
                                    <button type='submit' onClick={() => handleUsuarioInterno(document.getElementById('formulario'))}
                                        className="text-sm font-medium text-white bg-blue-700 rounded-lg py-3 px-5 mr-4">Registrar Alumno</button>
                                    <button onClick={toggleModal2} className="text-sm font-medium text-white bg-blue-700 rounded-lg py-1 px-3">Cerrar</button>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            )}

            {/** Aqui termina Registro Alumno interno */}

            {/** Aqui inicia Registro Proyecto */}

            {showModal3 && (
                <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className=" border border-gray-200 rounded-lg shadow-lg p-5">
                        <section class="grid  place-content-center bg-slate-600 text-slate-300">
                            <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                                <h1 class="text-4xl font-semibold mb-4">Registro proyecto</h1>
                                <form id='formulario' >
                                    <div class="flex flex-col items-center justify-center space-y-6">
                                        <input
                                            type="text"
                                            id="titulo_esp"
                                            name="titulo_esp"
                                            placeholder="Titulo"
                                            class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                                        />
                                        <textarea maxlength="1000" id="descripcion" name="descripcion" placeholder="Descripción" class="w-96 appearance-none  border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                                        <textarea maxlength="1000" id="objetivo" name="objetivo" placeholder="Objetivo" class="w-96 appearance-none  border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />

                                        <select
                                            className="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2"
                                            id='coordinador_correo'
                                            name="coordinador_correo"
                                        >
                                            <option value="">Selecciona un Investigador</option>
                                            {Investigador.map((investigador) => (
                                                <option key={investigador.id_investigador} value={investigador.correo}>
                                                    {investigador.nombres} {investigador.apellido_p} {investigador.apellido_m}
                                                </option>
                                            ))}
                                        </select>

                                        <select
                                            className="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2"
                                            name="estatus"
                                        >
                                            <option value="">Selecciona un estatus</option>
                                            <option value="Nuevo">Nuevo</option>
                                            <option value="En progreso">En progreso</option>
                                            <option value="Finalizado">Finalizado</option>
                                        </select>

                                        <input type="datetime-local" id="fecha_registro" name="fecha_registro" placeholder="Fecha de registro" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                                        <input type="date" id="fecha_inicio" name="fecha_inicio" placeholder="Fecha de inicio" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                                        <input type="date" id="fecha_fin" name="fecha_fin" placeholder="Fecha de finalización" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />

                                        <button type='submit'
                                        id="showPw" 
                                        onClick={() => handleProyecto(document.getElementById('formulario'))}
                                        class="rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-indigo-700"><span id="showHide">Añadir</span> Proyecto</button>

                                    </div>
                                </form>
                            </div>
                        </section>
                        <div className="flex justify-center">
                            <button onClick={toggleModal3} className="text-sm font-medium text-white bg-indigo-700 rounded-lg py-2 px-4">Cerrar</button>
                        </div>
                    </div>
                </div>
            )}

            {/** Aqui termina Registro Proyecto */}
        </>
    )
}

export default SlideBarInvestigadores

