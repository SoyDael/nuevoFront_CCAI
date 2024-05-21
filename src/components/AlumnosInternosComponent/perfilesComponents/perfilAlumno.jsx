import React from "react";

import {
  getPerfilEstudiante,
  getconsultaActividadesEstudiantesPorId,
  ParticipantePorProyecto,
} from "../../../api/APIS";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SlideBarPruebaAlumn from "../../SlideBar/SlideBarPruebaAlumn";

const PerfilAlumno = () => {
  const { correo } = useParams();
  //const { correo_estudiante } = useParams();

  const [perfilEstudiante, setPerfilEstudiante] = useState([]);
  const [actividadEstudiante, setActividadEstudiante] = useState(null);
  const [proyectoEstudiante, setProyectoEstudiante] = useState(null);

  const navigate = useNavigate();

  const redireccionarActividades = () => {
    navigate(`/perfilActividades/${correo}`);
  };

  const redireccionarProyecto = () => {
    navigate(`/proyectoAlumnoInt/${correo}`);
  };

  const obtenerActividades = async (e) => {
    e.preventDefault();
    try {
      const response = await getPerfilEstudiante({ correo: correo }); // Pasar solo el correo del estudiante
      const token = response.token;
      console.log(token);
      localStorage.setItem("token", token);

      const actividades = await getconsultaActividadesEstudiantesPorId(correo);
      setActividadEstudiante(actividades);

      redireccionarActividades();
    } catch (error) {
      console.log("Error al obtener actividades:", error);
    }
  };

  const obtenerProyecto = async (e) => {
    e.preventDefault();
    try {
      const response = await getPerfilEstudiante({ correo: correo }); // Pasar solo el correo del estudiante
      const token = response.token;
      console.log(token);
      localStorage.setItem("token", token);

      const proyecto = await ParticipantePorProyecto(correo);
      setProyectoEstudiante(proyecto);
      console.log(proyecto);

      redireccionarProyecto();
    } catch (error) {
      console.log("Error al obtener proyecto:", error);
    }
  };

  useEffect(() => {
    const fetchPerfilEstudiante = async () => {
      try {
        const perfil = await getPerfilEstudiante(correo);
        console.log(perfil);
        setPerfilEstudiante(perfil);
      } catch (error) {
        console.error("Error al obtener perfil:", error);
        alert("Error al obtener perfil. Por favor, inténtalo de nuevo.");
      }
    };
    fetchPerfilEstudiante();
  }, [correo]);

  return (
    <>
      <SlideBarPruebaAlumn />
      {perfilEstudiante.length > 0 && (
        <div class="flex justify-center items-center h-screen bg-slate-400 pt-12">
          <div className="relative w-full group max-w-md min-w-0 mx-auto mt-6 mb-6 break-word  bg-slate-800 border shadow-2xl dark:bg-gray-800 dark:border-gray-700 md:max-w-sm rounded-xl  shadow-blue-500/50">
            <div class="pb-6">
              <div class="text-center my-4">
                {/**    <img class="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4" src="" alt="" >{perfilEstudiante[0]?.foto}</img> */}
                <div class="py-2">
                  <h3 class="font-bold text-2xl text-slate-300 dark:text-dark mb-1">
                    Bienvenido(a){" "}
                  </h3>
                 
                  <div className="flex flex-row justify-center w-full mx-auto space-x-2 text-center">
                    <div className="font-bold tracking-wide text-gray-500 font-mono text-xl">
                      {" "}
                      {perfilEstudiante[0]?.nombres}{" "}
                      {perfilEstudiante[0]?.apellido_p}{" "}
                      {perfilEstudiante[0]?.apellido_m}
                    </div>
                  </div>
                  <br></br>
                  <div class="inline-flex text-slate-300 dark:text-gray-300 items-center">
                    <h3 class="text-2xl text-slate-300 dark:text-dark mb-1">
                      Division: <br></br> {perfilEstudiante[0]?.division}
                    </h3>
                  </div>
                </div>
                <div class="py-2">
                  <div class="inline-flex text-slate-300 dark:text-gray-300 items-center">
                    <h3 class="text-2xl text-slate-300 dark:text-dark mb-1">
                      Matricula:<br></br> {perfilEstudiante[0]?.matricula}
                    </h3>
                  </div>
                </div>
                <div class="py-2 items-center">
                  <div class="inline-flex justify-center text-gray-700 dark:text-gray-300 items-center">
                    <h3 class="text-2xl text-slate-300 dark:text-dark mb-1">
                      Correo: {perfilEstudiante[0]?.correo}
                    </h3>
                  </div>
                </div>
                <div class="py-2 items-center">
                  <div class="inline-flex justify-center text-slate-300 dark:text-gray-300 items-center">
                    <h3 class="text-2xl text-slate-300 dark:text-dark mb-1">
                      Correo Adicional: {perfilEstudiante[0]?.correo_adicional}
                    </h3>
                  </div>
                </div>
                <div class="py-2 items-center">
                  <div class="inline-flex justify-center text-slate-300 dark:text-gray-300 items-center">
                    <h3 class="text-2xl text-slate-300 dark:text-dark mb-1">
                      Telefono:<br></br> {perfilEstudiante[0]?.telefono}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="relative h-6 overflow-hidden translate-y-6 rounded-b-xl">
                <div className="absolute flex -space-x-12 rounded-b-2xl">
                  <div className="w-36 h-8 transition-colors duration-200 delay-75 transform skew-x-[35deg] bg-gray-400/90 group-hover:bg-sky-600/90 z-10"></div>
                  <div className="w-28 h-8 transition-colors duration-200 delay-100 transform skew-x-[35deg] bg-sky-300/90 group-hover:bg-gray-500/90 z-20"></div>
                  <div className="w-28 h-8 transition-colors duration-200 delay-150 transform skew-x-[35deg] bg-gray-200/90 group-hover:bg-sky-400/90 z-30"></div>
                  <div className="w-28 h-8 transition-colors duration-200 delay-200 transform skew-x-[35deg] bg-sky-100/90 group-hover:bg-gray-300/90 z-40"></div>
                  <div className="w-28 h-8 transition-colors duration-200 delay-300 transform skew-x-[35deg] bg-gray-50/90 group-hover:bg-sky-200/90 z-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PerfilAlumno;
