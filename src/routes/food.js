'use strict';

const express = require('express');

const { Food } = require('../models/index');
const foodRouter = express.Router(); 

foodRouter.get('/food', getFood);
foodRouter.get('/food/:id', getspecificFood);
foodRouter.post('/food', createFood);
foodRouter.put('/food/:id', updateFood);
foodRouter.delete('/food/:id', deleteFood);

async function getFood(req, res) {
    let foodResult = await Food.findAll();
    res.status(200).json(foodResult);
};

async function getspecificFood(req, res) {
    let foodId = parseInt(req.params.id);
    let foodResult = await Food.findOne({ where: { id : foodId } });
    res.status(200).json(foodResult);
};

async function createFood(req, res) {
    let newFood = req.body;
    let foodResult = await Food.create(newFood);
    res.status(201).json(foodResult);
};

async function updateFood(req, res) {
    let foodId = parseInt(req.params.id);
    let newFood = req.body;
    let foodUpdate = await Food.findOne({ where: { id : foodId } });
    if (foodUpdate) {
        const foodUpdated = await foodUpdate.update(newFood);
        res.status(201).json(foodUpdated);
      } else {
        res.status(404).json({ message: 'Food not found' });
      }
};

async function deleteFood(req, res) {
    let foodId = parseInt(req.params.id);
    let foodDeleted = await Food.findOne({ where: { id : foodId } });
    if (foodDeleted) {
        await foodDeleted.destroy();
        res.status(204).json({ message: 'Food deleted' });
      } else {
        res.status(404).json({ message: 'Food not found' });
      }
};

module.exports = foodRouter;