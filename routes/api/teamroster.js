// returns a team's roster (players and coaches)

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

function OrganizeData(response)
{
  var data = response.resultSets[0].rowSet;
  var roster = [];

  for (var i = 0; i < data.length; i++) {
    var entry = data[i];

    var player = {
      name: entry[3] == null ? "NOT FOUND" : entry[3],
      number: entry[4] == null ? "NOT FOUND" : entry[4],
      position: entry[5] == null ? "NOT FOUND" : GetPositionsFromCode(entry[5]),
      height: entry[6] == null ? "NOT FOUND" : entry[6],
      weight: entry[7] == null ? "NOT FOUND" : entry[7],
      age: entry[9] == null ? "NOT FOUND" : entry[9],
      school: entry[11] == null ? "NOT FOUND" : entry[11],
      id: entry[12] == null ? "NOT FOUND" : entry[12]
    }

    roster.push(player);
  }

  return roster;
}

// @route   GET api/teamroster
// @desc    Tests stats.nba.com endpoints
// @access  Public
router.get('/', (req, res) => {
  axios.get('https://stats.nba.com/stats/commonteamroster/', {
    params: {
      Season: req.parameters.season,
      TeamID: req.parameters.teamId
    }
  })
    .then((response)=>{
      console.log("api/teamroster successful")
      var roster = OrganizeData(response.data);
      res.json(roster);
    })
    .catch((err)=> {
      console.log(err);
      res.statusCode = 500;
    })
});

module.exports = router;
