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


            <div className='  bg-slate-700 flex items-center justify-center min-h-screen from-gray-700 via-gray-800 to-gray-900 '>
                <div className="relative w-full group max-w-md min-w-0 mx-auto mt-6 mb-6 break-word border shadow-2xl bg-gray-800 border-gray-700 md:max-w-sm rounded-xl  shadow-blue-500/50">
                    <div className="pb-6">
                        <div className="flex flex-wrap justify-center">
                            <div className="flex justify-center w-full">
                                <div className="relative">
                                    <img src="https://source.unsplash.com/jmURdhtm7Ng/120x120" class="shadow-xl  border-gray-800 rounded-full align-middle border-8 absolute -m-16 -ml-18 lg:-ml-16 max-w-[150px]" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 mt-20 text-center">
                            <h3 className="mb-1 text-2xl font-bold leading-normal text-white  ">Bienvenido</h3>
                            <div className="flex flex-row justify-center w-full mx-auto space-x-2 text-center">


                                <div className="font-bold tracking-wide text-gray-500 font-mono text-xl">{perfilInvestigador[0]?.nombres} {perfilInvestigador[0]?.apellido_p} {perfilInvestigador[0]?.apellido_m}</div>
                            </div>
                            <div className="w-full text-center">

                            </div>
                        </div>
                        <div className="pt-6 mx-6 mt-6 text-center border-t  border-gray-700/50">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-6">
                                    <h3 className="text-2xl text-white text-dark mb-1">Titulo:  {perfilInvestigador[0]?.titulo}</h3><br />
                                    <h3 className="text-2xl text-white text-dark mb-1">Correo:  {perfilInvestigador[0]?.correo}</h3><br></br>
                                    <h3 className="text-2xl text-white text-dark mb-1">Telefono: <br /> {perfilInvestigador[0]?.telefono}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-6 overflow-hidden translate-y-6 rounded-b-xl">
                            <div className="absolute flex -space-x-12 rounded-b-2xl">
                                <div className="w-36 h-8 transition-colors duration-200 delay-75 transform skew-x-[35deg] bg-yellow-400/90 group-hover:bg-sky-600/90 z-10"></div>
                                <div className="w-28 h-8 transition-colors duration-200 delay-100 transform skew-x-[35deg] bg-sky-300/90 group-hover:bg-yellow-500/90 z-20"></div>
                                <div className="w-28 h-8 transition-colors duration-200 delay-150 transform skew-x-[35deg] bg-yellow-200/90 group-hover:bg-sky-400/90 z-30"></div>
                                <div className="w-28 h-8 transition-colors duration-200 delay-200 transform skew-x-[35deg] bg-sky-100/90 group-hover:bg-yellow-300/90 z-40"></div>
                                <div className="w-28 h-8 transition-colors duration-200 delay-300 transform skew-x-[35deg] bg-yellow-50/90 group-hover:bg-sky-200/90 z-50"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default PerfilComponent