import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { perfilExterno, actividadesEstanciasPorCorreo, proyectosEstancia } from '../../api/APIS';


const SlideBarAlumnoExt = () => {

    const { correo, residente_correo, correo_estancia_residente } = useParams();


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
        navigate(`/perfilAlumnoExterno/${correo || residente_correo || correo_estancia_residente}`);
    }

    const redireccionarEditar = () => {
        navigate(`/editarPerfilExt/${correo || residente_correo || correo_estancia_residente}`);
    }

    const redireccionarActividades = () => {
        navigate(`/actividadesEstancia/${correo || residente_correo || correo_estancia_residente}`);
    }

    const redireccionarProyectos = () => {
        navigate(`/proyectoEstancia/${correo || residente_correo || correo_estancia_residente}`);
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
                const perfil = await perfilExterno(correo || residente_correo || correo_estancia_residente);
                console.log(perfil);
                setPerfilEstudiante(perfil);
            } catch (error) {
                //console.error('Error al obtener perfil:', error);
                //alert('Error al obtener perfil. Por favor, inténtalo de nuevo.');
            }
        };
        fetchPerfilEstudiante();
    }, [correo]);


    /// rediccionar a la pagina de actividades de estancia

    const obtenerActividades = async (e) => {
        e.preventDefault();
        try {
            const response = await perfilExterno({ correo: correo }); // Pasar solo el correo del estudiante
            const token = response.token;
            console.log(token);
            localStorage.setItem('token', token);

            const actividades = await actividadesEstanciasPorCorreo(correo);
            console.log(actividades);
            setActividadEstudiante(actividades);

            redireccionarActividades();
        } catch (error) {
            console.log('Error al obtener actividades:', error);
        }
    }

    const obtenerProyectos = async (e) => {
        e.preventDefault();
        try {
            const response = await perfilExterno({ correo: correo }); // Pasar solo el correo del estudiante
            const token = response.token;
            console.log(token);
            localStorage.setItem('token', token);

            const proyectos = await proyectosEstancia(correo);
            console.log(proyectos);
            setProyectoEstudiante(proyectos);

            redireccionarProyectos();
        } catch (error) {
            console.log('Error al obtener proyectos:', error);
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
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-slate-300">CCAI</span>
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
                                            src="https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png"
                                            alt="user photo"
                                        >{perfilEstudiante[0]?.foto}</img>
                                    </button>
                                </div>

                                {isUserMenuOpen && (
                                    <div
                                        className="absolute right-5 mt- w-48 bg-slate-800  divide-y divide-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:divide-gray-700"
                                        style={{ top: '100%' }}
                                    >
                                        <div className="px-4 py-3">
                                            <p className="text-sm text-slate-300 ">{perfilEstudiante[0]?.nombres} {perfilEstudiante[0]?.apellido_p} {perfilEstudiante[0]?.apellido_m}</p>
                                            {/**   <p className="text-sm  text-gray-900 dark:text-gray-300">{perfilEstudiante[0]?.correo}</p> */}
                                            <p className="text-sm font-medium text-slate-300 dark:text-gray-300">{perfilEstudiante[0]?.tipoEstancia}</p>
                                        </div>
                                        <ul className="py-1 text-sm text-slate-300 dark:text-gray-300" aria-labelledby="user-menu-button">
                                            <li>
                                                <button className="w-full block px-4 py-2 rounded-lg hover:bg-slate-700 dark:hover:bg-gray-600"
                                                    onClick={redireccionarPerfil}
                                                >
                                                    Ver Perfil
                                                </button>
                                            </li>
                                            <li>
                                                <button className="w-full block px-4 py-2 rounded-lg hover:bg-slate-700 dark:hover:bg-gray-600 "
                                                    onClick={redireccionarEditar}
                                                >
                                                    Editar Perfil
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={cerrarSesion} className="w-full block px-4 py-2 rounded-lg hover:bg-slate-700 dark:hover:bg-gray-600">
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
                                className="flex items-center justify-between w-full p-2 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-slate-300 group"
                            >
                                <span className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                        <path fill-rule="evenodd" d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Z" clip-rule="evenodd" />
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
                                        <button className="block p-2 rounded-lg text-slate-300 dark:text-white hover:bg-slate-800 dark:hover:bg-slate-300 group"
                                            onClick={obtenerProyectos}
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
                                className="flex items-center justify-between w-full p-2 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-slate-300 group"
                            >
                                <span className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                        <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                                        <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
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
                                        <button className="block p-2 rounded-lg text-slate-300 dark:text-white hover:bg-slate-800 dark:hover:bg-slate-300 group"
                                            onClick={obtenerActividades}
                                        >
                                            Ver Actividades
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default SlideBarAlumnoExt