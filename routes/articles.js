var express = require('express');// 导入express模块
var router = express.Router(); //生成一个路由实例
var auth = require('../auth');
/* 添加文章 */
router.get('/add',auth.mustLogin,function(req, res, next) {
    res.render('articles/add', { title: '添加文章' });
});

router.post('/add',auth.mustLogin,function(req, res, next) {
    var article = req.body;
    var user = req.session.user;
    article.user = user._id;
    new Model('Article')(article).save(function(err,doc){
        if(err){
            req.flash('error','文章发表失败');
            return res.redirect('back');//回退到上一个页面
        }else{
            req.flash('success','文章发表成功');
            res.redirect('/');
        }
    })
});
module.exports = router;