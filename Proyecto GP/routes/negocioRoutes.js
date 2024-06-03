const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all negocios
router.get('/', async (req, res) => {
  try {
    const negocios = await db.tb_negocio.findAll();
    res.status(200).json(negocios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new negocio
router.post('/', async (req, res) => {
  try {
    const negocio = await db.tb_negocio.create(req.body);
    res.status(201).json(negocio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a negocio by id
router.get('/:id', async (req, res) => {
  try {
    const negocio = await db.tb_negocio.findByPk(req.params.id);
    if (negocio) {
      res.status(200).json(negocio);
    } else {
      res.status(404).json({ message: 'Negocio not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a negocio by id
router.put('/:id', async (req, res) => {
  try {
    const negocio = await db.tb_negocio.findByPk(req.params.id);
    if (negocio) {
      await negocio.update(req.body);
      res.status(200).json(negocio);
    } else {
      res.status(404).json({ message: 'Negocio not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a negocio by id
router.delete('/:id', async (req, res) => {
  try {
    const negocio = await db.tb_negocio.findByPk(req.params.id);
    if (negocio) {
      await negocio.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Negocio not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
