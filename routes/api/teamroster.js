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
    },
    headers: {
      host: 'stats.nba.com',
      "cache-control":"max-age=0",
      connection: 'keep-alive',
      "accept-encoding" : "Accepflate, sdch",
      'accept-language':'he-IL,he;q=0.8,en-US;q=0.6,en;q=0.4',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
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
