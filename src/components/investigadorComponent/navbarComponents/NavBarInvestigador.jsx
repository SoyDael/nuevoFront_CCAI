import React, { useState, useEffect } from 'react';
import {navbarInvestigador} from '../../../api/APIS'
import { useNavigate, useParams } from 'react-router-dom'


const NavBarInvestigador = () => {

    const { correo } = useParams();

    const [perfilInvestigador, setPerfilInvestigador] = useState([]);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const navigate = useNavigate();

    const redireccionarEditar = () => {
        navigate(`/EditarPerfilInvestigador/${correo}`);
    }

    

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    useEffect(() => {
        const fetchPerfilInvestigador = async () => {
            try {
                const perfil = await navbarInvestigador(correo);
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
    <nav className="fixed top-0 left-0 right-0 z-10 bg-indigo-100">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="../src/assets/logocai.jpg" className="h-8" alt="" />
            <span className="ml-5 self-center text-2xl font-semibold whitespace-nowrap text-dark">CCAI</span>
        </a>
        <div className="relative">
            <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 "
                id="user-menu-button"
                aria-expanded={isUserMenuOpen ? "true" : "false"}
                onClick={toggleUserMenu}
            >
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="" alt="user photo" />
            </button>

            {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg ">
                    <div className="px-4 py-3">
                    {perfilInvestigador.length > 0 && (
                            <span className="block text-sm text-gray-900 ">{perfilInvestigador[0]?.nombres} {perfilInvestigador[0]?.apellido_p} {perfilInvestigador[0]?.apellido_m}</span>
                    )}
                    {perfilInvestigador.length > 0 && (
                            <span className="block text-sm text-gray-500 truncate ">{perfilInvestigador[0]?.tipo}</span>
                    )}
                        

                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  "
                                onClick={redireccionarEditar}
                            >
                                Editar Perfil
                            </a>
                        </li>
                        <li>
                            <a  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 " onClick={cerrarSesion} >Cerrar Sesion</a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    </div>
</nav>
</>
  )
}

export default NavBarInvestigador