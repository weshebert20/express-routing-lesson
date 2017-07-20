const express = require('express');
const app     = express();
const port    = process.env.PORT || 3000;
const myRouter = require('./routes.js');
const carRouter = require('./carRoutes.js');

app.use('/api', myRouter);
app.use('/cars', carRouter);


app.listen(port);
