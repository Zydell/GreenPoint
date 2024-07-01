// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register/ciudadano', authController.registerCiudadano);
router.post('/register/negocio', authController.registerNegocio);
router.post('/register/admin', authController.registerAdmin);
router.post('/login', authController.login);

module.exports = router;
