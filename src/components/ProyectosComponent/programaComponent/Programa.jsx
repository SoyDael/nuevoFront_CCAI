import React, { useEffect, useState } from "react";
import { consultaProgramas } from "../../../api/APIS";
import SlideBarInvestigadores from "../../SlideBar/SlideBarInvestigadores";

const VerPrograma = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [programa, setPrograma] = useState([]);

  useEffect(() => {
    const obtenerPrograma = async () => {
      try {
        const response = await consultaProgramas();
        console.log("datos", response);
        setPrograma(response);
      } catch (error) {
        console.log("error al obtener datos", error);
      }
    };

    obtenerPrograma();
  }, []);

  return (
    <>
      <SlideBarInvestigadores />

      <div className='relative w-full bg-slate-700 flex items-center justify-center min-h-screen from-gray-700 via-gray-800 to-gray-900'>
            <div className="rounded-md relative border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">


                <table className=" text-sm text-left rtl:text-right  text-gray-400 ">
            <caption className="px-6 py-4 text-lg font-semibold   text-white bg-gray-800 min-w-8 ">
              Ver programas
              <p className="mt-1 text-sm font-normal  text-gray-400">
                Bienvenido, {} {} los programas registrados son:
              </p>
            </caption>
            <thead className="text-xs  uppercase  bg-gray-700 text-gray-400 ">
              <tr>
                <th scope="col" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 px-6 py-3">
                  Correo
                </th>
                <th scope="col" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 px-6 py-3">
                  Tipo
                </th>
                <th scope="col" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 px-6 py-3">
                  Estatus
                </th>
                <th scope="col" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 px-6 py-3">
                  Semestre
                </th>
                <th scope="col" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 px-6 py-3">
                  Fecha de inicio
                </th>
                <th scope="col" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 px-6 py-3">
                  Fecha de fin
                </th>
              
              </tr>
            </thead>
            <tbody>
              {programa.map((programa) => (
                <tr className=" border-b bg-gray-800 border-gray-700">
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                  >
                    {programa.estudiante_correo}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap text-white"
                  >
                    {programa.tipo}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                  >
                    {programa.estatus}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                  >
                    {programa.semestre}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                  >
                    {programa.fecha_inicio}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                  >
                    {programa.fecha_fin}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default VerPrograma;