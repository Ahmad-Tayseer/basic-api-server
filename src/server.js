'use strict';

require('dotenv').config();
let PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();

const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const clothesRouter = require('./routes/clothes');
const foodRouter = require('./routes/food');

app.get('/', (req, res) => {
    res.status(200).send('HEllo World!');
});

app.use(express.json());

app.use('*', notFoundHandler);
app.use(errorHandler);
app.use(clothesRouter);
app.use(foodRouter);


const start = (PORT) => {
    app.listen(PORT, () => {
        console.log(`I'm listening on PORT ${PORT}`);
    });
}


module.exports = {
    app: app, 
    start: start,
};
