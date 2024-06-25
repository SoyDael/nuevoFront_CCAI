import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { asignarActividad } from '../../../api/APIS';
import SlideBarInvestigadores from '../../SlideBar/SlideBarInvestigadores';


const AsignarActividad = () => {

    const navigate = useNavigate();

    const { id_proyecto, id_estudiante, correo_estudiante } = useParams();
    const { correo } = useParams();

    const redireccionarIntegrantes = () => {
        navigate(`/integrantes/${id_proyecto}/${correo}`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const actividad = Object.fromEntries(formData);

        try {
            await asignarActividad(actividad, id_proyecto, id_estudiante, correo_estudiante);
            alert('Actividad asignada correctamente');
            navigate(`/integrantes/${id_proyecto}/${correo}`);
        } catch (error) {
            console.error('Error al asignar actividad:', error);
            alert('Error al asignar actividad. Por favor, inténtelo de nuevo más tarde.');
        }
    }

    return (
        <>
        <SlideBarInvestigadores/>
            <div className='relative w-full bg-slate-700 flex items-center justify-center min-h-screen from-gray-700 via-gray-800 to-gray-900'>
                <div className='rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50'>
                    <h1 className='text-2xl font-semibold mb-4 text-white'>Asignar actividad </h1>
                    <form action="" onSubmit={handleSubmit}>
                        <div className='flex mb-4'>
                            <input
                                type="text"
                                id="actividad"
                                name="actividad"
                                placeholder="Nombre de la Actividad"
                                class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                            />
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
                        <div className="flex justify-center mt-4">
                            <button type="submit"
                                className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
                                Asignar Actividad
                            </button>
                        </div>
                    </form>
                    <div className="flex justify-center mt-4">
                        <button
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={redireccionarIntegrantes}
                        >
                            Regresar
                        </button>
                    </div>
                </div>
            </div>
        </>


    )
}

export default AsignarActividad
