var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')

var app = express();
app.use(cors())

// Simple session handling with a hash of sessions.
var sessions = {};

// A simple API to simulate load in simulated content provided servers.
  // Allow express to parse the body of the requests.
app.use(bodyParser.json());
app.use('/', express.static(__dirname));

// Configure servers loads.
app.put('/server-loads', function(req, res) {
  var loads = req.body;
  sessions[req.query.session] = loads;
  res.status(201).json(loads);
});

// Query servers loads.
app.get('/server-loads', function(req, res) {
  var loads = sessions[req.query.session] || [50, 75, 25];
  res.json(loads);
});
app.get('/', function(req, res) {
  res.sendFile('index.html',{
    root: __dirname
  })
  
});
app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})
