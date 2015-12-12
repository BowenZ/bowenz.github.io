---
layout: post
title:  "科学上网--使用VPS搭建shadowsocks服务器"
description: "Bowen的私房博客，记录一切"
keywords: Shadowsocks,翻墙
date:   2015-12-10 15:26:42
categories: software
tags: Shadowsocks 翻墙 软件
titleimg: "2015/121000.jpg"
---

#### 一、准备：
- VPS: CentOS 7 64-Bit
- PC: Win8 64bin
- Shadowsocks客户端 （作者clowwindy在15年8月被请去喝茶，无奈删除Github上的所有内容，如果找不到下载可到[这里](http://pan.baidu.com/s/1jG5u1P8)下载）

官方推荐：

> 建议选择 Ubuntu 14.04 LTS 作为服务器以便使用 [TCP Fast Open](https://github.com/shadowsocks/shadowsocks/wiki/TCP-Fast-Open)。除非有明确理由，不建议用对新手不友好的 CentOS。
为了更好的性能，VPS 尽量选择 XEN 或 KVM，不要使用 OpenVZ。推荐使用以下 VPS：
- [Digital Ocean](https://www.digitalocean.com/?refcode=b1cddd149721) 自带的内核无需自己编译模块即可使用 [hybla](https://github.com/shadowsocks/shadowsocks/wiki/Optimizing-Shadowsocks) 算法
- [Linode](https://www.linode.com/?r=e7932c8b03f9abc8aab71663b90b689a676402d1) 功能强大，机房较多

#### 二、配置--Nodejs

首先如果你的服务器访问量巨大的话，不建议使用nodejs搭建shadowsocks，原作者说过：

> The GC of node.js sucks.
Python version handles 5000 connections with 50MB RAM while node.js version handles 100 connections with 300MB RAM. Why should we continue to support node.js?

但是本人服务器只有自己用，负担很小，而且身为前端开发者，Nodejs用起来是最顺手的，部署起来也是最简单的，所以还是需要了解一下。

需要环境：Node.js、npm（nodejs安装成功后npm也就可以使用了）、pm2，环境配置请参考[上一篇文章](http://zbw.name/blog/2015/10/08/aliyun-nodejs/)

##### 1.安装Shadowsocks
`npm install -g shadowsocks`
Shadowsocks会被安装到/home/node/v4.1.2/lib/node_modules目录下

##### 2.服务器端配置
进入shadowsocks安装目录
`cd /home/node/v4.1.2/lib/node_modules/shadowsocks`
打开配置文件
`vi config.json`
按I键进入编辑模式，修改配置文件，以下供参考

{% highlight JSON %}
{
    "server":"0.0.0.0",
    "server_port":3999（监听端口，可自己定义，不要与其他端口冲突）,
    "local_address":"127.0.0.1",
    "local_port":1080,
    "password":"password"（密码自定义）,
    "timeout":600,
    "method":"aes-256-cfb"（加密方式，默认就好）
}
{% endhighlight %}

修改之后按‘esc’键，之后按‘:x’保存并退出

此时执行命令`ssserver`，就会出现下图所示结果，表示服务开启成功
![服务开启成功](http://bowen-blog.b0.upaiyun.com/img/2015/121001.png)

##### 3.客户端配置
在PC端打开下载好的Shadowsocks GUI，在右下角任务栏的小飞机图表单击鼠标右键，然后点击编辑服务器
![](http://bowen-blog.b0.upaiyun.com/img/2015/121002.png)

配置“服务器IP”为VPS的IP地址，其他信息为配置文件中的内容
![](http://bowen-blog.b0.upaiyun.com/img/2015/121003.png)

配置完成后右键小飞机图标，启动系统代理，之后访问[facebook](https://www.facebook.com)尝试一下，如果能打开就恭喜配置成功了。

##### 4.使用pm2管理VPS上的Shadowsocks服务
在VPS端输入命令 `npm install -g pm2`安装pm2，安装成功后输入`pm2 start list`，如果出现下图所示则表示安装成功
![](http://bowen-blog.b0.upaiyun.com/img/2015/121004.png)

然后输入`pm2 start ssserver`，出现下图所示则表示服务开启成功，再次访问facebook或google验证
![](http://bowen-blog.b0.upaiyun.com/img/2015/121005.png)

以后可通过`pm2 list`来查看开启的服务，`pm2 restart 服务名（如本例的试试ssserver）`来重启服务，`pm2 stop服务名`停止服务，`pm2 delete 服务名`删除服务，更多pm2使用方法可输入`pm2 --help`或查询[官网](http://pm2.keymetrics.io/)

##### 5.Shadowsocks使用简介
SS有两种代理模式，全局模式和PAC模式（默认PAC模式），全局模式会代理所有您访问的网站，包括国内的百度、淘宝等，PAC仅会代理PAC文件列表中的网站，所以一般建议采取默认的PAC模式。
PAC文件默认包含常用被墙网站的URL，包括google、faceboo、youtube等，如果访问其他某些国外网站出现打不开的情况，可以右键小飞机图标-->PAC-->编辑本地PAC文件来添加您想要代理的网站




#### 三、使用python搭建服务器
这个是原作者推荐的安装方式，本来想自己写一个的，但是发现网上有位朋友已经总结的非常好，我就不在班门弄斧了，请移步 http://shadowsocks.blogspot.com/