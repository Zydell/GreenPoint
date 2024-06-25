//geoLocationService.js
const axios = require('axios');
const { Negocios } = require('../models'); // Importar el modelo de negocios adecuadamente

// Función para verificar si las coordenadas están dentro de Chimborazo
async function verificarUbicacionChimborazo(latitud, longitud) {
    try {
        const username = 'admingreen'; // Reemplazar con tu nombre de usuario de GeoNames
        const provincia = 'chimborazo'; // Reemplazar con la provincia deseada
        const response = await axios.get(`http://api.geonames.org/countrySubdivisionJSON?lat=${latitud}&lng=${longitud}&username=${username}`);

        // Verificar la respuesta y obtener el nombre de la provincia
        const data = response.data;
        if (data.countryCode === 'EC' && data.adminName1.toLowerCase() === provincia) {
            return true; // Está dentro de la provincia de Chimborazo
        } else {
            return false; // No está dentro de la provincia de Chimborazo
        }
    } catch (error) {
        console.error('Error al verificar ubicación:', error);
        return false; // En caso de error, asumimos que no está en Chimborazo
    }
}

// Función para verificar si el negocio_id existe
async function verificarExistenciaNegocio(negocio_id) {
    try {
        const negocio = await Negocios.findByPk(negocio_id);
        return negocio !== null; // Devuelve true si el negocio existe, false si no existe
    } catch (error) {
        console.error('Error al verificar existencia del negocio:', error);
        return false; // En caso de error, asumimos que no existe el negocio
    }
}

module.exports = {
    verificarUbicacionChimborazo,
    verificarExistenciaNegocio
};
