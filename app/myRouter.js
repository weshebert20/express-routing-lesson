var express = require('express');
var router = express.Router();

router.get('/parsetime', function(req, res) {
  time = new Date();
  result = {
    hour: time.getHours(),  
    minute: time.getMinutes(),  
    second: time.getSeconds()  
  }  

  res.send(result);
});

router.get('/unixtime', function(req, res) {
  time = new Date();
  
  res.send({ unixtime : time.getTime() });
});

module.exports = router;