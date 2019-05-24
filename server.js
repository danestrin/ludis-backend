
// type : npm start
//  to run the server

const express = require('express');

const test = require('./routes/api/test');
const teamroster = require('./routes/api/teamroster');
const playerinfo = require('./routes/api/playerinfo');
const scoreboard = require('./routes/api/scoreboard');

const app = express();

app.get('/', (req, res) => res.send('Hello World'));

// Use Routes

app.use('/api/test', test);

// test call, returns Houston Rockets roster
app.use('/api/teamroster', function (req, res, next) {
    req.teamId = '1610612760'
    next();
}, teamroster);

// test call, returns Russell Wesbrook's player info
app.use('/api/playerinfo', function(req, res, next) {
    req.parameters = {
        playerId: '201566'
    }
    next();
}, playerinfo);

// test call, returns scores and playoff standings from 2019-05-10
app.use('/api/scoreboard', function(req, res, next) {
    req.parameters = {
        gameDate: '2019-05-16',
        leagueId: '00',
        dayOffset: '0'
    }
    next();
}, scoreboard)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
