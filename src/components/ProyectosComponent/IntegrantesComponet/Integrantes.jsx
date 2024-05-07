import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { participanteProyecto } from '../../../api/APIS'
import NavBarInvestigador from '../../SlideBar/SlideBarPruebaAlumn'


const Integrantes = () => {

    const navigate = useNavigate();
    const { id_proyecto, id_estudiante } = useParams();
    const { correo, correo_estudiante } = useParams();

    const [Participante, setParticipante] = useState([]); // Estado para almacenar el perfil del investigador


    const redireccionarAsignarActividad = (id_estudiante, correo_estudiante) => {
        navigate(`/asignarActividad/${id_proyecto}/${correo}/${id_estudiante}/${correo_estudiante}`);
    }

    useEffect(() => {
        const fetchParticipante = async () => {
            try {
                const participante = await participanteProyecto(id_proyecto); // Obtener el proyecto por ID
                console.log(participante);
                setParticipante(participante); // Almacena el proyecto en el estado
            } catch (error) {
                console.error('Error al obtener proyecto:', error);
                alert('Error al obtener proyecto. Por favor, inténtalo de nuevo.');
            }
        };
        fetchParticipante();
    }, [id_proyecto])

    return (
        <>
            <NavBarInvestigador />




            <div className='relative w-full bg-slate-700 flex items-center justify-center min-h-screen from-gray-700 via-gray-800 to-gray-900'>
                <div className="rounded-l-md relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">


                    <table className=" text-sm text-left rtl:text-right  text-gray-400 ">
                        <caption className="px-6 py-4 text-lg font-semibold text-left rtl:text-right   text-white bg-gray-800">
                            Integrantes del proyecto

                            <p className="mt-1 text-sm font-normal  text-gray-400">Bienvenido { } { } { } los integrantes del proyecto son:
                            </p>



                        </caption>
                        <thead className="text-xs  uppercase  bg-gray-700 text-gray-400 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nombres
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Apellido paterno
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Apellido materno
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tipo de programa
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Detalles
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Detalles</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody >
                            {Participante.map((participante) => (
                                <tr key={participante.id_estudiante} className="  border-b ">
                                    <td scope='row' className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text">{participante.nombres}</td>
                                    <td scope='row' className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text">{participante.apellido_p}</td>
                                    <td scope='row' className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text">{participante.apellido_m}</td>
                                    <td scope='row' className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text">{participante.tipo_programa}</td>
                                    <td scope='row' className="px-10 py-4 font-medium text-blue-600 dark:text-blue-500">
                                        <button onClick={() => redireccionarAsignarActividad(participante.id_estudiante, participante.correo_estudiante)}>Asignar Actividad</button>
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

export default Integrantes
