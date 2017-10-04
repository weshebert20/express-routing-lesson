const express = require('express');
const bikeRouter = express.Router();

bikeRouter.get('/', function(req, res){
	res.send('This is where you get ALL');
});

bikeRouter.get('/:id', function(req, res) {
  	res.send('This is where you get ID');
});

bikeRouter.get('/new', function(req, res) {
  	res.send('This is where you create NEW');
});

bikeRouter.post('/', function(req, res) {
  	res.send('This is where you CREATE');
});

bikeRouter.get('/:id/edit', function(req, res) {
  	res.send('This is where you EDIT');
});

bikeRouter.put('/:id', function(req, res) {
  	res.send('This is where you UPDATE');
});

bikeRouter.delete('/:id', function(req, res) {
  	res.send('This is where you DELETE');
});

module.exports = bikeRouter;