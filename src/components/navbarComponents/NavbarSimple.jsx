import React from 'react'

const NavbarSimple = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-gray-700">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className='flex items-center'>
            <img src="../src/assets/logocai.jpg" class="h-8" alt="CCAI Logo" />
            <span className="ml-5 self-center text-2xl font-semibold whitespace-nowrap text-white">Sistema de Gestion de Procesos del CCAI</span>
        </a>
    </div>
</nav>
  )
}

export default NavbarSimple;