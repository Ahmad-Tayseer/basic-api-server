'use strict';

const express = require('express');

const { Clothes } = require('../models/index');
const clothesRouter = express.Router();

clothesRouter.get('/clothes', getClothes);
clothesRouter.get('/clothes/:id', getspecificClothes);
clothesRouter.post('/clothes', createClothes);
clothesRouter.put('/clothes/:id', updateClothes);
clothesRouter.delete('/clothes/:id', deleteClothes);

async function getClothes(req, res) {
    let clothesResult = await Clothes.findAll();
    res.status(200).json(clothesResult);
};

async function getspecificClothes(req, res) {
    let clothesId = parseInt(req.params.id);
    let clothesResult = await Clothes.findOne({ where: { id : clothesId } });
    res.status(200).json(clothesResult);
};

async function createClothes(req, res) {
    let newClothes = req.body;
    let createdClothes = await Clothes.create(newClothes);
    res.status(201).json(createdClothes);
};

async function updateClothes(req, res) {
    let clothesId = parseInt(req.params.id);
    let newClothes = req.body;
    let clothesUpdate = await Clothes.findOne({ where: { id : clothesId } });
    if (clothesUpdate) {
        const clothesUpdated = await clothesUpdate.update(newClothes);
        res.status(201).json(clothesUpdated);
      } else {
        res.status(404).json({ message: 'clothes not found' });
      }
};

async function deleteClothes(req, res) {
    let clothesId = parseInt(req.params.id);
    let clothesDeleted = await Clothes.findOne({ where: { id : clothesId } });
    if (clothesDeleted) {
        await clothesDeleted.destroy();
        res.status(204).json({ message: 'clothes deleted' });
      } else {
        res.status(404).json({ message: 'clothes not found' });
      }
};




module.exports = clothesRouter;