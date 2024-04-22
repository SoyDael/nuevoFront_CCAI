import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBarInvestigador from '../../SlideBar/SlideBarPruebaAlumn'

import { PerfilInvestigador } from '../../../api/APIS'

const PerfilComponent = () => {

    const { correo } = useParams(); // Buscar El correo del investigador

    /// Hooks Personalizados 
    const [perfilInvestigador, setPerfilInvestigador] = useState([]); // Estado para almacenar el perfil del investigador

    const navigate = useNavigate();

    const redireccionarProyectos = () => {
        navigate(`/proyectos/${correo}`);
    }

    const redireccionar = () => {
        navigate(`/usuario`);
    }

    const redireccionarAlumnoInterno = () => {
        navigate(`/alumnoInterno`);
    }

const redireccionarListadoAlumnos = () => {
        navigate(`/listadoAlumnos/${correo}`);
    }

    useEffect(() => {
        const fetchPerfilInvestigador = async () => {
            try {
                const perfil = await PerfilInvestigador(correo); // Obtener el perfil del investigador
                console.log(perfil);
                setPerfilInvestigador(perfil); // Almacena el perfil del investigador en el estado
            } catch (error) {
                console.error('Error al obtener perfil:', error);
                alert('Error al obtener perfil. Por favor, inténtalo de nuevo.');
            }
        };
        fetchPerfilInvestigador();
    }, [correo])

    return (
        <>
            <NavBarInvestigador />
            <div className="flex justify-center items-center h-screen bg-slate-700  pt-12">
                <div className=" mx-auto bg-white bg-slate-900 bg-opacity-30 shadow-lg shadow-blue-500/50 rounded-lg overflow-hidden shadow-lg">
                    <div className="border-b px-4 pb-6">
                        <div className="text-center my-4">
                            <img className="h-32 w-32 rounded-full border-4 border-white dark:border-white mx-auto my-4" src="" alt="" >{ }</img>
                            <div className="py-2">
                                <h3 className="font-bold text-2xl text-white dark:text-dark mb-1">Bienvenido <br></br> {perfilInvestigador[0]?.nombres} {perfilInvestigador[0]?.apellido_p} {perfilInvestigador[0]?.apellido_m}</h3>
                                <br></br>
                                <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                                    <h3 className="text-2xl text-white dark:text-dark mb-1">Titulo: <br></br> {perfilInvestigador[0]?.titulo}</h3>
                                </div>
                            </div>
                            <div className="py-2 items-center">
                                <div className="inline-flex justify-center text-gray-700 dark:text-gray-300 items-center">
                                    <h3 className="text-2xl text-white dark:text-dark mb-1">Correo:  <br></br> {perfilInvestigador[0]?.correo}</h3>
                                </div>
                            </div>
                            <div className="py-2 items-center">
                                <div className="inline-flex justify-center text-gray-700 dark:text-gray-300 items-center">
                                    <h3 className="text-2xl text-white dark:text-dark mb-1">Telefono:<br></br> {perfilInvestigador[0]?.telefono}</h3>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

<div className='  bg-slate-700 flex items-center justify-center min-h-screen from-gray-700 via-gray-800 to-gray-900 '>
<div className="relative w-full group max-w-md min-w-0 mx-auto mt-6 mb-6 break-words bg-white border shadow-2xl dark:bg-gray-800 dark:border-gray-700 md:max-w-sm rounded-xl  shadow-blue-500/50">
    <div className="pb-6">
        <div className="flex flex-wrap justify-center">
            <div className="flex justify-center w-full">
                <div className="relative">
                    <img src="https://source.unsplash.com/jmURdhtm7Ng/120x120" class="dark:shadow-xl border-white dark:border-gray-800 rounded-full align-middle border-8 absolute -m-16 -ml-18 lg:-ml-16 max-w-[150px]" />
                </div>
            </div>
        </div>
        <div className="mt-2 mt-20 text-center">
            <h3 className="mb-1 text-2xl font-bold leading-normal text-gray-700 dark:text-gray-300">Bienvenido</h3>
            <div class="flex flex-row justify-center w-full mx-auto space-x-2 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                </svg>
               
                <div class="text-sm font-bold tracking-wide text-gray-600 dark:text-gray-300 font-mono text-xl">{perfilInvestigador[0]?.nombres} {perfilInvestigador[0]?.apellido_p} {perfilInvestigador[0]?.apellido_m}</div>
            </div>
            <div class="w-full text-center">
                
            </div>
        </div>
        <div class="pt-6 mx-6 mt-6 text-center border-t border-gray-200 dark:border-gray-700/50">
            <div class="flex flex-wrap justify-center">
                <div class="w-full px-6">
                    <h3 className="text-2xl text-white dark:text-dark mb-1">Titulo:  {perfilInvestigador[0]?.titulo}</h3><br />
                    <h3 className="text-2xl text-white dark:text-dark mb-1">Correo:  {perfilInvestigador[0]?.correo}</h3><br></br>
                    <h3 className="text-2xl text-white dark:text-dark mb-1">Telefono: <br /> {perfilInvestigador[0]?.telefono}</h3>
                </div>
            </div>
        </div>
        <div class="relative h-6 overflow-hidden translate-y-6 rounded-b-xl">
            <div class="absolute flex -space-x-12 rounded-b-2xl">
                <div class="w-36 h-8 transition-colors duration-200 delay-75 transform skew-x-[35deg] bg-amber-400/90 group-hover:bg-amber-600/90 z-10"></div>
                <div class="w-28 h-8 transition-colors duration-200 delay-100 transform skew-x-[35deg] bg-amber-300/90 group-hover:bg-amber-500/90 z-20"></div>
                <div class="w-28 h-8 transition-colors duration-200 delay-150 transform skew-x-[35deg] bg-amber-200/90 group-hover:bg-amber-400/90 z-30"></div>
                <div class="w-28 h-8 transition-colors duration-200 delay-200 transform skew-x-[35deg] bg-amber-100/90 group-hover:bg-amber-300/90 z-40"></div>
                <div class="w-28 h-8 transition-colors duration-200 delay-300 transform skew-x-[35deg] bg-amber-50/90 group-hover:bg-amber-200/90 z-50"></div>
            </div>
        </div>
    </div>
</div>

</div>
        </>
    )
}

export default PerfilComponent