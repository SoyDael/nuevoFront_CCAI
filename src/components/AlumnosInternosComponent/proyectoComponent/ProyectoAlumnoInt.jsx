import React from 'react'
import { useEffect, useState } from 'react'
import { ParticipantePorProyecto } from '../../../api/APIS';
import { useParams } from 'react-router-dom'
import Navbar from '../../navbarComponents/Navbar'

const ProyectoAlumnoInt = () => {
    const { correo_estudiante } = useParams();
    const [Proyecto, setProyecto] = useState([]);

    useEffect(() => {
        const fetchProyecto = async () => {
            try {
                const proyecto = await ParticipantePorProyecto(correo_estudiante);
                console.log(proyecto);
                setProyecto(proyecto);
            } catch (error) {
                console.error('Error al obtener actividades:', error);
                alert('Error al obtener actividades. Por favor, inténtalo de nuevo.');
            }
        };

        fetchProyecto();
    }, [correo_estudiante]);



    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center h-screen">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <h1 className="font-serif text-lg text-gray-2500 text-center p-6">Bienvenido {Proyecto[0]?.nombres} tu proyecto asignado es: </h1>
                    <section>
                        <div>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase dark:bg-indigo-50 bg-opacity-20 dark:text-gray-400">
                                    <tr className=''>
                                        <th scope='col' className="px-6 py-3">Nombre del Proyecto</th>
                                        <th scope='col' className="px-6 py-3">Tipo de Servicio</th>
                                        <th scope='col' className="px-1 py-3">Detalles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Proyecto.map((proyecto) => (
                                        <tr key={proyecto.correo_estudiante} className=" dark:bg-indigo-50 border-b dark:border-gray-700">
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text">{proyecto.titulo_esp}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text">{proyecto.tipo}</td>
                                            <td scope='row' className="px-10 py-4 font-medium text-blue-600 dark:text-blue-500">
                                                <button>Ver Detalles</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <div className="flex justify-center mt-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"

                        >
                            Regresar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProyectoAlumnoInt