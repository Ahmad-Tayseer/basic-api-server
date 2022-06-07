'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const POSTGRES_URI = process.env.NODE_ENV === "test" ? 'sqlite:memory:' : process.env.DATABASE_URL;

const clothes = require('../models/clothes');
const food = require('../models/food');

let SequelizeOptions = 
    process.env.NODE_ENV === "production" 
    ? 
    {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    }
    : {};


let sequelize = new Sequelize(POSTGRES_URI, SequelizeOptions);

module.exports = {
    db: sequelize,
    Clothes: clothes(sequelize, DataTypes),
    Food: food(sequelize, DataTypes)
};
