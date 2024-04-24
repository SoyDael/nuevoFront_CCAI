import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getPerfilEstudiante, actualizarPerfil } from '../../api/APIS';
import SlideBarPruebaAlumn from '../SlideBar/SlideBarPruebaAlumn';

const EditarPerfil = () => {

    const { correo, correo_estudiante } = useParams();

    const navigate = useNavigate();

    const redireccionarPerfil = () => {
        navigate(`/perfilAlumno/${correo || correo_estudiante}`);
    }

    const [perfilEstudiante, setPerfilEstudiante] = useState({});
    const [campoAEditar, setCampoAEditar] = useState('');
    const [nuevoValor, setNuevoValor] = useState('');
    const [nuevaFoto, setNuevaFoto] = useState(null);


    const handleFotoChange = (event) => {
        console.log("adios");
        const imagenSeleccionada = event.target.files[0];
        setNuevaFoto(imagenSeleccionada);
    };

    const handleModificar = (field, value) => {
        setCampoAEditar(field);
        setNuevoValor(value);
    }

    const actualizarInfo = (field, value) => {
        const correoPerfil = perfilEstudiante[0]?.correo; // Obtener el correo del perfil
        if (correoPerfil) {
            const perfilActualizado = { ...perfilEstudiante, [field]: value };

            if (nuevaFoto) {
                perfilActualizado.foto = nuevaFoto;
            }
            // Llama a la función actualizarPerfil pasando el correo y el objeto con el campo a actualizar y su nuevo valor
            actualizarPerfil(correoPerfil, perfilActualizado).then(resp => {
                if (resp.status >= 200 && resp.status < 300) {
                    alert('Perfil actualizado correctamente');
                    setPerfilEstudiante(perfilActualizado);
                }
            }).catch(error => {
                console.error('Error al actualizar perfil:', error);
                alert('Error al actualizar perfil. Por favor, inténtalo de nuevo.');
            });
        } else {
            console.error('El correo no es una cadena válida.');
            alert('El correo no es una cadena válida.');
        }
    }


    useEffect(() => {
        const fetchPerfilEstudiante = async () => {
            try {
                const perfil = await getPerfilEstudiante(correo);
                console.log(perfil);
                setPerfilEstudiante(perfil);
            } catch (error) {
                console.error('Error al obtener perfil:', error);
                alert('Error al obtener perfil. Por favor, inténtalo de nuevo.');
            }
        };
        fetchPerfilEstudiante();
    }, [correo]);



    return (
        <>
            <SlideBarPruebaAlumn />
            <br /><br /><br /><br /><br />
            <form className="max-w-md mx-auto">
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            id="matricula"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            autoComplete='off'
                            required
                            readOnly
                            value={perfilEstudiante[0]?.matricula}
                            onChange={(e) => handleModificar('matricula', e.target.value)}
                        />
                        <label
                            htmlFor="matricula"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Matrícula
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            id="nombres"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            autoComplete='off'
                            value={perfilEstudiante.nombres}
                            onChange={(e) => handleModificar('nombres', e.target.value)}
                        />
                        <label
                            htmlFor="nombres"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Nombres
                        </label>
                        <button
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 px-2 py-1 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                            onClick={() => actualizarInfo('nombres', nuevoValor)}
                        >
                            Modificar
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            id="apellido_p"
                            className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            autoComplete='off'
                            value={perfilEstudiante?.apellido_p}
                            onChange={(e) => handleModificar('apellido_p', e.target.value)}
                        />
                        <label
                            htmlFor="apellido_p"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Apellido Paterno
                        </label>
                        <button
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 px-2 py-1 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                            onClick={() => actualizarInfo('apellido_p', nuevoValor)}
                        >
                            Modificar
                        </button>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            id="apellido_m"
                            className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            autoComplete='off'
                            value={perfilEstudiante.apellido_m}
                            onChange={(e) => handleModificar('apellido_m', e.target.value)}
                        />
                        <label
                            htmlFor="apellido_m"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Apellido Materno
                        </label>
                        <button
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 px-2 py-1 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                            onClick={() => actualizarInfo('apellido_m', nuevoValor)}
                        >
                            Modificar
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            id="correo"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            autoComplete='off'
                            required
                            value={perfilEstudiante[0]?.correo}
                            readOnly
                            onChange={(e) => handleModificar('', e.target.value)}
                        />
                        <label
                            htmlFor="correo"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Correo
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            id="correo_adicional"
                            className="block py-2.5 px-0 w-[100%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            autoComplete='off'
                            value={perfilEstudiante?.correo_adicional}
                            onChange={(e) => handleModificar('correo_adicional', e.target.value)}
                        />
                        <label
                            htmlFor="correo_adicional"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Correo Adicional
                        </label>
                        <button
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 px-2 py-1 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                            onClick={() => actualizarInfo('correo_adicional', nuevoValor)}
                        >
                            Modificar
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="tel"
                            id="telefono"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            autoComplete='off'
                            value={perfilEstudiante.telefono}
                            onChange={(e) => handleModificar('telefono', e.target.value)}
                        />
                        <label
                            htmlFor="telefono"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Teléfono
                        </label>
                        <button
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 px-2 py-1 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                            onClick={() => actualizarInfo('telefono', nuevoValor)}
                        >
                            Modificar
                        </button>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            id="division"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            autoComplete='off'
                            required
                            readOnly
                            value={perfilEstudiante[0]?.division}
                        />
                        <label
                            htmlFor="division"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            División
                        </label>
                    </div>
                </div>

                <div className="flex justify-center space-x-40 mt-8 sm:mt-14">
                    <button
                        type="submit"
                        className="text-indigo-100 bg-[#202142] hover:bg-indigo-900 focus:ring-4 focus:outline-none focus:ring-indigo-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={redireccionarPerfil}
                    >
                        Regresar
                    </button>
                    <button
                        type="submit"
                        className="text-white bg-[#202142] hover:bg-indigo-900 focus:ring-4 focus:outline-none focus:ring-indigo-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={actualizarInfo}
                    >
                        Guardar
                    </button>
                </div>
            </form>



        </>
    )
}

export default EditarPerfil;

{/**
       <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
                <div className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4 flex flex-col justify-center">
                    <div className="p-2 md:p-4">
                        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                            <h2 className="pl-6 text-2xl font-bold sm:text-xl">Bienvenido {perfilEstudiante[0]?.nombres} {perfilEstudiante[0]?.apellido_p} {perfilEstudiante[0]?.apellido_m} <br />
                            Solo puedes editar los datos en blanco los demas los asigna el CCAI
                            </h2>
                            <div className="grid max-w-2xl mx-auto mt-8">
                                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                                    <input type="file" accept="image/*" className="hidden" id="inputFoto" onChange={handleFotoChange}
                                    />
                                    <label htmlFor="inputFoto" className="cursor-pointer">
                                        <img className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500" src={perfilEstudiante.foto} alt="Foto" />
                                    </label>
                                    <div className="flex flex-col space-y-5 sm:ml-8">
                                        <button type="button" className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200">
                                            Cambiar Foto
                                        </button>
                                        <button type="button" className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200">
                                            Eliminar Foto
                                        </button>
                                    </div>
                                </div>
                                <div className="items-center mt-8 sm:mt-14 text-[#202142]">

                                    <div className="mb-2 sm:mb-6">
                                        <label htmlFor="matricula" className="block mb-2 text-sm font-medium text-indigo-900 dark:text">Matricula</label>
                                        <div className="relative">
                                            <input type="text" id="matricula"
                                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                                placeholder="Matricula" autoComplete='off' required
                                                readOnly
                                                value={perfilEstudiante[0]?.matricula}
                                                onChange={e => handleModificar('matricula', e.target.value)}
                                            />

                                        </div>
                                    </div>

                                    <div className="mb-2 sm:mb-6">

                                        <label htmlFor="nombres" className="block mb-2 text-sm font-medium text-indigo-900 dark:text">Nombre(s)</label>
                                        <div className='relative'>
                                            <input type="text" id="nombres"
                                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                                placeholder="Nombres" autoComplete='off' required
                                                value={perfilEstudiante.nombres}
                                                onChange={e => handleModificar('nombres', e.target.value)}
                                            />
                                            <button className="absolute top-1/2 right-2 transform -translate-y-1/2 px-2 py-1 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                                onClick={() => actualizarInfo('nombres', nuevoValor)}
                                            >
                                                Modificar
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mb-2 sm:mb-6">
                                        <label htmlFor="apellido_p" className="block mb-2 text-sm font-medium text-indigo-900 dark:text">Apellido Paterno</label>
                                        <div className='relative'>
                                            <input type="text" id="apellido_p"
                                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                                placeholder="Apellido Paterno" autoComplete='off' required
                                                value={perfilEstudiante.apellido_p}
                                                onChange={e => handleModificar('apellido_p', e.target.value)}
                                            />
                                            <button className="absolute top-1/2 right-2 transform -translate-y-1/2 px-2 py-1 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                                onClick={() => actualizarInfo('apellido_p', nuevoValor)}
                                            >
                                                Modificar
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-2 sm:mb-6">
                                        <label htmlFor="apellido_m" className="block mb-2 text-sm font-medium text-indigo-900 dark:text">Apellido Materno</label>
                                        <div className='relative'>
                                            <input type="text" id="apellido_m"
                                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                                placeholder="Apellido Materno" autoComplete='off' required
                                                value={perfilEstudiante.apellido_m}
                                                onChange={e => handleModificar('apellido_m', e.target.value)}

                                            />
                                            <button className="absolute top-1/2 right-2 transform -translate-y-1/2 px-2 py-1 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                                onClick={() => actualizarInfo('apellido_m', nuevoValor)}

                                            >
                                                Modificar
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-2 sm:mb-6">
                                        <label htmlFor="correo" className="block mb-2 text-sm font-medium text-indigo-900 dark:text">Correo</label>
                                        <div className='relative'>
                                            <input type="email" id="correo"
                                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                                placeholder="Correo" autoComplete='off' required
                                                value={perfilEstudiante[0]?.correo}
                                                readOnly
                                                onChange={e => handleModificar('', e.target.value)}

                                            />

                                        </div>
                                    </div>
                                    <div className="mb-2 sm:mb-6">
                                        <label htmlFor="correo" className="block mb-2 text-sm font-medium text-indigo-900 dark:text">Correo Adicional</label>
                                        <div className='relative'>
                                            <input type="email" id="correo"
                                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                                placeholder="Correo" autoComplete='off' required
                                                value={perfilEstudiante.correo_adicional}
                                                onChange={e => handleModificar('correo_adicional', e.target.value)}
                                            />
                                            <button className="absolute top-1/2 right-2 transform -translate-y-1/2 px-2 py-1 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                                onClick={() => actualizarInfo('correo_adicional', nuevoValor)}
                                            >
                                                Modificar
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mb-2 sm:mb-6">
                                        <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-indigo-900 dark:text">Telefono</label>
                                        <div className='relative'>
                                            <input type="cellphone" id="telefono"
                                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                                placeholder="Telefono" autoComplete='off' required
                                                value={perfilEstudiante.telefono}
                                                onChange={e => handleModificar('telefono', e.target.value)}

                                            />
                                            <button className="absolute top-1/2 right-2 transform -translate-y-1/2 px-2 py-1 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                                onClick={() => actualizarInfo('telefono', nuevoValor)}

                                            >
                                                Modificar
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mb-2 sm:mb-6">
                                        <label htmlFor="division" className="block mb-2 text-sm font-medium text-indigo-900 dark:text">Division</label>
                                        <div className='relative'>
                                            <input type="text" id="division"
                                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                                placeholder="division" autoComplete='off' required
                                                readOnly
                                                value={perfilEstudiante[0]?.division}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center space-x-40 mt-8 sm:mt-14">
                                        <button
                                            type="submit"
                                            className="text-indigo-100 bg-[#202142] hover:bg-indigo-900 focus:ring-4 focus:outline-none focus:ring-indigo-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                            onClick={redireccionarPerfil}
                                        >
                                            Regresar
                                        </button>
                                        <button
                                            type="submit"
                                            className="text-white bg-[#202142] hover:bg-indigo-900 focus:ring-4 focus:outline-none focus:ring-indigo-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                            onClick={actualizarInfo}
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
*/}