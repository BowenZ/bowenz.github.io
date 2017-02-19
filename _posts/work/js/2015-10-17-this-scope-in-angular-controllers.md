---
layout: post
title:  "AngularJS中的'this'和'$scope'"
subtitle: "理解AngularJS controller中'this'和'$scope'的区别和使用"
keywords: AngularJS
categories: [work, js]
tags: angular
titleimg: "2015-10-17-this-scope-in-angular-controllers.jpg"
---

#### 简单的说

**this**

- 当controller的构造函数被调用时，this就是controller
- 当定义在$scope object的函数被调用时，this在作用上等同于scope。

**$scope**

- 每一个controller都有一个相关联的$scope对象。
- 一个controller的构造函数负责在其相关联的$scope上设置函数/行为。
- 只有在当前$scope对象上定义的方法（以及父scope对象，如果原型继承有效时）可以从HTML/view访问。例如，从ng-click，filter上。


#### 详细的说

controller函数就是一个JS构造函数。当构造函数执行时（比如加载一个view），`this`被设置为controller对象。因此在“tabs”控制器构造函数中，当addPane函数被创建时

```javascript
this.addPane = function(pane) { ... }
```

它在controller对象中被创建，而不是在$scope中。视图层不能看到addPane函数，它们只能访问被创建在$scope中的函数。换句话说，在HTML中，这样写不起作用：`<a ng-click="addPane(newPane)">won't work</a>`。
