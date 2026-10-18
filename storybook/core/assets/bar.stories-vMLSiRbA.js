import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{J as t,M as n,N as r,Q as i,Z as a,a as o,at as s,b as ee,c,h as l,i as u,l as te,n as d,o as f,ot as p,q as ne,s as m,t as h,u as re}from"./index-all-CU26HPzh.js";import{n as ie,t as ae}from"./pointer-Djj9AZUl.js";import{n as oe}from"./quad-qkBhhiXk.js";import{i as g,n as se,t as ce}from"./axis-B0w998iS.js";import{n as le,t as _}from"./linear-xOCD_kcp.js";import{N as ue,a as v,j as y,o as de}from"./constants-CyX_aTT9.js";import{a as b,i as fe,n as x,r as S,t as C}from"./scale-ByDzrwbB.js";import{a as pe,r as w}from"./text-AwD0sbxM.js";import{n as T,t as me}from"./export-D1ikYz6k.js";import{a as E,i as he,n as ge,t as D}from"./helpers-DK6iEQil.js";import{n as _e,r as O,t as k}from"./domain-wh2Z-6JD.js";import{n as ve,t as A}from"./locale-BnDHIjc1.js";import{n as ye,r as j,t as be}from"./grid-yX7qHS3-.js";import{n as M,t as N}from"./mini-tooltip-9HPjDOFN.js";function P(){let e=`name`,t={top:20,right:20,bottom:30,left:40},n=960,i=500,o=!1,s,ee,c,l,u,d,f=he.singleColors.aloeGreen,m=null,h=null,ae,g=5,_=5,v=1,y=F,b=!1,S=7,w=F,T=12,E=.1,ge,D,O=10,A=!1,j,M=!0,N=!1,P=de.duration,I=e=>e.attr(`fill`,({name:e})=>String(a(h?h[1]:m[e]).darker())),L,R,z=null,B=null,V=30,H=null,U=null,W=-30,G=!0,K=null,q=r,J=ue(`bar-gradient`),Y={top:0,left:0,bottom:0,right:0},Se=oe,Ce=(e,t)=>70*t,X=ne(`customMouseOver`,`customMouseOut`,`customMouseMove`,`customClick`),we=({name:e})=>e,Te=({value:e})=>e,Ee=({value:e})=>x(u)(e)+S,De=({name:e})=>C(d)(e)+C(d).bandwidth()/2+3/8*T,Oe=({name:e})=>C(u)(e),ke=({value:e})=>x(d)(e)-S;function Z(e){K&&(q=ve(K)),e.each(function(e){c=n-(t.left??0)-(t.right??0)-O*1.2,l=i-(t.top??0)-(t.bottom??0),{data:s,dataZeroed:ee}=Re(Le(e)),Ie(this),o?Ze():(Be(),Ne(),Ae(q),Me(),Ye(),Ve(),Je(),b&&qe(q))})}function Ae(e){A?(ge=ce(u).ticks(_,e.format(y)).tickSizeInner(+[-l]),D=se(d).ticks(g,e.format(y))):(ge=ce(u),D=se(d).ticks(g,e.format(y)))}function je(){let e=j.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${(t.left??0)+O}, ${t.top})`);j.append(`g`).classed(`loading-state-group`,!0),e.append(`g`).classed(`grid-lines-group`,!0),e.append(`g`).classed(`chart-group`,!0),e.append(`g`).classed(`x-axis-group axis`,!0).append(`g`).classed(`x-axis-label`,!0),e.append(`g`).attr(`transform`,`translate(${-1*O}, 0)`).classed(`y-axis-group axis`,!0).append(`g`).classed(`y-axis-label`,!0),e.append(`g`).classed(`metadata-group`,!0)}function Me(){!ae&&h&&(ae=j.select(`.metadata-group`).append(`linearGradient`).attr(`id`,J).attr(`x1`,`0%`).attr(`y1`,`0%`).attr(`x2`,`100%`).attr(`y2`,`100%`).attr(`gradientUnits`,`userSpaceOnUse`).selectAll(`stop`).data([{offset:`0%`,color:h[0]},{offset:`50%`,color:h[1]}]).enter().append(`stop`).attr(`offset`,({offset:e})=>e).attr(`stop-color`,({color:e})=>e))}function Ne(){let e=rt();A?(u=le().domain(e).rangeRound([0,c]),d=fe().domain(s.map(we)).rangeRound([0,l]).padding(E)):(u=fe().domain(s.map(we)).rangeRound([0,c]).padding(E),d=le().domain(e).rangeRound([l,0])),G?s.map(e=>e).reverse().map(({name:e},t)=>({name:e,color:f[t%f.length]})):s.map(e=>e).map(({name:e},t)=>({name:e,color:f[t%f.length]})),m||=s.map(e=>e).reduce((e,{name:t},n)=>({...e,[t]:f[n%f.length]}),{})}let Pe=null,Fe=null;function Ie(e){j||(j=p(e).append(`svg`).classed(`britechart bar-chart`,!0),je()),j.attr(`viewBox`,[0,0,n,i]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,n).attr(`height`,i),te(j.node(),{a11yTitle:Pe,a11yDescription:Fe,fallbackTitle:`Bar chart`})}function Le(t){let n=t.reduce((t,n)=>{let r=n;return r.value=+r.value,r.name=String(r[e]),[...t,r]},[]);return{data:n,dataZeroed:n.map(t=>({value:0,name:String(t[e])}))}}function Q(e){return h?`url(#${J})`:m[e]}function Re(e){let{data:t,dataZeroed:n}=e;return L&&(t.sort(L),n.sort(L)),{data:t,dataZeroed:n}}function ze(e,t){pe(e,t,0,1)}function Be(){j.select(`.loading-state-group svg`).remove()}function $(e){return p(e.parentNode).selectAll(`.bar`).nodes()}function Ve(){j.select(`.x-axis-group.axis`).attr(`transform`,`translate(0, ${l})`).call(ge),j.select(`.y-axis-group.axis`).call(D),j.selectAll(`.y-axis-group .tick text`).call(ze,(t.left??0)-O),He()}function He(){U&&(H&&H.remove(),H=j.select(`.y-axis-label`).append(`text`).classed(`y-axis-label-text`,!0).attr(`x`,-l/2).attr(`y`,W).attr(`text-anchor`,`middle`).attr(`transform`,`rotate(270 0 0)`).text(U)),B&&(z&&z.remove(),z=j.select(`.x-axis-label`).append(`text`).attr(`y`,V).attr(`text-anchor`,`middle`).classed(`x-axis-label-text`,!0).attr(`x`,c/2).text(B))}function Ue(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`y`,l).attr(`x`,({value:e})=>k(x(u),e).start).attr(`height`,C(d).bandwidth()).attr(`width`,({value:e})=>k(x(u),e).size).on(`mouseover`,function(e,t){$e(this,t,$(this),c,l,e)}).on(`mousemove`,function(e,t){et(this,t,c,l,e)}).on(`mouseout`,function(e,t){tt(this,t,$(this),c,l,e)}).on(`click`,function(e,t){nt(this,t,c,l,e)}).merge(e).attr(`x`,({value:e})=>k(x(u),e).start).attr(`y`,({name:e})=>C(d)(e)).attr(`height`,C(d).bandwidth()).attr(`width`,({value:e})=>k(x(u),e).size).attr(`fill`,({name:e})=>Q(e))}function We(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,({value:e})=>k(x(u),e).start).attr(`y`,l).attr(`height`,C(d).bandwidth()).attr(`width`,({value:e})=>k(x(u),e).size).on(`mouseover`,function(e,t){$e(this,t,$(this),c,l,e)}).on(`mousemove`,function(e,t){et(this,t,c,l,e)}).on(`mouseout`,function(e,t){tt(this,t,$(this),c,l,e)}).on(`click`,function(e,t){nt(this,t,c,l,e)}),e.attr(`x`,({value:e})=>k(x(u),e).start).attr(`y`,({name:e})=>C(d)(e)).attr(`height`,C(d).bandwidth()).attr(`fill`,({name:e})=>Q(e)).transition().duration(P).delay(Ce).ease(Se).attr(`width`,({value:e})=>k(x(u),e).size)}function Ge(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,c).attr(`y`,({value:e})=>k(x(d),e).start).attr(`width`,C(u).bandwidth()).attr(`height`,({value:e})=>k(x(d),e).size).on(`mouseover`,function(e,t){$e(this,t,$(this),c,l,e)}).on(`mousemove`,function(e,t){et(this,t,c,l,e)}).on(`mouseout`,function(e,t){tt(this,t,$(this),c,l,e)}).on(`click`,function(e,t){nt(this,t,c,l,e)}).merge(e).attr(`x`,({name:e})=>C(u)(e)).attr(`width`,C(u).bandwidth()).attr(`fill`,({name:e})=>Q(e)).transition().duration(P).delay(Ce).ease(Se).attr(`y`,({value:e})=>k(x(d),e).start).attr(`height`,({value:e})=>k(x(d),e).size)}function Ke(e){e.enter().append(`rect`).classed(`bar`,!0).attr(`x`,c).attr(`y`,({value:e})=>k(x(d),e).start).attr(`width`,C(u).bandwidth()).attr(`height`,({value:e})=>k(x(d),e).size).on(`mouseover`,function(e,t){$e(this,t,$(this),c,l,e)}).on(`mousemove`,function(e,t){et(this,t,c,l,e)}).on(`mouseout`,function(e,t){tt(this,t,$(this),c,l,e)}).on(`click`,function(e,t){nt(this,t,c,l,e)}).merge(e).attr(`x`,({name:e})=>C(u)(e)).attr(`y`,({value:e})=>k(x(d),e).start).attr(`width`,C(u).bandwidth()).attr(`height`,({value:e})=>k(x(d),e).size).attr(`fill`,({name:e})=>Q(e))}function qe(e){let t=A?Ee:Oe,n=A?De:ke;R&&j.selectAll(`.percentage-label-group`).remove(),R=j.select(`.metadata-group`).append(`g`).classed(`percentage-label-group`,!0).selectAll(`text`).data(s.reverse()).enter().append(`text`),R.classed(`percentage-label`,!0).attr(`x`,t).attr(`y`,n).text(({value:t})=>e.format(w)(t)).attr(`font-size`,T+`px`)}function Je(){let e;N?(e=j.select(`.chart-group`).selectAll(`.bar`).data(ee),A?Ue(e):Ke(e),e=j.select(`.chart-group`).selectAll(`.bar`).data(s),A?We(e):Ge(e),e.exit().transition().style(`opacity`,0).remove()):(e=j.select(`.chart-group`).selectAll(`.bar`).data(s),A?Ue(e):Ke(e),e.exit().remove())}function Ye(){j.select(`.grid-lines-group`).selectAll(`grid`).remove(),A?Xe():Qe()}function Xe(){ye(u).range([0,l]).hideEdges(`first`).ticks(_).extendedLine(Y.bottom)(j.select(`.grid-lines-group`))}function Ze(){j.select(`.loading-state-group`).html(re)}function Qe(){be(d).range([0,c]).hideEdges(`first`).ticks(g).extendedLine(Y.left)(j.select(`.grid-lines-group`))}function $e(e,t,n,r,i,a){X.call(`customMouseOver`,e,t,ie(a,e),[r,i]),I||=function(){};let o=I;M?o(p(e)):n.forEach(t=>{t!==e&&o(p(t))})}function et(e,t,n,r,i){X.call(`customMouseMove`,e,t,ie(i,e),[n,r])}function tt(e,t,n,r,i,a){X.call(`customMouseOut`,e,t,ie(a,e),[r,i]),n.forEach(e=>{p(e).attr(`fill`,({name:e})=>Q(e))})}function nt(e,t,n,r,i){X.call(`customClick`,e,t,ie(i,e),[n,r])}function rt(){return _e(s.map(Te),{ratio:v,emptyDomainMax:v})}return Z.a11yTitle=function(e){return arguments.length?(Pe=e,this):Pe},Z.a11yDescription=function(e){return arguments.length?(Fe=e,this):Fe},Z.animationDuration=function(e){return arguments.length?(P=e,this):P},Z.betweenBarsPadding=function(e){return arguments.length?(E=e,this):E},Z.chartGradient=function(e){return arguments.length?(h=e,this):h},Z.colorMap=function(e){return arguments.length?(m=e,this):m},Z.colorSchema=function(e){return arguments.length?(f=e,this):f},Z.enableLabels=function(e){return arguments.length?(b=e,this):b},Z.exportChart=function(e,t){return me.call(Z,j,e,t)},Z.hasPercentage=function(e){return arguments.length?(y=e?xe:F,this):y===xe},Z.hasSingleBarHighlight=function(e){return arguments.length?(M=e,this):M},Z.height=function(e){return arguments.length?(i=e,this):i},Z.highlightBarFunction=function(e){return arguments.length?(I=e,this):I},Z.isAnimated=function(e){return arguments.length?(N=e,this):N},Z.isHorizontal=function(e){return arguments.length?(A=e,this):A},Z.labelsMargin=function(e){return arguments.length?(S=e,this):S},Z.labelsNumberFormat=function(e){return arguments.length?(w=e,this):w},Z.labelsSize=function(e){return arguments.length?(T=e,this):T},Z.isLoading=function(e){return arguments.length?(o=e,this):o},Z.margin=function(e){return arguments.length?(t={...t,...e},this):t},Z.numberFormat=function(e){return arguments.length?(y=e,this):y},Z.on=function(...e){let t=X.on(...e);return t===X?Z:t},Z.percentageAxisToMaxRatio=function(e){return arguments.length?(v=e,this):v},Z.shouldReverseColorList=function(e){return arguments.length?(G=e,this):G},Z.orderingFunction=function(e){return arguments.length?(L=e,this):L},Z.valueLocale=function(e){return arguments.length?(K=e,this):K},Z.width=function(e){return arguments.length?(n=e,this):n},Z.xAxisLabel=function(e){return arguments.length?(B=e,this):B},Z.xAxisLabelOffset=function(e){return arguments.length?(V=e,this):V},Z.xTicks=function(e){return arguments.length?(_=e,this):_},Z.yAxisLabel=function(e){return arguments.length?(U=e,this):U},Z.yAxisLabelOffset=function(e){return arguments.length?(W=e,this):W},Z.yAxisPaddingBetweenChart=function(e){return arguments.length?(O=e,this):O},Z.yTicks=function(e){return arguments.length?(g=e,this):g},Z}var xe,F;function I(){return(I=e((()=>{g(),i(),t(),n(),_(),b(),ae(),s(),ee(),w(),T(),O(),E(),l(),y(),A(),v(),j(),S(),c(),xe=`%`,F=`,f`})))()}function L(e){this.Klass=L,this.config=d.defaults({},e),this.withNegativeValues=function(){let e=d.extend({},this.config,{data:[{name:`Shiny`,value:12},{name:`Blazing`,value:-8},{name:`Dazzling`,value:5},{name:`Radiant`,value:-14},{name:`Sparkling`,value:9},{name:`Gleaming`,value:-3}]});return new this.Klass(e)},this.withLettersFrequency=function(){let e=d.extend({},this.config,{data:[{name:`A`,value:.08167},{name:`B`,value:.01492},{name:`C`,value:.02782},{name:`D`,value:.04253},{name:`E`,value:.12702},{name:`F`,value:.02288},{name:`G`,value:.02015},{name:`H`,value:.06094},{name:`I`,value:.06966},{name:`J`,value:.00153},{name:`K`,value:.00772},{name:`L`,value:.04025},{name:`M`,value:.02406},{name:`N`,value:.06749},{name:`O`,value:.07507},{name:`P`,value:.01929},{name:`Q`,value:95e-5},{name:`R`,value:.05987},{name:`S`,value:.06327},{name:`T`,value:.09056},{name:`U`,value:.02758},{name:`V`,value:.00978},{name:`W`,value:.0236},{name:`X`,value:.0015},{name:`Y`,value:.01974},{name:`Z`,value:74e-5}]});return new this.Klass(e)},this.withColors=function(){let e=d.extend({},this.config,{data:[{name:`Radiating`,value:2},{name:`Opalescent`,value:4},{name:`Shining`,value:3},{name:`Vibrant`,value:6},{name:`Vivid`,value:6},{name:`Brilliant`,value:1}]});return new this.Klass(e)},this.build=function(){return this.config.data}}function R(){return(R=e((()=>{h()})))()}var z,B,V,H,U,W,G,K,q,J,Y;function Se(){return(Se=e((()=>{s(),I(),N(),ge(),o(),R(),E(),z=()=>new L,B=e=>{let t=D(),n=P(),r=p(t),i=r.node()?r.node().getBoundingClientRect().width:!1,a=M();if(i){let t=z().withLettersFrequency().build();u(n,e).width(i).on(`customMouseOver`,a.show).on(`customMouseMove`,a.update).on(`customMouseOut`,a.hide),r.datum(t).call(n),p(`.bar-chart .metadata-group`).datum([]).call(a)}return t},B.args=m(P,[`height`,`margin`,`isHorizontal`,`isAnimated`,`colorSchema`,`shouldReverseColorList`,`betweenBarsPadding`,`hasPercentage`,`enableLabels`,`labelsNumberFormat`,`numberFormat`,`hasSingleBarHighlight`,`xTicks`,`yTicks`,`xAxisLabel`,`yAxisLabel`,`percentageAxisToMaxRatio`,`isLoading`]),B.args.isAnimated=!1,B.argTypes=f(B.args),V=()=>{let e=D(),t=P(),n=p(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=M(),a;if(r){let e=z().withColors().build();t.isAnimated(!0).margin({left:30,right:20,top:20,bottom:30}).colorSchema(he.colorSchemas.britecharts).width(r).yAxisPaddingBetweenChart(20).height(300).percentageAxisToMaxRatio(1.3).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),a=p(`.bar-chart .metadata-group`),a.datum([]).call(i)}return e},H=()=>{let e=D(),t=P(),n=p(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=M(),a;if(r){let e=z().withColors().build();t.isHorizontal(!0).isAnimated(!0).margin({left:120,right:20,top:20,bottom:30}).colorSchema(he.colorSchemas.britecharts).width(r).yAxisPaddingBetweenChart(20).height(300).percentageAxisToMaxRatio(1.3).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),a=p(`.bar-chart .metadata-group`),a.datum([]).call(i)}return e},U=()=>{let e=D(),t=P(),n=p(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=M();if(r){let e=z().withLettersFrequency().build();t.isAnimated(!0).width(r).on(`customMouseOver`,i.show).on(`customMouseMove`,i.update).on(`customMouseOut`,i.hide),n.datum(e).call(t),p(`.bar-chart .metadata-group`).datum([]).call(i)}return e},W=()=>{let e=D(),t=P(),n=p(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=z().withLettersFrequency().build();t.width(r).hasPercentage(!0).enableLabels(!0).labelsNumberFormat(`.0%`).height(300),n.datum(e).call(t)}return e},G=()=>{let e=D(),t=P(),n=p(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=z().withNegativeValues().build();t.isAnimated(!0).width(r).height(400),n.datum(e).call(t)}return e},K=()=>{let e=D(),t=P(),n=p(e),r=n.node()?n.node().getBoundingClientRect().width:!1;if(r){let e=z().withNegativeValues().build();t.isAnimated(!0).isHorizontal(!0).margin({left:100,right:40,top:40,bottom:40}).width(r).height(400),n.datum(e).call(t)}return e},q=()=>{let e=D(),t=P(),n=p(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=z().withLettersFrequency().build();return r&&(t.width(r).height(300).isAnimated(!0).isLoading(!0),n.datum(i).call(t)),e},J={title:`Charts/Bar`},Y=[`Playground`,`VerticalBarChart`,`HorizontalBarChart`,`WithAnimation`,`WithBarLabels`,`WithNegativeValues`,`WithNegativeValuesHorizontal`,`WithLoadingState`],B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`args => {
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
}`,...q.parameters?.docs?.source}}}})))()}Se();export{H as HorizontalBarChart,B as Playground,V as VerticalBarChart,U as WithAnimation,W as WithBarLabels,q as WithLoadingState,G as WithNegativeValues,K as WithNegativeValuesHorizontal,Y as __namedExportsOrder,J as default};