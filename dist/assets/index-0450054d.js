import{r as t,ab as k,j as w,c as y}from"./index-3e2d7128.js";function M({direction:n,children:l,autoplay:_,interval:I,circular:c,afterChange:i,beforeChange:a}){const[v,O]=t.useState(0),[Y,S]=t.useState(-1),[j,N]=t.useState(-1),[X,d]=t.useState(n),u=t.useRef(),p=t.useMemo(()=>t.Children.count(l),[l]),m=t.useCallback((f=!0,o=-1)=>{O(e=>{S(e);let s=o;return o===-1?f?(s=e<p-1?e+1:0,d(s===0&&!c?"reverse":"forward")):(d("reverse"),s=e>0?e-1:p-1):o>e?d("forward"):d("reverse"),N(s),a==null||a(e,s),s})},[a,c,p]),x=t.useCallback(()=>{_&&(clearInterval(u.current),u.current=setInterval(m,I))},[_,I,m]);return t.useEffect(()=>(x(),()=>{clearInterval(u.current)}),[x]),k(()=>{i==null||i(v)},[v,i]),[{activeIndex:v,prevIndex:Y,nextIndex:j,direction:X,timer:u,length:p},{switchIndex:m,startPlay:x}]}const P="_container_196tp_1",R="_swiper_item_196tp_4",A="_scrollX_196tp_9",D="_scrollY_196tp_10",$="_active_196tp_13",H="_fade_196tp_17",L="_prev_196tp_23",U="_forward_196tp_23",V="_scrollXOut1_196tp_1",q="_reverse_196tp_34",z="_scrollXOut2_196tp_1",B="_scrollYOut1_196tp_1",F="_scrollYOut2_196tp_1",G="_fadeOut_196tp_1",J="_next_196tp_78",K="_scrollXIn1_196tp_1",Q="_scrollXIn2_196tp_1",T="_scrollYIn1_196tp_1",W="_scrollYIn2_196tp_1",Z="_fadeIn_196tp_1",b="_indicator_dots_196tp_133",h="_dot_item_196tp_139",r={container:P,swiper_item:R,scrollX:A,scrollY:D,active:$,fade:H,prev:L,forward:U,scrollXOut1:V,reverse:q,scrollXOut2:z,scrollYOut1:B,scrollYOut2:F,fadeOut:G,next:J,scrollXIn1:K,scrollXIn2:Q,scrollYIn1:T,scrollYIn2:W,fadeIn:Z,indicator_dots:b,dot_item:h},C=t.forwardRef(({children:n,autoplay:l=!0,animation:_="scrollX",direction:I="forward",duration:c=800,interval:i=3e3,circular:a=!0,indicatorDots:v=!0,style:O,className:Y,afterChange:S,beforeChange:j},N)=>{const[{activeIndex:X,prevIndex:d,nextIndex:u,direction:p,timer:m,length:x},{switchIndex:f,startPlay:o}]=M({direction:I,children:n,autoplay:l,interval:i,circular:a,afterChange:S,beforeChange:j});function e(s){o(),f(!0,s)}return t.useImperativeHandle(N,()=>({next(){o(),f()},prev(){o(),f(!1)},to:e})),w.jsxs("div",{style:{...O||{},"--duration":`${c}ms`},className:y(r.container,Y),onMouseEnter:()=>{clearInterval(m.current)},onMouseLeave:o,children:[t.Children.map(n,(s,E)=>w.jsx("div",{className:y(r.swiper_item,r[_],r[p],E===X&&r.active,d===E&&r.prev,u===E&&r.next),children:s})),v&&w.jsx(g,{length:x,current:X,onChange:e})]})});function g({length:n,current:l,onChange:_}){return w.jsx("div",{className:r.indicator_dots,children:Array(n).fill(null).map((I,c)=>w.jsx("div",{className:y(r.dot_item,c===l&&r.active),onClick:()=>{_(c)}},c))})}const et=C;export{et as S};