var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');

router.get('/', function(req, res) {
  Comment.find({}, null, {sort: '-updated_at'}, function( err, comments ) {
    res.json(comments);
  });
});

router.put('/:id', function(req, res) {
  Comment.findByIdAndUpdate(
    req.params.id,
    { $set: { content: req.body.content }},
    { new: true },
    function(err, comment) {
      console.log(comment.content);
      res.json(comment);
  });
});

router.post('/', function(req, res) {
  new Comment({
    author: req.body.author,
    content: req.body.content,
    updated_at: Date.now()
  }).save( function(err, comment) {
    res.json(comment);
  })
})

module.exports = router;
