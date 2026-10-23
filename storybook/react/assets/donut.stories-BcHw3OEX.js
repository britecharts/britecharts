import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{$ as r,S as i,_ as a,b as o,c as s,dt as c,et as l,f as u,ft as d,g as f,i as p,l as m,lt as h,n as g,o as _,p as v,r as y,s as b,t as x,u as S,x as C,y as w}from"./useChart-BW1kPAiP.js";import{n as T,t as E}from"./pointer-Djj9AZUl.js";import{a as D,n as O}from"./number-B2IPLZ5W.js";import{n as k,t as A}from"./ordinal-IS2QGGJs.js";import{d as j,f as M,i as N,o as P}from"./load-CFrz5JFm.js";import{C as ee,E as F,S as te,T as I,_ as L,a as R,b as z,g as B,h as ne,m as re,o as ie,p as ae,r as oe,w as V,x as se,y as ce}from"./constants-C5vU1Sjl.js";import{i as H,r as le}from"./text-COi1zQqG.js";import{n as ue,t as de}from"./export-BiMpbFYg.js";import{n as fe,r as U,t as pe}from"./array-IaPunsih.js";import{n as W,t as G}from"./path-CfFMbpX4.js";import{n as me,t as he}from"./keyboard-DWus7Zyg.js";import{n as ge,t as _e}from"./Legend-X7VCkeIP.js";function ve(e){return e.innerRadius}function ye(e){return e.outerRadius}function be(e){return e.startAngle}function xe(e){return e.endAngle}function Se(e){return e&&e.padAngle}function Ce(e,t,n,r,i,a,o,s){var c=n-e,l=r-t,u=o-i,d=s-a,f=d*c-u*l;if(!(f*f<1e-12))return f=(u*(t-a)-d*(e-i))/f,[e+f*c,t+f*l]}function we(e,t,n,r,i,a,o){var s=e-n,c=t-r,l=(o?a:-a)/I(s*s+c*c),u=l*c,d=-l*s,f=e+u,p=t+d,m=n+u,h=r+d,g=(f+m)/2,_=(p+h)/2,v=m-f,y=h-p,b=v*v+y*y,x=i-a,S=f*h-m*p,C=(y<0?-1:1)*I(se(0,x*x*b-S*S)),w=(S*y-v*C)/b,T=(-S*v-y*C)/b,E=(S*y+v*C)/b,D=(-S*v+y*C)/b,O=w-g,k=T-_,A=E-g,j=D-_;return O*O+k*k>A*A+j*j&&(w=E,T=D),{cx:w,cy:T,x01:-u,y01:-d,x11:w*(i/x-1),y11:T*(i/x-1)}}function Te(){var e=ve,t=ye,n=U(0),r=null,i=be,a=xe,o=Se,s=null,c=W(l);function l(){var l,u,d=+e.apply(this,arguments),f=+t.apply(this,arguments),p=i.apply(this,arguments)-ce,m=a.apply(this,arguments)-ce,h=ae(m-p),g=m>p;if(s||=l=c(),f<d&&(u=f,f=d,d=u),!(f>1e-12))s.moveTo(0,0);else if(h>F-1e-12)s.moveTo(f*L(p),f*V(p)),s.arc(0,0,f,p,m,!g),d>1e-12&&(s.moveTo(d*L(m),d*V(m)),s.arc(0,0,d,m,p,g));else{var _=p,v=m,y=p,b=m,x=h,S=h,C=o.apply(this,arguments)/2,w=C>1e-12&&(r?+r.apply(this,arguments):I(d*d+f*f)),T=te(ae(f-d)/2,+n.apply(this,arguments)),E=T,D=T,O,k;if(w>1e-12){var A=ne(w/d*V(C)),j=ne(w/f*V(C));(x-=A*2)>1e-12?(A*=g?1:-1,y+=A,b-=A):(x=0,y=b=(p+m)/2),(S-=j*2)>1e-12?(j*=g?1:-1,_+=j,v-=j):(S=0,_=v=(p+m)/2)}var M=f*L(_),N=f*V(_),P=d*L(b),R=d*V(b);if(T>1e-12){var z=f*L(v),ie=f*V(v),oe=d*L(y),se=d*V(y),H;if(h<ee){if(H=Ce(M,N,oe,se,z,ie,P,R)){var le=M-H[0],ue=N-H[1],de=z-H[0],fe=ie-H[1],U=1/V(re((le*de+ue*fe)/(I(le*le+ue*ue)*I(de*de+fe*fe)))/2),pe=I(H[0]*H[0]+H[1]*H[1]);E=te(T,(d-pe)/(U-1)),D=te(T,(f-pe)/(U+1))}else E=D=0}}S>1e-12?D>1e-12?(O=we(oe,se,M,N,f,D,g),k=we(z,ie,P,R,f,D,g),s.moveTo(O.cx+O.x01,O.cy+O.y01),D<T?s.arc(O.cx,O.cy,D,B(O.y01,O.x01),B(k.y01,k.x01),!g):(s.arc(O.cx,O.cy,D,B(O.y01,O.x01),B(O.y11,O.x11),!g),s.arc(0,0,f,B(O.cy+O.y11,O.cx+O.x11),B(k.cy+k.y11,k.cx+k.x11),!g),s.arc(k.cx,k.cy,D,B(k.y11,k.x11),B(k.y01,k.x01),!g))):(s.moveTo(M,N),s.arc(0,0,f,_,v,!g)):s.moveTo(M,N),!(d>1e-12)||!(x>1e-12)?s.lineTo(P,R):E>1e-12?(O=we(P,R,z,ie,d,-E,g),k=we(M,N,oe,se,d,-E,g),s.lineTo(O.cx+O.x01,O.cy+O.y01),E<T?s.arc(O.cx,O.cy,E,B(O.y01,O.x01),B(k.y01,k.x01),!g):(s.arc(O.cx,O.cy,E,B(O.y01,O.x01),B(O.y11,O.x11),!g),s.arc(0,0,d,B(O.cy+O.y11,O.cx+O.x11),B(k.cy+k.y11,k.cx+k.x11),g),s.arc(k.cx,k.cy,E,B(k.y11,k.x11),B(k.y01,k.x01),!g))):s.arc(0,0,d,b,y,g)}if(s.closePath(),l)return s=null,l+``||null}return l.centroid=function(){var n=(+e.apply(this,arguments)+ +t.apply(this,arguments))/2,r=(+i.apply(this,arguments)+ +a.apply(this,arguments))/2-ee/2;return[L(r)*n,V(r)*n]},l.innerRadius=function(t){return arguments.length?(e=typeof t==`function`?t:U(+t),l):e},l.outerRadius=function(e){return arguments.length?(t=typeof e==`function`?e:U(+e),l):t},l.cornerRadius=function(e){return arguments.length?(n=typeof e==`function`?e:U(+e),l):n},l.padRadius=function(e){return arguments.length?(r=e==null?null:typeof e==`function`?e:U(+e),l):r},l.startAngle=function(e){return arguments.length?(i=typeof e==`function`?e:U(+e),l):i},l.endAngle=function(e){return arguments.length?(a=typeof e==`function`?e:U(+e),l):a},l.padAngle=function(e){return arguments.length?(o=typeof e==`function`?e:U(+e),l):o},l.context=function(e){return arguments.length?(s=e??null,l):s},l}function Ee(){return(Ee=t((()=>{z(),G()})))()}function De(e,t){return t<e?-1:t>e?1:t>=e?0:NaN}function Oe(e){return e}function ke(){var e=Oe,t=De,n=null,r=U(0),i=U(F),a=U(0);function o(o){var s,c=(o=pe(o)).length,l,u,d=0,f=Array(c),p=Array(c),m=+r.apply(this,arguments),h=Math.min(F,Math.max(-F,i.apply(this,arguments)-m)),g,_=Math.min(Math.abs(h)/c,a.apply(this,arguments)),v=_*(h<0?-1:1),y;for(s=0;s<c;++s)(y=p[f[s]=s]=+e(o[s],s,o))>0&&(d+=y);for(t==null?n!=null&&f.sort(function(e,t){return n(o[e],o[t])}):f.sort(function(e,n){return t(p[e],p[n])}),s=0,u=d?(h-c*v)/d:0;s<c;++s,m=g)l=f[s],y=p[l],g=m+(y>0?y*u:0)+v,p[l]={data:o[l],index:s,value:y,startAngle:m,endAngle:g,padAngle:_};return p}return o.value=function(t){return arguments.length?(e=typeof t==`function`?t:U(+t),o):e},o.sortValues=function(e){return arguments.length?(t=e,n=null,o):t},o.sort=function(e){return arguments.length?(n=e,t=null,o):n},o.startAngle=function(e){return arguments.length?(r=typeof e==`function`?e:U(+e),o):r},o.endAngle=function(e){return arguments.length?(i=typeof e==`function`?e:U(+e),o):i},o.padAngle=function(e){return arguments.length?(a=typeof e==`function`?e:U(+e),o):a},o}function Ae(){return(Ae=t((()=>{fe(),z()})))()}function je(){let e={top:0,right:0,bottom:0,left:0},t=300,n=300,i=!1,o=12,s=ie.duration,c,l,u,p=140,m=45.5,g,_,y,b,x=!1,S=!1,E,D,A=!1,j=!0,P=!1,ee=null,F={emptySliceColor:`var(--bc-skeleton, #eff2f5)`,showEmptySlice:!1},te=`.1f`,I=null,L=!0,R,z=null,B=null,ne=w.colorSchemas.britecharts,re=e=>`${e.percentage}% ${e.name}`,ae=(e,t)=>t.quantity-e.quantity,V=h,se=p+m,ce=`quantity`,le=e=>{e.outerRadius=p-o},ue=e=>e.reduce((e,t)=>t.quantity+e,0),fe=({quantity:e})=>e,U=({name:e})=>e,pe=({data:e})=>z[e.name],W=r(`customMouseOver`,`customMouseOut`,`customMouseMove`,`customClick`);function G(r){r.each(function(r){l=t-(e.left??0)-(e.right??0),u=n-(e.top??0)-(e.bottom??0),c=De(r),Ee(this),a(b.node(),xe&&!i?we():null),he(b.node(),{isEnabled:Se&&!i,stops:Ce}),i?Ne():(Ae(),_e(),me(),ve(),Pe(),q(),E&&ze(),S&&F.showEmptySlice&&je())})}function me(){ne&&(R=k().range(ne),z=C(R.domain(c.map(U)).domain().reduce((e,t)=>(e[t]=R(t),e),{}),B))}function ge(){let e=b.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${t/2}, ${n/2})`);b.append(`g`).classed(`loading-state-group`,!0),e.append(`g`).classed(`chart-group`,!0),e.append(`g`).classed(`legend-group`,!0)}function _e(){g=ke().padAngle(0).value(fe).sort(ae)}function ve(){_=Te().innerRadius(m).padRadius(p)}let ye=null,be=null,xe=!0,Se=!0;function Ce(){return b.selectAll(`g.arc path`).nodes().map(e=>({target:e}))}function we(){return{columns:[`Name`,`Quantity`,`Percentage`],rows:c.map(e=>[e.name,e.quantity,`${e.percentage}%`])}}function Ee(e){b||(b=d(e).append(`svg`).classed(`britechart donut-chart`,!0),ge()),b.attr(`viewBox`,[0,0,t,n]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,t).attr(`height`,n),v(b.node(),{a11yTitle:ye,a11yDescription:be,fallbackTitle:`Donut chart`})}function De(e){let t=e.reduce((e,t)=>{if(t[ce]===void 0||t[ce]===null)return e;let n=t;return n.quantity=+t[ce],n.name=String(t.name),n.percentage=t.percentage||null,[...e,n]},[]),n=ue(t);return n===0&&F.showEmptySlice&&(S=!0),t.map(e=>{let t=e;return t.percentage=String(e.percentage||O(e[ce],n,te)),t})}function Oe(){b.select(`.donut-text`).text(``)}function Ae(){b.select(`.loading-state-group svg`).remove()}function je(){y&&b.selectAll(`g.arc`).remove(),y=b.select(`.chart-group`).selectAll(`g.arc`).data(g(oe)),y.enter().append(`g`).each(le).classed(`arc`,!0).append(`path`).merge(y).style(`fill`,F.emptySliceColor).attr(`d`,_).transition().ease(V).duration(s).attrTween(`d`,Y),y.exit().remove()}function Me(e){e.data&&L&&(b.select(`.donut-text`).text(()=>re(e.data)).attr(`dy`,`.2em`).attr(`text-anchor`,`middle`),b.select(`.donut-text`).call(Be,se))}function Ne(){b.select(`.loading-state-group`).html(N)}function Pe(){y&&b.selectAll(`g.arc`).remove(),y=b.select(`.chart-group`).selectAll(`g.arc`).data(g(c));let e=y.enter().append(`g`).each(le).classed(`arc`,!0).append(`path`);x&&!f()?e.merge(y).attr(`fill`,pe).on(`mouseover`,function(e,t){Ie(this,t,l,u,e)}).on(`mousemove`,function(e,t){Le(this,t,l,u,e)}).on(`mouseout`,function(e,t){K(this,t,l,u,e)}).on(`click`,function(e,t){Re(this,t,l,u,e)}).transition().ease(V).duration(s).attrTween(`d`,Y):e.merge(y).attr(`fill`,pe).attr(`d`,_).on(`mouseover`,function(e,t){Ie(this,t,l,u,e)}).on(`mousemove`,function(e,t){Le(this,t,l,u,e)}).on(`mouseout`,function(e,t){K(this,t,l,u,e)}).on(`click`,function(e,t){Re(this,t,l,u,e)}),y.exit().remove()}function Fe({data:e}){if(e.id===E)return this}function Ie(e,t,n,r,i){Me(t),W.call(`customMouseOver`,e,t,T(i,e),[n,r]),j&&(ee&&e!==ee&&J(ee,p-o,150),D&&e!==D&&J(D,p-o),J(e,p))}function Le(e,t,n,r,i){W.call(`customMouseMove`,e,t,T(i,e),[n,r])}function K(e,t,n,r,i){Oe(),D&&A&&!P&&(Me(D.__data__),J(D,p)),(e!==D||!A&&e===D)&&J(e,p-o,150),P&&(Me(e.__data__),J(e,p),ee=e),W.call(`customMouseOut`,e,t,T(i,e),[n,r])}function Re(e,t,n,r,i){W.call(`customClick`,e,t,T(i,e),[n,r])}function ze(){D=b.selectAll(`.chart-group .arc path`).select(Fe).node(),D&&(Me(D.__data__),J(D,p,s))}function q(){b.select(`.legend-group`).append(`text`).attr(`class`,`donut-text`)}function J(e,t,n=0){d(e).transition().delay(n).attrTween(`d`,function(e){let n=M(e.outerRadius,t);return t=>(e.outerRadius=n(t),_(e))})}function Y(e){e.innerRadius=0;let t=M({startAngle:0,endAngle:0},e);return function(e){return _(t(e))}}function Be(e,t){let n=p/5;H.call(null,0,n,t,e.node())}return G.a11yTitle=function(e){return arguments.length?(ye=e,this):ye},G.a11yDescription=function(e){return arguments.length?(be=e,this):be},G.a11yDataTable=function(e){return arguments.length?(xe=e,this):xe},G.a11yKeyboardNavigation=function(e){return arguments.length?(Se=e,this):Se},G.animationDuration=function(e){return arguments.length?(s=e,this):s},G.centeredTextFunction=function(e){return arguments.length?(re=e,this):re},G.colorMap=function(e){return arguments.length?(B=e,this):B},G.colorSchema=function(e){return arguments.length?(ne=e,this):ne},G.emptyDataConfig=function(e){return arguments.length?(F=e,this):F},G.exportChart=function(e,t){return de.call(G,b,e,t)},G.externalRadius=function(e){return arguments.length?(p=e,this):p},G.hasCenterLegend=function(e){return arguments.length?(L=e,this):L},G.hasHoverAnimation=function(e){return arguments.length?(j=e,this):j},G.hasFixedHighlightedSlice=function(e){return arguments.length?(A=e,this):A},G.hasLastHoverSliceHighlighted=function(e){return arguments.length?(P=e,this):P},G.height=function(e){return arguments.length?(n=e,this):n},G.highlightSliceById=function(e){return arguments.length?(E=e,this):E},G.internalRadius=function(e){return arguments.length?(m=e,this):m},G.isAnimated=function(e){return arguments.length?(x=e,this):x},G.isLoading=function(e){return arguments.length?(i=e,this):i},G.margin=function(t){return arguments.length?(e={...e,...t},this):e},G.numberFormat=function(e){return arguments.length?(I=e,this):I},G.on=function(...e){let t=W.on(...e);return t===W?G:t},G.orderingFunction=function(e){return arguments.length?(ae=e,this):ae},G.percentageFormat=function(e){return arguments.length?(te=e,this):te},G.radiusHoverOffset=function(e){return arguments.length?(o=e,this):o},G.width=function(e){return arguments.length?(t=e,this):t},G}function Me(){return(Me=t((()=>{l(),j(),A(),Ae(),Ee(),c(),E(),i(),ue(),le(),o(),D(),R(),P(),u(),me()})))()}var Ne;function Pe(){return(Pe=t((()=>{Ne={type:`object`,properties:{a11yDataTable:{type:`boolean`},a11yDescription:{anyOf:[{type:`null`},{type:`string`}]},a11yKeyboardNavigation:{type:`boolean`},a11yTitle:{anyOf:[{type:`null`},{type:`string`}]},animationDuration:{type:`number`},centeredTextFunction:{not:{}},colorMap:{type:`object`,additionalProperties:{type:`string`}},colorSchema:{type:`array`,items:{type:`string`}},customBrushEnd:{not:{}},customBrushStart:{not:{}},customClick:{not:{}},customMouseMove:{not:{}},customMouseOut:{not:{}},customMouseOver:{not:{}},emptyDataConfig:{type:`object`,properties:{emptySliceColor:{type:`string`},showEmptySlice:{type:`boolean`}},required:[`emptySliceColor`,`showEmptySlice`]},exportChart:{type:`string`},externalRadius:{type:`number`},hasCenterLegend:{type:`boolean`},hasFixedHighlightedSlice:{type:`boolean`},hasHoverAnimation:{type:`boolean`},hasLastHoverSliceHighlighted:{type:`boolean`},height:{type:`number`},highlightSliceById:{type:`number`},internalRadius:{type:`number`},isAnimated:{type:`boolean`},isLoading:{type:`boolean`},margin:{type:`object`,properties:{left:{type:`number`},right:{type:`number`},top:{type:`number`},bottom:{type:`number`}}},numberFormat:{type:`string`},orderingFunction:{not:{}},percentageFormat:{type:`string`},radiusHoverOffset:{type:`number`},width:{type:`number`}},additionalProperties:!1}})))()}var Fe;function Ie(){return(Ie=t((()=>{c(),Me(),s(),b(),y(),Pe(),Fe={create(e,t,n={}){let r=d(e),i=je();return S(r),m(i,n,`donut`,Ne),r.datum(t).call(_(i,n)),i},update(e,t,n={},r){let i=d(e);return S(i),m(r,n,`donut`,Ne),_(r,n),t&&t.length?i.datum(t).call(r):i.call(r),r},destroy:p}})))()}var Le,K;function Re(){return(Re=t((()=>{Le=e(n(),1),Ie(),x(),K=({chart:e=Fe,isAnimated:t=!0,createTooltip:n,data:r,...i})=>{let a=g(e,r,{isAnimated:t,...i});return Le.createElement(`div`,{className:`donut-container`,style:{textAlign:`center`},ref:a})},K.__docgenInfo={description:``,methods:[],displayName:`Donut`,props:{a11yTitle:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`The name screen readers announce for the chart, set as its svg's
\`aria-label\`. Unset, the chart is announced by its type, such as "Bar chart".`},a11yDescription:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:"A longer description screen readers announce after the name, such as\nwhat the data shows, rendered as the svg's `<desc>`."},a11yDataTable:{required:!1,tsType:{name:`boolean`},description:`Whether the chart renders its data as a visually hidden table after its
svg, which screen readers can read cell by cell. On by default.`},a11yKeyboardNavigation:{required:!1,tsType:{name:`boolean`},description:`Whether a keyboard can move through the chart's data points: the chart
takes one tab stop, the arrow keys move between points and the tooltip
follows. On by default.`},data:{required:!0,tsType:{name:`union`,raw:`DonutChartDataShape[] | null`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [DonutChartKeys.Name]: string;
    [DonutChartKeys.Quantity]: number;
    /** Computed from the quantities when not given. */
    [DonutChartKeys.Percentage]?: number;
    /** Only the legend feature needs it. */
    [DonutChartKeys.ID]?: number;
}`,signature:{properties:[]}}],raw:`DonutChartDataShape[]`},{name:`null`}]},description:`Internally used, do not overwrite.

Required. \`null\` means the data has not arrived yet: nothing is drawn
until it does. Leaving it out is an error.`},animationDuration:{required:!1,tsType:{name:`number`},description:`Gets or Sets the duration of the animation`},centeredTextFunction:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(datum: DonutChartDataShape) => string`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
    [DonutChartKeys.Name]: string;
    [DonutChartKeys.Quantity]: number;
    /** Computed from the quantities when not given. */
    [DonutChartKeys.Percentage]?: number;
    /** Only the legend feature needs it. */
    [DonutChartKeys.ID]?: number;
}`,signature:{properties:[]}},name:`datum`}],return:{name:`string`}}},description:'Gets or Sets the centeredTextFunction of the chart. If function is provided the format will be changed by the custom function\'s value format. The default format function value is "${d.percentage}% ${d.name}". The callback will provide the data object with id, name, percentage, and quantity. Also provides the component added by the user in each data entry'},colorMap:{required:!1,tsType:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`},description:`Current colorMap or Chart module to chain calls`},colorSchema:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`Gets or Sets the colorSchema of the chart`},emptyDataConfig:{required:!1,tsType:{name:`DonutEmptyDataConfig`},description:`Gets or Sets the emptyDataConfig of the chart. If set and data is empty (quantity adds up to zero or there are no entries), the chart will render an empty slice with a given color (light gray by default)`},exportChart:{required:!1,tsType:{name:`string`},description:`The filename to export the chart to. Setting it exports the chart and fires
a download, which is what the chart's \`exportChart\` command does; it is
not a callback. The chart's exporter treats the title as optional, so a
filename on its own is enough.
A filename ending in \`.svg\` downloads an svg file, and any other a png.`},externalRadius:{required:!1,tsType:{name:`number`},description:`Gets or Sets the externalRadius of the chart`},hasCenterLegend:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the hasCenterLegend property of the chart, making it
display the legend at the center of the donut. By default this is 'true'`},hasFixedHighlightedSlice:{required:!1,tsType:{name:`boolean`},description:"Gets or Sets the hasFixedHighlightedSlice property of the chart, making it\nto highlight the selected slice id set with `highlightSliceById` all the time."},hasHoverAnimation:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the hasHoverAnimation property of the chart. By default, donut chart highlights the hovered slice. This property explicitly disables this hover behavior.`},hasLastHoverSliceHighlighted:{required:!1,tsType:{name:`boolean`},description:`Gets or sets the hasLastHoverSliceHighlighted property.
If property is true, the last hovered slice will be highlighted after 'mouseout\` event is triggered.
The last hovered slice will remain in highlight state. Note: if both hasFixedHighlightedSlice and hasLastHoverSliceHighlighted are true, the latter property will override the former.`},height:{required:!1,tsType:{name:`number`},description:`Gets or Sets the height of the chart`},highlightSliceById:{required:!1,tsType:{name:`number`},description:`Gets or Sets the id of the slice to highlight`},internalRadius:{required:!1,tsType:{name:`number`},description:`Gets or Sets the internalRadius of the chart`},isAnimated:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the isAnimated property of the chart, making it to animate
when render. By default this is 'false'`,defaultValue:{value:`true`,computed:!1}},isLoading:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets whether a loading state will be shown`},margin:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}`,signature:{properties:[{key:`top`,value:{name:`number`,required:!1}},{key:`bottom`,value:{name:`number`,required:!1}},{key:`left`,value:{name:`number`,required:!1}},{key:`right`,value:{name:`number`,required:!1}}]}},description:`Gets or Sets the margin of the chart`},numberFormat:{required:!1,tsType:{name:`string`},description:`Gets or Sets the number format of the donut chart`},orderingFunction:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(
    a: DonutChartDataShape,
    b: DonutChartDataShape
) => number`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
    [DonutChartKeys.Name]: string;
    [DonutChartKeys.Quantity]: number;
    /** Computed from the quantities when not given. */
    [DonutChartKeys.Percentage]?: number;
    /** Only the legend feature needs it. */
    [DonutChartKeys.ID]?: number;
}`,signature:{properties:[]}},name:`a`},{type:{name:`signature`,type:`object`,raw:`{
    [DonutChartKeys.Name]: string;
    [DonutChartKeys.Quantity]: number;
    /** Computed from the quantities when not given. */
    [DonutChartKeys.Percentage]?: number;
    /** Only the legend feature needs it. */
    [DonutChartKeys.ID]?: number;
}`,signature:{properties:[]}},name:`b`}],return:{name:`number`}}},description:`Changes the order of items given custom function`},percentageFormat:{required:!1,tsType:{name:`string`},description:`Gets or Sets the percentage format for the percentage label`},radiusHoverOffset:{required:!1,tsType:{name:`number`},description:`Gets or Sets the radiusHoverOffset of the chart`},width:{required:!1,tsType:{name:`number`},description:`Gets or Sets the width of the chart`},customMouseOver:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:``},customMouseOut:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:``},customMouseMove:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:``},customClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:``},chart:{required:!1,tsType:{name:`Wrapper`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [DonutChartKeys.Name]: string;
    [DonutChartKeys.Quantity]: number;
    /** Computed from the quantities when not given. */
    [DonutChartKeys.Percentage]?: number;
    /** Only the legend feature needs it. */
    [DonutChartKeys.ID]?: number;
}`,signature:{properties:[]}}],raw:`DonutChartDataShape[]`},{name:`intersection`,raw:`ChartModuleSelection<DonutChartDataShape[]> &
DonutChartAPI`,elements:[{name:`signature`,type:`function`,raw:`<
    TElement extends Element,
    TParent extends Element | null,
    TParentDatum,
>(
    _selection: Selection<TElement, DataShape, TParent, TParentDatum>
) => void`,signature:{arguments:[{type:{name:`Selection`,elements:[{name:`TElement`},{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [DonutChartKeys.Name]: string;
    [DonutChartKeys.Quantity]: number;
    /** Computed from the quantities when not given. */
    [DonutChartKeys.Percentage]?: number;
    /** Only the legend feature needs it. */
    [DonutChartKeys.ID]?: number;
}`,signature:{properties:[]}}],raw:`DonutChartDataShape[]`},{name:`TParent`},{name:`TParentDatum`}],raw:`Selection<TElement, DataShape, TParent, TParentDatum>`},name:`_selection`}],return:{name:`void`}}},{name:`DonutChartAPI`}]}],raw:`Wrapper<DonutChartDataShape[], DonutChartModule>`},description:`Internally used, do not overwrite.`,defaultValue:{value:`{
    create(el, data, configuration = {}) {
        const container = select<HTMLElement, DonutChartDataShape[]>(el);
        const chart = donut();

        validateContainer(container);
        validateConfiguration(chart, configuration, 'donut', schema);

        // Calls the chart with the container and dataset
        container.datum(data).call(applyConfiguration(chart, configuration));

        return chart;
    },

    update(el, data, configuration = {}, chart) {
        const container = select<HTMLElement, DonutChartDataShape[]>(el);

        validateContainer(container);
        validateConfiguration(chart, configuration, 'donut', schema);
        applyConfiguration(chart, configuration);

        // Calls the chart with the container and dataset.
        //
        // \`data && data.length\`, so an update with no data -- empty, null or
        // undefined -- keeps whatever is already bound, as every wrapper does.
        if (data && data.length) {
            container.datum(data).call(chart);
        } else {
            container.call(chart);
        }

        return chart;
    },

    destroy: removeChartSvg,
}`,computed:!1}},createTooltip:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Internally used, do not overwrite.

Accepted and deliberately dropped: a Tooltip hands this to every chart
it decorates, and this component takes it out of the configuration
rather than passing it on. Declared so a TypeScript consumer using
Tooltip's render prop around a Donut can pass it.

@ignore`}}}})))()}var ze,q;function J(){return(J=t((()=>{ze=()=>[{quantity:60,percentage:60,name:`React`,id:1},{quantity:20,percentage:20,name:`Ember`,id:2},{quantity:10,percentage:10,name:`Angular`,id:3},{quantity:10,percentage:10,name:`Backbone`,id:4}],q={with4Slices:ze}})))()}var Y,Be,X,Z,Q,$,Ve,He,Ue,We,Ge;function Ke(){return(Ke=t((()=>{Y=e(n(),1),Re(),ge(),J(),Be={title:`Charts/Donut`,component:K},X=e=>{let t=q.with4Slices();return Y.createElement(K,{...e,data:t})},X.args={isAnimated:!1},X.parameters={controls:{exclude:[`data`,`chart`,`createTooltip`]}},Z=()=>{let e=q.with4Slices(),t={top:10,bottom:10,left:0,right:30},[n,r]=Y.useState();return Y.createElement(`div`,{style:{display:`flex`,alignItems:`center`}},Y.createElement(K,{data:e,height:500,width:500,externalRadius:200,internalRadius:100,isAnimated:!1,highlightSliceById:n,customMouseOver:(e=>{r(e.data.id)}).bind(void 0),customMouseOut:(()=>{r(99999)}).bind(void 0)}),Y.createElement(_e,{data:q.with4Slices(),height:(e.length+1)*40,width:300,margin:t,highlightEntryById:n}))},Q=()=>{let e=q.with4Slices(),[t,n]=Y.useState(2);return Y.createElement(`div`,{style:{display:`flex`,alignItems:`center`}},Y.createElement(K,{data:e,height:400,width:500,externalRadius:500/3.5,internalRadius:500/7,isAnimated:!1,highlightSliceById:2,hasFixedHighlightedSlice:!0,customMouseOver:e=>n(e.data.id),customMouseOut:()=>n(2)}),Y.createElement(_e,{data:e,height:(e.length+1)*40,width:300,highlightEntryById:t}))},$=()=>{let e=q.with4Slices();return Y.createElement(K,{data:e,isAnimated:!0})},Ve=()=>{let e=q.with4Slices();return Y.createElement(K,{data:e,customMouseOver:()=>console.log(`Mouse Over`),externalRadius:100,internalRadius:47,highlightSliceById:1,isAnimated:!1})},He=-1,Ue=()=>{let e=q.with4Slices(),[t,n]=Y.useState(He);return Y.createElement(`div`,{style:{display:`flex`,alignItems:`center`}},Y.createElement(K,{data:e,height:400,width:500,externalRadius:500/3.5,internalRadius:0,hasCenterLegend:!1,a11yTitle:`Visits by source`,isAnimated:!1,customMouseOver:e=>n(e.data.id),customMouseOut:()=>n(He)}),Y.createElement(_e,{data:e,height:(e.length+1)*40,width:300,highlightEntryById:t}))},We=()=>Y.createElement(K,{data:[],isLoading:!0}),X.__docgenInfo={description:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,methods:[],displayName:`Playground`},Z.__docgenInfo={description:``,methods:[],displayName:`WithHighlightedLegend`},Q.__docgenInfo={description:"One slice stays highlighted, `highlightSliceById` with\n`hasFixedHighlightedSlice`, and the legend follows it: hovering another\nslice highlights that one, and leaving returns to the fixed slice.",methods:[],displayName:`WithHighlightedSlice`},$.__docgenInfo={description:``,methods:[],displayName:`WithAnimation`},Ve.__docgenInfo={description:``,methods:[],displayName:`WithHoverEvent`},Ue.__docgenInfo={description:``,methods:[],displayName:`WithPieChartFormat`},We.__docgenInfo={description:``,methods:[],displayName:`WithLoadingState`},Ge=[`Playground`,`WithHighlightedLegend`,`WithHighlightedSlice`,`WithAnimation`,`WithHoverEvent`,`WithPieChartFormat`,`WithLoadingState`],X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`args => {
  const data = donutData.with4Slices();
  return <Donut {...args} data={data} />;
}`,...X.parameters?.docs?.source},description:{story:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`() => {
  const data = donutData.with4Slices();
  const legendMargin = {
    top: 10,
    bottom: 10,
    left: 0,
    right: 30
  };
  const width = 500;
  const [highlightedSlice, setHighlightedSlice] = React.useState<number>();
  const handleMouseOver = (data: {
    data: {
      id: number;
    };
  }) => {
    setHighlightedSlice(data.data.id);
  };
  const handleMouseOut = () => {
    setHighlightedSlice(99999);
  };
  return <div style={{
    display: 'flex',
    alignItems: 'center'
  }}>
            <Donut data={data} height={width} width={width} externalRadius={width / 2.5} internalRadius={width / 5} isAnimated={false} highlightSliceById={highlightedSlice} customMouseOver={handleMouseOver.bind(this)} customMouseOut={handleMouseOut.bind(this)} />
            <Legend data={donutData.with4Slices()} height={(data.length + 1) * 40} width={300} margin={legendMargin} highlightEntryById={highlightedSlice} />
        </div>;
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`() => {
  const data = donutData.with4Slices();
  const fixedSlice = 2;
  const width = 500;
  const [highlightedEntry, setHighlightedEntry] = React.useState(fixedSlice);
  return <div style={{
    display: 'flex',
    alignItems: 'center'
  }}>
            <Donut data={data} height={width * 0.8} width={width} externalRadius={width / 3.5} internalRadius={width / 7} isAnimated={false} highlightSliceById={fixedSlice} hasFixedHighlightedSlice={true} customMouseOver={(slice: {
      data: {
        id: number;
      };
    }) => setHighlightedEntry(slice.data.id)} customMouseOut={() => setHighlightedEntry(fixedSlice)} />
            <Legend data={data} height={(data.length + 1) * 40} width={300} highlightEntryById={highlightedEntry} />
        </div>;
}`,...Q.parameters?.docs?.source},description:{story:"One slice stays highlighted, `highlightSliceById` with\n`hasFixedHighlightedSlice`, and the legend follows it: hovering another\nslice highlights that one, and leaving returns to the fixed slice.",...Q.parameters?.docs?.description}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`() => {
  const data = donutData.with4Slices();
  return <Donut data={data} isAnimated={true} />;
}`,...$.parameters?.docs?.source}}},Ve.parameters={...Ve.parameters,docs:{...Ve.parameters?.docs,source:{originalSource:`() => {
  const data = donutData.with4Slices();
  const logMouseOver = () => console.log('Mouse Over');
  return <Donut data={data} customMouseOver={logMouseOver} externalRadius={100} internalRadius={47} highlightSliceById={1} isAnimated={false} />;
}`,...Ve.parameters?.docs?.source}}},Ue.parameters={...Ue.parameters,docs:{...Ue.parameters?.docs,source:{originalSource:`() => {
  const data = donutData.with4Slices();
  const width = 500;
  const [highlightedSlice, setHighlightedSlice] = React.useState(NO_SLICE);
  return <div style={{
    display: 'flex',
    alignItems: 'center'
  }}>
            <Donut data={data} height={width * 0.8} width={width} externalRadius={width / 3.5} internalRadius={0} hasCenterLegend={false} a11yTitle="Visits by source" isAnimated={false} customMouseOver={(slice: {
      data: {
        id: number;
      };
    }) => setHighlightedSlice(slice.data.id)} customMouseOut={() => setHighlightedSlice(NO_SLICE)} />
            <Legend data={data} height={(data.length + 1) * 40} width={300} highlightEntryById={highlightedSlice} />
        </div>;
}`,...Ue.parameters?.docs?.source}}},We.parameters={...We.parameters,docs:{...We.parameters?.docs,source:{originalSource:`() => {
  const data: [] = [];
  return <Donut data={data} isLoading={true} />;
}`,...We.parameters?.docs?.source}}}})))()}Ke();export{X as Playground,$ as WithAnimation,Z as WithHighlightedLegend,Q as WithHighlightedSlice,Ve as WithHoverEvent,We as WithLoadingState,Ue as WithPieChartFormat,Ge as __namedExportsOrder,Be as default};