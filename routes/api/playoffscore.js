const express = require('express');
const router = express.Router();
const axios = require('axios');

// @route   GET api/playoffscore
// @desc    Returns scores from a given day
// @access  Public
router.get('/', (req, res) => {
  axios.get('http://data.nba.net/prod/v2/' + req.query.gameDate + '/scoreboard.json', {
  })
    .then((response)=>{
      var data = response.data;
      var games = [];

      for (var i = 0; i < data.games.length; i++) {
        var game = {
          date: req.query.gameDate,
          gameId: data.games[i].gameId,
          round: data.games[i].playoffs.roundNum,
          gameNum: data.games[i].playoffs.gameNumInSeries,
          hTeam: {
            teamId: data.games[i].hTeam.teamId,
            triCode: data.games[i].hTeam.triCode,
            logo: "https://stats.nba.com/media/img/teams/logos/" + data.games[i].hTeam.triCode + "_logo.svg",
            score: data.games[i].hTeam.score,
            series: data.games[i].playoffs.hTeam.seriesWin
          },
          vTeam: {
            teamId: data.games[i].vTeam.teamId,
            triCode: data.games[i].vTeam.tricode,
            logo: "https://stats.nba.com/media/img/teams/logos/" + data.games[i].vTeam.triCode + "_logo.svg",
            score: data.games[i].vTeam.score,
            series: data.games[i].playoffs.vTeam.seriesWin
          }
        }

        games.push(game);
      }

      res.json(games);
    })
    .catch((err)=> {
      console.log(err);
      res.statusCode = 500;
    })
});

module.exports = router;
