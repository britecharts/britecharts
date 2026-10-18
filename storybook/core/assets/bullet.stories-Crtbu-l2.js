import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{B as t,M as n,a as r,at as i,b as a,c as o,f as s,h as c,i as l,l as u,n as d,o as f,ot as p,s as m,t as h}from"./index-all-C7qQZ8XB.js";import{i as g,t as _}from"./axis-B0w998iS.js";import{n as v,t as y}from"./linear-DvV5jilb.js";import{n as b,t as x}from"./export-dj65piqJ.js";import{a as S,i as C,n as w,t as T}from"./helpers-Dyqi9w-G.js";function E(){let e={top:20,right:20,bottom:30,left:20},n=960,r=150,i=!1,a,o,c,l,d,f=C.colorSchemas.britecharts,m,h,g,y=``,b,S=6,w,T=5,E=.5,D,O=!1,k,A,j,M=[],N=[],P=[],F,I=()=>o/3;function L(t){t.each(function(t){a=n-(e.left??0)-(e.right??0),o=r-(e.top??0)-(e.bottom??0),G(this),i?B():(z(),{ranges:M,measures:P,markers:N}=q(t),H(),R(),Y(),J())})}function R(){w=_(c).ticks(S).tickPadding(5).tickFormat(t(y))}function z(){F.select(`.loading-state-group svg`).remove()}function B(){F.select(`.loading-state-group`).html(s)}function V(){let t=F.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${e.left}, ${e.top})`);F.append(`g`).classed(`loading-state-group`,!0),t.append(`g`).classed(`chart-group`,!0),t.append(`g`).classed(`axis-group`,!0),t.append(`g`).classed(`metadata-group`,!0)}function H(){let e=O?[a,0]:[0,a],t=[0,Math.max(...M,...N,...P)];c=v().domain(t).rangeRound(e).nice(),D=K(c),l=M.map((e,t)=>E-t*.2).reverse(),d=M.map((e,t)=>.9-t*.3).reverse(),m=f[0],h=f[1],g=f[2]}let U=null,W=null;function G(e){F||(F=p(e).append(`svg`).classed(`britechart bullet-chart`,!0),V()),F.attr(`viewBox`,[0,0,n,r]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,n).attr(`height`,r),u(F.node(),{a11yTitle:U,a11yDescription:W,fallbackTitle:`Bullet chart`})}function K(e){let t=e(0);return function(n){return Math.abs(e(n)-t)}}function q(e){return{ranges:[...e.ranges].sort().reverse(),measures:[...e.measures].sort().reverse(),markers:e.markers.length?[...e.markers].sort().reverse():[]}}function J(){F.select(`.axis-group`).attr(`transform`,`translate(0, ${o+T})`).call(w),X()}function Y(){k&&k.remove(),A&&A.remove(),j&&j.remove(),k=F.select(`.chart-group`).selectAll(`rect.range`).data(M).enter().append(`rect`).attr(`fill`,m).attr(`opacity`,(e,t)=>l[t]).attr(`class`,(e,t)=>`range r${t}`).attr(`width`,D).attr(`height`,o).attr(`x`,O?c:0),A=F.select(`.chart-group`).selectAll(`rect.measure`).data(P).enter().append(`rect`).attr(`fill`,h).attr(`fill-opacity`,(e,t)=>d[t]).attr(`class`,(e,t)=>`measure m${t}`).attr(`width`,D).attr(`height`,I).attr(`x`,O?c:0).attr(`y`,I),N.length&&(j=F.select(`.chart-group`).selectAll(`line.marker-line`).data(N).enter().append(`line`).attr(`class`,`marker-line`).attr(`stroke`,g).attr(`stroke-width`,5).attr(`opacity`,d[0]).attr(`x1`,c).attr(`x2`,c).attr(`y1`,0).attr(`y2`,o))}function X(){b&&b.remove(),b=F.select(`.axis-group`).selectAll(`line.extended-x-line`).data([0]).enter().append(`line`).attr(`class`,`extended-x-line`).attr(`x1`,0).attr(`x2`,a)}return L.a11yTitle=function(e){return arguments.length?(U=e,this):U},L.a11yDescription=function(e){return arguments.length?(W=e,this):W},L.colorSchema=function(e){return arguments.length?(f=e,this):f},L.exportChart=function(e,t){return x.call(L,F,e,t)},L.isLoading=function(e){return arguments.length?(i=e,this):i},L.height=function(e){return arguments.length?(r=e,this):r},L.isReverse=function(e){return arguments.length?(O=e,this):O},L.margin=function(t){return arguments.length?(e={...e,...t},this):e},L.numberFormat=function(e){return arguments.length?(y=e,this):y},L.paddingBetweenAxisAndChart=function(e){return arguments.length?(T=e,this):T},L.startMaxRangeOpacity=function(e){return arguments.length?(E=e,this):E},L.ticks=function(e){return arguments.length?(S=e,this):S},L.width=function(e){return arguments.length?(n=e,this):n},L}function D(){return(D=e((()=>{g(),n(),y(),i(),a(),b(),c(),S(),o()})))()}function O(e){this.Klass=O,this.config=d.defaults({},e),this.withAllElements=function(){let e=d.extend({},this.config,{data:[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600]}]});return new this.Klass(e)},this.withNoMarker=function(){let e=d.extend({},this.config,{data:[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[]}]});return new this.Klass(e)},this.withCpuData=function(){let e=d.extend({},this.config,{data:[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600]},{ranges:[1300,1900,3e3],measures:[1700,2e3],markers:[1600]},{ranges:[1300,1500,2e3],measures:[1500,1800],markers:[1950]}]});return new this.Klass(e)},this.withManyCPUData=function(){let e=d.extend({},this.config,{data:[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600,3e3]},{ranges:[1300,1900,3e3],measures:[1700,2e3],markers:[1600]},{ranges:[1300,1500,2e3],measures:[1500,1800],markers:[1950]},{ranges:[1e3,2e3],measures:[1500],markers:[]},{ranges:[1e3,2e3],measures:[500],markers:[]}]});return new this.Klass(e)},this.build=function(){return this.config.data}}function k(){return(k=e((()=>{h()})))()}var A,j,M,N,P,F,I,L;function R(){return(R=e((()=>{i(),D(),w(),r(),k(),A=()=>new O,j=e=>{let t=T(),n=p(t),r=n.node()?n.node().getBoundingClientRect().width:!1,i=A().withAllElements().build();return r&&i.forEach(t=>{let i=E();l(i,e).width(r),n.datum(t).call(i)}),t},j.args=m(E,[`height`,`margin`,`colorSchema`,`isReverse`,`paddingBetweenAxisAndChart`,`startMaxRangeOpacity`,`ticks`,`numberFormat`,`isLoading`]),j.argTypes=f(j.args),M=()=>{let e=T(),t=p(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=A().withAllElements().build(),i;return n&&r.forEach(e=>{i=new E,i.width(n),t.datum(e).call(i)}),e},N=()=>{let e=T(),t=p(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=A().withNoMarker().build(),i;return n&&r.forEach(e=>{i=new E,i.width(n),t.datum(e).call(i)}),e},P=()=>{let e=T(),t=p(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=A().withManyCPUData().build(),i;return n&&r.forEach(e=>{i=new E,i.width(n),t.datum(e).call(i)}),e},F=()=>{let e=T(),t=p(e),n=E(),r=t.node()?t.node().getBoundingClientRect().width:!1;return r&&(n.width(r).isLoading(!0),t.datum([]).call(n)),e},I={title:`Charts/Bullet`},L=[`Playground`,`WithAllElements`,`WithNoMarker`,`WithDashboardAlignment`,`WithLoadingState`],j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`args => {
  const container = getCleanContainer();
  const bulletContainer = select(container);
  const containerWidth = bulletContainer.node() ? bulletContainer.node().getBoundingClientRect().width : false;
  const dataset = aTestDataSet().withAllElements().build();
  if (containerWidth) {
    dataset.forEach(data => {
      const bulletChart = bullet();
      applyArgs(bulletChart, args).width(containerWidth);
      bulletContainer.datum(data).call(bulletChart);
    });
  }
  return container;
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`() => {
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
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`() => {
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
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`() => {
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
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const bulletContainer = select(container);
  const bulletChart = bullet();
  const containerWidth = bulletContainer.node() ? bulletContainer.node().getBoundingClientRect().width : false;
  if (containerWidth) {
    bulletChart.width(containerWidth).isLoading(true);
    bulletContainer.datum([]).call(bulletChart);
  }
  return container;
}`,...F.parameters?.docs?.source}}}})))()}R();export{j as Playground,M as WithAllElements,P as WithDashboardAlignment,F as WithLoadingState,N as WithNoMarker,L as __namedExportsOrder,I as default};