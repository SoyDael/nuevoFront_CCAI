import React, { useEffect, useState } from 'react'
import { getProyecto } from '../../../api/APIS'
import { useNavigate, useParams } from 'react-router-dom'
import SlideBarPruebaAlumn from '../../SlideBar/SlideBarPruebaAlumn'

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
            <SlideBarPruebaAlumn />
            <br />
            <br />


            <div className='relative w-full bg-slate-700 flex items-center justify-center min-h-screen from-gray-700 via-gray-800 to-gray-900'>
                <div className='rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50 '>
                    <div className='max-w-md mx-auto space-y-6'>


                        <b className='text-teal-100'>Detalles del Proyecto</b>

                        <div className='text-base leading-7'>
                            <p className='text-teal-400 '>Titulo: </p>
                            <p className='font-medium text-white'>{Proyecto[0]?.titulo_esp}</p>

                        </div>
                        <div className='text-base leading-7'>
                            <p className='text-teal-400 '>Objetivo:  </p>
                            <p className='font-medium text-white'>{Proyecto[0]?.objetivo} </p>

                        </div>
                        <div className='text-base leading-7'>
                            <p className='text-teal-400 '>Descripcion: </p>
                            <p className='font-medium text-white'> {Proyecto[0]?.descripcion}</p>

                        </div>
                        <div className='text-base leading-7'>
                            <p className='text-teal-400 '>Fecha de registro:  </p>
                            <p className='font-medium text-white'>{Proyecto[0]?.fecha_registro}</p>

                        </div>
                        <div className='text-base leading-7'>
                            <p className='text-teal-400 '>Fecha de inicio:</p>
                            <p className='font-medium text-white'> {Proyecto[0]?.fecha_inicio}</p>

                        </div>
                        <div className='text-base leading-7'>
                            <p className='text-teal-400 '>Fecha Fin: </p>
                            <p className='font-medium text-white'>{Proyecto[0]?.fecha_fin}</p>

                        </div>







                        <div className="flex gap-2 px-2">
                            <button
                                className="flex-1 rounded-md bg-teal-500  text-white  antialiased font-bold hover:bg-teal-700  px-4 py-2"
                                onClick={redireccionarIntegrantes}
                            >
                                Ver Integrantes
                            </button>
                            <button
                                className="flex-1 rounded-md bg-teal-500  text-white  antialiased font-bold hover:bg-teal-700  px-4 py-2"
                            >
                                Agregar Integrante
                            </button>
                            <button
                                className="flex-1 rounded-md bg-teal-500  text-white  antialiased font-bold hover:bg-teal-700  px-4 py-2"
                            >
                                Editar
                            </button>
                            <button
                                className="flex-1 rounded-md bg-teal-500  text-white  antialiased font-bold hover:bg-teal-700  px-4 py-2"
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