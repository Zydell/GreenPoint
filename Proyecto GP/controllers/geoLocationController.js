const { verificarUbicacionChimborazo, verificarExistenciaNegocio } = require('../services/geoLocationService');

// Controlador para agregar un nuevo punto verde
exports.agregarPuntoVerde = async (req, res) => {
    const { descripcion, direccion, latitud, longitud, negocio_id } = req.body;

    try {
        // Verificar si las coordenadas están dentro de Chimborazo
        const estaEnChimborazo = await verificarUbicacionChimborazo(latitud, longitud);
        if (!estaEnChimborazo) {
            return res.status(400).json({ error: 'Las coordenadas no están dentro de Chimborazo' });
        }

        // Verificar si el negocio_id existe
        const negocioExistente = await verificarExistenciaNegocio(negocio_id);
        if (!negocioExistente) {
            return res.status(400).json({ error: 'El negocio con el negocio_id proporcionado no existe' });
        }

        // Crear el punto verde en la base de datos
        const nuevoPuntoVerde = await db.tb_puntos_verdes.create({
            descripcion,
            direccion,
            latitud,
            longitud,
            negocio_id
        });

        res.status(201).json({ message: 'Punto verde agregado exitosamente', puntoVerde: nuevoPuntoVerde });
    } catch (error) {
        console.error('Error al agregar punto verde:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Controlador para actualizar un punto verde existente
exports.actualizarPuntoVerde = async (req, res) => {
    const { descripcion, direccion, latitud, longitud, negocio_id } = req.body;
    const { id } = req.params;

    try {
        // Verificar si el punto verde existe
        let puntoVerde = await db.tb_puntos_verdes.findByPk(id);
        if (!puntoVerde) {
            return res.status(404).json({ message: 'Punto verde no encontrado' });
        }

        // Verificar si las coordenadas están dentro de Chimborazo
        const estaEnChimborazo = await verificarUbicacionChimborazo(latitud, longitud);
        if (!estaEnChimborazo) {
            return res.status(400).json({ error: 'Las coordenadas no están dentro de Chimborazo' });
        }

        // Verificar si el negocio_id existe
        const negocioExistente = await verificarExistenciaNegocio(negocio_id);
        if (!negocioExistente) {
            return res.status(400).json({ error: 'El negocio con el negocio_id proporcionado no existe' });
        }

        // Actualizar el punto verde en la base de datos
        puntoVerde = await puntoVerde.update({
            descripcion,
            direccion,
            latitud,
            longitud,
            negocio_id
        });

        res.status(200).json({ message: 'Punto verde actualizado exitosamente', puntoVerde });
    } catch (error) {
        console.error('Error al actualizar punto verde:', error.message);
        res.status(500).json({ error: error.message });
    }
};
