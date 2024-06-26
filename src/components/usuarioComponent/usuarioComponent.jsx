import React from 'react';
import { createUsuario } from '../../api/APIS';
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
            <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
                <div className=" border border-gray-200 rounded-lg shadow-lg p-5">
                    <section class="grid  place-content-center bg-slate-600 text-slate-300">
                        <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
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
                    </section>
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