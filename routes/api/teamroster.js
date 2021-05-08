const express = require('express');
const router = express.Router();
const axios = require('axios');

function GetPositionsFromCode(code)
{
  var positionCodes = code.split('-');
  var positions = [];

  for (var i = 0; i < positionCodes.length; i++) {
    switch(positionCodes[i]) {
      case 'G':
        positions.push("Guard");
        break;
      case 'F':
        positions.push("Forward");
        break;
      case 'C':
        positions.push("Center");
        break;
      default:
    }
  }

  return positions.join(', ');
}

function OrganizeData(roster)
{
  var organizedRoster = [];

  for (var i = 0; i < roster.length; i++) {
    var entry = roster[i];

    var player = {
      name: entry.firstName == null || entry.lastName == null ? "NOT FOUND" : entry.firstName + " " + entry.lastName,
      number: entry.jersey == null ? "NOT FOUND" : entry.jersey,
      position: entry.pos == null ? "NOT FOUND" : GetPositionsFromCode(entry.pos),
      height: entry.heightFeet == null || entry.heightInches == null ? "NOT FOUND" : entry.heightFeet + "' " + entry.heightInches,
      weight: entry.weightPounds == null ? "NOT FOUND" : entry.weightPounds + " lbs",
      school: entry.collegeName == null ? "NOT FOUND" : entry.collegeName,
      id: entry.personId == null ? "NOT FOUND" : entry.personId,
      image: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + entry.personId + ".png"
    }

    organizedRoster.push(player);
  }

  return organizedRoster;
}

// @route   GET api/teamroster
// @desc    Returns a team's roster
// @access  Public
router.get('/', (req, res) => {
  axios.get('http://data.nba.net/10s/prod/v1/today.json', {}).then((response) => {
    var season = response.data.teamSitesOnly.rosterYear;

    axios.get('http://data.nba.net/prod/v1/' + season + '/players.json', {
    })
      .then((response)=>{
        var players = response.data.league.standard;
        var roster = [];
  
        for (i = 0; i < players.length; i++) {
          if (players[i].teamId === req.query.teamID) {
            roster.push(players[i]);
          }
        }
  
        organizedRoster = OrganizeData(roster);
        res.json(organizedRoster);
      })
      .catch((err)=> {
        console.log(err);
        res.statusCode = 500;
      })
    })
});

module.exports = router;
