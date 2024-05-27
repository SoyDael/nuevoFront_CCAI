import React, { useEffect, useState } from 'react'
import SlideBarPruebaAlumn from '../../../SlideBar/SlideBarPruebaAlumn'
import { getProyecto, obtenerDocumentacionProgramaPorID } from '../../../../api/APIS'
import { useParams, useNavigate } from 'react-router-dom'

const DetallesProyectoAlumno = () => {

    const { correo_estudiante, correo, id_proyecto, proyecto_id } = useParams();
    const [proyecto, setProyecto] = useState([]);

    const navigate = useNavigate();

    const redireccionarDocumentacionproyecto = () => {
        navigate(`/documentacionProyecto/${id_proyecto}`);
    }

    const obtenerDocumentacionProyecto = async (id_proyecto) => {
        try {
            const res = await getProyecto({ id_proyecto: id_proyecto })
            const token = res.token;
            console.log(token);
            localStorage.setItem('token', token);

            const proyecto = await obtenerDocumentacionProgramaPorID(id_proyecto)
            console.log(proyecto)
            setProyecto(proyecto);

            redireccionarDocumentacionproyecto(id_proyecto)
        } catch (error) {
            console.error('Error al obtener proyecto:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al obtener proyecto. Por favor, inténtalo de nuevo."
            });
        }
    }

    useEffect(() => {
        const fetchProyecto = async () => {
            try {
                const proyecto = await getProyecto(id_proyecto);
                console.log(proyecto);
                setProyecto(proyecto);
            } catch (error) {
                console.error('Error al obtener actividades:', error);
                alert('Error al obtener actividades. Por favor, inténtalo de nuevo.');
            }
        };
        fetchProyecto();
    }, []);

    const [showModal, setShowModal] = useState(false);

    const [showModal2, setShowModal2] = useState(false);


    const toggleModal = () => {
        setShowModal(!showModal);
    };


    const toggleModal2 = () => {
        setShowModal2(!showModal2);
    };

    return (
        <>
            <SlideBarPruebaAlumn />
            <div className="flex justify-center items-center h-screen bg-slate-400">
                {showModal && (
                    <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">Descripcion</h1>
                            <p className="mb-3 font-normal text-gray-700">{proyecto[0]?.descripcion}</p>
                            <button onClick={toggleModal} className="text-sm font-medium text-white bg-blue-700 rounded-lg py-1 px-3">Cerrar</button>
                        </div>
                    </div>
                )}
                {/**  Form para añadir documentacion al proyecto */}
                {showModal2 && (
                    <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                            <section className="bg-white dark:bg-gray-900">
                                <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Documentacion</h2>
                                    <form >
                                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                                            <div className="sm:col-span-2">
                                                <div className="flex flex-col">
                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                                                    <div className="flex items-center">
                                                        <input
                                                            type="text"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                            placeholder="Nombre"
                                                            required=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="sm:col-span-2">
                                                <label htmlFor="correo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
                                                <input type="email"
                                                    name="correo"
                                                    id="correo"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Correo"
                                                    required="" />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
                                                <textarea id="descripcion"
                                                    rows="8"
                                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Agrega tu descripcion aqui" ></textarea>
                                            </div>


                                            <div className="w-full">
                                                <label htmlFor="file-upload" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sube tu evidencia</label>
                                                <div className="flex items-center">
                                                    <label htmlFor="file-upload" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600">
                                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 100-4 2 2 0 000 4zM3 21a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-4l-3-3-3 3H5a2 2 0 00-2 2v12zm5-10a3 3 0 110 6 3 3 0 010-6z"></path></svg>
                                                        <span>Seleccionar Archivo</span>
                                                        <input id="file-upload" name="image" type="file" className="sr-only" accept='.docx, .doc' />
                                                    </label>
                                                    <span className="text-gray-500 dark:text-gray-400"></span>
                                                </div>
                                            </div>
                                        </div>

                                        {/**                     <div className="flex items-center space-x-4">
                        <button type="submit" className="text-dark bg-slate-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        
                        >
                            Actualizar
                        </button>
                        
                    </div>
                    */}
                                    </form>
                                </div>
                            </section>
                            <button onClick={toggleModal2} className="text-sm font-medium text-white bg-blue-700 rounded-lg py-1 px-3">Cerrar</button>
                        </div>
                    </div>
                )}

                {/** Termina Formulario */}

                <div className="max-w-lg border border-slate-900 rounded-lg bg-slate-700 dark:border-slate-700 flex justify-center items-center">
                    <div className="p-5 text-center">
                        <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-300">Detalles del Proyecto</h1>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-300">Titulo: {proyecto[0]?.titulo_esp}</h5>
                        <p className="mb-3 font-normal  text-gray-200">Objetivo: {proyecto[0]?.objetivo}</p>
                        <p className="mb-3 font-normal  text-gray-200"> Descripcion: {proyecto[0]?.descripcion.substring(0, 100)}...</p>
                        <div className="flex justify-center">
                            <button onClick={toggleModal} className="text-sm font-medium text-white bg-blue-700 rounded-lg py-1 px-5 ">Leer más</button>
                        </div>
                        <p className="mb-3 font-normal  text-gray-200 mt-2">Fecha de Registro: {proyecto[0]?.fecha_registro}</p>
                        <p className="mb-3 font-normal  text-gray-200">Fecha de Inicio: {proyecto[0]?.fecha_inicio}</p>
                        <p className="mb-3 font-normal  text-gray-200">Fecha de Fin: {proyecto[0]?.fecha_fin}</p>
                        <p className="mb-3 font-normal text-gray-200">Estatus: {proyecto[0]?.estatus}</p>
                        <div className="flex justify-center">
                            <button onClick={toggleModal2} className="text-sm font-medium text-white bg-blue-700 rounded-lg py-1 px-3 mr-4">Añadir documentación</button>
                            <button onClick={() => redireccionarDocumentacionproyecto(proyecto.id_proyecto)} className="text-sm font-medium text-white bg-blue-700 rounded-lg py-1 px-3">Ver Documentación</button>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default DetallesProyectoAlumno