import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{$ as t,F as n,P as r,S as i,X as a,Y as o,_ as s,a as c,c as ee,ct as l,d as te,et as u,f as ne,i as d,l as re,n as f,o as p,s as m,st as h,t as ie}from"./index-all-DVXELaAB.js";import{n as g,t as _}from"./pointer-Djj9AZUl.js";import{n as ae}from"./quad-qkBhhiXk.js";import{i as oe,n as se,t as ce}from"./axis-B0w998iS.js";import{n as le,t as v}from"./linear-CP1LlO6k.js";import{N as ue,a as y,j as b,o as de}from"./constants-BKB1f-z9.js";import{a as x,i as fe,n as S,r as C,t as w}from"./scale-mIgAifqi.js";import{a as pe,r as T}from"./text-CynFoCiG.js";import{n as me,t as he}from"./export-BV1q5uvn.js";import{a as ge,n as E,o as D,r as O,s as _e,t as ve}from"./helpers-CrbXQEV5.js";import{n as ye,r as k,t as A}from"./domain-B5ZRanAQ.js";import{n as be,t as j}from"./locale-Bxse79GX.js";import{n as xe,r as M,t as Se}from"./grid-yX7qHS3-.js";import{n as N,t as P}from"./mini-tooltip-_HYxi547.js";function F(){let e=`name`,r={top:20,right:20,bottom:30,left:40},i=960,a=500,s=!1,c,ee,u,d,f,p,m=ge.singleColors.aloeGreen,h=null,ie=null,_=null,oe,v=5,y=5,b=1,x=I,C=!1,T=7,me=I,E=12,D=.1,O,ve,k=10,j=!1,M,N=!0,P=!1,F=de.duration,L=e=>e.attr(`fill`,({name:e})=>String(t(_?_[1]:h[e]).darker())),R,z,B=null,V=null,H=30,U=null,W=null,G=-30,K=!0,q=null,J=n,Y=ue(`bar-gradient`),we={top:0,left:0,bottom:0,right:0},Te=ae,Ee=(e,t)=>70*t,X=o(`customMouseOver`,`customMouseOut`,`customMouseMove`,`customClick`),De=({name:e})=>e,Oe=({value:e})=>e,ke=({value:e})=>S(f)(e)+T,Ae=({name:e})=>w(p)(e)+w(p).bandwidth()/2+3/8*E,je=({name:e})=>w(f)(e),Me=({value:e})=>S(p)(e)-T;function Z(e){q&&(J=be(q)),e.each(function(e){u=i-(r.left??0)-(r.right??0)-k*1.2,d=a-(r.top??0)-(r.bottom??0),{data:c,dataZeroed:ee}=Ve(Be(e)),ze(this),s?et():(Ue(),Ie(),Ne(J),Fe(),Qe(),We(),Ze(),C&&Xe(J))})}function Ne(e){j?(O=ce(f).ticks(y,e.format(x)).tickSizeInner(+[-d]),ve=se(p).ticks(v,e.format(x))):(O=ce(f),ve=se(p).ticks(v,e.format(x)))}function Pe(){let e=M.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${(r.left??0)+k}, ${r.top})`);M.append(`g`).classed(`loading-state-group`,!0),e.append(`g`).classed(`grid-lines-group`,!0),e.append(`g`).classed(`chart-group`,!0),e.append(`g`).classed(`x-axis-group axis`,!0).append(`g`).classed(`x-axis-label`,!0),e.append(`g`).attr(`transform`,`translate(${-1*k}, 0)`).classed(`y-axis-group axis`,!0).append(`g`).classed(`y-axis-label`,!0),e.append(`g`).classed(`metadata-group`,!0)}function Fe(){!oe&&_&&(oe=M.select(`.metadata-group`).append(`linearGradient`).attr(`id`,Y).attr(`x1`,`0%`).attr(`y1`,`0%`).attr(`x2`,`100%`).attr(`y2`,`100%`).attr(`gradientUnits`,`userSpaceOnUse`).selectAll(`stop`).data([{offset:`0%`,color:_[0]},{offset:`50%`,color:_[1]}]).enter().append(`stop`).attr(`offset`,({offset:e})=>e).attr(`stop-color`,({color:e})=>e))}function Ie(){let e=ot();j?(f=le().domain(e).rangeRound([0,u]),p=fe().domain(c.map(De)).rangeRound([0,d]).padding(D)):(f=fe().domain(c.map(De)).rangeRound([0,u]).padding(D),p=le().domain(e).rangeRound([d,0])),K?c.map(e=>e).reverse().map(({name:e},t)=>({name:e,color:m[t%m.length]})):c.map(e=>e).map(({name:e},t)=>({name:e,color:m[t%m.length]})),h=_e(c.map(e=>e).reduce((e,{name:t},n)=>({...e,[t]:m[n%m.length]}),{}),ie)}let Le=null,Re=null;function ze(e){M||(M=l(e).append(`svg`).classed(`britechart bar-chart`,!0),Pe()),M.attr(`viewBox`,[0,0,i,a]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,i).attr(`height`,a),re(M.node(),{a11yTitle:Le,a11yDescription:Re,fallbackTitle:`Bar chart`})}function Be(t){let n=t.reduce((t,n)=>{let r=n;return r.value=+r.value,r.name=String(r[e]),[...t,r]},[]);return{data:n,dataZeroed:n.map(t=>({value:0,name:String(t[e])}))}}function Q(e){return _?`url(#${Y})`:h[e]}function Ve(e){let{data:t,dataZeroed:n}=e;return R&&(t.sort(R),n.sort(R)),{data:t,dataZeroed:n}}function He(e,t){pe(e,t,0,1)}function Ue(){M.select(`.loading-state-group svg`).remove()}function $(e){return l(e.parentNode).selectAll(`.bar`).nodes()}function We(){M.select(`.x-axis-group.axis`).attr(`transform`,`translate(0, ${d})`).call(O),M.select(`.y-axis-group.axis`).call(ve),M.selectAll(`.y-axis-group .tick text`).call(He,(r.left??0)-k),Ge()}function Ge(){W&&(U&&U.remove(),U=M.select(`.y-axis-label`).append(`text`).classed(`y-axis-label-text`,!0).attr(`x`,-d/2).attr(`y`,G).attr(`text-anchor`,`middle`).attr(`transform`,`rotate(270 0 0)`).text(W)),V&&(B&&B.remove(),B=M.select(`.x-axis-label`).append(`text`).attr(`y`,H).attr(`text-anchor`,`middle`).classed(`x-axis-label-text`,!0).attr(`x`,u/2).text(V))}function Ke(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`y`,d).attr(`x`,({value:e})=>A(S(f),e).start).attr(`height`,w(p).bandwidth()).attr(`width`,({value:e})=>A(S(f),e).size).on(`mouseover`,function(e,t){nt(this,t,$(this),u,d,e)}).on(`mousemove`,function(e,t){rt(this,t,u,d,e)}).on(`mouseout`,function(e,t){it(this,t,$(this),u,d,e)}).on(`click`,function(e,t){at(this,t,u,d,e)}).merge(e).attr(`x`,({value:e})=>A(S(f),e).start).attr(`y`,({name:e})=>w(p)(e)).attr(`height`,w(p).bandwidth()).attr(`width`,({value:e})=>A(S(f),e).size).attr(`fill`,({name:e})=>Q(e))}function qe(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,({value:e})=>A(S(f),e).start).attr(`y`,d).attr(`height`,w(p).bandwidth()).attr(`width`,({value:e})=>A(S(f),e).size).on(`mouseover`,function(e,t){nt(this,t,$(this),u,d,e)}).on(`mousemove`,function(e,t){rt(this,t,u,d,e)}).on(`mouseout`,function(e,t){it(this,t,$(this),u,d,e)}).on(`click`,function(e,t){at(this,t,u,d,e)}),e.attr(`x`,({value:e})=>A(S(f),e).start).attr(`y`,({name:e})=>w(p)(e)).attr(`height`,w(p).bandwidth()).attr(`fill`,({name:e})=>Q(e)).transition().duration(F).delay(Ee).ease(Te).attr(`width`,({value:e})=>A(S(f),e).size)}function Je(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,u).attr(`y`,({value:e})=>A(S(p),e).start).attr(`width`,w(f).bandwidth()).attr(`height`,({value:e})=>A(S(p),e).size).on(`mouseover`,function(e,t){nt(this,t,$(this),u,d,e)}).on(`mousemove`,function(e,t){rt(this,t,u,d,e)}).on(`mouseout`,function(e,t){it(this,t,$(this),u,d,e)}).on(`click`,function(e,t){at(this,t,u,d,e)}).merge(e).attr(`x`,({name:e})=>w(f)(e)).attr(`width`,w(f).bandwidth()).attr(`fill`,({name:e})=>Q(e)).transition().duration(F).delay(Ee).ease(Te).attr(`y`,({value:e})=>A(S(p),e).start).attr(`height`,({value:e})=>A(S(p),e).size)}function Ye(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,u).attr(`y`,({value:e})=>A(S(p),e).start).attr(`width`,w(f).bandwidth()).attr(`height`,({value:e})=>A(S(p),e).size).on(`mouseover`,function(e,t){nt(this,t,$(this),u,d,e)}).on(`mousemove`,function(e,t){rt(this,t,u,d,e)}).on(`mouseout`,function(e,t){it(this,t,$(this),u,d,e)}).on(`click`,function(e,t){at(this,t,u,d,e)}).merge(e).attr(`x`,({name:e})=>w(f)(e)).attr(`y`,({value:e})=>A(S(p),e).start).attr(`width`,w(f).bandwidth()).attr(`height`,({value:e})=>A(S(p),e).size).attr(`fill`,({name:e})=>Q(e))}function Xe(e){let t=j?ke:je,n=j?Ae:Me;z&&M.selectAll(`.percentage-label-group`).remove(),z=M.select(`.metadata-group`).append(`g`).classed(`percentage-label-group`,!0).selectAll(`text`).data(c.reverse()).enter().append(`text`),z.classed(`percentage-label`,!0).attr(`x`,t).attr(`y`,n).text(({value:t})=>e.format(me)(t)).attr(`font-size`,E+`px`)}function Ze(){let e;P&&!te()?(e=M.select(`.chart-group`).selectAll(`.bar`).data(ee),j?Ke(e):Ye(e),e=M.select(`.chart-group`).selectAll(`.bar`).data(c),j?qe(e):Je(e),e.exit().transition().style(`opacity`,0).remove()):(e=M.select(`.chart-group`).selectAll(`.bar`).data(c),j?Ke(e):Ye(e),e.exit().remove())}function Qe(){M.select(`.grid-lines-group`).selectAll(`grid`).remove(),j?$e():tt()}function $e(){xe(f).range([0,d]).hideEdges(`first`).ticks(y).extendedLine(we.bottom)(M.select(`.grid-lines-group`))}function et(){M.select(`.loading-state-group`).html(ne)}function tt(){Se(p).range([0,u]).hideEdges(`first`).ticks(v).extendedLine(we.left)(M.select(`.grid-lines-group`))}function nt(e,t,n,r,i,a){X.call(`customMouseOver`,e,t,g(a,e),[r,i]),L||=function(){};let o=L;N?o(l(e)):n.forEach(t=>{t!==e&&o(l(t))})}function rt(e,t,n,r,i){X.call(`customMouseMove`,e,t,g(i,e),[n,r])}function it(e,t,n,r,i,a){X.call(`customMouseOut`,e,t,g(a,e),[r,i]),n.forEach(e=>{l(e).attr(`fill`,({name:e})=>Q(e))})}function at(e,t,n,r,i){X.call(`customClick`,e,t,g(i,e),[n,r])}function ot(){return ye(c.map(Oe),{ratio:b,emptyDomainMax:b})}return Z.a11yTitle=function(e){return arguments.length?(Le=e,this):Le},Z.a11yDescription=function(e){return arguments.length?(Re=e,this):Re},Z.animationDuration=function(e){return arguments.length?(F=e,this):F},Z.betweenBarsPadding=function(e){return arguments.length?(D=e,this):D},Z.chartGradient=function(e){return arguments.length?(_=e,this):_},Z.colorMap=function(e){return arguments.length?(ie=e,this):ie},Z.colorSchema=function(e){return arguments.length?(m=e,this):m},Z.enableLabels=function(e){return arguments.length?(C=e,this):C},Z.exportChart=function(e,t){return he.call(Z,M,e,t)},Z.hasPercentage=function(e){return arguments.length?(x=e?Ce:I,this):x===Ce},Z.hasSingleBarHighlight=function(e){return arguments.length?(N=e,this):N},Z.height=function(e){return arguments.length?(a=e,this):a},Z.highlightBarFunction=function(e){return arguments.length?(L=e,this):L},Z.isAnimated=function(e){return arguments.length?(P=e,this):P},Z.isHorizontal=function(e){return arguments.length?(j=e,this):j},Z.labelsMargin=function(e){return arguments.length?(T=e,this):T},Z.labelsNumberFormat=function(e){return arguments.length?(me=e,this):me},Z.labelsSize=function(e){return arguments.length?(E=e,this):E},Z.isLoading=function(e){return arguments.length?(s=e,this):s},Z.margin=function(e){return arguments.length?(r={...r,...e},this):r},Z.numberFormat=function(e){return arguments.length?(x=e,this):x},Z.on=function(...e){let t=X.on(...e);return t===X?Z:t},Z.percentageAxisToMaxRatio=function(e){return arguments.length?(b=e,this):b},Z.shouldReverseColorList=function(e){return arguments.length?(K=e,this):K},Z.orderingFunction=function(e){return arguments.length?(R=e,this):R},Z.valueLocale=function(e){return arguments.length?(q=e,this):q},Z.width=function(e){return arguments.length?(i=e,this):i},Z.xAxisLabel=function(e){return arguments.length?(V=e,this):V},Z.xAxisLabelOffset=function(e){return arguments.length?(H=e,this):H},Z.xTicks=function(e){return arguments.length?(y=e,this):y},Z.yAxisLabel=function(e){return arguments.length?(W=e,this):W},Z.yAxisLabelOffset=function(e){return arguments.length?(G=e,this):G},Z.yAxisPaddingBetweenChart=function(e){return arguments.length?(k=e,this):k},Z.yTicks=function(e){return arguments.length?(v=e,this):v},Z}var Ce,I;function L(){return(L=e((()=>{oe(),u(),a(),r(),v(),x(),_(),h(),i(),T(),me(),k(),D(),s(),b(),j(),y(),M(),C(),ee(),Ce=`%`,I=`,f`})))()}function R(e){this.Klass=R,this.config=f.defaults({},e),this.withNegativeValues=function(){let e=f.extend({},this.config,{data:[{name:`Shiny`,value:12},{name:`Blazing`,value:-8},{name:`Dazzling`,value:5},{name:`Radiant`,value:-14},{name:`Sparkling`,value:9},{name:`Gleaming`,value:-3}]});return new this.Klass(e)},this.withLettersFrequency=function(){let e=f.extend({},this.config,{data:[{name:`A`,value:.08167},{name:`B`,value:.01492},{name:`C`,value:.02782},{name:`D`,value:.04253},{name:`E`,value:.12702},{name:`F`,value:.02288},{name:`G`,value:.02015},{name:`H`,value:.06094},{name:`I`,value:.06966},{name:`J`,value:.00153},{name:`K`,value:.00772},{name:`L`,value:.04025},{name:`M`,value:.02406},{name:`N`,value:.06749},{name:`O`,value:.07507},{name:`P`,value:.01929},{name:`Q`,value:95e-5},{name:`R`,value:.05987},{name:`S`,value:.06327},{name:`T`,value:.09056},{name:`U`,value:.02758},{name:`V`,value:.00978},{name:`W`,value:.0236},{name:`X`,value:.0015},{name:`Y`,value:.01974},{name:`Z`,value:74e-5}]});return new this.Klass(e)},this.withColors=function(){let e=f.extend({},this.config,{data:[{name:`Radiating`,value:2},{name:`Opalescent`,value:4},{name:`Shining`,value:3},{name:`Vibrant`,value:6},{name:`Vivid`,value:6},{name:`Brilliant`,value:1}]});return new this.Klass(e)},this.build=function(){return this.config.data}}function z(){return(z=e((()=>{ie()})))()}var B,V,H,U,W,G,K,q,J,Y,we;function Te(){return(Te=e((()=>{h(),L(),P(),O(),c(),z(),D(),B=()=>new R,V=e=>{let t=E(),n=F(),r=l(t),i=r.node()?r.node().getBoundingClientRect().width:!1,a=N();if(i){let o=B().withLettersFrequency().build();d(n,e).width(i).on(`customMouseOver`,a.show).on(`customMouseMove`,a.update).on(`customMouseOut`,a.hide),r.datum(o).call(n),ve(t,n,`bar`),l(`.bar-chart .metadata-group`).datum([]).call(a)}return t},V.args=m(F,[`height`,`margin`,`isHorizontal`,`isAnimated`,`colorSchema`,`shouldReverseColorList`,`betweenBarsPadding`,`hasPercentage`,`enableLabels`,`labelsNumberFormat`,`numberFormat`,`hasSingleBarHighlight`,`xTicks`,`yTicks`,`xAxisLabel`,`yAxisLabel`,`percentageAxisToMaxRatio`,`isLoading`]),V.args.isAnimated=!1,V.argTypes=p(V.args),H=()=>{let e=E(),t=F(),n=l(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=N(),a;if(r){let e=B().withColors().build();t.isAnimated(!0).margin({left:30,right:20,top:20,bottom:30}).colorSchema(ge.colorSchemas.britecharts).width(r).yAxisPaddingBetweenChart(20).height(300).percentageAxisToMaxRatio(1.3).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),a=l(`.bar-chart .metadata-group`),a.datum([]).call(i)}return e},U=()=>{let e=E(),t=F(),n=l(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=N(),a;if(r){let e=B().withColors().build();t.isHorizontal(!0).isAnimated(!0).margin({left:120,right:20,top:20,bottom:30}).colorSchema(ge.colorSchemas.britecharts).width(r).yAxisPaddingBetweenChart(20).height(300).percentageAxisToMaxRatio(1.3).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),a=l(`.bar-chart .metadata-group`),a.datum([]).call(i)}return e},W=()=>{let e=E(),t=F(),n=l(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=N();if(r){let e=B().withLettersFrequency().build();t.isAnimated(!0).width(r).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),l(`.bar-chart .metadata-group`).datum([]).call(i)}return e},G=()=>{let e=E(),t=F(),n=l(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=B().withLettersFrequency().build();t.width(r).hasPercentage(!0).enableLabels(!0).labelsNumberFormat(`.0%`).height(300),n.datum(e).call(t)}return e},K=()=>{let e=E(),t=F(),n=l(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=B().withNegativeValues().build();t.isAnimated(!0).width(r).height(400),n.datum(e).call(t)}return e},q=()=>{let e=E(),t=F(),n=l(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=B().withNegativeValues().build();t.isAnimated(!0).isHorizontal(!0).margin({left:100,right:40,top:40,bottom:40}).width(r).height(400),n.datum(e).call(t)}return e},J=()=>{let e=E(),t=F(),n=l(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=B().withLettersFrequency().build();return r&&(t.width(r).height(300).isAnimated(!0).isLoading(!0),n.datum(i).call(t)),e},Y={title:`Charts/Bar`},we=[`Playground`,`VerticalBarChart`,`HorizontalBarChart`,`WithAnimation`,`WithBarLabels`,`WithNegativeValues`,`WithNegativeValuesHorizontal`,`WithLoadingState`],V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`args => {
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
}`,...J.parameters?.docs?.source}}}})))()}Te();export{U as HorizontalBarChart,V as Playground,H as VerticalBarChart,W as WithAnimation,G as WithBarLabels,J as WithLoadingState,K as WithNegativeValues,q as WithNegativeValuesHorizontal,we as __namedExportsOrder,Y as default};