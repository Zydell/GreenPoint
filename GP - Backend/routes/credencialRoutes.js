const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all credenciales
router.get('/', async (req, res) => {
  try {
    const credenciales = await db.tb_credenciales.findAll();
    res.status(200).json(credenciales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new credencial
router.post('/', async (req, res) => {
  try {
    const credencial = await db.tb_credenciales.create(req.body);
    res.status(201).json(credencial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a credencial by id
router.get('/:id', async (req, res) => {
  try {
    const credencial = await db.tb_credenciales.findByPk(req.params.id);
    if (credencial) {
      res.status(200).json(credencial);
    } else {
      res.status(404).json({ message: 'Credencial not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a credencial by id
router.put('/:id', async (req, res) => {
  try {
    const credencial = await db.tb_credenciales.findByPk(req.params.id);
    if (credencial) {
      await credencial.update(req.body);
      res.status(200).json(credencial);
    } else {
      res.status(404).json({ message: 'Credencial not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a credencial by id
router.delete('/:id', async (req, res) => {
  try {
    const credencial = await db.tb_credenciales.findByPk(req.params.id);
    if (credencial) {
      await credencial.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Credencial not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
