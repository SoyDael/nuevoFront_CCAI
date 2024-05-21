import React, { useEffect, useState } from 'react';
import SlideBarPruebaAlum  from '../../SlideBar/SlideBarPruebaAlumn';
import { useParams, useNavigate } from 'react-router-dom';
import { getconsultaActividadesEstudiantesPorId, getPerfilEstudiante, navbarEstudiante } from '../../../api/APIS';

import Swal from 'sweetalert2'

const PerfilActividades = () => {
    const { correo_estudiante, correo } = useParams();
    const [perfilEstudiante, setPerfilEstudiante] = useState([]);
    const [actividadesForm, setActividadesForm] = useState([]);
    const [actividad, setActividad] = useState(null)

    const navigate = useNavigate();

    const redireccionarPerfil = () => {
        navigate(`/perfilAlumno/${correo_estudiante || correo}`);
    }

    const redireccionarDetalles = () => {
        navigate(`/detallesActividad/${correo_estudiante || correo}`);
    }

    const obtenerActividades = async (e) => {
        e.preventDefault();
        try {
            const response  = await getPerfilEstudiante({correo: correo}); // Pasar solo el correo del estudiante
            const token = response.token;
            console.log(token);
            localStorage.setItem('token', token);

            const actividades = await getconsultaActividadesEstudiantesPorId(correo);
            setActividadEstudiante(actividades);

            redireccionarDetalles();
        } catch (error) {
            console.log('Error al obtener actividades:', error);
            console.error('Error al obtener actividades:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al obtener actividades. Por favor, inténtalo de nuevo."
              });
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
            <SlideBarPruebaAlum  />
            <div className="flex justify-center items-center h-screen bg-slate-400 pt-12 ">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-slate-800 border dark:bg-gray-800 border-gray-700  rounded-xl  shadow-blue-500/50  ">
                    <h1 className="font-bold text-lg text-slate-300 text-center p-6 uppercase "> Bienvenido(a) tus actividades son: </h1>
                    <section>
                        <div>
                            <table className="w-full text-sm text-left rtl:text-right  text-gray-400 ">
                                <thead className="text-xs  uppercase dark:bg-slate-400 bg-opacity-20 text-blue-600">
                                    <tr className=''>
                                        <th scope='col' className="px-40 py-3 border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase">Actividad</th>
                                        <th scope='col' className="px-20 py-3 border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase">Correo </th>
                                        <th scope='col' className="px-6 py-3 border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase">Numero de proyecto </th>
                                        <th scope='col' className="px-1 py-3 border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase">Detalles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {actividadesForm.map((actividad) => (
                                        <tr key={actividad.id_actividad} className=" dark:bg-indigo-50 border-b dark:border-gray-700 ">
                                            <td scope='row' className="px-0 py-4 font-medium text-gray-300  dark:text text-transform: uppercase">{actividad.actividad}</td>
                                            <td scope='row' className="px-10 py-4 font-medium text-gray-300 whitespace-nowrap dark:text">{actividad.correo_estudiante}</td>
                                            <td scope='row' className="px-20 py-4 font-medium text-gray-300 whitespace-nowrap dark:text">{actividad.id_proyecto}</td>
                                            <td scope='row' className="px-10 py-4 font-medium  text-gray-300 whitespace-nowrap dark:text-gray-300">
                                                <button onClick={redireccionarDetalles}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
</svg>
</button>
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
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
  
</svg>


                        </button>
                 
                    </div>
                    <br></br>
                </div>
            </div>
        </>
    );
};

export default PerfilActividades;