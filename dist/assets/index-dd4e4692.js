import{u as h,o as g,r as x,m as j,n as f,j as e,F as t,t as b,e as v,P as N,p as r,I as o,V as C,S as I,s as c,B as S}from"./index-3e2d7128.js";import{C as w}from"./index-3cc3f15a.js";function k(){const[a,m]=h(),u=g(a),[l,n]=x.useState(!1),p=j(),d=f();return e.jsxs(t,{onChange:m,onOk:()=>{a.agreed?(n(!0),setTimeout(()=>{n(!1),d.dispatch(v.actions.setUser({id:450762342,name:"海盐芝士不加糖",phoneNumber:"189*****874",avatarUrl:"https://cdn.cnbj1.fds.api.mi-img.com/user-avatar/920d7ac3-25ee-4f5e-89ec-5b051d75616f.jpg"})),N.alert("恭喜您，注册成功！",()=>{p("/")})},1e3)):b.warning("请您同意用户条款")},children:[e.jsx(t.Item,{name:"phoneNumber",rules:[{required:!0,message:"请输入手机号"},{pattern:r.phoneNumber,message:"手机号格式错误"}],children:e.jsx(o,{placeholder:"手机号"})}),e.jsx(t.Item,{name:"verificationCode",rules:[{required:!0,message:"请输入验证码"},{pattern:r.verificationCode,message:"验证码格式错误"}],children:e.jsx(C,{onSend:()=>new Promise((s,i)=>{if(!a.phoneNumber||!r.phoneNumber.test(a.phoneNumber)){i("手机号格式错误");return}setTimeout(()=>{s()},1e3)})})}),e.jsx(t.Item,{name:"password",rules:[{required:!0,message:"请输入密码"},{pattern:r.password,message:"密码为8-20位的英文或数字"}],children:e.jsx(o,{placeholder:"密码",type:"password"})}),e.jsx(t.Item,{name:"password-repeat",rules:[{required:!0,message:"请确认密码"},{validator(s){return s!==u.current.password?Promise.reject("密码输入不一致"):Promise.resolve()}}],children:e.jsx(o,{placeholder:"确认密码",type:"password"})}),e.jsx(t.Item,{name:"agreed",children:e.jsx(w,{children:e.jsxs(I,{className:c.accept_terms,size:"0.4rem",children:["已阅读并同意小米帐号",e.jsx("a",{href:"https://account.xiaomi.com/about/protocol/agreement?_locale=zh_CN",target:"_blank",onClick:s=>{s.stopPropagation()},children:"用户协议"}),"和",e.jsx("a",{href:"https://account.xiaomi.com/about/protocol/privacy?_locale=zh_CN",target:"_blank",onClick:s=>{s.stopPropagation()},children:"隐私政策"})]})})}),e.jsx(t.Item,{children:e.jsx(S,{type:"submit",loading:l,className:c.btn_primary,children:"注册"})})]})}export{k as default};