import React, { useState } from 'react'
import { pruebaPA } from '../../api/APIS';
import NavbarSimple from '../navbarComponents/NavbarSimple';
import SlideBarInvestigadores from '../SlideBar/SlideBarInvestigadores';

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
      <SlideBarInvestigadores />
      <div className="fixed inset-0  bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div className="">
          <section>
            <div className="rounded-md p-4 relative border shadow-2xl bg-gray-800 border-gray-700 shadow-blue-500/50">
              <h1 className='text-2xl font-semibold mb-4 text-white text-center'>Registro Usuario</h1>
              <form action="" onSubmit={handleSubmit}>
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="correo"
                    id="correo"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="correo"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-center"
                  >
                    Correo
                  </label>
                </div>

                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="password"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-center"
                  >
                    Password
                  </label>
                </div>

                <div class="relative z-0 w-full mb-5 group">
                  <select type="text"
                    name="tipo"
                    id="tipo"
                    class="block py-2.5 px-0 w-full text-sm text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={tipoUsuario} onChange={handleTipoUsuarioChange}
                  >
                    <option value="">Selecciona una opcion</option>
                    <option value="Investigador">Investigador</option>
                    <option value="Alumno Interno">Alumno Interno</option>
                    <option value="Alumno Externo">Alumno Externo</option>

                  </select>
                  <label
                    htmlFor="tipo"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Tipo de usuario:
                  </label>
                </div>

                {/* Campos  según el tipo de usuario */}
                {tipoUsuario === 'Investigador' && (
                  <>
                    <div className="">
                      <div className=" ">
                        <section class="">
                          <div className=" ">
                            <form class="max-w-xl mx-auto" id='formulario'>
                              <div class="grid md:grid-cols-2 md:gap-6">
                                <div class="relative z-0 w-full mb-5 group">
                                  <input
                                    type="text"
                                    name="titulo"
                                    id="titulo"
                                    class="block py-3 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                  />
                                  <label
                                    htmlFor="titulo"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                  >
                                    Titulo:
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
                                    name="estatus"
                                    id="estatus"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required>

                                    <option value="" > Selecciona una opción </option>
                                    <option value="Activo"  > Activo </option>
                                    <option value="Inactivo"> Inactivo </option>

                                  </select>
                                  <label
                                    htmlFor="division"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                  >
                                    Estatus:
                                  </label>
                                </div>
                              </div>
                            </form>
                          </div>
                        </section>

                      </div>
                    </div>
                  </>
                )}

                {tipoUsuario === 'Alumno Interno' && (
                  <>
                    {/* Campos para Alumno Interno */}
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
                          class="block py-2.5 px-0 w-full text-sm text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                    {/* Campos para Alumno Externo */}
                    <div className="">
                      <div className="">
                        <section class="">
                          <div className="">
                            <h2 className="mb-4 text-xl font-bold text-gray-900 text-white">Registro Alumno Externo</h2>
                            <div class="grid md:grid-cols-2 md:gap-6">

                              <div class="relative z-0 w-full mb-5 group">
                                <input
                                  type="text"
                                  name="nombres"
                                  id="nombres"
                                  class="block py-3 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                  placeholder=""
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
                                  class="block py-3 px-3 w-full text-sm text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                                  name="estatus"
                                  id="estatus"
                                  class="block py-3 px-3 w-full text-sm text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                  placeholder=" "
                                  required>

                                  <option value="" > Selecciona una opción </option>
                                  <option value="Activo"  > Activo </option>
                                  <option value="Inactivo"> Inactivo </option>

                                </select>
                                <label
                                  htmlFor="division"
                                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                  Estatus:
                                </label>
                              </div>
                            </div>
                          </div>
                        </section>

                      </div>
                    </div>
                  </>
                )}

                <button type="submit"
                  className='mb-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full'
                  onClick={window.location.reload}>
                  Añadir usuario
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PruebaPA
