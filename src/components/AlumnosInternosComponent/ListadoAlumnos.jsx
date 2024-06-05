import React, { useEffect, useState } from 'react'
import { listadoAlumnos, consultaProgramasPorAlumno } from '../../api/APIS'
import { useNavigate, useParams } from 'react-router-dom'
import SlideBarInvestigadores from '../SlideBar/SlideBarInvestigadores';
import ReactPaginate from 'react-paginate';


const ListadoAlumnos = () => {



    const { id_estudiante, correo_estudiante } = useParams();
    const { correo, id_proyecto } = useParams(); // Buscar El correo del investigador y el id del proyecto
    const [alumnos, setAlumnos] = useState([]); // Estado para almacenar el perfil del investigador
    const [programa, setPrograma] = useState([]); // Estado para almacenar los programas del alumno
    const [currentPage, setCurrentPage] = useState(0);


    const navigate = useNavigate();


    const redireccionarAsignarPrograma = (id_estudiante, estudiante_correo) => {
        navigate(`/registroPrograma/${correo}/${id_estudiante}/${estudiante_correo}`);
    }

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const obtenerProgramas = async (e) => {
        e.preventDefault();
        try {
            const response = await listadoAlumnos({ correo: correo });
            const token = response.token;
            console.log(token);
            localStorage.setItem('token', token);

            const programas = await consultaProgramasPorAlumno(estudiante_correo);
            setPrograma(programas);
            redireccionarAsignarPrograma();
        } catch (error) {
            console.log('Error al obtener programas:', error);
        }

    }

    useEffect(() => {
        const fetchAlumnos = async () => {
            try {
                const alumnos = await listadoAlumnos(correo); // Obtener los alumnos del investigador
                console.log(alumnos);
                setAlumnos(alumnos); // Almacena los alumnos del investigador en el estado
                setFilteredAlumnos(alumnos); // Almacena los alumnos del investigador en el estado
            } catch (error) {
                console.error('Error al obtener alumnos:', error);
                alert('Error al obtener alumnos. Por favor, inténtalo de nuevo.');
            }
        };
        fetchAlumnos();
    }, [correo]);

    const alumnosPerPage = 6;
    const offset = currentPage * alumnosPerPage;
    const pageCount = Math.ceil(alumnos.length / alumnosPerPage);

    const [filteredAlumnos, setFilteredAlumnos] = useState([]); // Copia de la lista original
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = alumnos.filter((alum) =>
            alum.matricula.toString().toLowerCase().includes(term)
        );
        setFilteredAlumnos(filtered);
    };


    const handleClearSearch = () => {
        setSearchTerm('');
        setFilteredAlumnos(alumnos); // Restaurar la lista original
    };

    return (
        <>
            <SlideBarInvestigadores />
            <div className='relative flex justify-center w-full bg-slate-700 flex items-center justify-center min-h-screen from-gray-700 via-gray-800 to-gray-900 p-20'>
                <div className='rounded-md relative border shadow-2xl bg-gray-800 border-gray-700 shadow-blue-500/50 '>
                    <div className="px-4 py-2 flex justify-between items-center">
                        <input
                            type="text"
                            placeholder="Buscar por matricula..."
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
                    <table className='text-sm text-left rtl:text-right text-gray-400' style={{ overflowY: 'auto', maxHeight: '80vh' }}>
                        <caption className='px-6 py-4 text-lg font-semibold text-left rtl:text-right text-white bg-gray-800'>
                            Alumnos internos
                            <p className='mt-1 text-sm font-normal text-gray-400'>Bienvenido. Los alumnos aceptados son:</p>
                        </caption>
                        <thead className='text-xs uppercase bg-gray-700 text-gray-400 '>
                            <tr>
                                <th scope='col' className='px-6 py-3'>
                                    Matricula
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Nombres
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Correo
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    División
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Telefono
                                </th>
                                <th scope='col' className='px-6 py-3'></th>
                                <th scope='col' className='px-6 py-3'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAlumnos.slice(offset, offset + alumnosPerPage).map((alumno) => (
                                <tr key={alumno.id} className=' border-b bg-gray-800 border-gray-700'>
                                    <td className='px-6 py-4 font-medium whitespace-nowrap text-white'>{alumno.matricula}</td>
                                    <td className='px-6 py-4 font-medium whitespace-nowrap text-white'>{alumno.nombres}</td>
                                    <td className='px-6 py-4 font-medium whitespace-nowrap text-white'>{alumno.correo}</td>
                                    <td className='px-6 py-4 font-medium whitespace-nowrap text-white'>{alumno.division}</td>
                                    <td className='px-6 py-4 font-medium whitespace-nowrap text-white'>{alumno.telefono}</td>
                                    <td className='px-6 py-4 font-medium whitespace-nowrap text-white'>
                                        <button
                                            onClick={() => redireccionarAsignarPrograma(alumno.id_estudiante, alumno.correo)}
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
    )
}

export default ListadoAlumnos