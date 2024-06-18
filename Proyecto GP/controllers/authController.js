const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { tb_credenciales, tb_ciudadano, tb_negocio, tb_admin } = require('../models');

// Registro de Ciudadano
exports.registerCiudadano = async (req, res) => {
    try {
        const { nombre, apellido, telefono, fecha_nac, correo_electronico, contrasena } = req.body;

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Crear ciudadano
        const ciudadano = await tb_ciudadano.create({
            nombre,
            apellido,
            telefono,
            fecha_nac,
            fecharegistro: new Date(),
            greencoin_id: null
        });

        // Crear registro de credenciales
        await tb_credenciales.create({
            correo_electronico,
            contrasena: hashedPassword,
            tipousuario: 1, // 1 para ciudadano
            usuario_id: ciudadano.ciudadano_id
        });

        res.status(201).json({ message: 'Ciudadano registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Registro de Negocio
exports.registerNegocio = async (req, res) => {
    try {
        const { nombre, propietario, tipo_negocio, direccion, telefono, correo_electronico, contrasena } = req.body;

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Crear negocio
        const negocio = await tb_negocio.create({
            nombre,
            propietario,
            tipo_negocio,
            direccion,
            telefono,
            fecharegistro: new Date()
        });

        // Crear registro de credenciales
        await tb_credenciales.create({
            correo_electronico,
            contrasena: hashedPassword,
            tipousuario: 2, // 2 para negocio
            usuario_id: negocio.negocio_id
        });

        res.status(201).json({ message: 'Negocio registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Registro de Admin
exports.registerAdmin = async (req, res) => {
    try {
        const { nombre, correo_electronico, contrasena } = req.body;

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Crear admin
        const admin = await tb_admin.create({
            nombre//,
            //correo: correo_electronico,
            //password: hashedPassword,
        });

        // Crear registro de credenciales
        await tb_credenciales.create({
            correo_electronico,
            contrasena: hashedPassword,
            tipousuario: 3, // 3 para admin
            usuario_id: admin.admin_id
        });

        res.status(201).json({ message: 'Admin registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { correo_electronico, contrasena } = req.body;

        // Buscar credenciales
        const credencial = await tb_credenciales.findOne({ where: { correo_electronico } });
        if (!credencial) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(contrasena, credencial.contrasena);
        if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

        // Generar token
        const token = jwt.sign({ id: credencial.credencial_id, tipousuario: credencial.tipousuario }, 'secret', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

