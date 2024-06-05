import React, { useEffect, useState } from 'react'
import { consultaInvestigadores, getProyecto, navbarInvestigador } from '../../../api/APIS'
import { useNavigate, useParams } from 'react-router-dom'
import SlideBarPruebaAlumn from '../../SlideBar/SlideBarPruebaAlumn';
import SlideBarInvestigadores from '../../SlideBar/SlideBarInvestigadores';


const DetallesProyecto = () => {

    const navigate = useNavigate();
    const { id_proyecto } = useParams();
    const { correo, proyecto_id, coordinador_correo, correo_investigador } = useParams();

    const [Proyecto, setProyecto] = useState([]); // Estado para almacenar el perfil del investigador

    const redireccionarIntegrantes = () => {
        navigate(`/integrantes/${id_proyecto}/${correo}`);
    }

    const redireccionarProyectos = () => {
        navigate(`/proyectos/${correo || coordinador_correo || correo_investigador}`);
    }

    useEffect(() => {
        const fetchProyecto = async () => {
            try {
                const proyecto = await getProyecto(id_proyecto); // Obtener el proyecto por ID
                console.log(proyecto);
                setProyecto(proyecto); // Almacena el proyecto en el estado
            } catch (error) {
                console.error('Error al obtener proyecto:', error);
                alert('Error al obtener proyecto. Por favor, inténtalo de nuevo.');
            }
        };
        fetchProyecto();
    }, [id_proyecto])

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const [showModal2, setShowModal2] = useState(false);

    const toggleModal2 = () => {
        setShowModal2(!showModal2);
    };

    const [Investigador, setInvestigador] = useState([])
    const [titulo, setTitulo] = useState('');
    const [perfilInvestigador, setPerfilInvestigador] = useState([]);

    useEffect(() => {
        const fetchInvestigador = async () => {
            try {
                const investigador = await consultaInvestigadores();
                console.log(investigador);
                setInvestigador(investigador); // Almacena los proyectos del investigador en el estado
            } catch (error) {
                console.error('Error al obtener proyectos:', error);
                //alert('Error al obtener proyectos. Por favor, inténtalo de nuevo.');
            }
        };
        fetchInvestigador();
    }, []);

    useEffect(() => {
        const fetchPerfilInvestigador = async () => {
            try {
                const perfil = await navbarInvestigador(correo);
                console.log(perfil);
                setPerfilInvestigador(perfil);
            } catch (error) {
                console.error('Error al obtener perfil:', error);
                alert('Error al obtener perfil. Por favor, inténtalo de nuevo.');
            }
        };
        fetchPerfilInvestigador();
    }, [correo]);

    return (
        <>
            <SlideBarInvestigadores />
            <div className="flex justify-center items-center h-screen bg-slate-700">
                {showModal && (
                    <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">Descripcion</h1>
                            <p className="mb-3 font-normal text-gray-700">{Proyecto[0]?.descripcion}</p>
                            <button onClick={toggleModal} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2">Cerrar</button>
                        </div>
                    </div>
                )}
                <div className="max-w-lg border border-slate-900 rounded-lg bg-slate-900 dark:border-slate-700 flex justify-center items-center">
                    <div className="p-5 text-center">
                        <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-300">Detalles del Proyecto</h1>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-300">Titulo: {Proyecto[0]?.titulo_esp}</h5>
                        <p className="mb-3 font-normal  text-gray-200">Objetivo: {Proyecto[0]?.objetivo}</p>
                        <p className="mb-3 font-normal  text-gray-200"> Descripcion: {Proyecto[0]?.descripcion.substring(0, 100)}...</p>
                        <div className="flex justify-center">
                            <button onClick={toggleModal} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2">Leer más</button>
                        </div>
                        <p className="mb-3 font-normal  text-gray-200 mt-2">Fecha de Registro: {Proyecto[0]?.fecha_registro}</p>
                        <p className="mb-3 font-normal  text-gray-200">Fecha de Inicio: {Proyecto[0]?.fecha_inicio}</p>
                        <p className="mb-3 font-normal  text-gray-200">Fecha de Fin: {Proyecto[0]?.fecha_fin}</p>
                        <p className="mb-3 font-normal text-gray-200">Estatus: {Proyecto[0]?.estatus}</p>

                        <div class="flex gap-2 px-2">
                            <button
                                class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2 ml-10"
                             onClick={redireccionarIntegrantes}
                            >
                                Ver Integrantes
                            </button>
                            <button
                                class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2 ml-2"
                                onClick={toggleModal2}
                            >
                                Editar
                            </button>
                            <button
                                class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2 ml-2"
                            onClick={redireccionarProyectos}
                            >
                                Regresar
                            </button>
                        </div>

                        {showModal2 && (
                <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className=" border border-gray-200 rounded-lg shadow-lg p-5">
                        <section class=" grid place-content-center bg-slate-600 text-slate-300">
                            <div className="rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700 shadow-blue-500/50">
                                <h1 class="text-4xl font-semibold mb-4">Editar proyecto</h1>
                                <form id='formulario' className='mb-5' >
                                    <div class="flex flex-col items-center justify-center space-y-6">
                                        <input
                                            type="text"
                                            id="titulo_esp"
                                            name="titulo_esp"
                                            placeholder="Titulo"
                                            class="w-full appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                                            value={Proyecto[0]?.titulo_esp}
                                        />
                                        <textarea maxlength="1000" id="descripcion" name="descripcion" placeholder="Descripción" class="w-96 appearance-none  border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                                        value={Proyecto[0]?.descripcion}
                                        />
                                        <textarea maxlength="1000" id="objetivo" name="objetivo" placeholder="Objetivo" class="w-96 appearance-none  border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                                        value={Proyecto[0]?.objetivo}
                                        />
                                        <label
                                            className="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2"
                                            id='coordinador_correo'
                                            name="coordinador_correo"
                                        >

                                            {Investigador.map((investigador) => (
                                                <option key={investigador.id_investigador} value={investigador.correo}>
                                                    {investigador.nombres} {investigador.apellido_p} {investigador.apellido_m}
                                                </option>
                                            ))}
                                        </label>

                                        <select
                                            className="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2"
                                            name="estatus"
                                        >
                                            <option value="">Selecciona un estatus</option>
                                            <option value="Nuevo">Nuevo</option>
                                            <option value="En progreso">En progreso</option>
                                            <option value="Finalizado">Finalizado</option>
                                        </select>

                                        <input type="datetime-local" id="fecha_registro" name="fecha_registro" placeholder="Fecha de registro" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                                        <input type="date" id="fecha_inicio" name="fecha_inicio" placeholder="Fecha de inicio" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                                        <input type="date" id="fecha_fin" name="fecha_fin" placeholder="Fecha de finalización" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />

                                        <button type='submit'
                                            id="showPw"
                                            onClick={() => handleProyecto(document.getElementById('formulario'))}
                                            class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"><span id="showHide">Añadir</span> Proyecto</button>

                                    </div>
                                </form>
                                <div className="flex justify-center">
                                    <button onClick={toggleModal2} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Cerrar</button>
                                </div>
                            </div>

                        </section>

                    </div>
                </div>
            )}

            {/** Aqui termina Registro Proyecto */}

                    </div>
                </div>
            </div>
                

        </>
    )
}

export default DetallesProyecto