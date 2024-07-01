import React, { useState } from 'react'
import { pruebaPA } from '../../api/APIS';
import NavbarSimple from '../navbarComponents/NavbarSimple';

const PruebaPA = () => {


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const usuario = Object.fromEntries(formData);

    try {
      await pruebaPA(usuario);
      alert('Usuario añadido correctamente');
    } catch (error) {
      console.error('Error al añadir usuario:', error);
      alert('Error al añadir usuario. Por favor, inténtelo de nuevo más tarde.');
    }
  };

  const [tipoUsuario, setTipoUsuario] = useState('');


  const handleTipoUsuarioChange = (e) => {
    setTipoUsuario(e.target.value);
  };



  return (
    <div>
      <NavbarSimple />
      <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div className="">
          <section>
            <div className="rounded-md p-4 relative border shadow-2xl bg-gray-800 border-gray-700 shadow-blue-500/50">
              <h1 className='text-2xl font-semibold mb-4'>Registro Usuario</h1>
              <form action="" onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <label htmlFor="correo" className='block text-gray-600'>Correo: </label>
                  <input type="email" name="correo" id="correo" required
                    className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                    autoComplete='off'
                  />
                </div>
                <div className='mb-4'>
                  <label htmlFor="password" className='block text-gray-600'>Contraseña: </label>
                  <input type="password" name="password" id="password" required
                    className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                    autoComplete='off'
                  />
                </div>
                <div className='mb-4'>
                  <label htmlFor="tipo" className='block text-gray-600'>Tipo de usuario: </label>
                  <select name="tipo" id="tipo" value={tipoUsuario} onChange={handleTipoUsuarioChange}
                    className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-center'>
                    <option value="Investigador">Investigador</option>
                    <option value="Alumno Interno">Alumno Interno</option>
                    <option value="Alumno Externo">Alumno Externo</option>
                  </select>
                </div>

                {/* Campos específicos según el tipo de usuario */}
                {tipoUsuario === 'Investigador' && (
                  <>
                    {/* Aquí puedes agregar los campos específicos para Investigador */}
                    <div className='mb-4'>
                      <label htmlFor="titulo" className='block text-gray-600'>Titulo: </label>
                      <input type="text" name="titulo" id="titulo" required
                        className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                        autoComplete='off'
                      />
                    </div>
                    <div className='mb-4'>
                      <label htmlFor="nombres" className='block text-gray-600'>Nombre: </label>
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
                      <label htmlFor="telefono" className='block text-gray-600'>Telefono: </label>
                      <input type="text" name="telefono" id="telefono" required
                        className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                        autoComplete='off'
                      />
                    </div>
                    <div className='mb-4'>
                      <label htmlFor="estatus" className='block text-gray-600'>Tipo de usuario: </label>
                      <select name="estatus" id="estatus" 
                        className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-center'>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                      </select>
                    </div>
                  </>
                )}

                {tipoUsuario === 'Alumno Interno' && (
                  <>
                    {/* Campos específicos para Alumno Interno */}
                    <div className='mb-4'>
                      <label htmlFor="institucion" className='block text-gray-600'>Institución: </label>
                      <input type="text" name="institucion" id="institucion" required
                        className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                        autoComplete='off'
                      />
                    </div>
                  </>
                )}

                {tipoUsuario === 'Alumno Externo' && (
                  <>
                    {/* Campos específicos para Alumno Externo */}
                    <div className='mb-4'>
                      <label htmlFor="otraPropiedad" className='block text-gray-600'>Otra Propiedad: </label>
                      <input type="text" name="otraPropiedad" id="otraPropiedad" required
                        className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                        autoComplete='off'
                      />
                    </div>
                  </>
                )}

                <button type="submit"
                  className='mb-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full'>
                  Añadir usuario
                </button>
              </form>
              <div className="mb-6 text-blue-500 text-center">
                <a href='login' className="hover:underline">
                  Regresar
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PruebaPA
