const express = require('express');
const router = express.Router();
const axios = require('axios');

var date = new Date();
var season = date.getFullYear();

// @route   GET api/teams
// @desc    Returns all NBA teams
// @access  Public
router.get('/', (req, res) => {
  axios.get('http://data.nba.net/prod/v2/' + season + '/teams.json', {
  })
    .then((response)=>{

      var teams = response.data.league.standard;
      var nbaTeams = [];

      for (i = 0; i < teams.length; i++) {
        if (teams[i].isNBAFranchise == true) {
            teams[i].logoSvg = "https://stats.nba.com/media/img/teams/logos/" + teams[i].tricode + "_logo.svg";
            teams[i].logoPng = req.protocol + '://' + req.headers.host + '/logos/' + teams[i].tricode + '_logo.png';
            nbaTeams.push(teams[i]);
        }
      }

      res.json(nbaTeams);
    })
    .catch((err)=> {
      console.log(err);
      res.statusCode = 500;
    })
});

module.exports = router;
