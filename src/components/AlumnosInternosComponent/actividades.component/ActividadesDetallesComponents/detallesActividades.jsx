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
            <div class="flex min-h-screen items-center justify-center bg-slate-700 from-gray-700 via-gray-800 to-gray-900">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-slate-800  shadow-blue-500/100">
                    <div class="">
                        <h3 className="border-blue-gray-100 bg-blue-gray-50/50 font-serif text-lg text-white text-center p-4">Detalles de la actividad </h3>
                        <table class="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <p class="block antialiased font-sans text-sm text-white font-normal leading-none opacity-70">Actividad</p>
                                    </th>
                                    <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <p class="block antialiased font-sans text-sm text-white font-normal leading-none opacity-70">Num. Proyecto</p>
                                    </th>
                                    <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <p class="block antialiased font-sans text-sm text-white font-normal leading-none opacity-70">Fecha Inicio</p>
                                    </th>
                                    {/**                                 <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Status</p>
                                </th>*/}
                                    <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <p class="block antialiased font-sans text-sm text-white font-normal leading-none opacity-70">Fecha Fin</p>
                                    </th>
                                    <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <p class="block antialiased font-sans text-sm text-white font-normal leading-none opacity-70">Observaciones</p>
                                    </th>
                                    <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <p class="block antialiased font-sans text-sm text-white font-normal leading-none opacity-70">Semestre</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {actividadesForm.map((actividad) => (
                                    <tr>
                                        <td class="p-4 border-b border-blue-gray-50">
                                            <div class="flex items-center gap-3">
                                                {/**  <img src="" alt="Spotify" class="inline-block relative object-center !rounded-full w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1" /> */}
                                                <p class="block antialiased font-sans text-sm leading-normal text-white font-bold">{actividad.actividad}</p>
                                            </div>
                                        </td>
                                        <td class="p-4 border-b border-blue-gray-50">
                                            <p class="block antialiased font-sans text-sm leading-normal text-white font-normal">{actividad.id_proyecto}</p>
                                        </td>
                                        <td class="p-4 border-b border-blue-gray-50">
                                            <p class="block antialiased font-sans text-sm leading-normal text-white font-normal opacity-70">{actividad.fecha_inicio}</p>
                                        </td>
                                        {/**     <td class="p-4 border-b border-blue-gray-50">
                                    <div class="w-max">
                                        <div class="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-900 py-1 px-2 text-xs rounded-md">
                                            <span class="">paid</span>
                                        </div>
                                    </div>
                                </td> */}
                                        <td class="p-4 border-b border-blue-gray-50">
                                            <div class="flex items-center gap-3">
                                                <div class="flex flex-col">
                                                    <p class="block antialiased font-sans text-sm leading-normal text-white font-normal opacity-70">{actividad.fecha_fin}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="p-4 border-b border-blue-gray-50">
                                            <div class="flex items-center gap-3">
                                                <div class="flex flex-col">
                                                    <p class="block antialiased font-sans text-sm leading-normal text-white font-normal opacity-70">{actividad.observaciones}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="p-4 border-b border-blue-gray-50">
                                            <div class="flex items-center gap-3">
                                                <div class="flex flex-col">
                                                    <p class="block antialiased font-sans text-sm leading-normal text-white font-normal opacity-70">{actividad.semestre}</p>
                                                </div>
                                            </div>
                                        </td>
                                        {/** 
                                        <td class="p-4 border-b border-blue-gray-50">
                                            <button class="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-white hover:bg-gray-900/100 active:bg-gray-900/20" type="button"
                                                onClick={redireccionarDetalles}>
                                                <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                                    </svg>

                                                </span>
                                            </button>
                                        </td>
                                    */}

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetallesActividades

{/**
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
*/}






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