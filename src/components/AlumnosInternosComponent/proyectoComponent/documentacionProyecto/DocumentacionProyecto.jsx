import React, { useEffect, useState } from 'react';
import { obtenerDocumentacionPrograma } from '../../../../api/APIS';

const DocumentacionProyecto = () => {
    const [documentacion, setDocumentacion] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fileName, setFileName] = useState("No hay archivos seleccionados");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName("No hay archivos seleccionados");
        }
    };

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

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Documentacion</h2>
                <form action="#">
                    <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={documentacion[0]?.nombre} placeholder="Type product name" required="" />
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
                                    <input id="file-upload" name="image" type="file" className="sr-only" onChange={handleFileChange} />
                                </label>
                                <span className="text-gray-500 dark:text-gray-400">{fileName}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button type="submit" className="text-dark bg-slate-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            Actualizar
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default DocumentacionProyecto;
