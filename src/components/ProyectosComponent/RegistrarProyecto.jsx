import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { proyectosInvestigador, getProyecto } from '../../api/APIS';
import NavBarInvestigador from '../SlideBar/SlideBarPruebaAlumn'


const RegistrarProyecto = () => {


    const { correo, id_proyecto } = useParams(); // Buscar El correo del investigador y el id del proyecto
    const [Proyecto, setProyecto] = useState([]); // Estado para almacenar el perfil del investigador

    const navigate = useNavigate();




    useEffect(() => {
        const fetchProyectos = async () => {
            try {
                const proyectos = await proyectosInvestigador(correo); // Obtener los proyectos del investigador
                console.log(proyectos);
                setProyecto(proyectos); // Almacena los proyectos del investigador en el estado
            } catch (error) {
                console.error('Error al obtener proyectos:', error);
                alert('Error al obtener proyectos. Por favor, inténtalo de nuevo.');
            }
        };
        fetchProyectos();
    }, [correo]);


    return (
        <>
            <NavBarInvestigador />

            <section class="grid h-screen place-content-center bg-slate-700 text-slate-300">
                <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                    <h1 class="text-4xl font-semibold mb-4">Registro Nuevo Proyecto</h1>

                    <br />
                    <div class="flex flex-col items-center justify-center space-y-4">
                        <input type="text" id="password" name="password" placeholder="Titulo" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                        <input type="text" id="password" name="password" placeholder="Objetivo" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                        <input type="text" id="password" name="password" placeholder="Descripción" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                        <input type="text" id="password" name="password" placeholder="Correo cordinador" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                        <label className='w-96 appearance-none  p-2  '>Fecha registro</label>
                        <input type="date" id="password" name="password" placeholder="Fecha registro" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2  focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                        <label className='w-96 appearance-none  p-2  '>Fecha inicio</label>
                        <input type="date" id="password" name="password" placeholder="Fecha registro" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                        <label className='w-96 appearance-none  p-2  '>Fecha termino</label>
                        <input type="date" id="password" name="password" placeholder="Fecha registro" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />




                        <button id="showPw" class="rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-indigo-700"><span id="showHide">Añadir</span> alumno</button>

                    </div>
                </div>
            </section>


        </>
    )
}

export default RegistrarProyecto