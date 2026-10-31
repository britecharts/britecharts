import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{D as t,E as n,T as r,_ as i,a,b as o,ft as s,i as c,l,m as u,n as d,o as f,pt as p,q as m,s as h,t as g,u as _,z as v}from"./index-all-BIfgpmrH.js";import{i as y,t as b}from"./axis-B0w998iS.js";import{n as x,t as S}from"./linear-ZVlPWze4.js";import{n as C,t as w}from"./export-Cyy-TeXX.js";import{a as T,n as E,o as D,r as O,t as k}from"./helpers-CrbXQEV5.js";function A(){let e={top:20,right:20,bottom:30,left:20},t=960,r=150,a=!1,o,s,c,l,d,f=T.colorSchemas.britecharts,h,g,v,y=``,S,C=6,E,D=5,O=.5,k,A=!1,j,M,N,P=[],F=[],I=[],L,R=()=>s/3;function z(n){n.each(function(n){o=t-(e.left??0)-(e.right??0),s=r-(e.top??0)-(e.bottom??0),Y(this),u(L.node(),q&&!a?J(n):null),a?H():(V(),{ranges:P,measures:I,markers:F}=Z(n),W(),B(),$(),Q())})}function B(){E=b(c).ticks(C).tickPadding(5).tickFormat(m(y))}function V(){L.select(`.loading-state-group svg`).remove()}function H(){L.select(`.loading-state-group`).html(i)}function U(){let t=L.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${e.left}, ${e.top})`);L.append(`g`).classed(`loading-state-group`,!0),t.append(`g`).classed(`chart-group`,!0),t.append(`g`).classed(`axis-group`,!0),t.append(`g`).classed(`metadata-group`,!0)}function W(){let e=A?[o,0]:[0,o],t=[0,Math.max(...P,...F,...I)];c=x().domain(t).rangeRound(e).nice(),k=X(c),l=P.map((e,t)=>O-t*.2).reverse(),d=P.map((e,t)=>.9-t*.3).reverse(),h=f[0],g=f[1],v=f[2]}let G=null,K=null,q=!0;function J(e){let t=Z(e);return{columns:[`Series`,`Values`],rows:[[`Ranges`,t.ranges],[`Measures`,t.measures],[`Markers`,t.markers]].filter(([,e])=>e.length).map(([e,t])=>[e,t.join(`, `)])}}function Y(e){L||(L=p(e).append(`svg`).classed(`britechart bullet-chart`,!0),U()),L.attr(`viewBox`,[0,0,t,r]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,t).attr(`height`,r),_(L.node(),{a11yTitle:G,a11yDescription:K,fallbackTitle:`Bullet chart`})}function X(e){let t=e(0);return function(n){return Math.abs(e(n)-t)}}function Z(e){return{ranges:[...e.ranges].sort().reverse(),measures:[...e.measures].sort().reverse(),markers:e.markers.length?[...e.markers].sort().reverse():[]}}function Q(){L.select(`.axis-group`).attr(`transform`,`translate(0, ${s+D})`).call(E),ee()}function $(){j&&j.remove(),M&&M.remove(),N&&N.remove(),j=L.select(`.chart-group`).selectAll(`rect.range`).data(P).enter().append(`rect`).attr(`fill`,h).attr(`opacity`,(e,t)=>l[t]).attr(`class`,(e,t)=>`range r${t}`).attr(`width`,k).attr(`height`,s).attr(`x`,A?c:0),M=L.select(`.chart-group`).selectAll(`rect.measure`).data(I).enter().append(`rect`).attr(`fill`,g).attr(`fill-opacity`,(e,t)=>d[t]).attr(`class`,(e,t)=>`measure m${t}`).attr(`width`,k).attr(`height`,R).attr(`x`,A?c:0).attr(`y`,R),F.length&&(N=L.select(`.chart-group`).selectAll(`line.marker-line`).data(F).enter().append(`line`).attr(`class`,`marker-line`).attr(`stroke`,v).attr(`stroke-width`,5).attr(`opacity`,d[0]).attr(`x1`,c).attr(`x2`,c).attr(`y1`,0).attr(`y2`,s))}function ee(){S&&S.remove(),S=L.select(`.axis-group`).selectAll(`line.extended-x-line`).data([0]).enter().append(`line`).attr(`class`,`extended-x-line`).attr(`x1`,0).attr(`x2`,o)}return z.a11yTitle=function(e){return arguments.length?(G=e,this):G},z.a11yDescription=function(e){return arguments.length?(K=e,this):K},z.a11yDataTable=function(e){return arguments.length?(q=e,this):q},z.colorSchema=function(e){return arguments.length?(f=e,this):f},z.exportChart=function(e,t){return w.call(z,L,e,t)},z.isLoading=function(e){return arguments.length?(a=e,this):a},z.height=function(e){return arguments.length?(r=e,this):r},z.isReverse=function(e){return arguments.length?(A=e,this):A},z.margin=function(t){return arguments.length?(e={...e,...t},this):e},z.numberFormat=function(e){return arguments.length?(y=e,this):y},z.paddingBetweenAxisAndChart=function(e){return arguments.length?(D=e,this):D},z.startMaxRangeOpacity=function(e){return arguments.length?(O=e,this):O},z.ticks=function(e){return arguments.length?(C=e,this):C},z.width=function(e){return arguments.length?(t=e,this):t},z.render=function(e,t){return n(this,e,t)},z}function j(){return(j=e((()=>{y(),v(),S(),s(),t(),C(),r(),o(),D(),l()})))()}function M(e){this.Klass=M,this.config=d.defaults({},e),this.withAllElements=function(){let e=d.extend({},this.config,{data:[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600]}]});return new this.Klass(e)},this.withNoMarker=function(){let e=d.extend({},this.config,{data:[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[]}]});return new this.Klass(e)},this.withCpuData=function(){let e=d.extend({},this.config,{data:[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600]},{ranges:[1300,1900,3e3],measures:[1700,2e3],markers:[1600]},{ranges:[1300,1500,2e3],measures:[1500,1800],markers:[1950]}]});return new this.Klass(e)},this.withManyCPUData=function(){let e=d.extend({},this.config,{data:[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600,3e3]},{ranges:[1300,1900,3e3],measures:[1700,2e3],markers:[1600]},{ranges:[1300,1500,2e3],measures:[1500,1800],markers:[1950]},{ranges:[1e3,2e3],measures:[1500],markers:[]},{ranges:[1e3,2e3],measures:[500],markers:[]}]});return new this.Klass(e)},this.build=function(){return this.config.data}}function N(){return(N=e((()=>{g()})))()}var P,F,I,L,R,z,B;function V(){return(V=e((()=>{s(),j(),O(),a(),N(),P=()=>new M,F=e=>{let t=E(),n=p(t),r=n.node()?n.node().getBoundingClientRect().width:!1,i=P().withAllElements().build();if(r){let a;i.forEach(t=>{a=A(),c(a,e).width(r),a.render(n,t)}),k(t,a,`bullet`)}return t},F.args=h(A,[`height`,`margin`,`colorSchema`,`isReverse`,`paddingBetweenAxisAndChart`,`startMaxRangeOpacity`,`ticks`,`numberFormat`,`isLoading`]),F.argTypes=f(F.args),I=()=>{let e=E(),t=p(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=P().withNoMarker().build(),i;return n&&r.forEach(e=>{i=new A,i.width(n),i.render(t,e)}),e},L=()=>{let e=E(),t=p(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=P().withManyCPUData().build(),i;return n&&r.forEach(e=>{i=new A,i.width(n),i.render(t,e)}),e},R=()=>{let e=E(),t=p(e),n=A(),r=t.node()?t.node().getBoundingClientRect().width:!1;return r&&(n.width(r).isLoading(!0),t.datum([]).call(n)),e},z={title:`Charts/Bullet`},B=[`Playground`,`WithNoMarker`,`WithDashboardAlignment`,`WithLoadingState`],F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`args => {
  const container = getCleanContainer();
  const bulletContainer = select(container);
  const containerWidth = bulletContainer.node() ? bulletContainer.node().getBoundingClientRect().width : false;
  const dataset = aTestDataSet().withAllElements().build();
  if (containerWidth) {
    let bulletChart;
    dataset.forEach(data => {
      bulletChart = bullet();
      applyArgs(bulletChart, args).width(containerWidth);
      bulletChart.render(bulletContainer, data);
    });

    // Each bullet draws into the same container, so the last one is shown
    addExportButtons(container, bulletChart, 'bullet');
  }
  return container;
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const bulletContainer = select(container);
  const containerWidth = bulletContainer.node() ? bulletContainer.node().getBoundingClientRect().width : false;
  const dataset = aTestDataSet().withNoMarker().build();
  let bulletChart;
  if (containerWidth) {
    dataset.forEach(data => {
      bulletChart = new bullet();
      bulletChart.width(containerWidth);
      bulletChart.render(bulletContainer, data);
    });
  }
  return container;
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const bulletContainer = select(container);
  const containerWidth = bulletContainer.node() ? bulletContainer.node().getBoundingClientRect().width : false;
  const dataset = aTestDataSet().withManyCPUData().build();
  let bulletChart;
  if (containerWidth) {
    dataset.forEach(data => {
      bulletChart = new bullet();
      bulletChart.width(containerWidth);
      bulletChart.render(bulletContainer, data);
    });
  }
  return container;
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const bulletContainer = select(container);
  const bulletChart = bullet();
  const containerWidth = bulletContainer.node() ? bulletContainer.node().getBoundingClientRect().width : false;
  if (containerWidth) {
    bulletChart.width(containerWidth).isLoading(true);
    bulletContainer.datum([]).call(bulletChart);
  }
  return container;
}`,...R.parameters?.docs?.source}}}})))()}V();export{F as Playground,L as WithDashboardAlignment,R as WithLoadingState,I as WithNoMarker,B as __namedExportsOrder,z as default};