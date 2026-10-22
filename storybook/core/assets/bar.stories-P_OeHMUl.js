import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{$ as t,L as n,Q as r,R as i,T as a,a as o,b as s,dt as c,h as ee,i as te,l,m as ne,n as u,nt as re,o as d,p as ie,rt as f,s as p,t as m,u as ae,ut as h}from"./index-all-DhiTiQVV.js";import{n as oe,t as g}from"./pointer-Djj9AZUl.js";import{n as se}from"./quad-qkBhhiXk.js";import{i as ce,n as le,t as ue}from"./axis-B0w998iS.js";import{n as de,t as _}from"./linear-C4axaRz1.js";import{N as fe,a as v,j as y,o as pe}from"./constants-CTgVdheE.js";import{a as b,i as me,n as x,r as S,t as C}from"./scale-Cjil7EpP.js";import{a as w,n as T,s as he,t as ge}from"./keyboard-BC_p5uVB.js";import{n as E,t as _e}from"./export-BV1q5uvn.js";import{a as ve,n as D,o as O,r as k,s as ye,t as A}from"./helpers-CrbXQEV5.js";import{n as be,r as j,t as M}from"./domain-D5gbVy7_.js";import{n as xe,t as N}from"./locale-G5axav3H.js";import{n as Se,r as P,t as Ce}from"./grid-yX7qHS3-.js";import{n as F,t as I}from"./mini-tooltip-sZV06fCD.js";function L(){let e=`name`,t={top:20,right:20,bottom:30,left:40},n=960,a=500,o=!1,s,te,l,u,d,f,p=ve.singleColors.aloeGreen,m=null,h=null,g=null,ce,_=5,v=5,y=1,b=Te,S=!1,w=7,T=Te,E=12,D=.1,O,k,A=10,j=!1,N,P=!0,F=!1,I=pe.duration,L=e=>e.attr(`fill`,({name:e})=>String(re(g?g[1]:m[e]).darker())),R,z,B=null,V=null,H=30,U=null,W=null,G=-30,K=!0,q=null,J=i,Y=fe(`bar-gradient`),Ee={top:0,left:0,bottom:0,right:0},De=se,Oe=(e,t)=>70*t,X=r(`customMouseOver`,`customMouseOut`,`customMouseMove`,`customClick`),ke=({name:e})=>e,Ae=({value:e})=>e,je=({value:e})=>x(d)(e)+w,Me=({name:e})=>C(f)(e)+C(f).bandwidth()/2+3/8*E,Ne=({name:e})=>C(d)(e),Pe=({value:e})=>x(f)(e)-w;function Z(e){q&&(J=xe(q)),e.each(function(e){l=n-(t.left??0)-(t.right??0)-A*1.2,u=a-(t.top??0)-(t.bottom??0),{data:s,dataZeroed:te}=qe(Ke(e)),Ge(this),ne(N.node(),Ve&&!o?We():null),ge(N.node(),{isEnabled:He&&!o,stops:Ue}),o?ot():(Ye(),Re(),Fe(J),Le(),it(),Xe(),rt(),S&&nt(J))})}function Fe(e){j?(O=ue(d).ticks(v,e.format(b)).tickSizeInner(+[-u]),k=le(f).ticks(_,e.format(b))):(O=ue(d),k=le(f).ticks(_,e.format(b)))}function Ie(){let e=N.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${(t.left??0)+A}, ${t.top})`);N.append(`g`).classed(`loading-state-group`,!0),e.append(`g`).classed(`grid-lines-group`,!0),e.append(`g`).classed(`chart-group`,!0),e.append(`g`).classed(`x-axis-group axis`,!0).append(`g`).classed(`x-axis-label`,!0),e.append(`g`).attr(`transform`,`translate(${-1*A}, 0)`).classed(`y-axis-group axis`,!0).append(`g`).classed(`y-axis-label`,!0),e.append(`g`).classed(`metadata-group`,!0)}function Le(){!ce&&g&&(ce=N.select(`.metadata-group`).append(`linearGradient`).attr(`id`,Y).attr(`x1`,`0%`).attr(`y1`,`0%`).attr(`x2`,`100%`).attr(`y2`,`100%`).attr(`gradientUnits`,`userSpaceOnUse`).selectAll(`stop`).data([{offset:`0%`,color:g[0]},{offset:`50%`,color:g[1]}]).enter().append(`stop`).attr(`offset`,({offset:e})=>e).attr(`stop-color`,({color:e})=>e))}function Re(){let e=ft();j?(d=de().domain(e).rangeRound([0,l]),f=me().domain(s.map(ke)).rangeRound([0,u]).padding(D)):(d=me().domain(s.map(ke)).rangeRound([0,l]).padding(D),f=de().domain(e).rangeRound([u,0])),K?s.map(e=>e).reverse().map(({name:e},t)=>({name:e,color:p[t%p.length]})):s.map(e=>e).map(({name:e},t)=>({name:e,color:p[t%p.length]})),m=ye(s.map(e=>e).reduce((e,{name:t},n)=>({...e,[t]:p[n%p.length]}),{}),h)}let ze=null,Be=null,Ve=!0,He=!0;function Ue(){return N.selectAll(`.bar`).nodes().map(e=>({target:e}))}function We(){return{columns:[`Name`,`Value`],rows:s.map(e=>[e.name,e.value])}}function Ge(e){N||(N=c(e).append(`svg`).classed(`britechart bar-chart`,!0),Ie()),N.attr(`viewBox`,[0,0,n,a]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,n).attr(`height`,a),ae(N.node(),{a11yTitle:ze,a11yDescription:Be,fallbackTitle:`Bar chart`})}function Ke(t){let n=t.reduce((t,n)=>{let r=n;return r.value=+r.value,r.name=String(r[e]),[...t,r]},[]);return{data:n,dataZeroed:n.map(t=>({value:0,name:String(t[e])}))}}function Q(e){return g?`url(#${Y})`:m[e]}function qe(e){let{data:t,dataZeroed:n}=e;return R&&(t.sort(R),n.sort(R)),{data:t,dataZeroed:n}}function Je(e,t){he(e,t,0,1)}function Ye(){N.select(`.loading-state-group svg`).remove()}function $(e){return c(e.parentNode).selectAll(`.bar`).nodes()}function Xe(){N.select(`.x-axis-group.axis`).attr(`transform`,`translate(0, ${u})`).call(O),N.select(`.y-axis-group.axis`).call(k),N.selectAll(`.y-axis-group .tick text`).call(Je,(t.left??0)-A),Ze()}function Ze(){W&&(U&&U.remove(),U=N.select(`.y-axis-label`).append(`text`).classed(`y-axis-label-text`,!0).attr(`x`,-u/2).attr(`y`,G).attr(`text-anchor`,`middle`).attr(`transform`,`rotate(270 0 0)`).text(W)),V&&(B&&B.remove(),B=N.select(`.x-axis-label`).append(`text`).attr(`y`,H).attr(`text-anchor`,`middle`).classed(`x-axis-label-text`,!0).attr(`x`,l/2).text(V))}function Qe(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`y`,u).attr(`x`,({value:e})=>M(x(d),e).start).attr(`height`,C(f).bandwidth()).attr(`width`,({value:e})=>M(x(d),e).size).on(`mouseover`,function(e,t){ct(this,t,$(this),l,u,e)}).on(`mousemove`,function(e,t){lt(this,t,l,u,e)}).on(`mouseout`,function(e,t){ut(this,t,$(this),l,u,e)}).on(`click`,function(e,t){dt(this,t,l,u,e)}).merge(e).attr(`x`,({value:e})=>M(x(d),e).start).attr(`y`,({name:e})=>C(f)(e)).attr(`height`,C(f).bandwidth()).attr(`width`,({value:e})=>M(x(d),e).size).attr(`fill`,({name:e})=>Q(e))}function $e(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,({value:e})=>M(x(d),e).start).attr(`y`,u).attr(`height`,C(f).bandwidth()).attr(`width`,({value:e})=>M(x(d),e).size).on(`mouseover`,function(e,t){ct(this,t,$(this),l,u,e)}).on(`mousemove`,function(e,t){lt(this,t,l,u,e)}).on(`mouseout`,function(e,t){ut(this,t,$(this),l,u,e)}).on(`click`,function(e,t){dt(this,t,l,u,e)}),e.attr(`x`,({value:e})=>M(x(d),e).start).attr(`y`,({name:e})=>C(f)(e)).attr(`height`,C(f).bandwidth()).attr(`fill`,({name:e})=>Q(e)).transition().duration(I).delay(Oe).ease(De).attr(`width`,({value:e})=>M(x(d),e).size)}function et(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,l).attr(`y`,({value:e})=>M(x(f),e).start).attr(`width`,C(d).bandwidth()).attr(`height`,({value:e})=>M(x(f),e).size).on(`mouseover`,function(e,t){ct(this,t,$(this),l,u,e)}).on(`mousemove`,function(e,t){lt(this,t,l,u,e)}).on(`mouseout`,function(e,t){ut(this,t,$(this),l,u,e)}).on(`click`,function(e,t){dt(this,t,l,u,e)}).merge(e).attr(`x`,({name:e})=>C(d)(e)).attr(`width`,C(d).bandwidth()).attr(`fill`,({name:e})=>Q(e)).transition().duration(I).delay(Oe).ease(De).attr(`y`,({value:e})=>M(x(f),e).start).attr(`height`,({value:e})=>M(x(f),e).size)}function tt(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,l).attr(`y`,({value:e})=>M(x(f),e).start).attr(`width`,C(d).bandwidth()).attr(`height`,({value:e})=>M(x(f),e).size).on(`mouseover`,function(e,t){ct(this,t,$(this),l,u,e)}).on(`mousemove`,function(e,t){lt(this,t,l,u,e)}).on(`mouseout`,function(e,t){ut(this,t,$(this),l,u,e)}).on(`click`,function(e,t){dt(this,t,l,u,e)}).merge(e).attr(`x`,({name:e})=>C(d)(e)).attr(`y`,({value:e})=>M(x(f),e).start).attr(`width`,C(d).bandwidth()).attr(`height`,({value:e})=>M(x(f),e).size).attr(`fill`,({name:e})=>Q(e))}function nt(e){let t=j?je:Ne,n=j?Me:Pe;z&&N.selectAll(`.percentage-label-group`).remove(),z=N.select(`.metadata-group`).append(`g`).classed(`percentage-label-group`,!0).selectAll(`text`).data(s.reverse()).enter().append(`text`),z.classed(`percentage-label`,!0).attr(`x`,t).attr(`y`,n).text(({value:t})=>e.format(T)(t)).attr(`font-size`,E+`px`)}function rt(){let e;F&&!ie()?(e=N.select(`.chart-group`).selectAll(`.bar`).data(te),j?Qe(e):tt(e),e=N.select(`.chart-group`).selectAll(`.bar`).data(s),j?$e(e):et(e),e.exit().transition().style(`opacity`,0).remove()):(e=N.select(`.chart-group`).selectAll(`.bar`).data(s),j?Qe(e):tt(e),e.exit().remove())}function it(){N.select(`.grid-lines-group`).selectAll(`grid`).remove(),j?at():st()}function at(){Se(d).range([0,u]).hideEdges(`first`).ticks(v).extendedLine(Ee.bottom)(N.select(`.grid-lines-group`))}function ot(){N.select(`.loading-state-group`).html(ee)}function st(){Ce(f).range([0,l]).hideEdges(`first`).ticks(_).extendedLine(Ee.left)(N.select(`.grid-lines-group`))}function ct(e,t,n,r,i,a){X.call(`customMouseOver`,e,t,oe(a,e),[r,i]),L||=function(){};let o=L;P?o(c(e)):n.forEach(t=>{t!==e&&o(c(t))})}function lt(e,t,n,r,i){X.call(`customMouseMove`,e,t,oe(i,e),[n,r])}function ut(e,t,n,r,i,a){X.call(`customMouseOut`,e,t,oe(a,e),[r,i]),n.forEach(e=>{c(e).attr(`fill`,({name:e})=>Q(e))})}function dt(e,t,n,r,i){X.call(`customClick`,e,t,oe(i,e),[n,r])}function ft(){return be(s.map(Ae),{ratio:y,emptyDomainMax:y})}return Z.a11yTitle=function(e){return arguments.length?(ze=e,this):ze},Z.a11yDescription=function(e){return arguments.length?(Be=e,this):Be},Z.a11yDataTable=function(e){return arguments.length?(Ve=e,this):Ve},Z.a11yKeyboardNavigation=function(e){return arguments.length?(He=e,this):He},Z.animationDuration=function(e){return arguments.length?(I=e,this):I},Z.betweenBarsPadding=function(e){return arguments.length?(D=e,this):D},Z.chartGradient=function(e){return arguments.length?(g=e,this):g},Z.colorMap=function(e){return arguments.length?(h=e,this):h},Z.colorSchema=function(e){return arguments.length?(p=e,this):p},Z.enableLabels=function(e){return arguments.length?(S=e,this):S},Z.exportChart=function(e,t){return _e.call(Z,N,e,t)},Z.hasPercentage=function(e){return arguments.length?(b=e?we:Te,this):b===we},Z.hasSingleBarHighlight=function(e){return arguments.length?(P=e,this):P},Z.height=function(e){return arguments.length?(a=e,this):a},Z.highlightBarFunction=function(e){return arguments.length?(L=e,this):L},Z.isAnimated=function(e){return arguments.length?(F=e,this):F},Z.isHorizontal=function(e){return arguments.length?(j=e,this):j},Z.labelsMargin=function(e){return arguments.length?(w=e,this):w},Z.labelsNumberFormat=function(e){return arguments.length?(T=e,this):T},Z.labelsSize=function(e){return arguments.length?(E=e,this):E},Z.isLoading=function(e){return arguments.length?(o=e,this):o},Z.margin=function(e){return arguments.length?(t={...t,...e},this):t},Z.numberFormat=function(e){return arguments.length?(b=e,this):b},Z.on=function(...e){let t=X.on(...e);return t===X?Z:t},Z.percentageAxisToMaxRatio=function(e){return arguments.length?(y=e,this):y},Z.shouldReverseColorList=function(e){return arguments.length?(K=e,this):K},Z.orderingFunction=function(e){return arguments.length?(R=e,this):R},Z.valueLocale=function(e){return arguments.length?(q=e,this):q},Z.width=function(e){return arguments.length?(n=e,this):n},Z.xAxisLabel=function(e){return arguments.length?(V=e,this):V},Z.xAxisLabelOffset=function(e){return arguments.length?(H=e,this):H},Z.xTicks=function(e){return arguments.length?(v=e,this):v},Z.yAxisLabel=function(e){return arguments.length?(W=e,this):W},Z.yAxisLabelOffset=function(e){return arguments.length?(G=e,this):G},Z.yAxisPaddingBetweenChart=function(e){return arguments.length?(A=e,this):A},Z.yTicks=function(e){return arguments.length?(_=e,this):_},Z}var we,Te;function R(){return(R=e((()=>{ce(),f(),t(),n(),_(),b(),g(),h(),a(),w(),E(),j(),O(),s(),y(),N(),v(),P(),S(),l(),T(),we=`%`,Te=`,f`})))()}function z(e){this.Klass=z,this.config=u.defaults({},e),this.withNegativeValues=function(){let e=u.extend({},this.config,{data:[{name:`Shiny`,value:12},{name:`Blazing`,value:-8},{name:`Dazzling`,value:5},{name:`Radiant`,value:-14},{name:`Sparkling`,value:9},{name:`Gleaming`,value:-3}]});return new this.Klass(e)},this.withLettersFrequency=function(){let e=u.extend({},this.config,{data:[{name:`A`,value:.08167},{name:`B`,value:.01492},{name:`C`,value:.02782},{name:`D`,value:.04253},{name:`E`,value:.12702},{name:`F`,value:.02288},{name:`G`,value:.02015},{name:`H`,value:.06094},{name:`I`,value:.06966},{name:`J`,value:.00153},{name:`K`,value:.00772},{name:`L`,value:.04025},{name:`M`,value:.02406},{name:`N`,value:.06749},{name:`O`,value:.07507},{name:`P`,value:.01929},{name:`Q`,value:95e-5},{name:`R`,value:.05987},{name:`S`,value:.06327},{name:`T`,value:.09056},{name:`U`,value:.02758},{name:`V`,value:.00978},{name:`W`,value:.0236},{name:`X`,value:.0015},{name:`Y`,value:.01974},{name:`Z`,value:74e-5}]});return new this.Klass(e)},this.withColors=function(){let e=u.extend({},this.config,{data:[{name:`Radiating`,value:2},{name:`Opalescent`,value:4},{name:`Shining`,value:3},{name:`Vibrant`,value:6},{name:`Vivid`,value:6},{name:`Brilliant`,value:1}]});return new this.Klass(e)},this.build=function(){return this.config.data}}function B(){return(B=e((()=>{m()})))()}var V,H,U,W,G,K,q,J,Y,Ee,De;function Oe(){return(Oe=e((()=>{h(),R(),I(),k(),o(),B(),O(),V=()=>new z,H=e=>{let t=D(),n=L(),r=c(t),i=r.node()?r.node().getBoundingClientRect().width:!1,a=F();if(i){let o=V().withLettersFrequency().build();te(n,e).width(i).on(`customMouseOver`,a.show).on(`customMouseMove`,a.update).on(`customMouseOut`,a.hide),r.datum(o).call(n),A(t,n,`bar`),c(`.bar-chart .metadata-group`).datum([]).call(a)}return t},H.args=p(L,[`height`,`margin`,`isHorizontal`,`isAnimated`,`colorSchema`,`shouldReverseColorList`,`betweenBarsPadding`,`hasPercentage`,`enableLabels`,`labelsNumberFormat`,`numberFormat`,`hasSingleBarHighlight`,`xTicks`,`yTicks`,`xAxisLabel`,`yAxisLabel`,`percentageAxisToMaxRatio`,`isLoading`]),H.args.isAnimated=!1,H.argTypes=d(H.args),U=()=>{let e=D(),t=L(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=F(),a;if(r){let e=V().withColors().build();t.isAnimated(!0).margin({left:30,right:20,top:20,bottom:30}).colorSchema(ve.colorSchemas.britecharts).width(r).yAxisPaddingBetweenChart(20).height(300).percentageAxisToMaxRatio(1.3).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),a=c(`.bar-chart .metadata-group`),a.datum([]).call(i)}return e},W=()=>{let e=D(),t=L(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=F(),a;if(r){let e=V().withColors().build();t.isHorizontal(!0).isAnimated(!0).margin({left:120,right:20,top:20,bottom:30}).colorSchema(ve.colorSchemas.britecharts).width(r).yAxisPaddingBetweenChart(20).height(300).percentageAxisToMaxRatio(1.3).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),a=c(`.bar-chart .metadata-group`),a.datum([]).call(i)}return e},G=()=>{let e=D(),t=L(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=F();if(r){let e=V().withLettersFrequency().build();t.isAnimated(!0).width(r).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),c(`.bar-chart .metadata-group`).datum([]).call(i)}return e},K=()=>{let e=D(),t=L(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=V().withLettersFrequency().build();t.width(r).hasPercentage(!0).enableLabels(!0).labelsNumberFormat(`.0%`).height(300),n.datum(e).call(t)}return e},q=()=>{let e=D(),t=L(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=V().withNegativeValues().build();t.isAnimated(!0).width(r).height(400),n.datum(e).call(t)}return e},J=()=>{let e=D(),t=L(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=V().withNegativeValues().build();t.isAnimated(!0).isHorizontal(!0).margin({left:100,right:40,top:40,bottom:40}).width(r).height(400),n.datum(e).call(t)}return e},Y=()=>{let e=D(),t=L(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=V().withLettersFrequency().build();return r&&(t.width(r).height(300).isAnimated(!0).isLoading(!0),n.datum(i).call(t)),e},Ee={title:`Charts/Bar`},De=[`Playground`,`VerticalBarChart`,`HorizontalBarChart`,`WithAnimation`,`WithBarLabels`,`WithNegativeValues`,`WithNegativeValuesHorizontal`,`WithLoadingState`],H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`args => {
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
}`,...Y.parameters?.docs?.source}}}})))()}Oe();export{W as HorizontalBarChart,H as Playground,U as VerticalBarChart,G as WithAnimation,K as WithBarLabels,Y as WithLoadingState,q as WithNegativeValues,J as WithNegativeValuesHorizontal,De as __namedExportsOrder,Ee as default};