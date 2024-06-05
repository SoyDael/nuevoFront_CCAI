import React, { useEffect, useState } from 'react'
import Navbar from '../../../navbarComponents/Navbar'
import { getconsultaActividadesEstudiantesPorId } from '../../../../api/APIS'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import SlideBarPruebaAlumn from '../../../SlideBar/SlideBarPruebaAlumn'


const DetallesActividades = () => {

    const { correo_estudiante, correo } = useParams();
    const [actividadesForm, setActividadesForm] = useState([]);

    const navigate = useNavigate();

    const redireccionarPerfil = () => {
        navigate(`/perfilActividades/${correo_estudiante || correo}`);
    }

    useEffect(() => {
        const fetchActividades = async () => {
            try {
                const actividades = await getconsultaActividadesEstudiantesPorId(correo_estudiante);
                console.log(actividades);
                setActividadesForm(actividades);
            } catch (error) {
                console.error('Error al obtener actividades:', error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error al obtener actividades. Por favor, inténtalo de nuevo."
                  });
            }
        };

        fetchActividades();
    }, [correo_estudiante, correo]);

    return (
        <>
            <SlideBarPruebaAlumn />
            <div className="flex justify-center items-center h-screen  bg-slate-400  from-gray-700 via-gray-800 to-gray-900">
                <div className="relative overflow-x-auto  sm:rounded-lg  bg-slate-800 shadow-lg shadow-blue-500/100 ">
                    <h1 className="border-blue-gray-100 bg-blue-gray-50/50 font-medium text-lg text-white text-center p-4">Detalles de actividad: </h1>
                    <section>
                        <div>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs  text-slate-400 uppercase dark:bg-indigo-50 bg-opacity-20 dark:text-gray-400">
                                    <tr className=''>

                                        <th scope='col' className="px-0 py-3 border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase">Actividad</th>
                                        <th scope='col' className="px-6 py-3 border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase">Fecha Inicio</th>
                                        <th scope='col' className="px-10 py-3 border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase">Observaciones</th>
                                        <th scope='col' className="px-1 py-3 border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase">Semestre </th>
                                        <th scope='col' className="px-5 py-3 border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase">Fecha Fin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {actividadesForm.map((actividad) => (
                                        <tr key={actividad.id_actividad} className=" dark:bg-indigo-50 border-b dark:border-gray-700">
                                            <td scope='row' className="px-0 py-4 font-medium text-gray-300 text-transform: uppercase">{actividad.actividad}</td>
                                            <td scope='row' className="px-10 py-4 font-medium text-gray-300 whitespace-nowrap dark:text">{actividad.fecha_inicio}</td>
                                            <td scope='row' className="px-10 py-4 font-medium text-gray-300 ">{actividad.observaciones}</td>
                                            <td scope='row' className="px-1 py-4 font-medium text-gray-300 whitespace-nowrap dark:text text-transform: uppercase">{actividad.semestre}</td>
                                            <td scope='row' className="px-5 py-4 font-medium text-gray-300 whitespace-nowrap dark:text">{actividad.fecha_fin}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <div className="flex justify-center mt-4">
                        <button
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2"
                            onClick={redireccionarPerfil}
                        >
                            Regresar
                        </button>
                    </div>
                    <br></br>
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