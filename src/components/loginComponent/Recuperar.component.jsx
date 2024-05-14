import React, { useState } from "react";
import SlideBarPruebaAlumn from "../SlideBar/SlideBarPruebaAlumn";
import { recuperarContraseña } from "../../api/APIS";
import NavbarSimple from "../navbarComponents/NavbarSimple";

const Recuperarcomponent = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const FormUpdateData = new FormData(e.target);
    const infoNewUser = Object.fromEntries(FormUpdateData);

    try {
      await recuperarContraseña(infoNewUser)
      alert('Contraseña Actualizada')
    } catch (error) {
      console.log("Error al actualizar", error)
      alert("Error al actualizar", error)
    }
  }

  return (
    <>

    <NavbarSimple/>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-slate-300">
      
          <div class="w-full p-6 rounded-lg shadow  shadow-blue-500/100 dark:border md:mt-0 sm:max-w-md bg-gray-600 border-gray-700 sm:p-8">
            <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
              Cambiar contraseña
            </h2>
            <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  class="block mb-2 text-sm font-medium  text-white"
                >
                  Correo electronico:
                </label>
                <input
                  type="email"
                  name="correo"
                  id="correo"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlForfor="password"
                  class="block mb-2 text-sm font-medium text-white"
                >
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
             
              <button
                type="submit"
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Cambiar contraseña
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Recuperarcomponent;
