var express = require('express');
var router = express.Router();
//返回一个路由的实例
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
