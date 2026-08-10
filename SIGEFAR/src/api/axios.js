// Importa Axios para realizar peticiones HTTP.
import axios from "axios";

// Configura la conexión con la API.
const api = axios.create({
    // Define la dirección base del servidor.
    baseURL: "http://localhost:8000"
});

// Exporta la configuración para usarla en otros archivos.
export default api;