import React, { useEffect, useState } from 'react'
import SlideBarPruebaAlumn from '../../../SlideBar/SlideBarPruebaAlumn'
import { getProyecto, obtenerDocumentacionProgramaPorID, registroDocumentacion, navbarEstudiante } from '../../../../api/APIS'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const DetallesProyectoAlumno = () => {

    const { correo_estudiante, correo, id_proyecto, proyecto_id } = useParams();
    const [proyecto, setProyecto] = useState([]);
    const [documentacion, setDocumentacion] = useState([]);
    const [proyectos, setProyectos] = useState([])
    const [navbar, setNavbar] = useState([])


    const navigate = useNavigate();

    const redireccionarDocumentacionproyecto = () => {
        navigate(`/documentacionProyecto/${id_proyecto}`);
    }

    useEffect(() => {
    const ObtenerAlumno = async () => {
        try {
            const res = await navbarEstudiante(correo_estudiante);
            console.log(res);
            setNavbar(res);
        } catch (error) {
            console.error('Error al obtener navbar:', error);
            alert('Error al obtener navbar. Por favor, inténtalo de nuevo.');
        }
    }
    ObtenerAlumno(); 
}, []);

    const obtenerDocumentacionProyecto = async (id_proyecto) => {
        try {
            const res = await getProyecto({ id_proyecto: id_proyecto })
            const token = res.token;
            console.log(token);
            localStorage.setItem('token', token);

            const proyecto = await obtenerDocumentacionProgramaPorID(id_proyecto)
            console.log(proyecto)
            setProyecto(proyecto);

            redireccionarDocumentacionproyecto(id_proyecto)
        } catch (error) {
            console.error('Error al obtener proyecto:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al obtener proyecto. Por favor, inténtalo de nuevo."
            });
        }
    }

    useEffect(() => {
        const fetchProyecto = async () => {
            try {
                const proyecto = await getProyecto(id_proyecto);
                console.log(proyecto);
                setProyecto(proyecto);
            } catch (error) {
                console.error('Error al obtener actividades:', error);
                alert('Error al obtener actividades. Por favor, inténtalo de nuevo.');
            }
        };
        fetchProyecto();
    }, []);

    const [showModal, setShowModal] = useState(false);

    const [showModal2, setShowModal2] = useState(false);


    const toggleModal = () => {
        setShowModal(!showModal);
    };


    const toggleModal2 = () => {
        setShowModal2(!showModal2);
    };

    const handleDocumentacion = async (formulario) => {
        const formData = new FormData(formulario);
        const documentacion = Object.fromEntries(formData)
            ;
        try {
            await registroDocumentacion(formulario);
            Swal.fire({
                icon: "success",
                title: "¡Éxito!",
                text: "Documentación registrada exitosamente."
            });
            toggleModal2();
        } catch (error) {
            console.error('Error al registrar documentación:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al registrar documentación. Por favor, inténtalo de nuevo."
            });
        }
    }

    return (
        <>
            <SlideBarPruebaAlumn />
            <div className="flex justify-center items-center h-screen bg-slate-400">
                {showModal && (
                    <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">Descripcion</h1>
                            <p className="mb-3 font-normal text-gray-700">{proyecto[0]?.descripcion}</p>
                            <button onClick={toggleModal} className="text-sm font-medium text-white bg-blue-700 rounded-lg py-1 px-3">Cerrar</button>
                        </div>
                    </div>
                )}
                {/**  Form para añadir documentacion al proyecto */}
                {showModal2 && (
                    <div className=" fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-transparent border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                            <section className="bg-slate-700 dark:bg-gray-900 w-full f-96">
                                <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                                    <h2 className="mb-4 text-xl font-bold text-white text-center">Documentación</h2>
                                    <form >
                                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                                            <div className="sm:col-span-2">
                                                <div className="flex flex-col">
                                                    <input
                                                        type="text"
                                                        id="nombre"
                                                        name="nombre"
                                                        placeholder="Nombre"
                                                        class="w-96  rounded-full border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <input
                                                    type="email"
                                                    id="correo"
                                                    name="correo"
                                                    placeholder=""
                                                    class="w-96  rounded-full border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500 text-white icon-white"
                                                    value={navbar[0]?.correo_estudiante}
                                                    readOnly
                                                />
                                            </div>
                                            
                                            <div className="sm:col-span-2">
                                                <input
                                                    type="email"
                                                    id="id_proyecto"
                                                    name="id_proyecto"
                                                    placeholder=""
                                                    class="w-96 rounded-full border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500 text-white icon-white"
                                                    value={proyecto[0]?.id_proyecto}
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <textarea
                                                    type="text"
                                                    id="descripcion"
                                                    name="descripcion"
                                                    placeholder="Tu descripcion va aqui"
                                                    class="w-96 border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                                                />
                                            </div>

                                            <div className="sm:col-span-2">
                                                <select name="semestre" id="semestre" className='rounded-full text-white w-96 border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500'>
                                                    <option
                                                        value=""
                                                        class="w-96 border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                                                    >Seleccione el semestre</option>
                                                    <option
                                                        value="2024-1"
                                                        class="w-96 border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                                                    >2024-1</option>
                                                      <option
                                                        value="2024-1"
                                                        class="w-96 border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                                                    >2024-2</option>
                                                </select>
                                            </div>

                                          
                                            <input type="date" id="fecha" name="fecha" placeholder="Fecha de registro" class="w-96 appearance-none rounded-full border-0 bg-slate-900 p-2 px-4 focus:bg-slate-700 focus:ring-2 focus:ring-orange-500 text-white icon-white" />
                                       
                                        </div>
                                        <div className="flex justify-center">
                                            <button className="mb-4 text-sm font-medium text-white bg-indigo-700 hover:bg-indigo-900 rounded-lg py-2 px-3">Registrar Documentación</button>
                                        </div>
                                        <div className="flex justify-center">
                                            <button onClick={toggleModal2} className="text-sm font-medium text-white bg-indigo-700 hover:bg-indigo-900 rounded-lg py-2 px-3">Cerrar</button>
                                        </div>
                                    </form>
                                </div>
                            </section>

                        </div>
                    </div>
                )}

                {/** Termina Formulario */}

                <div className="max-w-lg border border-slate-900 rounded-lg bg-slate-700 dark:border-slate-700 flex justify-center items-center">
                    <div className="p-5 text-center">
                        <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-300">Detalles del Proyecto</h1>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-300">Titulo: {proyecto[0]?.titulo_esp}</h5>
                        <p className="mb-3 font-normal  text-gray-200">Objetivo: {proyecto[0]?.objetivo}</p>
                        <p className="mb-3 font-normal  text-gray-200"> Descripcion: {proyecto[0]?.descripcion.substring(0, 100)}...</p>
                        <div className="flex justify-center">
                            <button onClick={toggleModal} className="text-sm font-medium text-white bg-blue-700 rounded-lg py-1 px-5 ">Leer más</button>
                        </div>
                        <p className="mb-3 font-normal  text-gray-200 mt-2">Fecha de Registro: {proyecto[0]?.fecha_registro}</p>
                        <p className="mb-3 font-normal  text-gray-200">Fecha de Inicio: {proyecto[0]?.fecha_inicio}</p>
                        <p className="mb-3 font-normal  text-gray-200">Fecha de Fin: {proyecto[0]?.fecha_fin}</p>
                        <p className="mb-3 font-normal text-gray-200">Estatus: {proyecto[0]?.estatus}</p>
                        <div className="flex justify-center">
                            <button onClick={toggleModal2} className="text-sm font-medium text-white bg-blue-700 rounded-lg py-1 px-3 mr-4">Añadir documentación</button>
                            <button onClick={() => redireccionarDocumentacionproyecto(proyecto.id_proyecto)} className="text-sm font-medium text-white bg-blue-700 rounded-lg py-1 px-3">Ver Documentación</button>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default DetallesProyectoAlumno