import{j as s,a0 as c,R as t,S as a,a1 as i,z as l,L as o,B as d}from"./index-ad9c4655.js";import{o as m}from"./const-1efc18e9.js";import{h as _}from"./moment-fbc5633a.js";const h="_container_kyr4f_1",j="_order_item_kyr4f_4",u="_header_kyr4f_8",x="_amount_kyr4f_15",p="_main_kyr4f_18",f="_counter_kyr4f_26",k="_link_kyr4f_31",y="_btn_kyr4f_39",r={container:h,order_item:j,header:u,amount:x,main:p,counter:f,link:k,btn:y};function v(){return s.jsxs(s.Fragment,{children:[s.jsx(c.Header,{title:"订单评价"}),s.jsx("div",{className:r.container,children:m.map(e=>s.jsxs("div",{className:r.order_item,children:[s.jsxs(t,{align:"middle",justify:"space-between",className:r.header,children:[s.jsxs(a,{size:"1.6rem",children:[s.jsxs("span",{children:["下单时间：",_(e.createTime).format(i)]}),s.jsxs("span",{children:["订单号：",e.id]})]}),s.jsxs("span",{children:["实付金额：",s.jsx("span",{className:r.amount,children:l(e.paymentAmount,"")}),"元"]})]}),s.jsxs(t,{align:"middle",justify:"space-between",className:r.main,children:[s.jsxs(a,{children:[e.products.slice(0,6).map(n=>s.jsx("img",{alt:n.label,src:n.pictureUrl},n.label)),s.jsxs("span",{className:r.counter,children:["共",e.products.length,"种商品"]})]}),s.jsxs(a,{direction:"vertical",children:[s.jsx(o,{target:"_blank",to:`/orders/${e.id}`,className:r.link,children:"订单详情"}),s.jsx(o,{to:`/orders/comments/${e.id}`,children:s.jsx(d,{className:r.btn,children:"去评价"})})]})]})]},e.id))})]})}export{v as default};
