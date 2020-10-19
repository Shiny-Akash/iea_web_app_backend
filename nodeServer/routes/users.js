var express = require('express');
const { User } = require('../_models/user');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json({error: 'cannot find user accounts'})
    }
    res.json({ users: data })
  })
});

module.exports = router;
