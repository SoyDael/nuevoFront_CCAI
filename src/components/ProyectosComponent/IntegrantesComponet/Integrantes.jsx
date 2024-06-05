import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { participanteProyecto, eliminarParticipante } from '../../../api/APIS';
import SlideBarInvestigadores from '../../SlideBar/SlideBarInvestigadores';

const Integrantes = () => {
    const navigate = useNavigate();
    const { id_proyecto } = useParams();
    const { correo } = useParams();

    const [participantes, setParticipantes] = useState([]); // Estado para almacenar el perfil del investigador

    const redireccionarDetallesProyecto = () => {
        navigate(`/detallesProyecto/${id_proyecto}/${correo}`);
    }

    const redireccionarAsignarActividad = (id_estudiante, correo_estudiante) => {
        navigate(`/asignarActividad/${id_proyecto}/${correo}/${id_estudiante}/${correo_estudiante}`);
    }

    const redireccionarAlumnos = () => {
        navigate(`/listadoAlumnos/${correo}`);
    }

    useEffect(() => {
        const fetchParticipante = async () => {
            try {
                const participante = await participanteProyecto(id_proyecto); // Obtener el proyecto por ID
                console.log(participante);
                setParticipantes(participante); // Almacena el proyecto en el estado
            } catch (error) {
                console.error('Error al obtener proyecto:', error);
                alert('Error al obtener proyecto. Por favor, inténtalo de nuevo.');
            }
        };
        fetchParticipante();
    }, [id_proyecto]);

    const handleEliminarParticipante = async (correo_estudiante) => {
        try {
            await eliminarParticipante(correo_estudiante); // Asegúrate de usar la función correcta de la API
            alert('Participante eliminado correctamente');

            // Actualizar el estado eliminando el participante eliminado
            const nuevosParticipantes = participantes.filter(
                (participante) => participante.correo_estudiante !== correo_estudiante
            );
            setParticipantes(nuevosParticipantes);

            // Redireccionar si es necesario
            // navigate(`/integrantes/${id_proyecto}/${correo}`);
        } catch (error) {
            console.error('Error al eliminar participante:', error);
            alert('Error al eliminar participante. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <>
            <SlideBarInvestigadores />
            <div className="flex justify-center items-center h-screen bg-slate-700">
                <div className="rounded-md relative border shadow-2xl bg-gray-800 border-gray-700 shadow-blue-500/50">
                    <h1 className="font-serif text-lg text-gray-200 text-center p-6">
                        Bienvenido, los integrantes del proyecto son:
                    </h1>
                    <section>
                        <div>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-400 uppercase dark:bg-indigo-50 bg-opacity-20 dark:text-gray-400">
                                    <tr className="">
                                        <th scope="col" className="px-6 py-3">Nombres</th>
                                        <th scope="col" className="px-6 py-3">Apellido Paterno</th>
                                        <th scope="col" className="px-6 py-3">Apellido Materno</th>
                                        <th scope="col" className="px-6 py-3">Tipo de Programa</th>
                                        <th scope="col" className="px-10 py-3">Detalles</th>
                                        <th scope="col" className="px-10 py-3">Operacion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {participantes.map((participante) => (
                                        <tr key={participante.id_estudiante} className="dark:bg-indigo-50 border-b dark:border-gray-700">
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap dark:text text-transform: uppercase">
                                                {participante.nombres}
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap dark:text text-transform: uppercase">
                                                {participante.apellido_p}
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap dark:text text-transform: uppercase">
                                                {participante.apellido_m}
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap dark:text text-transform: uppercase">
                                                {participante.tipo}
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap dark:text text-transform: uppercase">
                                                <button
                                                    onClick={() => redireccionarAsignarActividad(participante.id_estudiante, participante.correo_estudiante)}
                                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                                >
                                                    Asignar Actividad
                                                </button>
                                            </td>
                                            <td scope="row" className="px-10 py-4 font-medium text-indigo-700 dark:text-blue-500">
                                                <button
                                                    type="button"
                                                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                                    onClick={() => handleEliminarParticipante(participante.correo_estudiante)}
                                                >
                                                    Dar baja
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
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={redireccionarAlumnos}
                        >
                            Agregar Integrante
                        </button>
                        <button
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={redireccionarDetallesProyecto}
                        >
                            Regresar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Integrantes;
