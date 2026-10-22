import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{$ as t,L as n,Q as r,R as i,T as a,a as o,b as s,dt as c,h as ee,i as te,l,m as ne,n as u,nt as re,o as d,p as ie,rt as f,s as p,t as m,u as ae,ut as h}from"./index-all-DhiTiQVV.js";import{n as g,t as _}from"./pointer-Djj9AZUl.js";import{n as oe}from"./quad-qkBhhiXk.js";import{i as se,n as ce,t as le}from"./axis-B0w998iS.js";import{n as ue,t as v}from"./linear-C4axaRz1.js";import{N as de,a as y,j as b,o as fe}from"./constants-CTgVdheE.js";import{a as x,i as pe,n as S,r as me,t as C}from"./scale-Cjil7EpP.js";import{a as he,r as w}from"./text-Bt9LyWRb.js";import{n as T,t as ge}from"./export-BV1q5uvn.js";import{a as _e,n as E,o as D,r as O,s as ve,t as k}from"./helpers-CrbXQEV5.js";import{n as ye,r as A,t as j}from"./domain-D5gbVy7_.js";import{n as be,t as M}from"./locale-G5axav3H.js";import{n as xe,r as N,t as Se}from"./grid-yX7qHS3-.js";import{n as P,t as F}from"./mini-tooltip-CsMU6kfW.js";function I(){let e=`name`,t={top:20,right:20,bottom:30,left:40},n=960,a=500,o=!1,s,te,l,u,d,f,p=_e.singleColors.aloeGreen,m=null,h=null,_=null,se,v=5,y=5,b=1,x=we,me=!1,w=7,T=we,E=12,D=.1,O,k,A=10,M=!1,N,P=!0,F=!1,I=fe.duration,L=e=>e.attr(`fill`,({name:e})=>String(re(_?_[1]:m[e]).darker())),R,z,B=null,V=null,H=30,U=null,W=null,G=-30,K=!0,q=null,J=i,Y=de(`bar-gradient`),Te={top:0,left:0,bottom:0,right:0},Ee=oe,De=(e,t)=>70*t,X=r(`customMouseOver`,`customMouseOut`,`customMouseMove`,`customClick`),Oe=({name:e})=>e,ke=({value:e})=>e,Ae=({value:e})=>S(d)(e)+w,je=({name:e})=>C(f)(e)+C(f).bandwidth()/2+3/8*E,Me=({name:e})=>C(d)(e),Ne=({value:e})=>S(f)(e)-w;function Z(e){q&&(J=be(q)),e.each(function(e){l=n-(t.left??0)-(t.right??0)-A*1.2,u=a-(t.top??0)-(t.bottom??0),{data:s,dataZeroed:te}=We(Ue(e)),He(this),ne(N.node(),Be&&!o?Ve():null),o?rt():(Ke(),Le(),Pe(J),Ie(),tt(),qe(),et(),me&&$e(J))})}function Pe(e){M?(O=le(d).ticks(y,e.format(x)).tickSizeInner(+[-u]),k=ce(f).ticks(v,e.format(x))):(O=le(d),k=ce(f).ticks(v,e.format(x)))}function Fe(){let e=N.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${(t.left??0)+A}, ${t.top})`);N.append(`g`).classed(`loading-state-group`,!0),e.append(`g`).classed(`grid-lines-group`,!0),e.append(`g`).classed(`chart-group`,!0),e.append(`g`).classed(`x-axis-group axis`,!0).append(`g`).classed(`x-axis-label`,!0),e.append(`g`).attr(`transform`,`translate(${-1*A}, 0)`).classed(`y-axis-group axis`,!0).append(`g`).classed(`y-axis-label`,!0),e.append(`g`).classed(`metadata-group`,!0)}function Ie(){!se&&_&&(se=N.select(`.metadata-group`).append(`linearGradient`).attr(`id`,Y).attr(`x1`,`0%`).attr(`y1`,`0%`).attr(`x2`,`100%`).attr(`y2`,`100%`).attr(`gradientUnits`,`userSpaceOnUse`).selectAll(`stop`).data([{offset:`0%`,color:_[0]},{offset:`50%`,color:_[1]}]).enter().append(`stop`).attr(`offset`,({offset:e})=>e).attr(`stop-color`,({color:e})=>e))}function Le(){let e=lt();M?(d=ue().domain(e).rangeRound([0,l]),f=pe().domain(s.map(Oe)).rangeRound([0,u]).padding(D)):(d=pe().domain(s.map(Oe)).rangeRound([0,l]).padding(D),f=ue().domain(e).rangeRound([u,0])),K?s.map(e=>e).reverse().map(({name:e},t)=>({name:e,color:p[t%p.length]})):s.map(e=>e).map(({name:e},t)=>({name:e,color:p[t%p.length]})),m=ve(s.map(e=>e).reduce((e,{name:t},n)=>({...e,[t]:p[n%p.length]}),{}),h)}let Re=null,ze=null,Be=!0;function Ve(){return{columns:[`Name`,`Value`],rows:s.map(e=>[e.name,e.value])}}function He(e){N||(N=c(e).append(`svg`).classed(`britechart bar-chart`,!0),Fe()),N.attr(`viewBox`,[0,0,n,a]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,n).attr(`height`,a),ae(N.node(),{a11yTitle:Re,a11yDescription:ze,fallbackTitle:`Bar chart`})}function Ue(t){let n=t.reduce((t,n)=>{let r=n;return r.value=+r.value,r.name=String(r[e]),[...t,r]},[]);return{data:n,dataZeroed:n.map(t=>({value:0,name:String(t[e])}))}}function Q(e){return _?`url(#${Y})`:m[e]}function We(e){let{data:t,dataZeroed:n}=e;return R&&(t.sort(R),n.sort(R)),{data:t,dataZeroed:n}}function Ge(e,t){he(e,t,0,1)}function Ke(){N.select(`.loading-state-group svg`).remove()}function $(e){return c(e.parentNode).selectAll(`.bar`).nodes()}function qe(){N.select(`.x-axis-group.axis`).attr(`transform`,`translate(0, ${u})`).call(O),N.select(`.y-axis-group.axis`).call(k),N.selectAll(`.y-axis-group .tick text`).call(Ge,(t.left??0)-A),Je()}function Je(){W&&(U&&U.remove(),U=N.select(`.y-axis-label`).append(`text`).classed(`y-axis-label-text`,!0).attr(`x`,-u/2).attr(`y`,G).attr(`text-anchor`,`middle`).attr(`transform`,`rotate(270 0 0)`).text(W)),V&&(B&&B.remove(),B=N.select(`.x-axis-label`).append(`text`).attr(`y`,H).attr(`text-anchor`,`middle`).classed(`x-axis-label-text`,!0).attr(`x`,l/2).text(V))}function Ye(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`y`,u).attr(`x`,({value:e})=>j(S(d),e).start).attr(`height`,C(f).bandwidth()).attr(`width`,({value:e})=>j(S(d),e).size).on(`mouseover`,function(e,t){at(this,t,$(this),l,u,e)}).on(`mousemove`,function(e,t){ot(this,t,l,u,e)}).on(`mouseout`,function(e,t){st(this,t,$(this),l,u,e)}).on(`click`,function(e,t){ct(this,t,l,u,e)}).merge(e).attr(`x`,({value:e})=>j(S(d),e).start).attr(`y`,({name:e})=>C(f)(e)).attr(`height`,C(f).bandwidth()).attr(`width`,({value:e})=>j(S(d),e).size).attr(`fill`,({name:e})=>Q(e))}function Xe(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,({value:e})=>j(S(d),e).start).attr(`y`,u).attr(`height`,C(f).bandwidth()).attr(`width`,({value:e})=>j(S(d),e).size).on(`mouseover`,function(e,t){at(this,t,$(this),l,u,e)}).on(`mousemove`,function(e,t){ot(this,t,l,u,e)}).on(`mouseout`,function(e,t){st(this,t,$(this),l,u,e)}).on(`click`,function(e,t){ct(this,t,l,u,e)}),e.attr(`x`,({value:e})=>j(S(d),e).start).attr(`y`,({name:e})=>C(f)(e)).attr(`height`,C(f).bandwidth()).attr(`fill`,({name:e})=>Q(e)).transition().duration(I).delay(De).ease(Ee).attr(`width`,({value:e})=>j(S(d),e).size)}function Ze(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,l).attr(`y`,({value:e})=>j(S(f),e).start).attr(`width`,C(d).bandwidth()).attr(`height`,({value:e})=>j(S(f),e).size).on(`mouseover`,function(e,t){at(this,t,$(this),l,u,e)}).on(`mousemove`,function(e,t){ot(this,t,l,u,e)}).on(`mouseout`,function(e,t){st(this,t,$(this),l,u,e)}).on(`click`,function(e,t){ct(this,t,l,u,e)}).merge(e).attr(`x`,({name:e})=>C(d)(e)).attr(`width`,C(d).bandwidth()).attr(`fill`,({name:e})=>Q(e)).transition().duration(I).delay(De).ease(Ee).attr(`y`,({value:e})=>j(S(f),e).start).attr(`height`,({value:e})=>j(S(f),e).size)}function Qe(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,l).attr(`y`,({value:e})=>j(S(f),e).start).attr(`width`,C(d).bandwidth()).attr(`height`,({value:e})=>j(S(f),e).size).on(`mouseover`,function(e,t){at(this,t,$(this),l,u,e)}).on(`mousemove`,function(e,t){ot(this,t,l,u,e)}).on(`mouseout`,function(e,t){st(this,t,$(this),l,u,e)}).on(`click`,function(e,t){ct(this,t,l,u,e)}).merge(e).attr(`x`,({name:e})=>C(d)(e)).attr(`y`,({value:e})=>j(S(f),e).start).attr(`width`,C(d).bandwidth()).attr(`height`,({value:e})=>j(S(f),e).size).attr(`fill`,({name:e})=>Q(e))}function $e(e){let t=M?Ae:Me,n=M?je:Ne;z&&N.selectAll(`.percentage-label-group`).remove(),z=N.select(`.metadata-group`).append(`g`).classed(`percentage-label-group`,!0).selectAll(`text`).data(s.reverse()).enter().append(`text`),z.classed(`percentage-label`,!0).attr(`x`,t).attr(`y`,n).text(({value:t})=>e.format(T)(t)).attr(`font-size`,E+`px`)}function et(){let e;F&&!ie()?(e=N.select(`.chart-group`).selectAll(`.bar`).data(te),M?Ye(e):Qe(e),e=N.select(`.chart-group`).selectAll(`.bar`).data(s),M?Xe(e):Ze(e),e.exit().transition().style(`opacity`,0).remove()):(e=N.select(`.chart-group`).selectAll(`.bar`).data(s),M?Ye(e):Qe(e),e.exit().remove())}function tt(){N.select(`.grid-lines-group`).selectAll(`grid`).remove(),M?nt():it()}function nt(){xe(d).range([0,u]).hideEdges(`first`).ticks(y).extendedLine(Te.bottom)(N.select(`.grid-lines-group`))}function rt(){N.select(`.loading-state-group`).html(ee)}function it(){Se(f).range([0,l]).hideEdges(`first`).ticks(v).extendedLine(Te.left)(N.select(`.grid-lines-group`))}function at(e,t,n,r,i,a){X.call(`customMouseOver`,e,t,g(a,e),[r,i]),L||=function(){};let o=L;P?o(c(e)):n.forEach(t=>{t!==e&&o(c(t))})}function ot(e,t,n,r,i){X.call(`customMouseMove`,e,t,g(i,e),[n,r])}function st(e,t,n,r,i,a){X.call(`customMouseOut`,e,t,g(a,e),[r,i]),n.forEach(e=>{c(e).attr(`fill`,({name:e})=>Q(e))})}function ct(e,t,n,r,i){X.call(`customClick`,e,t,g(i,e),[n,r])}function lt(){return ye(s.map(ke),{ratio:b,emptyDomainMax:b})}return Z.a11yTitle=function(e){return arguments.length?(Re=e,this):Re},Z.a11yDescription=function(e){return arguments.length?(ze=e,this):ze},Z.a11yDataTable=function(e){return arguments.length?(Be=e,this):Be},Z.animationDuration=function(e){return arguments.length?(I=e,this):I},Z.betweenBarsPadding=function(e){return arguments.length?(D=e,this):D},Z.chartGradient=function(e){return arguments.length?(_=e,this):_},Z.colorMap=function(e){return arguments.length?(h=e,this):h},Z.colorSchema=function(e){return arguments.length?(p=e,this):p},Z.enableLabels=function(e){return arguments.length?(me=e,this):me},Z.exportChart=function(e,t){return ge.call(Z,N,e,t)},Z.hasPercentage=function(e){return arguments.length?(x=e?Ce:we,this):x===Ce},Z.hasSingleBarHighlight=function(e){return arguments.length?(P=e,this):P},Z.height=function(e){return arguments.length?(a=e,this):a},Z.highlightBarFunction=function(e){return arguments.length?(L=e,this):L},Z.isAnimated=function(e){return arguments.length?(F=e,this):F},Z.isHorizontal=function(e){return arguments.length?(M=e,this):M},Z.labelsMargin=function(e){return arguments.length?(w=e,this):w},Z.labelsNumberFormat=function(e){return arguments.length?(T=e,this):T},Z.labelsSize=function(e){return arguments.length?(E=e,this):E},Z.isLoading=function(e){return arguments.length?(o=e,this):o},Z.margin=function(e){return arguments.length?(t={...t,...e},this):t},Z.numberFormat=function(e){return arguments.length?(x=e,this):x},Z.on=function(...e){let t=X.on(...e);return t===X?Z:t},Z.percentageAxisToMaxRatio=function(e){return arguments.length?(b=e,this):b},Z.shouldReverseColorList=function(e){return arguments.length?(K=e,this):K},Z.orderingFunction=function(e){return arguments.length?(R=e,this):R},Z.valueLocale=function(e){return arguments.length?(q=e,this):q},Z.width=function(e){return arguments.length?(n=e,this):n},Z.xAxisLabel=function(e){return arguments.length?(V=e,this):V},Z.xAxisLabelOffset=function(e){return arguments.length?(H=e,this):H},Z.xTicks=function(e){return arguments.length?(y=e,this):y},Z.yAxisLabel=function(e){return arguments.length?(W=e,this):W},Z.yAxisLabelOffset=function(e){return arguments.length?(G=e,this):G},Z.yAxisPaddingBetweenChart=function(e){return arguments.length?(A=e,this):A},Z.yTicks=function(e){return arguments.length?(v=e,this):v},Z}var Ce,we;function L(){return(L=e((()=>{se(),f(),t(),n(),v(),x(),_(),h(),a(),w(),T(),A(),D(),s(),b(),M(),y(),N(),me(),l(),Ce=`%`,we=`,f`})))()}function R(e){this.Klass=R,this.config=u.defaults({},e),this.withNegativeValues=function(){let e=u.extend({},this.config,{data:[{name:`Shiny`,value:12},{name:`Blazing`,value:-8},{name:`Dazzling`,value:5},{name:`Radiant`,value:-14},{name:`Sparkling`,value:9},{name:`Gleaming`,value:-3}]});return new this.Klass(e)},this.withLettersFrequency=function(){let e=u.extend({},this.config,{data:[{name:`A`,value:.08167},{name:`B`,value:.01492},{name:`C`,value:.02782},{name:`D`,value:.04253},{name:`E`,value:.12702},{name:`F`,value:.02288},{name:`G`,value:.02015},{name:`H`,value:.06094},{name:`I`,value:.06966},{name:`J`,value:.00153},{name:`K`,value:.00772},{name:`L`,value:.04025},{name:`M`,value:.02406},{name:`N`,value:.06749},{name:`O`,value:.07507},{name:`P`,value:.01929},{name:`Q`,value:95e-5},{name:`R`,value:.05987},{name:`S`,value:.06327},{name:`T`,value:.09056},{name:`U`,value:.02758},{name:`V`,value:.00978},{name:`W`,value:.0236},{name:`X`,value:.0015},{name:`Y`,value:.01974},{name:`Z`,value:74e-5}]});return new this.Klass(e)},this.withColors=function(){let e=u.extend({},this.config,{data:[{name:`Radiating`,value:2},{name:`Opalescent`,value:4},{name:`Shining`,value:3},{name:`Vibrant`,value:6},{name:`Vivid`,value:6},{name:`Brilliant`,value:1}]});return new this.Klass(e)},this.build=function(){return this.config.data}}function z(){return(z=e((()=>{m()})))()}var B,V,H,U,W,G,K,q,J,Y,Te;function Ee(){return(Ee=e((()=>{h(),L(),F(),O(),o(),z(),D(),B=()=>new R,V=e=>{let t=E(),n=I(),r=c(t),i=r.node()?r.node().getBoundingClientRect().width:!1,a=P();if(i){let o=B().withLettersFrequency().build();te(n,e).width(i).on(`customMouseOver`,a.show).on(`customMouseMove`,a.update).on(`customMouseOut`,a.hide),r.datum(o).call(n),k(t,n,`bar`),c(`.bar-chart .metadata-group`).datum([]).call(a)}return t},V.args=p(I,[`height`,`margin`,`isHorizontal`,`isAnimated`,`colorSchema`,`shouldReverseColorList`,`betweenBarsPadding`,`hasPercentage`,`enableLabels`,`labelsNumberFormat`,`numberFormat`,`hasSingleBarHighlight`,`xTicks`,`yTicks`,`xAxisLabel`,`yAxisLabel`,`percentageAxisToMaxRatio`,`isLoading`]),V.args.isAnimated=!1,V.argTypes=d(V.args),H=()=>{let e=E(),t=I(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=P(),a;if(r){let e=B().withColors().build();t.isAnimated(!0).margin({left:30,right:20,top:20,bottom:30}).colorSchema(_e.colorSchemas.britecharts).width(r).yAxisPaddingBetweenChart(20).height(300).percentageAxisToMaxRatio(1.3).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),a=c(`.bar-chart .metadata-group`),a.datum([]).call(i)}return e},U=()=>{let e=E(),t=I(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=P(),a;if(r){let e=B().withColors().build();t.isHorizontal(!0).isAnimated(!0).margin({left:120,right:20,top:20,bottom:30}).colorSchema(_e.colorSchemas.britecharts).width(r).yAxisPaddingBetweenChart(20).height(300).percentageAxisToMaxRatio(1.3).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),a=c(`.bar-chart .metadata-group`),a.datum([]).call(i)}return e},W=()=>{let e=E(),t=I(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=P();if(r){let e=B().withLettersFrequency().build();t.isAnimated(!0).width(r).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),c(`.bar-chart .metadata-group`).datum([]).call(i)}return e},G=()=>{let e=E(),t=I(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=B().withLettersFrequency().build();t.width(r).hasPercentage(!0).enableLabels(!0).labelsNumberFormat(`.0%`).height(300),n.datum(e).call(t)}return e},K=()=>{let e=E(),t=I(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=B().withNegativeValues().build();t.isAnimated(!0).width(r).height(400),n.datum(e).call(t)}return e},q=()=>{let e=E(),t=I(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=B().withNegativeValues().build();t.isAnimated(!0).isHorizontal(!0).margin({left:100,right:40,top:40,bottom:40}).width(r).height(400),n.datum(e).call(t)}return e},J=()=>{let e=E(),t=I(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=B().withLettersFrequency().build();return r&&(t.width(r).height(300).isAnimated(!0).isLoading(!0),n.datum(i).call(t)),e},Y={title:`Charts/Bar`},Te=[`Playground`,`VerticalBarChart`,`HorizontalBarChart`,`WithAnimation`,`WithBarLabels`,`WithNegativeValues`,`WithNegativeValuesHorizontal`,`WithLoadingState`],V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`args => {
  const container = getCleanContainer();
  const barChart = bar();
  const barContainer = select(container);
  const containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false;
  const tooltip = miniTooltip();
  if (containerWidth) {
    const dataset = aTestDataSet().withLettersFrequency().build();
    applyArgs(barChart, args).width(containerWidth).on('customMouseOver', tooltip.show).on('customMouseMove', tooltip.update).on('customMouseOut', tooltip.hide);
    barContainer.datum(dataset).call(barChart);
    addExportButtons(container, barChart, 'bar');
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
}`,...J.parameters?.docs?.source}}}})))()}Ee();export{U as HorizontalBarChart,V as Playground,H as VerticalBarChart,W as WithAnimation,G as WithBarLabels,J as WithLoadingState,K as WithNegativeValues,q as WithNegativeValuesHorizontal,Te as __namedExportsOrder,Y as default};