
// type : npm start
//  to run the server

const express = require('express');

const teamroster = require('./routes/api/teamroster');
const teams = require('./routes/api/teams');
const playoffscore = require('./routes/api/playoffscore');

const app = express();

app.get('/', (req, res) => res.send(''));

// static files
app.use(express.static('static'));

// Use Routes
app.use('/api/teamroster', function (req, res, next) {
    next()
}, teamroster);

app.use('/api/teams', function(req, res, next) {
    next()
}, teams);

app.use('/api/playoffscore', function(req, res, next) {
    next()
}, playoffscore);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));