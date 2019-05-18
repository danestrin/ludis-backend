const express = require('express');
const router = express.Router();
const rp = require('request-promise');

// @route   GET api/test
// @desc    Tests post route
// @access  Public
router.get('/', (req, res) => {
  rp.get('https://www.google.com/')
    .then((response)=>{
      console.log("api/test successful")
      res.json(response);
    })
    .catch((err)=> {
      console.log(err);
      res.statusCode = 500;
    })
});

module.exports = router;
