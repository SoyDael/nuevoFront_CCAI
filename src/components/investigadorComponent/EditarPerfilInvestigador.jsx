import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import SlideBarInvestigadores from '../SlideBar/SlideBarInvestigadores'
import { PerfilInvestigador, actualizarPerfilInvestigador } from '../../api/APIS'


const EditarPerfilInvestigador = () => {

  const { correo } = useParams(); // Buscar El correo del investigador
  const [perfilInvestigador, setPerfilInvestigador] = useState([]); // Estado para almacenar el perfil del investigador
  const [campoAEditar, setCampoAEditar] = useState('');
  const [nuevoValor, setNuevoValor] = useState('');
  const [nuevaFoto, setNuevaFoto] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfilInvestigador = async () => {
      try {
        const perfil = await PerfilInvestigador(correo); // Obtener el perfil del investigador
        console.log(perfil);
        setPerfilInvestigador(perfil); // Almacena el perfil del investigador en el estado
      } catch (error) {
        console.error('Error al obtener perfil:', error);
        alert('Error al obtener perfil. Por favor, inténtalo de nuevo.');
      }
    };
    fetchPerfilInvestigador();
  }, [correo])


  const handleModificar = (field, value) => {
    setCampoAEditar(field);
    setNuevoValor(value);
  }


  const actualizarInfo = async (field, value) => {
    try {
      await actualizarPerfilInvestigador(correo, { [field]: value });
      const updatedPerfil = await PerfilInvestigador(correo);
      setPerfilInvestigador(updatedPerfil);
      alert('Perfil actualizado exitosamente');
      window.location.reload();
    } catch (error) {
      debugger
      console.error('Error al actualizar perfil:', error);
      alert('Error al actualizar perfil. Por favor, inténtalo de nuevo.');
    }
  };

  {/** menu desplegable*/ }
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
    console.log('showModal', showModal);
  };


  const [showModal2, setShowModal2] = useState(false);

  const toggleModal2 = () => {
    setShowModal2(!showModal2);
    console.log('showModal', showModal);
  };

  const [showModal3, setShowModal3] = useState(false);

  const toggleModal3 = () => {
    setShowModal3(!showModal3);
    console.log('showModal', showModal);
  };

  const [showModal4, setShowModal4] = useState(false);

  const toggleModal4 = () => {
    setShowModal4(!showModal4);
    console.log('showModal', showModal);
  };

  const [showModal5, setShowModal5] = useState(false);

  const toggleModal5 = () => {
    setShowModal5(!showModal5);
    console.log('showModal', showModal);
  };

  const [showModal6, setShowModal6] = useState(false);

  const toggleModal6 = () => {
    setShowModal6(!showModal6);
    console.log('showModal', showModal);
  };


  return (
    <>
      <SlideBarInvestigadores />
      <div className="flex justify-center items-center h-screen bg-slate-400">


        <div className="max-w-lg border border-slate-900 rounded-lg bg-slate-700 dark:border-slate-700 flex justify-center items-center">
          <div className="p-5 text-center">
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-300 mb-6">Edita tu perfil</h1>
            <form>
              <div className="grid mb-6 sm:grid-cols-2 sm:gap-10 sm:mb-30 w-full">
                {showModal && (
                  <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                      <section class="grid  place-content-center bg-slate-600 text-slate-300">
                        <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                          <label htmlFor="titulo" className="block mb-2 text-sm font-medium text-gray-900 text-white">Titulo</label>
                          <input
                            type="text"
                            name="titulo"
                            id="titulo"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={nuevoValor}
                            onChange={(e) => handleModificar('titulo', e.target.value)}
                            placeholder="Titulo"
                            required=""
                          />
                          <div className='flex justify-between mt-4'>
                            <button onClick={() => actualizarInfo('titulo', nuevoValor)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Guardar</button>
                            <button onClick={() => { toggleModal(); window.location.reload(); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Cerrar</button>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                )}
              </div>
              <div className="sm:col-span-2 ">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <input
                      type="text"
                      id="titulo"
                      name="titulo"
                      placeholder="Titulo"
                      class="w-96 appearance-none rounded-full border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500 text-white text-center"
                      readOnly
                      value={perfilInvestigador[0]?.titulo}
                    />
                    <button onClick={toggleModal} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2" type="button">Modificar</button>
                  </div>
                </div>
              </div>

              <div className="grid mb-6 sm:grid-cols-2 sm:gap-10 sm:mb-30 w-full">
                {showModal6 && (
                  <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                      <section class="grid  place-content-center bg-slate-600 text-slate-300">
                        <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                          <label htmlFor="titulo" className="block mb-2 text-sm font-medium text-gray-900 text-white">Nombres</label>
                          <input
                            type="text"
                            name="nombres"
                            id="nombres"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={nuevoValor}
                            onChange={(e) => handleModificar('nombres', e.target.value)}
                            placeholder="Nombres"
                            required=""
                          />
                          <div className='flex justify-between mt-4'>
                            <button onClick={() => actualizarInfo('nombres', nuevoValor)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Guardar</button>
                            <button onClick={() => { toggleModal6(); window.location.reload(); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Cerrar</button>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                )}
              </div>
              <div className="sm:col-span-2 mb-5">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <input
                      type="text"
                      id="nombres"
                      name="nombres"
                      placeholder="Nombres"
                      class="w-96 appearance-none rounded-full border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500 text-white text-center"
                      readOnly
                      value={perfilInvestigador[0]?.nombres}
                    />
                    <button onClick={toggleModal6} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2" type="button">Modificar</button>
                  </div>
                </div>
              </div>

              {showModal2 && (
                <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                  <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                    <section class="grid  place-content-center bg-slate-600 text-slate-300">
                      <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-white">Apellido Paterno</label>
                        <input
                          type="text"
                          name="apellido_p"
                          id="apellido_p"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          value={nuevoValor}
                          onChange={(e) => handleModificar('apellido_p', e.target.value)}
                          placeholder="Apellido Paterno"
                          required=""
                        />
                        <div className='flex justify-between mt-4'>
                          <button onClick={() => actualizarInfo('apellido_p', nuevoValor)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Guardar</button>
                          <button onClick={() => { toggleModal2(); window.location.reload(); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Cerrar</button>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              )}

              <div className="sm:col-span-2 mb-5">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <input
                      type="text"
                      id="apellido_p"
                      name="apellido_p"
                      placeholder="Apellido Paterno"
                      class="w-96 appearance-none rounded-full border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500 text-white text-center"
                      readOnly
                      value={perfilInvestigador[0]?.apellido_p}
                    />
                    <button onClick={toggleModal2} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2" type="button">Modificar</button>
                  </div>
                </div>
              </div>


              {showModal3 && (
                <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                  <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                    <section class="grid  place-content-center bg-slate-600 text-slate-300">
                      <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-white">Apellido Materno</label>
                        <input
                          type="text"
                          name="apellido_m"
                          id="apellido_m"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Apellido Materno"
                          required=""
                          value={nuevoValor}
                          onChange={(e) => handleModificar('apellido_m', e.target.value)}
                        />
                        <div className='flex justify-between mt-4'>
                          <button onClick={() => actualizarInfo('apellido_m', nuevoValor)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Guardar</button>
                          <button onClick={() => { toggleModal3(); window.location.reload(); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Cerrar</button>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              )}

              <div className="sm:col-span-2 mb-5">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <input
                      type="text"
                      id="apellido_m"
                      name="apellido_m"
                      placeholder="Apellido Materno"
                      class="w-96 appearance-none rounded-full border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500 text-white text-center"
                      readOnly
                      value={perfilInvestigador[0]?.apellido_m}
                    />
                    <button onClick={toggleModal3} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2" type="button">Modificar</button>
                  </div>
                </div>
              </div>

              {showModal4 && (
                <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                  <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                    <section class="grid  place-content-center bg-slate-600 text-slate-300">
                      <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-white">Correo</label>
                        <input
                          type="email"
                          name="correo"
                          id="correo"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          value={nuevoValor}
                          onChange={(e) => handleModificar('correo', e.target.value)}
                          placeholder="Correo"
                          required=""
                        />
                        <div className='flex justify-between mt-4'>
                          <button onClick={() => actualizarInfo('correo', nuevoValor)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Guardar</button>
                          <button onClick={() => { toggleModal4(); window.location.reload(); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Cerrar</button>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              )}

              <div className="sm:col-span-2 mb-5">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <input
                      type="text"
                      id="correo"
                      name="correo"
                      placeholder="Correo"
                      class="w-96 appearance-none rounded-full border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500 text-white text-center"
                      readOnly
                      value={perfilInvestigador[0]?.correo}
                    />
                   {/**  <button onClick={toggleModal4} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2" type="button">Modificar</button> */}
                  </div>
                </div>
              </div>

              {showModal5 && (
                <div className="fixed inset-0 z-50 overflow-auto bg-slate-400 bg-opacity-50 flex justify-center items-center">
                  <div className="bg-dark border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg">
                    <section class="grid  place-content-center bg-slate-600 text-slate-300">
                      <div className=" rounded-md p-4 relative  border shadow-2xl bg-gray-800 border-gray-700   shadow-blue-500/50  ">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-white">Telefono</label>
                        <input
                          type="text"
                          name="telefono"
                          id="telefono"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Telefono"
                          required=""
                          value={nuevoValor}
                          onChange={(e) => handleModificar('telefono', e.target.value)}
                        />
                        <div className='flex justify-between mt-4'>
                          <button onClick={() => actualizarInfo('telefono', nuevoValor)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Guardar</button>
                          <button onClick={() => { toggleModal5(); window.location.reload(); }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2">Cerrar</button>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              )}

              <div className="sm:col-span-2 mb-5">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <input
                      type="text"
                      id="telefono"
                      name="telefono"
                      placeholder="Telefono"
                      class="w-96 appearance-none rounded-full border-0 bg-slate-900 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500 text-white text-center"
                      readOnly
                      value={perfilInvestigador[0]?.telefono}
                    />
                    <button onClick={toggleModal5} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ml-2" type="button">Modificar</button>
                  </div>
                </div>
              </div>

              <div className='flex justify-between mt-4'>

              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditarPerfilInvestigador