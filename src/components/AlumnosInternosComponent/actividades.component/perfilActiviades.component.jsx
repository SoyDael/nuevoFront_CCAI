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
        navigate(`/perfilAlumno/${correo}`);
    }

    const redireccionarDetalles = () => {
        navigate(`/detallesActividad/${correo_estudiante}`);
    }

    const obtenerActividades = async (e) => {
        e.preventDefault();
        try {
            const response  = await getPerfilEstudiante({correo: correo}); // Pasar solo el correo del estudiante
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
            const response  = await getPerfilEstudiante({correo: correo}); // Pasar solo el correo del estudiante
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
            <SlideBarPruebaAlumn />
            <div className="flex justify-center items-center h-screen bg-slate-900 bg-opacity-90">
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
        </>
    );
};

export default PerfilActividades;
