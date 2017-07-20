const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
	//INDEX
	res.send('You made a GET request to the / path...aka INDEX');
});

router.get('/new', function(req, res) {
	//NEW
	res.send('You made a GET request to the /new path...aka NEW');
});

router.get('/:id/edit', function(req, res) {
	//EDIT
	res.send('You made a GET request to the /:id/edit path...aka EDIT');
});

router.get('/:id', function(req, res) {
	//SHOW
	res.send('You made a GET request to the /:id path...aka SHOW');
});

router.post('/', function(req, res) {
	//CREATE
	res.send('You made a POST request to the / path...aka CREATE');
});

router.put('/:id', function(req, res) {
	//UPDATE
	res.send('You made a PUT request to the /:id path...aka UPDATE');
});

router.delete('/:id', function(req, res) {
	//DESTROY
	res.send('You made a DELETE request to the /:id path...aka DESTROY');
});

module.exports = router;