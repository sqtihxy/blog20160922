var express = require('express');// 导入express模块
var router = express.Router(); //生成一个路由实例

/* GET home page.  取得主页*/
router.get('/', function(req, res, next) { //当用户访问根目录也就是 / 的时候执行此回调
  res.render('index', { title: 'Express' });// 渲染views/index.ejs模版并显示到浏览器中
});

module.exports = router; //导出这个路由并在app.js中通过app.use('/', routes); 加载