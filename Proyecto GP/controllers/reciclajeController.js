const { tb_reciclaje, tb_ciudadano, tb_negocio, tb_puntos_verdes, tb_registra_reciclaje, tb_materiales, tb_credenciales } = require('../models');

// Registrar reciclaje
exports.registrarReciclaje = async (req, res) => {
    try {
        const { correo, negocio_id, punto_verde_id, cantidad, fecha, material_id } = req.body;
        let ciudadano_id = null;
        // Buscar el ciudadano en la tabla tb_credenciales
        try {
            // Buscar el correo electrónico en la tabla tb_credenciales
            const credencial = await tb_credenciales.findOne({
                where: { correo }
            });
    
            if (credencial) {
                // Si se encuentra una coincidencia, devolver el id
                ciudadano_id = credencial.credencial_id;
                //res.json({ ciudadano_id: credencial.usuario_id });
            } else {
                // Si no se encuentra, devolver un mensaje indicando que no se encontró
                res.status(404).json({ message: 'Correo electrónico no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

        // Verificar si el ciudadano, negocio y punto verde existen
        const ciudadan = await tb_ciudadano.findByPk(ciudadano_id);
        const negocio = await tb_negocio.findByPk(negocio_id);
        const puntov = await tb_puntos_verdes.findByPk(punto_verde_id);

        if (!ciudadan || !negocio || !puntov) {
            return res.status(404).json({ error: 'Ciudadano, negocio o punto verde no encontrado' });
        }

        // Crear el reciclaje
        const reciclaje = await tb_reciclaje.create({
            cantidad,
            material_id,
            descripcion
        });
        // Crear el registro de reciclaje
        const reg_reciclaje = await tb_registra_reciclaje.create({
            ciudadano_id,
            negocio_id,
            punto_verde_id,
            reciclaje_id: reciclaje.reciclaje_id,
            cantidad,
            fecha: fecha || new Date()
        });

         const gc_obtenidos = cantidad * valor_por_libra;
        
        // Crear el historial del ciudadano
        await tb_registra_reciclaje.create({
            ciudadano_id: reg_reciclaje.ciudadano_id,
            punto_verde_id: reg_reciclaje.punto_verde_id,
            reciclaje_id: reciclaje.reciclaje_id,
            cantidad: reciclaje.cantidad,
            fecha: fecha || new Date(),
            green_coins_obtenidos: gc_obtenidos
        });

        // Crear el historial del negocio
        await tb_registra_reciclaje.create({
            //ciudadano_id,     VERIFICAR SI TAL VEZ SERIA NECESARIO
            negocio_id: reg_reciclaje.negocio_id,
            punto_verde_id: reg_reciclaje.punto_verde_id,
            reciclaje_id: reciclaje.reciclaje_id,
            cantidad: reciclaje.cantidad,
            fecha: fecha || new Date()
        });
        

        res.status(201).json({ message: 'Reciclaje registrado exitosamente', reciclaje });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener historial de reciclaje para un ciudadano
exports.obtenerHistorialCiudadano = async (req, res) => {
    try {
        const { ciudadano_id } = req.params;

        const historial = await tb_reciclaje.findAll({
            where: { ciudadano_id },
            include: [
                { model: tb_negocio, as: 'negocio' },
                { model: tb_puntos_verdes, as: 'puntov' }
            ]
        });

        res.json(historial);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener historial de reciclaje para un negocio
exports.obtenerHistorialNegocio = async (req, res) => {
    try {
        const { negocio_id } = req.params;

        const historial = await tb_reciclaje.findAll({
            where: { negocio_id },
            include: [
                { model: tb_ciudadano, as: 'ciudadano' },
                { model: tb_puntos_verdes, as: 'puntov' }
            ]
        });

        res.json(historial);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
