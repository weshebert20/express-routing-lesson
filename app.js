var express = require('express');
var app     = express();
var port    = process.env.PORT || 3000;

var routers = require('./config/routes.js');
var bikeRouters = require('./config/bikeRouter.js');

app.use('/api', routers);

app.use('/bikes', bikeRouters);

app.listen(port);
