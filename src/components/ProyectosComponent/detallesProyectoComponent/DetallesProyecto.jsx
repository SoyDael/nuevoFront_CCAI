import React, { useEffect, useState }  from 'react'
import { getProyecto } from '../../../api/APIS'
import { useNavigate, useParams } from 'react-router-dom'


const DetallesProyecto = () => {

    const navigate = useNavigate();
    const { id_proyecto } = useParams();
    const { correo, proyecto_id } = useParams();

    const [Proyecto, setProyecto] = useState([]); // Estado para almacenar el perfil del investigador

    const redireccionarPerfil = () => {
        navigate(`/perfilInvestigador/${correo}`);
    }

    const redireccionarIntegrantes = () => {
        navigate(`/integrantes/${id_proyecto}/${correo}`);
    }

    useEffect(() => {
        const fetchProyecto = async () => {
            try {
                const proyecto = await getProyecto(id_proyecto); // Obtener el proyecto por ID
                console.log(proyecto);
                setProyecto(proyecto); // Almacena el proyecto en el estado
            } catch (error) {
                console.error('Error al obtener proyecto:', error);
                alert('Error al obtener proyecto. Por favor, inténtalo de nuevo.');
            }
        };
        fetchProyecto();
    }, [id_proyecto])

    return (
    <>
            
            <div class="flex justify-center items-center h-screen bg-slate-100 bg-slate-100 bg-opacity-20 pt-12">
                <div class=" mx-auto bg-white bg-indigo-200 bg-opacity-30 rounded-lg overflow-hidden shadow-lg">
                    <div class="border-b px-4 pb-6">
                        <div class="text-center my-4">
                            <div class="py-2">
                            <br></br>
                                <h3 class="font-bold text-2xl text-gray-800 dark:text-dark mb-1">Detalles Proyecto <br></br> {} {} {}</h3>
                                <br></br>
                                <div class="inline-flex text-gray-700 dark:text-gray-300 items-center">
                                    <h3 class="text-2xl text-gray-800 dark:text-dark mb-1 font-bold">Titulo: <br></br> {Proyecto[0]?.titulo_esp}</h3>
                                </div>
                            </div>
                            <div class="py-2 items-center">
                                <div class="inline-flex justify-center text-gray-700 dark:text-gray-300 items-center">
                                    <h3 class="text-2xl text-gray-800 dark:text-dark mb-1">Objetivo:  <br></br> {Proyecto[0]?.objetivo}</h3>
                                </div>
                            </div>
                            <div class="py-2 items-center">
                                <div class="inline-flex justify-center text-gray-700 dark:text-gray-300 items-center">
                                    <h3 class="text-2xl text-gray-800 dark:text-dark mb-1">Descripcion:<br></br> {Proyecto[0]?.descripcion}</h3>
                                </div>
                            </div>
                            <div class="py-2 items-center">
                                <div class="inline-flex justify-center text-gray-700 dark:text-gray-300 items-center">
                                    <h3 class="text-2xl text-gray-800 dark:text-dark mb-1">Fecha de registro:<br></br> {Proyecto[0]?.fecha_registro}</h3>
                                </div>
                            </div>
                            <div class="py-2 items-center">
                                <div class="inline-flex justify-center text-gray-700 dark:text-gray-300 items-center">
                                    <h3 class="text-2xl text-gray-800 dark:text-dark mb-1">Fecha de inicio:<br></br> {Proyecto[0]?.fecha_inicio}</h3>
                                </div>
                            </div>
                            <div class="py-2 items-center">
                                <div class="inline-flex justify-center text-gray-700 dark:text-gray-300 items-center">
                                    <h3 class="text-2xl text-gray-800 dark:text-dark mb-1">Fecha Fin:<br></br> {Proyecto[0]?.fecha_fin}</h3>
                                </div>
                            </div>
                        </div>
                        <div class="flex gap-2 px-2">
                            <button
                                class="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
                             onClick={redireccionarIntegrantes}
                            >
                                Ver Integrantes
                            </button>
                            <button
                                class="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
                            >
                                Agregar Integrante
                            </button>
                            <button
                                class="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
                            >
                                Editar
                            </button>
                            <button
                                class="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
                            onClick={redireccionarPerfil}
                            >
                                Regresar Perfil
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default DetallesProyecto