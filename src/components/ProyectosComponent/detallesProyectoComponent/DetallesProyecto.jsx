import React, { useEffect, useState } from 'react'
import { getProyecto } from '../../../api/APIS'
import { useNavigate, useParams } from 'react-router-dom'
import SlideBarPruebaAlumn from '../../SlideBar/SlideBarPruebaAlumn';
import SlideBarInvestigadores from '../../SlideBar/SlideBarInvestigadores';


const DetallesProyecto = () => {

    const navigate = useNavigate();
    const { id_proyecto } = useParams();
    const { correo, proyecto_id, coordinador_correo, correo_investigador } = useParams();

    const [Proyecto, setProyecto] = useState([]); // Estado para almacenar el perfil del investigador

    const redireccionarPerfil = () => {
        navigate(`/perfilInvestigador/${correo}`);
    }

    const redireccionarIntegrantes = () => {
        navigate(`/integrantes/${id_proyecto}/${correo}`);
    }

    const redireccionarProyectos = () => {
        navigate(`/proyectos/${correo || coordinador_correo || correo_investigador}`);
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

    const [showModal, setShowModal] = useState(false);



    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <>
            <SlideBarInvestigadores />
            <div className="flex justify-center items-center h-screen bg-slate-700">
                {showModal && (
                    <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">Descripcion</h1>
                            <p className="mb-3 font-normal text-gray-700">{Proyecto[0]?.descripcion}</p>
                            <button onClick={toggleModal} className="text-sm font-medium text-white bg-indigo-700 rounded-lg py-1 px-3">Cerrar</button>
                        </div>
                    </div>
                )}
                <div className="max-w-lg border border-slate-900 rounded-lg bg-slate-900 dark:border-slate-700 flex justify-center items-center">
                    <div className="p-5 text-center">
                        <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-300">Detalles del Proyecto</h1>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-300">Titulo: {Proyecto[0]?.titulo_esp}</h5>
                        <p className="mb-3 font-normal  text-gray-200">Objetivo: {Proyecto[0]?.objetivo}</p>
                        <p className="mb-3 font-normal  text-gray-200"> Descripcion: {Proyecto[0]?.descripcion.substring(0, 100)}...</p>
                        <div className="flex justify-center">
                            <button onClick={toggleModal} className="text-sm font-medium text-white bg-indigo-700 rounded-lg py-1 px-5 hover:bg-indigo-800 dark:hover:bg-indigo-900 ">Leer más</button>
                        </div>
                        <p className="mb-3 font-normal  text-gray-200 mt-2">Fecha de Registro: {Proyecto[0]?.fecha_registro}</p>
                        <p className="mb-3 font-normal  text-gray-200">Fecha de Inicio: {Proyecto[0]?.fecha_inicio}</p>
                        <p className="mb-3 font-normal  text-gray-200">Fecha de Fin: {Proyecto[0]?.fecha_fin}</p>
                        <p className="mb-3 font-normal text-gray-200">Estatus: {Proyecto[0]?.estatus}</p>

                        <div class="flex gap-2 px-2">
                            <button
                                class="flex-1 rounded-full bg-indigo-700 text-white dark:text-white antialiased font-bold hover:bg-indigo-800 dark:hover:bg-indigo-900 px-4 py-2"
                             onClick={redireccionarIntegrantes}
                            >
                                Ver Integrantes
                            </button>
                            <button
                                class="flex-1 rounded-full bg-indigo-700 text-white dark:text-white antialiased font-bold hover:bg-indigo-800 dark:hover:bg-indigo-900 px-4 py-2"
                            >
                                Editar
                            </button>
                            <button
                                class="flex-1 rounded-full bg-indigo-700 text-white dark:text-white antialiased font-bold hover:bg-indigo-800 dark:hover:bg-indigo-900 px-4 py-2"
                            onClick={redireccionarProyectos}
                            >
                                Regresar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
                

        </>
    )
}

export default DetallesProyecto


{/**

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
            </div>*/}