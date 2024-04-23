import React, { useEffect, useState } from 'react';
import SlideBarPruebaAlumn from '../../SlideBar/SlideBarPruebaAlumn';
import { useParams, useNavigate } from 'react-router-dom';
import { getconsultaActividadesEstudiantesPorId, getPerfilEstudiante, navbarEstudiante } from '../../../api/APIS';

const PerfilActividades = () => {
    const { correo_estudiante, correo } = useParams();
    const [actividadesForm, setActividadesForm] = useState([]);
    const [actividad, setActividad] = useState(null)
    const [perfilEstudiante, setPerfilEstudiante] = useState(null)

    const navigate = useNavigate();

    const redireccionarPerfil = () => {
        navigate(`/perfilAlumno/${correo || correo_estudiante}`);
    }

    const redireccionarDetalles = () => {
        navigate(`/detallesActividad/${correo_estudiante}`);
    }

    const obtenerActividades = async (e) => {
        e.preventDefault();
        try {
            const response = await getPerfilEstudiante({ correo: correo }); // Pasar solo el correo del estudiante
            const token = response.token;
            redireccionarPerfil();
            console.log(token);
            localStorage.setItem('token', token);

            const actividades = await getconsultaActividadesEstudiantesPorId(correo);
            setActividadEstudiante(actividades);

            redireccionarDetalles();
        } catch (error) {
            console.log('Error al obtener actividades:', error);
        }
    }

    const obtenerPerfil = async (e) => {
        e.preventDefault();
        try {
            const response = await getPerfilEstudiante({ correo: correo }); // Pasar solo el correo del estudiante
            const token = response.token;
            console.log(token);
            localStorage.setItem('token', token);

            const perfil = await navbarEstudiante(correo);
            setPerfilEstudiante(perfil);
        } catch (error) {
            console.log('Error al obtener perfil:', error);
        }

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
            <div class="flex min-h-screen items-center justify-center bg-slate-700 from-gray-700 via-gray-800 to-gray-900">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-slate-800 shadow-lg shadow-blue-500/100">
                    <div class="">
                        <h3 className="border-blue-gray-100 bg-blue-gray-50/50 font-serif text-lg text-white text-center p-4">Bienvenido tus actividades son: </h3>
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
                                        <p class="block antialiased font-sans text-sm text-white font-normal leading-none opacity-70">Detalles</p>
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
                                            <button class="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-white hover:bg-gray-900/100 active:bg-gray-900/20" type="button"
                                                onClick={redireccionarDetalles}>
                                                <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                                    </svg>

                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            <SlideBarPruebaAlumn />
            {/** 
            <div className="flex justify-center items-center h-screen bg-slate-400 ">
                <div className="relative overflow-x-auto  sm:rounded-lg ">
                    <h1 className="font-serif text-lg text-white  text-center p-6">Bienvenido tus actividades son: </h1>
                    <section>
                        <div>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-lg shadow-blue-500/100">
                                <thead className="text-xs text-gray-700 uppercase dark:bg-slate-900 bg-opacity-20 dark:text-gray-400">
                                    <tr className=''>
                                        <th scope='col' className="px-40 py-3">Actividad</th>
                                        <th scope='col' className="px-20 py-3">Correo </th>
                                        <th scope='col' className="px-6 py-3">Numero de proyecto </th>
                                        <th scope='col' className="px-1 py-3">Detalles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {actividadesForm.map((actividad) => (
                                        <tr key={actividad.id_actividad} className="dark:bg-slate-500 border-b dark:border-gray-700">
                                            <td scope='row' className="px-0 py-4 font-medium text-gray-900  dark:text">{actividad.actividad}</td>
                                            <td scope='row' className="px-10 py-4 font-medium text-gray-900 whitespace-nowrap dark:text">{actividad.correo_estudiante}</td>
                                            <td scope='row' className="px-20 py-4 font-medium text-gray-900 whitespace-nowrap dark:text">{actividad.id_proyecto}</td>
                                            <td scope='row' className="px-10 py-4 font-medium text-blue-600 dark:text-white">
                                                <button onClick={redireccionarDetalles}>Ver Detalles</button>
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
                            onClick={redireccionarPerfil}
                        >
                            Regresar
                        </button>
                    </div>
                </div>
            </div>
              */}
        </>

    );
};

export default PerfilActividades;
