import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{B as t,D as n,E as r,N as i,T as a,a as o,at as s,b as c,et as ee,f as te,ft as l,h as ne,i as u,it as re,l as d,m as ie,n as f,o as p,p as ae,pt as m,s as h,t as g,tt as oe,u as se,z as _}from"./index-all-BIfgpmrH.js";import{n as v,t as y}from"./pointer-Djj9AZUl.js";import{n as ce}from"./quad-qkBhhiXk.js";import{i as le,n as ue,t as de}from"./axis-B0w998iS.js";import{n as fe,t as b}from"./linear-ZVlPWze4.js";import{n as x,r as pe}from"./group-CuaLm5jC.js";import{n as me}from"./permute-Cz73FWvc.js";import{a as S,o as he}from"./constants-BiwYcpix.js";import{n as ge}from"./range-CQkgHe2o.js";import{n as _e}from"./sum-B43dOCtN.js";import{n as ve,t as C}from"./ordinal-1JX83z3D.js";import{a as w,i as ye,n as be,r as xe,t as Se}from"./scale-B00Tn_Hs.js";import{n as T,t as Ce}from"./keyboard-D_bIywLd.js";import{n as E,t as we}from"./export-BV1q5uvn.js";import{a as Te,n as D,o as O,r as k,s as Ee,t as A}from"./helpers-CrbXQEV5.js";import{n as De,r as j}from"./domain-BQLJNFX4.js";import{n as Oe,t as M}from"./locale-hAvcEUfm.js";import{i as ke,n as N,r as P,t as Ae}from"./expand-Bv7b_Y6P.js";import{n as je,r as Me,t as Ne}from"./grid-yX7qHS3-.js";import{a as Pe,i as Fe,n as F,t as Ie}from"./tooltip-CDxaQ4qy.js";function Le(e,t){if((c=e.length)>0)for(var n,r=0,i,a,o,s,c,ee=e[t[0]].length;r<ee;++r)for(o=s=0,n=0;n<c;++n)(a=(i=e[t[n]][r])[1]-i[0])>0?(i[0]=o,i[1]=o+=a):a<0?(i[1]=s,i[0]=s+=a):(i[0]=0,i[1]=a)}function I(){let e=`name`,n=`stack`,a=`value`,o={top:40,right:30,bottom:60,left:70},s=960,c=500,l=!1,u,d,f,p,h=.1,g=null,oe=t,_=5,y=5,le=1,b=Te.colorSchemas.britecharts,x=null,S=null,C=!1,w=null,xe,T,E=!1,D=!1,O,k,A,j,M,N,P,Me=!1,Fe=480,F=null,Ie,I=-60,R=he.duration,z,B=null,V=Re,H=!1,U=ce,W={top:0,left:0,bottom:0,right:0},Be=.24,Ve=e=>x[e],G=t=>t[e],He=e=>e[a],Ue=e=>e[n],K=e=>isNaN(e)?0:e,q=ee(`customMouseOver`,`customMouseOut`,`customMouseMove`,`customClick`);function J(e){g&&(oe=Oe(g)),e.each(function(e){k=s-(o.left??0)-(o.right??0),A=c-(o.top??0)-(o.bottom??0),j=$e(e),Tt(j),Qe(this),ie(O.node(),qe&&!l?Ze():null),Ce(O.node(),{isEnabled:Je&&!l,stops:Ye}),l?nt():(et(),We(),Ge(),rt(),Z(oe),tt(),ct(),Y())})}function Y(){Et()&&O.on(`mouseenter`,function(e,t){xt(this,t,e)}).on(`mouseleave`,function(e,t){yt(this,t,e)}).on(`mousemove`,function(e,t){gt(this,t,e)}).on(`click`,function(e,t){_t(this,t,e)}),O.selectAll(`.bar`).on(`mouseover`,mt).on(`mouseout`,ht)}function X(e){e.selectAll(`.tick text`).attr(`transform`,`translate(-20, -8)`)}function Z(e){let t=D?L:V;E?(d=de(u).ticks(y,e.format(t)),p=ue(f)):(d=de(u),p=ue(f).ticks(_,e.format(t)))}function Q(){let e=O.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${o.left},${o.top})`);O.append(`g`).classed(`loading-state-group`,!0),e.append(`g`).classed(`x-axis-group`,!0).append(`g`).classed(`x axis`,!0),e.append(`g`).classed(`y-axis-group axis`,!0),e.append(`g`).classed(`grid-lines-group`,!0),e.append(`g`).classed(`chart-group`,!0),e.append(`g`).classed(`y-axis-label`,!0),e.append(`g`).classed(`metadata-group`,!0)}function We(){T=ke().keys(N).offset(D?Ae:Le)(M.map(e=>{let t={};return N.forEach(n=>{t[n]=e[n]}),Object.assign({},e,t)}))}function Ge(){let e=pt();E?(u=fe().domain(e).rangeRound([0,k-1]),f=ye().domain(j.map(G)).rangeRound([A,0]).padding(h)):(u=ye().domain(j.map(G)).rangeRound([0,k]).padding(h),f=fe().domain(e).rangeRound([A,0]).nice()),xe=ve().range(b).domain(j.map(Ue)),x=Ee(xe.domain(j.map(Ue)).domain().reduce((e,t)=>(e[t]=xe(t),e),{}),S)}let $=null,Ke=null,qe=!0,Je=!0;function Ye(){let e=new Map;return O.selectAll(`.bar`).each(function(t){let n=e.get(t.data.key);(!n||t[1]!==t[0]&&!Xe(n))&&e.set(t.data.key,this)}),[...e.values()].map(e=>({target:e}))}function Xe(e){let t=m(e).datum();return t[1]!==t[0]}function Ze(){return te(j,{heading:`Name`,row:e=>e.name,column:e=>e.stack,value:e=>e.value})}function Qe(e){O||(O=m(e).append(`svg`).classed(`britechart stacked-bar`,!0),Q()),O.attr(`viewBox`,[0,0,s,c]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,s).attr(`height`,c),se(O.node(),{a11yTitle:$,a11yDescription:Ke,fallbackTitle:`Stacked bar chart`})}function $e(t){return t.reduce((t,r)=>{let i=r;return i.value=+i[a],i.stack=i[n],i.topicName=i[n],i.name=i[e],[...t,i]},[])}function et(){O.select(`.loading-state-group svg`).remove()}function tt(){E?(O.select(`.x-axis-group .axis.x`).attr(`transform`,`translate( 0, ${A} )`).call(d),O.select(`.y-axis-group.axis`).attr(`transform`,`translate( ${-W.left}, 0)`).call(p)):(O.select(`.x-axis-group .axis.x`).attr(`transform`,`translate( 0, ${A} )`).call(d),O.select(`.y-axis-group.axis`).attr(`transform`,`translate( ${-W.left}, 0)`).call(p).call(X)),F&&(Ie&&O.selectAll(`.y-axis-label-text`).remove(),Ie=O.select(`.y-axis-label`).append(`text`).classed(`y-axis-label-text`,!0).attr(`x`,-A/2).attr(`y`,I).attr(`text-anchor`,`middle`).attr(`transform`,`rotate(270 0 0)`).text(F))}function nt(){O.select(`.loading-state-group`).html(ne)}function rt(){O.select(`.grid-lines-group`).selectAll(`grid`).remove(),(B===`horizontal`||B===`full`)&&at(),(B===`vertical`||B===`full`)&&st(),E?st():at()}function it(e){let t=be(u),n=Se(f);P=e.data(T).enter().append(`g`).attr(`fill`,({key:e})=>Ve(e)).classed(`layer`,!0);let r=P.selectAll(`.bar`).data(e=>lt(e)).enter().append(`rect`).classed(`bar`,!0).attr(`x`,e=>t(e[0])).attr(`y`,e=>n(e.data.key)).attr(`height`,n.bandwidth());H&&!ae()?r.style(`opacity`,Be).transition().delay((e,t)=>z[t]).duration(R).ease(U).tween(`attr.width`,Ct):r.attr(`width`,e=>t(e[1])-t(e[0]))}function at(){Ne(f).range([0,k]).hideEdges(`first`).ticks(_).extendedLine(W.left)(O.select(`.grid-lines-group`))}function ot(e){let t=Se(u),n=be(f);P=e.data(T).enter().append(`g`).attr(`fill`,({key:e})=>Ve(e)).classed(`layer`,!0);let r=P.selectAll(`.bar`).data(e=>lt(e)).enter().append(`rect`).classed(`bar`,!0).attr(`x`,e=>t(e.data.key)).attr(`y`,e=>n(e[1])).attr(`width`,t.bandwidth);H&&!ae()?r.style(`opacity`,Be).transition().delay((e,t)=>z[t]).duration(R).ease(U).tween(`attr.height`,Dt):r.attr(`height`,e=>n(e[0])-n(e[1]))}function st(){je(u).range([0,A]).hideEdges(`first`).ticks(y).extendedLine(W.bottom)(O.select(`.grid-lines-group`))}function ct(){P&&O.selectAll(`.layer`).remove();let e=O.select(`.chart-group`).selectAll(`.layer`);z=ge(20,(T[0].length+1)*20,20),E?it(e):ot(e),e.exit().transition().style(`opacity`,0).remove()}function lt(e){return e.map(e=>{for(let t=0;t<e.length;t++)e[t]=K(e[t]);return e})}function ut(e){return v(e,O.node())}function dt(e){let t=e-(o.left??0),n=Se(u);return M.find(({key:e})=>{let r=n(e),i=r+n.bandwidth();return t>=r&&t<i})}function ft(e){let t=e-(o.top??0),n=Se(f);return M.find(({key:e})=>{let r=n(e),i=r+n.bandwidth();return t>=r&&t<i})}function pt(){let e=T.reduce((e,t)=>[...e,...t.map(([e,t])=>[e,t]).flat()],[]);return De(e.filter(e=>!isNaN(e)))}function mt(){m(this).attr(`fill`,()=>String(re(m(this.parentNode).attr(`fill`)).darker()))}function ht(){m(this).attr(`fill`,()=>m(this.parentNode).attr(`fill`))}function gt(e,t,n){if(!St(n)){C&&!w&&(w=setTimeout(()=>yt(e,t,n),150));return}bt(),C||xt(e,t,n);let[r,i]=ut(n),a=E?ft(i):dt(r),s,c;a&&(s=r-(o.left??0),c=i-(o.top??0),wt(s,c),q.call(`customMouseMove`,e,a,[s,c],[k,A],x))}function _t(e,t,n){if(!St(n))return;let[r,i]=ut(n),a=E?ft(i):dt(r);q.call(`customClick`,e,a,v(n,e),vt(n.target))}function vt(e){let t=e.parentNode,n=t?m(t).datum():null;if(!n||!Pe(n.key))return;let r=m(e).datum(),i=r&&r.data?r.data:M[Array.from(t.querySelectorAll(`.bar`)).indexOf(e)];if(i)return{name:n.key,value:i[n.key],key:i.key}}function yt(e,t,n){bt(),C&&(C=!1,O.select(`.metadata-group`).attr(`transform`,`translate(9999, 0)`),q.call(`customMouseOut`,e,t,v(n,e)))}function bt(){w&&=(clearTimeout(w),null)}function xt(e,t,n){!C&&St(n)&&(C=!0,q.call(`customMouseOver`,e,t,v(n,e)))}function St(e){return!!e&&!!e.target&&m(e.target).classed(`bar`)}function Ct(e){let t=be(u),n=m(this),r=i(0,1);return function(i){let a=t(e[0]*i),o=t(e[1]*i);n.attr(`x`,a).attr(`width`,K(o-a)).style(`opacity`,r(i))}}function wt(e,t){O.select(`.metadata-group`).attr(`transform`,`translate(${e},${t})`)}function Tt(e){N=ze(e.map(({stack:e})=>e)),Me&&(N=N.reverse()),M=pe(e,function(e){let t={};return e.forEach(e=>{e&&e[n]&&(t[e[n]]=He(e))}),t.values=e,t},e=>String(G(e))).map(([e,t])=>({key:e,value:t})).map(function(e){return Object.assign({},{total:_e(me(e.value,N)),key:e.key},e.value)})}function Et(){return s>Fe}function Dt(e){let t=be(f),n=m(this),r=i(0,1);return function(i){let a=t(e[1]*i),o=t(e[0]*i);n.attr(`y`,a).attr(`height`,K(o-a)).style(`opacity`,r(i))}}return J.a11yTitle=function(e){return arguments.length?($=e,this):$},J.a11yDescription=function(e){return arguments.length?(Ke=e,this):Ke},J.a11yDataTable=function(e){return arguments.length?(qe=e,this):qe},J.a11yKeyboardNavigation=function(e){return arguments.length?(Je=e,this):Je},J.animationDuration=function(e){return arguments.length?(R=e,this):R},J.betweenBarsPadding=function(e){return arguments.length?(h=e,this):h},J.colorMap=function(e){return arguments.length?(S=e,this):S},J.colorSchema=function(e){return arguments.length?(b=e,this):b},J.exportChart=function(e,t){return we.call(J,O,e,t)},J.grid=function(e){return arguments.length?(B=e,this):B},J.hasPercentage=function(e){return arguments.length?(V=e?L:Re,this):V===L},J.height=function(e){return arguments.length?(c=e,this):c},J.hasReversedStacks=function(e){return arguments.length?(Me=e,this):Me},J.isAnimated=function(e){return arguments.length?(H=e,this):H},J.isHorizontal=function(e){return arguments.length?(E=e,this):E},J.isNormalized=function(e){return arguments.length?(D=e,this):D},J.isLoading=function(e){return arguments.length?(l=e,this):l},J.margin=function(e){return arguments.length?(o={...o,...e},this):o},J.numberFormat=function(e){return arguments.length?(V=e,this):V},J.on=function(...e){let t=q.on(...e);return t===q?J:t},J.percentageAxisToMaxRatio=function(e){return arguments.length?(le=e,this):le},J.tooltipThreshold=function(e){return arguments.length?(Fe=e,this):Fe},J.valueLocale=function(e){return arguments.length?(g=e,this):g},J.width=function(e){return arguments.length?(s=e,this):s},J.xTicks=function(e){return arguments.length?(y=e,this):y},J.yAxisLabel=function(e){return arguments.length?(F=e,this):F},J.yAxisLabelOffset=function(e){return arguments.length?(I=e,this):I},J.yTicks=function(e){return arguments.length?(_=e,this):_},J.render=function(e,t){return r(this,e,t)},J}var L,Re,ze;function R(){return(R=e((()=>{x(),le(),s(),oe(),_(),C(),w(),b(),P(),N(),l(),y(),n(),E(),a(),j(),Fe(),O(),c(),M(),S(),Me(),xe(),d(),T(),L=`%`,Re=`,f`,ze=e=>e.filter((e,t,n)=>n.indexOf(e)==t)})))()}var z,B;function V(){return(V=e((()=>{z=[{stack:`vivid`,value:0,name:`2011-01-05`},{stack:`vivid`,value:10,name:`2011-01-06`},{stack:`vivid`,value:16,name:`2011-01-07`},{stack:`vivid`,value:23,name:`2011-01-08`},{stack:`sparkling`,value:23,name:`2011-01-05`},{stack:`sparkling`,value:16,name:`2011-01-06`},{stack:`sparkling`,value:10,name:`2011-01-07`},{stack:`sparkling`,value:0,name:`2011-01-08`}],B={data:z}})))()}var H,U;function W(){return(W=e((()=>{H=[{stack:`vivid`,value:0,name:`2011-01-05`},{stack:`vivid`,value:4,name:`2011-01-06`},{stack:`vivid`,value:12,name:`2011-01-07`},{stack:`vivid`,value:23,name:`2011-01-08`},{stack:`sparkling`,value:18,name:`2011-01-05`},{stack:`sparkling`,value:16,name:`2011-01-06`},{stack:`sparkling`,value:10,name:`2011-01-07`},{stack:`sparkling`,value:0,name:`2011-01-08`},{stack:`sunny`,value:10,name:`2011-01-05`},{stack:`sunny`,value:20,name:`2011-01-06`},{stack:`sunny`,value:16,name:`2011-01-07`},{stack:`sunny`,value:25,name:`2011-01-08`}],U={data:H}})))()}var Be,Ve;function G(){return(G=e((()=>{Be=[{stack:`vivid`,value:5,name:`2011-01-05`},{stack:`sparkling`,value:-4,name:`2011-01-05`},{stack:`sunny`,value:3,name:`2011-01-05`},{stack:`vivid`,value:8,name:`2011-01-06`},{stack:`sparkling`,value:-2,name:`2011-01-06`},{stack:`sunny`,value:-5,name:`2011-01-06`},{stack:`vivid`,value:3,name:`2011-01-07`},{stack:`sparkling`,value:-7,name:`2011-01-07`},{stack:`sunny`,value:4,name:`2011-01-07`},{stack:`vivid`,value:6,name:`2011-01-08`},{stack:`sparkling`,value:-3,name:`2011-01-08`},{stack:`sunny`,value:2,name:`2011-01-08`}],Ve={data:Be}})))()}function He(e){this.Klass=He,this.config=f.defaults({},e),this.withNegativeValues=function(){let e=f.extend({},this.config,Ve);return new this.Klass(e)},this.with3Sources=function(){let e=f.extend({},this.config,U);return new this.Klass(e)},this.with2Sources=function(){let e=f.extend({},this.config,B);return new this.Klass(e)},this.build=function(){return this.config.data}}function Ue(){return(Ue=e((()=>{g(),V(),W(),G()})))()}var K,q,J,Y,X,Z,Q,We,Ge;function $(){return($=e((()=>{l(),R(),Ie(),k(),o(),Ue(),O(),K=()=>new He,q=e=>{let t=D(),n=I(),r=m(t),i=r.node()?r.node().getBoundingClientRect().width:!1,a=F();if(i){let o=K().with3Sources().build();u(n,e).width(i).on(`customMouseOver`,function(){a.show()}).on(`customMouseMove`,a.update).on(`customMouseOut`,function(){a.hide()}),r.datum(o).call(n),A(t,n,`stacked-bar`),a.topicLabel(`values`).nameLabel(`stack`).title(`Tooltip title`),m(`.metadata-group`).datum([]).call(a)}return t},q.args=h(I,[`height`,`margin`,`isAnimated`,`colorSchema`,`isHorizontal`,`isNormalized`,`betweenBarsPadding`,`hasPercentage`,`hasReversedStacks`,`percentageAxisToMaxRatio`,`grid`,`xTicks`,`yTicks`,`yAxisLabel`,`yAxisLabelOffset`,`tooltipThreshold`,`numberFormat`,`isLoading`]),q.args.isAnimated=!1,q.argTypes=p(q.args),J=()=>{let e=D(),t=I(),n=m(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=F(),a;if(r){let e=K().with3Sources().build();t.isHorizontal(!0).tooltipThreshold(600).grid(`vertical`).height(400).width(r).isAnimated(!0).margin({left:100,top:40,right:30,bottom:20}).colorSchema(Te.colorSchemas.red).on(`customMouseOver`,function(){i.show()}).on(`customMouseMove`,i.update).on(`customMouseOut`,function(){i.hide()}),n.datum(e).call(t),i.topicLabel(`values`).nameLabel(`stack`).title(`Tooltip Title`),a=m(`.metadata-group`),a.datum([]).call(i)}return e},Y=()=>{let e=D(),t=I(),n=m(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=F();if(r){let e=K().with3Sources().build();t.isAnimated(!0).width(r).on(`customMouseOver`,function(){i.show()}).on(`customMouseMove`,i.update).on(`customMouseOut`,function(){i.hide()}),n.datum(e).call(t),i.topicLabel(`values`).nameLabel(`stack`).title(`Tooltip title`),m(`.metadata-group`).datum([]).call(i)}return e},X=()=>{let e=D(),t=I(),n=m(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=F();if(r){let e=K().with3Sources().build();t.isNormalized(!0).width(r).on(`customMouseOver`,function(){i.show()}).on(`customMouseMove`,i.update).on(`customMouseOut`,function(){i.hide()}),n.datum(e).call(t),i.topicLabel(`values`).nameLabel(`stack`).title(`Tooltip title`),m(`.metadata-group`).datum([]).call(i)}return e},Z=()=>{let e=D(),t=I(),n=m(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=K().withNegativeValues().build();return r&&(t.isAnimated(!0).grid(`horizontal`).width(r).height(400),n.datum(i).call(t)),e},Q=()=>{let e=D(),t=I(),n=m(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=K().with3Sources().build();return r&&(t.width(r).height(400).isAnimated(!0).isLoading(!0),n.datum(i).call(t)),e},We={title:`Charts/StackedBar`},Ge=[`Playground`,`WithHorizontalDirection`,`WithAnimation`,`WithNormalizedStacks`,`WithNegativeValues`,`WithLoadingState`],q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`args => {
  const container = getCleanContainer();
  const stackedBar = stackedBarChart();
  const stackedBarContainer = select(container);
  const containerWidth = stackedBarContainer.node() ? stackedBarContainer.node().getBoundingClientRect().width : false;
  const chartTooltip = tooltip();
  if (containerWidth) {
    const dataset = aTestDataSet().with3Sources().build();
    applyArgs(stackedBar, args).width(containerWidth).on('customMouseOver', function () {
      chartTooltip.show();
    }).on('customMouseMove', chartTooltip.update).on('customMouseOut', function () {
      chartTooltip.hide();
    });
    stackedBarContainer.datum(dataset).call(stackedBar);
    addExportButtons(container, stackedBar, 'stacked-bar');

    // The stacked bar dispatches its rows as \`values\`, named by \`stack\`
    chartTooltip.topicLabel('values').nameLabel('stack').title('Tooltip title');
    select('.metadata-group').datum([]).call(chartTooltip);
  }
  return container;
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const stackedBar = stackedBarChart();
  const stackedBarContainer = select(container);
  const containerWidth = stackedBarContainer.node() ? stackedBarContainer.node().getBoundingClientRect().width : false;
  const chartTooltip = tooltip();
  let tooltipContainer;
  if (containerWidth) {
    const dataset = aTestDataSet().with3Sources().build();
    stackedBar.isHorizontal(true).tooltipThreshold(600).grid('vertical').height(400).width(containerWidth).isAnimated(true).margin({
      left: 100,
      top: 40,
      right: 30,
      bottom: 20
    }).colorSchema(colors.colorSchemas.red).on('customMouseOver', function () {
      chartTooltip.show();
    }).on('customMouseMove', chartTooltip.update).on('customMouseOut', function () {
      chartTooltip.hide();
    });
    stackedBarContainer.datum(dataset).call(stackedBar);

    // Tooltip Setup and start
    // The stacked bar dispatches its rows as \`values\`, named by \`stack\`
    chartTooltip.topicLabel('values').nameLabel('stack').title('Tooltip Title');

    // Note that if the viewport width is less than the tooltipThreshold value,
    // this container won't exist, and the tooltip won't show up
    tooltipContainer = select('.metadata-group');
    tooltipContainer.datum([]).call(chartTooltip);
  }
  return container;
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const stackedBar = stackedBarChart();
  const stackedBarContainer = select(container);
  const containerWidth = stackedBarContainer.node() ? stackedBarContainer.node().getBoundingClientRect().width : false;
  const chartTooltip = tooltip();
  if (containerWidth) {
    const dataset = aTestDataSet().with3Sources().build();
    stackedBar.isAnimated(true).width(containerWidth).on('customMouseOver', function () {
      chartTooltip.show();
    }).on('customMouseMove', chartTooltip.update).on('customMouseOut', function () {
      chartTooltip.hide();
    });
    stackedBarContainer.datum(dataset).call(stackedBar);

    // The stacked bar dispatches its rows as \`values\`, named by \`stack\`
    chartTooltip.topicLabel('values').nameLabel('stack').title('Tooltip title');
    select('.metadata-group').datum([]).call(chartTooltip);
  }
  return container;
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const stackedBar = stackedBarChart();
  const stackedBarContainer = select(container);
  const containerWidth = stackedBarContainer.node() ? stackedBarContainer.node().getBoundingClientRect().width : false;
  const chartTooltip = tooltip();
  if (containerWidth) {
    const dataset = aTestDataSet().with3Sources().build();
    stackedBar.isNormalized(true).width(containerWidth).on('customMouseOver', function () {
      chartTooltip.show();
    }).on('customMouseMove', chartTooltip.update).on('customMouseOut', function () {
      chartTooltip.hide();
    });
    stackedBarContainer.datum(dataset).call(stackedBar);

    // The stacked bar dispatches its rows as \`values\`, named by \`stack\`
    chartTooltip.topicLabel('values').nameLabel('stack').title('Tooltip title');
    select('.metadata-group').datum([]).call(chartTooltip);
  }
  return container;
}`,...X.parameters?.docs?.source},description:{story:`A 100% stacked bar: \`isNormalized(true)\` scales every stack to the full
height, so each segment shows its share of its stack and the axis runs from
0% to 100%. The tooltip still shows the values.`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const stackedBar = stackedBarChart();
  const stackedBarContainer = select(container);
  const containerWidth = stackedBarContainer.node() ? stackedBarContainer.node().getBoundingClientRect().width : false;
  const dataset = aTestDataSet().withNegativeValues().build();
  if (containerWidth) {
    stackedBar.isAnimated(true).grid('horizontal').width(containerWidth).height(400);
    stackedBarContainer.datum(dataset).call(stackedBar);
  }
  return container;
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const stackedBar = stackedBarChart();
  const stackedBarContainer = select(container);
  const containerWidth = stackedBarContainer.node() ? stackedBarContainer.node().getBoundingClientRect().width : false;
  const dataset = aTestDataSet().with3Sources().build();
  if (containerWidth) {
    stackedBar.width(containerWidth).height(400).isAnimated(true).isLoading(true);
    stackedBarContainer.datum(dataset).call(stackedBar);
  }
  return container;
}`,...Q.parameters?.docs?.source}}}})))()}$();export{q as Playground,Y as WithAnimation,J as WithHorizontalDirection,Q as WithLoadingState,Z as WithNegativeValues,X as WithNormalizedStacks,Ge as __namedExportsOrder,We as default};