import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getPerfilEstudiante, actualizarPerfil } from '../../api/APIS';
import SlideBarPruebaAlumn from '../SlideBar/SlideBarPruebaAlumn';

const EditarPerfil = () => {

    const { correo, correo_estudiante } = useParams();

    const navigate = useNavigate();

    const redireccionarPerfil = () => {
        navigate(`/perfilAlumno/${correo || correo_estudiante}`);
    }

    const [perfilEstudiante, setPerfilEstudiante] = useState({});
    const [campoAEditar, setCampoAEditar] = useState('');
    const [nuevoValor, setNuevoValor] = useState('');
    const [nuevaFoto, setNuevaFoto] = useState(null);


    const handleFotoChange = (event) => {
        console.log("adios");
        const imagenSeleccionada = event.target.files[0];
        setNuevaFoto(imagenSeleccionada);
    };

    const handleModificar = (field, value) => {
        setCampoAEditar(field);
        setNuevoValor(value);
    }

    const actualizarInfo = (field, value) => {
        const correoPerfil = perfilEstudiante[0]?.correo; // Obtener el correo del perfil
        if (correoPerfil) {
            const perfilActualizado = { ...perfilEstudiante, [field]: value };

            if (nuevaFoto) {
                perfilActualizado.foto = nuevaFoto;
            }
            // Llama a la función actualizarPerfil pasando el correo y el objeto con el campo a actualizar y su nuevo valor
            actualizarPerfil(correoPerfil, perfilActualizado).then(resp => {
                if (resp.status >= 200 && resp.status < 300) {
                    alert('Perfil actualizado correctamente');
                    setPerfilEstudiante(perfilActualizado);
                }
            }).catch(error => {
                console.error('Error al actualizar perfil:', error);
                alert('Error al actualizar perfil. Por favor, inténtalo de nuevo.');
            });
        } else {
            console.error('El correo no es una cadena válida.');
            alert('El correo no es una cadena válida.');
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



    {/** menu desplegable*/ }

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
        console.log('showModal', showModal);
    };


    const [showModal2, setShowModal2] = useState(false);

    const toggleModal2 = () => {
        setShowModal2(!showModal2);
        console.log('showModal', showModal);
    };

    const [showModal3, setShowModal3] = useState(false);

    const toggleModal3 = () => {
        setShowModal3(!showModal3);
        console.log('showModal', showModal);
    };

    const [showModal4, setShowModal4] = useState(false);

    const toggleModal4 = () => {
        setShowModal4(!showModal4);
        console.log('showModal', showModal);
    };

    const [showModal5, setShowModal5] = useState(false);

    const toggleModal5 = () => {
        setShowModal5(!showModal5);
        console.log('showModal', showModal);
    };

    return (
        <div>
            <SlideBarPruebaAlumn />
            <div className="flex justify-center items-center h-screen bg-slate-400">
                <div className="max-w-lg border border-slate-900 rounded-lg bg-slate-700 dark:border-slate-700 flex justify-center items-center">
                    <div className="p-5 text-center">
                        <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-300 mb-6">Edita tu perfil</h1>
                        <form>
                            <div className="grid mb-6 sm:grid-cols-2 sm:gap-10 sm:mb-30 w-full">
                                <div className="sm:col-span-2">
                                    <div className="flex flex-col">
                                        <div className="flex items-center">
                                            <input
                                                type="text"
                                                id="nombre"
                                                name="nombre"
                                                placeholder="Correo"
                                                class="w-96 appearance-none rounded-full border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500 text-white text-center"
                                                value={perfilEstudiante[0]?.matricula}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {showModal && (
                                    <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                                        <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                                            <section class="grid  place-content-center bg-slate-600 text-slate-300">
                                                <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-white">Nombres</label>
                                                    <input
                                                        type="text"
                                                        name="nombres"
                                                        id="nombres"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                        value={perfilEstudiante.nombres}
                                                        placeholder="Nombres"
                                                        required=""
                                                        onChange={(e) => handleModificar('nombres', e.target.value)} />
                                                    <div className='flex justify-between mt-4'>
                                                        <button onClick={() => actualizarInfo('nombres', nuevoValor)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Guardar</button>
                                                        <button onClick={() => { toggleModal(); window.location.reload(); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Cerrar</button>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="sm:col-span-2 mb-5">
                                <div className="flex flex-col">
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            placeholder="Titulo"
                                            class="w-96 appearance-none rounded-full border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500 text-white text-center"
                                            value={perfilEstudiante[0]?.nombres}
                                        />
                                        <button onClick={toggleModal} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2" type="button">Modificar</button>
                                    </div>
                                </div>
                            </div>

                            {showModal2 && (
                                <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                                    <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                                        <section class="grid  place-content-center bg-slate-600 text-slate-300">
                                            <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-white">Apellido Paterno</label>
                                                <input
                                                    type="text"
                                                    name="apellido_p"
                                                    id="apellido_p"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    value={perfilEstudiante.apellido_p}
                                                    placeholder="Apellido Paterno"
                                                    required=""
                                                    onChange={(e) => handleModificar('apellido_p', e.target.value)} />
                                                <div className='flex justify-between mt-4'>
                                                    <button onClick={() => actualizarInfo('apellido_p', nuevoValor)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Guardar</button>
                                                    <button onClick={() => { toggleModal2(); window.location.reload(); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Cerrar</button>
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
                                            id="apellido_p"
                                            name="apellido_p"
                                            placeholder="Apellido Paterno"
                                            class="w-96 appearance-none rounded-full border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500 text-white text-center"
                                            value={perfilEstudiante[0]?.apellido_p}
                                        />
                                        <button onClick={toggleModal2} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2" type="button">Modificar</button>
                                    </div>
                                </div>
                            </div>


                            {showModal3 && (
                                <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                                    <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                                        <section class="grid  place-content-center bg-slate-600 text-slate-300">
                                            <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-white">Apellido Materno</label>
                                                <input
                                                    type="text"
                                                    name="apellido_m"
                                                    id="apellido_m"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    value={perfilEstudiante.apellido_m}
                                                    placeholder="Apellido Paterno"
                                                    required=""
                                                    onChange={(e) => handleModificar('apellido_m', e.target.value)} />
                                                <div className='flex justify-between mt-4'>
                                                    <button onClick={() => actualizarInfo('apellido_m', nuevoValor)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Guardar</button>
                                                    <button onClick={() => { toggleModal3(); window.location.reload(); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Cerrar</button>
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
                                            id="apellido_p"
                                            name="apellido_p"
                                            placeholder="Apellido Paterno"
                                            class="w-96 appearance-none rounded-full border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500 text-white text-center"
                                            value={perfilEstudiante[0]?.apellido_m}
                                        />
                                        <button onClick={toggleModal3} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2" type="button">Modificar</button>
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-2 mb-5">
                                <div className="flex flex-col">
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            id="correo"
                                            name="correo"
                                            placeholder="Correo"
                                            class="w-96 appearance-none rounded-full border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500 text-white text-center"
                                            value={perfilEstudiante[0]?.correo}
                                        />
                                    </div>
                                </div>
                            </div>

                            {showModal4 && (
                                <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                                    <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                                        <section class="grid  place-content-center bg-slate-600 text-slate-300">
                                            <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-white">Correo Adicional</label>
                                                <input
                                                    type="email"
                                                    name="correo_adicional"
                                                    id="correo_adicional"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    value={perfilEstudiante.correo_adicional}
                                                    placeholder="Correo Adicional"
                                                    required=""
                                                    onChange={(e) => handleModificar('correo_adicional', e.target.value)} />
                                                <div className='flex justify-between mt-4'>
                                                    <button onClick={() => actualizarInfo('correo_adicional', nuevoValor)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Guardar</button>
                                                    <button onClick={() => { toggleModal4(); window.location.reload(); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Cerrar</button>
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
                                            id="correo_adicional"
                                            name="correo_adicional"
                                            placeholder="Correo Adicional"
                                            class="w-96 appearance-none rounded-full border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500 text-white text-center"
                                            value={perfilEstudiante[0]?.correo_adicional}
                                        />
                                        <button onClick={toggleModal4} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2" type="button">Modificar</button>
                                    </div>
                                </div>
                            </div>

                            {showModal5 && (
                                <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                                    <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                                        <section class="grid  place-content-center bg-slate-600 text-slate-300">
                                            <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-white">Telefono</label>
                                                <input
                                                    type="text"
                                                    name="telefono"
                                                    id="telefono"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    value={perfilEstudiante.telefono}
                                                    placeholder="Telefono"
                                                    required=""
                                                    onChange={(e) => handleModificar('telefono', e.target.value)} />
                                                <div className='flex justify-between mt-4'>
                                                    <button onClick={() => actualizarInfo('telefono', nuevoValor)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Guardar</button>
                                                    <button onClick={() => { toggleModal5(); window.location.reload(); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Cerrar</button>
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
                                            id="telefono"
                                            name="telefono"
                                            placeholder="Telefono"
                                            class="w-96 appearance-none rounded-full border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500 text-white text-center"
                                            value={perfilEstudiante[0]?.telefono}
                                        />
                                        <button onClick={toggleModal5} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2" type="button">Modificar</button>
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-2 mb-5">
                                <div className="flex flex-col">
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            id="correo"
                                            name="correo"
                                            placeholder="Correo"
                                            class="w-96 appearance-none rounded-full border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500 text-white text-center"
                                            value={perfilEstudiante[0]?.division}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-between mt-4'>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarPerfil;

{/** 
             <br /><br /><br /><br /><br />
            
            <form className="max-w-md mx-auto">
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            id="matricula"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            autoComplete='off'
                            required
                            readOnly
                            value={perfilEstudiante[0]?.matricula}
                            onChange={(e) => handleModificar('matricula', e.target.value)}
                        />
                        <label
                            htmlFor="matricula"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Matrícula
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            id="nombres"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            autoComplete='off'
                            value={perfilEstudiante.nombres}
                            onChange={(e) => handleModificar('nombres', e.target.value)}
                        />
                        <label
                            htmlFor="nombres"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Nombres
                        </label>
                        <button
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 px-2 py-1 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                            onClick={() => actualizarInfo('nombres', nuevoValor)}
                        >
                            Modificar
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            id="apellido_p"
                            className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            autoComplete='off'
                            value={perfilEstudiante?.apellido_p}
                            onChange={(e) => handleModificar('apellido_p', e.target.value)}
                        />
                        <label
                            htmlFor="apellido_p"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Apellido Paterno
                        </label>
                        <button
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 px-2 py-1 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                            onClick={() => actualizarInfo('apellido_p', nuevoValor)}
                        >
                            Modificar
                        </button>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            id="apellido_m"
                            className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            autoComplete='off'
                            value={perfilEstudiante.apellido_m}
                            onChange={(e) => handleModificar('apellido_m', e.target.value)}
                        />
                        <label
                            htmlFor="apellido_m"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Apellido Materno
                        </label>
                        <button
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 px-2 py-1 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                            onClick={() => actualizarInfo('apellido_m', nuevoValor)}
                        >
                            Modificar
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            id="correo"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            autoComplete='off'
                            required
                            value={perfilEstudiante[0]?.correo}
                            readOnly
                            onChange={(e) => handleModificar('', e.target.value)}
                        />
                        <label
                            htmlFor="correo"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Correo
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            id="correo_adicional"
                            className="block py-2.5 px-0 w-[100%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            autoComplete='off'
                            value={perfilEstudiante?.correo_adicional}
                            onChange={(e) => handleModificar('correo_adicional', e.target.value)}
                        />
                        <label
                            htmlFor="correo_adicional"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Correo Adicional
                        </label>
                        <button
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 px-2 py-1 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                            onClick={() => actualizarInfo('correo_adicional', nuevoValor)}
                        >
                            Modificar
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="tel"
                            id="telefono"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            autoComplete='off'
                            value={perfilEstudiante.telefono}
                            onChange={(e) => handleModificar('telefono', e.target.value)}
                        />
                        <label
                            htmlFor="telefono"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Teléfono
                        </label>
                        <button
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 px-2 py-1 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                            onClick={() => actualizarInfo('telefono', nuevoValor)}
                        >
                            Modificar
                        </button>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            id="division"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            autoComplete='off'
                            required
                            readOnly
                            value={perfilEstudiante[0]?.division}
                        />
                        <label
                            htmlFor="division"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            División
                        </label>
                    </div>
                </div>

                <div className="flex justify-center space-x-40 mt-8 sm:mt-14">
                    <button
                        type="submit"
                        className="text-indigo-100 bg-[#202142] hover:bg-indigo-900 focus:ring-4 focus:outline-none focus:ring-indigo-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={redireccionarPerfil}
                    >
                        Regresar
                    </button>
                    <button
                        type="submit"
                        className="text-white bg-[#202142] hover:bg-indigo-900 focus:ring-4 focus:outline-none focus:ring-indigo-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={actualizarInfo}
                    >
                        Guardar
                    </button>
                </div>
            </form>
    
    */}