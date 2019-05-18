// returns all the scores from a given date + playoff standings as off the given date

const express = require('express');
const router = express.Router();
const axios = require('axios');

// @route   GET api/teamroster
// @desc    Tests stats.nba.com endpoints
// @access  Public
router.get('/', (req, res) => {
  axios.get('https://stats.nba.com/stats/scoreboard', {
    params: {
      GameDate: req.parameters.gameDate,
      LeagueID: req.parameters.leagueId,
      DayOffset: req.parameters.dayOffset
    }
  })
    .then((response)=>{
      console.log("api/scoreboard successful")
      res.json(response.data);
    })
    .catch((err)=> {
      console.log(err);
      res.statusCode = 500;
    })
});

module.exports = router;
