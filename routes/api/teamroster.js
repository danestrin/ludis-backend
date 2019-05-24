// returns a team's roster (players and coaches)

const express = require('express');
const router = express.Router();
const axios = require('axios');

function RetrievePlayerIds(data)
{
  var playerIds = [];

  for (i = 0; i < data.length; i++) {
    var id = data[i].personId;

    if (id != null) {
      playerIds.push(id);
    }
  }

  console.log(playerIds);
}
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
      height: entry.heightFeet == null || entry.heightInches == null ? "NOT FOUND" : entry.heightFeet + "-" + entry.heightInches,
      weight: entry.weightPounds == null ? "NOT FOUND" : entry.weightPounds,
      school: entry.collegeName == null ? "NOT FOUND" : entry.collegeName,
      id: entry.personId == null ? "NOT FOUND" : entry.personId
    }

    organizedRoster.push(player);
  }

  return organizedRoster;
}

// @route   GET api/teamroster
// @desc    Tests stats.nba.com endpoints
// @access  Public
router.get('/', (req, res) => {
  axios.get('http://data.nba.net/prod/v1/2018/players.json', {
  })
    .then((response)=>{

      var players = response.data.league.standard;
      var roster = [];

      for (i = 0; i < players.length; i++) {
        if (players[i].teamId == req.teamId) {
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
});

module.exports = router;
