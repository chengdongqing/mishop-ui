import{N as t,X as l,r as n,j as s,R as o,z as i,L as m,B as _}from"./index-ad9c4655.js";import{C as p}from"./index-845b07b1.js";import{a as x}from"./const-b031e7cd.js";import"./index-62a9780a.js";import"./index-e1217070.js";const j="_container_1lcd6_1",u="_success_cover_1lcd6_8",h="_title_1lcd6_14",b="_amount_1lcd6_20",v="_btn_1lcd6_27",N="_tips_1lcd6_37",f="_order_infos_1lcd6_49",q="_item_1lcd6_54",g="_label_1lcd6_60",C="_app_qrcode_1lcd6_66",w="_qrcode_1lcd6_74",e={container:j,success_cover:u,title:h,amount:b,btn:v,tips:N,order_infos:f,item:q,label:g,app_qrcode:C,qrcode:w};function B(){const a=t(!0),{totalAmount:d}=l(!0),c=n.useMemo(()=>x[0],[]);return s.jsxs("div",{style:{padding:"3.8rem 0",backgroundColor:"var(--color-background)"},children:[s.jsxs(o,{className:e.container,children:[s.jsxs("div",{className:e.success_cover,children:[s.jsx("div",{className:e.title,children:"支付成功"}),s.jsxs("div",{className:e.amount,children:[s.jsx("span",{children:i(d,"")}),"元"]}),s.jsx(m,{to:"/orders/5230601985602776",children:s.jsx(_,{outlined:!0,className:e.btn,children:"查看订单详情"})}),s.jsxs("div",{className:e.tips,children:["小米公司不会以任何理由要求您提供银行卡信息或支付额外费用",s.jsx("br",{}),"请谨防钓鱼链接或诈骗电话。",s.jsxs("a",{href:"https://www.mi.com/service/help_center/fraud/",target:"_blank",children:["了解详情",">"]})]})]}),s.jsxs("div",{className:e.order_infos,children:[s.jsxs("div",{className:e.item,children:[s.jsx("div",{className:e.label,children:"订单编号："}),s.jsx("div",{children:"5230601985602776"})]}),s.jsxs("div",{className:e.item,children:[s.jsx("div",{className:e.label,children:"收货信息："}),s.jsxs("div",{children:[c.username," ",c.phoneNumber,s.jsx("br",{}),c.address.join(" "),s.jsx("br",{}),s.jsx("span",{className:e.tips,children:"* 在“订单详情页”你可以确认收货地址或者更改收货地址"})]})]}),s.jsxs("div",{className:e.item,children:[s.jsx("div",{className:e.label,children:"商品名称："}),s.jsx("div",{children:a.map(r=>s.jsxs("div",{children:[r.label,s.jsxs("span",{style:{color:"#b0b0b0"},children:[" x ",r.number]})]},r.label))})]}),s.jsxs("div",{className:e.app_qrcode,children:[s.jsx("img",{alt:"app qrcode",src:"https://c1.mifile.cn/f/i/15/pay/app-code.png",className:e.qrcode}),s.jsxs("div",{children:["通过小米商城app",s.jsx("br",{}),"随时跟踪订单"]})]})]})]}),s.jsx(p,{title:"为你推荐",mode:"swiper"})]})}export{B as default};
