import React, { useEffect, useState } from 'react'
import { listadoAlumnos } from '../../api/APIS'
import { useNavigate, useParams } from 'react-router-dom'

const ListadoAlumnos = () => {



    const { id_estudiante, correo_estudiante } = useParams(); 
    const { correo, id_proyecto } = useParams(); // Buscar El correo del investigador y el id del proyecto
    const [alumnos, setAlumnos] = useState([]); // Estado para almacenar el perfil del investigador

    const navigate = useNavigate();

    const redireccionarPerfilInvestigador = () => {
        navigate(`/perfilInvestigador/${correo}`);
    }

    const redireccionarAsignarProyecto = (id_estudiante, correo_estudiante) => {
        navigate(`/asignarProyecto/${correo}/${id_estudiante}/${correo_estudiante}`);

    }

    const redireccionarAsignarPrograma = (id_estudiante, estudiante_correo) => {
        navigate(`/registroPrograma/${correo}/${id_estudiante}/${estudiante_correo}`);
    }

    useEffect(() => {
        const fetchAlumnos = async () => {
            try {
                const alumnos = await listadoAlumnos(correo); // Obtener los alumnos del investigador
                console.log(alumnos);
                setAlumnos(alumnos); // Almacena los alumnos del investigador en el estado
            } catch (error) {
                console.error('Error al obtener alumnos:', error);
                alert('Error al obtener alumnos. Por favor, inténtalo de nuevo.');
            }
        };
        fetchAlumnos();
    }, [correo]);

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <h1 className="font-serif text-lg text-gray-2500 text-center p-6">Bienvenido { } { } { } los alumnos aceptados son: </h1>
                    <section>
                        <div>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase dark:bg-indigo-50 bg-opacity-20 dark:text-gray-400">
                                    <tr className=''>
                                        <th scope='col' className="px-6 py-3">Matricula</th>
                                        <th scope='col' className="px-6 py-3">Nombres</th>
                                        <th scope='col' className="px-6 py-3">Correo</th>
                                        <th scope='col' className="px-6 py-3">Division</th>
                                        <th scope='col' className="px-6 py-3">Telefono</th>
                                        <th scope='col' className="px-10 py-3">Operacion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alumnos.map((alumno) => (
                                        <tr className=" dark:bg-indigo-50 border-b dark:border-gray-700">
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text">{alumno.matricula}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text">{alumno.nombres}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text">{alumno.correo}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text">{alumno.division}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text">{alumno.telefono}</td>
                                            <td scope='row' className="px-10 py-4 font-medium text-blue-600 dark:text-blue-500">
                                                <button 
                                                onClick={() => redireccionarAsignarPrograma(alumno.id_estudiante, alumno.correo)} 
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                >Registrar Programa</button>
                                            </td>
                                            <td scope='row' className="px-10 py-4 font-medium text-blue-600 dark:text-blue-500">
                                                <button 
                                                onClick={() => redireccionarAsignarProyecto(alumno.id_estudiante, alumno.correo)} 
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                >Asignar Proyecto</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <div className="flex justify-center mt-4">
                        <div className="mr-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={redireccionarPerfilInvestigador}
                            >
                                Regresar
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ListadoAlumnos