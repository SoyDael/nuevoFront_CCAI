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


    const actividadesFormateadas = response.data.map(actividad => {
        actividad.fecha_inicio = actividad.fecha_inicio.split('T')[0];
        actividad.fecha_fin = actividad.fecha_fin.split('T')[0];
        return actividad;
    }
    );
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


export const navbarInvestigador = async (correo) => {
    const response = await API.get(`navbarInvestigador/${correo}`);
    return response.data;
}


export const PerfilInvestigador = async (correo) => {
    const response = await API.get(`perfilInvestigador/${correo}`);
    console.log(response.data)
    return response.data;
}


export const actualizarPerfilInvestigador = async (correo, datos) => {
    try {
        // Realiza la solicitud PATCH con los datos actualizados
        const response = await API.patch(`editarInvestigador/${correo}`, datos);
        return response;
    } catch (error) {
        throw error; // Propaga el error para manejarlo en el componente
    }
}

export const proyectosInvestigador = async (correo) => {
    const response = await API.get(`proyectosInvestigador/${correo}`);
    response.data.forEach(programa => {
        programa.fecha_inicio = programa.fecha_inicio.split('T')[0];
        programa.fecha_fin = programa.fecha_fin.split('T')[0];
        programa.fecha_registro = programa.fecha_registro.split('T')[0];
    })
    console.log(response.data)
    return response.data;
}

export const getProyecto = async (id_proyecto) => {
    const response = await API.get(`proyectoPorId/${id_proyecto}`);
    response.data.forEach(programa => {
        programa.fecha_inicio = programa.fecha_inicio.split('T')[0];
        programa.fecha_fin = programa.fecha_fin.split('T')[0];
        programa.fecha_registro = programa.fecha_registro.split('T')[0];
    })
    console.log(response.data);
    return response.data;
}


export const participanteProyecto = async (proyecto_id) => {
    const response = await API.get(`participantePorProyecto/${proyecto_id}`);
    console.log(response.data);
    return response.data;
}

export const asignarActividad = async (actividad, id_proyecto, id_estudiante, correo_estudiante) => {
    // Agregar el id_proyecto al objeto de actividad
    actividad.id_proyecto = id_proyecto;
    // Agregar el id_estudiante al objeto de actividad
    actividad.id_estudiante = id_estudiante;
    // Agregar el correo_estudiante al objeto de actividad
    actividad.correo_estudiante = correo_estudiante;

    const response = await API.post("registroActividad", actividad);
    return response.data;
}

export const registroEstudiante = async (estudiante) => {
    const response = await API.post("registroEstudiante", estudiante);
    return response.data;
}

export const listadoAlumnos = async (estudiante, id_estudiante, correo) => {
    const data = {
        id_estudiante: id_estudiante,
        correo: correo
    };
    const response = await API.get("consultaEstudiante", {params: data});
    return response.data;
}

export const asignarProyecto = async (proyecto_id, id_estudiante, correo_estudiante, id_programa) => {
    const data = {
        proyecto_id: proyecto_id,
        id_estudiante: id_estudiante,
        correo_estudiante: correo_estudiante,
        id_programa: id_programa
    };
    const response = await API.post("registroParticipante", data);
    return response.data;
}

export const proyectos = async () => {
    const response = await API.get("consultaProyectos");
    response.data[0].fecha_inicio = response.data[0].fecha_inicio.split('T')[0];
    response.data[0].fecha_registro = response.data[0].fecha_registro.split('T')[0];
    response.data[0].fecha_fin = response.data[0].fecha_fin.split('T')[0];
    console.log(response.data);
    return response.data;
}

export const registroPrograma  = async (programa, id_estudiante, estudiante_correo) => {
    // Agregar el id_estudiante al objeto de programa
    programa.id_estudiante = id_estudiante;
    // Agregar el correo_estudiante al objeto de programa
    programa.estudiante_correo = estudiante_correo;

    const response = await API.post("registroPrograma", programa);
    return response.data;
}

export const consultaProgramasPorAlumno = async (estudiante_correo) => {
    const response = await API.get(`consultaPrograma/${estudiante_correo}`);
    console.log(response.data);
    return response.data;
}

export const obtenerDocumentacionPrograma = async () => {
    const response = await API.get(`obtenerDocumentacionPrograma`);
    response.data[0].fecha_inicio = response.data[0].fecha.split('T')[0];

    console.log(response.data);
    return response.data;
}

export const actualizarDocumentacion = async (id_documento, datos) => {
    try {
        // Realiza la solicitud PATCH con los datos actualizados
        const response = await API.patch(`actualizarDocumentacionPrograma/${id_documento}`, datos);
        response.data[0].fecha = response.data[0].fecha.split('T')[0];
        //console.log("omar->",response.data);
        return response;
    } catch (error) {
        throw error; // Propaga el error para manejarlo en el componente
    }
}

export const recuperarContraseña = async (datos) => {
    const response = await API.patch(`auth/recuperarContrasena`, datos);
    console.log(response.data);
    return response.data;

}

export const registroProyecto = async (proyecto) => {
    const response = await API.post('registroProyecto', proyecto);
    console.log(response.data);
    return response.data;
}

export const verProyectos = async () => {
    const response = await API.get('consultaProyectos')
    response.data[0].fecha_inicio = response.data[0].fecha_inicio.split('T')[0];
    response.data[0].fecha_registro = response.data[0].fecha_registro.split('T')[0];
    response.data[0].fecha_fin = response.data[0].fecha_fin.split('T')[0];
    console.log(response.data);
    return response.data;
}

export const consultaInvestigadores = async () => {
    const response = await API.get('consultaInvestigadores')
    return response.data;
}

export const obtenerDocumentacionProgramaPorID = async (id_proyecto) => {
    const response = await API.get(`obtenerDocumentacionPorID/${id_proyecto}`);
    console.log(response.data);
    return response.data;
}

export const registroDocumentacion = async (documentacion) => {
    const response = await API.post('registroDocumentacionPrograma', documentacion);
    console.log(response.data);
    return response.data;
}

export const obtenerDocumentacionProgramaPorCorreo = async (correo_estudiante) => {
    const response = await API.get(`obtenerDocumentacionPorCorreoEstudiante/${correo_estudiante}`);
    response.data[0].fecha = response.data[0].fecha.split('T')[0];
    console.log(response.data);
    return response.data;
}

export const consultaProgramas = async () => {
    const response = await API.get('/consultaProgramas');
       // Iteramos sobre todos los datos devueltos por la API
       response.data.forEach(programa => {
        programa.fecha_inicio = programa.fecha_inicio.split('T')[0];
        programa.fecha_fin = programa.fecha_fin.split('T')[0];
    });
    console.log(response.data);
    return response.data;
}

export const eliminarParticipante = async (correo_estudiante) => {
    const response = await API.delete(`eliminarParticipante/${correo_estudiante}`);
    console.log(response.data);
    return response.data;
}

export const actualizarProyecto = async (id_proyecto, datos) => {
    try {
        // Realiza la solicitud PATCH con los datos actualizados
        const response = await API.patch(`actualizarProyecto/${id_proyecto}`, datos);
        response.data[0].fecha_inicio = response.data[0].fecha_inicio.split('T')[0];
        response.data[0].fecha_fin = response.data[0].fecha_fin.split('T')[0];
        response.data[0].fecha_registro = response.data[0].fecha_registro.split('T')[0];
        console.log(response.data);
        return response;
    } catch (error) {
        throw error; // Propaga el error para manejarlo en el componente
    }
}

export const perfilExterno = async (correo) => {
    const response = await API.get(`perfilEstancia/${correo}`);
    console.log(response.data);
    return response.data;
}

export const listadoEstancias = async () =>{
    const response = await API.get('listadoEstancias');
    response.data.forEach(listadoestancias => {
        listadoestancias.fecha_inicio = listadoestancias.fecha_inicio.split('T')[0];
        listadoestancias.fecha_fin = listadoestancias.fecha_fin.split('T')[0];
    });
    console.log(response.data);
    return response.data;
}

export const actividadesEstanciasPorCorreo = async (correo) => {
    const response = await API.get(`consultarActividadEstanciaPorCorreo/${correo}`);
    console.log(response.data);
    return response.data;
}