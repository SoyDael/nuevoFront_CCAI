import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { createUsuario } from '../../api/APIS';
import NavbarInvestigador from '../SlideBar/SlideBarPruebaAlumn';

const UsuarioForm = () => {

    const { correo } = useParams();

    const navigate = useNavigate();

    const RedireccionarInvetigador = (correo) => {
        navigate(`/perfilInvestigador/${correo}`);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const usuario = Object.fromEntries(formData);

        try {
            await createUsuario(usuario);
            alert('Usuario añadido correctamente');
        } catch (error) {
            console.error('Error al añadir usuario:', error);
            alert('Error al añadir usuario. Por favor, inténtelo de nuevo más tarde.');
        }
    };

    return (
        <>
            <NavbarInvestigador />


            <section class="grid h-screen place-content-center bg-slate-700 text-slate-300">
                <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                    <h1 class="text-4xl font-semibold mb-4">Registrar nuevo usuario</h1>
                    <br />



                    <div class="flex flex-col items-center justify-center space-y-6">
                        <input type="text" id="password" name="password" placeholder="Correo" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                        <div>
                            <input type="password" id="confirm_password" name="confirm_password" placeholder="Contraseña" class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 " />
                            <p id="validation" class="text-center text-orange-500 italic text-sm"></p>
                        </div>

                        <div class="relative inline-flex">
                            <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero" /></svg>
                            <select class="w-96 appearance-none rounded-full border-0 bg-slate-700 p-2 px-4 focus:bg-slate-800 focus:ring-2 ">
                                <option>Investigador</option>
                                <option>Alumno interno</option>
                                <option>Alumno externo</option>

                            </select>
                        </div>
                        <button id="showPw" class="rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-indigo-700"><span id="showHide">Añadir</span> usuario</button>

                    </div>
                </div>
            </section>



        </>
    );
};

export default UsuarioForm;

{/**
 <form action="" onSubmit={handleSubmit}>
            <label htmlFor="correo">Correo: </label>
            <input type="email" name="correo" id="correo" />
            <label htmlFor="password">Contraseña: </label>
            <input type="password" name="password" id="password" />
            <label htmlFor="tipo">Tipo de usuario: </label>
            <select name="tipo" id="tipo">
                <option value="Investigador">Investigador</option>
                <option value="Alumno Interno">Alumno Interno</option>
                <option value="Alumno Externo">Alumno Externo</option>
            </select>

            <button type="submit">Añadir usuario</button>
        </form>
*/}