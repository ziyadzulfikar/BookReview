var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user/view-books', {title:'User', admin:false});
});

module.exports = router;
