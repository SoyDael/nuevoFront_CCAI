import React, { useEffect, useState } from 'react'
import Navbar from '../../../navbarComponents/Navbar'
import { getconsultaActividadesEstudiantesPorId } from '../../../../api/APIS'
import { useParams, useNavigate } from 'react-router-dom'
import SlideBarPruebaAlumn from '../../../SlideBar/SlideBarPruebaAlumn'


const DetallesActividades = () => {

    const { correo_estudiante } = useParams();
    const [actividadesForm, setActividadesForm] = useState([]);

    const navigate = useNavigate();

    const redireccionarPerfil = () => {
        navigate(`/perfilActividades/${correo_estudiante}`);
    }

    useEffect(() => {
        const fetchActividades = async () => {
            try {
                const actividades = await getconsultaActividadesEstudiantesPorId(correo_estudiante);
                console.log(actividades);
                setActividadesForm(actividades);
            } catch (error) {
                console.error('Error al obtener actividades:', error);
                alert('Error al obtener actividades. Por favor, inténtalo de nuevo.');
            }
        };

        fetchActividades();
    }, [correo_estudiante]);

    return (
        <>
            <SlideBarPruebaAlumn />
            <div className="flex justify-center items-center h-screen">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-">
                    <h1 className="font-serif text-lg text-gray-2500 text-center p-6">Detalles de actividad: </h1>
                    <section>
                        <div>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase dark:bg-indigo-50 bg-opacity-20 dark:text-gray-400">
                                    <tr className=''>

                                        <th scope='col' className="px-0 py-3">Actividad</th>
                                        <th scope='col' className="px-6 py-3">Fecha Inicio</th>
                                        <th scope='col' className="px-10 py-3">Observaciones</th>
                                        <th scope='col' className="px-1 py-3">Semestre </th>
                                        <th scope='col' className="px-5 py-3">Fecha Fin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {actividadesForm.map((actividad) => (
                                        <tr key={actividad.id_actividad} className=" dark:bg-indigo-50 border-b dark:border-gray-700">
                                            <td scope='row' className="px-0 py-4 font-medium text-gray-900  dark:text">{actividad.actividad}</td>
                                            <td scope='row' className="px-10 py-4 font-medium text-gray-900 whitespace-nowrap dark:text">{actividad.fecha_inicio}</td>
                                            <td scope='row' className="px-10 py-4 font-medium text-gray-900  dark:text">{actividad.observaciones}</td>
                                            <td scope='row' className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text">{actividad.semestre}</td>
                                            <td scope='row' className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text">{actividad.fecha_fin}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <div className="flex justify-center mt-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={redireccionarPerfil}
                        >
                            Regresar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetallesActividades

{/*

 <div class="flex justify-center items-center h-screen">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <h1 class="font-serif text-lg text-gray-800 text-center">Detalles de la actividad</h1>
                    <section>
                        <div>
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th>Numero de Actividad</th>
                                        <th>Fecha de Inicio</th>
                                        <th>Actividad</th>
                                        <th>Observaciones</th>
                                        <th>Correo de Estudiante</th>
                                        <th>Tipo Programa</th>
                                        <th>Semestre</th>
                                        <th>Fecha Fin</th>
                                    </tr>
                                </thead>
                            </table>

                            <tbody>
                                {actividadesForm.map((actividad, i) => (
                                    <tr >
                                        <td>{actividad.id_actividad}</td>
                                        <td>{actividad.fecha_inicio}</td>
                                        <td>{actividad.actividad}</td>
                                        <td>{actividad.observaciones}</td>
                                        <td>{actividad.correo_estudiante}</td>
                                        <td>{actividad.tipo_programa}</td>
                                        <td>{actividad.semestre}</td>
                                        <td>{actividad.fecha_fin}</td>
                                    </tr>
                                ))}

                            </tbody>

                        </div>
                    </section>
                    <div className="flex justify-center mt-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={redireccionarPerfil}
                        >
                            Regresar
                        </button>
                    </div>
                </div>
            </div>
**/}