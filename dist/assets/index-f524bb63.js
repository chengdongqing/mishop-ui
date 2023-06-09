import{j as e,c as A,P as l,r as j,u as I,F as r,p as f,I as v,B as g,d as O,V as T,G as $,a as L,b as k,A as C,R as d,e as P,S as m,_}from"./index-ad9c4655.js";import{L as u}from"./index-62a9780a.js";import{u as V}from"./useQueryParams-cb9098a7.js";import{R as p}from"./RightOutlined-6272dd96.js";const z="_steps_a7dw3_1",D="_step_item_a7dw3_6",M="_line_a7dw3_16",F="_active_a7dw3_19",q="_icon_a7dw3_19",U="_label_a7dw3_25",o={steps:z,step_item:D,line:M,active:F,icon:q,label:U};function B({value:s,options:n}){return e.jsx("div",{className:o.steps,children:n.map((i,a)=>e.jsxs("div",{className:A(o.step_item,a+1<=s&&o.active),children:[e.jsx("div",{className:o.icon,children:a+1}),e.jsx("div",{className:o.label,children:i}),e.jsx("div",{className:o.line})]},i))})}const G="_container_19c4u_1",Q="_title_19c4u_4",H="_btn_19c4u_10",b={container:G,title:Q,btn:H};function J({type:s,onOk:n}){const i=j.useMemo(()=>({phoneNumber:"手机号",email:"邮箱"})[s],[s]),[a,N]=j.useState(1),[c,w]=I({account:"",verificationCode:""}),[R,y]=j.useState(!1);return e.jsxs("div",{className:b.container,children:[e.jsxs("div",{className:b.title,children:["绑定安全",i]}),e.jsx(B,{value:a,options:[`输入新${i}`,`验证新${i}`]}),a===1?e.jsxs(r,{onOk:()=>{N(2)},children:[e.jsx(r.Item,{name:s,rules:[{required:!0,message:`请输入${i}`},{pattern:s==="phoneNumber"?f.phoneNumber:f.email,message:`${i}输入错误`}],children:e.jsx(v,{placeholder:i,onChange:x=>{w({account:x})}})}),e.jsx(g,{type:"submit",disabled:!c.account,className:b.btn,children:"下一步"})]}):e.jsxs(r,{onOk:()=>{y(!0),setTimeout(()=>{y(!1),n(O(c.account))},1e3)},children:[e.jsx(r.Item,{name:s,rules:[{required:!0,message:"请输入验证码"},{pattern:f.verificationCode,message:"验证码格式错误"}],children:e.jsx(T,{onSend:()=>new Promise(x=>{setTimeout(()=>{x()},1e3)}),onChange:x=>{w({verificationCode:x})}})}),e.jsx(g,{type:"submit",loading:R,disabled:!c.verificationCode,className:b.btn,children:"确定"})]})]})}function E(s,n){const i=l.open({footer:null,width:"45rem",content:e.jsx(J,{type:s,onOk:a=>{i(),n(a)}})})}const K="_list_1p0gl_1",W="_list_item_1p0gl_4",X="_icon_1p0gl_10",Y="_icon_arrow_1p0gl_14",t={list:K,list_item:W,icon:X,icon_arrow:Y},Z="_container_cft26_1",ee="_title_cft26_4",se="_btn_cft26_10",te="_plain_cft26_17",h={container:Z,title:ee,btn:se,plain:te};function ie({onCancel:s,onOk:n}){const i=j.useRef(""),[a,N]=j.useState(!1);return e.jsxs("div",{className:h.container,children:[e.jsx("div",{className:h.title,children:"修改密码"}),e.jsxs(r,{onOk:()=>{N(!0),setTimeout(()=>{N(!1),n()},1e3)},children:[e.jsx(r.Item,{name:"password",rules:[{required:!0,message:"请输入密码"},{pattern:f.password,message:"密码长度8-20位，包含数字、字母等"}],children:e.jsx(v,{type:"password",placeholder:"输入新密码",onChange:c=>{i.current=c}})}),e.jsx(r.Item,{name:"password-repeat",rules:[{required:!0,message:"请输入密码"},{pattern:f.password,message:"密码长度8-20位，包含数字、字母等"},{validator(c){return c!==i.current?Promise.reject("密码输入不一致"):Promise.resolve()}}],children:e.jsx(v,{type:"password",placeholder:"输入新密码"})}),e.jsxs($,{columns:2,gap:"2rem",children:[e.jsx(g,{className:A(h.btn,h.plain),onClick:s,children:"取消"}),e.jsx(g,{className:h.btn,type:"submit",loading:a,children:"确定"})]})]})]})}function S(s){const n=l.open({footer:null,width:"45rem",content:e.jsx(ie,{onCancel:()=>{n()},onOk:()=>{n(),s()}})})}function de(){return e.jsxs(e.Fragment,{children:[e.jsx(ne,{}),e.jsx(ae,{})]})}function ne(){const s=L(),n=k(),{action:i}=V();return j.useEffect(()=>{i==="password"&&setTimeout(()=>{S(()=>{l.alert("密码修改成功！")})},500)},[i]),e.jsxs(e.Fragment,{children:[e.jsx(C.Title,{title:"登录方式"}),e.jsxs("div",{className:t.list,children:[e.jsxs(d,{align:"middle",justify:"space-between",className:t.list_item,onClick:()=>{E("phoneNumber",a=>{n(P.actions.modifyUser({phoneNumber:a})),l.alert("手机号修改成功！")})},children:[e.jsxs(m,{size:"1rem",children:[e.jsx(u,{alt:"",src:()=>_(()=>import("./phone-ee94a601.js"),[]),className:t.icon}),"安全手机"]}),e.jsxs("div",{children:["+86 ",s==null?void 0:s.phoneNumber,e.jsx(p,{className:t.icon_arrow})]})]}),e.jsxs(d,{align:"middle",justify:"space-between",className:t.list_item,onClick:()=>{E("email",a=>{n(P.actions.modifyUser({email:a})),l.alert("邮箱修改成功！")})},children:[e.jsxs(m,{size:"1rem",children:[e.jsx(u,{alt:"",src:()=>_(()=>import("./email-a44af4da.js"),[]),className:t.icon}),"安全邮箱"]}),e.jsxs("div",{children:[s==null?void 0:s.email,e.jsx(p,{className:t.icon_arrow})]})]}),e.jsxs(d,{align:"middle",justify:"space-between",className:t.list_item,onClick:()=>{S(()=>{l.alert("密码修改成功！")})},children:[e.jsxs(m,{size:"1rem",children:[e.jsx(u,{alt:"",src:()=>_(()=>import("./password-e6ae65c4.js"),[]),className:t.icon}),"修改密码"]}),e.jsx("div",{children:e.jsx(p,{className:t.icon_arrow})})]}),e.jsxs(d,{align:"middle",justify:"space-between",className:t.list_item,children:[e.jsxs(m,{size:"1rem",children:[e.jsx(u,{alt:"",src:()=>_(()=>import("./account-ccef198a.js"),[]),className:t.icon}),"第三方账号"]}),e.jsx("div",{children:e.jsx(p,{className:t.icon_arrow})})]})]})]})}function ae(){return e.jsxs(e.Fragment,{children:[e.jsx(C.Title,{title:"帐号安全"}),e.jsxs("div",{className:t.list,children:[e.jsxs(d,{align:"middle",justify:"space-between",className:t.list_item,children:[e.jsxs(m,{size:"1rem",children:[e.jsx(u,{alt:"",src:()=>_(()=>import("./security-c0012ef5.js"),[]),className:t.icon}),"密保问题"]}),e.jsx("div",{children:e.jsx(p,{className:t.icon_arrow})})]}),e.jsxs(d,{align:"middle",justify:"space-between",className:t.list_item,children:[e.jsxs(m,{size:"1rem",children:[e.jsx(u,{alt:"",src:()=>_(()=>import("./device-8e8c62b7.js"),[]),className:t.icon}),"登录设备管理"]}),e.jsx("div",{children:e.jsx(p,{className:t.icon_arrow})})]})]})]})}export{de as default};
