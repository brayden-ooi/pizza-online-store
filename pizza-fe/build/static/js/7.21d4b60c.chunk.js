(this["webpackJsonppizza-fe"]=this["webpackJsonppizza-fe"]||[]).push([[7],{118:function(e,t,a){"use strict";a.d(t,"c",(function(){return l})),a.d(t,"b",(function(){return i})),a.d(t,"a",(function(){return c}));var n=a(21),r=a(5),l=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null==t?null:"object"==typeof t?Object.keys(t).reduce((function(a,l){return Object(r.a)({},a,Object(n.a)({},l,e(t[l])))}),{}):"boolean"==typeof t?!t:void 0},i=function(e,t,a){return Object(r.a)({},e,Object(n.a)({},t,a))},c=function(e){return function(t){return{name:e,value:t}}}},134:function(e,t,a){},135:function(e,t,a){},136:function(e,t,a){},153:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(5),i=a(11),c=a(121),u=a(122),m=a(133),d=function(e){var t=e.listName,a=e.children;return r.a.createElement(c.a,{row:!0},r.a.createElement(u.a,{sm:3},t),r.a.createElement(m.a,{sm:9},a))},s=a(42),o=a(118),p=a(21),f=(a(43),function(e,t,a){return{size:!!e&&{small:!1,large:!1},addOns:!!t&&t.reduce((function(e,t){var a=t.food_name;return Object(l.a)({},e,Object(p.a)({},a,!1))}),{}),style:!!a&&a.reduce((function(e,t){return Object(l.a)({},e,Object(p.a)({},t,!1))}),{})}}),O=a(148),g=a(123),y=a(159),E=function(e){var t=e.item,a=e.mapKey,c=Object(n.useContext)(s.a),u=c.menuState,m=c.menuDispatch,p=c.menuOrder,E=c.menuSettings,b=u.menu,_=u.modal,h=u.order,j=E[p[a]].triggerModal,z=j.size,v=j.addOns,S=j.styles,k=f(z,b[p.indexOf(v)],S);Object(n.useEffect)((function(){var e=Object.keys(_.size).filter((function(e){return _.size[e]})),a=Object(i.a)(e,1)[0];a&&h.item&&m({type:"ORDER_SET_ITEM_PRICE",payload:parseFloat("small"===a?t.small_price:t.large_price)})}),[_.size,h.item]),Object(n.useEffect)((function(){m({type:"ORDER_SET_ADDONS_PRICE",payload:h.addOns.reduce((function(e,t){return e+parseFloat(b[p.indexOf(v)][t].small_price||0)}),0)})}),[h.addOns]),Object(n.useEffect)((function(){var e={cheese:"CZ",special:"SP",1:"1T",2:"2T",3:"3T"},a=h.addOns.length||Object.keys(_.style).filter((function(e){return _.style[e]}))[0],n=b[p.indexOf("Pizza")].filter((function(n){return n.pizza_type===t.pizza_type&&n.pizza_styles===e[a]}))[0];m({type:"ORDER_SET_PIZZA",payload:n?Object(l.a)({},n,{img_url:t.img_url}):h.item})}),[h.addOns,_.style]);var D=function(e){return m({type:"UPDATE_ORDER",payload:Object(o.a)(e.target.name)(Object(o.b)(k.size,e.target.id,!0))})},x=function(e){var t=e.target.getAttribute("data-addons");!e.target.checked||h.addOns.length<("SubsAddition"!==t?3:4)?(m({type:"UPDATE_ORDER",payload:Object(o.a)(e.target.name)(Object(o.b)(_.addOns,e.target.id,e.target.checked))}),m({type:"ORDER_SET_ADDONS",payload:{modal:"Topping"===t?Object(o.b)(_.style,"toppings",!0):_.style,checked:e.target.checked,addOn:e.target.getAttribute("data-key")}})):(e.preventDefault(),e.target.checked=!1,alert("Please only choose 1 to 3 items!"))},T=function(e){return m({type:"PIZZA_SET_STYLE",payload:{style:Object(o.b)(k.style,e.target.id,!0),addOnsDisabled:"toppings"!==e.target.id,addOns:"toppings"===e.target.id?_.addOns:k.addOns,order:"toppings"===e.target.id?h.addOns:[]}})};return r.a.createElement(O.a,null,r.a.createElement(g.a,null,S&&r.a.createElement(d,{listName:"Types"},S.map((function(e){return r.a.createElement(y.a,{type:"radio",id:e,name:"style",key:e,label:e,onChange:T,checked:_.style[e]})}))),z&&r.a.createElement(d,{listName:"Size"},r.a.createElement(y.a,{type:"radio",selected:_.size.small,name:"size",id:"small",label:"Small",disabled:!t.small_price,onChange:D}),r.a.createElement(y.a,{type:"radio",selected:_.size.large,name:"size",id:"large",label:"Large",onChange:D})),b[p.indexOf(v)]&&r.a.createElement(d,{listName:"Add ons"},b[p.indexOf(v)].map((function(e){var t=e.id,a=e.food_name;return r.a.createElement(y.a,{type:"checkbox",id:a,key:a,label:a,name:"addOns","data-addons":v,"data-key":t-1,disabled:_.addOnsDisabled,checked:_.addOns[a],onChange:x})})))))},b=a(27),_=a(157),h=a(149),j=a(150),z=a(57),v=(a(134),function(){var e=Object(n.useContext)(b.a).addItem,t=Object(n.useContext)(s.a),a=t.menuState,l=t.menuDispatch,i=t.menuOrder,c=t.menuSettings,u=a.menu,m=a.order,d=a.modal,o=d.isToggled,p=m.item,f=m.mapKey,O=m.totalPrice,g=function(){return l({type:"TOGGLE_MODAL"})};if(p){var y=p.food_name;return r.a.createElement(_.a,{isOpen:o,toggle:g,className:"menu-modal"},r.a.createElement(h.a,{toggle:g},y),r.a.createElement(E,{item:p,mapKey:f}),r.a.createElement(j.a,null,0===O?null:r.a.createElement("span",null,"$ "+O.toFixed(2)),r.a.createElement(z.a,{className:"modal-button",onClick:function(){var t=u[i.indexOf(c[i[f]].triggerModal.addOns)];e({img_url:p.img_url,id:p.id,name:p.food_name,size:Object.keys(d.size).filter((function(e){return d.size[e]}))[0],price:m.totalPrice,itemPrice:m.itemPrice,addOns:m.addOns.map((function(e){return t[e]})),groupId:i[f]}),g()},disabled:0===O},"Yes I want this!")))}return null}),S=a(126),k=a(127),D=a(151),x=a(128),T=a(129),C=(a(135),function(e){var t=e.menuItem,a=e.mapKey,l=Object(n.useContext)(b.a).addItem,i=Object(n.useContext)(s.a),c=i.menuState.menu,u=i.menuDispatch,m=i.menuOrder,d=i.menuSettings,o=t.img_url,p=t.id,O=t.food_name,g=t.price,y=t.small_price,E=t.large_price,_=d[m[a]],h=_.triggerModal,j=_.disabled,v=h.size,C=h.styles,N=h.addOns,R=N&&c[m.indexOf(N)],P=g||y||E;return r.a.createElement(S.a,{className:"menu-item mb-3"},r.a.createElement(k.a,{top:!0,src:o||"300x200.svg",alt:"Card image cap",className:"menu-item-image"}),r.a.createElement(D.a,null,r.a.createElement(x.a,{className:"menu-item-text"},r.a.createElement("p",{style:g||P?null:{margin:"auto"}},O),P&&r.a.createElement("p",null,g||P+"+")),r.a.createElement(T.a,null,j||r.a.createElement(z.a,{className:"menu-item-purchase",onClick:function(){u({type:"ORDER_START",payload:{modal:{isToggled:!!h,orderDefaults:f(v,R,C)},order:{item:t,mapKey:a}}}),h||l({img_url:o,id:p,name:O,price:g,groupId:m[a]})}},"Add to cart"))))}),N=a(131),R=function(e){var t=e.menuCollection,a=e.mapKey,l=Object(n.useContext)(s.a),i=l.menuOrder,c=l.menuSettings[i[a]],u=c.name,m=c.display,d=c.replaceWith||t;return m?r.a.createElement("section",null,r.a.createElement("p",{className:"mb-2 h4 text-muted"},u),r.a.createElement(N.a,{className:"mb-4"},d.map((function(e){return r.a.createElement(C,{menuItem:e,key:e.id,mapKey:a})})))):null},P=a(44);a(136),t.default=function(){var e=Object(n.useContext)(s.a),t=e.menuState,a=e.menuDispatch,l=e.menuOrder,i=t.menu;return Object(n.useEffect)((function(){Promise.resolve(JSON.parse(window.localStorage.getItem("menu"))||fetch("/api/menu").then((function(e){return[e,e.clone()]})).then((function(e){return Promise.all([e[0].json(),e[1].text()])})).then((function(e){return window.localStorage.setItem("menu",e[1]),e[0]}))).then((function(e){return a({type:"SET_MENU",payload:l.map((function(t){return e[t]}))})}))}),[]),r.a.createElement("main",{className:"menu-page"},(null===i||void 0===i?void 0:i.map((function(e,t){return r.a.createElement(R,{menuCollection:e,key:t,mapKey:t})})))||r.a.createElement(P.a,null),r.a.createElement(v,null))}}}]);
//# sourceMappingURL=7.21d4b60c.chunk.js.map