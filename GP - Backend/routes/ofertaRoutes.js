const express = require('express');
const router = express.Router();
const db = require('../models');

// Helper function to update offer states based on date
const updateOfferStates = async () => {
  const ofertas = await db.tb_ofertas.findAll();
  const today = new Date();
  for (let oferta of ofertas) {
    if (new Date(oferta.fecha_fin) < today) {
      await oferta.update({ estado: false });
    }
  }
};

// Get all ofertas
router.get('/', async (req, res) => {
  try {
    await updateOfferStates();
    const ofertas = await db.tb_ofertas.findAll();
    res.status(200).json(ofertas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get active ofertas
router.get('/active', async (req, res) => {
  try {
    await updateOfferStates();
    const ofertas = await db.tb_ofertas.findAll({ where: { estado: true } });
    res.status(200).json(ofertas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new oferta
/*
router.post('/', async (req, res) => {
  try {
    const oferta = await db.tb_ofertas.create(req.body);
    res.status(201).json(oferta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});*/
// Create a new oferta
router.post('/', async (req, res) => {
  try {
    const { fecha_inicio, fecha_fin } = req.body;
    const today = new Date();
    const startDate = new Date(fecha_inicio);
    const endDate = new Date(fecha_fin);

    // Validate fecha_inicio
    if (startDate < today) {
      return res.status(400).json({ message: 'fecha_inicio debe ser mayor o igual a la fecha actual' });
    }

    // Validate fecha_fin
    const minEndDate = new Date(startDate);
    minEndDate.setDate(minEndDate.getDate() + 7);
    if (endDate < minEndDate) {
      return res.status(400).json({ message: 'fecha_fin debe ser al menos una semana mayor que fecha_inicio' });
    }

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
      res.status(404).json({ message: 'Oferta no encontrada' });
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
/*
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
});*/

// Logical delete an oferta by id
router.delete('/:id', async (req, res) => {
  try {
    const oferta = await db.tb_ofertas.findByPk(req.params.id);
    if (oferta) {
      await oferta.update({ estado: false });
      res.status(200).json({ message: 'Oferta logically deleted' });
    } else {
      res.status(404).json({ message: 'Oferta not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
