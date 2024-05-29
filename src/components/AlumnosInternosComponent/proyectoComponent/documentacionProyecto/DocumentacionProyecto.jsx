import React, { useEffect, useState } from 'react';
import { actualizarDocumentacion, obtenerDocumentacionProgramaPorCorreo, registroDocumentacion } from '../../../../api/APIS';
import { useNavigate, useParams } from 'react-router-dom';
import SlideBarPruebaAlumn from '../../../SlideBar/SlideBarPruebaAlumn';
import Swal from 'sweetalert2'


const DocumentacionProyecto = () => {

    const { id_documento, id_proyecto, correo_estudiante } = useParams();

    const [documentacion, setDocumentacion] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fileName, setFileName] = useState("No hay archivos seleccionados");

    const [nuevoValor, setNuevoValor] = useState('');
    const [campoAEditar, setCampoAEditar] = useState('');

    const navigate = useNavigate();

    const redireccionarDetalles = () => {
        navigate(`/detallesProyectoAlumno/${correo_estudiante}/${id_proyecto}`);
    }


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64File = reader.result.split(',')[1]; // Elimina la parte del encabezado
                setFileName(file.name);
                setNuevoValor(base64File); // Almacena el archivo en base64 en nuevoValor
                console.log(base64File)
                actualizarDocumentacionLocal('archivo', base64File); // !!Actualizar el campo de la documentacion
            };
        } else {
            setFileName("No hay archivos seleccionados");
            setNuevoValor('');
        }
    };

    const decodeBase64 = (base64) => {
        const binaryString = window.atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return new Blob([bytes], { type: 'application/pdf' });
    }

    const actualizarDocumentacionLocal = (field, value, fecha) => {
        const documento = documentacion[0]?.id_documento;
        console.log('documento Org->', documentacion);
        if (documento) {
            const documentacionActualizada = { ...documentacion[0], [field]: value, fecha }; // !!Actualizar el campo de la documentacion
            console.log('Documento actualizado->', documentacionActualizada);
            actualizarDocumentacion(documento, documentacionActualizada).then(resp => {
                if (resp.status === 200) {
                    Swal.fire({
                        title: 'Realizado',
                        text: 'Documento Actualizado.',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    })
                }
            }).catch(error => {
                console.error('Error al actualizar documentacion:', error);
                Swal.fire({
                    title: 'Oops!',
                    text: 'Algo salio mal, intentalo de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            })
        }
    }


    const handleModificar = (field, value) => {//aqui
        setCampoAEditar(field);
        setNuevoValor(value);
    }

    useEffect(() => {
        const fetchDocumentacion = async () => {
            try {
                const documentacion = await obtenerDocumentacionProgramaPorCorreo(correo_estudiante);
                console.log(documentacion);
                setDocumentacion(documentacion);
                if (documentacion.length > 0 && documentacion[0].archivo) {
                    setFileName(documentacion[0].archivo);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener documentacion:', error);
                alert('Error al obtener documentacion. Por favor, inténtalo de nuevo.');
            }
        };

        fetchDocumentacion();
    }, [correo_estudiante]);



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


    const handleSubmit = (event) => {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Convertir la fecha al formato adecuado
        const fecha = new Date();
        const formattedFecha = fecha.toISOString().slice(0, 19).replace('T', ' ').replace(/-/g, '/');

        // Llamar a la función de actualización con los datos relevantes
        actualizarDocumentacionLocal(campoAEditar, nuevoValor, formattedFecha);
        event.target.reset();
    };

    return (
        <div>
            <SlideBarPruebaAlumn />

            <div className="flex justify-center items-center h-screen bg-slate-400">


                <div className="max-w-lg border border-slate-900 rounded-lg bg-slate-700 dark:border-slate-700 flex justify-center items-center">
                    <div className="p-5 text-center">
                        <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-300">Documentacion</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="grid mb-10 sm:grid-cols-2 sm:gap-10 sm:mb-30 w-full">
                                {showModal && (
                                    <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                                        <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                value={documentacion.nombre}
                                                placeholder="Nombre del documento"
                                                required=""
                                                onChange={(e) => handleModificar('nombre', e.target.value)} />
                                            <div className='flex justify-between mt-4'>
                                                <button onClick={() => actualizarDocumentacionLocal('nombre', nuevoValor)} className="text-sm font-medium text-white bg-blue-700 rounded-lg py-1 px-3">Guardar</button>
                                                <button onClick={() => { toggleModal(); window.location.reload(); }} className="text-sm font-medium text-white bg-blue-700 rounded-lg py-1 px-3">Cerrar</button>
                                            </div>
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
                                            value={documentacion[0]?.nombre}
                                        />
                                        <button onClick={toggleModal} className="text-sm font-medium text-white bg-indigo-700 hover:bg-indigo-900 rounded-lg py-1 px-5 ml-2" type="button">Modificar</button>
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <div className="flex flex-col">
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            placeholder="Titulo"
                                            class="w-96 appearance-none rounded-full border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500 text-white text-center"
                                            value={documentacion[0]?.correo_estudiante}
                                        />
                                    </div>
                                </div>
                            </div>


                            {/** Menu Desplegable para editar fecha */}

                            <div className="grid mb-10 sm:grid-cols-2 sm:gap-10 sm:mb-30 w-full">
                                {showModal2 && (
                                    <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                                        <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha: </label>
                                            <input
                                                type="date"
                                                name="fecha"
                                                id="fecha"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                value={documentacion.fecha}
                                                placeholder="Fecha de creacion"
                                                required=""
                                                onChange={(e) => handleModificar('fecha', e.target.value)} />
                                            <div className='flex justify-between mt-4'>
                                                <button onClick={() => actualizarDocumentacionLocal('fecha', nuevoValor)} className="text-sm font-medium text-white bg-blue-700 rounded-lg py-1 px-3">Guardar</button>
                                                <button onClick={() => { toggleModal2(); window.location.reload(); }} className="text-sm font-medium text-white bg-blue-700 rounded-lg py-1 px-3">Cerrar</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/** Termina Menu Desplegable para editar fecha */}


                            <div className="sm:col-span-2">
                                <div className="flex flex-col">
                                    <div className="flex items-center">
                                        <input type="text" id="fecha" name="fecha" placeholder="Fecha de registro"
                                            class="w-96 appearance-none rounded-full border-0 bg-slate-900 p-2 focus:bg-slate-700 focus:ring-2 focus:ring-orange-500 text-white text-center"
                                            value={documentacion[0]?.fecha} />
                                        <button onClick={toggleModal2} className="text-sm font-medium text-white bg-indigo-800 hover:bg-indigo-900 rounded-lg py-1 px-5 ml-2" type="button">Modificar</button>
                                    </div>

                                </div>
                            </div>

                            {/** Menu Desplegable para editar documento */}

                            <div className="grid mb-10 sm:grid-cols-2 sm:gap-10 sm:mb-30 w-full">
                                {showModal3 && (
                                    <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                                        <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha: </label>
                                            <textarea
                                                type="text"
                                                name="documento"
                                                id="documento"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                value={documentacion.documento}
                                                placeholder="Aqui va tu descripcion"
                                                required=""
                                                onChange={(e) => handleModificar('documento', e.target.value)} />
                                            <div className='flex justify-between mt-4'>
                                                <button onClick={() => actualizarDocumentacionLocal('documento', nuevoValor)} className="text-sm font-medium text-white bg-blue-700 rounded-lg py-1 px-3">Guardar</button>
                                                <button onClick={() => { toggleModal3(); window.location.reload(); }} className="text-sm font-medium text-white bg-blue-700 rounded-lg py-1 px-3">Cerrar</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/** Termina Menu Desplegable para editar documento */}


                            <div className="sm:col-span-2 mb-10">
                                <div className="flex flex-col">
                                    <div className="flex items-center">
                                        <textarea type="text" id="documento" name="documento" placeholder="Aqui va tu descripcion"
                                            class="w-96 rounded-md		 appearance-none border-0 bg-slate-900 p-2 focus:bg-slate-700 focus:ring-2 focus:ring-orange-500 text-white text-center"
                                            value={documentacion[0]?.documento} />
                                        <button onClick={toggleModal3} className="text-sm font-medium text-white bg-slate-400 hover:bg-slate-300 rounded-lg py-1 px-5 ml-2" type="button">Modificar</button>
                                    </div>

                                </div>
                            </div>



                            <div className='flex justify-between mt-4'>

                            <div className="flex justify-center">
                            <button onClick={redireccionarDetalles} className="text-sm font-medium text-white bg-gray-700 hover:bg-gray-900 rounded-lg py-1 px-3 ml-4 ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                </svg>

                            </button>
                        </div>

                                <div className="w-full">
                                    {/**  <label htmlFor="file-upload" className="text-end inline-flex mb-2 text-sm font-medium text-gray-900 dark:text-white text-">Sube tu evidencia</label> */}
                                    <div className="flex items-center">
                                        <label htmlFor="file-upload" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600 ml-4">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 100-4 2 2 0 000 4zM3 21a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-4l-3-3-3 3H5a2 2 0 00-2 2v12zm5-10a3 3 0 110 6 3 3 0 010-6z"></path></svg>
                                            <span>Seleccionar Archivo</span>
                                            <input id="file-upload" name="image" type="file" className="sr-only" accept='.docx, .doc'
                                                onChange={handleFileChange} />
                                        </label>
                                        {/**   <span className="text-gray-500 dark:text-gray-400">{fileName}</span> */}
                                    </div>
                                </div>

                                <div className="w-full">
                                    <div className="flex items-center">
                                        <label className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600 ml-4 ">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 100-4 2 2 0 000 4zM3 21a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-4l-3-3-3 3H5a2 2 0 00-2 2v12zm5-10a3 3 0 110 6 3 3 0 010-6z"></path></svg>
                                            <span>Descargar</span>
                                            <input name="image" className="sr-only" />
                                        </label>
                                        {/**   <span className="text-gray-500 dark:text-gray-400">{fileName}</span> */}
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default DocumentacionProyecto;


{/**
     <div className='  bg-slate-400 flex items-center justify-center min-h-screen from-gray-700 via-gray-800 to-gray-900 '>
                <div className="w-4/12 break-word border shadow-2xl bg-slate-700 border-gray-700  rounded-xl  shadow-blue-500/50">
                    <h2 className="mb-4 text-center text-4xl font-bold  text-slate-300">Documentacion</h2>
                    <br></br>
                    <form onSubmit={handleSubmit}>
                        <div className="grid mb-10 sm:grid-cols-2 sm:gap-10 sm:mb-30 w-full">
                            {showModal && (
                                <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                                    <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            value={documentacion.nombre}
                                            placeholder="Nombre del documento"
                                            required=""
                                            onChange={(e) => handleModificar('nombre', e.target.value)} />
                                        <div className='flex justify-between mt-4'>
                                            <button onClick={() => actualizarDocumentacionLocal('nombre', nuevoValor)} className="text-sm font-medium text-white bg-blue-700 rounded-lg py-1 px-3">Guardar</button>
                                            <button onClick={() => { toggleModal(); window.location.reload(); }} className="text-sm font-medium text-white bg-blue-700 rounded-lg py-1 px-3">Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/**inicia el formulario {/** 
                            <div className="sm:col-span-2">
                                <div className="flex flex-col">
                                    <label htmlFor="name" className="block mb-2 text-md font-medium text-white">Nombre</label>
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            value={documentacion[0]?.nombre}
                                            placeholder="Type product name"
                                            required=""
                                            readOnly />
                                        <button onClick={toggleModal} className="text-sm font-medium text-white bg-blue-700 rounded-lg py-1 px-5 ml-2" type="button">Modificar</button>
                                    </div>
                                </div>
                            </div>


                            <div className="sm:col-span-2">
                                <label htmlFor="correo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
                                <input type="email" name="correo" id="correo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={documentacion[0]?.correo_estudiante} placeholder="Type email address" required="" />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
                                <textarea id="descripcion" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Agrega tu descripcion aqui" value={documentacion[0]?.descripcion}></textarea>
                            </div>


                            <div className="w-full">
                                <label htmlFor="file-upload" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sube tu evidencia</label>
                                <div className="flex items-center">
                                    <label htmlFor="file-upload" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 100-4 2 2 0 000 4zM3 21a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-4l-3-3-3 3H5a2 2 0 00-2 2v12zm5-10a3 3 0 110 6 3 3 0 010-6z"></path></svg>
                                        <span>Seleccionar Archivo</span>
                                        <input id="file-upload" name="image" type="file" className="sr-only" accept='.docx, .doc'
                                            onChange={handleFileChange} />
                                    </label>
                                    {/**   <span className="text-gray-500 dark:text-gray-400">{fileName}</span> */}
{/*} </div>
                            </div>
                           
                            <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descarga tu evidencia</label>
                                <div className="flex items-center">
                                    <label className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 100-4 2 2 0 000 4zM3 21a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-4l-3-3-3 3H5a2 2 0 00-2 2v12zm5-10a3 3 0 110 6 3 3 0 010-6z"></path></svg>
                                        <span>Descargar</span>
                                        <input name="image" className="sr-only" />
                                    </label>
                                    {/**   <span className="text-gray-500 dark:text-gray-400">{fileName}</span> */}
{/*}  </div>
                            </div>

                        </div>

                        {/**                     <div className="flex items-center space-x-4">
                        <button type="submit" className="text-dark bg-slate-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        
                        >
                            Actualizar
                        </button>
                        
                    </div>
                    */}
{/*} </form>
                </div>
            </div>
        </div>

    */}