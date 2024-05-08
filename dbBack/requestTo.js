import axios from "axios";
import 'dotenv/config'
// Función para validar un superusuario
const URL = process.env.BACK_URL
async function isValidSuperUser(superUserId) {
    try {
        // Realiza una solicitud GET al endpoint de validación de superusuario
        const response = await axios.get(`${URL}/user/validateSU/${superUserId}`);
        // Verifica si el superusuario es válido según la respuesta del servidor
        if (response.data && response.data.payload === true) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false; // En caso de error, consideramos al superusuario como no válido
    }
}

export default isValidSuperUser
