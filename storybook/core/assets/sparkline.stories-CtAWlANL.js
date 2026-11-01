import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{C as t,D as n,E as r,O as i,_t as a,a as o,b as s,i as c,l,m as ee,n as u,o as d,p as f,s as p,t as m,u as te,vt as h}from"./index-all-BabAgBuE.js";import{n as ne}from"./quad-qkBhhiXk.js";import{n as g,t as _}from"./linear-CCDNA77G.js";import{t as v}from"./extent-CL2rf33s.js";import{N as y,a as b,j as x,l as S,o as re,u as C}from"./constants-DuL84r08.js";import{n as w,t as ie}from"./export-Cyy-TeXX.js";import{a as T,n as E,o as D,r as O,t as k}from"./helpers-CrbXQEV5.js";import{n as ae,t as A}from"./line-D305VhDp.js";import{n as j,t as oe}from"./area-CTmbxlPr.js";function M(){let e={left:5,right:5,top:5,bottom:5},r=100,i=30,a=!1,o,s,c=[`var(--bc-sparkline-area-start, #f5fdff)`,`var(--bc-sparkline-area-end, #f6fefc)`],l,u=T.colorGradients.greenBlue,d,p,m,_,b,x,C=!1,w=re.duration,E,D,O,k=y(`sparkline-area-gradient`),A=y(`sparkline-line-gradient`),j=y(`maskingClip`),M=ne,N=({date:e})=>e,P=({value:e})=>e;function F(t){t.each(function(t){_=r-(e.left??0)-(e.right??0),b=i-(e.top??0)-(e.bottom??0),x=U(t),H(this),ee(m.node(),B&&!a?V():null),a?Y():(W(),L(),G(),K(),q(),J(),X())})}function I(){let t=m.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${e.left},${e.top})`);m.append(`g`).classed(`loading-state-group`,!0),t.append(`g`).classed(`chart-group`,!0),t.append(`g`).classed(`metadata-group`,!0)}function L(){o=g().domain(v(x,N)).range([0,_]),s=g().domain(v(x,P)).range([b,0])}let R=null,z=null,B=!0;function V(){return{columns:[`Date`,`Value`],rows:x.map(e=>[e.date,e.value])}}function H(e){m||(m=h(e).append(`svg`).classed(`britechart sparkline`,!0),I()),m.attr(`viewBox`,[0,0,r,i]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,r).attr(`height`,i),te(m.node(),{a11yTitle:R,a11yDescription:z,fallbackTitle:`Sparkline`})}function U(e){return e.reduce((e,t)=>{let n=t;return n.date=new Date(n.date),n.value=+n.value,[...e,n]},[])}function W(){m.select(`.loading-state-group svg`).remove()}function G(){let e=m.select(`.metadata-group`);(l||d)&&(m.selectAll(`#${k}`).remove(),m.selectAll(`#${A}`).remove()),l=e.append(`linearGradient`).attr(`id`,k).attr(`class`,`area-gradient`).attr(`gradientUnits`,`userSpaceOnUse`).attr(`x1`,0).attr(`x2`,o(x[x.length-1].date)).attr(`y1`,0).attr(`y2`,0).selectAll(`stop`).data([{offset:`0%`,color:c[0]},{offset:`100%`,color:c[1]}]).enter().append(`stop`).attr(`offset`,({offset:e})=>e).style(`stop-color`,({color:e})=>e),d=e.append(`linearGradient`).attr(`id`,A).attr(`class`,`line-gradient`).attr(`gradientUnits`,`userSpaceOnUse`).attr(`x1`,0).attr(`x2`,o(x[x.length-1].date)).attr(`y1`,0).attr(`y2`,0).selectAll(`stop`).data([{offset:`0%`,color:u[0]},{offset:`100%`,color:u[1]}]).enter().append(`stop`).attr(`offset`,({offset:e})=>e).style(`stop-color`,({color:e})=>e)}function K(){p&&m.selectAll(`#${j}`).remove(),C&&!f()&&(p=m.select(`.metadata-group`).append(`clipPath`).attr(`id`,j).attr(`class`,`clip-path`).append(`rect`).attr(`width`,0).attr(`height`,i),h(`#${j} rect`).transition().ease(M).duration(w).attr(`width`,r))}function q(){D&&m.selectAll(`.sparkline-area`).remove(),D=oe().x(({date:e})=>o(e)).y0(()=>s(0)+1).y1(({value:e})=>s(e)).curve(S),m.select(`.chart-group`).append(`path`).datum(x).attr(`class`,`sparkline-area`).attr(`fill`,`url(#${k})`).attr(`d`,D).attr(`clip-path`,`url(#${j})`)}function J(){E&&m.selectAll(`.line`).remove(),E=ae().curve(S).x(({date:e})=>o(e)).y(({value:e})=>s(e)),m.select(`.chart-group`).append(`path`).datum(x).attr(`class`,`line`).attr(`stroke`,`url(#${A})`).attr(`d`,E).attr(`clip-path`,`url(#${j})`).attr(`fill`,`none`)}function Y(){m.select(`.loading-state-group`).html(t)}function X(){O&&m.selectAll(`.sparkline-circle`).remove(),O=m.selectAll(`.chart-group`).append(`circle`).attr(`class`,`sparkline-circle`).attr(`cx`,o(x[x.length-1].date)).attr(`cy`,s(x[x.length-1].value)).attr(`r`,1.5)}return F.a11yTitle=function(e){return arguments.length?(R=e,this):R},F.a11yDescription=function(e){return arguments.length?(z=e,this):z},F.a11yDataTable=function(e){return arguments.length?(B=e,this):B},F.animationDuration=function(e){return arguments.length?(w=e,this):w},F.areaGradient=function(e){return arguments.length?(c=e,this):c},F.exportChart=function(e,t){return ie.call(F,m,e,t)},F.height=function(e){return arguments.length?(i=e,this):i},F.isAnimated=function(e){return arguments.length?(C=e,this):C},F.lineGradient=function(e){return arguments.length?(u=e,this):u},F.isLoading=function(e){return arguments.length?(a=e,this):a},F.margin=function(t){return arguments.length?(e={...e,...t},this):e},F.width=function(e){return arguments.length?(r=e,this):r},F.render=function(e,t){return n(this,e,t)},F}function N(){return(N=e((()=>{_(),j(),A(),C(),a(),i(),w(),r(),D(),s(),x(),b(),l()})))()}var P,F;function I(){return(I=e((()=>{P=[{name:`Glittering`,value:2,date:`2011-01-05T00:00:00Z`},{name:`Glittering`,value:5,date:`2011-01-06T00:00:00Z`},{name:`Glittering`,value:16,date:`2011-01-07T00:00:00Z`},{name:`Glittering`,value:23,date:`2011-01-08T00:00:00Z`},{name:`Glittering`,value:18,date:`2011-01-09T00:00:00Z`},{name:`Glittering`,value:25,date:`2011-01-10T00:00:00Z`},{name:`Glittering`,value:28,date:`2011-01-11T00:00:00Z`},{name:`Glittering`,value:2,date:`2011-01-12T00:00:00Z`}],F={data:P}})))()}var L,R;function z(){return(z=e((()=>{L=[{name:`Blazing`,value:2,date:`2011-01-05T00:00:00Z`},{name:`Blazing`,value:2,date:`2011-01-06T00:00:00Z`},{name:`Blazing`,value:3,date:`2011-01-07T00:00:00Z`},{name:`Blazing`,value:5,date:`2011-01-08T00:00:00Z`},{name:`Blazing`,value:3,date:`2011-01-09T00:00:00Z`},{name:`Blazing`,value:6,date:`2011-01-10T00:00:00Z`},{name:`Blazing`,value:7,date:`2011-01-11T00:00:00Z`},{name:`Blazing`,value:1,date:`2011-01-12T00:00:00Z`}],R={data:L}})))()}var B,V;function H(){return(H=e((()=>{B=[{name:`Glittering`,value:2,date:`2011-01-05T00:00:00Z`},{name:`Glittering`,value:-3,date:`2011-01-06T00:00:00Z`},{name:`Glittering`,value:5,date:`2011-01-07T00:00:00Z`},{name:`Glittering`,value:-1,date:`2011-01-08T00:00:00Z`},{name:`Glittering`,value:4,date:`2011-01-09T00:00:00Z`},{name:`Glittering`,value:-6,date:`2011-01-10T00:00:00Z`},{name:`Glittering`,value:3,date:`2011-01-11T00:00:00Z`},{name:`Glittering`,value:1,date:`2011-01-12T00:00:00Z`}],V={data:B}})))()}function U(e){this.Klass=U,this.config=u.defaults({},e),this.withNegativeValues=function(){let e=u.extend({},this.config,V);return new this.Klass(e)},this.with1Source=function(){let e=u.extend({},this.config,F);return new this.Klass(e)},this.withLowValues=function(){let e=u.extend({},this.config,R);return new this.Klass(e)},this.build=function(){return this.config.data}}function W(){return(W=e((()=>{m(),I(),z(),H()})))()}var G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{a(),N(),O(),o(),W(),G=()=>new U,K=e=>{let t=E(),n=M(),r=h(t),i=r.node()?r.node().getBoundingClientRect().width:!1;if(i){let a=G().with1Source().build();n.height(i/4),c(n,e).width(i),n.render(r,a),k(t,n,`sparkline`)}return t},K.args=p(M,[`height`,`margin`,`isAnimated`,`isLoading`]),K.args.isAnimated=!1,K.args.height=void 0,K.argTypes={...d(K.args),height:{control:`number`}},q=()=>{let e=E(),t=M(),n=h(e);if(n.node()&&n.node().getBoundingClientRect().width){let e=G().withLowValues().build();t.height(100).width(400),t.render(n,e)}return e},J=()=>{let e=E(),t=M(),n=h(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=G().with1Source().build();t.isAnimated(!0).height(r/4).width(r),t.render(n,e)}return e},Y=()=>{let e=E(),t=M(),n=h(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=G().withNegativeValues().build();return r&&(t.isAnimated(!0).height(r/4).width(r),t.render(n,i)),e},X=()=>{let e=E(),t=M(),n=h(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=G().with1Source().build();return r&&(t.width(r).height(r/4).isAnimated(!0).isLoading(!0),t.render(n,i)),e},Z={title:`Charts/Sparkline`},Q=[`Playground`,`WithFixedWidth`,`WithAnimation`,`WithNegativeValues`,`WithLoadingState`],K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`args => {
  const container = getCleanContainer();
  const sparklineChart = sparkline();
  const sparklineContainer = select(container);
  const containerWidth = sparklineContainer.node() ? sparklineContainer.node().getBoundingClientRect().width : false;
  if (containerWidth) {
    const dataset = aTestDataSet().with1Source().build();
    sparklineChart.height(containerWidth / 4);
    applyArgs(sparklineChart, args).width(containerWidth);
    sparklineChart.render(sparklineContainer, dataset);
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
    sparklineChart.render(sparklineContainer, dataset);
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
    sparklineChart.render(sparklineContainer, dataset);
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
    sparklineChart.render(sparklineContainer, dataset);
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
    sparklineChart.render(sparklineContainer, dataset);
  }
  return container;
}`,...X.parameters?.docs?.source}}}})))()}$();export{K as Playground,J as WithAnimation,q as WithFixedWidth,X as WithLoadingState,Y as WithNegativeValues,Q as __namedExportsOrder,Z as default};