import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getPerfilInvestigador, actualizarPerfilInvestigador } from '../../api/APIS';
import NavBarInvestigador from '../investigadorComponent/navbarComponents/NavBarInvestigador'

const EditarPerfilInvestigador = () => {

    const { correo } = useParams();

    const navigate = useNavigate();

    const redireccionarPerfil = () => {
        navigate(`/perfilInvestigador/${correo}`);
    }

    const [perfilInvestigador, setPerfilInvestigador] = useState({});
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
        const correoPerfil = perfilInvestigador[0]?.correo; // Obtener el correo del perfil
        if (correoPerfil) {
            const perfilActualizado = { ...perfilInvestigador, [field]: value };

            if (nuevaFoto) {
                perfilActualizado.foto = nuevaFoto;
            }
            // Llama a la función actualizarPerfilInvestigador pasando el correo y el objeto con el campo a actualizar y su nuevo valor
            actualizarPerfilInvestigador(correoPerfil, perfilActualizado).then(resp => {
                if (resp.status >= 200 && resp.status < 300) {
                    alert('Perfil actualizado correctamente');
                    setPerfilInvestigador(perfilActualizado);
                }
            }).catch(error => {
                console.error('Error al actualizar perfil:', error);
                alert('Error al actualizar perfil. Por favor, inténtalo de nuevo.');
            });
        } else {
            console.error('El correo no es una cadena válida.');
            alert('El correo no es una cadena válida.');
        }
        window.location.reload();//refrescar pagina para que se vean los cambios 
    }


    useEffect(() => {
        const fetchPerfilInvestigador = async () => {
            try {
                const perfil = await getPerfilInvestigador(correo);
                console.log(perfil);
                setPerfilInvestigador(perfil);
            } catch (error) {
                console.error('Error al obtener perfil:', error);
                alert('Error al obtener perfil. Por favor, inténtalo de nuevo.');
            }
        };
        fetchPerfilInvestigador();
    }, [correo]);


  return (
    <>
    <NavBarInvestigador/>
    <div className="flex justify-center items-center min-h-screen">
    <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
        <div className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4 flex flex-col justify-center">
            <div className="p-2 md:p-4">
                <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                  <br />
                    <h2 className="pl-6 text-2xl font-bold sm:text-xl">Bienvenido investigador {perfilInvestigador[0]?.nombres} {perfilInvestigador[0]?.apellido_p} {perfilInvestigador[0]?.apellido_m}<br />
                    Solo puedes editar los datos en blanco los demas los asigna el CCAI
                    </h2>
                    <div className="grid max-w-2xl mx-auto mt-8">
                        <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                            <input type="file" accept="image/*" className="hidden" id="inputFoto" onChange={handleFotoChange}
                            />
                            <label htmlFor="inputFoto" className="cursor-pointer">
                                <img className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"  src={perfilInvestigador.foto} alt="Foto" />
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

                                <label htmlFor="nombres" className="block mb-2 text-sm font-medium text-indigo-900 dark:text">Nombre(s)</label>
                                <div className='relative'>
                                    <input type="text" id="nombres"
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                        placeholder="Nombres" autoComplete='off' required
                                        value={perfilInvestigador.nombres}
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
                                        value={perfilInvestigador.apellido_p}
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
                                        value={perfilInvestigador.apellido_m}
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
                                <label htmlFor="correo" className="block mb-2 text-sm font-medium text-indigo-900 dark:text">Correo Adicional</label>
                                <div className='relative'>
                                    <input type="email" id="correo"
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                        placeholder="Correo" autoComplete='off' required
                                        value={perfilInvestigador.correo_adicional}
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
                                        value={perfilInvestigador.telefono}
                                        onChange={e => handleModificar('telefono', e.target.value)}
                                        

                                    />
                                    <button className="absolute top-1/2 right-2 transform -translate-y-1/2 px-2 py-1 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                         onClick={() => actualizarInfo('telefono', nuevoValor)}
                                    >
                                        Modificar
                                    </button>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</>
  )
}

export default EditarPerfilInvestigador