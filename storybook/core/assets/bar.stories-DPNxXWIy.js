import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{K as t,M as n,N as r,X as i,Z as a,a as o,at as s,b as c,c as ee,h as l,i as u,it as d,l as te,n as f,o as p,q as m,s as h,t as ne,u as re}from"./index-all-CjBvOLpq.js";import{n as g,t as _}from"./pointer-Djj9AZUl.js";import{i as ie,n as v,t as ae}from"./project-w_NZB4BR.js";import{i as y,n as oe,t as se}from"./axis-B0w998iS.js";import{n as ce,t as b}from"./linear-DgN1XP_B.js";import{N as le,a as x,j as S,o as ue}from"./constants-DPCOey1E.js";import{a as de,i as fe,n as C,r as w,t as T}from"./scale-WsznaE7h.js";import{a as pe,r as E}from"./text-B6502c_e.js";import{n as me,t as he}from"./export-D1ikYz6k.js";import{a as D,i as ge,n as O,t as k}from"./helpers-DK6iEQil.js";import{n as _e,r as A,t as j}from"./domain-BO-SELlG.js";import{n as ve,t as M}from"./locale-MXsqjeh4.js";import{n as ye,r as N,t as be}from"./grid-yX7qHS3-.js";import{n as P,t as F}from"./mini-tooltip-BaEVyAS_.js";function I(){let e={top:20,right:20,bottom:30,left:40},n=960,a=500,o=!1,c,ee,l,u,d,f,p=ge.singleColors.aloeGreen,m=null,h=null,ne,_=5,v=5,y=1,b=L,x=!1,S=7,de=L,w=12,E=.1,me,D,O=10,k=!1,A,M=!0,N=!1,P=ue.duration,F=e=>e.attr(`fill`,({name:e})=>String(i(h?h[1]:m[e]).darker())),I,R=`value`,z=`name`,B,V=null,H=null,U=30,W=null,G=null,K=-30,q=!0,J=null,Y=r,Se=le(`bar-gradient`),Ce={top:0,left:0,bottom:0,right:0},we=ie,Te=(e,t)=>70*t,X=t(`customMouseOver`,`customMouseOut`,`customMouseMove`,`customClick`),Ee=({name:e})=>e,De=({value:e})=>e,Oe=({value:e})=>C(d)(e)+S,ke=({name:e})=>T(f)(e)+T(f).bandwidth()/2+3/8*w,Ae=({name:e})=>T(d)(e),je=({value:e})=>C(f)(e)-S;function Z(t){J&&(Y=ve(J)),t.each(function(t){l=n-(e.left??0)-(e.right??0)-O*1.2,u=a-(e.top??0)-(e.bottom??0),{data:c,dataZeroed:ee}=Be(ze(t)),Re(this),o?$e():(He(),Fe(),Me(Y),Pe(),Ze(),Ue(),Xe(),x&&Ye(Y))})}function Me(e){k?(me=se(d).ticks(v,e.format(b)).tickSizeInner(+[-u]),D=oe(f).ticks(_,e.format(b))):(me=se(d),D=oe(f).ticks(_,e.format(b)))}function Ne(){let t=A.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${(e.left??0)+O}, ${e.top})`);A.append(`g`).classed(`loading-state-group`,!0),t.append(`g`).classed(`grid-lines-group`,!0),t.append(`g`).classed(`chart-group`,!0),t.append(`g`).classed(`x-axis-group axis`,!0).append(`g`).classed(`x-axis-label`,!0),t.append(`g`).attr(`transform`,`translate(${-1*O}, 0)`).classed(`y-axis-group axis`,!0).append(`g`).classed(`y-axis-label`,!0),t.append(`g`).classed(`metadata-group`,!0)}function Pe(){!ne&&h&&(ne=A.select(`.metadata-group`).append(`linearGradient`).attr(`id`,Se).attr(`x1`,`0%`).attr(`y1`,`0%`).attr(`x2`,`100%`).attr(`y2`,`100%`).attr(`gradientUnits`,`userSpaceOnUse`).selectAll(`stop`).data([{offset:`0%`,color:h[0]},{offset:`50%`,color:h[1]}]).enter().append(`stop`).attr(`offset`,({offset:e})=>e).attr(`stop-color`,({color:e})=>e))}function Fe(){let e=at();k?(d=ce().domain(e).rangeRound([0,l]),f=fe().domain(c.map(Ee)).rangeRound([0,u]).padding(E)):(d=fe().domain(c.map(Ee)).rangeRound([0,l]).padding(E),f=ce().domain(e).rangeRound([u,0])),q?c.map(e=>e).reverse().map(({name:e},t)=>({name:e,color:p[t%p.length]})):c.map(e=>e).map(({name:e},t)=>({name:e,color:p[t%p.length]})),m||=c.map(e=>e).reduce((e,{name:t},n)=>({...e,[t]:p[n%p.length]}),{})}let Ie=null,Le=null;function Re(e){A||(A=s(e).append(`svg`).classed(`britechart bar-chart`,!0),Ne()),A.attr(`viewBox`,[0,0,n,a]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,n).attr(`height`,a),te(A.node(),{a11yTitle:Ie,a11yDescription:Le,fallbackTitle:`Bar chart`})}function ze(e){let t=e.reduce((e,t)=>{let n=t;return n.value=+n[R],n.name=String(n[z]),[...e,n]},[]);return{data:t,dataZeroed:t.map(e=>({value:0,name:String(e[z])}))}}function Q(e){return h?`url(#${Se})`:m[e]}function Be(e){let{data:t,dataZeroed:n}=e;return I&&(t.sort(I),n.sort(I)),{data:t,dataZeroed:n}}function Ve(e,t){pe(e,t,0,1)}function He(){A.select(`.loading-state-group svg`).remove()}function $(e){return s(e.parentNode).selectAll(`.bar`).nodes()}function Ue(){A.select(`.x-axis-group.axis`).attr(`transform`,`translate(0, ${u})`).call(me),A.select(`.y-axis-group.axis`).call(D),A.selectAll(`.y-axis-group .tick text`).call(Ve,(e.left??0)-O),We()}function We(){G&&(W&&W.remove(),W=A.select(`.y-axis-label`).append(`text`).classed(`y-axis-label-text`,!0).attr(`x`,-u/2).attr(`y`,K).attr(`text-anchor`,`middle`).attr(`transform`,`rotate(270 0 0)`).text(G)),H&&(V&&V.remove(),V=A.select(`.x-axis-label`).append(`text`).attr(`y`,U).attr(`text-anchor`,`middle`).classed(`x-axis-label-text`,!0).attr(`x`,l/2).text(H))}function Ge(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`y`,u).attr(`x`,({value:e})=>j(C(d),e).start).attr(`height`,T(f).bandwidth()).attr(`width`,({value:e})=>j(C(d),e).size).on(`mouseover`,function(e,t){tt(this,t,$(this),l,u,e)}).on(`mousemove`,function(e,t){nt(this,t,l,u,e)}).on(`mouseout`,function(e,t){rt(this,t,$(this),l,u,e)}).on(`click`,function(e,t){it(this,t,l,u,e)}).merge(e).attr(`x`,({value:e})=>j(C(d),e).start).attr(`y`,({name:e})=>T(f)(e)).attr(`height`,T(f).bandwidth()).attr(`width`,({value:e})=>j(C(d),e).size).attr(`fill`,({name:e})=>Q(e))}function Ke(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,({value:e})=>j(C(d),e).start).attr(`y`,u).attr(`height`,T(f).bandwidth()).attr(`width`,({value:e})=>j(C(d),e).size).on(`mouseover`,function(e,t){tt(this,t,$(this),l,u,e)}).on(`mousemove`,function(e,t){nt(this,t,l,u,e)}).on(`mouseout`,function(e,t){rt(this,t,$(this),l,u,e)}).on(`click`,function(e,t){it(this,t,l,u,e)}),e.attr(`x`,({value:e})=>j(C(d),e).start).attr(`y`,({name:e})=>T(f)(e)).attr(`height`,T(f).bandwidth()).attr(`fill`,({name:e})=>Q(e)).transition().duration(P).delay(Te).ease(we).attr(`width`,({value:e})=>j(C(d),e).size)}function qe(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,l).attr(`y`,({value:e})=>j(C(f),e).start).attr(`width`,T(d).bandwidth()).attr(`height`,({value:e})=>j(C(f),e).size).on(`mouseover`,function(e,t){tt(this,t,$(this),l,u,e)}).on(`mousemove`,function(e,t){nt(this,t,l,u,e)}).on(`mouseout`,function(e,t){rt(this,t,$(this),l,u,e)}).on(`click`,function(e,t){it(this,t,l,u,e)}).merge(e).attr(`x`,({name:e})=>T(d)(e)).attr(`width`,T(d).bandwidth()).attr(`fill`,({name:e})=>Q(e)).transition().duration(P).delay(Te).ease(we).attr(`y`,({value:e})=>j(C(f),e).start).attr(`height`,({value:e})=>j(C(f),e).size)}function Je(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,l).attr(`y`,({value:e})=>j(C(f),e).start).attr(`width`,T(d).bandwidth()).attr(`height`,({value:e})=>j(C(f),e).size).on(`mouseover`,function(e,t){tt(this,t,$(this),l,u,e)}).on(`mousemove`,function(e,t){nt(this,t,l,u,e)}).on(`mouseout`,function(e,t){rt(this,t,$(this),l,u,e)}).on(`click`,function(e,t){it(this,t,l,u,e)}).merge(e).attr(`x`,({name:e})=>T(d)(e)).attr(`y`,({value:e})=>j(C(f),e).start).attr(`width`,T(d).bandwidth()).attr(`height`,({value:e})=>j(C(f),e).size).attr(`fill`,({name:e})=>Q(e))}function Ye(e){let t=k?Oe:Ae,n=k?ke:je;B&&A.selectAll(`.percentage-label-group`).remove(),B=A.select(`.metadata-group`).append(`g`).classed(`percentage-label-group`,!0).selectAll(`text`).data(c.reverse()).enter().append(`text`),B.classed(`percentage-label`,!0).attr(`x`,t).attr(`y`,n).text(({value:t})=>e.format(de)(t)).attr(`font-size`,w+`px`)}function Xe(){let e;N?(e=A.select(`.chart-group`).selectAll(`.bar`).data(ee),k?Ge(e):Je(e),e=A.select(`.chart-group`).selectAll(`.bar`).data(c),k?Ke(e):qe(e),e.exit().transition().style(`opacity`,0).remove()):(e=A.select(`.chart-group`).selectAll(`.bar`).data(c),k?Ge(e):Je(e),e.exit().remove())}function Ze(){A.select(`.grid-lines-group`).selectAll(`grid`).remove(),k?Qe():et()}function Qe(){ye(d).range([0,u]).hideEdges(`first`).ticks(v).extendedLine(Ce.bottom)(A.select(`.grid-lines-group`))}function $e(){A.select(`.loading-state-group`).html(re)}function et(){be(f).range([0,l]).hideEdges(`first`).ticks(_).extendedLine(Ce.left)(A.select(`.grid-lines-group`))}function tt(e,t,n,r,i,a){X.call(`customMouseOver`,e,t,g(a,e),[r,i]),F||=function(){};let o=F;M?o(s(e)):n.forEach(t=>{t!==e&&o(s(t))})}function nt(e,t,n,r,i){X.call(`customMouseMove`,e,t,g(i,e),[n,r])}function rt(e,t,n,r,i,a){X.call(`customMouseOut`,e,t,g(a,e),[r,i]),n.forEach(e=>{s(e).attr(`fill`,({name:e})=>Q(e))})}function it(e,t,n,r,i){X.call(`customClick`,e,t,g(i,e),[n,r])}function at(){return _e(c.map(De),{ratio:y,emptyDomainMax:y})}return Z.a11yTitle=function(e){return arguments.length?(Ie=e,this):Ie},Z.a11yDescription=function(e){return arguments.length?(Le=e,this):Le},Z.animationDuration=function(e){return arguments.length?(P=e,this):P},Z.betweenBarsPadding=function(e){return arguments.length?(E=e,this):E},Z.chartGradient=function(e){return arguments.length?(h=e,this):h},Z.colorMap=function(e){return arguments.length?(m=e,this):m},Z.colorSchema=function(e){return arguments.length?(p=e,this):p},Z.enableLabels=function(e){return arguments.length?(x=e,this):x},Z.exportChart=function(e,t){return he.call(Z,A,e,t)},Z.hasPercentage=function(e){return arguments.length?(b=e?xe:L,this):b===xe},Z.hasSingleBarHighlight=function(e){return arguments.length?(M=e,this):M},Z.height=function(e){return arguments.length?(a=e,this):a},Z.highlightBarFunction=function(e){return arguments.length?(F=e,this):F},Z.isAnimated=function(e){return arguments.length?(N=e,this):N},Z.isHorizontal=function(e){return arguments.length?(k=e,this):k},Z.labelsMargin=function(e){return arguments.length?(S=e,this):S},Z.labelsNumberFormat=function(e){return arguments.length?(de=e,this):de},Z.labelsSize=function(e){return arguments.length?(w=e,this):w},Z.isLoading=function(e){return arguments.length?(o=e,this):o},Z.margin=function(t){return arguments.length?(e={...e,...t},this):e},Z.nameLabel=function(e){return arguments.length?(z=e,ae(`name`),this):z},Z.numberFormat=function(e){return arguments.length?(b=e,this):b},Z.on=function(...e){let t=X.on(...e);return t===X?Z:t},Z.percentageAxisToMaxRatio=function(e){return arguments.length?(y=e,this):y},Z.shouldReverseColorList=function(e){return arguments.length?(q=e,this):q},Z.orderingFunction=function(e){return arguments.length?(I=e,this):I},Z.valueLabel=function(e){return arguments.length?(R=e,ae(`value`),this):R},Z.valueLocale=function(e){return arguments.length?(J=e,this):J},Z.width=function(e){return arguments.length?(n=e,this):n},Z.xAxisLabel=function(e){return arguments.length?(H=e,this):H},Z.xAxisLabelOffset=function(e){return arguments.length?(U=e,this):U},Z.xTicks=function(e){return arguments.length?(v=e,this):v},Z.yAxisLabel=function(e){return arguments.length?(G=e,this):G},Z.yAxisLabelOffset=function(e){return arguments.length?(K=e,this):K},Z.yAxisPaddingBetweenChart=function(e){return arguments.length?(O=e,this):O},Z.yTicks=function(e){return arguments.length?(_=e,this):_},Z}var xe,L;function R(){return(R=e((()=>{y(),a(),m(),n(),b(),de(),_(),d(),c(),E(),me(),A(),D(),l(),S(),M(),v(),x(),N(),w(),ee(),xe=`%`,L=`,f`})))()}function z(e){this.Klass=z,this.config=f.defaults({},e),this.withNegativeValues=function(){let e=f.extend({},this.config,{data:[{name:`Shiny`,value:12},{name:`Blazing`,value:-8},{name:`Dazzling`,value:5},{name:`Radiant`,value:-14},{name:`Sparkling`,value:9},{name:`Gleaming`,value:-3}]});return new this.Klass(e)},this.withLettersFrequency=function(){let e=f.extend({},this.config,{data:[{name:`A`,value:.08167},{name:`B`,value:.01492},{name:`C`,value:.02782},{name:`D`,value:.04253},{name:`E`,value:.12702},{name:`F`,value:.02288},{name:`G`,value:.02015},{name:`H`,value:.06094},{name:`I`,value:.06966},{name:`J`,value:.00153},{name:`K`,value:.00772},{name:`L`,value:.04025},{name:`M`,value:.02406},{name:`N`,value:.06749},{name:`O`,value:.07507},{name:`P`,value:.01929},{name:`Q`,value:95e-5},{name:`R`,value:.05987},{name:`S`,value:.06327},{name:`T`,value:.09056},{name:`U`,value:.02758},{name:`V`,value:.00978},{name:`W`,value:.0236},{name:`X`,value:.0015},{name:`Y`,value:.01974},{name:`Z`,value:74e-5}]});return new this.Klass(e)},this.withColors=function(){let e=f.extend({},this.config,{data:[{name:`Radiating`,value:2},{name:`Opalescent`,value:4},{name:`Shining`,value:3},{name:`Vibrant`,value:6},{name:`Vivid`,value:6},{name:`Brilliant`,value:1}]});return new this.Klass(e)},this.build=function(){return this.config.data}}function B(){return(B=e((()=>{ne()})))()}var V,H,U,W,G,K,q,J,Y,Se,Ce;function we(){return(we=e((()=>{d(),R(),F(),O(),o(),B(),D(),V=()=>new z,H=e=>{let t=k(),n=I(),r=s(t),i=r.node()?r.node().getBoundingClientRect().width:!1,a=P();if(i){let t=V().withLettersFrequency().build();u(n,e).width(i).on(`customMouseOver`,a.show).on(`customMouseMove`,a.update).on(`customMouseOut`,a.hide),r.datum(t).call(n),s(`.bar-chart .metadata-group`).datum([]).call(a)}return t},H.args=h(I,[`height`,`margin`,`isHorizontal`,`isAnimated`,`colorSchema`,`shouldReverseColorList`,`betweenBarsPadding`,`hasPercentage`,`enableLabels`,`labelsNumberFormat`,`numberFormat`,`hasSingleBarHighlight`,`xTicks`,`yTicks`,`xAxisLabel`,`yAxisLabel`,`percentageAxisToMaxRatio`,`isLoading`]),H.args.isAnimated=!1,H.argTypes=p(H.args),U=()=>{let e=k(),t=I(),n=s(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=P(),a;if(r){let e=V().withColors().build();t.isAnimated(!0).margin({left:30,right:20,top:20,bottom:30}).colorSchema(ge.colorSchemas.britecharts).width(r).yAxisPaddingBetweenChart(20).height(300).percentageAxisToMaxRatio(1.3).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),a=s(`.bar-chart .metadata-group`),a.datum([]).call(i)}return e},W=()=>{let e=k(),t=I(),n=s(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=P(),a;if(r){let e=V().withColors().build();t.isHorizontal(!0).isAnimated(!0).margin({left:120,right:20,top:20,bottom:30}).colorSchema(ge.colorSchemas.britecharts).width(r).yAxisPaddingBetweenChart(20).height(300).percentageAxisToMaxRatio(1.3).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),a=s(`.bar-chart .metadata-group`),a.datum([]).call(i)}return e},G=()=>{let e=k(),t=I(),n=s(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=P();if(r){let e=V().withLettersFrequency().build();t.isAnimated(!0).width(r).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),s(`.bar-chart .metadata-group`).datum([]).call(i)}return e},K=()=>{let e=k(),t=I(),n=s(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=V().withLettersFrequency().build();t.width(r).hasPercentage(!0).enableLabels(!0).labelsNumberFormat(`.0%`).height(300),n.datum(e).call(t)}return e},q=()=>{let e=k(),t=I(),n=s(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=V().withNegativeValues().build();t.isAnimated(!0).width(r).height(400),n.datum(e).call(t)}return e},J=()=>{let e=k(),t=I(),n=s(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=V().withNegativeValues().build();t.isAnimated(!0).isHorizontal(!0).margin({left:100,right:40,top:40,bottom:40}).width(r).height(400),n.datum(e).call(t)}return e},Y=()=>{let e=k(),t=I(),n=s(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=V().withLettersFrequency().build();return r&&(t.width(r).height(300).isAnimated(!0).isLoading(!0),n.datum(i).call(t)),e},Se={title:`Charts/Bar`},Ce=[`Playground`,`VerticalBarChart`,`HorizontalBarChart`,`WithAnimation`,`WithBarLabels`,`WithNegativeValues`,`WithNegativeValuesHorizontal`,`WithLoadingState`],H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`args => {
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
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`() => {
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
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`() => {
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
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`() => {
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
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`() => {
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
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`() => {
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
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`() => {
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
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`() => {
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
}`,...Y.parameters?.docs?.source}}}})))()}we();export{W as HorizontalBarChart,H as Playground,U as VerticalBarChart,G as WithAnimation,K as WithBarLabels,Y as WithLoadingState,q as WithNegativeValues,J as WithNegativeValuesHorizontal,Ce as __namedExportsOrder,Se as default};