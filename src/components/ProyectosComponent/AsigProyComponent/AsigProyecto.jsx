import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { asignarProyecto, proyectos, consultaProgramasPorAlumno } from '../../../api/APIS';
import SlideBarInvestigadores from '../../SlideBar/SlideBarInvestigadores';
import Swal from 'sweetalert2';

const AsigProyecto = () => {

    const navigate = useNavigate();

    const { correo } = useParams();
    const { id_proyecto, id_estudiante, correo_estudiante, tipo, estudiante_correo, coordinador_correo, correo_investigador } = useParams();
    const [proyecto, setProyecto] = useState([]);
    const [programa, setPrograma] = useState([]);


    const redireccionarListadoAlumnos = () => {
        navigate(`/listadoAlumnos/${correo || coordinador_correo || correo_investigador}`);
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
                const programasData = await consultaProgramasPorAlumno(correo_estudiante);
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
        const tipo = formData.get('tipo');
        //  const proyecto = Object.fromEntries(formData);

        try {

            const proyectoSeleccionado = proyecto.find(proyecto => proyecto.titulo_esp === proyectoNombre);
            if (!proyectoSeleccionado) {
                alert('Proyecto no encontrado');
                return;
            }

            const programaSeleccionado = programa.find(programa => programa.tipo === tipo);
            if (!programaSeleccionado) {
                alert('Programa no encontrado');
                return;
            }

            const idPrograma = programaSeleccionado.id_programa;

            await asignarProyecto(proyectoSeleccionado.id_proyecto, id_estudiante, correo_estudiante, idPrograma);
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
        <>
        <SlideBarInvestigadores />
            <div className='bg-slate-400 flex justify-center items-center h-screen'>
                <div className=' p-8 bg-slate-700'>
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
                            <input type="tipo" name="tipo" id="password" required
                                className='w-96 rounded-full border-0 bg-slate-800 p-2 px-4 focus:bg-slate-800 focus:ring-2  text-center text-white'
                                autoComplete='off'
                                value={programa[0]?.tipo}
                            />
                        </div>

                        <button type="submit"
                            className='mb-6 w-96 appearance-none rounded-full border-0 bg-indigo-700 hover:bg-indigo-800 dark:hover:bg-indigo-900 p-2 px-4 focus:bg-slate-800 focus:ring-2  text-center text-white'>
                            Añadir usuario
                        </button>
                    </form>
                    <div class="flex justify-center items-center text-blue-500">
                        <button type="submit"
                            className='mb-6 w-40 appearance-none rounded-full border-0 bg-indigo-700 hover:bg-indigo-800 p-2 px-4 focus:bg-slate-800 focus:ring-2 text-white items-center justify-center flex'
                            onClick={redireccionarListadoAlumnos}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>

                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AsigProyecto;