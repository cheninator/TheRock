var express = require('express');
var bodyParser = require('body-parser');
 
var app = express();
var port = process.env.PORT || 1337;
 
// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
 
// test route
app.get('/', function (req, res) { res.status(200).send('Hello world!'); });
 
app.listen(port, function () {
  console.log('Listening on port ' + port);
});
