---
layout: post
title:  "Vue全局引入scss文件"
subtitle: "使用全局变量和mixin"
keywords: Vue
categories: [work, js]
tags: js
titleimg: 
---

## 1.安装sass-resources-loader

`npm install -D sass-resources-loader`

## 2.修改build/util.js配置

在util.js中`exports.cssLoaders`方法return前边加入如下代码：

(其中scss文件路径需要根据自己项目情况修改为要添加的路径)
```javascript
  // 引入全局scss>>>
  function resolveResouce(name) {
    return path.resolve(__dirname, '../src/assets/sass/' + name);
  }

  function generateSassResourceLoader() {
    var loaders = [
      cssLoader,
      // 'postcss-loader',
      'sass-loader', {
        loader: 'sass-resources-loader',
        options: {
          // it need a absolute path
          resources: [resolveResouce('global.scss')]
        }
      }
    ];
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }
  // <<<
```

将return中的sass和scss改为如下代码：

```javascript
return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateSassResourceLoader(),
    scss: generateSassResourceLoader(),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
```

## 3. 重启服务

重启之后，在每个组件中就都可以使用全局的变量和mixin了