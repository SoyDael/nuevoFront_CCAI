import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { proyectosInvestigador, getProyecto } from '../../api/APIS';
import SlideBarPruebaAlumn from '../SlideBar/SlideBarPruebaAlumn';


const Proyectos = () => {

    const { correo, id_proyecto } = useParams(); // Buscar El correo del investigador y el id del proyecto
    const [Proyecto, setProyecto] = useState([]); // Estado para almacenar el perfil del investigador

    const navigate = useNavigate();

    const redireccionarPerfil = () => {
        navigate(`/perfilInvestigador/${correo}`);
    }

    const redireccionarDetallesProyecto = (id_proyecto) => {
        navigate(`/detallesProyecto/${id_proyecto}/${correo}`);

    }

    const obtenerProyecto = async (id_proyecto) => {
        try {
            const response = await getProyecto({ id_proyecto: id_proyecto }); // Obtener el proyecto por ID
            const token = response.token;
            console.log(token);
            localStorage.setItem('token', token);

            const proyecto = await proyectosInvestigador(id_proyecto);
            console.log(proyecto);
            setProyecto(proyecto); // Almacena el proyecto en el estado

            redireccionarDetallesProyecto(id_proyecto);
        } catch (error) {
            console.error('Error al obtener proyecto:', error);
            alert('Error al obtener proyecto. Por favor, inténtalo de nuevo.');
        }
    }


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
            <SlideBarPruebaAlumn />

            <div className='relative w-full bg-slate-700 flex items-center justify-center min-h-screen from-gray-700 via-gray-800 to-gray-900'>
                <div className="rounded-l-md relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">


                    <table className=" text-sm text-left rtl:text-right  text-gray-400 ">
                        <caption className="px-6 py-4 text-lg font-semibold text-left rtl:text-right   text-white bg-gray-800">
                            Proyectos del CCAI

                            <p className="mt-1 text-sm font-normal  text-gray-400">Bienvenido {Proyecto[0]?.nombres} {Proyecto[0]?.apellido_p} {Proyecto[0]?.apellido_m} los proyectos que coordinas son:
                            </p>



                        </caption>
                        <thead className="text-xs  uppercase  bg-gray-700 text-gray-400 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nombre del proyecto
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Estatus
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Fecha de registro
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Fecha de registro
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Ver detalles</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody >
                            {Proyecto.map((proyecto) => (
                                <tr className=" border-b bg-gray-800 border-gray-700">
                                    <td scope='row' className="px-6 py-4 font-medium  whitespace-nowrap text-white">{proyecto.titulo_esp}</td>
                                    <td scope='row' className="px-6 py-4 font-medium  whitespace-nowrap text-white">{proyecto.estatus}</td>
                                    <td scope='row' className="px-6 py-4 font-medium  whitespace-nowrap text-white">{proyecto.fecha_registro}</td>
                                    <td scope='row' className="px-6 py-4 font-medium  whitespace-nowrap text-white">{proyecto.fecha_inicio}</td>
                                    <td scope='row' className="px-10 py-4 font-medium  text-blue-500">
                                        <button
                                            onClick={() => redireccionarDetallesProyecto(proyecto.id_proyecto)}
                                        >Ver Detalles</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                </div>
            </div>





        </>
    )
}

export default Proyectos