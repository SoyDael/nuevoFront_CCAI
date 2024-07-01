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
                    <div class="grid md:grid-cols-2 md:gap-6">
                      <div class="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="matricula"
                          id="matricula"
                          class="block py-3 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="matricula"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Matricula:
                        </label>
                      </div>
                      <div class="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="nombres"
                          id="nombres"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="nombres"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Nombre(s):
                        </label>
                      </div>
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                      <div class="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="apellido_p"
                          id="apellido_p"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="apellido_p"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Apellido paterno:
                        </label>
                      </div>
                      <div class="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="apellido_m"
                          id="apellido_m"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="apellido_m"
                          class="peer-focus: font-bold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Apellido materno:
                        </label>
                      </div>
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                      <div class="relative z-0 w-full mb-5 group">
                        <input
                          type="email"
                          name="correo_adicional"
                          id="correo_adicional"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="correo_adicional"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Correo adicional:
                        </label>
                      </div>
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                      <div class="relative z-0 w-full mb-5 group">
                        <input
                          type="tel"
                          name="telefono"
                          id="telefono"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="telefono"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Telefóno:
                        </label>
                      </div>
                      <div class="relative z-0 w-full mb-5 group">
                        <select type="text"
                          name="division"
                          id="division"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required>

                          <option value="" > Selecciona una opción </option>
                          <option value="Ingenería Informática"  > Ingenería Informática </option>
                          <option value="Ingenería en Sistemas Computacionales"> Ingenería en Sistemas Computacionales </option>
                          <option value="Ingenería Electrónica"> Ingenería Electrónica </option>
                          <option value="Ingenería Mecánica"> Ingenería Mecánica </option>
                          <option value="Ingenería Bioquímica"> Ingenería Bioquímica </option>
                          <option value="Ingenería Química"> Ingenería Química </option>
                          <option value="Ingenería Industrial"> Ingenería Industrial </option>
                          <option value="Ingenería Mecatrónica"> Ingenería Mecatrónica </option>
                          <option value="Ingenería en Gestión Empresarial"> Ingenería en Gestión Empresarial </option>
                          <option value="Ingenería Aeronáutica"> Ingenería Aeronáutica </option>
                          <option value="Contador Público"> Contador Público </option>
                        </select>
                        <label
                          htmlFor="division"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          División:
                        </label>
                      </div>
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
                <a href='/login' className="hover:underline">
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
