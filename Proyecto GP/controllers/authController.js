const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { tb_credenciales, tb_ciudadano, tb_negocio, tb_admin, tb_greencoin_cdn } = require('../models');
const notificationService = require('../services/notificationService');


// Verificar si el correo ya existe
const emailExists = async (correo_electronico) => {
    const existingUser = await tb_credenciales.findOne({ where: { correo_electronico } });
    return !!existingUser;
};

// Calcular la edad a partir de la fecha de nacimiento
const calculateAge = (fecha_nac) => {
    const birthDate = new Date(fecha_nac);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

// Registro de Ciudadano
exports.registerCiudadano = async (req, res) => {
    try {
        const { nombre, apellido, telefono, fecha_nac, correo_electronico, contrasena } = req.body;

        if (await emailExists(correo_electronico)) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        // Verificar si el usuario es mayor de edad
        const age = calculateAge(fecha_nac);
        if (age < 18) {
            return res.status(400).json({ message: 'Debe ser mayor de 18 años para registrarse.' });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        
        // Crear greencoin
        const greencoin = await tb_greencoin_cdn.create({
            registro_id: null,
            total: 0,
            canjeo_id: null
        });

        // Crear ciudadano
        const ciudadano = await tb_ciudadano.create({
            nombre,
            apellido,
            telefono,
            fecha_nac,
            fecharegistro: new Date(),
            greencoin_id: greencoin.greencoin_id
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
        
        if (await emailExists(correo_electronico)) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }
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

        if (await emailExists(correo_electronico)) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }
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
        const notificaciones = notificationService.getNotifications(user.credencial_id);

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

