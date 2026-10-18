import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{J as t,M as n,N as r,Q as i,Z as a,a as o,at as s,b as ee,c,h as l,i as u,l as te,n as d,o as f,ot as p,q as ne,s as m,t as re,u as ie}from"./index-all-C7qQZ8XB.js";import{n as h,t as g}from"./pointer-Djj9AZUl.js";import{n as ae}from"./quad-qkBhhiXk.js";import{i as oe,n as se,t as ce}from"./axis-B0w998iS.js";import{n as le,t as _}from"./linear-DvV5jilb.js";import{N as ue,a as v,j as y,o as de}from"./constants-rxZr75Q8.js";import{a as b,i as fe,n as x,r as S,t as C}from"./scale-B8xO0Jud.js";import{a as pe,r as w}from"./text-CSzqSf32.js";import{n as T,t as me}from"./export-dj65piqJ.js";import{a as E,i as he,n as D,o as ge,t as O}from"./helpers-Dyqi9w-G.js";import{n as _e,r as ve,t as k}from"./domain-BHX7TehT.js";import{n as ye,t as A}from"./locale-El_D0f1y.js";import{n as be,r as j,t as xe}from"./grid-yX7qHS3-.js";import{n as M,t as N}from"./mini-tooltip-D0uSv2W_.js";function P(){let e=`name`,t={top:20,right:20,bottom:30,left:40},n=960,i=500,o=!1,s,ee,c,l,u,d,f=he.singleColors.aloeGreen,m=null,re=null,g=null,oe,_=5,v=5,y=1,b=F,S=!1,w=7,T=F,E=12,D=.1,O,ve,A=10,j=!1,M,N=!0,P=!1,I=de.duration,L=e=>e.attr(`fill`,({name:e})=>String(a(g?g[1]:m[e]).darker())),R,z,B=null,V=null,H=30,U=null,W=null,G=-30,K=!0,q=null,J=r,Ce=ue(`bar-gradient`),we={top:0,left:0,bottom:0,right:0},Te=ae,Ee=(e,t)=>70*t,Y=ne(`customMouseOver`,`customMouseOut`,`customMouseMove`,`customClick`),De=({name:e})=>e,Oe=({value:e})=>e,ke=({value:e})=>x(u)(e)+w,Ae=({name:e})=>C(d)(e)+C(d).bandwidth()/2+3/8*E,je=({name:e})=>C(u)(e),Me=({value:e})=>x(d)(e)-w;function X(e){q&&(J=ye(q)),e.each(function(e){c=n-(t.left??0)-(t.right??0)-A*1.2,l=i-(t.top??0)-(t.bottom??0),{data:s,dataZeroed:ee}=Ve(Be(e)),ze(this),o?et():(Ue(),Ie(),Ne(J),Fe(),Qe(),We(),Ze(),S&&Xe(J))})}function Ne(e){j?(O=ce(u).ticks(v,e.format(b)).tickSizeInner(+[-l]),ve=se(d).ticks(_,e.format(b))):(O=ce(u),ve=se(d).ticks(_,e.format(b)))}function Pe(){let e=M.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${(t.left??0)+A}, ${t.top})`);M.append(`g`).classed(`loading-state-group`,!0),e.append(`g`).classed(`grid-lines-group`,!0),e.append(`g`).classed(`chart-group`,!0),e.append(`g`).classed(`x-axis-group axis`,!0).append(`g`).classed(`x-axis-label`,!0),e.append(`g`).attr(`transform`,`translate(${-1*A}, 0)`).classed(`y-axis-group axis`,!0).append(`g`).classed(`y-axis-label`,!0),e.append(`g`).classed(`metadata-group`,!0)}function Fe(){!oe&&g&&(oe=M.select(`.metadata-group`).append(`linearGradient`).attr(`id`,Ce).attr(`x1`,`0%`).attr(`y1`,`0%`).attr(`x2`,`100%`).attr(`y2`,`100%`).attr(`gradientUnits`,`userSpaceOnUse`).selectAll(`stop`).data([{offset:`0%`,color:g[0]},{offset:`50%`,color:g[1]}]).enter().append(`stop`).attr(`offset`,({offset:e})=>e).attr(`stop-color`,({color:e})=>e))}function Ie(){let e=at();j?(u=le().domain(e).rangeRound([0,c]),d=fe().domain(s.map(De)).rangeRound([0,l]).padding(D)):(u=fe().domain(s.map(De)).rangeRound([0,c]).padding(D),d=le().domain(e).rangeRound([l,0])),K?s.map(e=>e).reverse().map(({name:e},t)=>({name:e,color:f[t%f.length]})):s.map(e=>e).map(({name:e},t)=>({name:e,color:f[t%f.length]})),m=ge(s.map(e=>e).reduce((e,{name:t},n)=>({...e,[t]:f[n%f.length]}),{}),re)}let Le=null,Re=null;function ze(e){M||(M=p(e).append(`svg`).classed(`britechart bar-chart`,!0),Pe()),M.attr(`viewBox`,[0,0,n,i]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,n).attr(`height`,i),te(M.node(),{a11yTitle:Le,a11yDescription:Re,fallbackTitle:`Bar chart`})}function Be(t){let n=t.reduce((t,n)=>{let r=n;return r.value=+r.value,r.name=String(r[e]),[...t,r]},[]);return{data:n,dataZeroed:n.map(t=>({value:0,name:String(t[e])}))}}function Z(e){return g?`url(#${Ce})`:m[e]}function Ve(e){let{data:t,dataZeroed:n}=e;return R&&(t.sort(R),n.sort(R)),{data:t,dataZeroed:n}}function He(e,t){pe(e,t,0,1)}function Ue(){M.select(`.loading-state-group svg`).remove()}function Q(e){return p(e.parentNode).selectAll(`.bar`).nodes()}function We(){M.select(`.x-axis-group.axis`).attr(`transform`,`translate(0, ${l})`).call(O),M.select(`.y-axis-group.axis`).call(ve),M.selectAll(`.y-axis-group .tick text`).call(He,(t.left??0)-A),Ge()}function Ge(){W&&(U&&U.remove(),U=M.select(`.y-axis-label`).append(`text`).classed(`y-axis-label-text`,!0).attr(`x`,-l/2).attr(`y`,G).attr(`text-anchor`,`middle`).attr(`transform`,`rotate(270 0 0)`).text(W)),V&&(B&&B.remove(),B=M.select(`.x-axis-label`).append(`text`).attr(`y`,H).attr(`text-anchor`,`middle`).classed(`x-axis-label-text`,!0).attr(`x`,c/2).text(V))}function Ke(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`y`,l).attr(`x`,({value:e})=>k(x(u),e).start).attr(`height`,C(d).bandwidth()).attr(`width`,({value:e})=>k(x(u),e).size).on(`mouseover`,function(e,t){nt(this,t,Q(this),c,l,e)}).on(`mousemove`,function(e,t){rt(this,t,c,l,e)}).on(`mouseout`,function(e,t){it(this,t,Q(this),c,l,e)}).on(`click`,function(e,t){$(this,t,c,l,e)}).merge(e).attr(`x`,({value:e})=>k(x(u),e).start).attr(`y`,({name:e})=>C(d)(e)).attr(`height`,C(d).bandwidth()).attr(`width`,({value:e})=>k(x(u),e).size).attr(`fill`,({name:e})=>Z(e))}function qe(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,({value:e})=>k(x(u),e).start).attr(`y`,l).attr(`height`,C(d).bandwidth()).attr(`width`,({value:e})=>k(x(u),e).size).on(`mouseover`,function(e,t){nt(this,t,Q(this),c,l,e)}).on(`mousemove`,function(e,t){rt(this,t,c,l,e)}).on(`mouseout`,function(e,t){it(this,t,Q(this),c,l,e)}).on(`click`,function(e,t){$(this,t,c,l,e)}),e.attr(`x`,({value:e})=>k(x(u),e).start).attr(`y`,({name:e})=>C(d)(e)).attr(`height`,C(d).bandwidth()).attr(`fill`,({name:e})=>Z(e)).transition().duration(I).delay(Ee).ease(Te).attr(`width`,({value:e})=>k(x(u),e).size)}function Je(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,c).attr(`y`,({value:e})=>k(x(d),e).start).attr(`width`,C(u).bandwidth()).attr(`height`,({value:e})=>k(x(d),e).size).on(`mouseover`,function(e,t){nt(this,t,Q(this),c,l,e)}).on(`mousemove`,function(e,t){rt(this,t,c,l,e)}).on(`mouseout`,function(e,t){it(this,t,Q(this),c,l,e)}).on(`click`,function(e,t){$(this,t,c,l,e)}).merge(e).attr(`x`,({name:e})=>C(u)(e)).attr(`width`,C(u).bandwidth()).attr(`fill`,({name:e})=>Z(e)).transition().duration(I).delay(Ee).ease(Te).attr(`y`,({value:e})=>k(x(d),e).start).attr(`height`,({value:e})=>k(x(d),e).size)}function Ye(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,c).attr(`y`,({value:e})=>k(x(d),e).start).attr(`width`,C(u).bandwidth()).attr(`height`,({value:e})=>k(x(d),e).size).on(`mouseover`,function(e,t){nt(this,t,Q(this),c,l,e)}).on(`mousemove`,function(e,t){rt(this,t,c,l,e)}).on(`mouseout`,function(e,t){it(this,t,Q(this),c,l,e)}).on(`click`,function(e,t){$(this,t,c,l,e)}).merge(e).attr(`x`,({name:e})=>C(u)(e)).attr(`y`,({value:e})=>k(x(d),e).start).attr(`width`,C(u).bandwidth()).attr(`height`,({value:e})=>k(x(d),e).size).attr(`fill`,({name:e})=>Z(e))}function Xe(e){let t=j?ke:je,n=j?Ae:Me;z&&M.selectAll(`.percentage-label-group`).remove(),z=M.select(`.metadata-group`).append(`g`).classed(`percentage-label-group`,!0).selectAll(`text`).data(s.reverse()).enter().append(`text`),z.classed(`percentage-label`,!0).attr(`x`,t).attr(`y`,n).text(({value:t})=>e.format(T)(t)).attr(`font-size`,E+`px`)}function Ze(){let e;P?(e=M.select(`.chart-group`).selectAll(`.bar`).data(ee),j?Ke(e):Ye(e),e=M.select(`.chart-group`).selectAll(`.bar`).data(s),j?qe(e):Je(e),e.exit().transition().style(`opacity`,0).remove()):(e=M.select(`.chart-group`).selectAll(`.bar`).data(s),j?Ke(e):Ye(e),e.exit().remove())}function Qe(){M.select(`.grid-lines-group`).selectAll(`grid`).remove(),j?$e():tt()}function $e(){be(u).range([0,l]).hideEdges(`first`).ticks(v).extendedLine(we.bottom)(M.select(`.grid-lines-group`))}function et(){M.select(`.loading-state-group`).html(ie)}function tt(){xe(d).range([0,c]).hideEdges(`first`).ticks(_).extendedLine(we.left)(M.select(`.grid-lines-group`))}function nt(e,t,n,r,i,a){Y.call(`customMouseOver`,e,t,h(a,e),[r,i]),L||=function(){};let o=L;N?o(p(e)):n.forEach(t=>{t!==e&&o(p(t))})}function rt(e,t,n,r,i){Y.call(`customMouseMove`,e,t,h(i,e),[n,r])}function it(e,t,n,r,i,a){Y.call(`customMouseOut`,e,t,h(a,e),[r,i]),n.forEach(e=>{p(e).attr(`fill`,({name:e})=>Z(e))})}function $(e,t,n,r,i){Y.call(`customClick`,e,t,h(i,e),[n,r])}function at(){return _e(s.map(Oe),{ratio:y,emptyDomainMax:y})}return X.a11yTitle=function(e){return arguments.length?(Le=e,this):Le},X.a11yDescription=function(e){return arguments.length?(Re=e,this):Re},X.animationDuration=function(e){return arguments.length?(I=e,this):I},X.betweenBarsPadding=function(e){return arguments.length?(D=e,this):D},X.chartGradient=function(e){return arguments.length?(g=e,this):g},X.colorMap=function(e){return arguments.length?(re=e,this):re},X.colorSchema=function(e){return arguments.length?(f=e,this):f},X.enableLabels=function(e){return arguments.length?(S=e,this):S},X.exportChart=function(e,t){return me.call(X,M,e,t)},X.hasPercentage=function(e){return arguments.length?(b=e?Se:F,this):b===Se},X.hasSingleBarHighlight=function(e){return arguments.length?(N=e,this):N},X.height=function(e){return arguments.length?(i=e,this):i},X.highlightBarFunction=function(e){return arguments.length?(L=e,this):L},X.isAnimated=function(e){return arguments.length?(P=e,this):P},X.isHorizontal=function(e){return arguments.length?(j=e,this):j},X.labelsMargin=function(e){return arguments.length?(w=e,this):w},X.labelsNumberFormat=function(e){return arguments.length?(T=e,this):T},X.labelsSize=function(e){return arguments.length?(E=e,this):E},X.isLoading=function(e){return arguments.length?(o=e,this):o},X.margin=function(e){return arguments.length?(t={...t,...e},this):t},X.numberFormat=function(e){return arguments.length?(b=e,this):b},X.on=function(...e){let t=Y.on(...e);return t===Y?X:t},X.percentageAxisToMaxRatio=function(e){return arguments.length?(y=e,this):y},X.shouldReverseColorList=function(e){return arguments.length?(K=e,this):K},X.orderingFunction=function(e){return arguments.length?(R=e,this):R},X.valueLocale=function(e){return arguments.length?(q=e,this):q},X.width=function(e){return arguments.length?(n=e,this):n},X.xAxisLabel=function(e){return arguments.length?(V=e,this):V},X.xAxisLabelOffset=function(e){return arguments.length?(H=e,this):H},X.xTicks=function(e){return arguments.length?(v=e,this):v},X.yAxisLabel=function(e){return arguments.length?(W=e,this):W},X.yAxisLabelOffset=function(e){return arguments.length?(G=e,this):G},X.yAxisPaddingBetweenChart=function(e){return arguments.length?(A=e,this):A},X.yTicks=function(e){return arguments.length?(_=e,this):_},X}var Se,F;function I(){return(I=e((()=>{oe(),i(),t(),n(),_(),b(),g(),s(),ee(),w(),T(),ve(),E(),l(),y(),A(),v(),j(),S(),c(),Se=`%`,F=`,f`})))()}function L(e){this.Klass=L,this.config=d.defaults({},e),this.withNegativeValues=function(){let e=d.extend({},this.config,{data:[{name:`Shiny`,value:12},{name:`Blazing`,value:-8},{name:`Dazzling`,value:5},{name:`Radiant`,value:-14},{name:`Sparkling`,value:9},{name:`Gleaming`,value:-3}]});return new this.Klass(e)},this.withLettersFrequency=function(){let e=d.extend({},this.config,{data:[{name:`A`,value:.08167},{name:`B`,value:.01492},{name:`C`,value:.02782},{name:`D`,value:.04253},{name:`E`,value:.12702},{name:`F`,value:.02288},{name:`G`,value:.02015},{name:`H`,value:.06094},{name:`I`,value:.06966},{name:`J`,value:.00153},{name:`K`,value:.00772},{name:`L`,value:.04025},{name:`M`,value:.02406},{name:`N`,value:.06749},{name:`O`,value:.07507},{name:`P`,value:.01929},{name:`Q`,value:95e-5},{name:`R`,value:.05987},{name:`S`,value:.06327},{name:`T`,value:.09056},{name:`U`,value:.02758},{name:`V`,value:.00978},{name:`W`,value:.0236},{name:`X`,value:.0015},{name:`Y`,value:.01974},{name:`Z`,value:74e-5}]});return new this.Klass(e)},this.withColors=function(){let e=d.extend({},this.config,{data:[{name:`Radiating`,value:2},{name:`Opalescent`,value:4},{name:`Shining`,value:3},{name:`Vibrant`,value:6},{name:`Vivid`,value:6},{name:`Brilliant`,value:1}]});return new this.Klass(e)},this.build=function(){return this.config.data}}function R(){return(R=e((()=>{re()})))()}var z,B,V,H,U,W,G,K,q,J,Ce;function we(){return(we=e((()=>{s(),I(),N(),D(),o(),R(),E(),z=()=>new L,B=e=>{let t=O(),n=P(),r=p(t),i=r.node()?r.node().getBoundingClientRect().width:!1,a=M();if(i){let t=z().withLettersFrequency().build();u(n,e).width(i).on(`customMouseOver`,a.show).on(`customMouseMove`,a.update).on(`customMouseOut`,a.hide),r.datum(t).call(n),p(`.bar-chart .metadata-group`).datum([]).call(a)}return t},B.args=m(P,[`height`,`margin`,`isHorizontal`,`isAnimated`,`colorSchema`,`shouldReverseColorList`,`betweenBarsPadding`,`hasPercentage`,`enableLabels`,`labelsNumberFormat`,`numberFormat`,`hasSingleBarHighlight`,`xTicks`,`yTicks`,`xAxisLabel`,`yAxisLabel`,`percentageAxisToMaxRatio`,`isLoading`]),B.args.isAnimated=!1,B.argTypes=f(B.args),V=()=>{let e=O(),t=P(),n=p(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=M(),a;if(r){let e=z().withColors().build();t.isAnimated(!0).margin({left:30,right:20,top:20,bottom:30}).colorSchema(he.colorSchemas.britecharts).width(r).yAxisPaddingBetweenChart(20).height(300).percentageAxisToMaxRatio(1.3).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),a=p(`.bar-chart .metadata-group`),a.datum([]).call(i)}return e},H=()=>{let e=O(),t=P(),n=p(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=M(),a;if(r){let e=z().withColors().build();t.isHorizontal(!0).isAnimated(!0).margin({left:120,right:20,top:20,bottom:30}).colorSchema(he.colorSchemas.britecharts).width(r).yAxisPaddingBetweenChart(20).height(300).percentageAxisToMaxRatio(1.3).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),a=p(`.bar-chart .metadata-group`),a.datum([]).call(i)}return e},U=()=>{let e=O(),t=P(),n=p(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=M();if(r){let e=z().withLettersFrequency().build();t.isAnimated(!0).width(r).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),p(`.bar-chart .metadata-group`).datum([]).call(i)}return e},W=()=>{let e=O(),t=P(),n=p(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=z().withLettersFrequency().build();t.width(r).hasPercentage(!0).enableLabels(!0).labelsNumberFormat(`.0%`).height(300),n.datum(e).call(t)}return e},G=()=>{let e=O(),t=P(),n=p(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=z().withNegativeValues().build();t.isAnimated(!0).width(r).height(400),n.datum(e).call(t)}return e},K=()=>{let e=O(),t=P(),n=p(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=z().withNegativeValues().build();t.isAnimated(!0).isHorizontal(!0).margin({left:100,right:40,top:40,bottom:40}).width(r).height(400),n.datum(e).call(t)}return e},q=()=>{let e=O(),t=P(),n=p(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=z().withLettersFrequency().build();return r&&(t.width(r).height(300).isAnimated(!0).isLoading(!0),n.datum(i).call(t)),e},J={title:`Charts/Bar`},Ce=[`Playground`,`VerticalBarChart`,`HorizontalBarChart`,`WithAnimation`,`WithBarLabels`,`WithNegativeValues`,`WithNegativeValuesHorizontal`,`WithLoadingState`],B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`args => {
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
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`() => {
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
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`() => {
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
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`() => {
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
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`() => {
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
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`() => {
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
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`() => {
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
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`() => {
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
}`,...q.parameters?.docs?.source}}}})))()}we();export{H as HorizontalBarChart,B as Playground,V as VerticalBarChart,U as WithAnimation,W as WithBarLabels,q as WithLoadingState,G as WithNegativeValues,K as WithNegativeValuesHorizontal,Ce as __namedExportsOrder,J as default};