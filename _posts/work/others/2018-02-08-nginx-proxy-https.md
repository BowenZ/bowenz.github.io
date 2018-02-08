---
layout: post
title:  "使用Nginx代理进行前端https开发"
keywords: Nginx
categories: [work, others]
tags: Nginx
titleimg: 
---

## 0. 前言

今天使用高德地图开发项目，需要定位用户当前地理位置，使用`Geolocation`功能时，console出现了如下警告：

```
[Deprecation] getCurrentPosition() and watchPosition() no longer work on insecure origins. 
To use this feature, you should consider switching your application to a secure origin, such as HTTPS. 
See https://goo.gl/rStTGz for more details.
```

Chrome为了提高安全性，要求`getCurrentPosition`和`watchPosition`必须工作在secure origin之上，也就是说，需要将我们的服务改成https。

## 1. 关于https

### 定义
超文本传输安全协议（英语：Hypertext Transfer Protocol Secure，缩写：HTTPS，常称为HTTP over TLS，HTTP over SSL或HTTP Secure）是一种通过计算机网络进行安全通信的传输协议。HTTPS经由HTTP进行通信，但利用SSL/TLS来加密数据包。HTTPS开发的主要目的，是提供对网站服务器的身份认证，保护交换数据的隐私与完整性。这个协议由网景公司（Netscape）在1994年首次提出，随后扩展到互联网上。

### 与HTTP的差异[编辑]

与HTTP的URL由“http://”起始且默认使用端口80不同，HTTPS的URL由“https://”起始且默认使用端口443。
HTTP是不安全的，且攻击者通过监听和中间人攻击等手段，可以获取网站帐户和敏感信息等。HTTPS被设计为可防止前述攻击，并在正确配置时被认为是安全的。

## 2. 解决问题

### 申请证书

要使用https，首先需要有CA数字证书。
> HTTPS的传输采用的是非对称加密，一组非对称加密密钥包含公钥和私钥，通过公钥加密的内容只有私钥能够解密。上面我们看到，整个传输过程，服务器端是没有透露私钥的。而 CA 数字认证涉及到私钥，整个过程比较复杂，我也没有很深入的了解，后续有详细了解之后再补充下。

> CA 认证分为三类：DV ( domain validation)，OV ( organization validation)，EV ( extended validation)，证书申请难度从前往后递增，貌似 EV 这种不仅仅是有钱就可以申请的。

首先可以通过[https://www.sslforfree.com/](https://www.sslforfree.com/)自己申请证书，不过会有三个月的有效时间。

> 对于一般的小型网站尤其是博客，可以使用自签名证书来构建安全网络，所谓自签名证书，就是自己扮演 CA 机构，自己给自己的服务器颁发证书。

如果用于本地测试，就直接自己生成证书就可以了。

自己生成证书的方法参考：[小胡子哥的个人博客](http://www.barretlee.com/blog/2015/10/05/how-to-build-a-https-server/)

### 使用nginx搭建https服务器

> 以下情况以windows系统为例。

从[nginx官网](http://nginx.org/en/download.html)下载安装好nginx后，打开`nginx.exe`，浏览器访问[localhost](https//localhost/)，如果有响应，则说明服务成功打开了。

将之前生成好的证书文件放在`conf/ssl/`下。

查看nginx目录，其中`conf`是服务器的配置文件，`logs`是日志文件存放处，打开`conf/nginx.conf`，将server替换为如下配置
```
server {
    listen       80;
    listen  443 ssl;
    server_name  localhost;

    #charset koi8-r;

    # ssl on;
    ssl_certificate ssl/server.crt;
    ssl_certificate_key ssl/server.key;

    #access_log  logs/host.access.log  main;

    location / {
        root   html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```

命令行进入nginx安装根目录，输入`nginx.exe -s reload`重启服务。

访问[https://localhost/](https://localhost/)，chrome下会出现安全警告，选择继续访问即可。

## 3. 代理本地http服务

当前项目开发时基于vue cli进行开发的，服务用的是vue cli自带的express服务器，可以通过修改webpack代码，添加https功能，但更简单的是直接使用nginx代理http请求。

在server中修改如下配置：
```
location / {
    # 反向代理我们通过proxy_pass字段来设置
    # 也就是当访问https://localhost/的时候经过Nginx反向代理到服务器上的http://192.168.1.152:8080
    proxy_pass http://192.168.1.152:8080;
}
```
再次访问https://localhost/，发现已经变成了代理服务器返回的内容了。


---
引用：
- https://zh.wikipedia.org/wiki/%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%AE%89%E5%85%A8%E5%8D%8F%E8%AE%AE
- http://www.barretlee.com/blog/2015/10/05/how-to-build-a-https-server/
- http://cnt1992.xyz/2016/03/18/simple-intro-to-nginx/