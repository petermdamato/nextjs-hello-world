(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[152],{9060:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return w}});var a=n(7437);n(8266);var r=n(2265),i=n(4535),s=n(4908),l=e=>{let{context:t,valG:n,radialVal:r,radialValPrev:l,transform:o,innerRadius:c,lastMonthValue:h,lastMonthDegree:d,targetMonth:f,targetYear:g,leftRight:x,colorText:u,closeCall:m,topBottom:p}=e,y=Math.PI/180,M=e=>{let t=c+20;return[Math.cos(e*y)*t,Math.sin(e*y)*t]},v=e=>[m?e<-135?Math.cos(1.04*e*y)*(c+2):e<-90?Math.cos(1.02*e*y)*(c+2):Math.cos(.97*e*y)*(c+2):e<-135?Math.cos(1.04*e*y)*(c+11):e<-90?Math.cos(1.02*e*y)*(c+11):e>-45?Math.cos(.97*e*y)*(c+2):Math.cos(e*("left"===x?.97:1.15)*y)*(c+11),m?e<-135?Math.sin(1.05*e*y)*(c+2):e>-35?Math.sin(e*("bottom"===p?1.5:.5)*y)*(c+2):e>-55?Math.sin(e*("bottom"===p?1.5:.9)*y)*(c+2):Math.sin(1*e*y)*(c+2):e<-135?Math.sin(1.05*e*y)*(c+11):e>-45?Math.sin(1.5*e*y)*(c+2):Math.sin(1*e*y)*(c+11)],_=e=>[m?e<-135?Math.cos(.98*e*y)*(c+11):e>-45?Math.cos(1.1*e*y)*(c+10):e>-90?Math.cos(.98*e*y)*(c+20):Math.cos(1.02*e*y)*(c+20):e<-135?Math.cos(.98*e*y)*(c+11):e>-45?Math.cos(1.1*e*y)*(c+10):e>-90?Math.cos(.98*e*y)*(c+11):Math.cos(1.02*e*y)*(c+11),m?e>-40?Math.sin(.8*e*y)*(c+10):Math.sin(1*e*y)*(c+20):e>-40?Math.sin(.8*e*y)*(c+10):Math.sin(e*y)*(c+11)],j=(0,i.ET)();(0,i.ET)();let b=Math.PI/180*d,S=c+40,E=0+Math.cos(b)*c,C=0+Math.sin(b)*c,w=0+Math.cos(b)*S,A=0+Math.sin(b)*S;j.moveTo(E,C),j.lineTo(w,A);let Z=j.toString();return(0,a.jsx)(a.Fragment,{children:"inflation"===t?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("path",{d:Z,transform:o,style:{strokeWidth:2,stroke:"#d3d3d3",pointerEvents:"none"}}),(0,a.jsx)("text",{x:_(r)[0],y:_(r)[1],transform:o,style:{fontSize:s.Z.fontSizes.numbers,fontWeight:s.Z.fontWeights.heavy,filter:"blur(2px)",fill:"white",textAnchor:r>-90?"start":"end"},children:Math.round(10*n)/10+" %"}),(0,a.jsx)("text",{className:"bold-text",x:_(r)[0],y:_(r)[1],transform:o,style:{fontSize:s.Z.fontSizes.numbers,fontWeight:s.Z.fontWeights.heavy,fill:u,filter:"brightness(0.5)",textAnchor:r>-90?"start":"end"},children:Math.round(10*n)/10+" %"}),(0,a.jsx)("text",{x:v(d)[0],y:v(d)[1],transform:o,style:{fontSize:s.Z.fontSizes.numbers,fontWeight:s.Z.fontWeights.heavy,filter:"blur(2px)",fill:"white",textAnchor:l>-90?"start":"end"},children:Math.round(10*h)/10+" %"}),(0,a.jsx)("text",{x:v(d)[0],y:v(d)[1],transform:o,style:{fontSize:s.Z.fontSizes.numbers,fill:s.Z.fontColors.previousMonth,fontWeight:s.Z.fontWeights.normal,textAnchor:l>-90?"start":"end"},children:Math.round(10*h)/10+" %"})]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("circle",{r:3,cx:M(f)[0],cy:M(f)[1],transform:o,style:{fill:s.Z.circleColors.oneMonth,pointerEvents:"none"}}),(0,a.jsx)("circle",{r:6,cx:M(f)[0],cy:M(f)[1],transform:o,style:{fill:"none",strokeWidth:"2px",stroke:s.Z.circleColors.oneMonth,pointerEvents:"none"}}),(0,a.jsx)("circle",{r:5,cx:M(g)[0],cy:M(g)[1],transform:o,style:{fill:s.Z.circleColors.twelveMonth,pointerEvents:"none"}}),(0,a.jsx)("text",{x:_(r)[0],y:_(r)[1],transform:o,style:{fontSize:s.Z.fontSizes.numbers,fontWeight:s.Z.fontWeights.rates,filter:"blur(2px)",fill:"white",textAnchor:r>-90?"start":"end"},children:Math.round(100*n)/100+" %"}),(0,a.jsx)("text",{x:_(r)[0],y:r>-95&&r<-85?_(r)[1]+8:_(r)[1],transform:o,style:{fontSize:s.Z.fontSizes.numbers,fontWeight:s.Z.fontWeights.rates,fill:"black",textAnchor:r>-90?"start":"end"},children:Math.round(100*n)/100+" %"})]})})},o=n(8491),c=n(1315),h=n(717),d=e=>{let t,{context:n,labels:d,thickness:f,displayText:g,innerRadius:x,width:u,height:m,arcIndex:p,average:y,previous:M,current:v,targetMonth:_,targetYear:j,range:b,ranges:S}=e,E="inflation"===n?s.Z.vizColor.inflation:s.Z.vizColor.rates,[C,w]=(0,r.useState)(null),[A,Z]=(0,r.useState)("left"),[I,z]=(0,r.useState)("top"),[P,T]=(0,r.useState)(!1),[F,k]=(0,r.useState)(0),[B,W]=(0,r.useState)(0),R=(0,r.useRef)(null),L=(0,r.useRef)(null),D=Math.PI/180,N="inflation"===n?b:60*y,O=y-(N-y),V=(t="inflation"===n?(0,o.Z)().domain([O,N]).range([-180,0]):(0,o.Z)().domain([-1*S[3],-1*S[2],-1*S[1],-1*S[0],S[0],S[1],S[2],S[3]].map(e=>e)).range([-180,-152,-124,-96,-84,-56,-28,0]))(v),J=t(M),H=(0,c.wR)(-180,0,7).reverse(),U=(0,c.mW)(H,V);(0,r.useEffect)(()=>{w(U),Z(v>M?"right":"left"),z(V>-75&&v>M?"bottom":V<-135&&v<M?"bottom":"top"),T(V>-90&&V>J&&1>Math.abs(V-J)||V<-90&&V<J&&1>Math.abs(V-J)||V>-90&&V<J&&14>Math.abs(V-J)||V<-90&&V>J&&14>Math.abs(V-J)||4>Math.abs(V-J))},[V]),(0,r.useEffect)(()=>{R.current&&k(R.current.getBoundingClientRect().width)},[v]),(0,r.useEffect)(()=>{L.current&&W(L.current.getBoundingClientRect().width)},[M]);let X=x+f,Y=(X+x)/2-2,G=[],Q=[],q=[],K=(0,c.wR)(-180,0,7),$=(0,i.ET)(),ee=(0,i.ET)(),et="left"===A&&V>-90?.99:1,en="left"===A&&V>-90?0:F/Y*180/Math.PI;$.arc(u/2,m,Y,-(Math.PI/180*180),(t(v*et)+en)*(Math.PI/180));let ea=$.toString(),er=B/Y*180/Math.PI,ei=(0,c.dy)(K,t(M));t(M)>-92&&-88>t(M)?ee.arc(u/2,m,Y,-(Math.PI/180*180),Math.PI/180*(ei+er+2)):t(M)>=-88?ee.arc(u/2,m,Y,-(Math.PI/180*180),Math.PI/180*(ei+er+2)):ee.arc(u/2,m,Y,-(Math.PI/180*180),Math.PI/180*ei);let es=ee.toString();for(let e=0;e<7;e++){let t,n;let a=(0,i.ET)(),r=(0,i.ET)();3===e?(t=V<-90?Math.max(V,K[e]):-90,n=V>-90?Math.min(V,K[e+1]):-90):(t=e>=3||K[e]>V?K[e]+1:C&&V<K[e+1]&&V>K[e+1]-1?K[e+1]-1:V,n=e<=3||K[e+1]<V?K[e+1]-1:C&&V<K[C[0]]+1?K[e]+1:V);let s=Math.cos(t*D)*X,l=Math.sin(t*D)*X,o=Math.cos(n*D)*x,c=Math.sin(n*D)*x;r.arc(u/2,m,330,K[e]*(Math.PI/180),K[e+1]*(Math.PI/180));let h=r.toString();q.push(h),a.moveTo(s,l),a.arc(0,0,X,t*D,n*D),a.lineTo(o,c),a.arc(0,0,x,n*D,t*D,!0),a.closePath(),G.push(a.toString()),Q.push(!0)}return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("g",{children:(0,a.jsxs)("text",{ref:R,x:0,y:0,textAnchor:"middle",dominantBaseline:"middle",style:{opacity:0},children:[v,"%"]})}),(0,a.jsx)("g",{children:(0,a.jsxs)("text",{ref:L,x:0,y:0,textAnchor:"middle",dominantBaseline:"middle",style:{opacity:0},children:[M,"%"]})}),G.map((e,r)=>(0,a.jsxs)("g",{fill:E[r]||"red",children:[(0,a.jsx)("path",{d:e,transform:"translate(".concat(u/2,",").concat(m,")"),style:{opacity:3===r||C&&C.includes(r)?1:0}}),(0,a.jsx)("text",{x:0,y:0,textAnchor:"middle",dominantBaseline:"middle",style:{fontSize:12},children:(0,a.jsxs)("textPath",{xlinkHref:"#arc-".concat(r),startOffset:"50%",children:[(0,a.jsx)("tspan",{style:{fontSize:s.Z.fontSizes.legendArc,display:g?"":"none",filter:"brightness(0.8)"},x:0,dy:3===r?0:"-1.2em",children:"inflation"===n?h.Z.labels.inflation[r].split(" ")[0]:h.Z.labels.rates[r].split(" ")[0]}),(0,a.jsx)("tspan",{style:{fontSize:s.Z.fontSizes.legendArc,display:g?"":"none",filter:"brightness(0.8)"},x:0,dy:3===r?0:"1.2em",children:"inflation"===n?h.Z.labels.inflation[r].split(" ")[1]:h.Z.labels.rates[r].split(" ")[1]})]})}),(0,a.jsx)("path",{id:"arc-".concat(r),d:q[r],style:{fill:"none"}}),(0,a.jsx)("path",{id:"arc-curr-".concat(p),d:ea,style:{fill:"none"}}),(0,a.jsx)(l,{context:n,arcIndex:p,orbitPath:es,innerRadius:x,lastMonthValue:M,lastMonthDegree:ei,avgDeg:y,val:y,valG:v,radialScale:t,transform:"translate(".concat(u/2,",").concat(m,")"),offset:er,colorText:E[U[0]],leftRight:A,topBottom:I,closeCall:P,radialVal:V,radialValPrev:J,targetMonth:t(_),targetYear:t(j)})]},"arc-"+p+"-segment-"+r)),(0,a.jsx)("text",{transform:"translate(".concat(110+(f+5)*p,",").concat(m+8,") rotate(-90)"),textAnchor:"end",dominantBaseline:"middle",style:{fontSize:s.Z.fontSizes.indices,opacity:1},children:d[p]})]})},f=n(4202),g=e=>{let{context:t,thickness:n,innerRadius:r,width:s,height:l,arcIndex:o,avgDeg:h,redDeg:d}=e,g=Math.PI/180,x="inflation"===t?["#837C97","#92A7B1","#A0A27E","#FFDA98","#F6B26B","#DD7E6B","#A2525E"]:["#4a913c","#77af82","#a9e0db","#c8dfea","#f6d0d0","#dd9298","#a2525e"];(0,f.Z)().domain([-2,10]).range([-Math.PI,0]);let u=r+n,m=[],p=[],y=(0,c.wR)(-180,0,7),M=Math.cos((h<d?h:d)*g)*(u-r+5),v=Math.sin((h<d?h:d)*g)*(u-r+5),_=Math.cos((h>d?h:d)*g)*(u-r-5),j=Math.sin((h>d?h:d)*g)*(u-r-5),b=(0,i.ET)();b.moveTo(M,v),b.arc(0,0,r+n/2+2,(h<d?h:d)*g,(h>d?h:d)*g),b.lineTo(_,j),b.arc(0,0,r+n/2-2,(h>d?h:d)*g,(h<d?h:d)*g,!0),b.closePath(),b.toString();for(let e=0;e<7;e++){let t=(0,i.ET)(),n=(0,i.ET)(),a=0===e?y[e]:y[e]+1,o=6===e?y[e+1]:y[e+1]-1,c=Math.cos(a*g)*u,h=Math.sin(a*g)*u,d=Math.cos(o*g)*r,f=Math.sin(o*g)*r;n.arc(s/2,l,215,y[e]*(Math.PI/180),y[e+1]*(Math.PI/180));let x=n.toString();p.push(x),t.moveTo(c,h),t.arc(0,0,u,a*g,o*g),t.lineTo(d,f),t.arc(0,0,r,o*g,a*g,!0),t.closePath(),m.push(t.toString())}return(0,a.jsx)(a.Fragment,{children:m.map((e,t)=>t>=0?(0,a.jsx)("g",{fill:x[t],children:(0,a.jsx)("path",{d:e,transform:"translate(".concat(s/2,",").concat(l,")"),style:{opacity:.15}})},"arc-"+o+"-segment-"+t):(0,a.jsxs)("g",{fill:["#837C97","#92A7B1","#A0A27E","#FFDA98","#F6B26B","#DD7E6B","#A2525E"][t],children:[(0,a.jsx)("text",{x:0,y:0,textAnchor:"middle",dominantBaseline:"middle",style:{fontSize:10},children:(0,a.jsxs)("textPath",{xlinkHref:"#arc-".concat(t),startOffset:"50%",children:[(0,a.jsx)("tspan",{x:0,dy:3===t?0:"-1.2em",children:["Extremely Low","Significantly Low","Somewhat Low","Average","Somewhat Elevated","Significantly Elevated","Extremely Elevated"][t].split(" ")[0]}),(0,a.jsx)("tspan",{x:0,dy:3===t?0:"1.2em",children:["Extremely Low","Significantly Low","Somewhat Low","Average","Somewhat Elevated","Significantly Elevated","Extremely Elevated"][t].split(" ")[1]})]})}),(0,a.jsx)("path",{id:"arc-bg-".concat(t),d:p[t],style:{fill:"none"}})]},"arc-bg-"+o+"-segment-"+t))})};let x={fontSize:s.Z.fontSizes.legendLower,fill:s.Z.fontColors.previousMonth},u={fontSize:s.Z.fontSizes.legendLower,fontWeight:s.Z.fontWeights.heavy};var m=e=>{let{context:t,hoveredIndex:n,width:r,height:i}=e;return(0,a.jsx)("g",{transform:"translate(".concat(r/2+100,",").concat(i,")"),children:"inflation"===t?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("text",{x:"12",y:"34",style:{...u},children:h.Z.labels.legend.inflation[0]}),(0,a.jsx)("text",{x:"12",y:"54",style:{...x},children:h.Z.labels.legend.inflation[1]})]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("circle",{r:5,cx:0,cy:30,style:{fill:s.Z.circleColors.twelveMonth,pointerEvents:"none"}}),(0,a.jsx)("text",{x:"12",y:"34",style:{...u},children:h.Z.labels.legend.rates[0]}),(0,a.jsx)("circle",{r:3,cx:0,cy:50,style:{fill:s.Z.circleColors.oneMonth,pointerEvents:"none"}}),(0,a.jsx)("circle",{r:6,cx:0,cy:50,style:{fill:"none",strokeWidth:"2px",stroke:s.Z.circleColors.oneMonth,pointerEvents:"none"}}),(0,a.jsx)("text",{x:"12",y:"54",style:{...u},children:h.Z.labels.legend.rates[1]})]})})},p=n(5945);let y=[...[,,,,,].keys()],M=h.Z.labels.indices,v={change_cpi:3.11,change_pce:4.47,change_cpilfesl:3.87,change_pcepilfe:2.88,change_composite:2.64};var _=e=>{let{chartType:t,width:n,height:i}=e,s=["inflation","inflation_rate"][t],[l,o]=(0,r.useState)(null),[c,h]=(0,r.useState)([]);return(0,r.useEffect)(()=>{(async function(){let{data:e,error:t}=await p.O.from("inflation").select("*");e.reverse();let n=[],a=Object.keys(e[0]).slice(5,35);for(let t=0;t<5&&t<a.length;t++){let r={},i=4===t?a[t].split("_")[1]:a[3-t].split("_")[1];r.key=i,r.current=e[0]["change_"+i],r.average=e[0]["average_"+i],r.current_rate=e[0]["rate_"+i],r.average_rate=e[0]["average_rate_"+i],r.target_month=e[0]["target_month_"+i],r.target_year=e[0]["target_year_"+i],r.range=e[0]["95_"+i],r.ranges=e[0]["ranges_rate_"+i],r.previous=v["change_"+i],n.push(r)}h(n)})()},[]),(0,a.jsx)("svg",{width:n,height:i+100,children:c.length>0&&c[0].current>0?y.map((e,t)=>(0,a.jsxs)("g",{children:[(0,a.jsx)(g,{context:s,arcIndex:e,innerRadius:90+45*t,thickness:40,width:n,height:i},"arc-bg-"+e),(0,a.jsx)(d,{context:s,labels:M,displayText:!0,current:"inflation"===s?c[t].current:c[t].current_rate,average:"inflation"===s?c[t].average:c[t].average_rate,previous:c[t].previous,targetMonth:c[t].target_month,targetYear:c[t].target_year,range:c[t].range,ranges:JSON.parse(c[t].ranges),arcIndex:e,hoveredIndex:l,setHoveredIndex:o,innerRadius:90+45*t,thickness:40,width:n,height:i},"arc-fg-"+e),(0,a.jsx)(m,{context:s,hoveredIndex:l,width:n,height:i})]},"arc-g-bg-"+e)):""})},j=n(4379),b=n(6065),S=n(1167),E=n(9611),C=e=>{let{chartType:t,setChartType:n,clicked:r,setClicked:i}=e;return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(j.Z,{fullWidth:!0,children:[(0,a.jsx)(b.Z,{id:"chart-type-select-label",children:"Chart Type"}),(0,a.jsxs)(S.Z,{labelId:"chart-type-select-label",id:"chart-type-select",value:t,label:"Chart Type",onChange:e=>{n(e.target.value)},children:[(0,a.jsx)(E.Z,{value:0,children:"Inflation"}),(0,a.jsx)(E.Z,{value:1,children:"Rate of Change"})]})]})})},w=function(){let[e,t]=(0,r.useState)(0),[n,i]=(0,r.useState)(!0);return(0,a.jsxs)("div",{className:"App",children:[(0,a.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"20px"},children:(0,a.jsx)("div",{style:{width:"280px"},children:(0,a.jsx)(C,{chartType:e,setChartType:t,clicked:n,setClicked:i})})}),(0,a.jsx)(_,{chartType:e,width:800,height:500,clicked:n})]})}},717:function(e,t){"use strict";t.Z={walkthrough:[{text:"This dial shows how quickly inflation increased this most recent month. It’s not how much prices increased, but how fast the increases have accelerated (or decelerated) since the month before.",tail:"top"},{text:"The gray triangle displays the acceleration rate of inflation from the previous month, showing how fast the rate rose that month compared to the month before that.",tail:"left"},{text:"The Federal Reserve has a target of 2% for inflation, and leverages its monetary policy tools to get close to that target. The four-pointed star shows the necessary acceleration rate for inflation to reach the target over the next 12 months.",tail:"left"},{text:"Policy makers typically try to hit the inflation targets through gradual changes (think of the “soft landing” that was the focus for this current Fed leadership). The six-pointed star shows a more aggressive path, displaying how much the speed of inflation would have hypothetically needed to decelerate or accelerate to meet the Fed’s 2% target this month.",tail:"left"},{text:"Custom content",tail:""}],tooltips:{sample:"This is the first tooltip text component we've built for Volya"},labels:{inflation:["Extremely Low","Significantly Low","Somewhat Low","Average","Somewhat Elevated","Significantly Elevated","Extremely Elevated"],rates:["Falling Extremely","Falling Significantly","Falling Somewhat","Still","Rising Somewhat","Rising Significantly","Rising Extremely"],indices:["Composite","CPI","PCE","Core CPI","Core PCE"],legend:{inflation:["Current level of inflation","Previous month level of inflation"],rates:["Rate needed to reach Fed target over 12 months","Rate needed to reach Fed target this month"]}}}},4908:function(e,t){"use strict";t.Z={vizColor:{inflation:["#837C97","#92A7B1","#A0A27E","#FFDA98","#F6B26B","#DD7E6B","#A2525E"],rates:["#4a913c","#77af82","#a9e0db","#c8dfea","#f6d0d0","#dd9298","#a2525e"],fever:["#510337","#7C285A","#837C97","#92A7B1","#A0A27E","#F6B26B","#DD7E6B","#A2525E","#4C5C74","#2E3765"]},accessible:{inflation:["#6A848C","#81A993","#98C384","#F4DC89","#E8A775","#CA7A68","#A2525E"],rates:["#CDE9C8","#A7DACF","#94C8D3","#96B2CC","#9793BC","#A47096","#A2525E"]},fontColors:{currentMonth:"#007bff",previousMonth:"#6c757d"},circleColors:{oneMonth:"#8a323f",twelveMonth:"#000"},fontWeights:{heavy:"900",normal:"400",rates:"700"},fontSizes:{numbers:14,legendArc:14,legendLower:14,indices:14,innerLabels:12}}},5945:function(e,t,n){"use strict";n.d(t,{O:function(){return a}});let a=(0,n(1375).eI)("https://xhxzbiglouxlxaxvyzfy.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoeHpiaWdsb3V4bHhheHZ5emZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3NjkwMjEsImV4cCI6MjAyNzM0NTAyMX0.LyE1nqCrtt-0VSzWocgg5h705s9-NXsNg--CUh5wz88")},1315:function(e,t,n){"use strict";function a(e,t,n){let a=(t-e-(n-1)*0-10)/((n-1)*3),r=[];for(let t=0;t<=n;t++)t===n?r.push(0):4===t?r.push(e+10+(t-1)*a*3):t<4?r.push(e+t*a*3):t>4&&r.push(e+10+(t-1)*a*3);return r}function r(e,t,n,a){return[n/2+Math.cos(Math.PI/180*e)*t+(e<-140?10:0),a+Math.sin(e*Math.PI/180)*t]}function i(e,t){let n;for(let a=0;a<e.length;a++)if(t>e[a]){n=e.length-a-1;break}return 3===n?[3]:n<3?Array.from({length:3-n+1},(e,t)=>n+t):Array.from({length:n-3+1},(e,t)=>3+t).reverse()}function s(e,t){let n=null,a=1/0;for(let r=0;r<e.length;r++){let i=e[r];if(i-1<=t&&t<=i+1){let e=Math.abs(t-(i-1)),r=Math.abs(t-(i+1));e<r&&e<a?(n=i-1,a=e):r<=e&&r<a?(n=i+1,a=r):n=i}}return n||t}n.d(t,{dy:function(){return s},fD:function(){return r},mW:function(){return i},wR:function(){return a}})},8266:function(){},9671:function(e){e.exports={"arc-thick":"page_arc-thick__3Fl78",main:"page_main__GlU4n",description:"page_description__86bsR",code:"page_code__9lUUd",grid:"page_grid__f5Kdy",card:"page_card__QV0Om",center:"page_center__5oHG7",logo:"page_logo__7fc9l",content:"page_content__kDoxQ",headlineMetricName:"page_headlineMetricName__4n5Tp",headlineMetricNameContainer:"page_headlineMetricNameContainer__hLvxy",headlineMetricNameLine:"page_headlineMetricNameLine__O6cFt",vercelLogo:"page_vercelLogo__rOY_u",rotate:"page_rotate__durgN"}}}]);