var express = require('express');// 导入express模块
var router = express.Router(); //生成一个路由实例

/* GET home page.  取得主页*/
router.get('/', function(req, res, next) { //当用户访问根目录也就是 / 的时候执行此回调
  Model('Article').find({}).populate('user').exec(function(err,articles){
    console.log(articles[0].user.avatar);
    res.render('index', { title: '欢迎光临我的博客',articles:articles });
  });
});

module.exports = router; //导出这个路由并在app.js中通过app.use('/', routes); 加载