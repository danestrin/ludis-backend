const express = require('express');
const router = express.Router();
const axios = require('axios');

// @route   GET api/teams
// @desc    Returns all NBA teams
// @access  Public
router.get('/', (req, res) => {
  axios.get('http://data.nba.net/prod/v2/2018/teams.json', {
  })
    .then((response)=>{

      var teams = response.data.league.standard;
      var nbaTeams = [];

      for (i = 0; i < teams.length; i++) {
        if (teams[i].isNBAFranchise == true) {
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