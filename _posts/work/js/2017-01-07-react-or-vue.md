---
layout: post
title:  "[翻译]React和Vue：你应该使用哪一个"
subtitle: "原作者：Anthony Gore & Alexis Mangin"
keywords: React,Vue
categories: [work, js]
tags: translation
titleimg: "2017-01-07-react-or-vue.png"
---

翻译自：[medium.com](https://medium.com/js-dojo)

原作者：Anthony Gore & Alexis Mangin

[原文地址](https://medium.com/js-dojo/react-or-vue-which-javascript-ui-library-should-you-be-using-543a383608d)

在2016年，React巩固了它Javascript web框架的王者地位。这一年见证了它在web端和native mobile上的快速发展，轻松领先于主要对手Angular。

但2016年对于Vue来说也同样是令人印象深刻的一年。版本2的发布引起了Javascript社区很大的反响，从Github上增加的额外25000个star可见一斑。

不可否认，React和Vue非常相似，二者都是轻量级的基于组件的库，用于构建专注于视图层的用户界面。二者都即可用于简单项目，也可用于构建使用cutting edge tooling（这个名词不会翻）的复杂app。

因此，许多web开发者疑惑他们应该使用哪一个。是否其中一个明显优于另一个？二者有具体的利弊需要注意吗？或者二者基本上是一样的？

**两个框架，两种主张。**

在这篇文章中，我想通过一个深入的、公平的对比来回答这几个问题。唯一的麻烦是：我是一个无耻的Vue粉，有着很大的偏见，这一年我在我的项目中重度使用Vue，在Medium上大肆赞扬它，甚至发布了[Udemy课程](https://www.udemy.com/vuejs-2-essentials/?couponCode=VUEJS-MEDIUM)。

为了平衡我的偏见，我买通了我的朋友Alexis Mangin，他即是一位出色的Javascript开发者，也是React的拥簇者。他专注于React，经常在web和mobile项目中使用。

Alexis有一天问我：“你为什么这么喜欢用Vue，而不是React？” 考虑到我并不十分了解React，我无法给出一个确切的答案。因此我提出了一个方案，我们两个找个时间带着电脑坐下来，向对方介绍我们各自所选择的库能带来哪些好处。

![Anthony (left) and Alexis (right) comparing React and Vue at Bull and Bear Cafe in Chiang Mai, Thailand
](/public/img/2017/011501.jpg)


经过了大量讨论和相互学习，我们得出了以下六点最主要的发现：

**1. 如果你喜欢使用模板（或者希望有这个选项）来构建app，那就用Vue。**

把标记放在HTML文件中是Vue app的默认方式。和Angular相似，大括号被用于数据绑定表达式，而指令（directives）（特殊的HTML属性）被用于给模板增加功能。

下面是一个简单的Vue应用示例。该示例能打印一句话，还有一个可将这句话反转的按钮。

```html
// HTML
<div id="app">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">Reverse Message</button>
</div>
```

```js
// JS
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('');
    }
  }
});
```

相反，React应用避开了模板，需要开发者在Javascript中创建DOM，通常使用JSX辅助。下面是使用React构建的同样的应用：

```html
// HTML
<div id="app"></div>
```

```js
// JS (pre-transpilation)
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Hello React.js!'
    };
  }
  reverseMessage() {
    this.setState({ 
      message: this.state.message.split('').reverse().join('') 
    });
  }
  render() {
    return (
      <div>
        <p>{this.state.message}</p>
        <button onClick={() => this.reverseMessage()}>
          Reverse Message
        </button>
      </div>
    )
  }
}
ReactDOM.render(App, document.getElementById('app'));
```

对于从标准web开发范例中学习的新人来说，模板会更易于理解。但即便是一些有经验的开发者也会更倾向于使用模板，因为它能更好的将布局与功能分开，而且会可以像Pug一样给出使用预处理机制的选择。

但是使用模板又会增加学习语法的花费，而使用渲染函数（render function）只需要基本的HTML和Javascript知识。渲染函数还有易于debug和测试的好处。

**2. 如果你喜欢简单和只要起作用就行，那就用Vue。**

一个简单的Vue项目可以直接通过浏览器来运行，不需要进行转换（transpilation）。这让Vue可以像jQuery那样简单地放到项目中去。

虽然在技术上React也可以做到，但通常React代码更多的需要依靠JSX和ES6新特性，例如类和non-mutating array methods。

但Vue的简单更多的是因为它的设计。让我们比较一下这两个库如何处理应用数据的（如状态值“state”）。

state在React中是不可变的（immutable），因此不能直接改变它的值。应使用*setState*方法。

```js
this.setState({ 
    message: this.state.message.split('').reverse().join('') 
});
```

区分当前和之前的state使得React了解什么时候应该重新渲染DOM，以及该如何渲染，因此需要immutable state。

与之相反的是，数据在Vue中是可变的。相同的数据在Vue中可以更简单地修改。

```js
// Note that data properties are available as properties of 
// the Vue instance
this.message = this.message.split('').reverse().join('');
```

在你得出Vue的渲染系统一定比React的效率低这个结论之前，让我们探查一下state在Vue中是如何被管理的：当你向state中添加一个新对象时，Vue会遍历所有属性，并为它们设置getter和setter。Vue的反应系统现在可以跟踪state的变化并在其变化时自动重新渲染DOM。

感人的是，在Vue中修改state并不只是简洁，而且它的重渲染系统比React要更快、更有效率。

但是Vue的反应系统（reactivity system）也确实有需要注意的地方。例如，它不能检测到属性的增加或删除以及数组的改变。这些情况可以通过Vue API中与React类似的*set*方法来变通解决。

**3. 如果你需要使你的应用尽可能的小而快，那就用Vue。**

React和Vue都会创建一个虚拟的DOM并在app中的state改变时同步到真正的DOM。二者都有自己的方法来优化这个过程。

Vue的核心开发者们提供了一个基准测试，这个测试表明Vue的渲染系统要比React的更快。在这个测试中有10,000个项目被渲染了100次。测试比较结果如下：

![comparison](/public/img/2017/011502.png)

从实用的角度来看，这种衡量只适用于极端情况。多数app不需要做这种大规模程序化的操作，因此这个结果通常不作为二者比较的关键点。

页面所加载的文件大小和所有项目都息息相关，而Vue再一次占据了上风。压缩之后，当前版本的Vue只有25.6KB。

要用React得到一套相同的功能集，你需要React DOM（37.4KB）和React with Addons library（11.4KB），这已经有48.8KB了，几乎两倍于Vue的大小。平心而论，你使用React得到了一个更大的API，却没有得到更多功能。

**4. 如果准备构建一个大型app，那就用React**

使用Vue和React来构建一个简单app的这个比较（正如前面所提及的）可能在一开始让开发者更青睐于Vue。这是因为基于模板的app在一开始易于理解，也会更快的上手并运行。

但是最初的这些好处会引起后来的技术债务（technical debt），这会拖慢app的开发速度，使之变得更臃肿。模板也会容易造成难以察觉的运行时错误，很难测试，也很难再重组或分解。

相反地，Javascript编写的模板可以组织成低耦合的组件和更加易于复用和测试的DRY（Don't repeat yourself）代码。

Vue也有组件系统和渲染功能，但React的渲染系统更易配置，而且有浅渲染（shallow rendering）的特点，同React的测试工具一起使用，可以写出更易于测试和维护的代码。
 
 同时，React的不可变应用数据（immutable application data）也许没那么简洁，但在大型应用中，当透明性和易测试性变得至关重要的时候，这个特性就会成为闪光点。
 
 **5. 如果你希望这个库能同时适用于web和native apps，那就选React。**
 
React Native是使用Javascript来构建本地手机应用程序（native mobile applications）的库。它和React.js相似，只不过并不使用web组件，而改为使用本地组件。如果你已经学过了React.js，你会很容易上手React Native，反之亦然。
 
 ```js
 // JS
import React, { Component } from 'react'; 
import { AppRegistry, Text, View } from 'react-native';  
class HelloWorld extends Component {   
  render() {     
    return (       
      <View>         
        <Text>Hello, React Native!</Text>
      </View>
    );   
  }
}
AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
 ```
 
重要的是开发者不需要一套不同的知识和工具就可以同时在web和native mobile 上开发app。如果你打算同时在这两个平台上开发，那么Reaect会给你带来极大的便捷。

阿里的Weex是另一个跨平台UI项目。当前它以Vue为设计灵感，使用了很多与Vue相似的语法，并计划充分整合Vue。然而，这个整合的时间和细节尚未清楚。

由于Vue把HTML模板当作它设计的核心部分，而且当前并没有自定义渲染的特点，因此我们很难看到一个像React.js和React Native这样联系紧密的Vue.js的配对库产生。

**6. 如果你想要更大的社区生态，那就选React**

毫无疑问，React是当前最受欢迎的库，它在NPM上有~2.5M的每月下载量，而Vue只有~225K/M。

![二者下载量对比](/public/img/2017/011503.png)

受欢迎程度不仅仅是一个浅显的优势。它意味着会有更多文章、教程和Stack Overflow答案作为帮助。它意味着在项目中会有更多的工具和插件使用，让开发者不需要所有功能都自己编写。

这两个库都是开源的，但React源自Facebook并且受其赞助。来自众多开发者和公司的代码提交（committing ）能确保React持续的维护。

相反，Vue是由单个开发者——Evan You编写的，而且You是当前唯一一个Vue的全职维护者。Vue有一些公司的赞助，但不及Facebook或者Google那样的规模。

以Vue团队的信誉，它的小规模和独立性还有没有转化为劣势。Vue有一个规律的更新周期，更加令人侧目的是，Vue在Github上相较于3456个closed issues，它仅有54个open issues；而React相较于3447个closed issues，却有530个open issues。

**7. 如果你已经乐于使用其中任意一个，那也就没有必要再换了。**

总的来说，就我们的发现，Vue的优势如下：

- 对于模板和渲染函数拥有灵活的选择
- 简单的语法和项目配置
- 更快的渲染速度和更小的体积

React的优势：

- 大型项目有更好的发挥，易于学习和测试
- 能同时应用于Web和native apps
- 更好的社区生态和更多的支持和可用的工具

然而，React和Vue都是出色的UI libraries，相对于区别，它们有更多的相同之处。他们最大的特点如下：

- 使用虚拟DOM快速渲染
- 轻量级
- Reactive components
- 服务器端渲染
- 由router，bundler和state management轻松集成
- 良好的支持和社区

如果你觉得我们有任何疏忽，我们很乐意能在评论区看到建议。使用愉快！

### 关于作者

**Anthony Gore**

我是一位Javascript开发者和线上课程导师。我最近的课程是[Vue.js 2 Essentials: Build Your First Vue App](https://www.udemy.com/vuejs-2-essentials/?couponCode=VUEJS-MEDIUM),在Udemy上可以看到。

**Alexis Mangin**

Alexis用他出色的web开发知识帮助我写了这篇文章。你应该[关注他的Medium](https://medium.com/@alexmngn)，他会写一些很棒的React教程。

有兴趣参加关于Vue.js的讨论吗？你可以加入我们的Vue.js开发者的[Facebook小组](https://www.facebook.com/groups/215192935559397/)和[Newsletter](https://vuejs.curated.co/)

### 译者的话
- 敝人能力十分有限，很多地方不能还原作者的真实思想，此篇翻译不免贻笑大方，如有不足之处请见谅。
- 文章开头使用frameworks，之后都用libraries，分别翻译为框架和库。
- 此翻译作为本人学习React和Vue的学习记录，仅作参考，并不具有权威性。