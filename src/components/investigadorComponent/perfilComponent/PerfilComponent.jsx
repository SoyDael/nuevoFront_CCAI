import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBarInvestigador from '../../SlideBar/SlideBarPruebaAlumn'

import { PerfilInvestigador } from '../../../api/APIS'

const PerfilComponent = () => {

    const { correo } = useParams(); // Buscar El correo del investigador

    /// Hooks Personalizados 
    const [perfilInvestigador, setPerfilInvestigador] = useState([]); // Estado para almacenar el perfil del investigador

    const navigate = useNavigate();

    const redireccionarProyectos = () => {
        navigate(`/proyectos/${correo}`);
    }

    const redireccionar = () => {
        navigate(`/usuario`);
    }

    const redireccionarAlumnoInterno = () => {
        navigate(`/alumnoInterno`);
    }

const redireccionarListadoAlumnos = () => {
        navigate(`/listadoAlumnos/${correo}`);
    }

    useEffect(() => {
        const fetchPerfilInvestigador = async () => {
            try {
                const perfil = await PerfilInvestigador(correo); // Obtener el perfil del investigador
                console.log(perfil);
                setPerfilInvestigador(perfil); // Almacena el perfil del investigador en el estado
            } catch (error) {
                console.error('Error al obtener perfil:', error);
                alert('Error al obtener perfil. Por favor, inténtalo de nuevo.');
            }
        };
        fetchPerfilInvestigador();
    }, [correo])

    return (
        <>
            <NavBarInvestigador />
            <div className="flex justify-center items-center h-screen bg-slate-100 bg-slate-100 bg-opacity-20 pt-12">
                <div className=" mx-auto bg-white bg-indigo-200 bg-opacity-30 rounded-lg overflow-hidden shadow-lg">
                    <div className="border-b px-4 pb-6">
                        <div className="text-center my-4">
                            <img className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4" src="" alt="" >{ }</img>
                            <div className="py-2">
                                <h3 className="font-bold text-2xl text-gray-800 dark:text-dark mb-1">Bienvenido <br></br> {perfilInvestigador[0]?.nombres} {perfilInvestigador[0]?.apellido_p} {perfilInvestigador[0]?.apellido_m}</h3>
                                <br></br>
                                <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                                    <h3 className="text-2xl text-gray-800 dark:text-dark mb-1">Titulo: <br></br> {perfilInvestigador[0]?.titulo}</h3>
                                </div>
                            </div>
                            <div className="py-2 items-center">
                                <div className="inline-flex justify-center text-gray-700 dark:text-gray-300 items-center">
                                    <h3 className="text-2xl text-gray-800 dark:text-dark mb-1">Correo:  <br></br> {perfilInvestigador[0]?.correo}</h3>
                                </div>
                            </div>
                            <div className="py-2 items-center">
                                <div className="inline-flex justify-center text-gray-700 dark:text-gray-300 items-center">
                                    <h3 className="text-2xl text-gray-800 dark:text-dark mb-1">Telefono:<br></br> {perfilInvestigador[0]?.telefono}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 px-2">
                            <button
                                className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
                            onClick={redireccionarListadoAlumnos}
                            >
                                Ver Alumnos Internos
                            </button>
                            <button
                                className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
                            onClick={redireccionarProyectos}
                            >
                                Ver Proyectos
                            </button>
                            <button
                                className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
                                onClick={redireccionar}
                            >
                                Registrar Usuario
                            </button>
                            <button
                                className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
                                onClick={redireccionarAlumnoInterno}
                            >
                                Registrar Alumno Interno
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PerfilComponent