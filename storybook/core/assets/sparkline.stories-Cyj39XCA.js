import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{C as t,T as n,a as r,b as i,dt as a,i as o,l as s,m as ee,n as c,o as l,p as u,s as d,t as f,u as te,ut as p}from"./index-all-DhiTiQVV.js";import{n as m}from"./quad-qkBhhiXk.js";import{n as h,t as g}from"./linear-C4axaRz1.js";import{t as _}from"./extent-CL2rf33s.js";import{N as v,a as y,j as b,l as x,o as ne,u as S}from"./constants-CTgVdheE.js";import{n as C,t as re}from"./export-BV1q5uvn.js";import{a as ie,n as w,o as T,r as E,t as D}from"./helpers-CrbXQEV5.js";import{n as O,t as k}from"./line-CMV2l3OT.js";import{n as A,t as j}from"./area-DzCDhk88.js";function M(){let e={left:5,right:5,top:5,bottom:5},n=100,r=30,i=!1,o,s,c=[`var(--bc-sparkline-area-start, #f5fdff)`,`var(--bc-sparkline-area-end, #f6fefc)`],l,d=ie.colorGradients.greenBlue,f,p,g,y,b,S,C=!1,w=ne.duration,T,E,D,k=v(`sparkline-area-gradient`),A=v(`sparkline-line-gradient`),M=v(`maskingClip`),N=m,P=({date:e})=>e,F=({value:e})=>e;function I(t){t.each(function(t){y=n-(e.left??0)-(e.right??0),b=r-(e.top??0)-(e.bottom??0),S=W(t),U(this),ee(g.node(),V&&!i?H():null),i?X():(G(),R(),K(),q(),J(),Y(),Z())})}function L(){let t=g.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${e.left},${e.top})`);g.append(`g`).classed(`loading-state-group`,!0),t.append(`g`).classed(`chart-group`,!0),t.append(`g`).classed(`metadata-group`,!0)}function R(){o=h().domain(_(S,P)).range([0,y]),s=h().domain(_(S,F)).range([b,0])}let z=null,B=null,V=!0;function H(){return{columns:[`Date`,`Value`],rows:S.map(e=>[e.date,e.value])}}function U(e){g||(g=a(e).append(`svg`).classed(`britechart sparkline`,!0),L()),g.attr(`viewBox`,[0,0,n,r]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,n).attr(`height`,r),te(g.node(),{a11yTitle:z,a11yDescription:B,fallbackTitle:`Sparkline`})}function W(e){return e.reduce((e,t)=>{let n=t;return n.date=new Date(n.date),n.value=+n.value,[...e,n]},[])}function G(){g.select(`.loading-state-group svg`).remove()}function K(){let e=g.select(`.metadata-group`);(l||f)&&(g.selectAll(`#${k}`).remove(),g.selectAll(`#${A}`).remove()),l=e.append(`linearGradient`).attr(`id`,k).attr(`class`,`area-gradient`).attr(`gradientUnits`,`userSpaceOnUse`).attr(`x1`,0).attr(`x2`,o(S[S.length-1].date)).attr(`y1`,0).attr(`y2`,0).selectAll(`stop`).data([{offset:`0%`,color:c[0]},{offset:`100%`,color:c[1]}]).enter().append(`stop`).attr(`offset`,({offset:e})=>e).style(`stop-color`,({color:e})=>e),f=e.append(`linearGradient`).attr(`id`,A).attr(`class`,`line-gradient`).attr(`gradientUnits`,`userSpaceOnUse`).attr(`x1`,0).attr(`x2`,o(S[S.length-1].date)).attr(`y1`,0).attr(`y2`,0).selectAll(`stop`).data([{offset:`0%`,color:d[0]},{offset:`100%`,color:d[1]}]).enter().append(`stop`).attr(`offset`,({offset:e})=>e).style(`stop-color`,({color:e})=>e)}function q(){p&&g.selectAll(`#${M}`).remove(),C&&!u()&&(p=g.select(`.metadata-group`).append(`clipPath`).attr(`id`,M).attr(`class`,`clip-path`).append(`rect`).attr(`width`,0).attr(`height`,r),a(`#${M} rect`).transition().ease(N).duration(w).attr(`width`,n))}function J(){E&&g.selectAll(`.sparkline-area`).remove(),E=j().x(({date:e})=>o(e)).y0(()=>s(0)+1).y1(({value:e})=>s(e)).curve(x),g.select(`.chart-group`).append(`path`).datum(S).attr(`class`,`sparkline-area`).attr(`fill`,`url(#${k})`).attr(`d`,E).attr(`clip-path`,`url(#${M})`)}function Y(){T&&g.selectAll(`.line`).remove(),T=O().curve(x).x(({date:e})=>o(e)).y(({value:e})=>s(e)),g.select(`.chart-group`).append(`path`).datum(S).attr(`class`,`line`).attr(`stroke`,`url(#${A})`).attr(`d`,T).attr(`clip-path`,`url(#${M})`).attr(`fill`,`none`)}function X(){g.select(`.loading-state-group`).html(t)}function Z(){D&&g.selectAll(`.sparkline-circle`).remove(),D=g.selectAll(`.chart-group`).append(`circle`).attr(`class`,`sparkline-circle`).attr(`cx`,o(S[S.length-1].date)).attr(`cy`,s(S[S.length-1].value)).attr(`r`,1.5)}return I.a11yTitle=function(e){return arguments.length?(z=e,this):z},I.a11yDescription=function(e){return arguments.length?(B=e,this):B},I.a11yDataTable=function(e){return arguments.length?(V=e,this):V},I.animationDuration=function(e){return arguments.length?(w=e,this):w},I.areaGradient=function(e){return arguments.length?(c=e,this):c},I.exportChart=function(e,t){return re.call(I,g,e,t)},I.height=function(e){return arguments.length?(r=e,this):r},I.isAnimated=function(e){return arguments.length?(C=e,this):C},I.lineGradient=function(e){return arguments.length?(d=e,this):d},I.isLoading=function(e){return arguments.length?(i=e,this):i},I.margin=function(t){return arguments.length?(e={...e,...t},this):e},I.width=function(e){return arguments.length?(n=e,this):n},I}function N(){return(N=e((()=>{g(),A(),k(),S(),p(),n(),C(),T(),i(),b(),y(),s()})))()}var P,F;function I(){return(I=e((()=>{P=[{name:`Glittering`,value:2,date:`2011-01-05T00:00:00Z`},{name:`Glittering`,value:5,date:`2011-01-06T00:00:00Z`},{name:`Glittering`,value:16,date:`2011-01-07T00:00:00Z`},{name:`Glittering`,value:23,date:`2011-01-08T00:00:00Z`},{name:`Glittering`,value:18,date:`2011-01-09T00:00:00Z`},{name:`Glittering`,value:25,date:`2011-01-10T00:00:00Z`},{name:`Glittering`,value:28,date:`2011-01-11T00:00:00Z`},{name:`Glittering`,value:2,date:`2011-01-12T00:00:00Z`}],F={data:P}})))()}var L,R;function z(){return(z=e((()=>{L=[{name:`Blazing`,value:2,date:`2011-01-05T00:00:00Z`},{name:`Blazing`,value:2,date:`2011-01-06T00:00:00Z`},{name:`Blazing`,value:3,date:`2011-01-07T00:00:00Z`},{name:`Blazing`,value:5,date:`2011-01-08T00:00:00Z`},{name:`Blazing`,value:3,date:`2011-01-09T00:00:00Z`},{name:`Blazing`,value:6,date:`2011-01-10T00:00:00Z`},{name:`Blazing`,value:7,date:`2011-01-11T00:00:00Z`},{name:`Blazing`,value:1,date:`2011-01-12T00:00:00Z`}],R={data:L}})))()}var B,V;function H(){return(H=e((()=>{B=[{name:`Glittering`,value:2,date:`2011-01-05T00:00:00Z`},{name:`Glittering`,value:-3,date:`2011-01-06T00:00:00Z`},{name:`Glittering`,value:5,date:`2011-01-07T00:00:00Z`},{name:`Glittering`,value:-1,date:`2011-01-08T00:00:00Z`},{name:`Glittering`,value:4,date:`2011-01-09T00:00:00Z`},{name:`Glittering`,value:-6,date:`2011-01-10T00:00:00Z`},{name:`Glittering`,value:3,date:`2011-01-11T00:00:00Z`},{name:`Glittering`,value:1,date:`2011-01-12T00:00:00Z`}],V={data:B}})))()}function U(e){this.Klass=U,this.config=c.defaults({},e),this.withNegativeValues=function(){let e=c.extend({},this.config,V);return new this.Klass(e)},this.with1Source=function(){let e=c.extend({},this.config,F);return new this.Klass(e)},this.withLowValues=function(){let e=c.extend({},this.config,R);return new this.Klass(e)},this.build=function(){return this.config.data}}function W(){return(W=e((()=>{f(),I(),z(),H()})))()}var G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{p(),N(),E(),r(),W(),G=()=>new U,K=e=>{let t=w(),n=M(),r=a(t),i=r.node()?r.node().getBoundingClientRect().width:!1;if(i){let a=G().with1Source().build();n.height(i/4),o(n,e).width(i),r.datum(a).call(n),D(t,n,`sparkline`)}return t},K.args=d(M,[`height`,`margin`,`isAnimated`,`isLoading`]),K.args.isAnimated=!1,K.args.height=void 0,K.argTypes={...l(K.args),height:{control:`number`}},q=()=>{let e=w(),t=M(),n=a(e);if(n.node()&&n.node().getBoundingClientRect().width){let e=G().withLowValues().build();t.height(100).width(400),n.datum(e).call(t)}return e},J=()=>{let e=w(),t=M(),n=a(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=G().with1Source().build();t.isAnimated(!0).height(r/4).width(r),n.datum(e).call(t)}return e},Y=()=>{let e=w(),t=M(),n=a(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=G().withNegativeValues().build();return r&&(t.isAnimated(!0).height(r/4).width(r),n.datum(i).call(t)),e},X=()=>{let e=w(),t=M(),n=a(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=G().with1Source().build();return r&&(t.width(r).height(r/4).isAnimated(!0).isLoading(!0),n.datum(i).call(t)),e},Z={title:`Charts/Sparkline`},Q=[`Playground`,`WithFixedWidth`,`WithAnimation`,`WithNegativeValues`,`WithLoadingState`],K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`args => {
  const container = getCleanContainer();
  const sparklineChart = sparkline();
  const sparklineContainer = select(container);
  const containerWidth = sparklineContainer.node() ? sparklineContainer.node().getBoundingClientRect().width : false;
  if (containerWidth) {
    const dataset = aTestDataSet().with1Source().build();
    sparklineChart.height(containerWidth / 4);
    applyArgs(sparklineChart, args).width(containerWidth);
    sparklineContainer.datum(dataset).call(sparklineChart);
    addExportButtons(container, sparklineChart, 'sparkline');
  }
  return container;
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const sparklineChart = sparkline();
  const sparklineContainer = select(container);
  const containerWidth = sparklineContainer.node() ? sparklineContainer.node().getBoundingClientRect().width : false;
  if (containerWidth) {
    const dataset = aTestDataSet().withLowValues().build();
    sparklineChart.height(100).width(400);
    sparklineContainer.datum(dataset).call(sparklineChart);
  }
  return container;
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const sparklineChart = sparkline();
  const sparklineContainer = select(container);
  const containerWidth = sparklineContainer.node() ? sparklineContainer.node().getBoundingClientRect().width : false;
  if (containerWidth) {
    const dataset = aTestDataSet().with1Source().build();
    sparklineChart.isAnimated(true).height(containerWidth / 4).width(containerWidth);
    sparklineContainer.datum(dataset).call(sparklineChart);
  }
  return container;
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const sparklineChart = sparkline();
  const sparklineContainer = select(container);
  const containerWidth = sparklineContainer.node() ? sparklineContainer.node().getBoundingClientRect().width : false;
  const dataset = aTestDataSet().withNegativeValues().build();
  if (containerWidth) {
    sparklineChart.isAnimated(true).height(containerWidth / 4).width(containerWidth);
    sparklineContainer.datum(dataset).call(sparklineChart);
  }
  return container;
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const sparklineChart = sparkline();
  const sparklineContainer = select(container);
  const containerWidth = sparklineContainer.node() ? sparklineContainer.node().getBoundingClientRect().width : false;
  const dataset = aTestDataSet().with1Source().build();
  if (containerWidth) {
    sparklineChart.width(containerWidth).height(containerWidth / 4).isAnimated(true).isLoading(true);
    sparklineContainer.datum(dataset).call(sparklineChart);
  }
  return container;
}`,...X.parameters?.docs?.source}}}})))()}$();export{K as Playground,J as WithAnimation,q as WithFixedWidth,X as WithLoadingState,Y as WithNegativeValues,Q as __namedExportsOrder,Z as default};