import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,at as n,b as r,c as i,h as a,i as o,l as s,n as c,o as l,ot as u,s as d,t as f,v as p}from"./index-all-C7qQZ8XB.js";import{n as m}from"./quad-qkBhhiXk.js";import{n as h,t as g}from"./linear-DvV5jilb.js";import{t as _}from"./extent-CL2rf33s.js";import{N as v,a as y,j as b,l as x,o as ee,u as S}from"./constants-rxZr75Q8.js";import{n as C,t as te}from"./export-dj65piqJ.js";import{a as w,i as T,n as E,t as D}from"./helpers-Dyqi9w-G.js";import{n as O,t as k}from"./line-De9-HiJq.js";import{n as A,t as j}from"./area-Du6e3bJi.js";function M(){let e={left:5,right:5,top:5,bottom:5},t=100,n=30,r=!1,i,a,o=[`#F5FDFF`,`#F6FEFC`],c,l=T.colorGradients.greenBlue,d,f,g,y,b,S,C=!1,w=ee.duration,E,D,k,A=v(`sparkline-area-gradient`),M=v(`sparkline-line-gradient`),N=v(`maskingClip`),P=m,F=({date:e})=>e,I=({value:e})=>e;function L(i){i.each(function(i){y=t-(e.left??0)-(e.right??0),b=n-(e.top??0)-(e.bottom??0),S=U(i),H(this),r?Y():(W(),z(),G(),K(),q(),J(),X())})}function R(){let t=g.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${e.left},${e.top})`);g.append(`g`).classed(`loading-state-group`,!0),t.append(`g`).classed(`chart-group`,!0),t.append(`g`).classed(`metadata-group`,!0)}function z(){i=h().domain(_(S,F)).range([0,y]),a=h().domain(_(S,I)).range([b,0])}let B=null,V=null;function H(e){g||(g=u(e).append(`svg`).classed(`britechart sparkline`,!0),R()),g.attr(`viewBox`,[0,0,t,n]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,t).attr(`height`,n),s(g.node(),{a11yTitle:B,a11yDescription:V,fallbackTitle:`Sparkline`})}function U(e){return e.reduce((e,t)=>{let n=t;return n.date=new Date(n.date),n.value=+n.value,[...e,n]},[])}function W(){g.select(`.loading-state-group svg`).remove()}function G(){let e=g.select(`.metadata-group`);(c||d)&&(g.selectAll(`#${A}`).remove(),g.selectAll(`#${M}`).remove()),c=e.append(`linearGradient`).attr(`id`,A).attr(`class`,`area-gradient`).attr(`gradientUnits`,`userSpaceOnUse`).attr(`x1`,0).attr(`x2`,i(S[S.length-1].date)).attr(`y1`,0).attr(`y2`,0).selectAll(`stop`).data([{offset:`0%`,color:o[0]},{offset:`100%`,color:o[1]}]).enter().append(`stop`).attr(`offset`,({offset:e})=>e).attr(`stop-color`,({color:e})=>e),d=e.append(`linearGradient`).attr(`id`,M).attr(`class`,`line-gradient`).attr(`gradientUnits`,`userSpaceOnUse`).attr(`x1`,0).attr(`x2`,i(S[S.length-1].date)).attr(`y1`,0).attr(`y2`,0).selectAll(`stop`).data([{offset:`0%`,color:l[0]},{offset:`100%`,color:l[1]}]).enter().append(`stop`).attr(`offset`,({offset:e})=>e).attr(`stop-color`,({color:e})=>e)}function K(){f&&g.selectAll(`#${N}`).remove(),C&&(f=g.select(`.metadata-group`).append(`clipPath`).attr(`id`,N).attr(`class`,`clip-path`).append(`rect`).attr(`width`,0).attr(`height`,n),u(`#${N} rect`).transition().ease(P).duration(w).attr(`width`,t))}function q(){D&&g.selectAll(`.sparkline-area`).remove(),D=j().x(({date:e})=>i(e)).y0(()=>a(0)+1).y1(({value:e})=>a(e)).curve(x),g.select(`.chart-group`).append(`path`).datum(S).attr(`class`,`sparkline-area`).attr(`fill`,`url(#${A})`).attr(`d`,D).attr(`clip-path`,`url(#${N})`)}function J(){E&&g.selectAll(`.line`).remove(),E=O().curve(x).x(({date:e})=>i(e)).y(({value:e})=>a(e)),g.select(`.chart-group`).append(`path`).datum(S).attr(`class`,`line`).attr(`stroke`,`url(#${M})`).attr(`d`,E).attr(`clip-path`,`url(#${N})`).attr(`fill`,`none`)}function Y(){g.select(`.loading-state-group`).html(p)}function X(){k&&g.selectAll(`.sparkline-circle`).remove(),k=g.selectAll(`.chart-group`).append(`circle`).attr(`class`,`sparkline-circle`).attr(`cx`,i(S[S.length-1].date)).attr(`cy`,a(S[S.length-1].value)).attr(`r`,1.5)}return L.a11yTitle=function(e){return arguments.length?(B=e,this):B},L.a11yDescription=function(e){return arguments.length?(V=e,this):V},L.animationDuration=function(e){return arguments.length?(w=e,this):w},L.areaGradient=function(e){return arguments.length?(o=e,this):o},L.exportChart=function(e,t){return te.call(L,g,e,t)},L.height=function(e){return arguments.length?(n=e,this):n},L.isAnimated=function(e){return arguments.length?(C=e,this):C},L.lineGradient=function(e){return arguments.length?(l=e,this):l},L.isLoading=function(e){return arguments.length?(r=e,this):r},L.margin=function(t){return arguments.length?(e={...e,...t},this):e},L.width=function(e){return arguments.length?(t=e,this):t},L}function N(){return(N=e((()=>{g(),A(),k(),S(),n(),r(),C(),w(),a(),b(),y(),i()})))()}var P,F;function I(){return(I=e((()=>{P=[{name:`Glittering`,value:2,date:`2011-01-05T00:00:00Z`},{name:`Glittering`,value:5,date:`2011-01-06T00:00:00Z`},{name:`Glittering`,value:16,date:`2011-01-07T00:00:00Z`},{name:`Glittering`,value:23,date:`2011-01-08T00:00:00Z`},{name:`Glittering`,value:18,date:`2011-01-09T00:00:00Z`},{name:`Glittering`,value:25,date:`2011-01-10T00:00:00Z`},{name:`Glittering`,value:28,date:`2011-01-11T00:00:00Z`},{name:`Glittering`,value:2,date:`2011-01-12T00:00:00Z`}],F={data:P}})))()}var L,R;function z(){return(z=e((()=>{L=[{name:`Blazing`,value:2,date:`2011-01-05T00:00:00Z`},{name:`Blazing`,value:2,date:`2011-01-06T00:00:00Z`},{name:`Blazing`,value:3,date:`2011-01-07T00:00:00Z`},{name:`Blazing`,value:5,date:`2011-01-08T00:00:00Z`},{name:`Blazing`,value:3,date:`2011-01-09T00:00:00Z`},{name:`Blazing`,value:6,date:`2011-01-10T00:00:00Z`},{name:`Blazing`,value:7,date:`2011-01-11T00:00:00Z`},{name:`Blazing`,value:1,date:`2011-01-12T00:00:00Z`}],R={data:L}})))()}var B,V;function H(){return(H=e((()=>{B=[{name:`Glittering`,value:2,date:`2011-01-05T00:00:00Z`},{name:`Glittering`,value:-3,date:`2011-01-06T00:00:00Z`},{name:`Glittering`,value:5,date:`2011-01-07T00:00:00Z`},{name:`Glittering`,value:-1,date:`2011-01-08T00:00:00Z`},{name:`Glittering`,value:4,date:`2011-01-09T00:00:00Z`},{name:`Glittering`,value:-6,date:`2011-01-10T00:00:00Z`},{name:`Glittering`,value:3,date:`2011-01-11T00:00:00Z`},{name:`Glittering`,value:1,date:`2011-01-12T00:00:00Z`}],V={data:B}})))()}function U(e){this.Klass=U,this.config=c.defaults({},e),this.withNegativeValues=function(){let e=c.extend({},this.config,V);return new this.Klass(e)},this.with1Source=function(){let e=c.extend({},this.config,F);return new this.Klass(e)},this.withLowValues=function(){let e=c.extend({},this.config,R);return new this.Klass(e)},this.build=function(){return this.config.data}}function W(){return(W=e((()=>{f(),I(),z(),H()})))()}var G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{n(),N(),E(),t(),W(),G=()=>new U,K=e=>{let t=D(),n=M(),r=u(t),i=r.node()?r.node().getBoundingClientRect().width:!1;if(i){let t=G().with1Source().build();o(n,e).width(i),r.datum(t).call(n)}return t},K.args=d(M,[`height`,`margin`,`isAnimated`,`isLoading`]),K.args.isAnimated=!1,K.argTypes=l(K.args),q=()=>{let e=D(),t=M(),n=u(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=G().with1Source().build();return r&&(t.isAnimated(!0).height(r/4).width(r),n.datum(i).call(t)),e},J=()=>{let e=D(),t=M(),n=u(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=G().with1Source().build();t.isAnimated(!0).width(r),n.datum(e).call(t)}return e},Y=()=>{let e=D(),t=M(),n=u(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=G().withNegativeValues().build();return r&&(t.isAnimated(!0).height(r/4).width(r),n.datum(i).call(t)),e},X=()=>{let e=D(),t=M(),n=u(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=G().with1Source().build();return r&&(t.width(r).height(r/4).isAnimated(!0).isLoading(!0),n.datum(i).call(t)),e},Z={title:`Charts/Sparkline`},Q=[`Playground`,`WithSimpleData`,`WithAnimation`,`WithNegativeValues`,`WithLoadingState`],K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`args => {
  const container = getCleanContainer();
  const sparklineChart = sparkline();
  const sparklineContainer = select(container);
  const containerWidth = sparklineContainer.node() ? sparklineContainer.node().getBoundingClientRect().width : false;
  if (containerWidth) {
    const dataset = aTestDataSet().with1Source().build();
    applyArgs(sparklineChart, args).width(containerWidth);
    sparklineContainer.datum(dataset).call(sparklineChart);
  }
  return container;
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const sparklineChart = sparkline();
  const sparklineContainer = select(container);
  const containerWidth = sparklineContainer.node() ? sparklineContainer.node().getBoundingClientRect().width : false;
  const dataset = aTestDataSet().with1Source().build();
  if (containerWidth) {
    sparklineChart.isAnimated(true).height(containerWidth / 4).width(containerWidth);
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
    sparklineChart.isAnimated(true).width(containerWidth);
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
}`,...X.parameters?.docs?.source}}}})))()}$();export{K as Playground,J as WithAnimation,X as WithLoadingState,Y as WithNegativeValues,q as WithSimpleData,Q as __namedExportsOrder,Z as default};