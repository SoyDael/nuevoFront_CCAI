import React, { useEffect, useState } from 'react'
import { registroProyecto, consultaInvestigadores } from '../../api/APIS';
import SlideBarInvestigadores from '../SlideBar/SlideBarInvestigadores';

const RegistroProyecto = () => {

  const [Investigador, setInvestigador] = useState([])

  const [titulo, setTitulo] = useState('');


  useEffect(() => {
    const fetchInvestigador = async () => {
      try {
        const investigador = await consultaInvestigadores();
        console.log(investigador);
        setInvestigador(investigador); // Almacena los proyectos del investigador en el estado
      } catch (error) {
        console.error('Error al obtener proyectos:', error);
        //alert('Error al obtener proyectos. Por favor, inténtalo de nuevo.');
      }
    };
    fetchInvestigador();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("Datos del proyecto ", data);
    try {
      const response = await registroProyecto(data, {titulo_esp: titulo});
      console.log(response);
      alert('Proyecto registrado con éxito');
    } catch (error) {
      console.error('Error al registrar proyecto:', error);
      alert('Error al registrar proyecto. Por favor, inténtalo de nuevo.');
    }
  }


  return (
    <>
      <SlideBarInvestigadores />
      
      <section class="grid h-screen place-content-center bg-slate-600 text-slate-300">
        <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
          <h1 class="text-4xl font-semibold mb-4">Registro proyecto</h1>
          <form onSubmit={handleSubmit}>
            <div class="flex flex-col items-center justify-center space-y-6">
              <input  
              type="text" 
              id="titulo_esp" 
              name="titulo_esp" 
              placeholder="Titulo" 
              class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
               />
              <textarea maxlength="1000" id="descripcion" name="descripcion" placeholder="Descripción" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
              <textarea maxlength="1000" id="objetivo" name="objetivo" placeholder="Objetivo" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />

              <select
                className="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2"
                id='coordinador_correo'
                name="coordinador_correo"
              >
                <option value="">Selecciona un Investigador</option>
                {Investigador.map((investigador) => (
                  <option key={investigador.id_investigador} value={investigador.correo}>
                    {investigador.nombres} {investigador.apellido_p} {investigador.apellido_m}
                  </option>
                ))}
              </select>

              <select
                className="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2"
                name="estatus"
              >
                <option value="">Selecciona un estatus</option>
                <option value="">Nuevo</option>
                <option value="">En progreso</option>
                <option value="">Finalizado</option>
              </select>

              <input type="datetime-local" id="fecha_registro" name="fecha_registro" placeholder="Fecha de registro" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
              <input type="date" id="fecha_inicio" name="fecha_inicio" placeholder="Fecha de inicio" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
              <input type="date" id="fecha_fin" name="fecha_fin" placeholder="Fecha de finalización" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />

              <button t id="showPw" class="rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-indigo-700"><span id="showHide">Añadir</span> Proyecto</button>

            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default RegistroProyecto


{/**
  <br /><br /><br /><br /><br /><br /><br />
      <form class="max-w-xl mx-auto" onSubmit={handleSubmit}>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="titulo_esp"
              id="titulo_esp"
              class="block py-3 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <label
              htmlFor="titulo_esp"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Titulo de proyecto:
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <textarea
              type="text"
              name="objetivo"
              id="objetivo"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              
            />
            <label
              htmlFor="objetivo"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Objetivo:
            </label>
          </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <textarea
              type="text"
              name="descripcion"
              id="descripcion"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              
            />
            <label
              for="descripcion"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Descripcion :
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <select type="text"
              name="coordinador_correo"
              id="coordinador_correo"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              >
              <option value="">Selecciona un Investigador</option>
              {Investigador.map((investigador) => (
                <option key={investigador.id_investigador} value={investigador.correo}>
                  {investigador.nombres} {investigador.apellido_p} {investigador.apellido_m}
                </option>
              ))}
            </select>
            <label
              htmlFor="coordinador_correo"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Investigador:
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="datetime-local"
              name="fecha_registro"
              id="fecha_registro"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              
            />
            <label
              htmlFor="fecha_registro"
              class="peer-focus: font-bold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Fecha de Registro:
            </label>
          </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="fecha_inicio"
              id="fecha_inicio"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              
            />
            <label
              htmlFor="fecha_inicio"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Fecha de Inicio:
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="fecha_final"
              id="fecha_final"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              
            />
            <label
              htmlFor="fecha_final"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Fecha final:
            </label>
          </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
          <select type="text"
              name="estatus"
              id="estatus"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              >
              <option value="">Selecciona un estatus</option>
                <option value="Nuevo">Nuevo</option>
                <option value="EnProgreso">En progreso</option>
                <option value="Finalizado">Finalizado</option>
            </select>
            <label
              htmlFor="estatus"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Estatus del proyecto:
            </label>
          </div>

        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Registrar
        </button>
      </form>
    </>

*/}