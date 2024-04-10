import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { participanteProyecto } from '../../../api/APIS'

const Integrantes = () => {

    const navigate = useNavigate();
    const { id_proyecto, id_estudiante } = useParams();
    const { correo, correo_estudiante } = useParams();

    const [Participante, setParticipante] = useState([]); // Estado para almacenar el perfil del investigador

    const redireccionarDetallesProyecto = () => {
        navigate(`/detallesProyecto/${id_proyecto}/${correo}`);
    }

    const redireccionarAsignarActividad = (id_estudiante, correo_estudiante) => {
        navigate(`/asignarActividad/${id_proyecto}/${correo}/${id_estudiante}/${correo_estudiante}`);
    }

    useEffect(() => {
        const fetchParticipante = async () => {
            try {
                const participante = await participanteProyecto(id_proyecto); // Obtener el proyecto por ID
                console.log(participante);
                setParticipante(participante); // Almacena el proyecto en el estado
            } catch (error) {
                console.error('Error al obtener proyecto:', error);
                alert('Error al obtener proyecto. Por favor, inténtalo de nuevo.');
            }
        };
        fetchParticipante();
    }, [id_proyecto])

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <h1 className="font-serif text-lg text-gray-2500 text-center p-6">Bienvenido { } { } { } los integrantes del proyecto son: </h1>
                    <section>
                        <div>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase dark:bg-indigo-50 bg-opacity-20 dark:text-gray-400">
                                    <tr className=''>
                                        <th scope='col' className="px-6 py-3">Nombres</th>
                                        <th scope='col' className="px-6 py-3">Apellido Paterno</th>
                                        <th scope='col' className="px-6 py-3">Apellido Paterno</th>
                                        <th scope='col' className="px-6 py-3">Tipo de Programa</th>
                                        <th scope='col' className="px-10 py-3">Detalles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Participante.map((participante) => (
                                        <tr key={participante.id_estudiante} className=" dark:bg-indigo-50 border-b dark:border-gray-700">
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text text-transform: uppercase ">{participante.nombres}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text text-transform: uppercase">{participante.apellido_p}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text text-transform: uppercase">{participante.apellido_m}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text text-transform: uppercase">{participante.tipo}</td>
                                            <td scope='row' className="px-10 py-4 font-medium text-blue-600 dark:text-blue-500">
                                                <button onClick={() => redireccionarAsignarActividad(participante.id_estudiante, participante.correo_estudiante)}>Asignar Actividad</button>
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
                            onClick={redireccionarDetallesProyecto}
                        >
                            Regresar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Integrantes
