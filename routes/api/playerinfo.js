// returns a player's info (their ID can be found from teamroster)

const express = require('express');
const router = express.Router();
const axios = require('axios');

// @route   GET api/teamroster
// @desc    Tests stats.nba.com endpoints
// @access  Public
router.get('/', (req, res) => {
  axios.get('https://stats.nba.com/stats/commonplayerinfo', {
    params: {
      PlayerID: req.parameters.playerId
    }
  })
    .then((response)=>{
      console.log("api/playerinfo successful")
      res.json(response.data);
    })
    .catch((err)=> {
      console.log(err);
      res.statusCode = 500;
    })
});

module.exports = router;
