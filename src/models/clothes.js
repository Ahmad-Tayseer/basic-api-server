'use strict';

const clothes = (sequelize, DataTypes) => 
    sequelize.define('clothes', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        price: {
            type: DataTypes.FLOAT,
        }
    });

module.exports = clothes; 