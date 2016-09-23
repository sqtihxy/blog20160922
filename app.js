var express = require('express'); //导入express模块
var path = require('path');//处理路径
var favicon = require('serve-favicon');//处理收藏夹图标的
var logger = require('morgan');//处理日志
var cookieParser = require('cookie-parser');//处理cookie req.cookie req.cookies
var bodyParser = require('body-parser');//解析请求体的

var routes = require('./routes/index');//根路由
var users = require('./routes/users');//用户路由

var app = express();//生成一个express实例 app

// view engine setup
app.set('views', path.join(__dirname, 'views'));//设置 views 文件夹为存放视图文件的目录, 即存放模板文件的地方,__dirname 为全局变量,存储当前正在执行的脚本所在的目录。
app.set('view engine', 'html');//设置视图模板引擎为 html。
app.engine('html',require('ejs').__express);//设置对html文件的渲染方式

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); //没有favicon,所有先注释掉
app.use(logger('dev'));// 加载日志中间件。
app.use(bodyParser.json());//加载解析json的中间件。
app.use(bodyParser.urlencoded({ extended: false }));//加载解析urlencoded请求体的中间件。
app.use(cookieParser()); //加载解析cookie的中间件。
app.use(express.static(path.join(__dirname, 'public')));//设置public文件夹为存放静态文件的目录。

app.use('/', routes);//根目录的路由
app.use('/users', users); // 用户路由

// catch 404 and forward to error handler 捕获404错误，并转发到错误处理器。
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers 错误处理器

// development error handler 开发环境下的错误处理
// will print stacktrace  将打印出堆栈信息
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler 生产环境下的错误处理
// no stacktraces leaked to user    不向用户暴露堆栈信息
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app; //导出app供 bin/www 使用
