import React from 'react';
import { createUsuario } from '../../api/APIS';
import NavbarSimple from '../navbarComponents/NavbarSimple';

const UsuarioForm = () => {

    const RedireccionarInvetigador = (correo) => {
        navigate(`/perfilInvestigador/${correo}`);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const usuario = Object.fromEntries(formData);

        try {
            await createUsuario(usuario);
            alert('Usuario añadido correctamente');
        } catch (error) {
            console.error('Error al añadir usuario:', error);
            alert('Error al añadir usuario. Por favor, inténtelo de nuevo más tarde.');
        }
    };

    return (
        <>
            <NavbarSimple />
            <div className='bg-gray-100 flex justify-center items-center h-screen'>
                <div className='lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2'>
                    <h1 className='text-2x1 font-semibold mb-4'>Registro Usuario</h1>
                    <form action="" onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label htmlFor="correo" className='block text-gray-600'>Correo: </label>
                            <input type="email" name="correo" id="correo" required
                                className='w-full border boder-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                                autoComplete='off'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="password" className='block text-gray-600'>Contraseña: </label>
                            <input type="password" name="password" id="password" required
                                className='w-full border boder-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                                autoComplete='off'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="tipo" className='block text-gray-600'>Tipo de usuario: </label>
                            <select name="tipo" id="tipo"
                                className='w-full border boder-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-center'>
                                <option value="Investigador">Investigador</option>
                                <option value="Alumno Interno">Alumno Interno</option>
                                <option value="Alumno Externo">Alumno Externo</option>
                            </select>
                        </div>
                        <button type="submit"
                            className='mb-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full'>
                            Añadir usuario
                        </button>
                    </form>
                    <div class="mb-6 text-blue-500 text-center">
                        <a href='login' class="hover:underline">
                            Regresar
                        </a>
                    </div>
                </div>

            </div>
        </>
    );
};

export default UsuarioForm;

{/**
 <form action="" onSubmit={handleSubmit}>
            <label htmlFor="correo">Correo: </label>
            <input type="email" name="correo" id="correo" />
            <label htmlFor="password">Contraseña: </label>
            <input type="password" name="password" id="password" />
            <label htmlFor="tipo">Tipo de usuario: </label>
            <select name="tipo" id="tipo">
                <option value="Investigador">Investigador</option>
                <option value="Alumno Interno">Alumno Interno</option>
                <option value="Alumno Externo">Alumno Externo</option>
            </select>

            <button type="submit">Añadir usuario</button>
        </form>
*/}