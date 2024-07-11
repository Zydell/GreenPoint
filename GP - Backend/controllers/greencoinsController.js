const { tb_ofertas, tb_canjea_oferta, tb_ciudadano, tb_codigos_canje, tb_greencoin_cdn, tb_registra_reciclaje, tb_materiales, tb_credenciales, tb_negocio } = require('../models');
const { v4: uuidv4 } = require('uuid');

//
const QRCode = require('qrcode');
//

// Obtener historial de ofertas para un ciudadano
/*exports.obtenerHistorialOfertasCiudadano = async (req, res) => {
    try {
        const { correo_electronico } = req.params;
        let ciudadano_id = null;

        // Buscar el ciudadano en la tabla tb_credenciales
        const credencial = await tb_credenciales.findOne({
            where: { correo_electronico }
        });

        if (!credencial) {
            return res.status(404).json({ message: 'Correo electrónico no encontrado' });
        }

        ciudadano_id = credencial.credencial_id;

        // Verificar si el ciudadano existe
        const ciudadano = await tb_ciudadano.findByPk(ciudadano_id);
        if (!ciudadano) {
            return res.status(404).json({ error: 'Ciudadano no encontrado' });
        }

        // Obtener el historial de canjeos de ofertas del ciudadano
        const historial = await tb_canjea_oferta.findAll({
            where: { ciudadano_id },
            include: [{ model: tb_ofertas }]
        });

        // Determinar el estado de cada oferta
        const historialConEstado = historial.map(canjeo => {
            let estado = canjeo.estado;
            const fechaActual = new Date();
            if (estado === 'obtenida' && new Date(canjeo.tb_oferta.fecha_fin) < fechaActual) {
                estado = 'vencida';
                canjeo.estado = estado;
                canjeo.save();  // Actualizar estado en la base de datos
            }
            return {
                oferta_id: canjeo.tb_oferta.oferta_id,
                descripcion: canjeo.tb_oferta.descripcion,
                gc_necesarios: canjeo.tb_oferta.gc_necesarios,
                fecha_inicio: canjeo.tb_oferta.fecha_inicio,
                fecha_fin: canjeo.tb_oferta.fecha_fin,
                estado,
                fecha_canjeo: canjeo.fecha_canjeo
            };
        });

        res.json(historialConEstado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
*/

//VERSIÓN PRUEBA

exports.obtenerHistorialOfertasCiudadano = async (req, res) => {
    try {
        const { correo_electronico } = req.params;
        let ciudadano_id = null;

        // Buscar el ciudadano en la tabla tb_credenciales
        const credencial = await tb_credenciales.findOne({
            where: { correo_electronico }
        });

        if (!credencial) {
            return res.status(404).json({ message: 'Correo electrónico no encontrado' });
        }

        ciudadano_id = credencial.credencial_id;

        // Verificar si el ciudadano existe
        const ciudadano = await tb_ciudadano.findByPk(ciudadano_id);
        if (!ciudadano) {
            return res.status(404).json({ error: 'Ciudadano no encontrado' });
        }

        // Obtener el historial de canjeos de ofertas del ciudadano
        const historial = await tb_canjea_oferta.findAll({
            where: { ciudadano_id },
            include: [
                {
                    model: tb_ofertas,
                    include: [
                        {
                            model: tb_negocio
                        }
                    ]
                }
            ]
        });

        // Determinar el estado de cada oferta
        const historialConEstado = historial.map(canjeo => {
            let estado = canjeo.estado;
            const fechaActual = new Date();
            if (estado === 'obtenida' && new Date(canjeo.tb_oferta.fecha_fin) < fechaActual) {
                estado = 'vencida';
                canjeo.estado = estado;
                canjeo.save();  // Actualizar estado en la base de datos
            }
            return {
                negocio: canjeo.tb_oferta.tb_negocio.nombre, // Nombre del negocio
                oferta_id: canjeo.tb_oferta.oferta_id,
                descripcion: canjeo.tb_oferta.descripcion,
                gc_necesarios: canjeo.tb_oferta.gc_necesarios,
                fecha_inicio: canjeo.tb_oferta.fecha_inicio,
                fecha_fin: canjeo.tb_oferta.fecha_fin,
                estado,
                fecha_canjeo: canjeo.fecha_canjeo
            };
        });

        res.json(historialConEstado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/*
exports.obtenerHistorialOfertasCiudadano = async (req, res) => {
    try {
        const { correo_electronico } = req.params;
        let ciudadano_id = null;

        // Buscar el ciudadano en la tabla tb_credenciales
        const credencial = await tb_credenciales.findOne({
            where: { correo_electronico }
        });

        if (!credencial) {
            return res.status(404).json({ message: 'Correo electrónico no encontrado' });
        }

        ciudadano_id = credencial.credencial_id;

        // Verificar si el ciudadano existe
        const ciudadano = await tb_ciudadano.findByPk(ciudadano_id);
        if (!ciudadano) {
            return res.status(404).json({ error: 'Ciudadano no encontrado' });
        }

        // Obtener el historial de canjeos de ofertas del ciudadano
        const historial = await tb_canjea_oferta.findAll({
            where: { ciudadano_id },
            include: [
                {
                    model: tb_ofertas,
                    include: [
                        {
                            model: tb_negocio,
                            attributes: ['nombre']
                        }
                    ]
                }
            ]
        });

        // Determinar el estado de cada oferta
        const historialConEstado = historial.map(canjeo => {
            let estado = canjeo.estado;
            const fechaActual = new Date();
            if (estado === 'obtenida' && new Date(canjeo.tb_oferta.fecha_fin) < fechaActual) {
                estado = 'vencida';
                canjeo.estado = estado;
                canjeo.save();  // Actualizar estado en la base de datos
            }
            return {
                oferta_id: canjeo.tb_oferta.oferta_id,
                descripcion: canjeo.tb_oferta.descripcion,
                gc_necesarios: canjeo.tb_oferta.gc_necesarios,
                fecha_inicio: canjeo.tb_oferta.fecha_inicio,
                fecha_fin: canjeo.tb_oferta.fecha_fin,
                estado,
                fecha_canjeo: canjeo.fecha_canjeo,
                negocio: canjeo.tb_oferta.tb_negocio.nombre // Añadir el nombre del negocio
            };
        });

        res.json(historialConEstado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};*/



// Función para canjear una oferta
exports.canjearOferta = async (req, res) => {
    try {
        const { correo_electronico, ofertas_id } = req.body;
        let ciudadano_id = null;

        // Buscar el ciudadano en la tabla tb_credenciales
        const credencial = await tb_credenciales.findOne({
            where: { correo_electronico }
        });

        if (!credencial) {
            return res.status(404).json({ message: 'Correo electrónico no encontrado' });
        }

        ciudadano_id = credencial.usuario_id;

        // Verificar si el ciudadano existe
        const ciudadano = await tb_ciudadano.findByPk(ciudadano_id);
        //const greenc = await tb_greencoin_cdn.findByPk(ciudadano_id);
        if (!ciudadano) {
            return res.status(404).json({ error: 'Ciudadano no encontrado' });
        }

        let greencoin_id = ciudadano.greencoin_id
        const greenc = await tb_greencoin_cdn.findOne({
            where: { greencoin_id }
        });
        // Obtener la oferta
        const oferta = await tb_ofertas.findByPk(ofertas_id);
        if (!oferta) {
            return res.status(404).json({ error: 'Oferta no encontrada' });
        }

        // Verificar si el ciudadano tiene suficientes greencoins
        if (greenc.total < oferta.gc_necesarios) {
            return res.status(400).json({ error: 'No tienes suficientes greencoins' });
        }


        // Generar un código de canje único
        const codigo = uuidv4();

        // Crear el canjeo de oferta
        const canjea = await tb_canjea_oferta.create({
            ofertas_id,
            ciudadano_id,
            fecha: new Date(),
            estado: 'canjeada'
        });

        // Reducir los greencoins del ciudadano
        const newTotal = greenc.total - oferta.gc_necesarios;
            await tb_greencoin_cdn.update(
                { total: newTotal, canjeo_id: canjea.canjeo_id },
                { where: { greencoin_id: ciudadano.greencoin_id } }
            );

        // Almacenar el código de canje en la tabla tb_codigos_canje
        await tb_codigos_canje.create({
            codigo,
            ofertas_id,
            negocio_id: oferta.negocio_id,
            ciudadano_id,
            estado: 'generado'
        });

        //-------------------------------------------------------
        // Generar el código QR a partir del UUID
        QRCode.toDataURL(codigo, (err, url) => {
            if (err) {
            return res.status(500).json({ error: 'Error al generar el código QR' });
            }
            res.status(201).json({ message: 'Código generado exitosamente', qrCode: url, codigo: nuevoCodigo });
        });
        //-------------------------------------------------------

        res.status(201).json({ message: 'Oferta canjeada exitosamente', codigo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Función para validar un código de canje
exports.validarCodigoCanje = async (req, res) => {
    try {
        const { codigo, negocio_id } = req.body;

        // Buscar el código de canje en la tabla tb_codigos_canje
        const codigoCanje = await tb_codigos_canje.findOne({
            where: { codigo, negocio_id }
        });

        if (!codigoCanje) {
            return res.status(404).json({ error: 'Código no encontrado o no válido para este negocio' });
        }

        if (codigoCanje.estado === 'validado') {
            return res.status(400).json({ error: 'Este código ya ha sido validado' });
        }

        // Marcar el código como validado
        codigoCanje.estado = 'validado';
        codigoCanje.fecha_validacion = new Date();
        await codigoCanje.save();

        res.status(200).json({ message: 'Código validado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};