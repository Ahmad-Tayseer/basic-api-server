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
    let foodUpdated = foodUpdate.update(newFood);
    res.status(201).json(foodUpdated);
};

async function deleteFood(req, res) {
    let foodId = parseInt(req.params.id);
    let foodDeleted = await Food.destroy({ where: { id : foodId } });
    res.status(204).json(foodDeleted);
};

module.exports = foodRouter;