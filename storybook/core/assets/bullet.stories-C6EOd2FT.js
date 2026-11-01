import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{D as t,E as n,T as r,_ as i,a,b as o,ft as s,i as c,l,m as u,n as d,o as f,pt as p,q as m,s as h,t as g,u as _,z as v}from"./index-all-BIfgpmrH.js";import{i as y,t as b}from"./axis-B0w998iS.js";import{n as x,t as S}from"./linear-ZVlPWze4.js";import{n as C,t as w}from"./export-Cyy-TeXX.js";import{a as T,n as E,o as D,r as O,t as k}from"./helpers-CrbXQEV5.js";function A(){let e={top:20,right:20,bottom:30,left:20},t=960,r=150,a=!1,o,s,c,l,d,f,h=T.colorSchemas.britecharts,g,v,y,S=``,C,E=6,D,O=5,k=.5,A,j=!1,M,N,P,F=[],I=[],L=[],R,z=.3,B=()=>s/3;function V(n){n.each(function(n){o=t-(e.left??0)-(e.right??0),s=r-(e.top??0)-(e.bottom??0),Q(this),u(R.node(),Y&&!a?Z(n):null),a?W():(U(),{ranges:F,measures:L,markers:I}=$(n),K(),H(),ne(),te())})}function H(){D=b(c).ticks(E).tickPadding(5).tickFormat(m(S))}function U(){R.select(`.loading-state-group svg`).remove()}function W(){R.select(`.loading-state-group`).html(i)}function G(){let t=R.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${e.left}, ${e.top})`);R.append(`g`).classed(`loading-state-group`,!0),t.append(`g`).classed(`chart-group`,!0),t.append(`g`).classed(`axis-group`,!0),t.append(`g`).classed(`metadata-group`,!0)}function K(){let e=j?[o,0]:[0,o],t=[0,Math.max(...F,...I,...L)];c=x().domain(t).rangeRound(e).nice(),A=ee(c),l=F.map((e,t)=>k-t*.2).reverse(),d=L.map((e,t)=>.9-t*z).reverse(),f=.9-(F.length-1)*z,g=h[0],v=h[1],y=h[2]}let q=null,J=null,Y=!0,X=e=>[...e].sort((e,t)=>t-e);function Z(e){let t=$(e);return{columns:[`Series`,`Values`],rows:[[`Ranges`,t.ranges],[`Measures`,t.measures],[`Markers`,t.markers]].filter(([,e])=>e.length).map(([e,t])=>[e,t.join(`, `)])}}function Q(e){R||(R=p(e).append(`svg`).classed(`britechart bullet-chart`,!0),G()),R.attr(`viewBox`,[0,0,t,r]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,t).attr(`height`,r),_(R.node(),{a11yTitle:q,a11yDescription:J,fallbackTitle:`Bullet chart`})}function ee(e){let t=e(0);return function(n){return Math.abs(e(n)-t)}}function $(e){return{ranges:X(e.ranges),measures:X(e.measures),markers:X(e.markers??[])}}function te(){R.select(`.axis-group`).attr(`transform`,`translate(0, ${s+O})`).call(D),re()}function ne(){M&&M.remove(),N&&N.remove(),P&&P.remove(),M=R.select(`.chart-group`).selectAll(`rect.range`).data(F).enter().append(`rect`).attr(`fill`,g).attr(`opacity`,(e,t)=>l[t]).attr(`class`,(e,t)=>`range r${t}`).attr(`width`,A).attr(`height`,s).attr(`x`,j?c:0),N=R.select(`.chart-group`).selectAll(`rect.measure`).data(L).enter().append(`rect`).attr(`fill`,v).attr(`fill-opacity`,(e,t)=>d[t]).attr(`class`,(e,t)=>`measure m${t}`).attr(`width`,A).attr(`height`,B).attr(`x`,j?c:0).attr(`y`,B),I.length&&(P=R.select(`.chart-group`).selectAll(`line.marker-line`).data(I).enter().append(`line`).attr(`class`,`marker-line`).attr(`stroke`,y).attr(`stroke-width`,5).attr(`opacity`,f).attr(`x1`,c).attr(`x2`,c).attr(`y1`,0).attr(`y2`,s))}function re(){C&&C.remove(),C=R.select(`.axis-group`).selectAll(`line.extended-x-line`).data([0]).enter().append(`line`).attr(`class`,`extended-x-line`).attr(`x1`,0).attr(`x2`,o)}return V.a11yTitle=function(e){return arguments.length?(q=e,this):q},V.a11yDescription=function(e){return arguments.length?(J=e,this):J},V.a11yDataTable=function(e){return arguments.length?(Y=e,this):Y},V.colorSchema=function(e){return arguments.length?(h=e,this):h},V.exportChart=function(e,t){return w.call(V,R,e,t)},V.isLoading=function(e){return arguments.length?(a=e,this):a},V.height=function(e){return arguments.length?(r=e,this):r},V.isReverse=function(e){return arguments.length?(j=e,this):j},V.margin=function(t){return arguments.length?(e={...e,...t},this):e},V.numberFormat=function(e){return arguments.length?(S=e,this):S},V.paddingBetweenAxisAndChart=function(e){return arguments.length?(O=e,this):O},V.startMaxRangeOpacity=function(e){return arguments.length?(k=e,this):k},V.ticks=function(e){return arguments.length?(E=e,this):E},V.width=function(e){return arguments.length?(t=e,this):t},V.render=function(e,t){return n(this,e,t)},V}function j(){return(j=e((()=>{y(),v(),S(),s(),t(),C(),r(),o(),D(),l()})))()}function M(e){this.Klass=M,this.config=d.defaults({},e),this.withAllElements=function(){let e=d.extend({},this.config,{data:[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600]}]});return new this.Klass(e)},this.withNoMarker=function(){let e=d.extend({},this.config,{data:[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[]}]});return new this.Klass(e)},this.withCpuData=function(){let e=d.extend({},this.config,{data:[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600]},{ranges:[1300,1900,3e3],measures:[1700,2e3],markers:[1600]},{ranges:[1300,1500,2e3],measures:[1500,1800],markers:[1950]}]});return new this.Klass(e)},this.withIncreasingDetail=function(){let e=d.extend({},this.config,{data:[{ranges:[2e3,3500],measures:[1800]},{ranges:[1500,2100,3500],measures:[1800]},{ranges:[1500,2100,3500],measures:[1800,2200]},{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600]},{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600,3e3]}]});return new this.Klass(e)},this.withManyCPUData=function(){let e=d.extend({},this.config,{data:[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600,3e3]},{ranges:[1300,1900,3e3],measures:[1700,2e3],markers:[1600]},{ranges:[1300,1500,2e3],measures:[1500,1800],markers:[1950]},{ranges:[1e3,2e3],measures:[1500],markers:[]},{ranges:[1e3,2e3],measures:[500],markers:[]}]});return new this.Klass(e)},this.build=function(){return this.config.data}}function N(){return(N=e((()=>{g()})))()}var P,F,I,L,R,z,B,V,H;function U(){return(U=e((()=>{s(),j(),O(),a(),N(),P=()=>new M,F=[`Start with a measure on two ranges: the value and its bands`,`Add a third range for one more band`,`Add a second measure, such as a forecast`,`Add a marker for the target`,`Add a second marker for a stretch target`],I=e=>{let t=document.createElement(`div`);t.className=`story-caption`,t.innerHTML=`
        <p>
            One chart draws one metric, from a single object you can edit in
            the <code>data</code> Control. Give the values in any order.
        </p>
        <ul>
            <li><code>ranges</code>: the background bands, such as poor, fair and good.</li>
            <li><code>measures</code>: the bars, for the actual value and optionally a forecast.</li>
            <li><code>markers</code>: the target lines. Optional.</li>
        </ul>
        <p>
            The chart draws no label and has no tooltip, so name the metric in
            your own markup next to it.
        </p>
    `,e.appendChild(t)},L=({data:e,...t})=>{let n=E(),r=p(n),i=r.node()?r.node().getBoundingClientRect().width:!1;if(i){let a=A();c(a,t).width(i),a.render(r,e),k(n,a,`bullet`),I(n)}return n},L.args=h(A,[`height`,`margin`,`colorSchema`,`isReverse`,`paddingBetweenAxisAndChart`,`startMaxRangeOpacity`,`ticks`,`numberFormat`,`isLoading`]),L.argTypes={...f(L.args),data:{control:`object`,description:"One object: `ranges` are the background bands, `measures` the bars and `markers`, which is optional, the target lines."}},L.args.data=P().withAllElements().build()[0],R=()=>{let e=E(),t=p(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=P().withNoMarker().build(),i;return n&&r.forEach(e=>{i=new A,i.width(n),i.render(t,e)}),e},z=()=>{let e=E(),t=p(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=P().withIncreasingDetail().build();return n&&(r.forEach((e,r)=>{let i=t.append(`div`);i.append(`p`).attr(`class`,`story-caption`).text(F[r]),A().width(n).height(100).render(i,e)}),t.append(`p`).attr(`class`,`story-caption`).text(`Each bullet is its own chart. They line up because they share a width and a largest value, which sets the axis.`)),e},B=()=>{let e=E(),t=p(e),n=A(),r=t.node()?t.node().getBoundingClientRect().width:!1;return r&&(n.width(r).isLoading(!0),t.datum([]).call(n)),e},V={title:`Charts/Bullet`},H=[`Playground`,`WithNoMarker`,`WithDashboardAlignment`,`WithLoadingState`],L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`({
  data,
  ...args
}) => {
  const container = getCleanContainer();
  const bulletContainer = select(container);
  const containerWidth = bulletContainer.node() ? bulletContainer.node().getBoundingClientRect().width : false;
  if (containerWidth) {
    const bulletChart = bullet();
    applyArgs(bulletChart, args).width(containerWidth);
    bulletChart.render(bulletContainer, data);
    addExportButtons(container, bulletChart, 'bullet');
    addDataGuide(container);
  }
  return container;
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`() => {
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
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const bulletContainer = select(container);
  const containerWidth = bulletContainer.node() ? bulletContainer.node().getBoundingClientRect().width : false;
  const dataset = aTestDataSet().withIncreasingDetail().build();
  if (containerWidth) {
    dataset.forEach((data, index) => {
      const row = bulletContainer.append('div');
      row.append('p').attr('class', 'story-caption').text(DETAIL_STEPS[index]);
      bullet().width(containerWidth).height(100).render(row, data);
    });
    bulletContainer.append('p').attr('class', 'story-caption').text('Each bullet is its own chart. They line up because they share a width and a largest value, which sets the axis.');
  }
  return container;
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const bulletContainer = select(container);
  const bulletChart = bullet();
  const containerWidth = bulletContainer.node() ? bulletContainer.node().getBoundingClientRect().width : false;
  if (containerWidth) {
    bulletChart.width(containerWidth).isLoading(true);
    bulletContainer.datum([]).call(bulletChart);
  }
  return container;
}`,...B.parameters?.docs?.source}}}})))()}U();export{L as Playground,z as WithDashboardAlignment,B as WithLoadingState,R as WithNoMarker,H as __namedExportsOrder,V as default};