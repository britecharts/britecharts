import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,c as n,g as r,i,l as a,n as o,o as s,ot as c,s as l,st as u,t as d,u as f,x as p,y as m}from"./index-all-C3m7CdM7.js";import{n as h}from"./quad-qkBhhiXk.js";import{n as g,t as _}from"./linear-wJXXOK0R.js";import{t as v}from"./extent-CL2rf33s.js";import{N as y,a as b,j as x,l as S,o as C,u as w}from"./constants-Bz2L7jEZ.js";import{n as T,t as ee}from"./export-BSh0UuMc.js";import{a as E,i as te,n as D,t as O}from"./helpers-BKrpDpmp.js";import{n as k,t as A}from"./line-DPOB-udA.js";import{n as j,t as ne}from"./area-5BuT2u2I.js";function M(){let e={left:5,right:5,top:5,bottom:5},t=100,n=30,r=!1,i,o,s=[`#F5FDFF`,`#F6FEFC`],c,l=te.colorGradients.greenBlue,d,p,_,b,x,w,T=!1,E=C.duration,D,O,A,j=y(`sparkline-area-gradient`),M=y(`sparkline-line-gradient`),N=y(`maskingClip`),P=h,F=({date:e})=>e,I=({value:e})=>e;function L(i){i.each(function(i){b=t-(e.left??0)-(e.right??0),x=n-(e.top??0)-(e.bottom??0),w=U(i),H(this),r?Y():(W(),z(),G(),K(),q(),J(),X())})}function R(){let t=_.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${e.left},${e.top})`);_.append(`g`).classed(`loading-state-group`,!0),t.append(`g`).classed(`chart-group`,!0),t.append(`g`).classed(`metadata-group`,!0)}function z(){i=g().domain(v(w,F)).range([0,b]),o=g().domain(v(w,I)).range([x,0])}let B=null,V=null;function H(e){_||(_=u(e).append(`svg`).classed(`britechart sparkline`,!0),R()),_.attr(`viewBox`,[0,0,t,n]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,t).attr(`height`,n),a(_.node(),{a11yTitle:B,a11yDescription:V,fallbackTitle:`Sparkline`})}function U(e){return e.reduce((e,t)=>{let n=t;return n.date=new Date(n.date),n.value=+n.value,[...e,n]},[])}function W(){_.select(`.loading-state-group svg`).remove()}function G(){let e=_.select(`.metadata-group`);(c||d)&&(_.selectAll(`#${j}`).remove(),_.selectAll(`#${M}`).remove()),c=e.append(`linearGradient`).attr(`id`,j).attr(`class`,`area-gradient`).attr(`gradientUnits`,`userSpaceOnUse`).attr(`x1`,0).attr(`x2`,i(w[w.length-1].date)).attr(`y1`,0).attr(`y2`,0).selectAll(`stop`).data([{offset:`0%`,color:s[0]},{offset:`100%`,color:s[1]}]).enter().append(`stop`).attr(`offset`,({offset:e})=>e).attr(`stop-color`,({color:e})=>e),d=e.append(`linearGradient`).attr(`id`,M).attr(`class`,`line-gradient`).attr(`gradientUnits`,`userSpaceOnUse`).attr(`x1`,0).attr(`x2`,i(w[w.length-1].date)).attr(`y1`,0).attr(`y2`,0).selectAll(`stop`).data([{offset:`0%`,color:l[0]},{offset:`100%`,color:l[1]}]).enter().append(`stop`).attr(`offset`,({offset:e})=>e).attr(`stop-color`,({color:e})=>e)}function K(){p&&_.selectAll(`#${N}`).remove(),T&&!f()&&(p=_.select(`.metadata-group`).append(`clipPath`).attr(`id`,N).attr(`class`,`clip-path`).append(`rect`).attr(`width`,0).attr(`height`,n),u(`#${N} rect`).transition().ease(P).duration(E).attr(`width`,t))}function q(){O&&_.selectAll(`.sparkline-area`).remove(),O=ne().x(({date:e})=>i(e)).y0(()=>o(0)+1).y1(({value:e})=>o(e)).curve(S),_.select(`.chart-group`).append(`path`).datum(w).attr(`class`,`sparkline-area`).attr(`fill`,`url(#${j})`).attr(`d`,O).attr(`clip-path`,`url(#${N})`)}function J(){D&&_.selectAll(`.line`).remove(),D=k().curve(S).x(({date:e})=>i(e)).y(({value:e})=>o(e)),_.select(`.chart-group`).append(`path`).datum(w).attr(`class`,`line`).attr(`stroke`,`url(#${M})`).attr(`d`,D).attr(`clip-path`,`url(#${N})`).attr(`fill`,`none`)}function Y(){_.select(`.loading-state-group`).html(m)}function X(){A&&_.selectAll(`.sparkline-circle`).remove(),A=_.selectAll(`.chart-group`).append(`circle`).attr(`class`,`sparkline-circle`).attr(`cx`,i(w[w.length-1].date)).attr(`cy`,o(w[w.length-1].value)).attr(`r`,1.5)}return L.a11yTitle=function(e){return arguments.length?(B=e,this):B},L.a11yDescription=function(e){return arguments.length?(V=e,this):V},L.animationDuration=function(e){return arguments.length?(E=e,this):E},L.areaGradient=function(e){return arguments.length?(s=e,this):s},L.exportChart=function(e,t){return ee.call(L,_,e,t)},L.height=function(e){return arguments.length?(n=e,this):n},L.isAnimated=function(e){return arguments.length?(T=e,this):T},L.lineGradient=function(e){return arguments.length?(l=e,this):l},L.isLoading=function(e){return arguments.length?(r=e,this):r},L.margin=function(t){return arguments.length?(e={...e,...t},this):e},L.width=function(e){return arguments.length?(t=e,this):t},L}function N(){return(N=e((()=>{_(),j(),A(),w(),c(),p(),T(),E(),r(),x(),b(),n()})))()}var P,F;function I(){return(I=e((()=>{P=[{name:`Glittering`,value:2,date:`2011-01-05T00:00:00Z`},{name:`Glittering`,value:5,date:`2011-01-06T00:00:00Z`},{name:`Glittering`,value:16,date:`2011-01-07T00:00:00Z`},{name:`Glittering`,value:23,date:`2011-01-08T00:00:00Z`},{name:`Glittering`,value:18,date:`2011-01-09T00:00:00Z`},{name:`Glittering`,value:25,date:`2011-01-10T00:00:00Z`},{name:`Glittering`,value:28,date:`2011-01-11T00:00:00Z`},{name:`Glittering`,value:2,date:`2011-01-12T00:00:00Z`}],F={data:P}})))()}var L,R;function z(){return(z=e((()=>{L=[{name:`Blazing`,value:2,date:`2011-01-05T00:00:00Z`},{name:`Blazing`,value:2,date:`2011-01-06T00:00:00Z`},{name:`Blazing`,value:3,date:`2011-01-07T00:00:00Z`},{name:`Blazing`,value:5,date:`2011-01-08T00:00:00Z`},{name:`Blazing`,value:3,date:`2011-01-09T00:00:00Z`},{name:`Blazing`,value:6,date:`2011-01-10T00:00:00Z`},{name:`Blazing`,value:7,date:`2011-01-11T00:00:00Z`},{name:`Blazing`,value:1,date:`2011-01-12T00:00:00Z`}],R={data:L}})))()}var B,V;function H(){return(H=e((()=>{B=[{name:`Glittering`,value:2,date:`2011-01-05T00:00:00Z`},{name:`Glittering`,value:-3,date:`2011-01-06T00:00:00Z`},{name:`Glittering`,value:5,date:`2011-01-07T00:00:00Z`},{name:`Glittering`,value:-1,date:`2011-01-08T00:00:00Z`},{name:`Glittering`,value:4,date:`2011-01-09T00:00:00Z`},{name:`Glittering`,value:-6,date:`2011-01-10T00:00:00Z`},{name:`Glittering`,value:3,date:`2011-01-11T00:00:00Z`},{name:`Glittering`,value:1,date:`2011-01-12T00:00:00Z`}],V={data:B}})))()}function U(e){this.Klass=U,this.config=o.defaults({},e),this.withNegativeValues=function(){let e=o.extend({},this.config,V);return new this.Klass(e)},this.with1Source=function(){let e=o.extend({},this.config,F);return new this.Klass(e)},this.withLowValues=function(){let e=o.extend({},this.config,R);return new this.Klass(e)},this.build=function(){return this.config.data}}function W(){return(W=e((()=>{d(),I(),z(),H()})))()}var G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{c(),N(),D(),t(),W(),G=()=>new U,K=e=>{let t=O(),n=M(),r=u(t),a=r.node()?r.node().getBoundingClientRect().width:!1;if(a){let t=G().with1Source().build();i(n,e).width(a),r.datum(t).call(n)}return t},K.args=l(M,[`height`,`margin`,`isAnimated`,`isLoading`]),K.args.isAnimated=!1,K.argTypes=s(K.args),q=()=>{let e=O(),t=M(),n=u(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=G().with1Source().build();return r&&(t.isAnimated(!0).height(r/4).width(r),n.datum(i).call(t)),e},J=()=>{let e=O(),t=M(),n=u(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=G().with1Source().build();t.isAnimated(!0).width(r),n.datum(e).call(t)}return e},Y=()=>{let e=O(),t=M(),n=u(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=G().withNegativeValues().build();return r&&(t.isAnimated(!0).height(r/4).width(r),n.datum(i).call(t)),e},X=()=>{let e=O(),t=M(),n=u(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=G().with1Source().build();return r&&(t.width(r).height(r/4).isAnimated(!0).isLoading(!0),n.datum(i).call(t)),e},Z={title:`Charts/Sparkline`},Q=[`Playground`,`WithSimpleData`,`WithAnimation`,`WithNegativeValues`,`WithLoadingState`],K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`args => {
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