import React from 'react'
import { registroEstudiante } from '../../../api/APIS';
import { useNavigate, useParams } from 'react-router-dom'
import SlideBarPruebaAlumn from '../../SlideBar/SlideBarPruebaAlumn';

const AlumnoInterno = () => {

    const { correo, coordinador_correo, correo_investigador } = useParams(); // Buscar El correo del investigador y el id del proyecto
    const navigate = useNavigate();




    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const estudiante = Object.fromEntries(formData);



        try {
            await registroEstudiante(estudiante);
            alert('Alumno Interno añadido correctamente');
            e.target.reset();
        } catch (error) {
            console.error('Error al añadir alumno:', error);
            alert('Error al añadir alumno. Por favor, inténtelo de nuevo más tarde.');
        }
    };

    return (
        <>
            <SlideBarPruebaAlumn />


            <section class="grid h-screen place-content-center bg-slate-700 text-slate-300">
                <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                    <h1 class="text-4xl font-semibold mb-4">Registro Alumno Interno</h1>

                    <br />
                    <div class="flex flex-col items-center justify-center space-y-6">
                        <input type="text" id="password" name="password" placeholder="Matricula" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                        <input type="text" id="password" name="password" placeholder="Nombres" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                        <input type="text" id="password" name="password" placeholder="Apellido paterno" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                        <input type="text" id="password" name="password" placeholder="Apellido materno" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                        <input type="text" id="password" name="password" placeholder="Correo institucional" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                        <input type="text" id="password" name="password" placeholder="Correo adicional" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                        <input type="number" id="password" name="password" placeholder="Telefono" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />


                        <div class="relative inline-flex">
                            <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero" /></svg>
                            <select class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 ">
                                <option>Sistemas</option>
                                <option>Informatica</option>
                                <option>Bioquimica</option>

                            </select>
                        </div>
                        <button id="showPw" class="rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-indigo-700"><span id="showHide">Añadir</span> alumno</button>

                    </div>
                </div>
            </section>





        </>

    )
}

export default AlumnoInterno