import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { proyectosInvestigador, getProyecto } from '../../api/APIS';


const Proyectos = () => {

    const { correo, id_proyecto } = useParams(); // Buscar El correo del investigador y el id del proyecto
    const [Proyecto, setProyecto] = useState([]); // Estado para almacenar el perfil del investigador

    const navigate = useNavigate();

    const redireccionarPerfil = () => {
        navigate(`/perfilInvestigador/${correo}`);
    }

    const redireccionarDetallesProyecto = (id_proyecto) => {
        navigate(`/detallesProyecto/${id_proyecto}/${correo}`);

    }

    const obtenerProyecto = async (id_proyecto) => {
        try {
            const response = await getProyecto({ id_proyecto: id_proyecto }); // Obtener el proyecto por ID
            const token = response.token;
            console.log(token);
            localStorage.setItem('token', token);

            const proyecto = await proyectosInvestigador(id_proyecto);
            console.log(proyecto);
            setProyecto(proyecto); // Almacena el proyecto en el estado

            redireccionarDetallesProyecto(id_proyecto);
        } catch (error) {
            console.error('Error al obtener proyecto:', error);
            alert('Error al obtener proyecto. Por favor, inténtalo de nuevo.');
        }
    }


    useEffect(() => {
        const fetchProyectos = async () => {
            try {
                const proyectos = await proyectosInvestigador(correo); // Obtener los proyectos del investigador
                console.log(proyectos);
                setProyecto(proyectos); // Almacena los proyectos del investigador en el estado
            } catch (error) {
                console.error('Error al obtener proyectos:', error);
                alert('Error al obtener proyectos. Por favor, inténtalo de nuevo.');
            }
        };
        fetchProyectos();
    }, [correo]);

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <h1 className="font-serif text-lg text-gray-2500 text-center p-6">Bienvenido {Proyecto[0]?.nombres} {Proyecto[0]?.apellido_p} {Proyecto[0]?.apellido_m} los proyectos que coordinas son: </h1>
                    <section>
                        <div>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase dark:bg-indigo-50 bg-opacity-20 dark:text-gray-400">
                                    <tr className=''>
                                        <th scope='col' className="px-6 py-3">Nombre del Proyecto</th>
                                        <th scope='col' className="px-6 py-3">Estatus</th>
                                        <th scope='col' className="px-6 py-3">Fecha de Registro</th>
                                        <th scope='col' className="px-6 py-3">Fecha de Inicio</th>
                                        <th scope='col' className="px-1 py-3">Detalles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Proyecto.map((proyecto) => (
                                        <tr className=" dark:bg-indigo-50 border-b dark:border-gray-700">
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text">{proyecto.titulo_esp}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text">{proyecto.estatus}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text">{proyecto.fecha_registro}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text">{proyecto.fecha_inicio}</td>
                                            <td scope='row' className="px-10 py-4 font-medium text-blue-600 dark:text-blue-500">
                                                <button
                                                    onClick={() => redireccionarDetallesProyecto(proyecto.id_proyecto)}
                                                >Ver Detalles</button>
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
                                onClick={redireccionarPerfil}
                            >
                                Regresar
                            </button>
                        </div>
                        <div>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                
                            >
                                Registrar nuevo proyecto
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Proyectos