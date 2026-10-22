import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{H as t,P as n,S as r,_ as i,a,c as o,ct as s,i as c,l,m as u,n as d,o as f,s as p,st as m,t as h}from"./index-all-DVXELaAB.js";import{i as g,t as _}from"./axis-B0w998iS.js";import{n as v,t as y}from"./linear-CP1LlO6k.js";import{n as b,t as x}from"./export-BV1q5uvn.js";import{a as S,n as C,o as w,r as T,t as E}from"./helpers-CrbXQEV5.js";function D(){let e={top:20,right:20,bottom:30,left:20},n=960,r=150,i=!1,a,o,c,d,f,p=S.colorSchemas.britecharts,m,h,g,y=``,b,C=6,w,T=5,E=.5,D,O=!1,k,A,j,M=[],N=[],P=[],F,I=()=>o/3;function L(t){t.each(function(t){a=n-(e.left??0)-(e.right??0),o=r-(e.top??0)-(e.bottom??0),G(this),i?B():(z(),{ranges:M,measures:P,markers:N}=q(t),H(),R(),Y(),J())})}function R(){w=_(c).ticks(C).tickPadding(5).tickFormat(t(y))}function z(){F.select(`.loading-state-group svg`).remove()}function B(){F.select(`.loading-state-group`).html(u)}function V(){let t=F.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${e.left}, ${e.top})`);F.append(`g`).classed(`loading-state-group`,!0),t.append(`g`).classed(`chart-group`,!0),t.append(`g`).classed(`axis-group`,!0),t.append(`g`).classed(`metadata-group`,!0)}function H(){let e=O?[a,0]:[0,a],t=[0,Math.max(...M,...N,...P)];c=v().domain(t).rangeRound(e).nice(),D=K(c),d=M.map((e,t)=>E-t*.2).reverse(),f=M.map((e,t)=>.9-t*.3).reverse(),m=p[0],h=p[1],g=p[2]}let U=null,W=null;function G(e){F||(F=s(e).append(`svg`).classed(`britechart bullet-chart`,!0),V()),F.attr(`viewBox`,[0,0,n,r]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,n).attr(`height`,r),l(F.node(),{a11yTitle:U,a11yDescription:W,fallbackTitle:`Bullet chart`})}function K(e){let t=e(0);return function(n){return Math.abs(e(n)-t)}}function q(e){return{ranges:[...e.ranges].sort().reverse(),measures:[...e.measures].sort().reverse(),markers:e.markers.length?[...e.markers].sort().reverse():[]}}function J(){F.select(`.axis-group`).attr(`transform`,`translate(0, ${o+T})`).call(w),X()}function Y(){k&&k.remove(),A&&A.remove(),j&&j.remove(),k=F.select(`.chart-group`).selectAll(`rect.range`).data(M).enter().append(`rect`).attr(`fill`,m).attr(`opacity`,(e,t)=>d[t]).attr(`class`,(e,t)=>`range r${t}`).attr(`width`,D).attr(`height`,o).attr(`x`,O?c:0),A=F.select(`.chart-group`).selectAll(`rect.measure`).data(P).enter().append(`rect`).attr(`fill`,h).attr(`fill-opacity`,(e,t)=>f[t]).attr(`class`,(e,t)=>`measure m${t}`).attr(`width`,D).attr(`height`,I).attr(`x`,O?c:0).attr(`y`,I),N.length&&(j=F.select(`.chart-group`).selectAll(`line.marker-line`).data(N).enter().append(`line`).attr(`class`,`marker-line`).attr(`stroke`,g).attr(`stroke-width`,5).attr(`opacity`,f[0]).attr(`x1`,c).attr(`x2`,c).attr(`y1`,0).attr(`y2`,o))}function X(){b&&b.remove(),b=F.select(`.axis-group`).selectAll(`line.extended-x-line`).data([0]).enter().append(`line`).attr(`class`,`extended-x-line`).attr(`x1`,0).attr(`x2`,a)}return L.a11yTitle=function(e){return arguments.length?(U=e,this):U},L.a11yDescription=function(e){return arguments.length?(W=e,this):W},L.colorSchema=function(e){return arguments.length?(p=e,this):p},L.exportChart=function(e,t){return x.call(L,F,e,t)},L.isLoading=function(e){return arguments.length?(i=e,this):i},L.height=function(e){return arguments.length?(r=e,this):r},L.isReverse=function(e){return arguments.length?(O=e,this):O},L.margin=function(t){return arguments.length?(e={...e,...t},this):e},L.numberFormat=function(e){return arguments.length?(y=e,this):y},L.paddingBetweenAxisAndChart=function(e){return arguments.length?(T=e,this):T},L.startMaxRangeOpacity=function(e){return arguments.length?(E=e,this):E},L.ticks=function(e){return arguments.length?(C=e,this):C},L.width=function(e){return arguments.length?(n=e,this):n},L}function O(){return(O=e((()=>{g(),n(),y(),m(),r(),b(),i(),w(),o()})))()}function k(e){this.Klass=k,this.config=d.defaults({},e),this.withAllElements=function(){let e=d.extend({},this.config,{data:[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600]}]});return new this.Klass(e)},this.withNoMarker=function(){let e=d.extend({},this.config,{data:[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[]}]});return new this.Klass(e)},this.withCpuData=function(){let e=d.extend({},this.config,{data:[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600]},{ranges:[1300,1900,3e3],measures:[1700,2e3],markers:[1600]},{ranges:[1300,1500,2e3],measures:[1500,1800],markers:[1950]}]});return new this.Klass(e)},this.withManyCPUData=function(){let e=d.extend({},this.config,{data:[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600,3e3]},{ranges:[1300,1900,3e3],measures:[1700,2e3],markers:[1600]},{ranges:[1300,1500,2e3],measures:[1500,1800],markers:[1950]},{ranges:[1e3,2e3],measures:[1500],markers:[]},{ranges:[1e3,2e3],measures:[500],markers:[]}]});return new this.Klass(e)},this.build=function(){return this.config.data}}function A(){return(A=e((()=>{h()})))()}var j,M,N,P,F,I,L,R;function z(){return(z=e((()=>{m(),O(),T(),a(),A(),j=()=>new k,M=e=>{let t=C(),n=s(t),r=n.node()?n.node().getBoundingClientRect().width:!1,i=j().withAllElements().build();if(r){let a;i.forEach(t=>{a=D(),c(a,e).width(r),n.datum(t).call(a)}),E(t,a,`bullet`)}return t},M.args=p(D,[`height`,`margin`,`colorSchema`,`isReverse`,`paddingBetweenAxisAndChart`,`startMaxRangeOpacity`,`ticks`,`numberFormat`,`isLoading`]),M.argTypes=f(M.args),N=()=>{let e=C(),t=s(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=j().withAllElements().build(),i;return n&&r.forEach(e=>{i=new D,i.width(n),t.datum(e).call(i)}),e},P=()=>{let e=C(),t=s(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=j().withNoMarker().build(),i;return n&&r.forEach(e=>{i=new D,i.width(n),t.datum(e).call(i)}),e},F=()=>{let e=C(),t=s(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=j().withManyCPUData().build(),i;return n&&r.forEach(e=>{i=new D,i.width(n),t.datum(e).call(i)}),e},I=()=>{let e=C(),t=s(e),n=D(),r=t.node()?t.node().getBoundingClientRect().width:!1;return r&&(n.width(r).isLoading(!0),t.datum([]).call(n)),e},L={title:`Charts/Bullet`},R=[`Playground`,`WithAllElements`,`WithNoMarker`,`WithDashboardAlignment`,`WithLoadingState`],M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`args => {
  const container = getCleanContainer();
  const bulletContainer = select(container);
  const containerWidth = bulletContainer.node() ? bulletContainer.node().getBoundingClientRect().width : false;
  const dataset = aTestDataSet().withAllElements().build();
  if (containerWidth) {
    let bulletChart;
    dataset.forEach(data => {
      bulletChart = bullet();
      applyArgs(bulletChart, args).width(containerWidth);
      bulletContainer.datum(data).call(bulletChart);
    });

    // Each bullet draws into the same container, so the last one is shown
    addExportButtons(container, bulletChart, 'bullet');
  }
  return container;
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const bulletContainer = select(container);
  const containerWidth = bulletContainer.node() ? bulletContainer.node().getBoundingClientRect().width : false;
  const dataset = aTestDataSet().withAllElements().build();
  let bulletChart;
  if (containerWidth) {
    dataset.forEach(data => {
      bulletChart = new bullet();
      bulletChart.width(containerWidth);
      bulletContainer.datum(data).call(bulletChart);
    });
  }
  return container;
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const bulletContainer = select(container);
  const containerWidth = bulletContainer.node() ? bulletContainer.node().getBoundingClientRect().width : false;
  const dataset = aTestDataSet().withNoMarker().build();
  let bulletChart;
  if (containerWidth) {
    dataset.forEach(data => {
      bulletChart = new bullet();
      bulletChart.width(containerWidth);
      bulletContainer.datum(data).call(bulletChart);
    });
  }
  return container;
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const bulletContainer = select(container);
  const containerWidth = bulletContainer.node() ? bulletContainer.node().getBoundingClientRect().width : false;
  const dataset = aTestDataSet().withManyCPUData().build();
  let bulletChart;
  if (containerWidth) {
    dataset.forEach(data => {
      bulletChart = new bullet();
      bulletChart.width(containerWidth);
      bulletContainer.datum(data).call(bulletChart);
    });
  }
  return container;
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const bulletContainer = select(container);
  const bulletChart = bullet();
  const containerWidth = bulletContainer.node() ? bulletContainer.node().getBoundingClientRect().width : false;
  if (containerWidth) {
    bulletChart.width(containerWidth).isLoading(true);
    bulletContainer.datum([]).call(bulletChart);
  }
  return container;
}`,...I.parameters?.docs?.source}}}})))()}z();export{M as Playground,N as WithAllElements,F as WithDashboardAlignment,I as WithLoadingState,P as WithNoMarker,R as __namedExportsOrder,L as default};