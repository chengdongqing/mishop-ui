import{r as c,j as t,S as _,c as d}from"./index-ad9c4655.js";import{L as p}from"./LeftOutlined-cf638d40.js";import{R as N}from"./RightOutlined-6272dd96.js";const r="_container_at8wf_1",b="_item_at8wf_5",M="_active_at8wf_16",k="_disabled_at8wf_16",e={container:r,item:b,active:M,disabled:k},f=7;function C({current:s=1,pageSize:v=10,totalSize:m=10,onChange:n}){const i=c.useMemo(()=>m>0?Math.ceil(m/v):0,[v,m]),x=c.useMemo(()=>{if(i<=f)return[];const a=[];if(s<=3)for(let l=2;l<=4;l++)a.push(l);else if(s>i-3)for(let l=i-4;l<i;l++)a.push(l);else for(let l=s-2;l<=s+2;l++)a.push(l);return a},[s,i]),h=c.useMemo(()=>i>f&&s>3,[s,i]),j=c.useMemo(()=>i>f&&s<i-3,[s,i]);function o(a){a!==s&&(n==null||n(a))}return t.jsx("div",{className:e.container,children:t.jsxs(_,{size:"1rem",children:[t.jsx("div",{className:d(e.item,s<=1&&e.disabled),onClick:()=>{s>1&&o(s-1)},children:t.jsx(p,{})}),t.jsx("div",{className:d(e.item,s===1&&e.active),onClick:()=>{o(1)},children:"1"}),h&&t.jsx("div",{className:d(e.item,e.disabled),children:"..."}),x.map(a=>t.jsx("div",{className:d(e.item,s===a&&e.active),onClick:()=>{o(a)},children:a},a)),j&&t.jsx("div",{className:d(e.item,e.disabled),children:"..."}),i>1&&t.jsx("div",{className:d(e.item,s===i&&e.active),onClick:()=>{o(i)},children:i}),t.jsx("div",{className:d(e.item,s>=i&&e.disabled),onClick:()=>{s<i&&o(s+1)},children:t.jsx(N,{})})]})})}export{C as P};
