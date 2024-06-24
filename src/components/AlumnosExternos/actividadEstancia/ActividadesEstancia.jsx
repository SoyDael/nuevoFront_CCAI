import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { actividadesEstanciasPorCorreo, perfilExterno } from '../../../api/APIS'
import SlideBarAlumExt from '../../SlideBar/SlideBarAlumExt'
import Swal from 'sweetalert2'

const ActividadesEstancia = () => {

  const { correo, residente_correo, correo_estancia_residente } = useParams();
  const [actividadesForm, setActividadesForm] = useState([]);

  const navigate = useNavigate();

  const redireccionarDetalles = () => {
    navigate(`/detallesActividadEstancia/${correo || residente_correo || correo_estancia_residente}`);
  }

  const obtenerActividades = async (e) => {
    e.preventDefault();
    try {
      const response = await perfilExterno({ correo: correo }); // Pasar solo el correo del estudiante
      const token = response.token;
      console.log(token);
      localStorage.setItem('token', token);

      const actividades = await actividadesEstanciasPorCorreo(correo);
      setActividadEstudiante(actividades);

      redireccionarDetalles();
    } catch (error) {
      console.log('Error al obtener actividades:', error);
      console.error('Error al obtener actividades:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al obtener actividades. Por favor, inténtalo de nuevo."
      });
    }
  }


  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const actividades = await actividadesEstanciasPorCorreo(correo);
        console.log(actividades);
        setActividadesForm(actividades);
      } catch (error) {
        console.error('Error al obtener actividades:', error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al obtener actividades. Por favor, inténtalo de nuevo."
        });
      }
    };

    fetchActividades();
  }, [correo]);

  return (
    <div>
      <>
        <SlideBarAlumExt />
        <div class="flex min-h-screen items-center justify-center bg-slate-400  from-gray-700 via-gray-800 to-gray-900">
          <div className="relative overflow-x-auto  sm:rounded-lg bg-slate-800 shadow-lg shadow-blue-500/100">
            <div class="">
              <h3 className="border-blue-gray-100 bg-blue-gray-50/50 font-bold text-lg text-white text-center p-4">Bienvenido(a) tus actividades asignadas son: </h3>
              <table class="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase">
                      <p class="block antialiased font-sans text-sm text-white font-normal leading-none opacity-70">Actividad</p>
                    </th>
                    <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase">
                      <p class="block antialiased font-sans text-sm text-white font-normal leading-none opacity-70">Correo </p>
                    </th>
                    <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase">
                      <p class="block antialiased font-sans text-sm text-white font-normal leading-none opacity-70"> N° Proyecto </p>
                    </th>
                    <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase">
                      <p class="block antialiased font-sans text-sm text-white font-normal leading-none opacity-70">Detalles</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {actividadesForm.map((proyecto) => (
                    <tr key={proyecto.id_actividad}>
                      <td class="p-4 border-b border-blue-gray-50">
                        <div class="flex items-center gap-3">
                          {/**  <img src="" alt="Spotify" class="inline-block relative object-center !rounded-full w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1" /> */}
                          <p class="block antialiased font-sans text-sm leading-normal text-white ">{proyecto.actividad}</p>
                        </div>
                      </td>
                      <td class="p-4 border-b border-blue-gray-50">
                        <p class="block antialiased font-sans text-sm leading-normal text-white font-normal">{proyecto.correo}</p>
                      </td>
                      <td class="p-4 border-b border-blue-gray-50">
                        <p class="block antialiased font-sans text-sm leading-normal py-3 px-10 text-white font-normal">{proyecto.id_proyecto}</p>
                      </td>
                      {/**     <td class="p-4 border-b border-blue-gray-50">
                                    <div class="w-max">
                                        <div class="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-900 py-1 px-2 text-xs rounded-md">
                                            <span class="">paid</span>
                                        </div>
                                    </div>
                                </td> */}
                      <td class="p-4 border-b border-blue-gray-50">
                        <button class="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-white hover:bg-gray-900/100 active:bg-gray-900/20" type="button"
                          onClick={redireccionarDetalles}>
                          <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                            </svg>

                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    </div>
  )
}

export default ActividadesEstancia
