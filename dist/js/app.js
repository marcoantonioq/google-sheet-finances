(function(e){function t(t){for(var r,a,u=t[0],i=t[1],s=t[2],l=0,d=[];l<u.length;l++)a=u[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);f&&f(t);while(d.length)d.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(r=!1)}r&&(c.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},o={app:0},c=[];function a(e){return u.p+"js/"+({about:"about"}[e]||e)+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=o[e]=[t,r]}));t.push(n[2]=r);var c,i=document.createElement("script");i.charset="utf-8",i.timeout=120,u.nc&&i.setAttribute("nonce",u.nc),i.src=a(e);var s=new Error;c=function(t){i.onerror=i.onload=null,clearTimeout(l);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),c=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+r+": "+c+")",s.name="ChunkLoadError",s.type=r,s.request=c,n[1](s)}o[e]=void 0}};var l=setTimeout((function(){c({type:"timeout",target:i})}),12e4);i.onerror=i.onload=c,document.head.appendChild(i)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var f=s;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1515:function(e,t,n){"use strict";n("b02c")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),o={id:"nav"},c=Object(r["e"])("Home"),a=Object(r["e"])(" | "),u=Object(r["e"])("Entrada"),i=Object(r["e"])(" | "),s=Object(r["e"])("Saída"),l=Object(r["e"])(" | "),f=Object(r["e"])("Transferir"),d=Object(r["e"])(" | "),b=Object(r["e"])("Cheque"),p=Object(r["e"])(" | "),m=Object(r["e"])("About");function j(e,t){var n=Object(r["s"])("router-link"),j=Object(r["s"])("router-view");return Object(r["o"])(),Object(r["d"])(r["a"],null,[Object(r["f"])("div",o,[Object(r["f"])(n,{to:"/"},{default:Object(r["x"])((function(){return[c]})),_:1}),a,Object(r["f"])(n,{to:"/entrada"},{default:Object(r["x"])((function(){return[u]})),_:1}),i,Object(r["f"])(n,{to:"/saida"},{default:Object(r["x"])((function(){return[s]})),_:1}),l,Object(r["f"])(n,{to:"/transferir"},{default:Object(r["x"])((function(){return[f]})),_:1}),d,Object(r["f"])(n,{to:"/cheque"},{default:Object(r["x"])((function(){return[b]})),_:1}),p,Object(r["f"])(n,{to:"/about"},{default:Object(r["x"])((function(){return[m]})),_:1})]),Object(r["f"])(j)],64)}n("1515");const O={};O.render=j;var v=O,h=(n("d3b7"),n("3ca3"),n("ddb0"),n("6c02")),g=Object(r["f"])("div",{class:"home"},"Pagina home",-1),y=Object(r["f"])("br",null,null,-1),w=Object(r["e"])(),k=Object(r["f"])("br",null,null,-1);function S(e,t,n,o,c,a){return Object(r["o"])(),Object(r["d"])(r["a"],null,[g,Object(r["f"])("div",null,[Object(r["f"])("p",null,[Object(r["e"])(" Store: "+Object(r["u"])(a.count)+" ",1),y,Object(r["f"])("a",{onClick:t[1]||(t[1]=function(){return a.decrement&&a.decrement.apply(a,arguments)})},"Decrementar"),w,k,Object(r["f"])("a",{onClick:t[2]||(t[2]=function(){return a.increment&&a.increment.apply(a,arguments)})},"Incremnetar")])])],64)}var x={name:"Home",components:{},computed:{count:{set:function(e){this.$store.commit("setCount",e)},get:function(){return this.$store.state.Count.count}}},methods:{increment:function(){this.count++},decrement:function(){this.count--}}};x.render=S;var P=x,C=Object(r["f"])("div",{class:"home"},"Pagina entrada",-1),_=Object(r["f"])("br",null,null,-1),V=Object(r["e"])("\n      "),T=Object(r["e"])(),R=Object(r["f"])("br",null,null,-1);function q(e,t,n,o,c,a){return Object(r["o"])(),Object(r["d"])(r["a"],null,[C,Object(r["f"])("div",null,[Object(r["e"])(" Loading: "+Object(r["u"])(c.loading)+" ",1),Object(r["f"])("pre",null,[Object(r["e"])("        "+Object(r["u"])(a.values)+" ",1),_,V]),Object(r["f"])("a",{onClick:t[1]||(t[1]=function(){return a.push&&a.push.apply(a,arguments)})},"Add"),T,R,Object(r["f"])("a",{onClick:t[2]||(t[2]=function(){return a.remove&&a.remove.apply(a,arguments)})},"Remove")])],64)}var D=n("1da1"),E=(n("96cf"),{name:"Entrada",data:function(){return{loading:!1}},components:{},computed:{values:{set:function(e){this.$store.dispatch("insertValueSpreadsheet",e)},get:function(){return this.$store.state.DB.values}}},methods:{push:function(){var e=this;return Object(D["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n={created:new Date,name:"Nome"},e.values=n;case 2:case"end":return t.stop()}}),t)})))()},remove:function(){var e=this;return Object(D["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$store.commit("delValue",{key:0});case 1:case"end":return t.stop()}}),t)})))()}}});E.render=q;var $=E,A={class:"home"};function M(e,t,n,o,c,a){return Object(r["o"])(),Object(r["d"])("div",A,"Pagina saída")}var H={name:"Saída",components:{}};H.render=M;var L=H,B={class:"home"};function J(e,t,n,o,c,a){return Object(r["o"])(),Object(r["d"])("div",B,"Pagina transferir")}var G={name:"Transferir",components:{}};G.render=J;var I=G,N={class:"home"};function z(e,t,n,o,c,a){return Object(r["o"])(),Object(r["d"])("div",N,"Pagina cheque")}var F={name:"Saída",components:{}};F.render=z;var K=F,Q=[{path:"/",name:"Home",component:P},{path:"/entrada",name:"Entrada",component:$},{path:"/saida",name:"Saída",component:L},{path:"/transferir",name:"Transferir",component:I},{path:"/cheque",name:"Cheque",component:K},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}}],U=Object(h["a"])({history:Object(h["b"])("/"),routes:Q}),W=U,X=(n("a434"),n("5502")),Y={state:{values:[{created:new Date,name:""}]},actions:{insertValueSpreadsheet:function(e,t){var n=e.commit;return console.log("Recebido em Vuex",n,t),new Promise((function(){setTimeout((function(){t.date=Date.now(),n("addValue",t)}),1e3)}))},getValueSpreeadSheet:function(e){var t=e.commit;console.log("GetValues",t)},delValueSpreedSheet:function(e){var t=e.key;console.log("Remover key:",t)}},mutations:{addValue:function(e,t){e.values.push(t)},delValue:function(e,t){var n=t.key;console.log("remover",e,n),e.values.splice(n,1)}}},Z={state:{count:0},mutations:{setCount:function(e,t){e.count=t}}},ee=Object(X["a"])({modules:{DB:Y,Count:Z}}),te=ee;Object(r["c"])(v).use(te).use(W).mount("#app")},b02c:function(e,t,n){}});
//# sourceMappingURL=app.js.map