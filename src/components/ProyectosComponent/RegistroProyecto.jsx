import React, { useEffect, useState } from 'react'
import { registroProyecto, consultaInvestigadores } from '../../api/APIS';
import SlideBarInvestigadores from '../SlideBar/SlideBarInvestigadores';

const RegistroProyecto = () => {

  const [Investigador, setInvestigador] = useState([])


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
      const response = await registroProyecto(data);
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


      <section class="grid h-screen place-content-center bg-slate-700 text-slate-300">
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
              <textarea id="descripcion" name="descripcion" placeholder="Descripción" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
              <textarea id="objetivo" name="objetivo" placeholder="Objetivo" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />

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
