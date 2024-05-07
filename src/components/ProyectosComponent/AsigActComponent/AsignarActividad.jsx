import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { asignarActividad } from '../../../api/APIS';
import SlideBarPruebaAlumn from '../../SlideBar/SlideBarPruebaAlumn';



const AsignarActividad = () => {

    const navigate = useNavigate();

    const { id_proyecto, id_estudiante, correo_estudiante } = useParams();
    const { correo } = useParams();

    

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
            <SlideBarPruebaAlumn />





            <div className='relative w-full bg-slate-700 flex items-center justify-center min-h-screen from-gray-700 via-gray-800 to-gray-900'>
                <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">

                    <form className="max-w-md mx-auto " onSubmit={handleSubmit}>

                        <h1 className='text-2xl font-semibold mb-4 text-white'>Asignar actividad </h1>

                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer" placeholder=" " required />
                            <label for="floating_password" className="peer-focus:font-medium absolute text-sm  text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre de actividad</label>
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
                            <button type="  submit" className="  bg-blue-400 hover:bg-blue-600 text-white  rounded-md py-2 px-4">Asignar actividad</button>
                        </div>
                    </form>

                </div>
            </div>
        </>


    )
}

export default AsignarActividad
