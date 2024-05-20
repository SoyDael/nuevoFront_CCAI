import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { verProyectos, PerfilInvestigador } from '../../api/APIS';
import SlideBarInvestigadores from '../SlideBar/SlideBarInvestigadores';


const ProyectosGenerales = () => {

    const {correo, coordinador_correo} = useParams();
    const navigate = useNavigate()

    const [Proyecto, setProyecto] = useState([])
    

    const redireccionarPerfil = () => {
        navigate(`/perfilInvestigador/${correo || coordinador_correo}`);
    }

    const obtenerCorreo = async (correo) => {
        try {
            const response = await PerfilInvestigador({correo: correo })
            const token = response.token;
            console.log(token);
            localStorage.setItem('token', token)

            const verPro = await verProyectos(correo)
            console.log(verPro);
            setProyecto(verPro)

            redireccionarPerfil(correo)

        } catch (error) {
            console.log("No se encontro ningun correo");
        }
    } 

    useEffect(() => {
        const fetchVerProyecto = async () => {
            try {
                const ver = await verProyectos();
                console.log(ver);
                setProyecto(ver);

            } catch (e) {
                console.log("error al cargar proyectos ", e);
            }
        };
        fetchVerProyecto();

    }, [])




    return (
        <>
            <SlideBarInvestigadores/>
            <div className="flex justify-center items-center h-screen">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <h1 className="font-serif text-lg text-gray-2500 text-center p-6">Bienvenido los proyectos que coordina el CCAI son: </h1>
                    <section>
                        <div>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase dark:bg-indigo-50 bg-opacity-20 dark:text-gray-400">
                                    <tr className=''>
                                        <th scope='col' className="px-6 py-3">N° Proyecto </th>
                                        <th scope='col' className="px-6 py-3">Nombre del Proyecto</th>
                                        <th scope='col' className="px-6 py-3">Estatus</th>
                                        <th scope='col' className="px-6 py-3">Fecha de Registro</th>
                                        <th scope='col' className="px-6 py-3">Fecha de Inicio</th>
                                        <th scope='col' className="px-6 py-3">Correo de investigador</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Proyecto.map((proyecto) => (
                                        <tr className=" dark:bg-indigo-50 border-b dark:border-gray-700">
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text">{proyecto.id_proyecto}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text">{proyecto.titulo_esp}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text">{proyecto.estatus}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text">{proyecto.fecha_registro}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text">{proyecto.fecha_inicio}</td>
                                            <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text">{proyecto.coordinador_correo}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <div className="flex justify-center mt-4">
                        <div className="mr-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                 onClick={() => redireccionarPerfil(Proyecto.coordinador_correo)}
                            >
                                Regresar
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ProyectosGenerales
