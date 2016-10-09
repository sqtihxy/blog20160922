var express = require('express');
var router = express.Router();

/* 用户注册. */
router.get('/reg', function(req, res, next) {
  res.render('user/reg',{'title':'用户注册'});
});

router.post('/reg', function(req, res, next) {
  var user = req.body;
    console.log(user);
  if(user.password != user.repassword){
      req.session.error='密码和确定密码不一致';
      return res.redirect('back'); //回退到上一个页面
  }
  delete user.repassword;
  user.password = blogUtil.md5(user.password);
    user.avatar = "https://secure.gravatar.com/avatar/"+blogUtil.md5(user.email)+"?s=48";
    new Model('User')(user).save(function(err,doc){
        if (err){
            req.flash('error','注册用户失败');
            return res.redirect('back');//回退到上一个页面
        }else{
            req.session.user = doc;
            
            req.flash('success','注册成功');
            req.flash('success','欢迎光临');
            res.redirect('/');
        }
    });
});
//用户登录
router.get('/login',function(req,res,next){
  res.send('user/login',{title:'用户登录'});
});

router.post('/login',function(req,res,next){
  res.redirect('/');
});

//用户退出
router.get('/logout',function(req,res,next){
     req.session.user = null;
  res.redirect('/');
});
module.exports = router;