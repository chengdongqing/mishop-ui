import{r as n,j as r,S as i,c as o}from"./index-3c767ab5.js";const l="_container_1g8us_1",p="_sep_1g8us_8",m="_item_1g8us_11",h="_active_1g8us_14",c={container:l,sep:p,item:m,active:h};function d({value:e,split:t="/"}){const a=n.useMemo(()=>{const s=[{label:"首页",href:"/"}];return Array.isArray(e)?s.push(...e):typeof e=="string"?s.push({label:e}):s.push(e),s},[e]);return r.jsx("div",{style:{backgroundColor:"var(--color-background)"},children:r.jsx("div",{className:c.container,children:r.jsx(i,{split:r.jsx("span",{className:c.sep,children:t}),children:a.map(s=>r.jsx("a",{href:s.href,className:o(c.item,!!s.href&&c.active),children:s.label},s.label))})})})}export{d as B};