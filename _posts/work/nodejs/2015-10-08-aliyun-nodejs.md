---
layout: post
title:  "阿里云配置Nodejs环境"
subtitle: "CentOS系统安装Nodejs、Express、pm2、MongoDB"
description: "Bowen的私房博客，记录一切"
keywords: 阿里云,nodejs,Express,MongoDB
categories: [work, nodejs]
tags: [server, nodejs, express]
titleimg: "2015-10-08-aliyun-nodejs.jpg"
---

#### 1.阿里云配置

CPU：1核，内存：512MB，系统：CentOS 7.0 64位，Linux系统送20G系统盘（Windows送40G），区域：杭州节点，价格：32/月

#### 2.服务器基本配置

1.在阿里云的管理控制台启动服务器

2.用putty登录服务器（用putty登录一段时间不操作就会自动断线，因为阿里服务器有连接时间限制，目的是为了降低服务器端的连接压力，如果需要一直连接可以在putty的Connection中，将“Seconds between keeplives(0 to turn off)”设置为30）

![](http://bowen-blog.b0.upaiyun.com/img/2015/100801.png)

3.更新软件--yum -y update  （-y命令可以在询问时默认yes）

#### 3.安装nodejs

1.进入/usr/src/目录`cd /usr/src`

2.从[nodejs官网](http://nodejs.org/)获取最新的nodejs

```
wget https://nodejs.org/dist/v4.1.2/node-v4.1.2.tar.gz
```

 也可从[这里](https://nodejs.org/en/download/)找到Source Code，查看最新版本后下载）

3.安装

```
tar zxvf node-v4.1.2.tar.gz
cd node-v4.1.2
./configure --prefix=/home/node/v4.1.2  //编译预处理
make  //编译源代码 
make install
```

4.添加nodejs到系统环境

```
echo "export PATH=$PATH:/home/node/v4.1.2/bin" >> ~/.bash_profile
```

5.输入node -v测试

![](http://bowen-blog.b0.upaiyun.com/img/2015/100802.png)

#### 4.安装Express

`npm install express -gd` （-d可以同时安装依赖的模块包）

此时输入express -V会出现  `express: command not found.`

原来是express4版本更新，之前版本命令行工具是集成在一起的，新版本单独分离到express-generator中了，所以需要

```
npm install -g express-generator
```

然后再输入`express -V`

![](http://bowen-blog.b0.upaiyun.com/img/2015/100803.png)

测试express：输入express test -e（选择ejs模板），cd test， npm install，安装完成后输入 npm start启动应用，然后就可以在浏览器中输入 ip地址:3000  访问

![](http://bowen-blog.b0.upaiyun.com/img/2015/100804.png)

#### 5.安装[pm2](http://pm2.keymetrics.io/) （在另外一篇中详细介绍pm2）

pm2 是一个带有负载均衡功能的Node应用的进程管理器，不了解的同学可以先去官网看看介绍，以后会单独写一篇关于pm2的文章.

```
npm install pm2 -g
```

完成之后输入`pm2 list`

![](http://bowen-blog.b0.upaiyun.com/img/2015/100805.png)

证明安装成功

然后输入` pm2 start ./bin/www`

![](http://bowen-blog.b0.upaiyun.com/img/2015/100806.png)

这样网站就能在后台运行了

启动程序：`pm2 start <app_name|id|all>`

可以指定应用名称 pm2 start app,js --name=test

列举进程：`pm2 list`

退出程序：`pm2 stop <app_name|id|all>`

重起应用：`pm2 restart`

#### 6.安装MongoDB

进入`/usr/local/`

下载安装包：`wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.0.6.tgz`

安装：`tar -zxvf mongodb-linux-x86_64-3.0.6.tgz`

将安装好后的目录重命名为mongodb：`mv mongodb-linux-x86_64-3.0.6 mongodb`

切换到mongodb/bin目录

启动数据库：`./mongod --dbpath=/usr/local/programs/mongodb/data/ --logpath=/usr/local/programs/mongodb/log/mongodb.log --port=27017 --fork`
(--fork可以让数据库进程在后台执行，不会影响当前命令行输入)

![](http://bowen-blog.b0.upaiyun.com/img/2015/100807.png)

查看端口占用情况：`netstat -tlunp`

关闭mongodb：`pkill mongod`

![](http://bowen-blog.b0.upaiyun.com/img/2015/100808.png)

使用Robomongo连接

![](http://bowen-blog.b0.upaiyun.com/img/2015/100809.png)

为了方便启动，将配置信息存储到文件中：

![](http://bowen-blog.b0.upaiyun.com/img/2015/100810.png)

解释说明：

port=10001【代表端口号，如果不指定则默认为 27017 】

dbpath=data/ 【数据库路径】

logpath=log/mongodb.log 【日志路径】

logappend=true 【日志文件自动累加，而不是覆盖】

auth=true 需要用户身份验证

![](http://bowen-blog.b0.upaiyun.com/img/2015/100811.png)

数据库启动成功

添加用户

![](http://bowen-blog.b0.upaiyun.com/img/2015/100812.png)

登录  ./bin/mongo 127.0.0.1/数据路名-u 用户名 -p

![](http://bowen-blog.b0.upaiyun.com/img/2015/100813.png)
