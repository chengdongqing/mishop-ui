import{r as d,w as h,x as u,f as y,j as e,S as _,c as q}from"./index-ad9c4655.js";var N={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"}}]},name:"star",theme:"filled"};const g=N;var v=function(r,n){return d.createElement(h,u(u({},r),{},{ref:n,icon:g}))};v.displayName="StarFilled";const E=d.forwardRef(v),L="_item_qrfmm_1",R="_active_qrfmm_6",V="_disabled_qrfmm_9",w="_prefix_qrfmm_12",M="_suffix_qrfmm_17",t={item:L,active:R,disabled:V,prefix:w,suffix:M};function I({value:m,defaultValue:r=5,count:n=5,disabled:p,character:o=e.jsx(E,{}),prefix:s,suffix:a,onChange:x}){const[S,b,j]=y(m,r,x),l=p||j.disabled,[F,f]=d.useState(),i=F||S;return e.jsxs(_,{children:[!!s&&e.jsx("div",{className:t.prefix,children:typeof s=="function"?s(i):s}),e.jsx(_,{onMouseLeave:()=>{l||f(void 0)},children:Array(n).fill(null).map((A,c)=>e.jsx("div",{className:q(t.item,i>c&&t.active,l&&t.disabled),onMouseEnter:()=>{l||f(c+1)},onClick:()=>{l||b(c+1)},children:typeof o=="function"?o(i):o},c))}),!!a&&e.jsx("div",{className:t.suffix,children:typeof a=="function"?a(i):a})]})}export{I as R};
