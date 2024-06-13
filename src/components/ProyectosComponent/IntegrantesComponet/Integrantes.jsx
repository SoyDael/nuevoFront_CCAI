import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { participanteProyecto } from '../../../api/APIS'
import SlideBarInvestigadores from '../../SlideBar/SlideBarInvestigadores'

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

    const [showModal3, setShowModal3] = useState(false);

    const toggleModal3 = () => {
        setShowModal3(!showModal3);
    };

    return (
        <>
            <SlideBarInvestigadores />
            <div className="flex justify-center items-center h-screen bg-slate-700 ">
                <div className="rounded-md relative border shadow-2xl bg-gray-800 border-gray-700 shadow-blue-500/50 ">
                    <h1 className="font-serif text-lg text-gray-200 text-center p-6">Bienvenido { } { } { } los integrantes del proyecto son: </h1>
                    <section>
                        <div>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-400 uppercase dark:bg-indigo-50 bg-opacity-20 dark:text-gray-400">
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
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap dark:text text-transform: uppercase ">{participante.nombres}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap dark:text text-transform: uppercase">{participante.apellido_p}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap dark:text text-transform: uppercase">{participante.apellido_m}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap dark:text text-transform: uppercase">{participante.tipo}</td>
                                            <td scope='row' className="px-10 py-4 font-medium text-indigo-700 dark:text-blue-500">
                                                <button onClick={toggleModal3}>Asignar Actividad</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <div className="flex justify-center m-4">
                        <button
                            className="bg-indigo-700 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded"
                            onClick={redireccionarDetallesProyecto}
                        >
                            Regresar
                        </button>
                    </div>
                </div>
            </div>


            {showModal3 && (
                <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className=" border border-gray-200 rounded-lg shadow-lg p-5">
                        <section class="grid  place-content-center bg-slate-600 text-slate-300">
                            <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                                <h1 class="text-4xl font-semibold mb-4">Asignar actividad</h1>
                                <form id='formulario' >
                                    <div class="flex flex-col  justify-center space-y-4">
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input
                                                type="text"
                                                id="titulo_esp"
                                                name="titulo_esp"
                                                placeholder="Nombre de la actividad"
                                                class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"

                                            />


                                        </div>




                                        <div className="relative z-0 w-full mb-5 group">

                                            <p class="text-lg font-semibold mb-1">Fecha de inicio</p>
                                            <input type="date" id="fecha_registro" name="fecha_registro" placeholder="Fecha de registro" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />


                                        </div>
                                        <div className="relative z-0 w-full mb-5 group">

                                            <p class="text-lg font-semibold mb-1">Fecha de finalización</p>
                                            <input type="date" id="fecha_inicio" name="fecha_inicio" placeholder="Fecha de inicio" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />


                                        </div>
                                        <div className="flex justify-center">

                                            <button onClick={toggleModal3} className="rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-indigo-900">Asignar actividad</button>
                                        </div>

                                        <div className="flex justify-center">
                                            <button onClick={toggleModal3} className="rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-indigo-900">Cerrar</button>

                                        </div>


                                    </div>

                                </form>
                            </div>
                        </section>

                    </div>
                </div>
            )}
        </>
    )
}

export default Integrantes
