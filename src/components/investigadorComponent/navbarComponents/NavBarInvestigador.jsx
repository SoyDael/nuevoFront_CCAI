import React from 'react'

const NavBarInvestigador = () => {
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
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                
            >
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="" alt="user photo" />
            </button>

            
                <div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-indigo-100 dark:divide-gray-600">
                    <div className="px-4 py-3">
                        

                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-500 dark:hover:text-white"
                            >
                                Editar Perfil
                            </a>
                        </li>
                        <li>
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-500 dark:hover:text-white"
                            >Ver Proyecto</a>
                        </li>
                        <li>
                            <a  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-500 dark:hover:text-white" >Cerrar Sesion</a>
                        </li>
                    </ul>
                </div>
            
        </div>
    </div>
</nav>
</>
  )
}

export default NavBarInvestigador