import React from 'react'
import NavbarSimple from '../../navbarComponents/NavbarSimple'
import { registroEstudiante } from '../../../api/APIS';

const AlumnoInterno = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const estudiante = Object.fromEntries(formData);

        try {
            await registroEstudiante(estudiante);
            alert('Alumno Interno añadido correctamente');
            e.target.reset();
        } catch (error) {
            console.error('Error al añadir alumno:', error);
            alert('Error al añadir alumno. Por favor, inténtelo de nuevo más tarde.');
        }
    };

    return (
        <>
            <NavbarSimple />
            <div className='bg-gray-100 flex flex-col justify-center items-center min-h-screen'>
                <div className='lg:p-35 md:p-16 sm:20 p-8 w-full lg:w-1/2'>
                    <h1 className='text-2xl font-semibold mb-4'>Registro Alumno Interno</h1>
                    <form action="" onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label htmlFor="matricula" className='block text-gray-600'>Matricula: </label>
                            <input type="text" name="matricula" id="matricula" required
                                className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                                autoComplete='off'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="nombres" className='block text-gray-600'>Nombres: </label>
                            <input type="text" name="nombres" id="nombres" required
                                className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                                autoComplete='off'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="apellido_p" className='block text-gray-600'>Apellido Paterno: </label>
                            <input type="text" name="apellido_p" id="apellido_p" required
                                className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                                autoComplete='off'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="apellido_m" className='block text-gray-600'>Apellido Materno: </label>
                            <input type="text" name="apellido_m" id="apellido_m" required
                                className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                                autoComplete='off'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="correo" className='block text-gray-600'>Correo Institucional: </label>
                            <input type="email" name="correo" id="correo" required
                                className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                                autoComplete='off'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="correo_adicional" className='block text-gray-600'>Correo Adicional: </label>
                            <input type="email" name="correo_adicional" id="correo_adicional" required
                                className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                                autoComplete='off'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="telefono" className='block text-gray-600'>Teléfono: </label>
                            <input type="tel" name="telefono" id="telefono" required
                                className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                                autoComplete='off'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="division" className='block text-gray-600'>División: </label>
                            <input type="text" name="division" id="division" required
                                className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                                autoComplete='off'
                            />
                        </div>
                        <button type="submit"
                            className='mb-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full'>
                            Añadir Alumno
                        </button>
                    </form>
                    <div className="mb-6 text-blue-500 text-center">
                        <a href='/login' className="hover:underline">
                            Regresar
                        </a>
                    </div>
                </div>
            </div>
        </>

    )
}

export default AlumnoInterno