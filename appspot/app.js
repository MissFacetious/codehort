'use strict';

// [START gae_node_request_example]
const express = require('express');
var path = require('path');
const app = express();

app.use(express.static('public'));

var firebaseFunctions = require('firebase-functions');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/code', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/tool/challenges.html'));
});

app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/tool/help.html'));
});

app.get('/tool/demo', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/tool/codehort.html'));
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
