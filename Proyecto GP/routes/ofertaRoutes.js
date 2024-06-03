const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all ofertas
router.get('/', async (req, res) => {
  try {
    const ofertas = await db.tb_ofertas.findAll();
    res.status(200).json(ofertas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new oferta
router.post('/', async (req, res) => {
  try {
    const oferta = await db.tb_ofertas.create(req.body);
    res.status(201).json(oferta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get an oferta by id
router.get('/:id', async (req, res) => {
  try {
    const oferta = await db.tb_ofertas.findByPk(req.params.id);
    if (oferta) {
      res.status(200).json(oferta);
    } else {
      res.status(404).json({ message: 'Oferta not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an oferta by id
router.put('/:id', async (req, res) => {
  try {
    const oferta = await db.tb_ofertas.findByPk(req.params.id);
    if (oferta) {
      await oferta.update(req.body);
      res.status(200).json(oferta);
    } else {
      res.status(404).json({ message: 'Oferta not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an oferta by id
router.delete('/:id', async (req, res) => {
  try {
    const oferta = await db.tb_ofertas.findByPk(req.params.id);
    if (oferta) {
      await oferta.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Oferta not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
