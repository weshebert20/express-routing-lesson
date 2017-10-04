var express = require('express');
var app     = express();
var port    = process.env.PORT || 3000;

app.get('/api/parsetime', function(req, res) {
  time = new Date();
  result = {
    hour: time.getHours(),  
    minute: time.getMinutes(),  
    second: time.getSeconds()  
  };

  res.send(result);
});

app.get('/api/unixtime', function(req, res) {
  time = new Date();

  res.send({ unixtime : time.getTime() });
});

app.listen(port);
