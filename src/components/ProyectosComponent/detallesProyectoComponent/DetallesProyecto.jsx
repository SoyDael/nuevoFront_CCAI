import React, { useEffect, useState } from 'react'
import { consultaInvestigadores, getProyecto, navbarInvestigador, actualizarProyecto } from '../../../api/APIS'
import { useNavigate, useParams } from 'react-router-dom'
import SlideBarInvestigadores from '../../SlideBar/SlideBarInvestigadores';
import Swal from 'sweetalert2'


const DetallesProyecto = () => {

    const navigate = useNavigate();
    const { id_proyecto } = useParams();
    const { correo, proyecto_id, coordinador_correo, correo_investigador } = useParams();

    const [Proyecto, setProyecto] = useState([]); // Estado para almacenar el perfil del investigador

    const [campoAEditar, setCampoAEditar] = useState('');
    const [nuevoValor, setNuevoValor] = useState('');


    const redireccionarIntegrantes = () => {
        navigate(`/integrantes/${id_proyecto}/${correo}`);
    }

    const redireccionarProyectos = () => {
        navigate(`/proyectos/${correo || coordinador_correo || correo_investigador}`);
    }

    const redireccionarEditarProyecto = () => {
        navigate(`/editarProyecto/${id_proyecto}`);
    }


    const handleUpdateProyecto = async () => {
        try {
            const updatedProyecto = { ...Proyecto, [campoAEditar]: nuevoValor };
            await actualizarProyecto(id_proyecto, updatedProyecto);
            setProyecto(updatedProyecto);
            Swal.fire({
                title: 'Actualizado',
                text: 'Proyecto Actualizado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
        } catch (error) {
            console.error('Error al actualizar el proyecto:', error);
            Swal.fire({
                title: 'Actualizado',
                text: 'Proyecto Actualizado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })        }
    };
    const actualizar = (campo, valor) => {
        handleUpdateProyecto(campo, valor);
    };


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

    const [showModal3, setShowModal3] = useState(false);

    const toggleModal3 = () => {
        setShowModal3(!showModal3);
    };

    const [showModal4, setShowModal4] = useState(false);

    const toggleModal4 = () => {
        setShowModal4(!showModal4);
    };

    const [showModal5, setShowModal5] = useState(false);

    const toggleModal5 = () => {
        setShowModal5(!showModal5);
    };

    const [showModal6, setShowModal6] = useState(false);

    const toggleModal6 = () => {
        setShowModal6(!showModal6);
    };

    const [showModal7, setShowModal7] = useState(false);

    const toggleModal7 = () => {
        setShowModal7(!showModal7);
    };

    const [showModal8, setShowModal8] = useState(false);

    const toggleModal8 = () => {
        setShowModal8(!showModal8);
    };


    const [showModal9, setShowModal9] = useState(false);

    const toggleModal9 = () => {
        setShowModal9(!showModal9);
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
                                            <form className='mb-5' >
                                                <div class="flex flex-col items-center justify-center space-y-6">
                                                    {showModal && (
                                                        <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                                                            <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                                                                <section class="grid  place-content-center bg-slate-600 text-slate-300">
                                                                    <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                                                                        <label htmlFor="titulo_esp" className="block mb-2 text-sm font-medium text-gray-900 text-white">Titulo</label>
                                                                        <input
                                                                            type="text"
                                                                            name="titulo_esp"
                                                                            id="titulo_esp"
                                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                                            value={Proyecto.titulo_esp || ''}
                                                                            onChange={(e) => setProyecto({ ...Proyecto, titulo_esp: e.target.value })}
                                                                            placeholder="Titulo"
                                                                            required=""

                                                                        />
                                                                        <div className='flex justify-between mt-4'>
                                                                            <button onClick={() => actualizar('titulo_esp', Proyecto.titulo_esp)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Guardar</button>
                                                                            <button onClick={() => { toggleModal(); window.location.reload(); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Cerrar</button>
                                                                        </div>
                                                                    </div>
                                                                </section>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="sm:col-span-2 mb-5">
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center">
                                                                <input
                                                                    type="text"
                                                                    id="titulo_esp"
                                                                    name="titulo_esp"
                                                                    placeholder="Titulo"
                                                                    class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                                                                    value={Proyecto[0]?.titulo_esp}
                                                                />
                                                                <button onClick={toggleModal} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2" type="button">Modificar</button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-2 mb-5">
                                                        {showModal3 && (
                                                            <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                                                                <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                                                                    <section class="grid  place-content-center bg-slate-600 text-slate-300">
                                                                        <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                                                                            <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 text-white">Descripcion</label>
                                                                            <textarea
                                                                                type="text"
                                                                                name="descripcion"
                                                                                id="descripcion"
                                                                                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                                                value={Proyecto.descripcion || ''}
                                                                                onChange={(e) => setProyecto({ ...Proyecto, descripcion: e.target.value })}
                                                                                placeholder="Descripcion"
                                                                                required=""
                                                                            />
                                                                            <div className='flex justify-between mt-4'>
                                                                                <button onClick={() => actualizar('descripcion', Proyecto.descripcion)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Guardar</button>
                                                                                <button onClick={() => { toggleModal3(); window.location.reload(); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Cerrar</button>
                                                                            </div>
                                                                        </div>
                                                                    </section>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center">
                                                                <textarea maxlength="1000" id="descripcion" name="descripcion" placeholder="Descripción" class="w-96 appearance-none  border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                                                                    value={Proyecto[0]?.descripcion}
                                                                />
                                                                <button onClick={toggleModal3} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2" type="button">Modificar</button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-2 mb-5">
                                                        {showModal4 && (
                                                            <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                                                                <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                                                                    <section class="grid  place-content-center bg-slate-600 text-slate-300">
                                                                        <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                                                                            <label htmlFor="objetivo" className="block mb-2 text-sm font-medium text-gray-900 text-white">Objetivo</label>
                                                                            <textarea
                                                                                type="text"
                                                                                name="objetivo"
                                                                                id="objetivo"
                                                                                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                                                value={Proyecto.objetivo || ''}
                                                                                onChange={(e) => setProyecto({ ...Proyecto, objetivo: e.target.value })}
                                                                                placeholder="Objetivo"
                                                                                required=""
                                                                            />
                                                                            <div className='flex justify-between mt-4'>
                                                                                <button onClick={() => actualizar('objetivo', Proyecto.objetivo)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Guardar</button>
                                                                                <button onClick={() => { toggleModal4(); window.location.reload(); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Cerrar</button>
                                                                            </div>
                                                                        </div>
                                                                    </section>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center">
                                                                <textarea maxlength="1000" id="objetivo" name="objetivo" placeholder="Objetivo" class="w-96 appearance-none  border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                                                                    value={Proyecto[0]?.objetivo}
                                                                />
                                                                <button onClick={toggleModal4} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2" type="button">Modificar</button>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="sm:col-span-2 mb-5">
                                                        {showModal5 && (
                                                            <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                                                                <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                                                                    <section class="grid  place-content-center bg-slate-600 text-slate-300">
                                                                        <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                                                                            <label htmlFor="coordinador_correo" className="block mb-2 text-sm font-medium text-gray-900 text-white">Investigador</label>
                                                                            <select
                                                                                className="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2"
                                                                                id='coordinador_correo'
                                                                                name="coordinador_correo"
                                                                                value={Proyecto.coordinador_correo || ''}
                                                                                onChange={(e) => setProyecto({ ...Proyecto, coordinador_correo: e.target.value })}
                                                                            >

                                                                                {Investigador.map((investigador) => (
                                                                                    <option key={investigador.id_investigador} value={investigador.correo}>
                                                                                        {investigador.nombres} {investigador.apellido_p} {investigador.apellido_m}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                            <div className='flex justify-between mt-4'>
                                                                                <button onClick={() => actualizar('coordinador_correo', Proyecto.coordinador_correo)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Guardar</button>
                                                                                <button onClick={() => { toggleModal5(); window.location.reload(); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Cerrar</button>
                                                                            </div>
                                                                        </div>
                                                                    </section>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center">
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
                                                                <button onClick={toggleModal5} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2" type="button">Modificar</button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-2 mb-5">
                                                        {showModal6 && (
                                                            <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                                                                <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                                                                    <section class="grid  place-content-center bg-slate-600 text-slate-300">
                                                                        <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                                                                            <label htmlFor="estatus" className="block mb-2 text-sm font-medium text-gray-900 text-white">Estatus</label>
                                                                            <select
                                                                                className="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2"
                                                                                name="estatus"
                                                                                value={Proyecto.estatus || ''}
                                                                                onChange={(e) => setProyecto({ ...Proyecto, estatus: e.target.value })}
                                                                            >
                                                                                <option >Selecciona un estatus</option>
                                                                                <option value="Nuevo">Nuevo</option>
                                                                                <option value="En progreso">En progreso</option>
                                                                                <option value="Finalizado">Finalizado</option>
                                                                            </select>
                                                                            <div className='flex justify-between mt-4'>
                                                                                <button onClick={() => actualizar('estatus', Proyecto.estatus)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Guardar</button>
                                                                                <button onClick={() => { toggleModal6(); window.location.reload(); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Cerrar</button>
                                                                            </div>
                                                                        </div>
                                                                    </section>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center">
                                                                <input
                                                                    className="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 text-center"
                                                                    name="estatus"
                                                                    value={Proyecto[0]?.estatus}
                                                                />
                                                                <button onClick={toggleModal6} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2" type="button">Modificar</button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-2 mb-5">

                                                        {showModal7 && (
                                                            <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                                                                <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                                                                    <section class="grid  place-content-center bg-slate-600 text-slate-300">
                                                                        <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                                                                            <label htmlFor="fecha_registro" className="block mb-2 text-sm font-medium text-gray-900 text-white">Fecha de Registro</label>
                                                                            <input type="datetime-local" id="fecha_registro" name="fecha_registro" placeholder="Fecha de registro" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                                                                                value={Proyecto.fecha_registro || ''}
                                                                                onChange={(e) => setProyecto({ ...Proyecto, fecha_registro: e.target.value })}
                                                                            />

                                                                            <div className='flex justify-between mt-4'>
                                                                                <button onClick={() => actualizar('fecha_registro', Proyecto.fecha_registro)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Guardar</button>
                                                                                <button onClick={() => { toggleModal7(); window.location.reload(); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Cerrar</button>
                                                                            </div>
                                                                        </div>
                                                                    </section>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center">
                                                                <input id="fecha_registro" name="fecha_registro" placeholder="Fecha de registro" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500 text-center"
                                                                    value={Proyecto[0]?.fecha_registro} />
                                                                <button onClick={toggleModal7} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2" type="button">Modificar</button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-2 mb-5">
                                                        {showModal8 && (
                                                            <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                                                                <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                                                                    <section class="grid  place-content-center bg-slate-600 text-slate-300">
                                                                        <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                                                                            <label htmlFor="fecha_inicio" className="block mb-2 text-sm font-medium text-gray-900 text-white">Fecha de Inicio</label>
                                                                            <input id="fecha_inicio" type='date' name="fecha_inicio" placeholder="Fecha de inicio" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500 text-center"
                                                                                value={Proyecto.fecha_inicio || ''}
                                                                                onChange={(e) => setProyecto({ ...Proyecto, fecha_inicio: e.target.value })} />
                                                                            <div className='flex justify-between mt-4'>
                                                                                <button onClick={() => actualizar('fecha_inicio', Proyecto.fecha_inicio)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Guardar</button>
                                                                                <button onClick={() => { toggleModal8(); window.location.reload(); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Cerrar</button>
                                                                            </div>
                                                                        </div>
                                                                    </section>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center">
                                                                <input id="fecha_inicio" name="fecha_inicio" placeholder="Fecha de inicio" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500 text-center"
                                                                    value={Proyecto[0]?.fecha_inicio}
                                                                />
                                                                <button onClick={toggleModal8} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2" type="button">Modificar</button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-2 mb-5">
                                                        {showModal9 && (
                                                            <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                                                                <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                                                                    <section class="grid  place-content-center bg-slate-600 text-slate-300">
                                                                        <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                                                                            <label htmlFor="fecha_fin" className="block mb-2 text-sm font-medium text-gray-900 text-white">Fecha de Fin</label>
                                                                            <input id="fecha_fin" type='date' name="fecha_fin" placeholder="Fecha de Fin" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500 text-center"
                                                                                value={Proyecto.fecha_fin || ''}
                                                                                onChange={(e) => setProyecto({ ...Proyecto, fecha_fin: e.target.value })} />
                                                                            <div className='flex justify-between mt-4'>
                                                                                <button onClick={() => actualizar('fecha_fin', Proyecto.fecha_fin)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Guardar</button>
                                                                                <button onClick={() => { toggleModal9(); window.location.reload(); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Cerrar</button>
                                                                            </div>
                                                                        </div>
                                                                    </section>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center">
                                                                <input id="fecha_fin" name="fecha_fin" placeholder="Fecha de finalización" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500 text-center"
                                                                    value={Proyecto[0]?.fecha_fin}
                                                                />
                                                                <button onClick={toggleModal9} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2" type="button">Modificar</button>
                                                            </div>
                                                        </div>
                                                    </div>



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