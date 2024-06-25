import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { proyectosEstancia, getProyecto, ParticipantePorProyecto } from '../../../api/APIS';
import SlideBarAlumnoExt from '../../SlideBar/SlideBarAlumExt';

const ProyectoAlumnoExterno = () => {

    const { correo, residente_correo, correo_estancia_residente } = useParams();
    const [Proyecto, setProyecto] = useState([]);

    const navigate = useNavigate();

    const redireccionarDetalles = (id_proyecto) => {
        navigate(`/detallesProyectoEstancia/${correo}/${id_proyecto}`);
    }

    useEffect(() => {
        const fetchProyecto = async () => {
            try {
                const proyecto = await proyectosEstancia(correo);
                console.log(proyecto);
                setProyecto(proyecto);
            } catch (error) {
                console.error('Error al obtener actividades:', error);
                alert('Error al obtener actividades. Por favor, inténtalo de nuevo.');
            }
        };

        fetchProyecto();
    }, [correo]);

    const obtenerProyecto = async (id_proyecto) => {
        try {
            const res = await getProyecto({ id_proyecto: id_proyecto })
            const token = res.token;
            console.log(token);
            localStorage.setItem('token' , token);

            const proyecto = await proyectosEstancia(id_proyecto)
            console.log(proyecto)
            setProyecto(proyecto);     
            
            redireccionarDetalles(id_proyecto)
        } catch (error) {
            console.error('Error al obtener proyecto:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al obtener proyecto. Por favor, inténtalo de nuevo."
              });
        }
    }

    return (
        <div>
            <>
                <SlideBarAlumnoExt />
                <div class="flex min-h-screen items-center justify-center bg-slate-400  from-gray-700 via-gray-800 to-gray-900">
                    <div className="relative overflow-x-auto  sm:rounded-lg bg-slate-800 shadow-lg shadow-blue-500/100">
                        <div class="">
                            <h3 className="border-blue-gray-100 bg-blue-gray-50/50 font-bold text-lg text-white text-center p-4">Bienvenido {Proyecto[0]?.nombres} tu proyecto asignado es: </h3>
                            <table class="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase">
                                            <p class="block antialiased font-sans text-sm text-white font-normal leading-none opacity-70">Nombre del proyecto</p>
                                        </th>
                                        <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase">
                                            <p class="block antialiased font-sans text-sm text-white font-normal leading-none opacity-70">Servicio</p>
                                        </th>
                                        <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase">
                                            <p class="block antialiased font-sans text-sm text-white font-normal leading-none opacity-70">Detalles</p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Proyecto.map((proyecto) => (
                                        <tr key={proyecto.correo}>
                                            <td class="p-4 border-b border-blue-gray-50">
                                                <div class="flex items-center gap-3">
                                                    {/**  <img src="" alt="Spotify" class="inline-block relative object-center !rounded-full w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1" /> */}
                                                    <p class="block antialiased font-sans text-sm leading-normal text-white ">{proyecto.titulo_esp}</p>
                                                </div>
                                            </td>
                                            <td class="p-4 border-b border-blue-gray-50">
                                                <p class="block antialiased font-sans text-sm leading-normal text-white font-normal">{proyecto.tipoEstancia}</p>
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
                                                    onClick={() => redireccionarDetalles(proyecto.id_proyecto)}>
                                                    <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
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
            </></div>
    )
}

export default ProyectoAlumnoExterno