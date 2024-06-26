import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import { listadoEstancias, consultaEstanciasResidentes } from '../../api/APIS';
import SlideBarInvestigadores from '../SlideBar/SlideBarInvestigadores';

const ListadoAlumnosExternos = () => {

    // consumo api listado de estancias
    const [Estancias, setEstancias] = useState([])
    const [filteredEstancias, setFilteredEstancias] = useState([]); // Copia de la lista original
    const [filteredProgramas, setFilteredProgramas] = useState([]); // Copia de la lista original
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [alumnos, setAlumnos] = useState([]); // Estado para almacenar el perfil del investigador

    const { correo, id_estancia_residente } = useParams(); // Buscar El correo del investigador y el id del proyecto

    const navigate = useNavigate();

    const redireccionarAsignarPrograma = ( id_estancia_residente, residente_correo) => {
        navigate(`/programaExternos/${correo}/${id_estancia_residente}/${residente_correo}`);
    
    }

    useEffect(() => {
        const fetchEstancias = async () => {
            try {
                const estancias = await consultaEstanciasResidentes();
                setEstancias(estancias); // Almacena los datos en el estado
                setFilteredEstancias(estancias); // Inicializa la lista filtrada con todos los proyectos
            } catch (error) {
                console.error('Error al obtener proyectos:', error);
                //alert('Error al obtener proyectos. Por favor, inténtalo de nuevo.');
            }
        };
        fetchEstancias();
    }, []);

    const obtenerIdEstancias = async (id_estancia_residente) => {
        try {
            const estancias = await consultaEstanciasResidentes();
            const estancia = estancias.find(estancia => estancia.id_estancia_residente === id_estancia_residente);
            console.log(estancia);
          

            redireccionarAsignarPrograma(estancia.id_estancia_residente, estancia.residente_correo);

            return estancia;
        } catch (error) {
            console.error('Error al obtener estancias:', error);
            alert('Error al obtener estancias. Por favor, inténtalo de nuevo.');
        }
    }

    const [showModal5, setShowModal5] = useState(false);

    const toggleModal5 = () => {
        setShowModal5(!showModal5);
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleSearchExternos = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = Estancias.filter((es) =>
            es.correo.toLowerCase().includes(term)
        );
        setFilteredEstancias(filtered);
    };


    const handleClearSearchExternos = () => {
        setSearchTerm('');
        setFilteredEstancias(Estancias); // Restaurar la lista original
    };


    const alumnosPerPage = 6;
    const offset = currentPage * alumnosPerPage;
    const pageCount = Math.ceil(alumnos.length / alumnosPerPage);


    return (
        <div>
            <>
                <SlideBarInvestigadores />
                <div className='relative flex justify-center w-full bg-slate-700 flex items-center justify-center min-h-screen from-gray-700 via-gray-800 to-gray-900 p-20'>
                    <div className='rounded-md relative border shadow-2xl bg-gray-800 border-gray-700 shadow-blue-500/50 '>
                        <div className="px-4 py-2 flex justify-between items-center">
                            <input
                                type="text"
                                placeholder="Buscar por correo..."
                                value={searchTerm}
                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleSearchExternos}
                            />
                            <button
                                onClick={handleClearSearchExternos}
                                className="ml-4 bg-blue-500 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Limpiar búsqueda
                            </button>
                        </div>
                        <table className="text-sm text-left rtl:text-right text-gray-400">
                            <caption className='px-6 py-4 text-lg font-semibold text-left rtl:text-right text-white bg-gray-800 text-center'>
                                Alumnos Externos
                                <p className='mt-1 text-sm font-normal text-gray-400'>Bienvenido. Los alumnos aceptados son:</p>
                            </caption>
                            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Nombres
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Apellidos
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Correo
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Telefono
                                    </th>
                                    <th scope='col' className='px-6 py-3'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEstancias.slice(offset, offset + alumnosPerPage).map((estancia) => (
                                    <tr className="border-b bg-gray-800 border-gray-700" key={estancia.id_estancia_residente}>
                                        <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                            {estancia.nombres}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                            {estancia.apellido_p} {estancia.apellido_m}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                            {estancia.correo}
                                        </td>

                                        <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                            {estancia.telefono}
                                        </td>
                                        <td className='px-6 py-4 font-medium whitespace-nowrap text-white'>
                                        <button
                                            onClick={() => redireccionarAsignarPrograma(estancia.id_estancia_residente, estancia.correo)}
                                            className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                                        >
                                            Registrar programa
                                        </button>
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='flex justify-center mt-4'>
                            <ReactPaginate
                                previousLabel={<i className="fas fa-chevron-left"></i>}
                                nextLabel={<i className="fas fa-chevron-right"></i>}
                                breakLabel={'...'}
                                pageCount={pageCount}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={2}
                                onPageChange={handlePageChange}
                                containerClassName={'pagination flex'}
                                activeClassName={'active'}
                                disabledClassName={'bg-gray-500 text-gray-300 cursor-not-allowed'}
                                pageClassName={'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'}
                                pageLinkClassName={'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'}
                            />
            
                        </div>
                    </div>
                </div>

            </>
        </div>
    )
}

export default ListadoAlumnosExternos