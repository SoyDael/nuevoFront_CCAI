import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { registroPrograma } from '../../../api/APIS';
import SlideBarPruebaAlumn from '../../SlideBar/SlideBarPruebaAlumn';

const RegistroPrograma = () => {

    const { id_proyecto, id_estudiante, estudiante_correo } = useParams();
    const { correo } = useParams();

    const navigate = useNavigate();

    const redireccionarIntegrantes = () => {
        navigate(`/integrantes/${id_proyecto}/${correo}`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const programa = Object.fromEntries(formData);

        try {
            await registroPrograma(programa, id_estudiante, estudiante_correo);
            alert('Programa asignado correctamente');
            navigate(`/listadoAlumnos/${correo}`);
        } catch (error) {
            console.error('Error al asignar programa:', error);
            alert('Error al asignar programa. Por favor, inténtelo de nuevo más tarde.');
        }
    }

    return (
        <>
            <SlideBarPruebaAlumn />

            <div className='relative w-full bg-slate-700 flex items-center justify-center min-h-screen from-gray-700 via-gray-800 to-gray-900'>
                <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">

                    <form className="max-w-md mx-auto " onSubmit={handleSubmit}>

                        <h1 className='text-2xl font-semibold mb-4 text-white'>Asignar Programa </h1>
                        <div className="relative z-0 w-full mb-5 group">

                            <div class="relative inline-flex">
                                <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero" /></svg>
                                <select class=" bg-gray-800  text-gray-400   pr-8  hover:border-gray-400 focus:outline-none appearance-none">
                                    <option>Tipo de programa</option>
                                    <option>Alumno interno</option>
                                    <option>Investigador</option>
                                    <option>Alumno externo</option>

                                </select>
                            </div>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer" placeholder=" " required />
                            <label for="floating_password" className="peer-focus:font-medium absolute text-sm  text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Estatus</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer" placeholder=" " required />
                            <label for="floating_repeat_password" className="peer-focus:font-medium absolute text-sm  text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Semestre</label>
                        </div>

                        <div date-rangepicker class="flex items-center">
                            <span class="mx-4 text-gray-500">Inicio </span>
                            <div class="relative">

                                <input name="start" type="date" class="border  text-sm rounded-lg  block w-full ps-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Select date start"></input>
                            </div>

                        </div>


                        <div date-rangepicker class="flex items-">

                            <span class="mx-4 text-gray-500"><br />Termino </span>
                            <div class="relative">
                                <br />
                                <input name="end" type="date" class=" border  text-sm rounded-lg  block w-full ps-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Select date end"></input>
                                <br />
                            </div>
                        </div>


                        <div class=" py-2 px-4 mx-0 min-w-full flex flex-col items-center">
                            <button type="  submit" className="  bg-blue-400 hover:bg-blue-600 text-white  rounded-md py-2 px-4">Registrar programa</button>
                        </div>
                    </form>

                </div>
            </div>
        </>

    )
}

export default RegistroPrograma