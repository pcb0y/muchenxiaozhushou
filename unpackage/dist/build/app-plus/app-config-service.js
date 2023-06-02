
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/list/list","components/components","components/webview/webview","pages/queryauth/queryauth","pages/chat/chat","pages/chatai/chatai","pages/chatai/test/test","pages/querypack/querypack","pages/test/test"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"慕宸小助手","navigationBarBackgroundColor":"#015FF9","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#333","selectedColor":"#015FF9","list":[{"text":"查图纸","iconPath":"static/icon/cad0.png","selectedIconPath":"static/icon/cad1.png","pagePath":"pages/index/index"},{"text":"防伪查询","iconPath":"static/icon/fangwei0.png","selectedIconPath":"static/icon/fangwei1.png","pagePath":"pages/queryauth/queryauth"},{"text":"扫描收货","iconPath":"static/icon/scan0.png","selectedIconPath":"static/icon/scan1.png","pagePath":"pages/querypack/querypack"},{"text":"AI聊天","iconPath":"static/icon/bot0.png","selectedIconPath":"static/icon/bot1.png","pagePath":"pages/chatai/chatai"}]},"darkmode":false,"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"慕宸慕勒小助手","compilerVersion":"3.7.11","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"查图纸","navigationBarTextStyle":"white"}},{"path":"/pages/list/list","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/components/components","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/components/webview/webview","meta":{},"window":{"navigationBarTitleText":"查图纸","enablePullDownRefresh":false}},{"path":"/pages/queryauth/queryauth","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"防伪验证","enablePullDownRefresh":false}},{"path":"/pages/chat/chat","meta":{},"window":{"navigationBarTitleText":"AI聊天","enablePullDownRefresh":false}},{"path":"/pages/chatai/chatai","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"AI聊天","enablePullDownRefresh":false}},{"path":"/pages/chatai/test/test","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/querypack/querypack","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"扫描收货","enablePullDownRefresh":false}},{"path":"/pages/test/test","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
