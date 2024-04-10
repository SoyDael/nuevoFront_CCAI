import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { asignarProyecto, proyectos, consultaProgramasPorAlumno } from '../../../api/APIS';

const AsigProyecto = () => {

    const navigate = useNavigate();

    const { correo } = useParams();
    const { id_proyecto, id_estudiante, correo_estudiante, tipo, estudiante_correo } = useParams();
    const [proyecto, setProyecto] = useState([]);
    const [programa, setPrograma] = useState([]);


    const redireccionarListadoAlumnos = (correo) => {
        navigate(`/listadoAlumnos/${correo}`);
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
            navigate(`/integrantes/${id_proyecto}/${correo}`);
        } catch (error) {
            console.error('Error al asignar proyecto:', error);
            alert('Error al asignar proyecto. Por favor, inténtelo de nuevo más tarde.');
        }
    }

    return (
        <>
            <div className='bg-gray-100 flex justify-center items-center h-screen'>
                <div className='lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2'>
                    <h1 className='text-2x1 font-semibold mb-4'>Asignacion de proyecto</h1>
                    <form action="" onSubmit={handleSubmit} >
                        <div className='mb-4'>
                            <label htmlFor="id_proyecto" className='block text-gray-600'>Proyecto: </label>
                            <select name="titulo_esp" id="titulo_esp" required
                                className='w-full border boder-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-center'>
                                <option value="">Seleccionar proyecto</option>
                                {proyecto.map(proyecto => (
                                    <option key={proyecto.proyecto_id} value={proyecto.proyecto_id}>{proyecto.titulo_esp}</option>
                                ))}
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="id_programa" className='block text-gray-600'>Tipo de programa: </label>
                            <input type="tipo" name="tipo" id="password" required
                                className='w-full border boder-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                                autoComplete='off'
                                value={programa[0]?.tipo}
                            />
                        </div>

                        <button type="submit"
                            className='mb-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full'>
                            Añadir usuario
                        </button>
                    </form>
                    <div class="mb-6 text-blue-500 text-center">
                        <button type="submit"
                            className='mb-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full'
                            onClick={redireccionarListadoAlumnos}
                        >
                            Regresar
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AsigProyecto;