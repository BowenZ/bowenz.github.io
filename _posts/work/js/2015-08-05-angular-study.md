---
layout: post
title:  "AngularJS学习笔记"
keywords: AngularJS
categories: [work, js]
tags: angular
---

#### 1. $http POST请求改为form格式

```javascript
$http({
    method: 'POST',
    url: '',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    /*transformRequest: function(obj) {
        var str = [];
        for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
    }, 或者用普通的data格式，加上这段代码 */
    data: $.param({
        foo: x,
        bar: y
    })
}).success(function(data) {
console.log(data);
});
```

#### 2. ng-click 阻止事件冒泡 

```javascript
$scope.click = function($event){
  $event.stopPropagation();//在函数体内加上这句代码就好
}
```

#### 3. Angular中的JSONP

```javascript
myUrl = "http://localhost:8090/api/test?callback=JSON_CALLBACK";

$http.jsonp(myUrl).success(
　　function(data){
　　　　alert(data);
　　}
);
```

#### 4. 绑定select中的option

```HTML
<select ng-model="orderCtrl.newAddressInfo.province" ng-options="province.name for province in orderCtrl.regions.provinces track by province.id" ng-change="orderCtrl.changeProvince()">
     <option value="">--省--</option>
 </select>
```