import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { participanteProyecto, eliminarParticipante, estanciaParticipante } from '../../../api/APIS';
import SlideBarInvestigadores from '../../SlideBar/SlideBarInvestigadores';

const Integrantes = () => {
    const navigate = useNavigate();
    const { id_proyecto } = useParams();

    const { correo } = useParams();

    const [participantes, setParticipantes] = useState([]);
    const [estancias, setEstancias] = useState([]);

    const redireccionarDetallesProyecto = () => {
        navigate(`/detallesProyecto/${id_proyecto}/${correo}`);
    }

    const redireccionarAsignarActividad = (id_estudiante, correo_estudiante) => {
        navigate(`/asignarActividad/${id_proyecto}/${correo}/${id_estudiante}/${correo_estudiante}`);
    }

    const redireccionarAsignarActividadExternos = (id_estancia, id_estancia_residente, correo_residente_estancia) => {
        navigate(`/asignarActividadExterno/${id_proyecto}/${correo}/${id_estancia}/${id_estancia_residente}/${correo_residente_estancia}`);
    }

    const redireccionarAlumnos = () => {
        navigate(`/listadoAlumnos/${correo}`);
    }

    const redireccionarAlumnosExternos = () => {
        navigate(`/listadoAlumnosExternos/${correo}`);
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchParticipante = async () => {
            try {
                const participanteResponse = await participanteProyecto(id_proyecto); // Obtener los participantes del proyecto por ID
                const estanciaResponse = await estanciaParticipante(id_proyecto); // Obtener las estancias del proyecto por ID

                setParticipantes(participanteResponse); // Almacena los participantes en el estado
                setEstancias(estanciaResponse); // Almacena las estancias en el estado

                const combinedData = [...participanteResponse, ...estanciaResponse]; // Combina ambos arrays
                setData(combinedData); // Almacena los datos combinados en el estado
            } catch (error) {
                console.error('Error al obtener los datos del proyecto:', error);
                alert('Error al obtener los datos del proyecto. Por favor, inténtalo de nuevo.');
            }
        };

        if (id_proyecto) {
            fetchParticipante();
        }
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

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
        console.log('showModal', showModal);
    };


    const [showModal2, setShowModal2] = useState(false);
    const [selectedParticipant, setSelectedParticipant] = useState({ 
        id_estudiante: null, 
        correo_estudiante: null, 
        id_estancia: null, 
        id_estancia_residente: null, 
        correo_residente_estancia: null 
    });

    const toggleModal2 = (
        id_estudiante = null, 
        correo_estudiante = null, 
        id_estancia = null, 
        id_estancia_residente = null, 
        correo_residente_estancia = null
    ) => {
        setShowModal2(!showModal2);
        setSelectedParticipant({ 
            id_estudiante, 
            correo_estudiante, 
            id_estancia, 
            id_estancia_residente, 
            correo_residente_estancia 
        });
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
                                        <th scope="col" className="px-6 py-3">Tipo Usuario</th>
                                        <th scope="col" className="px-10 py-3">Detalles</th>
                                        <th scope="col" className="px-10 py-3">Operacion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((participante) => (
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
                                                {participante.tipoServicio || participante.tipoEstancia}
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap dark:text text-transform: uppercase">
                                                {participante.tipo || participante.tipo}
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap dark:text text-transform: uppercase">
                                                {showModal2 && (
                                                    <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                                                        <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                                                            <section class="grid  place-content-center bg-slate-600 text-slate-300">
                                                                <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-white text-center">Tipo de Estudiante</label>
                                                                    <button onClick={() => redireccionarAsignarActividad(selectedParticipant.id_estudiante, selectedParticipant.correo_estudiante)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-6 ml-2">Alumno Interno</button>
                                                                    <button onClick={() => redireccionarAsignarActividadExternos(selectedParticipant.id_estancia, selectedParticipant.id_estancia_residente, selectedParticipant.correo_residente_estancia)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Alumno Externo</button>
                                                                    <div className='flex justify-center items-center'>
                                                                        <button onClick={() => { toggleModal2(); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Cerrar</button>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        </div>
                                                    </div>
                                                )}
                                                <button
                                                    onClick={() => toggleModal2(participante.id_estudiante, participante.correo_estudiante
                                                        , participante.id_estancia, participante.id_estancia_residente, participante.correo_residente_estancia
                                                    )}
                                                    //onClick={() => redireccionarAsignarActividad(participante.id_estudiante, participante.correo_estudiante)}
                                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                                >
                                                    Asignar Actividad
                                                </button>
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap dark:text text-transform: uppercase">
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
                            onClick={toggleModal}
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
                    <div className="grid  sm:grid-cols-2 sm:gap-10 sm:mb-30 w-full">
                        {showModal && (
                            <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                                <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                                    <section class="grid  place-content-center bg-slate-600 text-slate-300">
                                        <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-white text-center">Tipo de Estudiante</label>
                                            <button onClick={redireccionarAlumnos} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-6 ml-2">Alumno Interno</button>
                                            <button onClick={redireccionarAlumnosExternos} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Alumno Externo</button>
                                            <div className='flex justify-center items-center'>
                                                <button onClick={() => { toggleModal(); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Cerrar</button>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        )}


                    </div>
                </div>

            </div>
        </>

    );
}

export default Integrantes;
