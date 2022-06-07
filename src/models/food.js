'use strict';

const food = (sequelize, DataTypes) => 
    sequelize.define('food', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        price: {
            type: DataTypes.FLOAT,
        },
    });

module.exports = food;