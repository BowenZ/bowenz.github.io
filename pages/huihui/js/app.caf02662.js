(function(t){function e(e){for(var n,o,u=e[0],l=e[1],i=e[2],d=0,f=[];d<u.length;d++)o=u[d],r[o]&&f.push(r[o][0]),r[o]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);c&&c(e);while(f.length)f.shift()();return s.push.apply(s,i||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],n=!0,u=1;u<a.length;u++){var l=a[u];0!==r[l]&&(n=!1)}n&&(s.splice(e--,1),t=o(o.s=a[0]))}return t}var n={},r={app:0},s=[];function o(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=n,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(a,n,function(e){return t[e]}.bind(null,n));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=e,u=u.slice();for(var i=0;i<u.length;i++)e(u[i]);var c=l;s.push([1,"chunk-vendors"]),a()})({0:function(t,e){},1:function(t,e,a){t.exports=a("56d7")},2:function(t,e){},3:function(t,e){},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("097d");var n=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("input",{attrs:{type:"file",id:"file",placeholder:"请选择文件"}}),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.handleSubmit}},[t._v("确定")]),a("div",{staticClass:"table-wrapper"},[t.dataList?a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.dataList,height:"90vh"}},[a("el-table-column",{attrs:{prop:"id",label:"编号","min-width":"100px",fixed:""}}),a("el-table-column",{attrs:{prop:"name",label:"姓名","min-width":"100px",fixed:""}}),a("el-table-column",{attrs:{label:"日期"}},[a("el-table-column",{attrs:{label:"星期"}})],1),t._l(t.monthDate,function(e,n){return a("el-table-column",{key:n,attrs:{label:String(e.day),prop:"data"}},[a("el-table-column",{attrs:{label:e.weekCn.replace("星期",""),prop:"data"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tooltip",{attrs:{effect:"dark",placement:"top-start"}},[a("div",{attrs:{slot:"content"},domProps:{innerHTML:t._s(t.dateFilter(e.row.data[n].data))},slot:"content"}),"k"==e.row.data[n].status?a("el-tag",{attrs:{type:"danger"}},[t._v(t._s(e.row.data[n].statusCn))]):"q"==e.row.data[n].status?a("el-tag",{attrs:{type:"info"}},[t._v(t._s(e.row.data[n].statusCn))]):"c"==e.row.data[n].status?a("el-tag",{attrs:{type:"warning"}},[t._v(t._s(e.row.data[n].statusCn))]):"z"==e.row.data[n].status?a("el-tag",{attrs:{type:"warning"}},[t._v(t._s(e.row.data[n].statusCn))]):"cz"==e.row.data[n].status?a("el-tag",{attrs:{type:"warning"}},[t._v(t._s(e.row.data[n].statusCn))]):"n"==e.row.data[n].status?a("span",[t._v(t._s(e.row.data[n].statusCn))]):"j"==e.row.data[n].status?a("el-tag",[t._v(t._s(e.row.data[n].statusCn))]):a("span",[t._v("-")])],1)]}}])})],1)})],2):t._e()],1)],1)},s=[],o=a("2909"),u=(a("55dd"),a("456d"),a("ac6a"),a("aabe")),l=document.querySelector.bind(document);function i(t,e){e=parseInt(e,10);var a=new Date(t,e,0);return a.getDate()}function c(t,e){for(var a=i(t,e),n=new Date(t,e-1,1),r=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],s=[],o=1;o<=a;o++)n.setDate(o),s.push({week:n.getDay(),weekCn:r[n.getDay()],day:o});return s}var d={name:"landing-page",data:function(){return{monthDate:null,dataList:null}},methods:{dateFilter:function(t){return t&&t.join?t.map(function(t){return t["考勤时间"]}).join("<br>"):""},handleSubmit:function(){var t=this;if(l("#file").files[0]){var e=l("#file").files,a=new FileReader;a.onload=function(e){try{var a=e.target.result,n=u.read(a,{type:"binary"}),r=[]}catch(g){return void console.log("文件类型不正确")}var s="";for(var l in n.Sheets)n.Sheets.hasOwnProperty(l)&&(s=n.Sheets[l]["!ref"],console.log("fromTo",s),r=r.concat(u.utils.sheet_to_json(n.Sheets[l])));console.log(r),console.log("====time====",r[0]["考勤时间"]);var i=new Date(r[0]["考勤时间"]),d=c(i.getFullYear(),i.getMonth());t.monthDate=d;var f={};r.forEach(function(t){t.date=new Date(t["考勤时间"]),f[t["人员编号"]]||(f[t["人员编号"]]=[]),f[t["人员编号"]].push(t)});var p=[];Object.keys(f).forEach(function(t){var e=f[t],a={id:t,name:f[t][0]["姓名"]};a.data=d.map(function(t){var a,n=e.filter(function(e){return e.date.getDate()==t.day});if(n&&n.length)if(n.sort(function(t,e){return t.date-e.date}),0==t.week||6==t.week)a={status:"j",statusCn:"加班",data:Object(o["a"])(n)};else{var r=!1,s=!1,u=!1;n.length<2&&(u=!0),(n[0].date.getHours()>8||8==n[0].date.getHours()&&n[0].date.getMinutes()>30)&&(r=!0),n[n.length-1].date.getHours<18&&(s=!0),u?a={status:"q",statusCn:"缺卡",data:Object(o["a"])(n)}:r&&s?(console.log("====迟到+早退====",n),a={status:"cz",statusCn:"迟到+早退",data:Object(o["a"])(n)}):a=r?{status:"c",statusCn:"迟到",data:Object(o["a"])(n)}:s?{status:"z",statusCn:"早退",data:Object(o["a"])(n)}:{status:"n",statusCn:"正常",data:Object(o["a"])(n)}}else a=0==t.week||6==t.week?{status:"n",statusCn:""}:{status:"k",statusCn:"旷工"};return a.week=t.week,a}),p.push(a)}),console.log("====group====",f),console.log("====ret====",p),t.dataList=p},a.readAsBinaryString(e[0])}else this.$message({message:"要先选择xlsx文件",type:"warning"})}}},f=d,p=(a("5c0b"),a("2877")),g=Object(p["a"])(f,r,s,!1,null,null,null);g.options.__file="App.vue";var b=g.exports,v=a("454d"),w=a.n(v);a("a5d4");n["default"].use(w.a),n["default"].config.productionTip=!1,new n["default"]({render:function(t){return t(b)}}).$mount("#app")},"5c0b":function(t,e,a){"use strict";var n=a("5e27"),r=a.n(n);r.a},"5e27":function(t,e,a){}});
//# sourceMappingURL=app.caf02662.js.map