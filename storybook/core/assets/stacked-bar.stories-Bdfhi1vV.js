import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{$ as t,L as n,Q as r,R as i,T as a,a as o,b as s,dt as c,f as ee,h as te,i as l,j as ne,l as u,m as re,n as d,nt as ie,o as f,p as ae,rt as p,s as m,t as h,u as oe,ut as g}from"./index-all-DhiTiQVV.js";import{n as se,t as _}from"./pointer-Djj9AZUl.js";import{n as ce}from"./quad-qkBhhiXk.js";import{i as v,n as le,t as ue}from"./axis-B0w998iS.js";import{n as de,t as fe,u as pe}from"./linear-C4axaRz1.js";import{n as me,r as he}from"./group-CuaLm5jC.js";import{n as ge}from"./permute-Cz73FWvc.js";import{a as _e,o as ve}from"./constants-CTgVdheE.js";import{n as ye}from"./range-CQkgHe2o.js";import{n as be}from"./sum-B43dOCtN.js";import{n as xe,t as Se}from"./ordinal-Dyk0nZ2X.js";import{a as y,i as Ce,n as b,r as x,t as S}from"./scale-Cjil7EpP.js";import{n as C,t as we}from"./keyboard-BC_p5uVB.js";import{n as w,t as Te}from"./export-BV1q5uvn.js";import{a as Ee,n as T,o as E,r as D,s as De,t as O}from"./helpers-CrbXQEV5.js";import{n as Oe,r as k}from"./domain-D5gbVy7_.js";import{n as ke,t as A}from"./locale-G5axav3H.js";import{i as Ae,n as j,r as M,t as je}from"./expand-Bv7b_Y6P.js";import{n as Me,r as N,t as Ne}from"./grid-yX7qHS3-.js";import{a as Pe,i as Fe,n as P,t as F}from"./tooltip-BWVvJTvX.js";function Ie(e,t){if((c=e.length)>0)for(var n,r=0,i,a,o,s,c,ee=e[t[0]].length;r<ee;++r)for(o=s=0,n=0;n<c;++n)(a=(i=e[t[n]][r])[1]-i[0])>0?(i[0]=o,i[1]=o+=a):a<0?(i[1]=s,i[0]=s+=a):(i[0]=0,i[1]=a)}function I(){let e=`name`,t=`stack`,n=`value`,a={top:40,right:30,bottom:60,left:70},o=960,s=500,l=!1,u,d,f,p,m=.1,h=null,g=i,_=5,v=5,fe=1,me=Ee.colorSchemas.britecharts,_e=null,Se=null,y=!1,x=null,C,w,T=!1,E=!1,D,O,k,A,j,M,N,Fe=!1,P=480,F=null,I,R=-60,z=ve.duration,B,V=null,H=Le,U=!1,W=ce,G={top:0,left:0,bottom:0,right:0},ze=.24,Be=e=>_e[e],K=t=>t[e],Ve=e=>e[n],q=e=>e[t],J=e=>isNaN(e)?0:e,Y=r(`customMouseOver`,`customMouseOut`,`customMouseMove`,`customClick`);function X(e){h&&(g=ke(h)),e.each(function(e){O=o-(a.left??0)-(a.right??0),k=s-(a.top??0)-(a.bottom??0),A=$e(e),Tt(A),Qe(this),re(D.node(),qe&&!l?Ze():null),we(D.node(),{isEnabled:Je&&!l,stops:Ye}),l?nt():(et(),Ue(),We(),rt(),$(g),tt(),ct(),Z())})}function Z(){Et()&&D.on(`mouseenter`,function(e,t){xt(this,t,e)}).on(`mouseleave`,function(e,t){yt(this,t,e)}).on(`mousemove`,function(e,t){gt(this,t,e)}).on(`click`,function(e,t){_t(this,t,e)}),D.selectAll(`.bar`).on(`mouseover`,mt).on(`mouseout`,ht)}function Q(e){e.selectAll(`.tick text`).attr(`transform`,`translate(-20, -8)`)}function $(e){let t=E?L:H;T?(d=ue(u).ticks(v,e.format(t)),p=le(f)):(d=ue(u),p=le(f).ticks(_,e.format(t)))}function He(){let e=D.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${a.left},${a.top})`);D.append(`g`).classed(`loading-state-group`,!0),e.append(`g`).classed(`x-axis-group`,!0).append(`g`).classed(`x axis`,!0),e.append(`g`).classed(`y-axis-group axis`,!0),e.append(`g`).classed(`grid-lines-group`,!0),e.append(`g`).classed(`chart-group`,!0),e.append(`g`).classed(`y-axis-label`,!0),e.append(`g`).classed(`metadata-group`,!0)}function Ue(){w=Ae().keys(M).offset(E?je:Ie)(j.map(e=>{let t={};return M.forEach(n=>{t[n]=e[n]}),Object.assign({},e,t)}))}function We(){let e=pt();T?(u=de().domain(e).rangeRound([0,O-1]),f=Ce().domain(A.map(K)).rangeRound([k,0]).padding(m)):(u=Ce().domain(A.map(K)).rangeRound([0,O]).padding(m),f=de().domain(e).rangeRound([k,0]).nice()),C=xe().range(me).domain(A.map(q)),_e=De(C.domain(A.map(q)).domain().reduce((e,t)=>(e[t]=C(t),e),{}),Se)}let Ge=null,Ke=null,qe=!0,Je=!0;function Ye(){let e=new Map;return D.selectAll(`.bar`).each(function(t){let n=e.get(t.data.key);(!n||t[1]!==t[0]&&!Xe(n))&&e.set(t.data.key,this)}),[...e.values()].map(e=>({target:e}))}function Xe(e){let t=c(e).datum();return t[1]!==t[0]}function Ze(){return ee(A,{heading:`Name`,row:e=>e.name,column:e=>e.stack,value:e=>e.value})}function Qe(e){D||(D=c(e).append(`svg`).classed(`britechart stacked-bar`,!0),He()),D.attr(`viewBox`,[0,0,o,s]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,o).attr(`height`,s),oe(D.node(),{a11yTitle:Ge,a11yDescription:Ke,fallbackTitle:`Stacked bar chart`})}function $e(r){return r.reduce((r,i)=>{let a=i;return a.value=+a[n],a.stack=a[t],a.topicName=a[t],a.name=a[e],[...r,a]},[])}function et(){D.select(`.loading-state-group svg`).remove()}function tt(){T?(D.select(`.x-axis-group .axis.x`).attr(`transform`,`translate( 0, ${k} )`).call(d),D.select(`.y-axis-group.axis`).attr(`transform`,`translate( ${-G.left}, 0)`).call(p)):(D.select(`.x-axis-group .axis.x`).attr(`transform`,`translate( 0, ${k} )`).call(d),D.select(`.y-axis-group.axis`).attr(`transform`,`translate( ${-G.left}, 0)`).call(p).call(Q)),F&&(I&&D.selectAll(`.y-axis-label-text`).remove(),I=D.select(`.y-axis-label`).append(`text`).classed(`y-axis-label-text`,!0).attr(`x`,-k/2).attr(`y`,R).attr(`text-anchor`,`middle`).attr(`transform`,`rotate(270 0 0)`).text(F))}function nt(){D.select(`.loading-state-group`).html(te)}function rt(){D.select(`.grid-lines-group`).selectAll(`grid`).remove(),(V===`horizontal`||V===`full`)&&at(),(V===`vertical`||V===`full`)&&st(),T?st():at()}function it(e){let t=b(u),n=S(f);N=e.data(w).enter().append(`g`).attr(`fill`,({key:e})=>Be(e)).classed(`layer`,!0);let r=N.selectAll(`.bar`).data(e=>lt(e)).enter().append(`rect`).classed(`bar`,!0).attr(`x`,e=>t(e[0])).attr(`y`,e=>n(e.data.key)).attr(`height`,n.bandwidth());U&&!ae()?r.style(`opacity`,ze).transition().delay((e,t)=>B[t]).duration(z).ease(W).tween(`attr.width`,Ct):r.attr(`width`,e=>t(e[1])-t(e[0]))}function at(){Ne(f).range([0,O]).hideEdges(`first`).ticks(_).extendedLine(G.left)(D.select(`.grid-lines-group`))}function ot(e){let t=S(u),n=b(f);N=e.data(w).enter().append(`g`).attr(`fill`,({key:e})=>Be(e)).classed(`layer`,!0);let r=N.selectAll(`.bar`).data(e=>lt(e)).enter().append(`rect`).classed(`bar`,!0).attr(`x`,e=>t(e.data.key)).attr(`y`,e=>n(e[1])).attr(`width`,t.bandwidth);U&&!ae()?r.style(`opacity`,ze).transition().delay((e,t)=>B[t]).duration(z).ease(W).tween(`attr.height`,Dt):r.attr(`height`,e=>n(e[0])-n(e[1]))}function st(){Me(u).range([0,k]).hideEdges(`first`).ticks(v).extendedLine(G.bottom)(D.select(`.grid-lines-group`))}function ct(){N&&D.selectAll(`.layer`).remove();let e=D.select(`.chart-group`).selectAll(`.layer`);B=ye(20,(w[0].length+1)*20,20),T?it(e):ot(e),e.exit().transition().style(`opacity`,0).remove()}function lt(e){return e.map(e=>{for(let t=0;t<e.length;t++)e[t]=J(e[t]);return e})}function ut(e){return se(e,D.node())}function dt(e){let t=e-(a.left??0),n=S(u);return j.find(({key:e})=>{let r=n(e),i=r+n.bandwidth();return t>=r&&t<i})}function ft(e){let t=e-(a.top??0),n=S(f);return j.find(({key:e})=>{let r=n(e),i=r+n.bandwidth();return t>=r&&t<i})}function pt(){let e=w.reduce((e,t)=>[...e,...t.map(([e,t])=>[e,t]).flat()],[]);return Oe(e.filter(e=>!isNaN(e)))}function mt(){c(this).attr(`fill`,()=>String(ie(c(this.parentNode).attr(`fill`)).darker()))}function ht(){c(this).attr(`fill`,()=>c(this.parentNode).attr(`fill`))}function gt(e,t,n){if(!St(n)){y&&!x&&(x=setTimeout(()=>yt(e,t,n),150));return}bt(),y||xt(e,t,n);let[r,i]=ut(n),o=T?ft(i):dt(r),s,c;o&&(s=r-(a.left??0),c=i-(a.top??0),wt(s,c),Y.call(`customMouseMove`,e,o,[s,c],[O,k],_e))}function _t(e,t,n){if(!St(n))return;let[r,i]=ut(n),a=T?ft(i):dt(r);Y.call(`customClick`,e,a,se(n,e),vt(n.target))}function vt(e){let t=e.parentNode,n=t?c(t).datum():null;if(!n||!Pe(n.key))return;let r=c(e).datum(),i=r&&r.data?r.data:j[Array.from(t.querySelectorAll(`.bar`)).indexOf(e)];if(i)return{name:n.key,value:i[n.key],key:i.key}}function yt(e,t,n){bt(),y&&(y=!1,D.select(`.metadata-group`).attr(`transform`,`translate(9999, 0)`),Y.call(`customMouseOut`,e,t,se(n,e)))}function bt(){x&&=(clearTimeout(x),null)}function xt(e,t,n){!y&&St(n)&&(y=!0,Y.call(`customMouseOver`,e,t,se(n,e)))}function St(e){return!!e&&!!e.target&&c(e.target).classed(`bar`)}function Ct(e){let t=b(u),n=c(this),r=pe(0,t(e[1])-t(e[0])),i=ne(0,1);return function(e){n.attr(`width`,r(e)).style(`opacity`,i(e))}}function wt(e,t){D.select(`.metadata-group`).attr(`transform`,`translate(${e},${t})`)}function Tt(e){M=Re(e.map(({stack:e})=>e)),Fe&&(M=M.reverse()),j=he(e,function(e){let n={};return e.forEach(e=>{e&&e[t]&&(n[e[t]]=Ve(e))}),n.values=e,n},e=>String(K(e))).map(([e,t])=>({key:e,value:t})).map(function(e){return Object.assign({},{total:be(ge(e.value,M)),key:e.key},e.value)})}function Et(){return o>P}function Dt(e){let t=b(f),n=t(e[0])-t(e[1]),r=c(this),i=pe(0,J(n)),a=ne(0,1);return function(e){r.attr(`height`,i(e)).style(`opacity`,a(e))}}return X.a11yTitle=function(e){return arguments.length?(Ge=e,this):Ge},X.a11yDescription=function(e){return arguments.length?(Ke=e,this):Ke},X.a11yDataTable=function(e){return arguments.length?(qe=e,this):qe},X.a11yKeyboardNavigation=function(e){return arguments.length?(Je=e,this):Je},X.animationDuration=function(e){return arguments.length?(z=e,this):z},X.betweenBarsPadding=function(e){return arguments.length?(m=e,this):m},X.colorMap=function(e){return arguments.length?(Se=e,this):Se},X.colorSchema=function(e){return arguments.length?(me=e,this):me},X.exportChart=function(e,t){return Te.call(X,D,e,t)},X.grid=function(e){return arguments.length?(V=e,this):V},X.hasPercentage=function(e){return arguments.length?(H=e?L:Le,this):H===L},X.height=function(e){return arguments.length?(s=e,this):s},X.hasReversedStacks=function(e){return arguments.length?(Fe=e,this):Fe},X.isAnimated=function(e){return arguments.length?(U=e,this):U},X.isHorizontal=function(e){return arguments.length?(T=e,this):T},X.isNormalized=function(e){return arguments.length?(E=e,this):E},X.isLoading=function(e){return arguments.length?(l=e,this):l},X.margin=function(e){return arguments.length?(a={...a,...e},this):a},X.numberFormat=function(e){return arguments.length?(H=e,this):H},X.on=function(...e){let t=Y.on(...e);return t===Y?X:t},X.percentageAxisToMaxRatio=function(e){return arguments.length?(fe=e,this):fe},X.tooltipThreshold=function(e){return arguments.length?(P=e,this):P},X.valueLocale=function(e){return arguments.length?(h=e,this):h},X.width=function(e){return arguments.length?(o=e,this):o},X.xTicks=function(e){return arguments.length?(v=e,this):v},X.yAxisLabel=function(e){return arguments.length?(F=e,this):F},X.yAxisLabelOffset=function(e){return arguments.length?(R=e,this):R},X.yTicks=function(e){return arguments.length?(_=e,this):_},X}var L,Le,Re;function R(){return(R=e((()=>{me(),v(),p(),t(),n(),Se(),y(),fe(),M(),j(),g(),_(),a(),w(),k(),Fe(),E(),s(),A(),_e(),N(),x(),u(),C(),L=`%`,Le=`,f`,Re=e=>e.filter((e,t,n)=>n.indexOf(e)==t)})))()}var z,B;function V(){return(V=e((()=>{z=[{stack:`vivid`,value:0,name:`2011-01-05`},{stack:`vivid`,value:10,name:`2011-01-06`},{stack:`vivid`,value:16,name:`2011-01-07`},{stack:`vivid`,value:23,name:`2011-01-08`},{stack:`sparkling`,value:23,name:`2011-01-05`},{stack:`sparkling`,value:16,name:`2011-01-06`},{stack:`sparkling`,value:10,name:`2011-01-07`},{stack:`sparkling`,value:0,name:`2011-01-08`}],B={data:z}})))()}var H,U;function W(){return(W=e((()=>{H=[{stack:`vivid`,value:0,name:`2011-01-05`},{stack:`vivid`,value:4,name:`2011-01-06`},{stack:`vivid`,value:12,name:`2011-01-07`},{stack:`vivid`,value:23,name:`2011-01-08`},{stack:`sparkling`,value:18,name:`2011-01-05`},{stack:`sparkling`,value:16,name:`2011-01-06`},{stack:`sparkling`,value:10,name:`2011-01-07`},{stack:`sparkling`,value:0,name:`2011-01-08`},{stack:`sunny`,value:10,name:`2011-01-05`},{stack:`sunny`,value:20,name:`2011-01-06`},{stack:`sunny`,value:16,name:`2011-01-07`},{stack:`sunny`,value:25,name:`2011-01-08`}],U={data:H}})))()}var G,ze;function Be(){return(Be=e((()=>{G=[{stack:`vivid`,value:5,name:`2011-01-05`},{stack:`sparkling`,value:-4,name:`2011-01-05`},{stack:`sunny`,value:3,name:`2011-01-05`},{stack:`vivid`,value:8,name:`2011-01-06`},{stack:`sparkling`,value:-2,name:`2011-01-06`},{stack:`sunny`,value:-5,name:`2011-01-06`},{stack:`vivid`,value:3,name:`2011-01-07`},{stack:`sparkling`,value:-7,name:`2011-01-07`},{stack:`sunny`,value:4,name:`2011-01-07`},{stack:`vivid`,value:6,name:`2011-01-08`},{stack:`sparkling`,value:-3,name:`2011-01-08`},{stack:`sunny`,value:2,name:`2011-01-08`}],ze={data:G}})))()}function K(e){this.Klass=K,this.config=d.defaults({},e),this.withNegativeValues=function(){let e=d.extend({},this.config,ze);return new this.Klass(e)},this.with3Sources=function(){let e=d.extend({},this.config,U);return new this.Klass(e)},this.with2Sources=function(){let e=d.extend({},this.config,B);return new this.Klass(e)},this.build=function(){return this.config.data}}function Ve(){return(Ve=e((()=>{h(),V(),W(),Be()})))()}var q,J,Y,X,Z,Q,$,He,Ue;function We(){return(We=e((()=>{g(),R(),F(),D(),o(),Ve(),E(),q=()=>new K,J=e=>{let t=T(),n=I(),r=c(t),i=r.node()?r.node().getBoundingClientRect().width:!1,a=P();if(i){let o=q().with3Sources().build();l(n,e).width(i).on(`customMouseOver`,function(){a.show()}).on(`customMouseMove`,a.update).on(`customMouseOut`,function(){a.hide()}),r.datum(o).call(n),O(t,n,`stacked-bar`),a.topicLabel(`values`).nameLabel(`stack`).title(`Tooltip title`),c(`.metadata-group`).datum([]).call(a)}return t},J.args=m(I,[`height`,`margin`,`isAnimated`,`colorSchema`,`isHorizontal`,`isNormalized`,`betweenBarsPadding`,`hasPercentage`,`hasReversedStacks`,`percentageAxisToMaxRatio`,`grid`,`xTicks`,`yTicks`,`yAxisLabel`,`yAxisLabelOffset`,`tooltipThreshold`,`numberFormat`,`isLoading`]),J.args.isAnimated=!1,J.argTypes=f(J.args),Y=()=>{let e=T(),t=I(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=P(),a;if(r){let e=q().with3Sources().build();t.isHorizontal(!0).tooltipThreshold(600).grid(`vertical`).height(400).width(r).isAnimated(!0).margin({left:100,top:40,right:30,bottom:20}).colorSchema(Ee.colorSchemas.red).on(`customMouseOver`,function(){i.show()}).on(`customMouseMove`,i.update).on(`customMouseOut`,function(){i.hide()}),n.datum(e).call(t),i.topicLabel(`values`).nameLabel(`stack`).title(`Tooltip Title`),a=c(`.metadata-group`),a.datum([]).call(i)}return e},X=()=>{let e=T(),t=I(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=P();if(r){let e=q().with3Sources().build();t.isAnimated(!0).width(r).on(`customMouseOver`,function(){i.show()}).on(`customMouseMove`,i.update).on(`customMouseOut`,function(){i.hide()}),n.datum(e).call(t),i.topicLabel(`values`).nameLabel(`stack`).title(`Tooltip title`),c(`.metadata-group`).datum([]).call(i)}return e},Z=()=>{let e=T(),t=I(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=P();if(r){let e=q().with3Sources().build();t.isNormalized(!0).width(r).on(`customMouseOver`,function(){i.show()}).on(`customMouseMove`,i.update).on(`customMouseOut`,function(){i.hide()}),n.datum(e).call(t),i.topicLabel(`values`).nameLabel(`stack`).title(`Tooltip title`),c(`.metadata-group`).datum([]).call(i)}return e},Q=()=>{let e=T(),t=I(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=q().withNegativeValues().build();return r&&(t.isAnimated(!0).grid(`horizontal`).width(r).height(400),n.datum(i).call(t)),e},$=()=>{let e=T(),t=I(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=q().with3Sources().build();return r&&(t.width(r).height(400).isAnimated(!0).isLoading(!0),n.datum(i).call(t)),e},He={title:`Charts/StackedBar`},Ue=[`Playground`,`WithHorizontalDirection`,`WithAnimation`,`WithNormalizedStacks`,`WithNegativeValues`,`WithLoadingState`],J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`args => {
  const container = getCleanContainer();
  const stackedBar = stackedBarChart();
  const stackedBarContainer = select(container);
  const containerWidth = stackedBarContainer.node() ? stackedBarContainer.node().getBoundingClientRect().width : false;
  const chartTooltip = tooltip();
  if (containerWidth) {
    const dataset = aTestDataSet().with3Sources().build();
    applyArgs(stackedBar, args).width(containerWidth).on('customMouseOver', function () {
      chartTooltip.show();
    }).on('customMouseMove', chartTooltip.update).on('customMouseOut', function () {
      chartTooltip.hide();
    });
    stackedBarContainer.datum(dataset).call(stackedBar);
    addExportButtons(container, stackedBar, 'stacked-bar');

    // The stacked bar dispatches its rows as \`values\`, named by \`stack\`
    chartTooltip.topicLabel('values').nameLabel('stack').title('Tooltip title');
    select('.metadata-group').datum([]).call(chartTooltip);
  }
  return container;
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const stackedBar = stackedBarChart();
  const stackedBarContainer = select(container);
  const containerWidth = stackedBarContainer.node() ? stackedBarContainer.node().getBoundingClientRect().width : false;
  const chartTooltip = tooltip();
  let tooltipContainer;
  if (containerWidth) {
    const dataset = aTestDataSet().with3Sources().build();
    stackedBar.isHorizontal(true).tooltipThreshold(600).grid('vertical').height(400).width(containerWidth).isAnimated(true).margin({
      left: 100,
      top: 40,
      right: 30,
      bottom: 20
    }).colorSchema(colors.colorSchemas.red).on('customMouseOver', function () {
      chartTooltip.show();
    }).on('customMouseMove', chartTooltip.update).on('customMouseOut', function () {
      chartTooltip.hide();
    });
    stackedBarContainer.datum(dataset).call(stackedBar);

    // Tooltip Setup and start
    // The stacked bar dispatches its rows as \`values\`, named by \`stack\`
    chartTooltip.topicLabel('values').nameLabel('stack').title('Tooltip Title');

    // Note that if the viewport width is less than the tooltipThreshold value,
    // this container won't exist, and the tooltip won't show up
    tooltipContainer = select('.metadata-group');
    tooltipContainer.datum([]).call(chartTooltip);
  }
  return container;
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const stackedBar = stackedBarChart();
  const stackedBarContainer = select(container);
  const containerWidth = stackedBarContainer.node() ? stackedBarContainer.node().getBoundingClientRect().width : false;
  const chartTooltip = tooltip();
  if (containerWidth) {
    const dataset = aTestDataSet().with3Sources().build();
    stackedBar.isAnimated(true).width(containerWidth).on('customMouseOver', function () {
      chartTooltip.show();
    }).on('customMouseMove', chartTooltip.update).on('customMouseOut', function () {
      chartTooltip.hide();
    });
    stackedBarContainer.datum(dataset).call(stackedBar);

    // The stacked bar dispatches its rows as \`values\`, named by \`stack\`
    chartTooltip.topicLabel('values').nameLabel('stack').title('Tooltip title');
    select('.metadata-group').datum([]).call(chartTooltip);
  }
  return container;
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const stackedBar = stackedBarChart();
  const stackedBarContainer = select(container);
  const containerWidth = stackedBarContainer.node() ? stackedBarContainer.node().getBoundingClientRect().width : false;
  const chartTooltip = tooltip();
  if (containerWidth) {
    const dataset = aTestDataSet().with3Sources().build();
    stackedBar.isNormalized(true).width(containerWidth).on('customMouseOver', function () {
      chartTooltip.show();
    }).on('customMouseMove', chartTooltip.update).on('customMouseOut', function () {
      chartTooltip.hide();
    });
    stackedBarContainer.datum(dataset).call(stackedBar);

    // The stacked bar dispatches its rows as \`values\`, named by \`stack\`
    chartTooltip.topicLabel('values').nameLabel('stack').title('Tooltip title');
    select('.metadata-group').datum([]).call(chartTooltip);
  }
  return container;
}`,...Z.parameters?.docs?.source},description:{story:`A 100% stacked bar: \`isNormalized(true)\` scales every stack to the full
height, so each segment shows its share of its stack and the axis runs from
0% to 100%. The tooltip still shows the values.`,...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const stackedBar = stackedBarChart();
  const stackedBarContainer = select(container);
  const containerWidth = stackedBarContainer.node() ? stackedBarContainer.node().getBoundingClientRect().width : false;
  const dataset = aTestDataSet().withNegativeValues().build();
  if (containerWidth) {
    stackedBar.isAnimated(true).grid('horizontal').width(containerWidth).height(400);
    stackedBarContainer.datum(dataset).call(stackedBar);
  }
  return container;
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const stackedBar = stackedBarChart();
  const stackedBarContainer = select(container);
  const containerWidth = stackedBarContainer.node() ? stackedBarContainer.node().getBoundingClientRect().width : false;
  const dataset = aTestDataSet().with3Sources().build();
  if (containerWidth) {
    stackedBar.width(containerWidth).height(400).isAnimated(true).isLoading(true);
    stackedBarContainer.datum(dataset).call(stackedBar);
  }
  return container;
}`,...$.parameters?.docs?.source}}}})))()}We();export{J as Playground,X as WithAnimation,Y as WithHorizontalDirection,$ as WithLoadingState,Q as WithNegativeValues,Z as WithNormalizedStacks,Ue as __namedExportsOrder,He as default};