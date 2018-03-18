var express = require('express');
var router = express.Router();

var User = require("../models/user");
var bcrypt = require('bcryptjs');
//var User = require('../models/user');

router.post('/', function (req, res) {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email,
  });
  user.save(function(err, result){
    if (err) {
      return res.status(500).json({
        title: "an error occoured",
        error: err
      });
    }
    res.status(201).json({
      message: 'User Created',
      obj: result
    });
  });
});

module.exports = router;
