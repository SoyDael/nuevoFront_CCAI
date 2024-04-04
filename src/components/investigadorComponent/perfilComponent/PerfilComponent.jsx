import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../navbarComponents/Navbar'

import { PerfilInvestigador } from '../../../api/APIS'

const PerfilComponent = () => {

    const { correo } = useParams(); // Buscar El correo del investigador

    /// Hooks Personalizados 
    const [perfilInvestigador, setPerfilInvestigador] = useState([]); // Estado para almacenar el perfil del investigador

    const navigate = useNavigate();

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
            <Navbar />
            <div class="flex justify-center items-center h-screen bg-slate-100 bg-slate-100 bg-opacity-20 pt-12">
                <div class=" mx-auto bg-white bg-indigo-200 bg-opacity-30 rounded-lg overflow-hidden shadow-lg">
                    <div class="border-b px-4 pb-6">
                        <div class="text-center my-4">
                            <img class="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4" src="" alt="" >{ }</img>
                            <div class="py-2">
                                <h3 class="font-bold text-2xl text-gray-800 dark:text-dark mb-1">Bienvenido <br></br> {perfilInvestigador[0]?.nombres} {perfilInvestigador[0]?.apellido_p} {perfilInvestigador[0]?.apellido_m}</h3>
                                <br></br>
                                <div class="inline-flex text-gray-700 dark:text-gray-300 items-center">
                                    <h3 class="text-2xl text-gray-800 dark:text-dark mb-1">Titulo: <br></br> {perfilInvestigador[0]?.titulo}</h3>
                                </div>
                            </div>
                            <div class="py-2 items-center">
                                <div class="inline-flex justify-center text-gray-700 dark:text-gray-300 items-center">
                                    <h3 class="text-2xl text-gray-800 dark:text-dark mb-1">Correo:  <br></br> {perfilInvestigador[0]?.correo}</h3>
                                </div>
                            </div>
                            <div class="py-2 items-center">
                                <div class="inline-flex justify-center text-gray-700 dark:text-gray-300 items-center">
                                    <h3 class="text-2xl text-gray-800 dark:text-dark mb-1">Telefono:<br></br> {perfilInvestigador[0]?.telefono}</h3>
                                </div>
                            </div>
                        </div>
                        <div class="flex gap-2 px-2">
                            <button
                                class="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
                            >
                                Ver Integrantes
                            </button>
                            <button
                                class="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
                            >
                                Ver Solicitudes
                            </button>
                            <button
                                class="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
                            >
                                Ver Proyectos
                            </button>
                            <button
                                class="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
                            >
                                Registrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default PerfilComponent