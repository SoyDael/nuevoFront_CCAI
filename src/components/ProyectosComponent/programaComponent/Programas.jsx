import React, { useEffect, useState } from 'react'
import { getProgramas } from '../../../api/APIS'
import { useNavigate, useParams } from 'react-router-dom'
import SlideBarInvestigadores from '../../SlideBar/SlideBarInvestigadores'
const Programas = () => {


    const { correo, id_proyecto } = useParams(); // Buscar El correo del investigador y el id del proyecto
    const [programas, setProgramas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProgramas = async () => {
          try {
            const perfil = await getProgramas(correo);
            console.log(perfil);
            setProgramas(perfil);
          } catch (error) {
            console.error("Error al obtener perfil:", error);
            alert("Error al obtener perfil. Por favor, inténtalo de nuevo.");
          }
        };
        fetchProgramas();
      }, [correo]);


  return (
    <>
    <SlideBarInvestigadores />

    <div className='relative w-full bg-slate-700 flex items-center justify-center min-h-screen from-gray-700 via-gray-800 to-gray-900'>
            <div className="rounded-md relative border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">


                <table className=" text-sm text-left rtl:text-right  text-gray-400 ">
                    <caption className="px-6 py-4 text-lg font-semibold text-left rtl:text-right   text-white bg-gray-800">
                        Programas

                        <p className="mt-1 text-sm font-normal  text-gray-400">Bienvenido { } { } { } se muestran los programas de los alumnos:
                        </p>



                    </caption>
                    <thead className="text-xs  uppercase  bg-gray-700 text-gray-400 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nombre
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Correo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tipo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Estatus
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Semestre
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Inicio
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fin
                            </th>

                        </tr>
                    </thead>
                    <tbody >
                        {programas.map((programa) => (
                            <tr className=" border-b bg-gray-800 border-gray-700">
                                <td scope='row' className="px-6 py-4 font-medium  whitespace-nowrap text-white">{programa.id_estudiante}</td>
                                <td scope='row' className="px-6 py-4 font-medium whitespace-nowrap text-white">{programa.estudiante_correo}</td>
                                <td scope='row' className="px-6 py-4 font-medium  whitespace-nowrap text-white">{programa.tipo}</td>
                                <td scope='row' className="px-6 py-4 font-medium  whitespace-nowrap text-white">{programa.estatus}</td>
                                <td scope='row' className="px-6 py-4 font-medium  whitespace-nowrap text-white">{programa.semestre}</td>
                                <td scope='row' className="px-6 py-4 font-medium  whitespace-nowrap text-white">{programa.fecha_inicio}</td>
                                <td scope='row' className="px-6 py-4 font-medium  whitespace-nowrap text-white">{programa.fecha_fin}</td>
                               
                                {/* <td scope='row' className="px-10 py-4 font-medium text-blue-600 text-blue-500">
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

export default Programas