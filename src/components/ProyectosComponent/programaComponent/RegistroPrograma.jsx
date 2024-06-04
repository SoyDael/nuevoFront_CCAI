import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { registroPrograma } from '../../../api/APIS';
import SlideBarInvestigadores from '../../SlideBar/SlideBarInvestigadores';
import Swal from 'sweetalert2'


const RegistroPrograma = () => {

    const { id_proyecto, id_estudiante, estudiante_correo } = useParams();
    const { correo } = useParams();

    const navigate = useNavigate();

    const redireccionarIntegrantes = () => {
        navigate(`/listadoAlumnos/${correo}`);
    }

    const redireccionarAsignarProyecto = () => {
        navigate(`/asignarProyecto/${correo}/${id_estudiante}/${estudiante_correo}`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const programa = Object.fromEntries(formData);

        try {
            await registroPrograma(programa, id_estudiante, estudiante_correo);
            alert('Programa asignado correctamente');
            redireccionarAsignarProyecto(`/asignarProyecto/${correo}/${id_estudiante}/${estudiante_correo}`);

            e.target.reset();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error === 'El alumno ya está registrado en un programa.') {
                // Si el alumno ya está registrado en un programa, muestra ese mensaje específico
                Swal.fire({
                    title: 'Oops!',
                    text: 'El alumno ya está registrado en un programa. De click en el siguiente botón para registrarlo en un proyecto.',
                    icon: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Registrar Proyecto',
                    cancelButtonText: 'Cancelar',
                    preConfirm: () => {
                        // Aquí puedes colocar la lógica que deseas ejecutar cuando se hace clic en el botón "Registrar Proyecto"
                        redireccionarAsignarProyecto(`/asignarProyecto/${correo}/${id_estudiante}/${estudiante_correo}`);
                    }
                });
            } else {
                // Si no hay un mensaje de error específico, muestra un mensaje genérico
                console.error('Error al asignar programa:', error);
                // Si no hay un mensaje de error específico, muestra un mensaje genérico
                console.error('Error al asignar programa:', error);
                Swal.fire({
                    title: 'Oops!',
                    text: 'Llene todos los datos.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                });
            }

        }
    }

    return (
        <>
            <SlideBarInvestigadores />
            <div className='relative w-full bg-slate-700 flex items-center justify-center min-h-screen from-gray-700 via-gray-800 to-gray-900'>
                <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                        <h1 className='text-2xl font-semibold mb-4 text-white'>Asignar Programa </h1>
                        <div className="relative z-0 w-full mb-5 group">
                            <div class="relative inline-flex">
                                <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero" /></svg>
                                <select
                                    name='tipo'
                                    id='tipo'
                                    class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2">
                                    <option value="">Tipo de programa: </option>
                                    <option value="Servicio Social">Servicio Social</option>
                                    <option value="Residencias Profesionales">Residencias Profesionales</option>
                                </select>
                            </div>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <div class="relative inline-flex">
                                <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero" /></svg>
                                <select
                                    name='estatus'
                                    id='estatus'
                                    class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2">
                                    <option value="">Estatus: </option>
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                            </div>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <div class="relative inline-flex">
                                <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero" /></svg>
                                <select
                                    name='semestre'
                                    id='semestre'
                                    class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2">
                                    <option value="">Semestre: </option>
                                    <option value="2024-1">2024-1</option>
                                    <option value="2024-2">2024-2</option>
                                </select>
                            </div>
                        </div>

                        <div date-rangepicker class="w-96 appearance-none p-2 px-4 focus:bg-slate-800 focus:ring-2">
                            <span class="mx-4 text-gray-500">Fecha de Inicio: </span>
                            <div class="relative">
                                <input
                                    name="fecha_inicio"
                                    id='fecha_inicio'
                                    type="date"
                                    class="border  text-sm rounded-lg  block w-full ps-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Select date start"></input>
                            </div>

                        </div>

                        <div date-rangepicker class="w-96 appearance-none p-2 px-4 focus:bg-slate-800 focus:ring-2">
                            <span class="mx-4 text-gray-500">Fecha de Finalizacion: </span>
                            <div class="relative">
                                <input name="fecha_fin"
                                    id='fecha_fin'
                                    type="date"
                                    class="border text-sm rounded-lg block w-full ps-10 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Select date end"></input>
                            </div>
                        </div>

                        <div class=" py-2 px-4 mx-0 min-w-full flex flex-col items-center">
                            <button type="submit" className="bg-indigo-700 hover:bg-indigo-900 text-white  rounded-md py-2 px-4">Registrar programa</button>
                        </div>

                        <div class=" py-2 px-4 mx-0 min-w-full flex flex-col items-center">
                            <button onClick={redireccionarIntegrantes} className="bg-indigo-700 hover:bg-indigo-900 text-white  rounded-md py-2 px-4">Regresar</button>
                        </div>
                    </form>

                </div>
            </div>
        </>

    )
}

export default RegistroPrograma