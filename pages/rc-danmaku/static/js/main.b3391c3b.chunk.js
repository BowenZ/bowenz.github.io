(this.webpackJsonpexample=this.webpackJsonpexample||[]).push([[0],{27:function(t,e,n){"use strict";n.r(e);var i,r=n(1),o=n(0),a=n.n(o),s=n(2),c=n.n(s),u=n(8),l=n(12),h=n(9),d=n(17),p=n(5),f=n(6);!function(t){t.PENDING="pending",t.RUNNING="running",t.PAUSED="paused",t.FINISHED="finished"}(i||(i={}));var m=function(){function t(e,n){var o=this;Object(p.a)(this,t),this.status=i.PENDING,this.element=void 0,this.speed=void 0,this.targetContainer=void 0,this.trackIndex=void 0,this.rowHeight=void 0,this.onTotalOut=void 0,this.isTotalOut=!1,this.rightDistance=0,this.totalOutTimer=0,this.speed=n.speed,this.targetContainer=n.targetContainer,this.trackIndex=n.trackIndex,this.rowHeight=n.rowHeight,this.onTotalOut=n.onTotalOut;var a=document.createElement("div");a.className="bullet-item",a.setAttribute("style","position: absolute;\n       line-height: 1.125;\n       user-select: none;\n       white-space: pre;\n       perspective: 500px;\n       will-change: transform;\n       pointer-events: none;"),a.style.opacity=String(n.opacity);var s="string"===typeof e?Object(r.jsx)("span",{className:"bullet-item-text",style:{textShadow:"#000 1px 0px 1px, #000 0px 1px 1px, #000 0px -1px 1px,#000 -1px 0px 1px",color:n.color||"#fff",fontSize:"25px"},children:e}):e;c.a.render(s,a),this.element=a,n.targetContainer.appendChild(this.element);var u=this.targetContainer.getBoundingClientRect().width;a.style.left="".concat(u,"px"),a.style.top="".concat(this.trackIndex*this.rowHeight,"px"),n.minGapWidth&&n.minGapWidth>0&&(a.style.paddingRight="".concat(n.minGapWidth,"px")),this.element.addEventListener("transitionend",(function(){o.destroy(),o.status=i.FINISHED,o.isTotalOut=!1,n.onDestroy(n.trackIndex)}))}return Object(f.a)(t,[{key:"startTotalOutTimer",value:function(){var t=this;if(!this.totalOutTimer){var e=this.targetContainer.getBoundingClientRect(),n=e.left,i=e.width,r=this.element.getBoundingClientRect().left,o=this.element.offsetWidth-(n+i-r);if(!(o<=0)){var a=o/this.speed;this.totalOutTimer=setTimeout((function(){t.isTotalOut=!0,t.totalOutTimer=0,t.onTotalOut&&t.onTotalOut(t.trackIndex)}),1e3*a)}}}},{key:"clearTotalOutTimer",value:function(){this.totalOutTimer&&(clearTimeout(this.totalOutTimer),this.totalOutTimer=0)}},{key:"run",value:function(){var t=this.targetContainer.getBoundingClientRect().width;this.element.style.transition="transform ".concat(((t+this.element.scrollWidth-this.rightDistance)/this.speed).toFixed(2),"s linear"),this.element.style.transform="translate3d(-".concat(t+this.element.scrollWidth,"px, 0, 0)"),this.status=i.RUNNING,this.startTotalOutTimer()}},{key:"pause",value:function(){var t=this.targetContainer.getBoundingClientRect(),e=t.left,n=t.width,r=this.element.getBoundingClientRect().left;this.rightDistance=n-(r-e),this.element.style.transform="translate3d(-".concat(this.rightDistance,"px, 0, 0)"),this.element.style.transition="transform 0s linear 0s",this.status=i.PAUSED,this.clearTotalOutTimer()}},{key:"destroy",value:function(){this.totalOutTimer&&clearTimeout(this.totalOutTimer),c.a.unmountComponentAtNode(this.element),this.element.remove()}},{key:"isRunning",get:function(){return this.status===i.RUNNING}},{key:"isFinished",get:function(){return this.status===i.FINISHED}}]),t}(),v=function(){function t(e){var n,i,r,o,a=this,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(Object(p.a)(this,t),this.container=null,this.width=0,this.height=0,this.rowHeight=40,this.trackCount=0,this.speed=100,this.opacity=1,this.minGapWidth=0,this.allPaused=!1,this.isDestroyed=!1,this.options={},this.trackList=[],this.queue=[],this.isRunningWhenPageHide=!0,this.visibilityChangeEventHandle=function(){"hidden"===document.visibilityState?(a.isRunningWhenPageHide=!a.allPaused,a.allPaused||a.pause()):a.isRunningWhenPageHide&&a.allPaused&&a.resume()},t.optionsParamsCheck(s),"string"===typeof e){if(this.container=document.querySelector(e),!this.container)throw new Error("container not found")}else this.container=e;this.options=s,this.rowHeight=null!==(n=s.rowHeight)&&void 0!==n?n:t.DEFAULT_ROW_HEIGHT,this.speed=null!==(i=s.speed)&&void 0!==i?i:t.DEFAULT_SPEED,this.opacity=null!==(r=s.opacity)&&void 0!==r?r:t.DEFAULT_OPACITY,this.minGapWidth=null!==(o=s.minGapWidth)&&void 0!==o?o:t.DEFAULT_GAP_WIDTH,this.container.classList.add(t.containerClassName),this.container.style.position="relative",this.container.style.overflow="hidden";var c=this.container.getBoundingClientRect(),u=c.width,l=c.height;this.width=u,this.height=l,this.trackCount=Math.floor(l/this.rowHeight),s.maxRow&&s.maxRow>0&&(this.trackCount=Math.min(s.maxRow,this.trackCount)),this.trackList=Array(this.trackCount).fill(null).map((function(){return[]})),document.addEventListener("visibilitychange",this.visibilityChangeEventHandle)}return Object(f.a)(t,[{key:"getTrackIndex",value:function(){if(!this.trackList.length)return 0;var t=0,e=this.trackList[0].length;return this.trackList.forEach((function(n,i){var r=n.filter((function(t){return!t.isTotalOut})).length;r<e&&(e=r,t=i)})),t}},{key:"emit",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(this.container&&!this.isDestroyed){var i,r,o,a,s=this.getTrackIndex(),c=new m(t,{color:n.color,speed:this.speed,opacity:this.opacity,targetContainer:this.container,trackIndex:s,rowHeight:this.rowHeight,minGapWidth:this.minGapWidth,onTotalOut:function(){e.popBulletToFreeTrack()},onDestroy:function(t){var n,i;e.trackList[t]=e.trackList[t].filter((function(t){return!t.isFinished})),null===(n=(i=e.options).onBulletOut)||void 0===n||n.call(i)}});if(this.trackList[s].push(c),!this.allPaused)c.run(),null===(i=(r=this.options).onBulletIn)||void 0===i||i.call(r);if(0===this.getRestAmount())null===(o=(a=this.options).onQueueRunOut)||void 0===o||o.call(a)}}},{key:"hasFreeTrack",value:function(){return this.trackList.some((function(t){return!t||!t.length||t[t.length-1].isTotalOut}))}},{key:"popBulletToFreeTrack",value:function(){if(this.queue.length>0&&this.hasFreeTrack()){var t=this.queue.shift();t&&(this.emit(t.node,t.options),this.popBulletToFreeTrack())}}},{key:"push",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.isDestroyed||(this.hasFreeTrack()?this.emit(t,e):this.queue.push({node:t,options:e}))}},{key:"pushAll",value:function(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.isDestroyed||((e=this.queue).push.apply(e,Object(d.a)(t.map((function(t){return{node:t,options:n}})))),this.popBulletToFreeTrack())}},{key:"pause",value:function(){this.allPaused||(this.allPaused=!0,this.trackList.forEach((function(t){return t.forEach((function(t){t.pause()}))})))}},{key:"resume",value:function(){this.allPaused&&!this.isDestroyed&&(this.allPaused=!1,this.trackList.forEach((function(t){return t.forEach((function(t){t.run()}))})))}},{key:"destroy",value:function(){this.container&&(this.trackList.forEach((function(t){return t.forEach((function(t){t.destroy()}))})),this.trackList=[],document.removeEventListener("visibilitychange",this.visibilityChangeEventHandle),this.container.classList.remove(t.containerClassName),this.container=null,this.isDestroyed=!0)}},{key:"getRestAmount",value:function(){return this.queue.length}},{key:"clearQueue",value:function(){this.queue=[]}}],[{key:"optionsParamsCheck",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};["rowHeight","speed","opacity","maxRow","minGapWidth"].forEach((function(n){if("number"===typeof e[n]&&!t.numberIsGreaterThanZero(e[n]))throw new Error("rc-danmaku: ".concat(n," \u5fc5\u987b\u5927\u4e8e\u7b49\u4e8e0"))}))}}]),t}();v.DEFAULT_ROW_HEIGHT=40,v.DEFAULT_SPEED=100,v.DEFAULT_OPACITY=1,v.DEFAULT_GAP_WIDTH=20,v.containerClassName="danmaku-container",v.numberIsGreaterThanZero=function(t){return void 0!==t&&t>=0};var g=v;function b(){var t=Object(u.a)(["\n  width: 100px;\n  height: 30px;\n  background: linear-gradient(90deg, pink, red);\n  border-radius: 20px;\n  color: #fff;\n  line-height: 30px;\n  text-align: center;\n"]);return b=function(){return t},t}function y(){var t=Object(u.a)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  height: calc(100vh - 45px);\n  input[type='text'] {\n    padding: 0.2em;\n    width: 150px;\n    max-width: 150px;\n  }\n  button {\n    outline: none;\n    appearance: none;\n    padding: 0.2em 1.45em;\n    margin: 0.1em;\n    border: 0.15em solid #cccccc;\n    color: #000000;\n    background-color: #cccccc;\n    &:hover {\n      border-color: #7a7a7a;\n    }\n    &:active {\n      background-color: #999999;\n    }\n  }\n  .danmaku-wrapper {\n    width: 90%;\n    height: 60vw;\n    max-height: 500px;\n    background-color: #000;\n  }\n"]);return y=function(){return t},t}var x=Array.from("\u901a\u8fc7\u5bf9\u5e73\u9762\u4e2d\u7ad6\u76f4\u548c\u6c34\u5e73\u65b9\u5411\u7684\u5206\u6790\u6211\u4eec\u5c06\u5bbd\u6cdb\u7684\u5f39\u5e55\u91cd\u53e0\u95ee\u9898\u6536\u655b\u4e3a\u8f68\u9053\u4e2d\u76f8\u90bb\u5f39\u5e55\u4e24\u4e24\u4e4b\u95f4\u7684\u8ffd\u53ca\u95ee\u9898\u6700\u7ec8\u83b7\u5f97\u4e86\u5c06\u5019\u9009\u5f39\u5e55\u6302\u8f7d\u5230\u5408\u9002\u8f68\u9053\u4e2d\u7684\u8c03\u5ea6\u7b56\u7565");function k(){var t=Math.floor(19*Math.random())+1;return Array(t).fill(null).map((function(){return x[function(t){return Math.floor(Math.random()*t)}(x.length)]})).join("")}var j=function(){var t=Object(o.useRef)(null),e=Object(o.useState)(!1),n=Object(l.a)(e,2),i=n[0],a=n[1],s=Object(o.useRef)(""),c=Object(o.useState)(!1),u=Object(l.a)(c,2),h=u[0],d=u[1];return Object(o.useEffect)((function(){var e=new g(".danmaku-wrapper",{rowHeight:60,speed:120,opacity:1,maxRow:3,minGapWidth:30,onBulletIn:function(){},onBulletOut:function(){},onQueueRunOut:function(){}});t.current=e}),[]),Object(o.useEffect)((function(){i&&(s.current=document.querySelector(".color-piker").value)}),[i]),Object(o.useEffect)((function(){t.current&&(h?t.current.pause():t.current.resume())}),[h]),Object(r.jsxs)(O,{className:"test-danmaku",children:[Object(r.jsx)("div",{className:"danmaku-wrapper"}),Object(r.jsxs)("div",{children:[Object(r.jsx)("span",{children:"\u900f\u660e\u5ea6"}),Object(r.jsx)("input",{type:"range",min:"0",max:"1",step:"0.1",onChange:function(e){if(t.current){var n=e.target.value;t.current.opacity=Number(n)}}})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("span",{children:"\u5f69\u8272\u5f39\u5e55\uff1a"}),Object(r.jsx)("input",{type:"checkbox",onChange:function(t){var e=t.target.checked;a(e)}}),"\xa0\xa0\xa0",Object(r.jsx)("input",{className:"color-piker",type:"color",defaultValue:"#ff0000",style:{visibility:i?"visible":"hidden"},onChange:function(t){var e=t.target.value;s.current=e}})]}),Object(r.jsx)("button",{type:"button",onClick:function(){t.current&&t.current.emit(k(),{color:i?s.current:void 0})},children:"\u7acb\u5373\u53d1\u9001\u968f\u673a\u6587\u672c\uff08\u81ea\u52a8\u5bfb\u627e\u7a7a\u95f2\u8f68\u9053\uff0c\u8fc7\u591a\u4f1a\u91cd\u53e0\uff09"}),Object(r.jsxs)("div",{children:[Object(r.jsx)("span",{children:"\u8f93\u5165\u6587\u672c\uff1a"}),Object(r.jsx)("input",{type:"text",className:"danmaku-text-input"}),Object(r.jsx)("button",{type:"button",onClick:function(){if(t.current){var e=document.querySelector(".danmaku-text-input");e.value&&e.value.trim()&&t.current.emit(e.value,{color:i?s.current:void 0}),e.value="",e.focus()}},children:"\u7acb\u5373\u53d1\u9001"})]}),Object(r.jsx)("button",{type:"button",onClick:function(){t.current&&t.current.emit(Object(r.jsx)(T,{children:"react node"}))},children:"\u7acb\u5373\u53d1\u9001react\u8282\u70b9"}),Object(r.jsx)("button",{type:"button",onClick:function(){t.current&&t.current.push(k(),{color:i?s.current:void 0})},children:"\u63a8\u9001\u968f\u673a\u6587\u5b57\u5230\u53d1\u9001\u961f\u5217\uff08\u8fc7\u591a\u4e0d\u4f1a\u91cd\u53e0\uff0c\u4f1a\u5ef6\u8fdf\u53d1\u9001\uff09"}),Object(r.jsx)("button",{type:"button",onClick:function(){t.current&&t.current.push(Object(r.jsx)(T,{children:"react node"}))},children:"\u63a8\u9001React\u8282\u70b9\u5230\u53d1\u9001\u961f\u5217\uff08\u8fc7\u591a\u4e0d\u4f1a\u91cd\u53e0\uff0c\u4f1a\u5ef6\u8fdf\u53d1\u9001\uff09"}),Object(r.jsx)("button",{type:"button",onClick:function(){t.current&&t.current.pushAll(Array(20).fill(null).map((function(){return k()})),{color:i?s.current:void 0})},children:"\u968f\u673a\u63a8\u900120\u6761\u6587\u5b57\u5f39\u5e55"}),Object(r.jsx)("button",{type:"button",onClick:function(){t.current&&t.current.pushAll(Array(20).fill(null).map((function(){return Object(r.jsx)(T,{children:"react node"})})))},children:"\u968f\u673a\u63a8\u900120\u6761React\u8282\u70b9"}),Object(r.jsx)("button",{type:"button",onClick:function(){t.current&&t.current.clearQueue()},children:"\u6e05\u7a7a\u6392\u961f\u4e2d\u7684\u5f39\u5e55\u961f\u5217\uff08\u5df2\u53d1\u9001\u7684\u4e0d\u4f1a\u88ab\u6e05\uff0c\u4e0d\u4f1a\u89e6\u53d1onQueueRunOut\u4e8b\u4ef6\uff09"}),Object(r.jsx)("div",{children:h?Object(r.jsx)("span",{style:{color:"red"},children:"\u6682\u505c\u4e2d"}):Object(r.jsx)("span",{style:{color:"green"},children:"\u8fd0\u884c\u4e2d"})}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"button",onClick:function(){d((function(t){return!t}))},children:h?"\u7ee7\u7eed":"\u6682\u505c"})}),Object(r.jsx)("button",{type:"button",onClick:function(){t.current&&(t.current.destroy(),alert("\u7ec4\u4ef6\u5df2\u7ecf\u88ab\u9500\u6bc1\uff0c\u4efb\u4f55\u64cd\u4f5c\u5c06\u4f1a\u65e0\u76f8\u5e94\uff0c\u91cd\u65b0\u5237\u65b0\u9875\u9762\u518d\u6d4b\u5427"))},children:"\u9500\u6bc1\uff08\u9500\u6bc1\u540e\u65e0\u6cd5\u518d\u53d1\u9001\u5f39\u5e55\uff09"})]})},O=h.a.div(y()),T=h.a.div(b());c.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(j,{})}),document.getElementById("root"))}},[[27,1,2]]]);
//# sourceMappingURL=main.b3391c3b.chunk.js.map