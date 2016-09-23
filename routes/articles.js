var express = require('express');// 导入express模块
var router = express.Router(); //生成一个路由实例

/* 添加文章 */
router.get('/add', function(req, res, next) {
    res.render('articles/add', { title: '添加文章' });
});

router.post('/add', function(req, res, next) {
    res.redirect('/');
});
module.exports = router;