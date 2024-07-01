const express = require('express');
const router = express.Router();
const db = require('../models');
const geoLocationController = require('../controllers/geoLocationController');
// Get all 
router.get('/', async (req, res) => {
  try {
    const puntosverdes = await db.tb_puntos_verdes.findAll();
    res.status(200).json(puntosverdes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new 
/*
router.post('/', async (req, res) => {
  try {
    const puntosverdes = await db.tb_puntos_verdes.create(req.body);
    res.status(201).json(puntosverdes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});*/
router.post('/', geoLocationController.agregarPuntoVerde);


// Get an  by id
router.get('/:id', async (req, res) => {
  try {
    const puntosverdes = await db.tb_puntos_verdes.findByPk(req.params.id);
    if (puntosverdes) {
      res.status(200).json(puntosverdes);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an  by id
/*
router.put('/:id', async (req, res) => {
  try {
    const puntosverdes = await db.tb_puntos_verdes.findByPk(req.params.id);
    if (puntosverdes) {
      await puntosverdes.update(req.body);
      res.status(200).json(puntosverdes);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});*/
router.put('/:id', geoLocationController.actualizarPuntoVerde);


// Delete an  by id
router.delete('/:id', async (req, res) => {
  try {
    const puntosverdes = await db.tb_puntos_verdes.findByPk(req.params.id);
    if (puntosverdes) {
      await puntosverdes.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
