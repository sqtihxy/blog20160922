#安装生成器
> npm install -g express-generator

#生成项目
> express -e blog20160923

#进入生成目录并安装依赖的模块
> cd blog20160923 && npm install

#设置环境变量并启动服务
> SET DEBUG=blog20160923:* & npm start

#安装bower
> npm install bower -g

#初始化bower
> bower init

#添加 .bowerrc文件
```
{
    "directory":"./public/lib"
}

# 安装bootstrap
> bower install bootstrap --save

```

#安装数据库
> npm install mongoose

#安装会话中间件

> npm install express-session connect-mongo --save

#显示提示
>npm install connect-flash --save

#安装markdown和图片上传multer
>npm install markdown multer --save