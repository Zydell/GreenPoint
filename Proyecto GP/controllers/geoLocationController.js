const { tb_greencoin_cdn, tb_historiales, tb_reciclaje, tb_ciudadano, tb_negocio, tb_puntos_verdes, tb_registra_reciclaje, tb_materiales, tb_credenciales } = require('../models');
const { verificarUbicacionChimborazo, verificarExistenciaNegocio, verificarProximidadPuntoVerde } = require('../services/geoLocationService');

// Controlador para agregar un nuevo punto verde
exports.agregarPuntoVerde = async (req, res) => {
    const { descripcion, direccion, latitud, longitud, negocio_id } = req.body;

    try {
        // Verificar si las coordenadas están dentro de Ecuador
        const estaEnChimborazo = await verificarUbicacionChimborazo(latitud, longitud);
        if (!estaEnChimborazo) {
            return res.status(400).json({ error: 'Las coordenadas no están dentro de Ecuador' });
        }

        // Verificar si el negocio_id existe
        const negocioExistente = await verificarExistenciaNegocio(negocio_id);
        if (!negocioExistente) {
            return res.status(400).json({ error: 'El negocio con el negocio_id proporcionado no existe' });
        }

        // Verificar si ya existe un punto verde en un radio de 5 metros
        const existeProximidad = await verificarProximidadPuntoVerde(latitud, longitud);
        if (existeProximidad) {
            return res.status(400).json({ error: 'Ya existe un punto verde en un radio de 15 metros' });
        }

        // Crear el punto verde en la base de datos
        const nuevoPuntoVerde = await tb_puntos_verdes.create({
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
        let puntoVerde = await tb_puntos_verdes.findByPk(id);
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

        // Verificar si ya existe un punto verde en un radio de 5 metros
        const existeProximidad = await verificarProximidadPuntoVerde(latitud, longitud);
        if (existeProximidad) {
            return res.status(400).json({ error: 'Ya existe un punto verde en un radio de 5 metros' });
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
