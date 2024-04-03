import React from 'react'
import Navbar from '../../navbarComponents/Navbar'
import { getPerfilEstudiante, getconsultaActividadesEstudiantesPorId, ParticipantePorProyecto } from '../../../api/APIS'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PerfilAlumno = () => {

    const { correo } = useParams();
    //const { correo_estudiante } = useParams();

    const [perfilEstudiante, setPerfilEstudiante] = useState([]);
    const [actividadEstudiante, setActividadEstudiante] = useState(null);
    const [proyectoEstudiante, setProyectoEstudiante ] = useState(null);

    const navigate = useNavigate();

    const redireccionarActividades = () => {
        navigate(`/perfilActividades/${correo}`);
    }

    const redireccionarProyecto = () => {
        navigate(`/proyectoAlumnoInt/${correo}`);
    }

    const obtenerActividades = async (e) => {
        e.preventDefault();
        try {
            const response = await getPerfilEstudiante({ correo: correo }); // Pasar solo el correo del estudiante
            const token = response.token;
            console.log(token);
            localStorage.setItem('token', token);

            const actividades = await getconsultaActividadesEstudiantesPorId(correo);
            setActividadEstudiante(actividades);

            redireccionarActividades();
        } catch (error) {
            console.log('Error al obtener actividades:', error);
        }
    }

    const obtenerProyecto = async (e) => {
        e.preventDefault();
        try {
            const response = await getPerfilEstudiante({ correo: correo }); // Pasar solo el correo del estudiante
            const token = response.token;
            console.log(token);
            localStorage.setItem('token', token);

            const proyecto = await ParticipantePorProyecto(correo);
            setProyectoEstudiante(proyecto);
            console.log(proyecto)

            redireccionarProyecto();
        }catch (error) {
            console.log('Error al obtener proyecto:', error);
        }

    }

    useEffect(() => {
        const fetchPerfilEstudiante = async () => {
            try {
                const perfil = await getPerfilEstudiante(correo);
                console.log(perfil);
                setPerfilEstudiante(perfil);
            } catch (error) {
                console.error('Error al obtener perfil:', error);
                alert('Error al obtener perfil. Por favor, inténtalo de nuevo.');
            }
        };
        fetchPerfilEstudiante();
    }, [correo]);

    return (
        <>
            <Navbar />
            <div class="flex justify-center items-center h-screen bg-slate-100 bg-slate-100 bg-opacity-20 pt-12">
                <div class="max-w-sm mx-auto bg-white bg-indigo-200 bg-opacity-30 rounded-lg overflow-hidden shadow-lg">
                    <div class="border-b px-4 pb-6">
                        <div class="text-center my-4">
                            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                            <img class="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4" src="" alt="" >{perfilEstudiante[0]?.foto}</img>
                            <div class="py-2">
                                <h3 class="font-bold text-2xl text-gray-800 dark:text-dark mb-1">Bienvenido <br></br> {perfilEstudiante[0]?.nombres} {perfilEstudiante[0]?.apellido_p} {perfilEstudiante[0]?.apellido_m}</h3>
                                <br></br>
                                <div class="inline-flex text-gray-700 dark:text-gray-300 items-center">
                                    <h3 class="text-2xl text-gray-800 dark:text-dark mb-1">Division: <br></br> {perfilEstudiante[0]?.division}</h3>
                                </div>
                            </div>
                            <div class="py-2">
                                <div class="inline-flex text-gray-700 dark:text-gray-300 items-center">
                                    <h3 class="text-2xl text-gray-800 dark:text-dark mb-1">Matricula:<br></br> {perfilEstudiante[0]?.matricula}</h3>
                                </div>
                            </div>
                            <div class="py-2 items-center">
                                <div class="inline-flex justify-center text-gray-700 dark:text-gray-300 items-center">
                                    <h3 class="text-2xl text-gray-800 dark:text-dark mb-1">Correo: {perfilEstudiante[0]?.correo}</h3>
                                </div>
                            </div>
                            <div class="py-2 items-center">
                                <div class="inline-flex justify-center text-gray-700 dark:text-gray-300 items-center">
                                    <h3 class="text-2xl text-gray-800 dark:text-dark mb-1">Correo Adicional: {perfilEstudiante[0]?.correo_adicional}</h3>
                                </div>
                            </div>
                            <div class="py-2 items-center">
                                <div class="inline-flex justify-center text-gray-700 dark:text-gray-300 items-center">
                                    <h3 class="text-2xl text-gray-800 dark:text-dark mb-1">Telefono:<br></br> {perfilEstudiante[0]?.telefono}</h3>
                                </div>
                            </div>
                        </div>
                        <div class="flex gap-2 px-2">
                            <button
                                class="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
                                onClick={obtenerActividades}
                            >
                                Ver Actidades
                            </button>
                            <button
                                class="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
                                onClick={redireccionarProyecto}
                            >
                                Ver Proyecto
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default PerfilAlumno