import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{G as t,L as n,T as r,_ as i,a,b as o,dt as s,i as c,l,m as u,n as d,o as f,s as p,t as m,u as h,ut as g}from"./index-all-DhiTiQVV.js";import{i as _,t as v}from"./axis-B0w998iS.js";import{n as y,t as b}from"./linear-C4axaRz1.js";import{n as x,t as S}from"./export-BV1q5uvn.js";import{a as C,n as w,o as T,r as E,t as D}from"./helpers-CrbXQEV5.js";function O(){let e={top:20,right:20,bottom:30,left:20},n=960,r=150,a=!1,o,c,l,d,f,p=C.colorSchemas.britecharts,m,g,_,b=``,x,w=6,T,E=5,D=.5,O,k=!1,A,j,M,N=[],P=[],F=[],I,L=()=>c/3;function R(t){t.each(function(t){o=n-(e.left??0)-(e.right??0),c=r-(e.top??0)-(e.bottom??0),J(this),u(I.node(),K&&!a?q(t):null),a?V():(B(),{ranges:N,measures:F,markers:P}=X(t),U(),z(),Q(),Z())})}function z(){T=v(l).ticks(w).tickPadding(5).tickFormat(t(b))}function B(){I.select(`.loading-state-group svg`).remove()}function V(){I.select(`.loading-state-group`).html(i)}function H(){let t=I.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${e.left}, ${e.top})`);I.append(`g`).classed(`loading-state-group`,!0),t.append(`g`).classed(`chart-group`,!0),t.append(`g`).classed(`axis-group`,!0),t.append(`g`).classed(`metadata-group`,!0)}function U(){let e=k?[o,0]:[0,o],t=[0,Math.max(...N,...P,...F)];l=y().domain(t).rangeRound(e).nice(),O=Y(l),d=N.map((e,t)=>D-t*.2).reverse(),f=N.map((e,t)=>.9-t*.3).reverse(),m=p[0],g=p[1],_=p[2]}let W=null,G=null,K=!0;function q(e){let t=X(e);return{columns:[`Series`,`Values`],rows:[[`Ranges`,t.ranges],[`Measures`,t.measures],[`Markers`,t.markers]].filter(([,e])=>e.length).map(([e,t])=>[e,t.join(`, `)])}}function J(e){I||(I=s(e).append(`svg`).classed(`britechart bullet-chart`,!0),H()),I.attr(`viewBox`,[0,0,n,r]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,n).attr(`height`,r),h(I.node(),{a11yTitle:W,a11yDescription:G,fallbackTitle:`Bullet chart`})}function Y(e){let t=e(0);return function(n){return Math.abs(e(n)-t)}}function X(e){return{ranges:[...e.ranges].sort().reverse(),measures:[...e.measures].sort().reverse(),markers:e.markers.length?[...e.markers].sort().reverse():[]}}function Z(){I.select(`.axis-group`).attr(`transform`,`translate(0, ${c+E})`).call(T),$()}function Q(){A&&A.remove(),j&&j.remove(),M&&M.remove(),A=I.select(`.chart-group`).selectAll(`rect.range`).data(N).enter().append(`rect`).attr(`fill`,m).attr(`opacity`,(e,t)=>d[t]).attr(`class`,(e,t)=>`range r${t}`).attr(`width`,O).attr(`height`,c).attr(`x`,k?l:0),j=I.select(`.chart-group`).selectAll(`rect.measure`).data(F).enter().append(`rect`).attr(`fill`,g).attr(`fill-opacity`,(e,t)=>f[t]).attr(`class`,(e,t)=>`measure m${t}`).attr(`width`,O).attr(`height`,L).attr(`x`,k?l:0).attr(`y`,L),P.length&&(M=I.select(`.chart-group`).selectAll(`line.marker-line`).data(P).enter().append(`line`).attr(`class`,`marker-line`).attr(`stroke`,_).attr(`stroke-width`,5).attr(`opacity`,f[0]).attr(`x1`,l).attr(`x2`,l).attr(`y1`,0).attr(`y2`,c))}function $(){x&&x.remove(),x=I.select(`.axis-group`).selectAll(`line.extended-x-line`).data([0]).enter().append(`line`).attr(`class`,`extended-x-line`).attr(`x1`,0).attr(`x2`,o)}return R.a11yTitle=function(e){return arguments.length?(W=e,this):W},R.a11yDescription=function(e){return arguments.length?(G=e,this):G},R.a11yDataTable=function(e){return arguments.length?(K=e,this):K},R.colorSchema=function(e){return arguments.length?(p=e,this):p},R.exportChart=function(e,t){return S.call(R,I,e,t)},R.isLoading=function(e){return arguments.length?(a=e,this):a},R.height=function(e){return arguments.length?(r=e,this):r},R.isReverse=function(e){return arguments.length?(k=e,this):k},R.margin=function(t){return arguments.length?(e={...e,...t},this):e},R.numberFormat=function(e){return arguments.length?(b=e,this):b},R.paddingBetweenAxisAndChart=function(e){return arguments.length?(E=e,this):E},R.startMaxRangeOpacity=function(e){return arguments.length?(D=e,this):D},R.ticks=function(e){return arguments.length?(w=e,this):w},R.width=function(e){return arguments.length?(n=e,this):n},R}function k(){return(k=e((()=>{_(),n(),b(),g(),r(),x(),o(),T(),l()})))()}function A(e){this.Klass=A,this.config=d.defaults({},e),this.withAllElements=function(){let e=d.extend({},this.config,{data:[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600]}]});return new this.Klass(e)},this.withNoMarker=function(){let e=d.extend({},this.config,{data:[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[]}]});return new this.Klass(e)},this.withCpuData=function(){let e=d.extend({},this.config,{data:[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600]},{ranges:[1300,1900,3e3],measures:[1700,2e3],markers:[1600]},{ranges:[1300,1500,2e3],measures:[1500,1800],markers:[1950]}]});return new this.Klass(e)},this.withManyCPUData=function(){let e=d.extend({},this.config,{data:[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600,3e3]},{ranges:[1300,1900,3e3],measures:[1700,2e3],markers:[1600]},{ranges:[1300,1500,2e3],measures:[1500,1800],markers:[1950]},{ranges:[1e3,2e3],measures:[1500],markers:[]},{ranges:[1e3,2e3],measures:[500],markers:[]}]});return new this.Klass(e)},this.build=function(){return this.config.data}}function j(){return(j=e((()=>{m()})))()}var M,N,P,F,I,L,R,z;function B(){return(B=e((()=>{g(),k(),E(),a(),j(),M=()=>new A,N=e=>{let t=w(),n=s(t),r=n.node()?n.node().getBoundingClientRect().width:!1,i=M().withAllElements().build();if(r){let a;i.forEach(t=>{a=O(),c(a,e).width(r),n.datum(t).call(a)}),D(t,a,`bullet`)}return t},N.args=p(O,[`height`,`margin`,`colorSchema`,`isReverse`,`paddingBetweenAxisAndChart`,`startMaxRangeOpacity`,`ticks`,`numberFormat`,`isLoading`]),N.argTypes=f(N.args),P=()=>{let e=w(),t=s(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=M().withAllElements().build(),i;return n&&r.forEach(e=>{i=new O,i.width(n),t.datum(e).call(i)}),e},F=()=>{let e=w(),t=s(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=M().withNoMarker().build(),i;return n&&r.forEach(e=>{i=new O,i.width(n),t.datum(e).call(i)}),e},I=()=>{let e=w(),t=s(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=M().withManyCPUData().build(),i;return n&&r.forEach(e=>{i=new O,i.width(n),t.datum(e).call(i)}),e},L=()=>{let e=w(),t=s(e),n=O(),r=t.node()?t.node().getBoundingClientRect().width:!1;return r&&(n.width(r).isLoading(!0),t.datum([]).call(n)),e},R={title:`Charts/Bullet`},z=[`Playground`,`WithAllElements`,`WithNoMarker`,`WithDashboardAlignment`,`WithLoadingState`],N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`args => {
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
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`() => {
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
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`() => {
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
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`() => {
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
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const bulletContainer = select(container);
  const bulletChart = bullet();
  const containerWidth = bulletContainer.node() ? bulletContainer.node().getBoundingClientRect().width : false;
  if (containerWidth) {
    bulletChart.width(containerWidth).isLoading(true);
    bulletContainer.datum([]).call(bulletChart);
  }
  return container;
}`,...L.parameters?.docs?.source}}}})))()}B();export{N as Playground,P as WithAllElements,I as WithDashboardAlignment,L as WithLoadingState,F as WithNoMarker,z as __namedExportsOrder,R as default};