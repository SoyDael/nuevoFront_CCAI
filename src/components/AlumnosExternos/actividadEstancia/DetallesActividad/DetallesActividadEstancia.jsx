import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { actividadesEstanciasPorCorreo, perfilExterno } from '../../../../api/APIS'
import SlideBarAlumExt from '../../../SlideBar/SlideBarAlumExt'
import Swal from 'sweetalert2'

const DetallesActividadEstancia = () => {

    const { correo, residente_correo, correo_estancia_residente } = useParams();
    const [actividadesForm, setActividadesForm] = useState([]);

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
              <h3 className="border-blue-gray-100 bg-blue-gray-50/50 font-bold text-lg text-white text-center p-4">Bienvenido(a) los detalles de la actividad son: </h3>
              <table class="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase">
                      <p class="block antialiased font-sans text-sm text-white font-normal leading-none opacity-70">Actividad</p>
                    </th>
                    <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase">
                      <p class="block antialiased font-sans text-sm text-white font-normal leading-none opacity-70">Fecha de Inicio </p>
                    </th>
                    <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase">
                      <p class="block antialiased font-sans text-sm text-white font-normal leading-none opacity-70"> Fecha de Entrega </p>
                    </th>
                    <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase">
                      <p class="block antialiased font-sans text-sm text-white font-normal leading-none opacity-70"> Observaciones </p>
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
                        <p class="block antialiased font-sans text-sm leading-normal text-white font-normal text-center">{proyecto.fecha_inicio}</p>
                      </td>
                      <td class="p-4 border-b border-blue-gray-50">
                        <p class="block antialiased font-sans text-sm leading-normal text-white font-normal text-center">{proyecto.fecha_fin}</p>
                      </td>
                      <td class="p-4 border-b border-blue-gray-50">
                        <p class="block antialiased font-sans text-sm leading-normal text-white font-normal text-center">{proyecto.observaciones}</p>
                      </td>
                      {/**     <td class="p-4 border-b border-blue-gray-50">
                                    <div class="w-max">
                                        <div class="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-900 py-1 px-2 text-xs rounded-md">
                                            <span class="">paid</span>
                                        </div>
                                    </div>
                                </td> */}
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

export default DetallesActividadEstancia