const express = require('express');
const crypto = require('crypto');
const db = require('../models');
const { sendResetEmail } = require('../utils/email');
const router = express.Router();

router.post('/recuperar-password', async (req, res) => {
  const { email } = req.body;
  const user = await db.tb_credenciales.findOne({ where: { correo_electronico : email } });

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const token = crypto.randomBytes(3).toString('hex'); // Código de 6 caracteres
  user.resetToken = token;
  user.resetTokenExpires = Date.now() + 3600000; // Código válido por 1 hora
  await user.save();

  const resetLink = `http://localhost:4200/reset-password?token=${token}&email=${email}`;
  await sendResetEmail(email, token);

  res.status(200).json({ message: 'Código de recuperación enviado' });
});

module.exports = router;

router.post('/reset-password', async (req, res) => {
    const { password, token, email } = req.body;
    const user = await db.tb_credenciales.findOne({
      where: {
        correo_electronico : email,
        resetToken: token,
        resetTokenExpires: {
          [Op.gt]: Date.now()
        }
      }
    });
  
    if (!user) {
      return res.status(400).json({ error: 'Código inválido o expirado' });
    }
  
    // Hashea la nueva contraseña antes de guardarla
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);
  
    user.correo_electronico = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();
  
    res.status(200).json({ message: 'Contraseña restablecida' });
  });
  
  module.exports = router;