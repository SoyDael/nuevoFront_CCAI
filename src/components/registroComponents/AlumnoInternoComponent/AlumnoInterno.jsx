import React from "react";
import NavbarSimple from "../../navbarComponents/NavbarSimple";
import { registroEstudiante } from "../../../api/APIS";
import Swal from "sweetalert2";

const AlumnoInterno = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const estudiante = Object.fromEntries(formData);

    try {
      await registroEstudiante(estudiante);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Alumno Interno añadido correctamente.",
        showConfirmButton: false,
        timer: 1500,
      });
      e.target.reset();
    } catch (error) {
      console.error("Error al añadir alumno:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al añadir alumno. Por favor, inténtalo de nuevo.",
      });
    }
  };

  return (
    <>
      <NavbarSimple />
      <br /><br /><br /><br /><br />
      <form class="max-w-xl mx-auto" onSubmit={handleSubmit}>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="matricula"
              id="matricula"
              class="block py-3 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
              type="text"
              name="correo"
              id="correo"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="correo"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Correo institucional:
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="correo_adicional"
              id="correo_adicional"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
            <select  type="text"
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
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Registrar Alumno
        </button>
      </form>
    </>
  );
};

export default AlumnoInterno;

{
  /** 
            <div className='bg-gray-100 flex flex-col justify-center items-center min-h-screen'>
                <div className='lg:p-35 md:p-16 sm:20 p-8 w-full lg:w-1/2'>
                    <h1 className='text-2xl font-semibold mb-4'>Registro Alumno Interno</h1>
                    <form action="" onSubmit={handleSubmit} className='max-w-md mx-auto'>
                        <div className='mb-4'>
                            <label htmlFor="matricula" className='block text-gray-600'>Matricula: </label>
                            <input type="text" name="matricula" id="matricula" required
                                className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                                autoComplete='off'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="nombres" className='block text-gray-600 '>Nombres: </label>
                            <input type="text" name="nombres" id="nombres" required
                                className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-transform: uppercase'
                                autoComplete='off'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="apellido_p" className='block text-gray-600'>Apellido Paterno: </label>
                            <input type="text" name="apellido_p" id="apellido_p" required
                                className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-transform: uppercase'
                                autoComplete='off'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="apellido_m" className='block text-gray-600'>Apellido Materno: </label>
                            <input type="text" name="apellido_m" id="apellido_m" required
                                className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-transform: uppercase'
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
                                className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-transform: uppercase'
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
            */
}
