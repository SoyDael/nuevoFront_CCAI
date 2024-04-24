import React, { useEffect, useState } from 'react'
import { listadoAlumnos } from '../../api/APIS'
import { useNavigate, useParams } from 'react-router-dom'
import SlideBarPruebaAlumn from '../SlideBar/SlideBarPruebaAlumn'

const ListadoAlumnos = () => {



    const { id_estudiante, correo_estudiante } = useParams(); 
    const { correo, id_proyecto } = useParams(); // Buscar El correo del investigador y el id del proyecto
    const [alumnos, setAlumnos] = useState([]); // Estado para almacenar el perfil del investigador

    const navigate = useNavigate();

    const redireccionarPerfilInvestigador = () => {
        navigate(`/perfilInvestigador/${correo}`);
    }

    const redireccionarAsignarProyecto = (id_estudiante, correo_estudiante) => {
        navigate(`/asignarProyecto/${correo}/${id_estudiante}/${correo_estudiante}`);

    }

    const redireccionarAsignarPrograma = (id_estudiante, estudiante_correo) => {
        navigate(`/registroPrograma/${correo}/${id_estudiante}/${estudiante_correo}`);
    }

    useEffect(() => {
        const fetchAlumnos = async () => {
            try {
                const alumnos = await listadoAlumnos(correo); // Obtener los alumnos del investigador
                console.log(alumnos);
                setAlumnos(alumnos); // Almacena los alumnos del investigador en el estado
            } catch (error) {
                console.error('Error al obtener alumnos:', error);
                alert('Error al obtener alumnos. Por favor, inténtalo de nuevo.');
            }
        };
        fetchAlumnos();
    }, [correo]);

    return (
        <>
        <SlideBarPruebaAlumn/>
            


            <div className='relative w-full bg-slate-700 flex items-center justify-center min-h-screen from-gray-700 via-gray-800 to-gray-900'>
        <div className="rounded-l-md relative bg-white border shadow-2xl dark:bg-gray-800 dark:border-gray-700   shadow-blue-500/50  ">
      
             
    <table className=" text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <caption className="px-6 py-4 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Alumnos internos
            
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Bienvenido { } { } { } los alumnos aceptados son:
            </p>
                                  

            
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Matricula
                </th>
                <th scope="col" className="px-6 py-3">
                Nombres
                </th>
                <th scope="col" className="px-6 py-3">
                Correo
                </th>
                <th scope="col" className="px-6 py-3">
                División
                </th>
                <th scope="col" className="px-6 py-3">
                Telefono
                </th>
                <th scope="col" className="px-6 py-3">
                </th>
                <th scope="col" className="px-6 py-3">
                </th>
                
            </tr>
        </thead>
        <tbody >
        {alumnos.map((alumno) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{alumno.matricula}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{alumno.nombres}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{alumno.correo}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{alumno.division}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{alumno.telefono}</td>

                                            <td scope='row' className="px-10 py-4 font-medium text-blue-600 dark:text-blue-500">
                                                <button
                                                    onClick={() => redireccionarAsignarPrograma(alumno.id_estudiante, alumno.correo)} 
                                                >Registrar programa</button>
                                            </td>
                                            {/* <td scope='row' className="px-10 py-4 font-medium text-blue-600 dark:text-blue-500">
                                                <button
                                                    onClick={() => redireccionarAsignarProyecto(alumno.id_estudiante, alumno.correo)}
                                                >Asignar proyecto</button>
                                            </td> */}
                                        </tr>
                                    ))}
        </tbody>
    </table>
    
    
</div>
</div>


        </>
    )
}

export default ListadoAlumnos