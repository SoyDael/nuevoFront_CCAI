import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3300/api/ccai/v1/'
});

const getToken = () => {
    return localStorage.getItem('token');
}

const updateToken = () => {
    API.defaults.headers.common['Authorization'] = ` ${getToken()}`;
}

updateToken();

export const createUsuario = async (usuario) => {
    const response = await API.post("auth/register", usuario);
    return response.data;
}

export const login = async (credenciales) => {
    const response = await API.post("auth/login", credenciales);

    const token = response.data.token;
    localStorage.setItem('token', token);
    updateToken();
    console.log(token);

    return response.data;
}

export const getconsultaActividadesEstudiantes = async () => {

    const response = await API.get("consultaActividad");
    return response.data;
}

export const getconsultaActividadesEstudiantesPorId = async (correo) => {
    const response = await API.get(`consultaActividadPorID/${correo}`);
    response.data[0].fecha_inicio = response.data[0].fecha_inicio.split('T')[0];
    response.data[0].fecha_fin = response.data[0].fecha_fin.split('T')[0];
    console.log(response.data);
    return response.data;
}

export const getPerfilEstudiante = async (correo) => {
    const response = await API.get(`perfilEstudiante/${correo}`);
    return response.data;
}

export const actualizarPerfil = async (correo, datos) => {
    try {
        // Realiza la solicitud PATCH con los datos actualizados
        const response = await API.patch(`actualizarPerfilEstudiante/${correo}`, datos);
        return response;
    } catch (error) {
        throw error; // Propaga el error para manejarlo en el componente
    }
}

export const ParticipantePorProyecto = async (correo) => {
    const response = await API.get(`consultaParticipantePorProyecto/${correo}`);
    console.log(response.data);
    return response.data;
}

export const navbarEstudiante = async (correo) => {
    const response = await API.get(`navbarEstudiante/${correo}`);
    return response.data;
}

export const PerfilInvestigador = async (correo) => {
    const response = await API.get(`perfilInvestigador/${correo}`);
    console.log(response.data)
    return response.data;
}
