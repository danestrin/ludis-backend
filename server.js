
// type : npm start
//  to run the server

const express = require('express');

const test = require('./routes/api/test');
const teamroster = require('./routes/api/teamroster');
const teams = require('./routes/api/teams');

const app = express();

app.get('/', (req, res) => res.send('Hello World'));

// Use Routes

app.use('/api/test', test);

app.use('/api/teamroster', function (req, res, next) {
    next()
}, teamroster);

app.use('/api/teams', function(req, res, next) {
    next()
}, teams);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));