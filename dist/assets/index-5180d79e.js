import{r as o,w as U,x as _,j as e,R as u,c as n,G as x,L as d,y as f,S as P,z as g,C as k}from"./index-ad9c4655.js";import{L as h}from"./index-62a9780a.js";import{S as y}from"./index-e1217070.js";import{R as q}from"./RightOutlined-6272dd96.js";import{L as $}from"./LeftOutlined-cf638d40.js";import{V as C,a as R}from"./index-36c654d6.js";var S={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm154.7 454.5l-246 178c-5.3 3.8-12.7 0-12.7-6.5v-46.9c0-10.2 4.9-19.9 13.2-25.9L566.6 512 421.2 406.8c-8.3-6-13.2-15.6-13.2-25.9V334c0-6.5 7.4-10.3 12.7-6.5l246 178c4.4 3.2 4.4 9.8 0 13z"}}]},name:"right-circle",theme:"filled"};const L=S;var v=function(i,t){return o.createElement(U,_(_({},i),{},{ref:t,icon:L}))};v.displayName="RightCircleFilled";const N=o.forwardRef(v),B="_container_jku9l_1",H="_picture_jku9l_6",j={container:B,picture:H};function w({src:c,href:i,description:t}){return e.jsx("a",{className:j.container,href:i,target:"_blank",children:e.jsx("img",{src:c,alt:t,title:t,className:j.picture})})}const X="_container_pbp8t_1",E="_header_pbp8t_5",F="_title_pbp8t_8",M="_more_pbp8t_12",I="_more_link_pbp8t_12",K="_icon_pbp8t_23",V="_tabs_pbp8t_32",W="_tab_item_pbp8t_35",z="_active_pbp8t_43",A="_promos_pbp8t_47",O="_promo_item_pbp8t_53",T="_picture_pbp8t_65",G="_products_pbp8t_69",D="_product_item_pbp8t_73",J="_small_pbp8t_79",Q="_label_pbp8t_97",Y="_description_pbp8t_100",Z="_price_pbp8t_137",ee="_original_pbp8t_141",a={container:X,header:E,title:F,more:M,more_link:I,icon:K,tabs:V,tab_item:W,active:z,promos:A,promo_item:O,picture:T,products:G,product_item:D,small:J,label:Q,description:Y,price:Z,original:ee};function ce({title:c,tabs:i,promos:t}){const[m,r]=o.useState(0);return e.jsxs("div",{className:a.container,children:[e.jsx(ie,{title:c,tabs:i,current:m,onChange:r}),e.jsxs(u,{children:[e.jsx(ae,{promos:t}),e.jsx(te,{tabs:i,current:m})]})]})}function ie({title:c,tabs:i,current:t,onChange:m}){return e.jsxs(u,{justify:"space-between",align:"middle",className:a.header,children:[e.jsx("div",{className:a.title,children:c}),e.jsx("div",{className:a.more,children:i.length>1?e.jsx("div",{className:a.tabs,children:i.map((r,s)=>e.jsx("div",{className:n(a.tab_item,s===t&&a.active),onMouseEnter:()=>{m(s)},children:r.label},r.label))}):e.jsxs("a",{className:a.more_link,href:i[0].href,target:"_blank",children:["查看更多 ",e.jsx(N,{className:a.icon})]})})]})}function ae({promos:c}){return e.jsx("div",{className:a.promos,children:c.slice(0,2).map(i=>e.jsx("a",{href:i.href,target:"_blank",className:a.promo_item,children:e.jsx(h,{src:i.src,alt:i.description,className:a.picture})},i.src))})}function te({tabs:c,current:i}){const t=c.length>1,m=c[i].children||[],r=m[7];return e.jsxs(x,{columns:4,gap:"1.4rem",className:a.products,children:[m.slice(0,t&&r?-1:8).map(s=>e.jsxs(d,{className:a.product_item,to:f(s.label),target:"_blank",children:[e.jsx(h,{className:a.picture,src:s.pictureUrl,alt:s.label}),e.jsxs("div",{children:[e.jsx("div",{className:n(a.label,"text-ellipsis"),children:s.label}),e.jsx("div",{className:n(a.description,"text-ellipsis"),children:s.description}),e.jsxs(P,{children:[e.jsx("span",{className:a.price,children:g(s.price)}),!!s.originalPrice&&e.jsx("span",{className:n(a.price,a.original),children:g(s.originalPrice)})]})]})]},s.label)),t&&e.jsxs("div",{children:[!!r&&e.jsxs(d,{style:{marginBottom:"1.4rem"},className:n(a.product_item,a.small),to:f(r.label),target:"_blank",children:[e.jsx(h,{className:a.picture,src:r.pictureUrl,alt:r.label}),e.jsxs("div",{children:[e.jsx("div",{className:n(a.label,"text-ellipsis"),children:r.label}),e.jsx("span",{className:a.price,children:r.price})]})]}),e.jsxs(d,{className:n(a.product_item,a.small),to:`/search?keyword=${c[i].label}`,target:"_blank",children:[e.jsx("div",{className:a.picture,children:e.jsx(k,{type:"i-arrow-right-circle",className:a.icon})}),e.jsxs("div",{children:[e.jsx("div",{className:a.label,children:"浏览更多"}),e.jsx("div",{className:n(a.description,"text-ellipsis"),children:c[i].label})]})]})]})]})}const le=[{title:"手机",tabs:[{label:"手机",href:"https://www.mi.com/p/1915.html",children:[{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202304171459_dd35f1e6215da63c356e352d4d398ce6.png?thumb=1&f=webp&q=90",label:"Xiaomi 13 Ultra",description:"徕卡光学全焦段四摄| 一英寸可变光圈| 徕卡专业街拍模式",price:5999},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8b046feca0a7bb3f7b961a9690babb1b.jpg?thumb=1&f=webp&q=90",label:"Redmi Note 12 Turbo",description:"狂暴引擎 超强性能释放",price:1999},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a6cec580260ceb20ae6a885c2c65c611.png?thumb=1&f=webp&q=90",label:"Redmi K60",description:"骁龙8+｜2K 高光直屏｜5500mAh+67W闪充",price:2499,originalPrice:2699},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f37dd30477e7ba040c7fb69c31ad8bf3.png?thumb=1&f=webp&q=90",label:"Redmi K60 Pro",description:"第二代骁龙8】狂暴引擎",price:3299,originalPrice:3599},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202212251443_29b17941a7365948446bd193011d9241.png?thumb=1&f=webp&q=90",label:"Redmi Note 12 Pro 极速版",description:"高通骁龙778G，OLED柔性直屏+一亿像素",price:1699},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202211292351_92aba2c69123166a74ba2e2b525b1ae2.png?thumb=1&f=webp&q=90",label:"Xiaomi 13 限量定制色",description:"全新第二代骁龙8｜徕卡专业光学镜头｜徕卡原生双画质 | 6.36″超窄边屏幕｜67W小米澎湃秒充｜徕卡75mm长焦镜头",price:4999},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/aa047170a22d9f0852254aa36df5f5f0.png?thumb=1&f=webp&q=90",label:"Xiaomi 13 Pro",description:"全新第二代骁龙8｜徕卡专业光学镜头｜徕卡原生双画质 | 2K 专业原色屏｜120W小米澎湃秒充 ｜徕卡75mm长焦镜头",price:4999},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/94c6497b70f2e881460cb232082a0da6.png?thumb=1&f=webp&q=90",label:"Xiaomi 13",description:"全新第二代骁龙8｜徕卡专业光学镜头｜徕卡原生双画质 | 6.36″超窄边屏幕｜67W小米澎湃秒充｜徕卡75mm长焦镜头",price:3999}]}],promos:[{src:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a5d3a59f7b53c23feab77434aa1f383b.jpg?thumb=1&f=webp&q=90",href:"https://www.mi.com/shop/buy?product_id=18443"}]},{title:"生活电器",tabs:[{label:"电暖器",children:[{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/817d9bc0a83f2fb939b08f97064fbfb8.jpg?thumb=1&f=webp&q=90",label:"米家电暖器 温控版",description:"2200W 强劲功率，对流速热，居浴两用",price:329},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202210261533_f21bab344a19e9780fc6a15b91eb9075.png?thumb=1&f=webp&q=90",label:"米家石墨烯踢脚线电暖器 仿真火焰版",description:"加湿+火焰效果 | 悬浮外观 | 双核石墨烯速热",price:1599},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/812e9a25e79fb3055b581f2bef2ae05b.jpg?thumb=1&f=webp&q=90",label:"米家石墨烯智能电暖器",description:"石墨烯高导热，即开即暖无需等",price:549},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/209736a5adc4cba729db4d39b100688c.jpg?thumb=1&f=webp&q=90",label:"米家踢脚线电暖器E",description:"制暖身材小，抵御寒冬功劳大",price:399,originalPrice:499},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202209091112_151f52c03184db9b7ae9d0c170558378.jpg?thumb=1&f=webp&q=90",label:"米家石墨烯折叠踢脚线电暖器 超薄版",description:"0°-180°百变折叠不占地|石墨烯速热|智能恒温",price:799,originalPrice:899},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202208231740_b0cb6bb43716c377f5aceb21e9a1e60e.jpg?thumb=1&f=webp&q=90",label:"米家立式暖风机Lite",description:"3秒即热/70°广角送风/智能恒温/四种模式",price:329,originalPrice:349},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/55686e19296e9150aa1c1d3b15e1c6ec.jpg?thumb=1&f=webp&q=90",label:"米家石墨烯踢脚线电暖器",description:"石墨烯速热取暖，快上加快",price:749},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7acbaf884ce4295b856ce04a935a5717.jpg?thumb=1&f=webp&q=90",label:"米家直流变频两季扇",price:799}]},{label:"扫地机",children:[{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/35b5669b506219fe7252ac5fa9baa1b5.jpg?thumb=1&f=webp&q=90",label:"米家全能扫拖机器人",description:"免洗集尘全自动，一机解放双手",price:3499,originalPrice:4599},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/35b5669b506219fe7252ac5fa9baa1b5.jpg?thumb=1&f=webp&q=90",label:"米家全能扫拖机器人1",description:"免洗集尘全自动，一机解放双手",price:3499,originalPrice:4599},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/35b5669b506219fe7252ac5fa9baa1b5.jpg?thumb=1&f=webp&q=90",label:"米家全能扫拖机器人2",description:"免洗集尘全自动，一机解放双手",price:3499,originalPrice:4599},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/35b5669b506219fe7252ac5fa9baa1b5.jpg?thumb=1&f=webp&q=90",label:"米家全能扫拖机器人3",description:"免洗集尘全自动，一机解放双手",price:3499,originalPrice:4599},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/35b5669b506219fe7252ac5fa9baa1b5.jpg?thumb=1&f=webp&q=90",label:"米家全能扫拖机器人4",description:"免洗集尘全自动，一机解放双手",price:3499,originalPrice:4599},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/35b5669b506219fe7252ac5fa9baa1b5.jpg?thumb=1&f=webp&q=90",label:"米家全能扫拖机器人5",description:"免洗集尘全自动，一机解放双手",price:3499,originalPrice:4599},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/35b5669b506219fe7252ac5fa9baa1b5.jpg?thumb=1&f=webp&q=90",label:"米家全能扫拖机器人6",description:"免洗集尘全自动，一机解放双手",price:3499,originalPrice:4599},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/35b5669b506219fe7252ac5fa9baa1b5.jpg?thumb=1&f=webp&q=90",label:"米家全能扫拖机器人7",description:"免洗集尘全自动，一机解放双手",price:3499,originalPrice:4599}]},{label:"空净",children:[{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d9e887830eee09bd341b9ed130db2d9c.jpg?thumb=1&f=webp&q=90",label:"米家空气净化器 4 Pro",description:"除醛抗菌升级",price:1299,originalPrice:1499},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d9e887830eee09bd341b9ed130db2d9c.jpg?thumb=1&f=webp&q=90",label:"米家空气净化器 4 Pro1",description:"除醛抗菌升级",price:1299,originalPrice:1499},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d9e887830eee09bd341b9ed130db2d9c.jpg?thumb=1&f=webp&q=90",label:"米家空气净化器 4 Pro2",description:"除醛抗菌升级",price:1299,originalPrice:1499},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d9e887830eee09bd341b9ed130db2d9c.jpg?thumb=1&f=webp&q=90",label:"米家空气净化器 4 Pro3",description:"除醛抗菌升级",price:1299,originalPrice:1499},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d9e887830eee09bd341b9ed130db2d9c.jpg?thumb=1&f=webp&q=90",label:"米家空气净化器 4 Pro4",description:"除醛抗菌升级",price:1299,originalPrice:1499},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d9e887830eee09bd341b9ed130db2d9c.jpg?thumb=1&f=webp&q=90",label:"米家空气净化器 4 Pro5",description:"除醛抗菌升级",price:1299,originalPrice:1499},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d9e887830eee09bd341b9ed130db2d9c.jpg?thumb=1&f=webp&q=90",label:"米家空气净化器 4 Pro6",description:"除醛抗菌升级",price:1299,originalPrice:1499},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d9e887830eee09bd341b9ed130db2d9c.jpg?thumb=1&f=webp&q=90",label:"米家空气净化器 4 Pro7",description:"除醛抗菌升级",price:1299,originalPrice:1499}]},{label:"清洁",children:[{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/bdd9d216b401933efaa304b64901c087.jpg?thumb=1&f=webp&q=90",label:"米家随手吸尘器",description:"干净随手吸",price:229,originalPrice:249},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/bdd9d216b401933efaa304b64901c087.jpg?thumb=1&f=webp&q=90",label:"米家随手吸尘器1",description:"干净随手吸",price:229,originalPrice:249},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/bdd9d216b401933efaa304b64901c087.jpg?thumb=1&f=webp&q=90",label:"米家随手吸尘器2",description:"干净随手吸",price:229,originalPrice:249},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/bdd9d216b401933efaa304b64901c087.jpg?thumb=1&f=webp&q=90",label:"米家随手吸尘器3",description:"干净随手吸",price:229,originalPrice:249}]}],promos:[{src:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1f1dbfa1f47c2a7d8a0fff6d9930c4a.jpg?thumb=1&f=webp&q=90",href:"https://www.mi.com/shop/buy?product_id=16552"},{src:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/92a420f42eda98f401d650ea9b52409e.jpg?thumb=1&f=webp&q=90",href:"https://www.mi.com/shop/buy?product_id=16427"}]}],re=[{label:"手机",children:[{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ecfbf9d01c8a2605f0a6938093b23ad8.png?thumb=1&f=webp&q=90",label:"Xiaomi MIX系列",price:100},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/827fae95d0f1d75f1535ef93e357b2af.png?thumb=1&f=webp&q=90",label:"Xiaomi 数字系列",price:100},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/930ddc941c1e6c81042406440e88ac45.png?thumb=1&f=webp&q=90",label:"Xiaomi Civi系列",price:100},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0453934fca43f79d0472b28e382bd2be.png?thumb=1&f=webp&q=90",label:"Xiaomi 青春系列",price:100},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/993aff4f7f59dd64011c61a3132f0fd4.png?thumb=1&f=webp&q=90",label:"Redmi K系列",price:100},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9ab5c6d195d2b3dde69683966891d5a9.png?thumb=1&f=webp&q=90",label:"Redmi Note系列",price:100},{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/232c1ede1284125cc4dcee5c7565d8fe.png?thumb=1&f=webp&q=90",label:"Redmi 数字系列",price:100}]},{label:"电视",children:[{pictureUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/50194366cfebbc7c82489d0094c1f944.png?thumb=1&f=webp&q=90",label:"小米电视6 55” OLED",price:100}]},{label:"家电"},{label:"笔记本 平板"},{label:"出行 穿戴"},{label:"耳机 音箱"},{label:"健康 儿童"},{label:"生活 箱包"},{label:"智能 路由器"},{label:"电源 配件"}],se=[{src:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/89b9804e4b794f230252bc99fb55faa5.jpg?thumb=1&f=webp&q=90",href:"https://www.mi.com/shop/buy?product_id=18363"},{src:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f9ff7ab2bd81728189a08fadb8ccf0e9.jpg?thumb=1&f=webp&q=90",href:"https://www.mi.com/a/h/30535.html?sign=7bd89fb662da49ae0ae1dd615acf0684"},{src:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d24b07f5fb10927b4cdcfce9a57a168a.jpg?thumb=1&f=webp&q=90",href:"https://www.mi.com/a/h/29234.html?sign=7e0fdd19b2fbac34e489df529bb1d26c"},{src:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8e8803e2c8bdd75b3a43b847c5a2f160.jpg?thumb=1&f=webp&q=90",href:"https://www.mi.com/a/h/29449.html?sign=2887f1f73d30fabeee121e476f99b1b0"},{src:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b631a8788272ad133da984bd1503f989.jpg?thumb=1&f=webp&q=90",href:"https://www.mi.com/a/h/28850.html?sign=e9418af7abf16bb587231c2c3dcf647e"},{src:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/bf7fecc077e7eaf1bfc66f8e92ff6edf.jpg?thumb=1&f=webp&q=90",href:"https://www.mi.com/shop/buy?product_id=18464"}],ne="_container_50o7u_1",me="_category_panel_50o7u_5",pe="_category_item_50o7u_15",be="_active_50o7u_24",oe="_label_50o7u_28",de="_icon_50o7u_32",fe="_products_panel_50o7u_36",he="_product_item_50o7u_47",ue="_picture_50o7u_57",_e="_banner_card_50o7u_67",ge="_banner_swiper_50o7u_67",je="_banner_item_50o7u_71",we="_btn_50o7u_75",xe="_left_50o7u_92",qe="_right_50o7u_96",l={container:ne,category_panel:me,category_item:pe,active:be,label:oe,icon:de,products_panel:fe,product_item:he,picture:ue,banner_card:_e,banner_swiper:ge,banner_item:je,btn:we,left:xe,right:qe};function ve(){return e.jsxs("div",{className:l.container,children:[e.jsx(Ne,{}),e.jsx(Pe,{})]})}function Ne(){const[c,i]=o.useState(),[t,m]=o.useState(-1);return e.jsxs("div",{className:l.category_panel,onMouseLeave:()=>{i([]),m(-1)},children:[re.map((r,s)=>e.jsxs("div",{className:n(l.category_item,t===s&&l.active),onMouseEnter:()=>{i(r.children),m(s)},children:[e.jsx("span",{className:l.label,children:r.label}),e.jsx(q,{className:l.icon})]},r.label)),e.jsx(Ue,{open:!!(c!=null&&c.length),products:c||[]})]})}function Ue({open:c,products:i}){return e.jsx("div",{className:l.products_panel,style:{display:c?"flex":"none",width:`calc(24.8rem * ${Math.ceil(Math.min(i.length,24)/6)})`},children:i.slice(0,24).map(t=>e.jsxs(d,{className:l.product_item,to:f(t.label),children:[e.jsx("img",{alt:t.label,src:t.pictureUrl,className:l.picture}),e.jsx("span",{className:n(l.label,"text-ellipsis"),children:t.label})]},t.label))})}function Pe(){const c=o.useRef(null);return e.jsxs("div",{className:l.banner_card,children:[e.jsx(y,{ref:c,animation:"fade",className:l.banner_swiper,children:se.map(i=>e.jsx("a",{className:l.banner_item,href:i.href,target:"_blank",rel:"nofollow",children:e.jsx("img",{src:i.src,draggable:!1,alt:i.description,title:i.description,className:l.picture})},i.src))}),e.jsx("div",{className:n(l.btn,l.left),onClick:()=>{var i;(i=c.current)==null||i.prev()},children:e.jsx($,{})}),e.jsx("div",{className:n(l.btn,l.right),onClick:()=>{var i;(i=c.current)==null||i.next()},children:e.jsx(q,{})})]})}const ke=[{label:"保障服务",iconUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/82abdba456e8caaea5848a0cddce03db.png",href:"https://api.jr.mi.com/activity/scene/scenePCsearch.html?from=search"},{label:"企业团购",iconUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/806f2dfb2d27978e33fe3815d3851fa3.png",href:"https://qiye.mi.com/"},{label:"F码通道",iconUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/eded6fa3b897a058163e2485532c4f10.png",href:"https://www.mi.com/order/fcode"},{label:"米粉卡",iconUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/43a3195efa6a3cc7662efed8e7abe8bf.png",href:"https://10046.mi.com/"},{label:"以旧换新",iconUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f4846bca6010a0deb9f85464409862af.png",href:"https://www.mi.com/a/h/16769.html"},{label:"话费充值",iconUrl:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9a76d7636b08e0988efb4fc384ae497b.png",href:"https://recharge.10046.mi.com/"}],ye=[{src:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d7d4be1a9e701e16de498f89b1865867.jpg",href:"https://www.mi.com/xiaomimixfold2"},{src:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6dd2f3e0de4e6cbba98fd3799cfa5bf7.jpg",href:"https://www.mi.com/shop/buy?product_id=10050021"},{src:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0cf5e958bc88727b50c5c5fba7a8f47a.jpg",href:"https://www.mi.com/shop/buy?product_id=18075"}],$e="_container_vkqst_1",Ce="_channel_box_vkqst_6",Re="_channel_item_vkqst_13",Se="_icon_vkqst_44",Le="_label_vkqst_49",Be="_promo_cards_vkqst_53",He="_promo_item_vkqst_56",Xe="_picture_vkqst_60",p={container:$e,channel_box:Ce,channel_item:Re,icon:Se,label:Le,promo_cards:Be,promo_item:He,picture:Xe};function Ee(){return e.jsxs("div",{className:p.container,children:[e.jsx(Fe,{}),e.jsx(Me,{})]})}function Fe(){return e.jsx("div",{className:p.channel_box,children:ke.map(c=>e.jsxs("a",{className:p.channel_item,href:c.href,target:"_blank",children:[e.jsx("img",{src:c.iconUrl,alt:c.label,className:p.icon}),e.jsx("span",{className:p.label,children:c.label})]},c.label))})}function Me(){return e.jsx("div",{className:p.promo_cards,children:ye.map(c=>e.jsx("a",{className:p.promo_item,href:c.href,target:"_blank",children:e.jsx("img",{src:c.src,alt:c.description,title:c.description,className:p.picture})},c.src))})}const Ie="_container_10ten_1",Ke="_header_10ten_5",Ve="_title_10ten_8",We="_more_link_10ten_12",ze="_icon_10ten_23",Ae="_videos_10ten_32",b={container:Ie,header:Ke,title:Ve,more_link:We,icon:ze,videos:Ae};function Oe(){return e.jsxs("div",{className:b.container,children:[e.jsxs(u,{justify:"space-between",align:"middle",className:b.header,children:[e.jsx("div",{className:b.title,children:"视频"}),e.jsxs(d,{className:b.more_link,to:"/videos",target:"_blank",children:["查看更多 ",e.jsx(N,{className:b.icon})]})]}),e.jsx(x,{columns:4,gap:"1.4rem",className:b.videos,children:C.slice(0,4).map(c=>e.jsx(R,{...c},c.title))})]})}function Ze(){return e.jsxs(e.Fragment,{children:[e.jsx(ve,{}),e.jsx(Ee,{}),e.jsxs("div",{style:{backgroundColor:"var(--color-background)"},children:[e.jsx(w,{src:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/864aa0927000c3d717eca08955589d62.jpg?thumb=1&f=webp&q=90",href:"https://www.mi.com/shop/buy?product_id=18363"}),le.map(c=>e.jsx(ce,{...c},c.title)),e.jsx(w,{src:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/88e35cffc82cd98cd53172460067af17.jpg?thumb=1&f=webp&q=90",href:"https://www.mi.com/shop/buy?product_id=9836"}),e.jsx(Oe,{})]})]})}export{Ze as default};
