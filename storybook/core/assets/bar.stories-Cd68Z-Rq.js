import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{$ as t,J as n,N as r,P as i,Q as a,Y as o,a as s,c,d as ee,g as te,i as l,l as ne,n as u,o as d,ot as f,s as p,st as m,t as re,u as ie,x as h}from"./index-all-BPoXWgX4.js";import{n as ae,t as g}from"./pointer-Djj9AZUl.js";import{n as oe}from"./quad-qkBhhiXk.js";import{i as se,n as ce,t as le}from"./axis-B0w998iS.js";import{n as ue,t as _}from"./linear-C6xez3-n.js";import{N as de,a as v,j as y,o as fe}from"./constants-CIM5pi6_.js";import{a as b,i as pe,n as x,r as S,t as C}from"./scale-BeAI6B8R.js";import{a as me,r as w}from"./text-CNi3j6EO.js";import{n as he,t as ge}from"./export-Z6ZFDRha.js";import{a as _e,n as T,o as E,r as D,s as ve,t as O}from"./helpers-CrbXQEV5.js";import{n as ye,r as k,t as A}from"./domain-BHqoErgM.js";import{n as be,t as j}from"./locale-_ou96yMh.js";import{n as xe,r as M,t as Se}from"./grid-yX7qHS3-.js";import{n as N,t as P}from"./mini-tooltip-BgyX658r.js";function F(){let e=`name`,t={top:20,right:20,bottom:30,left:40},r=960,o=500,s=!1,c,te,l,u,d,f,p=_e.singleColors.aloeGreen,re=null,h=null,g=null,se,_=5,v=5,y=1,b=I,S=!1,w=7,he=I,T=12,E=.1,D,O,k=10,j=!1,M,N=!0,P=!1,F=fe.duration,L=e=>e.attr(`fill`,({name:e})=>String(a(g?g[1]:re[e]).darker())),R,z,B=null,V=null,H=30,U=null,W=null,G=-30,K=!0,q=null,J=i,we=de(`bar-gradient`),Te={top:0,left:0,bottom:0,right:0},Ee=oe,De=(e,t)=>70*t,Y=n(`customMouseOver`,`customMouseOut`,`customMouseMove`,`customClick`),Oe=({name:e})=>e,ke=({value:e})=>e,Ae=({value:e})=>x(d)(e)+w,je=({name:e})=>C(f)(e)+C(f).bandwidth()/2+3/8*T,Me=({name:e})=>C(d)(e),Ne=({value:e})=>x(f)(e)-w;function X(e){q&&(J=be(q)),e.each(function(e){l=r-(t.left??0)-(t.right??0)-k*1.2,u=o-(t.top??0)-(t.bottom??0),{data:c,dataZeroed:te}=He(Ve(e)),Be(this),s?tt():(We(),Le(),Pe(J),Ie(),$e(),Ge(),Qe(),S&&Ze(J))})}function Pe(e){j?(D=le(d).ticks(v,e.format(b)).tickSizeInner(+[-u]),O=ce(f).ticks(_,e.format(b))):(D=le(d),O=ce(f).ticks(_,e.format(b)))}function Fe(){let e=M.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${(t.left??0)+k}, ${t.top})`);M.append(`g`).classed(`loading-state-group`,!0),e.append(`g`).classed(`grid-lines-group`,!0),e.append(`g`).classed(`chart-group`,!0),e.append(`g`).classed(`x-axis-group axis`,!0).append(`g`).classed(`x-axis-label`,!0),e.append(`g`).attr(`transform`,`translate(${-1*k}, 0)`).classed(`y-axis-group axis`,!0).append(`g`).classed(`y-axis-label`,!0),e.append(`g`).classed(`metadata-group`,!0)}function Ie(){!se&&g&&(se=M.select(`.metadata-group`).append(`linearGradient`).attr(`id`,we).attr(`x1`,`0%`).attr(`y1`,`0%`).attr(`x2`,`100%`).attr(`y2`,`100%`).attr(`gradientUnits`,`userSpaceOnUse`).selectAll(`stop`).data([{offset:`0%`,color:g[0]},{offset:`50%`,color:g[1]}]).enter().append(`stop`).attr(`offset`,({offset:e})=>e).attr(`stop-color`,({color:e})=>e))}function Le(){let e=ot();j?(d=ue().domain(e).rangeRound([0,l]),f=pe().domain(c.map(Oe)).rangeRound([0,u]).padding(E)):(d=pe().domain(c.map(Oe)).rangeRound([0,l]).padding(E),f=ue().domain(e).rangeRound([u,0])),K?c.map(e=>e).reverse().map(({name:e},t)=>({name:e,color:p[t%p.length]})):c.map(e=>e).map(({name:e},t)=>({name:e,color:p[t%p.length]})),re=ve(c.map(e=>e).reduce((e,{name:t},n)=>({...e,[t]:p[n%p.length]}),{}),h)}let Re=null,ze=null;function Be(e){M||(M=m(e).append(`svg`).classed(`britechart bar-chart`,!0),Fe()),M.attr(`viewBox`,[0,0,r,o]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,r).attr(`height`,o),ne(M.node(),{a11yTitle:Re,a11yDescription:ze,fallbackTitle:`Bar chart`})}function Ve(t){let n=t.reduce((t,n)=>{let r=n;return r.value=+r.value,r.name=String(r[e]),[...t,r]},[]);return{data:n,dataZeroed:n.map(t=>({value:0,name:String(t[e])}))}}function Z(e){return g?`url(#${we})`:re[e]}function He(e){let{data:t,dataZeroed:n}=e;return R&&(t.sort(R),n.sort(R)),{data:t,dataZeroed:n}}function Ue(e,t){me(e,t,0,1)}function We(){M.select(`.loading-state-group svg`).remove()}function Q(e){return m(e.parentNode).selectAll(`.bar`).nodes()}function Ge(){M.select(`.x-axis-group.axis`).attr(`transform`,`translate(0, ${u})`).call(D),M.select(`.y-axis-group.axis`).call(O),M.selectAll(`.y-axis-group .tick text`).call(Ue,(t.left??0)-k),Ke()}function Ke(){W&&(U&&U.remove(),U=M.select(`.y-axis-label`).append(`text`).classed(`y-axis-label-text`,!0).attr(`x`,-u/2).attr(`y`,G).attr(`text-anchor`,`middle`).attr(`transform`,`rotate(270 0 0)`).text(W)),V&&(B&&B.remove(),B=M.select(`.x-axis-label`).append(`text`).attr(`y`,H).attr(`text-anchor`,`middle`).classed(`x-axis-label-text`,!0).attr(`x`,l/2).text(V))}function qe(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`y`,u).attr(`x`,({value:e})=>A(x(d),e).start).attr(`height`,C(f).bandwidth()).attr(`width`,({value:e})=>A(x(d),e).size).on(`mouseover`,function(e,t){rt(this,t,Q(this),l,u,e)}).on(`mousemove`,function(e,t){it(this,t,l,u,e)}).on(`mouseout`,function(e,t){at(this,t,Q(this),l,u,e)}).on(`click`,function(e,t){$(this,t,l,u,e)}).merge(e).attr(`x`,({value:e})=>A(x(d),e).start).attr(`y`,({name:e})=>C(f)(e)).attr(`height`,C(f).bandwidth()).attr(`width`,({value:e})=>A(x(d),e).size).attr(`fill`,({name:e})=>Z(e))}function Je(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,({value:e})=>A(x(d),e).start).attr(`y`,u).attr(`height`,C(f).bandwidth()).attr(`width`,({value:e})=>A(x(d),e).size).on(`mouseover`,function(e,t){rt(this,t,Q(this),l,u,e)}).on(`mousemove`,function(e,t){it(this,t,l,u,e)}).on(`mouseout`,function(e,t){at(this,t,Q(this),l,u,e)}).on(`click`,function(e,t){$(this,t,l,u,e)}),e.attr(`x`,({value:e})=>A(x(d),e).start).attr(`y`,({name:e})=>C(f)(e)).attr(`height`,C(f).bandwidth()).attr(`fill`,({name:e})=>Z(e)).transition().duration(F).delay(De).ease(Ee).attr(`width`,({value:e})=>A(x(d),e).size)}function Ye(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,l).attr(`y`,({value:e})=>A(x(f),e).start).attr(`width`,C(d).bandwidth()).attr(`height`,({value:e})=>A(x(f),e).size).on(`mouseover`,function(e,t){rt(this,t,Q(this),l,u,e)}).on(`mousemove`,function(e,t){it(this,t,l,u,e)}).on(`mouseout`,function(e,t){at(this,t,Q(this),l,u,e)}).on(`click`,function(e,t){$(this,t,l,u,e)}).merge(e).attr(`x`,({name:e})=>C(d)(e)).attr(`width`,C(d).bandwidth()).attr(`fill`,({name:e})=>Z(e)).transition().duration(F).delay(De).ease(Ee).attr(`y`,({value:e})=>A(x(f),e).start).attr(`height`,({value:e})=>A(x(f),e).size)}function Xe(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,l).attr(`y`,({value:e})=>A(x(f),e).start).attr(`width`,C(d).bandwidth()).attr(`height`,({value:e})=>A(x(f),e).size).on(`mouseover`,function(e,t){rt(this,t,Q(this),l,u,e)}).on(`mousemove`,function(e,t){it(this,t,l,u,e)}).on(`mouseout`,function(e,t){at(this,t,Q(this),l,u,e)}).on(`click`,function(e,t){$(this,t,l,u,e)}).merge(e).attr(`x`,({name:e})=>C(d)(e)).attr(`y`,({value:e})=>A(x(f),e).start).attr(`width`,C(d).bandwidth()).attr(`height`,({value:e})=>A(x(f),e).size).attr(`fill`,({name:e})=>Z(e))}function Ze(e){let t=j?Ae:Me,n=j?je:Ne;z&&M.selectAll(`.percentage-label-group`).remove(),z=M.select(`.metadata-group`).append(`g`).classed(`percentage-label-group`,!0).selectAll(`text`).data(c.reverse()).enter().append(`text`),z.classed(`percentage-label`,!0).attr(`x`,t).attr(`y`,n).text(({value:t})=>e.format(he)(t)).attr(`font-size`,T+`px`)}function Qe(){let e;P&&!ie()?(e=M.select(`.chart-group`).selectAll(`.bar`).data(te),j?qe(e):Xe(e),e=M.select(`.chart-group`).selectAll(`.bar`).data(c),j?Je(e):Ye(e),e.exit().transition().style(`opacity`,0).remove()):(e=M.select(`.chart-group`).selectAll(`.bar`).data(c),j?qe(e):Xe(e),e.exit().remove())}function $e(){M.select(`.grid-lines-group`).selectAll(`grid`).remove(),j?et():nt()}function et(){xe(d).range([0,u]).hideEdges(`first`).ticks(v).extendedLine(Te.bottom)(M.select(`.grid-lines-group`))}function tt(){M.select(`.loading-state-group`).html(ee)}function nt(){Se(f).range([0,l]).hideEdges(`first`).ticks(_).extendedLine(Te.left)(M.select(`.grid-lines-group`))}function rt(e,t,n,r,i,a){Y.call(`customMouseOver`,e,t,ae(a,e),[r,i]),L||=function(){};let o=L;N?o(m(e)):n.forEach(t=>{t!==e&&o(m(t))})}function it(e,t,n,r,i){Y.call(`customMouseMove`,e,t,ae(i,e),[n,r])}function at(e,t,n,r,i,a){Y.call(`customMouseOut`,e,t,ae(a,e),[r,i]),n.forEach(e=>{m(e).attr(`fill`,({name:e})=>Z(e))})}function $(e,t,n,r,i){Y.call(`customClick`,e,t,ae(i,e),[n,r])}function ot(){return ye(c.map(ke),{ratio:y,emptyDomainMax:y})}return X.a11yTitle=function(e){return arguments.length?(Re=e,this):Re},X.a11yDescription=function(e){return arguments.length?(ze=e,this):ze},X.animationDuration=function(e){return arguments.length?(F=e,this):F},X.betweenBarsPadding=function(e){return arguments.length?(E=e,this):E},X.chartGradient=function(e){return arguments.length?(g=e,this):g},X.colorMap=function(e){return arguments.length?(h=e,this):h},X.colorSchema=function(e){return arguments.length?(p=e,this):p},X.enableLabels=function(e){return arguments.length?(S=e,this):S},X.exportChart=function(e,t){return ge.call(X,M,e,t)},X.hasPercentage=function(e){return arguments.length?(b=e?Ce:I,this):b===Ce},X.hasSingleBarHighlight=function(e){return arguments.length?(N=e,this):N},X.height=function(e){return arguments.length?(o=e,this):o},X.highlightBarFunction=function(e){return arguments.length?(L=e,this):L},X.isAnimated=function(e){return arguments.length?(P=e,this):P},X.isHorizontal=function(e){return arguments.length?(j=e,this):j},X.labelsMargin=function(e){return arguments.length?(w=e,this):w},X.labelsNumberFormat=function(e){return arguments.length?(he=e,this):he},X.labelsSize=function(e){return arguments.length?(T=e,this):T},X.isLoading=function(e){return arguments.length?(s=e,this):s},X.margin=function(e){return arguments.length?(t={...t,...e},this):t},X.numberFormat=function(e){return arguments.length?(b=e,this):b},X.on=function(...e){let t=Y.on(...e);return t===Y?X:t},X.percentageAxisToMaxRatio=function(e){return arguments.length?(y=e,this):y},X.shouldReverseColorList=function(e){return arguments.length?(K=e,this):K},X.orderingFunction=function(e){return arguments.length?(R=e,this):R},X.valueLocale=function(e){return arguments.length?(q=e,this):q},X.width=function(e){return arguments.length?(r=e,this):r},X.xAxisLabel=function(e){return arguments.length?(V=e,this):V},X.xAxisLabelOffset=function(e){return arguments.length?(H=e,this):H},X.xTicks=function(e){return arguments.length?(v=e,this):v},X.yAxisLabel=function(e){return arguments.length?(W=e,this):W},X.yAxisLabelOffset=function(e){return arguments.length?(G=e,this):G},X.yAxisPaddingBetweenChart=function(e){return arguments.length?(k=e,this):k},X.yTicks=function(e){return arguments.length?(_=e,this):_},X}var Ce,I;function L(){return(L=e((()=>{se(),t(),o(),r(),_(),b(),g(),f(),h(),w(),he(),k(),E(),te(),y(),j(),v(),M(),S(),c(),Ce=`%`,I=`,f`})))()}function R(e){this.Klass=R,this.config=u.defaults({},e),this.withNegativeValues=function(){let e=u.extend({},this.config,{data:[{name:`Shiny`,value:12},{name:`Blazing`,value:-8},{name:`Dazzling`,value:5},{name:`Radiant`,value:-14},{name:`Sparkling`,value:9},{name:`Gleaming`,value:-3}]});return new this.Klass(e)},this.withLettersFrequency=function(){let e=u.extend({},this.config,{data:[{name:`A`,value:.08167},{name:`B`,value:.01492},{name:`C`,value:.02782},{name:`D`,value:.04253},{name:`E`,value:.12702},{name:`F`,value:.02288},{name:`G`,value:.02015},{name:`H`,value:.06094},{name:`I`,value:.06966},{name:`J`,value:.00153},{name:`K`,value:.00772},{name:`L`,value:.04025},{name:`M`,value:.02406},{name:`N`,value:.06749},{name:`O`,value:.07507},{name:`P`,value:.01929},{name:`Q`,value:95e-5},{name:`R`,value:.05987},{name:`S`,value:.06327},{name:`T`,value:.09056},{name:`U`,value:.02758},{name:`V`,value:.00978},{name:`W`,value:.0236},{name:`X`,value:.0015},{name:`Y`,value:.01974},{name:`Z`,value:74e-5}]});return new this.Klass(e)},this.withColors=function(){let e=u.extend({},this.config,{data:[{name:`Radiating`,value:2},{name:`Opalescent`,value:4},{name:`Shining`,value:3},{name:`Vibrant`,value:6},{name:`Vivid`,value:6},{name:`Brilliant`,value:1}]});return new this.Klass(e)},this.build=function(){return this.config.data}}function z(){return(z=e((()=>{re()})))()}var B,V,H,U,W,G,K,q,J,we,Te;function Ee(){return(Ee=e((()=>{f(),L(),P(),D(),s(),z(),E(),B=()=>new R,V=e=>{let t=T(),n=F(),r=m(t),i=r.node()?r.node().getBoundingClientRect().width:!1,a=N();if(i){let o=B().withLettersFrequency().build();l(n,e).width(i).on(`customMouseOver`,a.show).on(`customMouseMove`,a.update).on(`customMouseOut`,a.hide),r.datum(o).call(n),O(t,n,`bar`),m(`.bar-chart .metadata-group`).datum([]).call(a)}return t},V.args=p(F,[`height`,`margin`,`isHorizontal`,`isAnimated`,`colorSchema`,`shouldReverseColorList`,`betweenBarsPadding`,`hasPercentage`,`enableLabels`,`labelsNumberFormat`,`numberFormat`,`hasSingleBarHighlight`,`xTicks`,`yTicks`,`xAxisLabel`,`yAxisLabel`,`percentageAxisToMaxRatio`,`isLoading`]),V.args.isAnimated=!1,V.argTypes=d(V.args),H=()=>{let e=T(),t=F(),n=m(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=N(),a;if(r){let e=B().withColors().build();t.isAnimated(!0).margin({left:30,right:20,top:20,bottom:30}).colorSchema(_e.colorSchemas.britecharts).width(r).yAxisPaddingBetweenChart(20).height(300).percentageAxisToMaxRatio(1.3).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),a=m(`.bar-chart .metadata-group`),a.datum([]).call(i)}return e},U=()=>{let e=T(),t=F(),n=m(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=N(),a;if(r){let e=B().withColors().build();t.isHorizontal(!0).isAnimated(!0).margin({left:120,right:20,top:20,bottom:30}).colorSchema(_e.colorSchemas.britecharts).width(r).yAxisPaddingBetweenChart(20).height(300).percentageAxisToMaxRatio(1.3).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),a=m(`.bar-chart .metadata-group`),a.datum([]).call(i)}return e},W=()=>{let e=T(),t=F(),n=m(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=N();if(r){let e=B().withLettersFrequency().build();t.isAnimated(!0).width(r).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),m(`.bar-chart .metadata-group`).datum([]).call(i)}return e},G=()=>{let e=T(),t=F(),n=m(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=B().withLettersFrequency().build();t.width(r).hasPercentage(!0).enableLabels(!0).labelsNumberFormat(`.0%`).height(300),n.datum(e).call(t)}return e},K=()=>{let e=T(),t=F(),n=m(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=B().withNegativeValues().build();t.isAnimated(!0).width(r).height(400),n.datum(e).call(t)}return e},q=()=>{let e=T(),t=F(),n=m(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=B().withNegativeValues().build();t.isAnimated(!0).isHorizontal(!0).margin({left:100,right:40,top:40,bottom:40}).width(r).height(400),n.datum(e).call(t)}return e},J=()=>{let e=T(),t=F(),n=m(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=B().withLettersFrequency().build();return r&&(t.width(r).height(300).isAnimated(!0).isLoading(!0),n.datum(i).call(t)),e},we={title:`Charts/Bar`},Te=[`Playground`,`VerticalBarChart`,`HorizontalBarChart`,`WithAnimation`,`WithBarLabels`,`WithNegativeValues`,`WithNegativeValuesHorizontal`,`WithLoadingState`],V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`args => {
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
}`,...J.parameters?.docs?.source}}}})))()}Ee();export{U as HorizontalBarChart,V as Playground,H as VerticalBarChart,W as WithAnimation,G as WithBarLabels,J as WithLoadingState,K as WithNegativeValues,q as WithNegativeValuesHorizontal,Te as __namedExportsOrder,we as default};