import React, { useEffect, useState } from 'react'
import SlideBarPruebaAlumn from '../../../SlideBar/SlideBarPruebaAlumn'
import { getProyecto } from '../../../../api/APIS'
import { useParams, useNavigate } from 'react-router-dom'

const DetallesProyectoAlumno = () => {

    const { correo_estudiante, correo, id_proyecto, proyecto_id } = useParams();
    const [proyecto, setProyecto] = useState([]);

    const navigate = useNavigate();

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
        <>
            <SlideBarPruebaAlumn />
            <div className="flex justify-center items-center h-screen bg-slate-400">
                {showModal && (
                    <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Descripcion</h1>
                            <p className="mb-3 font-normal text-gray-700">{proyecto[0]?.descripcion}</p>
                            <button onClick={toggleModal} className="text-sm font-medium text-white bg-blue-700 rounded-lg py-1 px-3">Cerrar</button>
                        </div>
                    </div>
                )}
                <div className="max-w-lg border border-slate-900 rounded-lg bg-slate-700 dark:border-slate-700 flex justify-center items-center">
                    <div className="p-5 text-center">
                        <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-slate-300">Detalles del Proyecto</h1>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-slate-300">Titulo: {proyecto[0]?.titulo_esp}</h5>
                        <p className="mb-3 font-normal text-gray-700 text-gray-400">Objetivo: {proyecto[0]?.objetivo}</p>
                        <p className="mb-3 font-normal text-gray-700 text-gray-400"> Descripcion: {proyecto[0]?.descripcion.substring(0, 100)}...</p>
                        <div className="flex justify-center">
                            <button onClick={toggleModal} className="text-sm font-medium text-white bg-blue-700 rounded-lg py-1 px-5 ">Leer más</button>
                        </div>
                        <p className="mb-3 font-normal text-gray-700 text-gray-400 mt-2">Fecha de Registro: {proyecto[0]?.fecha_registro}</p>
                        <p className="mb-3 font-normal text-gray-700 text-gray-400">Fecha de Inicio: {proyecto[0]?.fecha_inicio}</p>
                        <p className="mb-3 font-normal text-gray-700 text-gray-400">Fecha de Fin: {proyecto[0]?.fecha_fin}</p>
                        <p className="mb-3 font-normal text-gray-700 text-gray-400">Estatus: {proyecto[0]?.estatus}</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default DetallesProyectoAlumno