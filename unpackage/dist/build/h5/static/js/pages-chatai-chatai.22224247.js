(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chatai-chatai"],{1031:function(t,e,a){var i=a("388c");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("148064d1",i,!0,{sourceMap:!1,shadowMode:!1})},"2ffd":function(t,e,a){"use strict";var i=a("1031"),n=a.n(i);n.a},"388c":function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.T-Service[data-v-63e24a0b]{background-color:#f5f5f5;overflow:hidden}.T-Service .t-content[data-v-63e24a0b]{height:88%}.T-Service .t-content uni-scroll-view[data-v-63e24a0b]{height:%?1000?%;width:calc(100% - %?64?%);padding:%?32?%}.T-Service .t-content uni-scroll-view .t-system[data-v-63e24a0b]{color:#9aa0a8;background-color:#e8e8e8;max-width:90%;border-radius:%?40?%;padding:%?4?% %?24?%;margin:%?24?% auto;text-align:center}.T-Service .t-content uni-scroll-view .t-avatar[data-v-63e24a0b]{width:%?80?%;height:%?80?%;border-radius:50%}.T-Service .t-content uni-scroll-view .t-avatar uni-image[data-v-63e24a0b]{width:100%;height:100%}.T-Service .t-content uni-scroll-view .t-self .t-avatar[data-v-63e24a0b]{float:right}.T-Service .t-content uni-scroll-view .t-self .t-msg[data-v-63e24a0b]{float:right;background-color:#dbeff0;border-radius:%?20?% %?0?% %?20?% %?20?%;margin-right:%?12?%}.T-Service .t-content uni-scroll-view .clear[data-v-63e24a0b]{float:none!important;clear:both}.T-Service .t-content uni-scroll-view .t-msg[data-v-63e24a0b]{margin-top:%?24?%;padding:%?24?% %?32?%;max-width:75%}.T-Service .t-content uni-scroll-view .t-other .t-avatar[data-v-63e24a0b]{float:left}.T-Service .t-content uni-scroll-view .t-other .t-msg[data-v-63e24a0b]{background-color:#fff;float:left;background-color:#dbe3f0;margin-left:%?12?%;border-radius:%?0?% %?20?% %?20?% %?20?%}.T-Service .t-bottom[data-v-63e24a0b]{transition:.2s;height:%?100?%;background-color:#fff;border-top:1px solid #eee;display:flex;position:absolute;bottom:0;left:0;right:0;align-items:center;padding:%?20?% %?32?%;justify-content:space-between}.T-Service .t-bottom .t-input[data-v-63e24a0b]{flex:1;height:28px;padding:5px;border-radius:16px;border:1px solid #ddd;background-color:#f7f7f7;font-size:14px}.T-Service .t-bottom .t-picture[data-v-63e24a0b]{width:%?50?%;height:%?50?%}.T-Service .t-bottom .t-picture uni-image[data-v-63e24a0b]{width:100%;height:100%}.T-Service .t-bottom .t-send[data-v-63e24a0b]{background-color:#19be6b;color:#fff;padding:%?10?% %?20?%;border-radius:%?10?%;justify-self:flex-end}',""]),t.exports=e},"6e0d":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"T-Service"},[a("v-uni-text",{staticClass:"t-content",attrs:{selectable:!0}},[a("v-uni-scroll-view",{attrs:{"scroll-y":"true","scroll-into-view":t.scrollInto}},t._l(t.msg,(function(e,i){return 0!==e.id?a("v-uni-view",{class:["t-record",e.id!=t.userid?"t-other":"t-self"],attrs:{id:"s"+e.id}},[a("v-uni-image",{staticClass:"t-avatar",attrs:{src:e.avatar}}),a("v-uni-view",{staticClass:"t-msg"},[t._v(t._s(e.msg))]),a("v-uni-view",{staticClass:"clear"})],1):a("v-uni-view",{staticClass:"t-system",attrs:{id:"s"+e.id}},[t._v(t._s(e.msg))])})),1)],1),a("v-uni-view",{staticClass:"t-bottom"},[a("v-uni-view",{staticClass:"t-input"},[a("v-uni-input",{attrs:{type:"text",placeholder:"请输入消息内容"},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.sendMsg.apply(void 0,arguments)}},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1),a("v-uni-view",{staticClass:"t-picture"},[a("v-uni-image",{attrs:{src:"/static/icon/chatgpt.png",mode:""}})],1),a("v-uni-view",{staticClass:"t-send",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.sendMsg.apply(void 0,arguments)}}},[t._v("发送")])],1)],1)},n=[]},7735:function(t,e,a){"use strict";a.r(e);var i=a("6e0d"),n=a("99e7");for(var r in n)["default"].indexOf(r)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(r);a("2ffd");var s=a("f0c5"),o=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"63e24a0b",null,!1,i["a"],void 0);e["default"]=o.exports},"99e7":function(t,e,a){"use strict";a.r(e);var i=a("ed2e"),n=a.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(r);e["default"]=n.a},ed2e:function(t,e,a){"use strict";a("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("14d9");var i={name:"service",data:function(){return{scrollInto:"",value:"",userid:1,id:0,answer:"",avatar:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3.zhimg.com%2F50%2Fv2-eb34e233cdd85a2e1a400ec7ef31272e_hd.jpg&refer=http%3A%2F%2Fpic3.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619766863&t=b0fa5a217f6cac4ef199b2fd32707590",msg:[{id:"",avatar:"",msg:""}]}},updated:function(){this.setScroll()},methods:{sendMsg:function(){this.userid;var t=this.value;this.avatar;if(!t)return uni.showToast({title:"请输入您要咨询的内容!",icon:"none"});var e={msg:this.value,id:1,avatar:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3.zhimg.com%2F50%2Fv2-eb34e233cdd85a2e1a400ec7ef31272e_hd.jpg&refer=http%3A%2F%2Fpic3.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619766863&t=b0fa5a217f6cac4ef199b2fd32707590"};this.msg.push(e),uni.showLoading({title:"加载中"}),this.getMsg()},getMsg:function(){var t=this;this.value&&uni.request({url:"https://chat.mochenhome.com/openai/".concat(this.value),method:"GET",success:function(e){console.log(e),t.answer=e.data.answer;t.value;var a={id:e.data.id,avatar:"/static/icon/chatgpt.png",msg:t.answer};console.log(a);var i=t.msg,n=t;t.value="",i.push(a),t.id=e.data.id,t.$nextTick((function(){n.setScroll(e.data.id)})),uni.hideLoading()}})},setScroll:function(){this.scrollInto="s"+this.msg[this.msg.length-1].id,console.log(this.scrollInto),uni.pageScrollTo(this.scrollInto)}},components:{}};e.default=i}}]);