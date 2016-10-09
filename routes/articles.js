var express = require('express');// 导入express模块
var router = express.Router(); //生成一个路由实例
var auth = require('../auth');
var path = require('path');
var multer = require('multer');
var markdown = require('markdown').markdown;
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
    res.render('articles/add', {article:{}});
});

router.post('/add',auth.mustLogin,upload.single('img'),function(req, res, next) {
    var article = req.body;
    var _id = req.body._id;
    if(req.file){
        article.img = path.join('/uploads',req.file.filename);
    };
    if(_id){//修改
            var update={
                title:article.title,content:article.content
            }
        if(article.img){
            update.img =  article.img;
        }
        Model('Article').findByIdAndUpdate(_id,{$set:update},function(err,doc){
            if(err){
                req.flash('error','更新文章失败');
                return res.redirect('back'); //回退到上一个页面
            }else{
                res.redirect('/articles/detail/'+_id);
            }
        })
    }else{
        var user = req.session.user;
        article.user = user._id;
        delete article._id;
        new Model('Article')(article).save(function(err,doc){
            if(err){
                req.flash('error','文章发表失败');
                return res.redirect('back');//回退到上一个页面
            }else{
                req.flash('success','文章发表成功');
                res.redirect('/');
            }
        })
    }

});
//文章详情页
router.get('/detail/:_id',function(req,res,next){
 var _id = req.params._id;
    Model('Article').findById(_id,function(err,article){
        if(err && !article){
            req.flash('error','文章不存在');
        }else{
            article.content = markdown.toHTML(article.content);
            res.render('articles/detail',{article:article});
        }
    })
});
//文章编辑
router.get('/edit/:_id',function(req,res,next){
    var _id = req.params._id;
    Model('Article').findById(_id,function(err,article){
        if(err && !article){
            req.flash('error','文章不存在');
        }else{
            article.content = markdown.toHTML(article.content);
            res.render('articles/add',{article:article});
        }
    })
});
//删除文章
router.get('/delete/:_id',function(req,res,next){
    var _id = req.params._id;
    Model('Article').findByIdAndRemove(_id,function(err,article){
        if(err && !article){
            req.flash('error','删除文章失败');
            return res.redirect('back');//回退到上一个页面
        }else{
            res.redirect('/');
        }
    })
});
module.exports = router;