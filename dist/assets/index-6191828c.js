import{r as x,j as s,R as _,c,$ as j,H as h,a0 as p,J as v,u as b,S as d,a1 as f,L as l,z as m,y as u,B as n}from"./index-3e2d7128.js";import{P as N}from"./index-c1771bb9.js";import{u as y}from"./useQueryParams-27fe2b18.js";import{h as g}from"./moment-fbc5633a.js";import{o as S}from"./const-1efc18e9.js";import"./LeftOutlined-b1f385fc.js";import"./RightOutlined-5548f9e6.js";const w="_container_1nmvx_1",z="_status_list_1nmvx_5",L="_item_1nmvx_8",P="_active_1nmvx_20",o={container:w,status_list:z,item:L,active:P},F=[{label:"全部",value:void 0},{label:"待支付",value:1},{label:"待收货",value:2}];function $({onChange:r}){const[i,e]=x.useState();return s.jsxs(_,{align:"middle",justify:"space-between",className:o.container,children:[s.jsx("div",{className:o.status_list,children:F.map(a=>s.jsx("div",{className:c(o.item,a.value===i&&o.active),onClick:()=>{e(a.value),r==null||r({status:a.value})},children:a.label},a.label))}),s.jsx(j,{width:"22rem",height:"4.2rem",fontSize:"1.2rem",placeholder:"输入商品名称、订单号",onSearch:a=>{r==null||r({keyword:a})}})]})}const k="_order_item_1t9x0_1",A="_header_1t9x0_5",B="_order_status_1t9x0_9",T="_order_details_1t9x0_14",O="_order_id_1t9x0_19",R="_amount_1t9x0_25",U="_main_1t9x0_35",D="_product_list_1t9x0_38",E="_product_item_1t9x0_41",H="_label_1t9x0_52",M="_btn_1t9x0_58",I="_gray_1t9x0_63",t={order_item:k,header:A,order_status:B,order_details:T,order_id:O,amount:R,main:U,product_list:D,product_item:E,label:H,btn:M,gray:I};function Y(){const r=y(),[i,e]=x.useState(!0);return h(()=>{console.log("status: ",r.status),setTimeout(()=>{e(!1)},1e3)}),s.jsxs(s.Fragment,{children:[s.jsx(p.Header,{title:"我的订单",extra:s.jsxs("span",{children:["请谨防钓鱼链接或诈骗电话，",s.jsxs("a",{target:"_blank",href:"https://www.mi.com/service/buy/Avoid%20Fraud",children:["了解更多",">"]})]})}),s.jsx($,{onChange:()=>{e(!0),setTimeout(()=>{e(!1)},1e3)}}),i?s.jsx(v,{}):s.jsx(J,{})]})}function J(){const[r,i]=b(()=>({current:1,pageSize:10,totalSize:156}));return s.jsxs(s.Fragment,{children:[S.map(e=>s.jsxs("div",{className:t.order_item,children:[s.jsxs("div",{className:t.header,children:[s.jsx("div",{className:t.order_status,children:e.status}),s.jsxs(_,{wrap:!1,align:"bottom",justify:"space-between",className:t.order_details,children:[s.jsxs(d,{split:s.jsx("span",{style:{color:"var(--color-border)"},children:"|"}),wrap:!0,children:[g(e.createTime).format(f),e.shippingInfo.username,s.jsxs("span",{children:["订单号：",s.jsx(l,{to:`/orders/${e.id}`,className:t.order_id,children:e.id})]}),e.paymentMethod]}),s.jsxs("div",{className:t.amount,children:["实付金额：",s.jsx("span",{children:m(e.paymentAmount,"")}),"元"]})]})]}),s.jsxs(_,{className:t.main,children:[s.jsx("div",{className:t.product_list,children:e.products.map(a=>s.jsx("div",{className:t.product_item,children:s.jsxs(d,{size:"2rem",children:[s.jsx(l,{to:u(a.label),children:s.jsx("img",{alt:a.label,src:a.pictureUrl})}),s.jsxs("div",{children:[s.jsx(l,{to:u(a.label),className:t.label,children:a.label}),s.jsxs("div",{children:[m(a.price)," x ",a.number]})]})]})},a.label))}),s.jsxs(d,{direction:"vertical",size:"1rem",children:[s.jsx(l,{to:`/orders/${e.id}`,children:s.jsx(n,{outlined:!0,className:c(t.btn,t.gray),children:"订单详情"})}),s.jsx(l,{to:`/orders/comments/${e.id}`,children:s.jsx(n,{outlined:!0,className:t.btn,children:"评价晒单"})}),s.jsx(n,{outlined:!0,className:c(t.btn,t.gray),children:"申请售后"}),s.jsx(n,{outlined:!0,className:c(t.btn,t.gray),children:"联系客服"})]})]})]},e.id)),s.jsx(N,{...r,onChange:e=>{i({current:e})}})]})}export{Y as default};