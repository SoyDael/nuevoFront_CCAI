import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { registroPrograma } from '../../../api/APIS';

const RegistroPrograma = () => {

    const { id_proyecto, id_estudiante, estudiante_correo } = useParams();
    const { correo } = useParams();

    const navigate = useNavigate();

    const redireccionarIntegrantes = () => {
        navigate(`/listadoAlumnos/${correo}`);
    }

    const redireccionarAsignarProyecto = () => {
        navigate(`/asignarProyecto/${correo}/${id_estudiante}/${estudiante_correo}`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const programa = Object.fromEntries(formData);

        try {
            await registroPrograma(programa, id_estudiante, estudiante_correo);
            alert('Programa asignado correctamente');
            navigate(`/asignarProyecto/${correo}/${id_estudiante}/${correo_estudiante}`);

            e.target.reset();
        } catch (error) {
            console.error('Error al asignar programa:', error);
        }
    }

    return (
        <>
            <div className='bg-gray-100 flex justify-center items-center h-screen'>
                <div className='lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2'>
                    <h1 className='text-2xl font-semibold mb-4'>Asignar Programa </h1>
                    <form action="" onSubmit={handleSubmit} >
                        <div className='flex mb-4'>
                            <label htmlFor="tipo" className='block text-gray-600 mr-2'>Tipo de Programa: </label>
                            <input type="text" name="tipo" id="tipo" required
                                className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                                autoComplete='off'
                            />
                        </div>
                        <div className='flex mb-4'>
                            <label htmlFor="estatus" className='block text-gray-600 mr-2'>Estatus: </label>
                            <input type="text" name="estatus" id="estatus" required
                                className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                                autoComplete='off'
                            />
                        </div>
                        <div className='flex mb-4'>
                            <label htmlFor="semestre" className='block text-gray-600 mr-2'>Semestre: </label>
                            <input type="text" name="semestre" id="semestre" required
                                className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                                autoComplete='off'
                            />
                        </div>
                        <div className='flex mb-4'>
                            <label htmlFor="fecha_inicio" className='block text-gray-600 mr-2'>Fecha de inicio: </label>
                            <input type="date" name="fecha_inicio" id="fecha_inicio" required
                                className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                                autoComplete='off'
                            />
                        </div>
                        <div className='flex mb-4'>
                            <label htmlFor="fecha_fin" className='block text-gray-600 mr-2'>Fecha de termino: </label>
                            <input type="date" name="fecha_fin" id="fecha_fin" required
                                className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                                autoComplete='off'
                            />
                        </div>
                        <div className="flex gap-4">
                            <button type="submit"
                                className='flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4'>
                                    Registrar programa
                            </button>
                        </div>
                    </form>
                    <div className="flex justify-center mt-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={redireccionarIntegrantes}
                        >
                            Regresar
                        </button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default RegistroPrograma