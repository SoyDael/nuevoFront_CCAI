import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { navbarEstudiante, getPerfilEstudiante, getconsultaActividadesEstudiantesPorId } from '../../api/APIS';


const SlideBarPruebaAlumn = () => {

    const { correo, correo_estudiante } = useParams();


    const [perfilEstudiante, setPerfilEstudiante] = useState([]);
    const [actividadEstudiante, setActividadEstudiante] = useState(null);
    const [proyectoEstudiante, setProyectoEstudiante] = useState(null);

    const [isUserMenuOpen, setUserMenuOpen] = useState(false);
    const [isAsideVisible, setIsAsideVisible] = useState(true);


    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const [isKanbanOpen, setIsKanbanOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const navigate = useNavigate();

    const redireccionarPerfil = () => {
        navigate(`/perfilAlumno/${correo || correo_estudiante}`);
    }

    const redireccionarEditar = () => {
        navigate(`/editarPerfil/${correo_estudiante || correo}`);
    }

    const redireccionarProyecto = () => {
        navigate(`/proyectoAlumnoInt/${correo || correo_estudiante}`);
    }

    const redireccionarActividades = () => {
        navigate(`/perfilActividades/${correo || correo_estudiante}`);
    }

    const obtenerActividades = async (e) => {
        e.preventDefault();
        try {
            const response = await getPerfilEstudiante({ correo: correo }); // Pasar solo el correo del estudiante
            const token = response.token;
            console.log(token);
            localStorage.setItem('token', token);

            const actividades = await getconsultaActividadesEstudiantesPorId(correo);
            setActividadEstudiante(actividades);

            redireccionarActividades();
        } catch (error) {
            console.log('Error al obtener actividades:', error);
        }
    }


    const cerrarSesion = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
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

    useEffect(() => {
        const fetchPerfilEstudiante = async () => {
            try {
                const perfil = await navbarEstudiante(correo || correo_estudiante);
                console.log(perfil);
                setPerfilEstudiante(perfil);
            } catch (error) {
                //console.error('Error al obtener perfil:', error);
                //alert('Error al obtener perfil. Por favor, inténtalo de nuevo.');
            }
        };
        fetchPerfilEstudiante();
    }, [correo]);

    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-slate-950 bg-opacity-90 border-b border-slate-800 bg-slate-800 border-slate-800">
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
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">CCAI</span>
                            </button>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center space-x-3 rtl:space-x-reverse">
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
                                            //src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                            alt="user photo"
                                        ></img>
                                    </button>
                                </div>

                                {isUserMenuOpen && (
                                    <div
                                        className="absolute right-0 mt-2 w-48 bg-slate-800 bg-opacity-30 rounded shadow-lg dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-800 rounded-lg shadow-lg dark:bg-gray-800 dark:divide-gray-700"
                                        style={{ top: '100%' }}
                                    >
                                        <div className="px-4 py-3">
                                            <p className="text-sm text-gray-300 dark:text-white">{perfilEstudiante[0]?.nombres} {perfilEstudiante[0]?.apellido_p} {perfilEstudiante[0]?.apellido_m}</p>
                                            {/**   <p className="text-sm  text-gray-900 dark:text-gray-300">{perfilEstudiante[0]?.correo}</p> */}
                                            <p className="text-sm font-medium text-gray-900 text-gray-600">{perfilEstudiante[0]?.tipo}</p>
                                        </div>
                                        <ul className="py-1 text-sm text-gray-700 text-gray-100" aria-labelledby="user-menu-button">
                                            <li>
                                                <button  className="block px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-600"
                                                onClick={redireccionarPerfil }
                                                >
                                                    Ver Perfil
                                                </button>
                                            </li>
                                            <li>
                                                <button className="block px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-600"
                                                onClick={redireccionarEditar}
                                                >
                                                    Editar Perfil
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={cerrarSesion} className="block px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                                                    Cerrar Sesión
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
                                className="flex items-center justify-between w-full p-2 text-gray-900 rounded-lg text-white hover:bg-gray-400 dark:hover:bg-gray-700 group"
                            >
                                <span className="flex items-center">
                                    <svg
                                        className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 21"
                                    >
                                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                    </svg>
                                    <span className="ms-3">Proyecto</span>
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
                                        <button className="block p-2 rounded-lg text-gray-900 text-white hover:bg-gray-400 dark:hover:bg-gray-700"
                                        onClick={redireccionarProyecto}
                                        >
                                            Ver Proyecto
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button
                                onClick={() => setIsKanbanOpen(!isKanbanOpen)}
                                className="flex items-center justify-between w-full p-2 text-gray-900 rounded-lg text-white hover:bg-gray-400 dark:hover:bg-gray-700 group"
                            >
                                <span className="flex items-center">
                                    <svg
                                        className="w-5 h-5 text-gray-800 transition duration-75 text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 18 18"
                                    >
                                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286C10 17.169 10.831 18 11.857 18h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                    </svg>
                                    <span className="ms-3">Actividades</span>
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
                                        <button className="block p-2 rounded-lg text-gray-900 text-white hover:bg-gray-400 dark:hover:bg-gray-700"
                                        onClick={obtenerActividades}
                                        >
                                            Ver Actividades
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>
                      {/**   <li>
                            <button
                                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                                className="flex items-center justify-between w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <span className="flex items-center">
                                    <svg
                                        className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M19 1H5c-1.657 0-3 1.343-3 3v16c0 1.657 1.343 3 3 3h14c1.657 0 3-1.343 3-3V4c0-1.657-1.343-3-3-3zm-4.176 8.73h-1.603V15.5h1.816c.864 0 1.522-.206 1.973-.62.448-.413.673-.98.673-1.696 0-.719-.222-1.29-.666-1.717-.447-.423-1.104-.637-1.978-.637zm-1.603-1.467h2.229c1.063 0 1.838-.262 2.325-.783.491-.523.737-1.181.737-1.972 0-.776-.246-1.426-.737-1.948-.488-.523-1.262-.784-2.325-.784h-2.229v5.487zm-3.927 0V15.5h1.555V8.732h-1.555zm1.555-1.468h-1.555V5.23h1.555v2.034zm-3.556 8.235V8.732H7.42v5.996H5.176z" />
                                    </svg>
                                    <span className="ms-3">Calendar</span>
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
                                        <a href="#" className="block p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            Submenu 1
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            Submenu 2
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </li>
                        */}
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default SlideBarPruebaAlumn
