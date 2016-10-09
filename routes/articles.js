var express = require('express');// 导入express模块
var router = express.Router(); //生成一个路由实例
var auth = require('../auth');
var path = require('path');
var multer = require('multer');
var storage = multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'../public/uploads/')
    },
    filename: function(req,file,cb){
        cb(null, Date.now()+path.extname(file.originalname))
    }
})
var upload = multer({ storage: storage });
/* 添加文章 */
router.get('/add',auth.mustLogin,function(req, res, next) {
    res.render('articles/add', { title: '添加文章' });
});

router.post('/add',auth.mustLogin,upload.single('img'),function(req, res, next) {
    var article = req.body;
    if(req.file){
        article.img = path.join('/uploads',req.file.filename);
    };
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