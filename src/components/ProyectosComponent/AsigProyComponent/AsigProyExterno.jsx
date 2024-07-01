import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { asignarProyectoExterno, proyectos, consultaProgramasPorAlumnoExterno } from '../../../api/APIS';
import SlideBarInvestigadores from '../../SlideBar/SlideBarInvestigadores';
import Swal from 'sweetalert2';

const AsigProyExterno = () => {

    const navigate = useNavigate();

    const { correo } = useParams();
    const { id_proyecto, id_estancia_residente, residente_correo, tipo, estudiante_correo, coordinador_correo, correo_investigador } = useParams();
    const [proyecto, setProyecto] = useState([]);
    const [programa, setPrograma] = useState([]);

    const redireccionarListadoAlumnos = () => {
        navigate(`/listadoAlumnosExternos/${correo || coordinador_correo || correo_investigador}`);
    }

    useEffect(() => {
        const fetchProyectos = async () => {
            try {
                const proyectosData = await proyectos();
                console.log(proyectosData);
                setProyecto(proyectosData);
            } catch (error) {
                console.error('Error al obtener proyectos:', error);
                alert('Error al obtener proyectos. Por favor, inténtalo de nuevo.');
            }
        };

        const fetchProgramas = async () => {
            try {
                const programasData = await consultaProgramasPorAlumnoExterno(residente_correo);
                console.log(programasData);
                setPrograma(programasData);
            } catch (error) {
                console.error('Error al obtener programas:', error);
                alert('Error al obtener programas. Por favor, inténtalo de nuevo.');
            }
        }
        fetchProyectos();
        fetchProgramas();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const proyectoNombre = formData.get('titulo_esp');
        const tipo = formData.get('tipoEstancia');
        //  const proyecto = Object.fromEntries(formData);

        try {

            const proyectoSeleccionado = proyecto.find(proyecto => proyecto.titulo_esp === proyectoNombre);
            if (!proyectoSeleccionado) {
                alert('Proyecto no encontrado');
                return;
            }

            const programaSeleccionado = programa.find(programa => programa.tipoEstancia === tipo);
            if (!programaSeleccionado) {
                alert('Programa no encontrado');
                return;
            }

            const idPrograma = programaSeleccionado.id_estancia;

            await asignarProyectoExterno(proyectoSeleccionado.id_proyecto, idPrograma, id_estancia_residente,residente_correo);
            alert('Proyecto asignado correctamente');
            navigate(`/integrantes/${id_proyecto}/${correo || coordinador_correo || correo_investigador}`);
        } catch (error) {
            console.error('Error al asignar proyecto:', error);
            if (error.response && error.response.data && error.response.data.error === 'El alumno ya está registrado en un proyecto.') {
                // Si el alumno ya está registrado en un programa, muestra ese mensaje específico
                Swal.fire({
                    title: 'Oops!',
                    text: 'El alumno ya está registrado en un proyecto.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                });
            } else {
                // Si no hay un mensaje de error específico, muestra un mensaje genérico
                console.error('Error al asignar programa:', error);
                alert('Ocurrió un error al asignar el programa. Por favor, inténtalo de nuevo.');
            }
        }
    }


    return (
        <div>
            <>
                <SlideBarInvestigadores />
                <div className='bg-slate-700 flex justify-center items-center h-screen'>
                    <div className=' p-8 bg-slate-900'>
                        <h1 className='text-2x1 font-semibold mb-4 text-white text-center'>Asignacion de proyecto</h1>
                        <form action="" onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <label htmlFor="id_proyecto" className='block text-gray-400'>Proyecto: </label>
                                <select name="titulo_esp" id="titulo_esp" required
                                    className='w-96 rounded-full border-0 bg-slate-800 p-2 px-4 focus:bg-slate-800 focus:ring-2 text-center text-white'>
                                    <option>Seleccionar proyecto</option>
                                    {proyecto.map(proyecto => (
                                        <option key={proyecto.proyecto_id} value={proyecto.proyecto_id}>{proyecto.titulo_esp}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="id_programa" className='block text-gray-400'>Tipo de programa: </label>
                                <input type="tipoEstancia" name="tipoEstancia" id="tipoEstancia" required
                                    className='w-96 rounded-full border-0 bg-slate-800 p-2 px-4 focus:bg-slate-800 focus:ring-2  text-center text-white'
                                    autoComplete='off'
                                    value={programa[0]?.tipoEstancia}
                                />
                            </div>

                            <button type="submit"
                                className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-96'>
                                Añadir usuario
                            </button>
                        </form>
                        <div class="flex justify-center items-center text-blue-500">
                            <button type="submit"
                                className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 '
                                onClick={redireccionarListadoAlumnos}
                            >
                                Regresar

                            </button>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}

export default AsigProyExterno
