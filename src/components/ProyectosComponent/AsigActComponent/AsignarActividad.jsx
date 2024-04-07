import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { asignarActividad } from '../../../api/APIS';


const AsignarActividad = () => {

    const navigate = useNavigate();

    const { id_proyecto, id_estudiante, correo_estudiante } = useParams();
    const { correo } = useParams();

    const redireccionarIntegrantes = () => {
        navigate(`/integrantes/${id_proyecto}/${correo}`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const actividad = Object.fromEntries(formData);

        try {
            await asignarActividad(actividad, id_proyecto, id_estudiante, correo_estudiante);
            alert('Actividad asignada correctamente');
            navigate(`/integrantes/${id_proyecto}/${correo}`);
        } catch (error) {
            console.error('Error al asignar actividad:', error);
            alert('Error al asignar actividad. Por favor, inténtelo de nuevo más tarde.');
        }
    }

    return (
        <>
        <div className='bg-gray-100 flex justify-center items-center h-screen'>
            <div className='lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2'>
                <h1 className='text-2xl font-semibold mb-4'>Asignar actividad </h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className='flex mb-4'>
                        <label htmlFor="actividad" className='block text-gray-600 mr-2'>Nombre de la Actividad: </label>
                        <input type="text" name="actividad" id="actividad" required
                            className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                            autoComplete='off'
                        />
                    </div>
                    <div className='flex mb-4'>
                        <label htmlFor="fecha_inicio" className='block text-gray-600 mr-2'>Fecha de inicio: </label>
                        <input type="datetime-local" name="fecha_inicio" id="fecha_inicio" required
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
                            Asignar Actividad
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

export default AsignarActividad
