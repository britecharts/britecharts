import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{$ as t,L as n,Q as r,R as i,T as a,a as o,b as s,dt as c,f as ee,h as te,i as l,j as ne,l as u,m as re,n as d,nt as ie,o as f,p as ae,rt as p,s as m,t as h,u as oe,ut as g}from"./index-all-DhiTiQVV.js";import{n as se,t as _}from"./pointer-Djj9AZUl.js";import{n as ce}from"./quad-qkBhhiXk.js";import{i as v,n as le,t as ue}from"./axis-B0w998iS.js";import{n as de,t as fe}from"./linear-C4axaRz1.js";import{n as pe,r as me}from"./group-CuaLm5jC.js";import{n as he}from"./permute-Cz73FWvc.js";import{a as ge,o as _e}from"./constants-CTgVdheE.js";import{n as ve}from"./range-CQkgHe2o.js";import{n as ye}from"./sum-B43dOCtN.js";import{n as be,t as y}from"./ordinal-Dyk0nZ2X.js";import{a as b,i as xe,n as x,r as S,t as C}from"./scale-Cjil7EpP.js";import{n as w,t as Se}from"./keyboard-BC_p5uVB.js";import{n as T,t as Ce}from"./export-BV1q5uvn.js";import{a as we,n as E,o as D,r as O,s as Te,t as k}from"./helpers-CrbXQEV5.js";import{n as Ee,r as A}from"./domain-D5gbVy7_.js";import{n as De,t as j}from"./locale-G5axav3H.js";import{i as Oe,n as M,r as N,t as ke}from"./expand-Bv7b_Y6P.js";import{n as Ae,r as P,t as je}from"./grid-yX7qHS3-.js";import{a as Me,i as F,n as I,t as L}from"./tooltip-BWVvJTvX.js";function Ne(e,t){if((c=e.length)>0)for(var n,r=0,i,a,o,s,c,ee=e[t[0]].length;r<ee;++r)for(o=s=0,n=0;n<c;++n)(a=(i=e[t[n]][r])[1]-i[0])>0?(i[0]=o,i[1]=o+=a):a<0?(i[1]=s,i[0]=s+=a):(i[0]=0,i[1]=a)}function R(){let e=`name`,t=`stack`,n=`value`,a={top:40,right:30,bottom:60,left:70},o=960,s=500,l=!1,u,d,f,p,m=.1,h=null,g=i,_=5,v=5,fe=1,pe=we.colorSchemas.britecharts,ge=null,y=null,b=!1,S=null,w,T,E=!1,D=!1,O,k,A,j,M,N,P,F=!1,I=480,L=null,R,z=-60,B=_e.duration,V,H=null,U=Fe,W=!1,Le=ce,G={top:0,left:0,bottom:0,right:0},Re=.24,ze=e=>ge[e],K=t=>t[e],Be=e=>e[n],q=e=>e[t],J=e=>isNaN(e)?0:e,Y=r(`customMouseOver`,`customMouseOut`,`customMouseMove`,`customClick`);function X(e){h&&(g=De(h)),e.each(function(e){k=o-(a.left??0)-(a.right??0),A=s-(a.top??0)-(a.bottom??0),j=Qe(e),wt(j),Ze(this),re(O.node(),Ke&&!l?Xe():null),Se(O.node(),{isEnabled:qe&&!l,stops:Je}),l?tt():($e(),He(),Ue(),nt(),$(g),et(),st(),Z())})}function Z(){Tt()&&O.on(`mouseenter`,function(e,t){bt(this,t,e)}).on(`mouseleave`,function(e,t){vt(this,t,e)}).on(`mousemove`,function(e,t){ht(this,t,e)}).on(`click`,function(e,t){gt(this,t,e)}),O.selectAll(`.bar`).on(`mouseover`,pt).on(`mouseout`,mt)}function Q(e){e.selectAll(`.tick text`).attr(`transform`,`translate(-20, -8)`)}function $(e){let t=D?Pe:U;E?(d=ue(u).ticks(v,e.format(t)),p=le(f)):(d=ue(u),p=le(f).ticks(_,e.format(t)))}function Ve(){let e=O.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${a.left},${a.top})`);O.append(`g`).classed(`loading-state-group`,!0),e.append(`g`).classed(`x-axis-group`,!0).append(`g`).classed(`x axis`,!0),e.append(`g`).classed(`y-axis-group axis`,!0),e.append(`g`).classed(`grid-lines-group`,!0),e.append(`g`).classed(`chart-group`,!0),e.append(`g`).classed(`y-axis-label`,!0),e.append(`g`).classed(`metadata-group`,!0)}function He(){T=Oe().keys(N).offset(D?ke:Ne)(M.map(e=>{let t={};return N.forEach(n=>{t[n]=e[n]}),Object.assign({},e,t)}))}function Ue(){let e=ft();E?(u=de().domain(e).rangeRound([0,k-1]),f=xe().domain(j.map(K)).rangeRound([A,0]).padding(m)):(u=xe().domain(j.map(K)).rangeRound([0,k]).padding(m),f=de().domain(e).rangeRound([A,0]).nice()),w=be().range(pe).domain(j.map(q)),ge=Te(w.domain(j.map(q)).domain().reduce((e,t)=>(e[t]=w(t),e),{}),y)}let We=null,Ge=null,Ke=!0,qe=!0;function Je(){let e=new Map;return O.selectAll(`.bar`).each(function(t){let n=e.get(t.data.key);(!n||t[1]!==t[0]&&!Ye(n))&&e.set(t.data.key,this)}),[...e.values()].map(e=>({target:e}))}function Ye(e){let t=c(e).datum();return t[1]!==t[0]}function Xe(){return ee(j,{heading:`Name`,row:e=>e.name,column:e=>e.stack,value:e=>e.value})}function Ze(e){O||(O=c(e).append(`svg`).classed(`britechart stacked-bar`,!0),Ve()),O.attr(`viewBox`,[0,0,o,s]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,o).attr(`height`,s),oe(O.node(),{a11yTitle:We,a11yDescription:Ge,fallbackTitle:`Stacked bar chart`})}function Qe(r){return r.reduce((r,i)=>{let a=i;return a.value=+a[n],a.stack=a[t],a.topicName=a[t],a.name=a[e],[...r,a]},[])}function $e(){O.select(`.loading-state-group svg`).remove()}function et(){E?(O.select(`.x-axis-group .axis.x`).attr(`transform`,`translate( 0, ${A} )`).call(d),O.select(`.y-axis-group.axis`).attr(`transform`,`translate( ${-G.left}, 0)`).call(p)):(O.select(`.x-axis-group .axis.x`).attr(`transform`,`translate( 0, ${A} )`).call(d),O.select(`.y-axis-group.axis`).attr(`transform`,`translate( ${-G.left}, 0)`).call(p).call(Q)),L&&(R&&O.selectAll(`.y-axis-label-text`).remove(),R=O.select(`.y-axis-label`).append(`text`).classed(`y-axis-label-text`,!0).attr(`x`,-A/2).attr(`y`,z).attr(`text-anchor`,`middle`).attr(`transform`,`rotate(270 0 0)`).text(L))}function tt(){O.select(`.loading-state-group`).html(te)}function nt(){O.select(`.grid-lines-group`).selectAll(`grid`).remove(),(H===`horizontal`||H===`full`)&&it(),(H===`vertical`||H===`full`)&&ot(),E?ot():it()}function rt(e){let t=x(u),n=C(f);P=e.data(T).enter().append(`g`).attr(`fill`,({key:e})=>ze(e)).classed(`layer`,!0);let r=P.selectAll(`.bar`).data(e=>ct(e)).enter().append(`rect`).classed(`bar`,!0).attr(`x`,e=>t(e[0])).attr(`y`,e=>n(e.data.key)).attr(`height`,n.bandwidth());W&&!ae()?r.style(`opacity`,Re).transition().delay((e,t)=>V[t]).duration(B).ease(Le).tween(`attr.width`,St):r.attr(`width`,e=>t(e[1])-t(e[0]))}function it(){je(f).range([0,k]).hideEdges(`first`).ticks(_).extendedLine(G.left)(O.select(`.grid-lines-group`))}function at(e){let t=C(u),n=x(f);P=e.data(T).enter().append(`g`).attr(`fill`,({key:e})=>ze(e)).classed(`layer`,!0);let r=P.selectAll(`.bar`).data(e=>ct(e)).enter().append(`rect`).classed(`bar`,!0).attr(`x`,e=>t(e.data.key)).attr(`y`,e=>n(e[1])).attr(`width`,t.bandwidth);W&&!ae()?r.style(`opacity`,Re).transition().delay((e,t)=>V[t]).duration(B).ease(Le).tween(`attr.height`,Et):r.attr(`height`,e=>n(e[0])-n(e[1]))}function ot(){Ae(u).range([0,A]).hideEdges(`first`).ticks(v).extendedLine(G.bottom)(O.select(`.grid-lines-group`))}function st(){P&&O.selectAll(`.layer`).remove();let e=O.select(`.chart-group`).selectAll(`.layer`);V=ve(20,(T[0].length+1)*20,20),E?rt(e):at(e),e.exit().transition().style(`opacity`,0).remove()}function ct(e){return e.map(e=>{for(let t=0;t<e.length;t++)e[t]=J(e[t]);return e})}function lt(e){return se(e,O.node())}function ut(e){let t=e-(a.left??0),n=C(u);return M.find(({key:e})=>{let r=n(e),i=r+n.bandwidth();return t>=r&&t<i})}function dt(e){let t=e-(a.top??0),n=C(f);return M.find(({key:e})=>{let r=n(e),i=r+n.bandwidth();return t>=r&&t<i})}function ft(){let e=T.reduce((e,t)=>[...e,...t.map(([e,t])=>[e,t]).flat()],[]);return Ee(e.filter(e=>!isNaN(e)))}function pt(){c(this).attr(`fill`,()=>String(ie(c(this.parentNode).attr(`fill`)).darker()))}function mt(){c(this).attr(`fill`,()=>c(this.parentNode).attr(`fill`))}function ht(e,t,n){if(!xt(n)){b&&!S&&(S=setTimeout(()=>vt(e,t,n),150));return}yt(),b||bt(e,t,n);let[r,i]=lt(n),o=E?dt(i):ut(r),s,c;o&&(s=r-(a.left??0),c=i-(a.top??0),Ct(s,c),Y.call(`customMouseMove`,e,o,[s,c],[k,A],ge))}function gt(e,t,n){if(!xt(n))return;let[r,i]=lt(n),a=E?dt(i):ut(r);Y.call(`customClick`,e,a,se(n,e),_t(n.target))}function _t(e){let t=e.parentNode,n=t?c(t).datum():null;if(!n||!Me(n.key))return;let r=c(e).datum(),i=r&&r.data?r.data:M[Array.from(t.querySelectorAll(`.bar`)).indexOf(e)];if(i)return{name:n.key,value:i[n.key],key:i.key}}function vt(e,t,n){yt(),b&&(b=!1,O.select(`.metadata-group`).attr(`transform`,`translate(9999, 0)`),Y.call(`customMouseOut`,e,t,se(n,e)))}function yt(){S&&=(clearTimeout(S),null)}function bt(e,t,n){!b&&xt(n)&&(b=!0,Y.call(`customMouseOver`,e,t,se(n,e)))}function xt(e){return!!e&&!!e.target&&c(e.target).classed(`bar`)}function St(e){let t=x(u),n=c(this),r=ne(0,1);return function(i){let a=t(e[0]*i),o=t(e[1]*i);n.attr(`x`,a).attr(`width`,J(o-a)).style(`opacity`,r(i))}}function Ct(e,t){O.select(`.metadata-group`).attr(`transform`,`translate(${e},${t})`)}function wt(e){N=Ie(e.map(({stack:e})=>e)),F&&(N=N.reverse()),M=me(e,function(e){let n={};return e.forEach(e=>{e&&e[t]&&(n[e[t]]=Be(e))}),n.values=e,n},e=>String(K(e))).map(([e,t])=>({key:e,value:t})).map(function(e){return Object.assign({},{total:ye(he(e.value,N)),key:e.key},e.value)})}function Tt(){return o>I}function Et(e){let t=x(f),n=c(this),r=ne(0,1);return function(i){let a=t(e[1]*i),o=t(e[0]*i);n.attr(`y`,a).attr(`height`,J(o-a)).style(`opacity`,r(i))}}return X.a11yTitle=function(e){return arguments.length?(We=e,this):We},X.a11yDescription=function(e){return arguments.length?(Ge=e,this):Ge},X.a11yDataTable=function(e){return arguments.length?(Ke=e,this):Ke},X.a11yKeyboardNavigation=function(e){return arguments.length?(qe=e,this):qe},X.animationDuration=function(e){return arguments.length?(B=e,this):B},X.betweenBarsPadding=function(e){return arguments.length?(m=e,this):m},X.colorMap=function(e){return arguments.length?(y=e,this):y},X.colorSchema=function(e){return arguments.length?(pe=e,this):pe},X.exportChart=function(e,t){return Ce.call(X,O,e,t)},X.grid=function(e){return arguments.length?(H=e,this):H},X.hasPercentage=function(e){return arguments.length?(U=e?Pe:Fe,this):U===Pe},X.height=function(e){return arguments.length?(s=e,this):s},X.hasReversedStacks=function(e){return arguments.length?(F=e,this):F},X.isAnimated=function(e){return arguments.length?(W=e,this):W},X.isHorizontal=function(e){return arguments.length?(E=e,this):E},X.isNormalized=function(e){return arguments.length?(D=e,this):D},X.isLoading=function(e){return arguments.length?(l=e,this):l},X.margin=function(e){return arguments.length?(a={...a,...e},this):a},X.numberFormat=function(e){return arguments.length?(U=e,this):U},X.on=function(...e){let t=Y.on(...e);return t===Y?X:t},X.percentageAxisToMaxRatio=function(e){return arguments.length?(fe=e,this):fe},X.tooltipThreshold=function(e){return arguments.length?(I=e,this):I},X.valueLocale=function(e){return arguments.length?(h=e,this):h},X.width=function(e){return arguments.length?(o=e,this):o},X.xTicks=function(e){return arguments.length?(v=e,this):v},X.yAxisLabel=function(e){return arguments.length?(L=e,this):L},X.yAxisLabelOffset=function(e){return arguments.length?(z=e,this):z},X.yTicks=function(e){return arguments.length?(_=e,this):_},X}var Pe,Fe,Ie;function z(){return(z=e((()=>{pe(),v(),p(),t(),n(),y(),b(),fe(),N(),M(),g(),_(),a(),T(),A(),F(),D(),s(),j(),ge(),P(),S(),u(),w(),Pe=`%`,Fe=`,f`,Ie=e=>e.filter((e,t,n)=>n.indexOf(e)==t)})))()}var B,V;function H(){return(H=e((()=>{B=[{stack:`vivid`,value:0,name:`2011-01-05`},{stack:`vivid`,value:10,name:`2011-01-06`},{stack:`vivid`,value:16,name:`2011-01-07`},{stack:`vivid`,value:23,name:`2011-01-08`},{stack:`sparkling`,value:23,name:`2011-01-05`},{stack:`sparkling`,value:16,name:`2011-01-06`},{stack:`sparkling`,value:10,name:`2011-01-07`},{stack:`sparkling`,value:0,name:`2011-01-08`}],V={data:B}})))()}var U,W;function Le(){return(Le=e((()=>{U=[{stack:`vivid`,value:0,name:`2011-01-05`},{stack:`vivid`,value:4,name:`2011-01-06`},{stack:`vivid`,value:12,name:`2011-01-07`},{stack:`vivid`,value:23,name:`2011-01-08`},{stack:`sparkling`,value:18,name:`2011-01-05`},{stack:`sparkling`,value:16,name:`2011-01-06`},{stack:`sparkling`,value:10,name:`2011-01-07`},{stack:`sparkling`,value:0,name:`2011-01-08`},{stack:`sunny`,value:10,name:`2011-01-05`},{stack:`sunny`,value:20,name:`2011-01-06`},{stack:`sunny`,value:16,name:`2011-01-07`},{stack:`sunny`,value:25,name:`2011-01-08`}],W={data:U}})))()}var G,Re;function ze(){return(ze=e((()=>{G=[{stack:`vivid`,value:5,name:`2011-01-05`},{stack:`sparkling`,value:-4,name:`2011-01-05`},{stack:`sunny`,value:3,name:`2011-01-05`},{stack:`vivid`,value:8,name:`2011-01-06`},{stack:`sparkling`,value:-2,name:`2011-01-06`},{stack:`sunny`,value:-5,name:`2011-01-06`},{stack:`vivid`,value:3,name:`2011-01-07`},{stack:`sparkling`,value:-7,name:`2011-01-07`},{stack:`sunny`,value:4,name:`2011-01-07`},{stack:`vivid`,value:6,name:`2011-01-08`},{stack:`sparkling`,value:-3,name:`2011-01-08`},{stack:`sunny`,value:2,name:`2011-01-08`}],Re={data:G}})))()}function K(e){this.Klass=K,this.config=d.defaults({},e),this.withNegativeValues=function(){let e=d.extend({},this.config,Re);return new this.Klass(e)},this.with3Sources=function(){let e=d.extend({},this.config,W);return new this.Klass(e)},this.with2Sources=function(){let e=d.extend({},this.config,V);return new this.Klass(e)},this.build=function(){return this.config.data}}function Be(){return(Be=e((()=>{h(),H(),Le(),ze()})))()}var q,J,Y,X,Z,Q,$,Ve,He;function Ue(){return(Ue=e((()=>{g(),z(),L(),O(),o(),Be(),D(),q=()=>new K,J=e=>{let t=E(),n=R(),r=c(t),i=r.node()?r.node().getBoundingClientRect().width:!1,a=I();if(i){let o=q().with3Sources().build();l(n,e).width(i).on(`customMouseOver`,function(){a.show()}).on(`customMouseMove`,a.update).on(`customMouseOut`,function(){a.hide()}),r.datum(o).call(n),k(t,n,`stacked-bar`),a.topicLabel(`values`).nameLabel(`stack`).title(`Tooltip title`),c(`.metadata-group`).datum([]).call(a)}return t},J.args=m(R,[`height`,`margin`,`isAnimated`,`colorSchema`,`isHorizontal`,`isNormalized`,`betweenBarsPadding`,`hasPercentage`,`hasReversedStacks`,`percentageAxisToMaxRatio`,`grid`,`xTicks`,`yTicks`,`yAxisLabel`,`yAxisLabelOffset`,`tooltipThreshold`,`numberFormat`,`isLoading`]),J.args.isAnimated=!1,J.argTypes=f(J.args),Y=()=>{let e=E(),t=R(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=I(),a;if(r){let e=q().with3Sources().build();t.isHorizontal(!0).tooltipThreshold(600).grid(`vertical`).height(400).width(r).isAnimated(!0).margin({left:100,top:40,right:30,bottom:20}).colorSchema(we.colorSchemas.red).on(`customMouseOver`,function(){i.show()}).on(`customMouseMove`,i.update).on(`customMouseOut`,function(){i.hide()}),n.datum(e).call(t),i.topicLabel(`values`).nameLabel(`stack`).title(`Tooltip Title`),a=c(`.metadata-group`),a.datum([]).call(i)}return e},X=()=>{let e=E(),t=R(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=I();if(r){let e=q().with3Sources().build();t.isAnimated(!0).width(r).on(`customMouseOver`,function(){i.show()}).on(`customMouseMove`,i.update).on(`customMouseOut`,function(){i.hide()}),n.datum(e).call(t),i.topicLabel(`values`).nameLabel(`stack`).title(`Tooltip title`),c(`.metadata-group`).datum([]).call(i)}return e},Z=()=>{let e=E(),t=R(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=I();if(r){let e=q().with3Sources().build();t.isNormalized(!0).width(r).on(`customMouseOver`,function(){i.show()}).on(`customMouseMove`,i.update).on(`customMouseOut`,function(){i.hide()}),n.datum(e).call(t),i.topicLabel(`values`).nameLabel(`stack`).title(`Tooltip title`),c(`.metadata-group`).datum([]).call(i)}return e},Q=()=>{let e=E(),t=R(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=q().withNegativeValues().build();return r&&(t.isAnimated(!0).grid(`horizontal`).width(r).height(400),n.datum(i).call(t)),e},$=()=>{let e=E(),t=R(),n=c(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=q().with3Sources().build();return r&&(t.width(r).height(400).isAnimated(!0).isLoading(!0),n.datum(i).call(t)),e},Ve={title:`Charts/StackedBar`},He=[`Playground`,`WithHorizontalDirection`,`WithAnimation`,`WithNormalizedStacks`,`WithNegativeValues`,`WithLoadingState`],J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`args => {
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
}`,...$.parameters?.docs?.source}}}})))()}Ue();export{J as Playground,X as WithAnimation,Y as WithHorizontalDirection,$ as WithLoadingState,Q as WithNegativeValues,Z as WithNormalizedStacks,He as __namedExportsOrder,Ve as default};