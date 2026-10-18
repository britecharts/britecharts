import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{K as t,M as n,N as r,X as i,Z as a,a as o,at as s,b as c,c as l,h as ee,i as u,it as d,l as te,n as f,o as p,q as m,s as h,t as g,u as ne}from"./index-all-CjBvOLpq.js";import{n as re,t as ie}from"./pointer-Djj9AZUl.js";import{n as ae}from"./quad-qkBhhiXk.js";import{i as _,n as oe,t as se}from"./axis-B0w998iS.js";import{n as ce,t as v}from"./linear-DgN1XP_B.js";import{N as le,a as y,j as b,o as ue}from"./constants-DPCOey1E.js";import{a as x,i as de,n as S,r as C,t as w}from"./scale-WsznaE7h.js";import{a as fe,r as T}from"./text-B6502c_e.js";import{n as E,t as pe}from"./export-D1ikYz6k.js";import{a as D,i as me,n as he,t as O}from"./helpers-DK6iEQil.js";import{n as ge,r as k,t as A}from"./domain-BO-SELlG.js";import{n as _e,t as j}from"./locale-MXsqjeh4.js";import{n as ve,r as M,t as ye}from"./grid-yX7qHS3-.js";import{n as N,t as P}from"./mini-tooltip-Dmhs0Nxd.js";function F(){let e=`name`,n={top:20,right:20,bottom:30,left:40},a=960,o=500,c=!1,l,ee,u,d,f,p,m=me.singleColors.aloeGreen,h=null,g=null,ie,_=5,v=5,y=1,b=I,x=!1,C=7,T=I,E=12,D=.1,he,O,k=10,j=!1,M,N=!0,P=!1,F=ue.duration,L=e=>e.attr(`fill`,({name:e})=>String(i(g?g[1]:h[e]).darker())),R,z,B=null,V=null,H=30,U=null,W=null,G=-30,K=!0,q=null,J=r,xe=le(`bar-gradient`),Se={top:0,left:0,bottom:0,right:0},Ce=ae,we=(e,t)=>70*t,Y=t(`customMouseOver`,`customMouseOut`,`customMouseMove`,`customClick`),Te=({name:e})=>e,Ee=({value:e})=>e,De=({value:e})=>S(f)(e)+C,Oe=({name:e})=>w(p)(e)+w(p).bandwidth()/2+3/8*E,ke=({name:e})=>w(f)(e),Ae=({value:e})=>S(p)(e)-C;function X(e){q&&(J=_e(q)),e.each(function(e){u=a-(n.left??0)-(n.right??0)-k*1.2,d=o-(n.top??0)-(n.bottom??0),{data:l,dataZeroed:ee}=ze(Re(e)),Le(this),c?Qe():(Ve(),Pe(),je(J),Ne(),Xe(),He(),Ye(),x&&Je(J))})}function je(e){j?(he=se(f).ticks(v,e.format(b)).tickSizeInner(+[-d]),O=oe(p).ticks(_,e.format(b))):(he=se(f),O=oe(p).ticks(_,e.format(b)))}function Me(){let e=M.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${(n.left??0)+k}, ${n.top})`);M.append(`g`).classed(`loading-state-group`,!0),e.append(`g`).classed(`grid-lines-group`,!0),e.append(`g`).classed(`chart-group`,!0),e.append(`g`).classed(`x-axis-group axis`,!0).append(`g`).classed(`x-axis-label`,!0),e.append(`g`).attr(`transform`,`translate(${-1*k}, 0)`).classed(`y-axis-group axis`,!0).append(`g`).classed(`y-axis-label`,!0),e.append(`g`).classed(`metadata-group`,!0)}function Ne(){!ie&&g&&(ie=M.select(`.metadata-group`).append(`linearGradient`).attr(`id`,xe).attr(`x1`,`0%`).attr(`y1`,`0%`).attr(`x2`,`100%`).attr(`y2`,`100%`).attr(`gradientUnits`,`userSpaceOnUse`).selectAll(`stop`).data([{offset:`0%`,color:g[0]},{offset:`50%`,color:g[1]}]).enter().append(`stop`).attr(`offset`,({offset:e})=>e).attr(`stop-color`,({color:e})=>e))}function Pe(){let e=rt();j?(f=ce().domain(e).rangeRound([0,u]),p=de().domain(l.map(Te)).rangeRound([0,d]).padding(D)):(f=de().domain(l.map(Te)).rangeRound([0,u]).padding(D),p=ce().domain(e).rangeRound([d,0])),K?l.map(e=>e).reverse().map(({name:e},t)=>({name:e,color:m[t%m.length]})):l.map(e=>e).map(({name:e},t)=>({name:e,color:m[t%m.length]})),h||=l.map(e=>e).reduce((e,{name:t},n)=>({...e,[t]:m[n%m.length]}),{})}let Fe=null,Ie=null;function Le(e){M||(M=s(e).append(`svg`).classed(`britechart bar-chart`,!0),Me()),M.attr(`viewBox`,[0,0,a,o]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,a).attr(`height`,o),te(M.node(),{a11yTitle:Fe,a11yDescription:Ie,fallbackTitle:`Bar chart`})}function Re(t){let n=t.reduce((t,n)=>{let r=n;return r.value=+r.value,r.name=String(r[e]),[...t,r]},[]);return{data:n,dataZeroed:n.map(t=>({value:0,name:String(t[e])}))}}function Z(e){return g?`url(#${xe})`:h[e]}function ze(e){let{data:t,dataZeroed:n}=e;return R&&(t.sort(R),n.sort(R)),{data:t,dataZeroed:n}}function Be(e,t){fe(e,t,0,1)}function Ve(){M.select(`.loading-state-group svg`).remove()}function Q(e){return s(e.parentNode).selectAll(`.bar`).nodes()}function He(){M.select(`.x-axis-group.axis`).attr(`transform`,`translate(0, ${d})`).call(he),M.select(`.y-axis-group.axis`).call(O),M.selectAll(`.y-axis-group .tick text`).call(Be,(n.left??0)-k),Ue()}function Ue(){W&&(U&&U.remove(),U=M.select(`.y-axis-label`).append(`text`).classed(`y-axis-label-text`,!0).attr(`x`,-d/2).attr(`y`,G).attr(`text-anchor`,`middle`).attr(`transform`,`rotate(270 0 0)`).text(W)),V&&(B&&B.remove(),B=M.select(`.x-axis-label`).append(`text`).attr(`y`,H).attr(`text-anchor`,`middle`).classed(`x-axis-label-text`,!0).attr(`x`,u/2).text(V))}function We(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`y`,d).attr(`x`,({value:e})=>A(S(f),e).start).attr(`height`,w(p).bandwidth()).attr(`width`,({value:e})=>A(S(f),e).size).on(`mouseover`,function(e,t){et(this,t,Q(this),u,d,e)}).on(`mousemove`,function(e,t){tt(this,t,u,d,e)}).on(`mouseout`,function(e,t){nt(this,t,Q(this),u,d,e)}).on(`click`,function(e,t){$(this,t,u,d,e)}).merge(e).attr(`x`,({value:e})=>A(S(f),e).start).attr(`y`,({name:e})=>w(p)(e)).attr(`height`,w(p).bandwidth()).attr(`width`,({value:e})=>A(S(f),e).size).attr(`fill`,({name:e})=>Z(e))}function Ge(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,({value:e})=>A(S(f),e).start).attr(`y`,d).attr(`height`,w(p).bandwidth()).attr(`width`,({value:e})=>A(S(f),e).size).on(`mouseover`,function(e,t){et(this,t,Q(this),u,d,e)}).on(`mousemove`,function(e,t){tt(this,t,u,d,e)}).on(`mouseout`,function(e,t){nt(this,t,Q(this),u,d,e)}).on(`click`,function(e,t){$(this,t,u,d,e)}),e.attr(`x`,({value:e})=>A(S(f),e).start).attr(`y`,({name:e})=>w(p)(e)).attr(`height`,w(p).bandwidth()).attr(`fill`,({name:e})=>Z(e)).transition().duration(F).delay(we).ease(Ce).attr(`width`,({value:e})=>A(S(f),e).size)}function Ke(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,u).attr(`y`,({value:e})=>A(S(p),e).start).attr(`width`,w(f).bandwidth()).attr(`height`,({value:e})=>A(S(p),e).size).on(`mouseover`,function(e,t){et(this,t,Q(this),u,d,e)}).on(`mousemove`,function(e,t){tt(this,t,u,d,e)}).on(`mouseout`,function(e,t){nt(this,t,Q(this),u,d,e)}).on(`click`,function(e,t){$(this,t,u,d,e)}).merge(e).attr(`x`,({name:e})=>w(f)(e)).attr(`width`,w(f).bandwidth()).attr(`fill`,({name:e})=>Z(e)).transition().duration(F).delay(we).ease(Ce).attr(`y`,({value:e})=>A(S(p),e).start).attr(`height`,({value:e})=>A(S(p),e).size)}function qe(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,u).attr(`y`,({value:e})=>A(S(p),e).start).attr(`width`,w(f).bandwidth()).attr(`height`,({value:e})=>A(S(p),e).size).on(`mouseover`,function(e,t){et(this,t,Q(this),u,d,e)}).on(`mousemove`,function(e,t){tt(this,t,u,d,e)}).on(`mouseout`,function(e,t){nt(this,t,Q(this),u,d,e)}).on(`click`,function(e,t){$(this,t,u,d,e)}).merge(e).attr(`x`,({name:e})=>w(f)(e)).attr(`y`,({value:e})=>A(S(p),e).start).attr(`width`,w(f).bandwidth()).attr(`height`,({value:e})=>A(S(p),e).size).attr(`fill`,({name:e})=>Z(e))}function Je(e){let t=j?De:ke,n=j?Oe:Ae;z&&M.selectAll(`.percentage-label-group`).remove(),z=M.select(`.metadata-group`).append(`g`).classed(`percentage-label-group`,!0).selectAll(`text`).data(l.reverse()).enter().append(`text`),z.classed(`percentage-label`,!0).attr(`x`,t).attr(`y`,n).text(({value:t})=>e.format(T)(t)).attr(`font-size`,E+`px`)}function Ye(){let e;P?(e=M.select(`.chart-group`).selectAll(`.bar`).data(ee),j?We(e):qe(e),e=M.select(`.chart-group`).selectAll(`.bar`).data(l),j?Ge(e):Ke(e),e.exit().transition().style(`opacity`,0).remove()):(e=M.select(`.chart-group`).selectAll(`.bar`).data(l),j?We(e):qe(e),e.exit().remove())}function Xe(){M.select(`.grid-lines-group`).selectAll(`grid`).remove(),j?Ze():$e()}function Ze(){ve(f).range([0,d]).hideEdges(`first`).ticks(v).extendedLine(Se.bottom)(M.select(`.grid-lines-group`))}function Qe(){M.select(`.loading-state-group`).html(ne)}function $e(){ye(p).range([0,u]).hideEdges(`first`).ticks(_).extendedLine(Se.left)(M.select(`.grid-lines-group`))}function et(e,t,n,r,i,a){Y.call(`customMouseOver`,e,t,re(a,e),[r,i]),L||=function(){};let o=L;N?o(s(e)):n.forEach(t=>{t!==e&&o(s(t))})}function tt(e,t,n,r,i){Y.call(`customMouseMove`,e,t,re(i,e),[n,r])}function nt(e,t,n,r,i,a){Y.call(`customMouseOut`,e,t,re(a,e),[r,i]),n.forEach(e=>{s(e).attr(`fill`,({name:e})=>Z(e))})}function $(e,t,n,r,i){Y.call(`customClick`,e,t,re(i,e),[n,r])}function rt(){return ge(l.map(Ee),{ratio:y,emptyDomainMax:y})}return X.a11yTitle=function(e){return arguments.length?(Fe=e,this):Fe},X.a11yDescription=function(e){return arguments.length?(Ie=e,this):Ie},X.animationDuration=function(e){return arguments.length?(F=e,this):F},X.betweenBarsPadding=function(e){return arguments.length?(D=e,this):D},X.chartGradient=function(e){return arguments.length?(g=e,this):g},X.colorMap=function(e){return arguments.length?(h=e,this):h},X.colorSchema=function(e){return arguments.length?(m=e,this):m},X.enableLabels=function(e){return arguments.length?(x=e,this):x},X.exportChart=function(e,t){return pe.call(X,M,e,t)},X.hasPercentage=function(e){return arguments.length?(b=e?be:I,this):b===be},X.hasSingleBarHighlight=function(e){return arguments.length?(N=e,this):N},X.height=function(e){return arguments.length?(o=e,this):o},X.highlightBarFunction=function(e){return arguments.length?(L=e,this):L},X.isAnimated=function(e){return arguments.length?(P=e,this):P},X.isHorizontal=function(e){return arguments.length?(j=e,this):j},X.labelsMargin=function(e){return arguments.length?(C=e,this):C},X.labelsNumberFormat=function(e){return arguments.length?(T=e,this):T},X.labelsSize=function(e){return arguments.length?(E=e,this):E},X.isLoading=function(e){return arguments.length?(c=e,this):c},X.margin=function(e){return arguments.length?(n={...n,...e},this):n},X.numberFormat=function(e){return arguments.length?(b=e,this):b},X.on=function(...e){let t=Y.on(...e);return t===Y?X:t},X.percentageAxisToMaxRatio=function(e){return arguments.length?(y=e,this):y},X.shouldReverseColorList=function(e){return arguments.length?(K=e,this):K},X.orderingFunction=function(e){return arguments.length?(R=e,this):R},X.valueLocale=function(e){return arguments.length?(q=e,this):q},X.width=function(e){return arguments.length?(a=e,this):a},X.xAxisLabel=function(e){return arguments.length?(V=e,this):V},X.xAxisLabelOffset=function(e){return arguments.length?(H=e,this):H},X.xTicks=function(e){return arguments.length?(v=e,this):v},X.yAxisLabel=function(e){return arguments.length?(W=e,this):W},X.yAxisLabelOffset=function(e){return arguments.length?(G=e,this):G},X.yAxisPaddingBetweenChart=function(e){return arguments.length?(k=e,this):k},X.yTicks=function(e){return arguments.length?(_=e,this):_},X}var be,I;function L(){return(L=e((()=>{_(),a(),m(),n(),v(),x(),ie(),d(),c(),T(),E(),k(),D(),ee(),b(),j(),y(),M(),C(),l(),be=`%`,I=`,f`})))()}function R(e){this.Klass=R,this.config=f.defaults({},e),this.withNegativeValues=function(){let e=f.extend({},this.config,{data:[{name:`Shiny`,value:12},{name:`Blazing`,value:-8},{name:`Dazzling`,value:5},{name:`Radiant`,value:-14},{name:`Sparkling`,value:9},{name:`Gleaming`,value:-3}]});return new this.Klass(e)},this.withLettersFrequency=function(){let e=f.extend({},this.config,{data:[{name:`A`,value:.08167},{name:`B`,value:.01492},{name:`C`,value:.02782},{name:`D`,value:.04253},{name:`E`,value:.12702},{name:`F`,value:.02288},{name:`G`,value:.02015},{name:`H`,value:.06094},{name:`I`,value:.06966},{name:`J`,value:.00153},{name:`K`,value:.00772},{name:`L`,value:.04025},{name:`M`,value:.02406},{name:`N`,value:.06749},{name:`O`,value:.07507},{name:`P`,value:.01929},{name:`Q`,value:95e-5},{name:`R`,value:.05987},{name:`S`,value:.06327},{name:`T`,value:.09056},{name:`U`,value:.02758},{name:`V`,value:.00978},{name:`W`,value:.0236},{name:`X`,value:.0015},{name:`Y`,value:.01974},{name:`Z`,value:74e-5}]});return new this.Klass(e)},this.withColors=function(){let e=f.extend({},this.config,{data:[{name:`Radiating`,value:2},{name:`Opalescent`,value:4},{name:`Shining`,value:3},{name:`Vibrant`,value:6},{name:`Vivid`,value:6},{name:`Brilliant`,value:1}]});return new this.Klass(e)},this.build=function(){return this.config.data}}function z(){return(z=e((()=>{g()})))()}var B,V,H,U,W,G,K,q,J,xe,Se;function Ce(){return(Ce=e((()=>{d(),L(),P(),he(),o(),z(),D(),B=()=>new R,V=e=>{let t=O(),n=F(),r=s(t),i=r.node()?r.node().getBoundingClientRect().width:!1,a=N();if(i){let t=B().withLettersFrequency().build();u(n,e).width(i).on(`customMouseOver`,a.show).on(`customMouseMove`,a.update).on(`customMouseOut`,a.hide),r.datum(t).call(n),s(`.bar-chart .metadata-group`).datum([]).call(a)}return t},V.args=h(F,[`height`,`margin`,`isHorizontal`,`isAnimated`,`colorSchema`,`shouldReverseColorList`,`betweenBarsPadding`,`hasPercentage`,`enableLabels`,`labelsNumberFormat`,`numberFormat`,`hasSingleBarHighlight`,`xTicks`,`yTicks`,`xAxisLabel`,`yAxisLabel`,`percentageAxisToMaxRatio`,`isLoading`]),V.args.isAnimated=!1,V.argTypes=p(V.args),H=()=>{let e=O(),t=F(),n=s(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=N(),a;if(r){let e=B().withColors().build();t.isAnimated(!0).margin({left:30,right:20,top:20,bottom:30}).colorSchema(me.colorSchemas.britecharts).width(r).yAxisPaddingBetweenChart(20).height(300).percentageAxisToMaxRatio(1.3).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),a=s(`.bar-chart .metadata-group`),a.datum([]).call(i)}return e},U=()=>{let e=O(),t=F(),n=s(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=N(),a;if(r){let e=B().withColors().build();t.isHorizontal(!0).isAnimated(!0).margin({left:120,right:20,top:20,bottom:30}).colorSchema(me.colorSchemas.britecharts).width(r).yAxisPaddingBetweenChart(20).height(300).percentageAxisToMaxRatio(1.3).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),a=s(`.bar-chart .metadata-group`),a.datum([]).call(i)}return e},W=()=>{let e=O(),t=F(),n=s(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=N();if(r){let e=B().withLettersFrequency().build();t.isAnimated(!0).width(r).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),s(`.bar-chart .metadata-group`).datum([]).call(i)}return e},G=()=>{let e=O(),t=F(),n=s(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=B().withLettersFrequency().build();t.width(r).hasPercentage(!0).enableLabels(!0).labelsNumberFormat(`.0%`).height(300),n.datum(e).call(t)}return e},K=()=>{let e=O(),t=F(),n=s(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=B().withNegativeValues().build();t.isAnimated(!0).width(r).height(400),n.datum(e).call(t)}return e},q=()=>{let e=O(),t=F(),n=s(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=B().withNegativeValues().build();t.isAnimated(!0).isHorizontal(!0).margin({left:100,right:40,top:40,bottom:40}).width(r).height(400),n.datum(e).call(t)}return e},J=()=>{let e=O(),t=F(),n=s(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=B().withLettersFrequency().build();return r&&(t.width(r).height(300).isAnimated(!0).isLoading(!0),n.datum(i).call(t)),e},xe={title:`Charts/Bar`},Se=[`Playground`,`VerticalBarChart`,`HorizontalBarChart`,`WithAnimation`,`WithBarLabels`,`WithNegativeValues`,`WithNegativeValuesHorizontal`,`WithLoadingState`],V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`args => {
  const container = getCleanContainer();
  const barChart = bar();
  const barContainer = select(container);
  const containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false;
  const tooltip = miniTooltip();
  if (containerWidth) {
    const dataset = aTestDataSet().withLettersFrequency().build();
    applyArgs(barChart, args).width(containerWidth).on('customMouseOver', tooltip.show).on('customMouseMove', tooltip.update).on('customMouseOut', tooltip.hide);
    barContainer.datum(dataset).call(barChart);
    select('.bar-chart .metadata-group').datum([]).call(tooltip);
  }
  return container;
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const barChart = bar();
  const barContainer = select(container);
  const containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false;
  const tooltip = miniTooltip();
  let tooltipContainer;
  if (containerWidth) {
    const dataset = aTestDataSet().withColors().build();
    barChart.isAnimated(true).margin({
      left: 30,
      right: 20,
      top: 20,
      bottom: 30
    }).colorSchema(colors.colorSchemas.britecharts).width(containerWidth).yAxisPaddingBetweenChart(20).height(300).percentageAxisToMaxRatio(1.3).on('customMouseOver', tooltip.show).on('customMouseMove', tooltip.update).on('customMouseOut', tooltip.hide);
    barContainer.datum(dataset).call(barChart);
    tooltipContainer = select('.bar-chart .metadata-group');
    tooltipContainer.datum([]).call(tooltip);
  }
  return container;
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const barChart = bar();
  const barContainer = select(container);
  const containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false;
  const tooltip = miniTooltip();
  let tooltipContainer;
  if (containerWidth) {
    const dataset = aTestDataSet().withColors().build();
    barChart.isHorizontal(true).isAnimated(true).margin({
      left: 120,
      right: 20,
      top: 20,
      bottom: 30
    }).colorSchema(colors.colorSchemas.britecharts).width(containerWidth).yAxisPaddingBetweenChart(20).height(300).percentageAxisToMaxRatio(1.3).on('customMouseOver', tooltip.show).on('customMouseMove', tooltip.update).on('customMouseOut', tooltip.hide);
    barContainer.datum(dataset).call(barChart);
    tooltipContainer = select('.bar-chart .metadata-group');
    tooltipContainer.datum([]).call(tooltip);
  }
  return container;
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const barChart = bar();
  const barContainer = select(container);
  const containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false;
  const tooltip = miniTooltip();
  if (containerWidth) {
    const dataset = aTestDataSet().withLettersFrequency().build();
    barChart.isAnimated(true).width(containerWidth).on('customMouseOver', tooltip.show).on('customMouseMove', tooltip.update).on('customMouseOut', tooltip.hide);
    barContainer.datum(dataset).call(barChart);
    select('.bar-chart .metadata-group').datum([]).call(tooltip);
  }
  return container;
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const barChart = bar();
  const barContainer = select(container);
  const containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false;
  if (containerWidth) {
    const dataset = aTestDataSet().withLettersFrequency().build();
    barChart.width(containerWidth).hasPercentage(true).enableLabels(true).labelsNumberFormat('.0%').height(300);
    barContainer.datum(dataset).call(barChart);
  }
  return container;
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const barChart = bar();
  const barContainer = select(container);
  const containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false;
  if (containerWidth) {
    const dataset = aTestDataSet().withNegativeValues().build();
    barChart.isAnimated(true).width(containerWidth).height(400);
    barContainer.datum(dataset).call(barChart);
  }
  return container;
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const barChart = bar();
  const barContainer = select(container);
  const containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false;
  if (containerWidth) {
    const dataset = aTestDataSet().withNegativeValues().build();
    barChart.isAnimated(true).isHorizontal(true).margin({
      left: 100,
      right: 40,
      top: 40,
      bottom: 40
    }).width(containerWidth).height(400);
    barContainer.datum(dataset).call(barChart);
  }
  return container;
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const barChart = bar();
  const barContainer = select(container);
  const containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false;
  const dataset = aTestDataSet().withLettersFrequency().build();
  if (containerWidth) {
    barChart.width(containerWidth).height(300).isAnimated(true).isLoading(true);
    barContainer.datum(dataset).call(barChart);
  }
  return container;
}`,...J.parameters?.docs?.source}}}})))()}Ce();export{U as HorizontalBarChart,V as Playground,H as VerticalBarChart,W as WithAnimation,G as WithBarLabels,J as WithLoadingState,K as WithNegativeValues,q as WithNegativeValuesHorizontal,Se as __namedExportsOrder,xe as default};