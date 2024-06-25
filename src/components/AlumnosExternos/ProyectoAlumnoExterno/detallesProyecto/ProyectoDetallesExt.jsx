import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { proyectosEstancia, getProyecto, ParticipantePorProyecto } from '../../../../api/APIS';
import SlideBarAlumnoExt from '../../../SlideBar/SlideBarAlumExt';


const ProyectoDetallesExt = () => {

    const { correo, residente_correo, correo_estancia_residente, id_proyecto } = useParams();
    const [proyecto, setProyecto] = useState([]);

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

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div>
            <>
                <SlideBarAlumnoExt />
                <div className="flex justify-center items-center h-screen bg-slate-400">
                    {showModal && (
                        <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                                <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">Descripcion</h1>
                                <p className="mb-3 font-normal text-gray-700">{proyecto[0]?.descripcion}</p>
                                <button onClick={toggleModal} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Cerrar</button>
                            </div>
                        </div>
                    )}
                    <div className="max-w-lg border border-slate-900 rounded-lg bg-slate-700 dark:border-slate-700 flex justify-center items-center">
                        <div className="p-5 text-center">
                            <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-300">Detalles del Proyecto</h1>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-300">Titulo: {proyecto[0]?.titulo_esp}</h5>
                            <p className="mb-3 font-normal  text-gray-200">Objetivo: {proyecto[0]?.objetivo}</p>
                            <p className="mb-3 font-normal  text-gray-200"> Descripcion: {proyecto[0]?.descripcion.substring(0, 100)}...</p>
                            <div className="flex justify-center">
                                <button onClick={toggleModal} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2 ">Leer más</button>
                            </div>
                            <p className="mb-3 font-normal  text-gray-200 mt-2">Fecha de Registro: {proyecto[0]?.fecha_registro}</p>
                            <p className="mb-3 font-normal  text-gray-200">Fecha de Inicio: {proyecto[0]?.fecha_inicio}</p>
                            <p className="mb-3 font-normal  text-gray-200">Fecha de Fin: {proyecto[0]?.fecha_fin}</p>
                            <p className="mb-3 font-normal text-gray-200">Estatus: {proyecto[0]?.estatus}</p>

                        </div>
                    </div>
                </div>

            </>
        </div>
    )
}

export default ProyectoDetallesExt