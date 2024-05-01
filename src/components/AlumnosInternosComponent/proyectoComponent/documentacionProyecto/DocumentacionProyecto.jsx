import React, { useEffect, useState } from 'react';
import { obtenerDocumentacionPrograma, actualizarDocumentacion } from '../../../../api/APIS';
import { useParams } from 'react-router-dom';

const DocumentacionProyecto = () => {

    const { id_documento } = useParams();

    const [documentacion, setDocumentacion] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fileName, setFileName] = useState("No hay archivos seleccionados");

    const [nuevoValor, setNuevoValor] = useState('');
    const [campoAEditar, setCampoAEditar] = useState('');



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
                    alert('Documentacion actualizada correctamente');
                }
            }).catch(error => {
                console.error('Error al actualizar documentacion:', error);
                alert('Error al actualizar documentacion. Por favor, inténtalo de nuevo.');

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
                const documentacion = await obtenerDocumentacionPrograma();
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
    }, []);



    {/** menu desplegable*/ }

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Convertir la fecha al formato adecuado
        const fecha = new Date();
        const formattedFecha = fecha.toISOString().slice(0, 19).replace('T', ' ').replace(/-/g, '/');


        // Llamar a la función de actualización con los datos relevantes
        actualizarDocumentacionLocal(campoAEditar, nuevoValor, formattedFecha);
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Documentacion</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                        {showModal && (
                            <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
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

                        <div className="sm:col-span-2">
                            <div className="flex flex-col">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
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
                                    <input id="file-upload" name="image" type="file" className="sr-only"
                                        onChange={handleFileChange} />
                                </label>
                                <span className="text-gray-500 dark:text-gray-400">{fileName}</span>
                            </div>
                        </div>
                    </div>

                    {/**                     <div className="flex items-center space-x-4">
                        <button type="submit" className="text-dark bg-slate-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        
                        >
                            Actualizar
                        </button>
                        
                    </div>
                    */}
                </form>
            </div>
        </section>
    );
};

export default DocumentacionProyecto;
