import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { proyectosInvestigador, getProyecto } from "../../api/APIS";
import SlideBarInvestigadores from "../SlideBar/SlideBarInvestigadores";
import ReactPaginate from 'react-paginate';


const Proyectos = () => {
  const { correo, id_proyecto } = useParams(); // Buscar El correo del investigador y el id del proyecto
  const [Proyecto, setProyecto] = useState([]); // Estado para almacenar el perfil del investigador
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const alumnosPerPage = 6;
  const offset = currentPage * alumnosPerPage;
  const pageCount = Math.ceil(Proyecto.length / alumnosPerPage);

  const redireccionarPerfil = () => {
    navigate(`/perfilInvestigador/${correo}`);
  };

  const redireccionarDetallesProyecto = (id_proyecto) => {
    navigate(`/detallesProyecto/${id_proyecto}/${correo}`);
  };

  const obtenerProyecto = async (id_proyecto) => {
    try {
      const response = await getProyecto({ id_proyecto: id_proyecto }); // Obtener el proyecto por ID
      const token = response.token;
      console.log(token);
      localStorage.setItem("token", token);

      const proyecto = await proyectosInvestigador(id_proyecto);
      console.log(proyecto);
      setProyecto(proyecto); // Almacena el proyecto en el estado

      redireccionarDetallesProyecto(id_proyecto);
    } catch (error) {
      console.error("Error al obtener proyecto:", error);
      alert("Error al obtener proyecto. Por favor, inténtalo de nuevo.");
    }
  };

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const proyectos = await proyectosInvestigador(correo); // Obtener los proyectos del investigador
        console.log(proyectos);
        setProyecto(proyectos); // Almacena los proyectos del investigador en el estado
        setFilteredProyectos(proyectos);
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
        alert("Error al obtener proyectos. Por favor, inténtalo de nuevo.");
      }
    };
    fetchProyectos();
  }, [correo]);

  const [filteredProyectos, setFilteredProyectos] = useState([]); // Copia de la lista original
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = Proyecto.filter((proy) =>
      proy.titulo_esp.toLowerCase().includes(term)
    );
    setFilteredProyectos(filtered);
  };


  const handleClearSearch = () => {
    setSearchTerm('');
    setFilteredProyectos(programa); // Restaurar la lista original
  };

  return (
    <>
      <SlideBarInvestigadores />

      <div className="relative w-full bg-slate-700 flex items-center justify-center min-h-screen from-gray-700 via-gray-800 to-gray-900">
        <div className="rounded-l-md relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
          <table className=" text-sm text-left rtl:text-right  text-gray-400 ">
            <caption className="px-6 py-4 text-lg font-bold text-centre   text-white bg-gray-800 ">
              Proyectos del CCAI
              <h1 className="font-medium text-lg text-slate-300 text-center p-6">
                {" "}
                Bienvenido(a) {Proyecto[0]?.nombres} {Proyecto[0]?.apellido_p}{" "}
                {Proyecto[0]?.apellido_m} <br></br> Los proyectos que coordinas
                son:
              </h1>
              <div className="px-4 py-2 flex justify-between items-center">
                <input
                  type="text"
                  placeholder="Buscar por nombre..."
                  value={searchTerm}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleSearch}
                />
                <button
                  onClick={handleClearSearch}
                  className="ml-4 bg-blue-500 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Limpiar búsqueda
                </button>
              </div>
            </caption>
            <thead className="text-xs  uppercase  text-gray-400 ">
              <tr>
                <th
                  scope="col"
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase"
                >
                  Nombre del proyecto
                </th>
                <th
                  scope="col"
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase px-5"
                >
                  Estatus
                </th>
                <th
                  scope="col"
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase"
                >
                  Fecha de registro
                </th>
                <th
                  scope="col"
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase"
                >
                  Fecha de Inicio
                </th>

                <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase px-12">
                  <p class="block antialiased font-sans text-sm text-white font-normal leading-none opacity-70">
                    Detalles
                  </p>
                </th>
                <th
                  scope="col"
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase"
                >
                  <span className="sr-only">Ver detalles</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProyectos.slice(offset, offset + alumnosPerPage).map((proyecto) => (

                <tr className=" border-b bg-gray-800 border-gray-700">
                  <td
                    scope="row"
                    className="px-4 py-4 font-medium  whitespace-nowrap text-white"
                  >
                    {proyecto.titulo_esp}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                  >
                    {proyecto.estatus}
                  </td>
                  <td
                    scope="row"
                    className="px-9 py-4 font-medium  whitespace-nowrap text-white"
                  >
                    {proyecto.fecha_registro}
                  </td>
                  <td
                    scope="row"
                    className="px-9 py-4 font-medium  whitespace-nowrap text-white"
                  >
                    {proyecto.fecha_inicio}
                  </td>
                  <td
                    scope="row"
                    className="px-9 py-4 font-medium  whitespace-nowrap text-white"
                  >
                    <button
                      onClick={() =>
                        redireccionarDetallesProyecto(proyecto.id_proyecto)
                      }
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex justify-center mt-4'>
            <ReactPaginate
              previousLabel={<i className="fas fa-chevron-left"></i>} // Icono de flecha izquierda
              nextLabel={<i className="fas fa-chevron-right"></i>} // Icono de flecha derecha
              breakLabel={'...'}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName={'pagination flex'} // Agregado flex para alineación horizontal
              activeClassName={'active'}
              disabledClassName={'bg-gray-500 text-gray-300 cursor-not-allowed'} // Clase para los botones deshabilitados
              pageClassName={'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'} // Clase para los números de página
              pageLinkClassName={'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'} // Clase para los enlaces de número de página
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Proyectos;
