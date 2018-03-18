var express = require("express");
var router = express.Router();
var Message = require('../models/message');

router.get('/', function(req, res) {
  Message.find()
    .exec(function(err, messages) {
      if (err) {
        return res.status(500).json({
          title: "an error occoured",
          error: err
        });
      }
      res.status(200).json({
        message: "Success",
        obj: messages
      });
    });
});

router.post('/', function(req, res) {
  var message = new Message({
    content: req.body.content
  });
  message.save(function(err, result) {
    if (err) {
      return res.status(500).json({
        title: "an error occoured",
        error: err
      });
    }
    res.status(201).json({
      message: "Saved message to db",
      obj: result
    });
  });
});

router.patch('/:id', function(req, res) {
  Message.findById(req.params.id, function(err, message) {
    if (err) {
      return res.status(500).json({
        title: "an error occoured",
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: "No Messages Found!!",
        error: {message: 'Message not found when searching for ID'}
      });
    }
    message.content = req.body.content;
    message.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: "an error occoured",
          error: err
        });
      }
      res.status(200).json({
        message: "UPDATED message in db",
        obj: result
      });
    });
  });
});

router.delete('/:id', function(req, res){
  Message.findById(req.params.id, function(err, message){
    if (err) {
      return res.status(500).json({
        title: "an error occoured",
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: "No Messages Found!!",
        error: {message: 'Message not found when searching for ID'}
      });
    }
    message.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: "an error occoured",
          error: err
        });
      }
      res.status(200).json({
        message: "DELETED message in db",
        obj: result
      });
    });
  });
});
module.exports = router;
