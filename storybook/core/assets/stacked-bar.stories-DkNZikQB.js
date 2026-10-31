import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{B as t,D as n,E as r,N as i,T as a,a as o,at as s,b as c,et as ee,f as te,ft as l,h as ne,i as u,it as re,l as d,m as ie,n as f,o as p,p as ae,pt as m,s as h,t as g,tt as oe,u as se,z as _}from"./index-all-BIfgpmrH.js";import{n as ce,t as v}from"./pointer-Djj9AZUl.js";import{n as le}from"./quad-qkBhhiXk.js";import{i as ue,n as de,t as fe}from"./axis-B0w998iS.js";import{n as pe,t as me}from"./linear-ZVlPWze4.js";import{n as he,r as ge}from"./group-CuaLm5jC.js";import{n as _e}from"./permute-Cz73FWvc.js";import{a as ve,o as ye}from"./constants-BiwYcpix.js";import{n as be}from"./range-CQkgHe2o.js";import{n as xe}from"./sum-B43dOCtN.js";import{n as Se,t as y}from"./ordinal-1JX83z3D.js";import{a as b,i as Ce,n as x,r as S,t as we}from"./scale-B00Tn_Hs.js";import{n as C,t as Te}from"./keyboard-D_bIywLd.js";import{a as Ee,c as w,i as T,l as De,n as E,o as Oe,s as ke,t as D}from"./tooltip-CNFX26_o.js";import{n as O,t as Ae}from"./export-Cyy-TeXX.js";import{a as je,n as k,o as A,r as j,s as Me,t as M}from"./helpers-CrbXQEV5.js";import{n as Ne,r as Pe}from"./domain-BQLJNFX4.js";import{n as Fe,t as Ie}from"./locale-hAvcEUfm.js";import{i as Le,n as N,r as Re,t as ze}from"./expand-Bv7b_Y6P.js";import{n as Be,r as P,t as Ve}from"./grid-CmafFtNu.js";function He(e,t){if((c=e.length)>0)for(var n,r=0,i,a,o,s,c,ee=e[t[0]].length;r<ee;++r)for(o=s=0,n=0;n<c;++n)(a=(i=e[t[n]][r])[1]-i[0])>0?(i[0]=o,i[1]=o+=a):a<0?(i[1]=s,i[0]=s+=a):(i[0]=0,i[1]=a)}function F(){let e=`name`,n=`stack`,a=`value`,o={top:40,right:30,bottom:60,left:70},s=960,c=500,l=!1,u,d,f,p,h=.1,g=null,oe=t,_=5,v=5,ue=1,me=je.colorSchemas.britecharts,he=null,ve=null,y=!1,b=null,S,C,w=!1,T=!1,E,D,O,k,A,j,M,Pe=!1,Ie=480,N=null,Re,P=-60,F=ye.duration,L,R=null,z=Ue,B=!1,Ge=le,V={top:0,left:0,bottom:0,right:0},Ke=.24,qe=e=>he[e],H=t=>t[e],Je=e=>e[a],Ye=e=>e[n],U=e=>isNaN(e)?0:e,W=ee(`customMouseOver`,`customMouseOut`,`customMouseMove`,`customClick`);function G(e){g&&(oe=Fe(g)),e.each(function(e){D=s-(o.left??0)-(o.right??0),O=c-(o.top??0)-(o.bottom??0),k=it(e),At(k),rt(this),ie(E.node(),Ze&&!l?nt():null),Te(E.node(),{isEnabled:Qe&&!l,stops:et}),l?st():(at(),X(),Xe(),ct(),J(oe),ot(),pt(),K(),$&&ke(G,$,E,$e))})}function K(){jt()&&E.on(`mouseenter`,function(e,t){Et(this,t,e)}).on(`mouseleave`,function(e,t){wt(this,t,e)}).on(`mousemove`,function(e,t){xt(this,t,e)}).on(`click`,function(e,t){St(this,t,e)}),E.selectAll(`.bar`).on(`mouseover`,yt).on(`mouseout`,bt)}function q(e){e.selectAll(`.tick text`).attr(`transform`,`translate(-20, -8)`)}function J(e){let t=T?I:z;w?(d=fe(u).ticks(v,e.format(t)),p=de(f)):(d=fe(u),p=de(f).ticks(_,e.format(t)))}function Y(){let e=E.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${o.left},${o.top})`);E.append(`g`).classed(`loading-state-group`,!0),e.append(`g`).classed(`x-axis-group`,!0).append(`g`).classed(`x axis`,!0),e.append(`g`).classed(`y-axis-group axis`,!0),e.append(`g`).classed(`grid-lines-group`,!0),e.append(`g`).classed(`chart-group`,!0),e.append(`g`).classed(`y-axis-label`,!0),e.append(`g`).classed(`metadata-group`,!0)}function X(){C=Le().keys(j).offset(T?ze:He)(A.map(e=>{let t={};return j.forEach(n=>{t[n]=e[n]}),Object.assign({},e,t)}))}function Xe(){let e=vt();w?(u=pe().domain(e).rangeRound([0,D-1]),f=Ce().domain(k.map(H)).rangeRound([O,0]).padding(h)):(u=Ce().domain(k.map(H)).rangeRound([0,D]).padding(h),f=pe().domain(e).rangeRound([O,0]).nice()),S=Se().range(me).domain(k.map(Ye)),he=Me(S.domain(k.map(Ye)).domain().reduce((e,t)=>(e[t]=S(t),e),{}),ve)}let Z=null,Q=null,Ze=!0,Qe=!0,$=null,$e={topicLabel:`values`,nameLabel:`stack`};function et(){let e=new Map;return E.selectAll(`.bar`).each(function(t){let n=e.get(t.data.key);(!n||t[1]!==t[0]&&!tt(n))&&e.set(t.data.key,this)}),[...e.values()].map(e=>({target:e}))}function tt(e){let t=m(e).datum();return t[1]!==t[0]}function nt(){return te(k,{heading:`Name`,row:e=>e.name,column:e=>e.stack,value:e=>e.value})}function rt(e){E||(E=m(e).append(`svg`).classed(`britechart stacked-bar`,!0),Y()),E.attr(`viewBox`,[0,0,s,c]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,s).attr(`height`,c),se(E.node(),{a11yTitle:Z,a11yDescription:Q,fallbackTitle:`Stacked bar chart`})}function it(t){return t.reduce((t,r)=>{let i=r;return i.value=+i[a],i.stack=i[n],i.topicName=i[n],i.name=i[e],[...t,i]},[])}function at(){E.select(`.loading-state-group svg`).remove()}function ot(){w?(E.select(`.x-axis-group .axis.x`).attr(`transform`,`translate( 0, ${O} )`).call(d),E.select(`.y-axis-group.axis`).attr(`transform`,`translate( ${-V.left}, 0)`).call(p)):(E.select(`.x-axis-group .axis.x`).attr(`transform`,`translate( 0, ${O} )`).call(d),E.select(`.y-axis-group.axis`).attr(`transform`,`translate( ${-V.left}, 0)`).call(p).call(q)),N&&(Re&&E.selectAll(`.y-axis-label-text`).remove(),Re=E.select(`.y-axis-label`).append(`text`).classed(`y-axis-label-text`,!0).attr(`x`,-O/2).attr(`y`,P).attr(`text-anchor`,`middle`).attr(`transform`,`rotate(270 0 0)`).text(N))}function st(){E.select(`.loading-state-group`).html(ne)}function ct(){E.select(`.grid-lines-group`).selectAll(`grid`).remove(),(R===`horizontal`||R===`full`)&&ut(),(R===`vertical`||R===`full`)&&ft(),w?ft():ut()}function lt(e){let t=x(u),n=we(f);M=e.data(C).enter().append(`g`).attr(`fill`,({key:e})=>qe(e)).classed(`layer`,!0);let r=M.selectAll(`.bar`).data(e=>mt(e)).enter().append(`rect`).classed(`bar`,!0).attr(`x`,e=>t(e[0])).attr(`y`,e=>n(e.data.key)).attr(`height`,n.bandwidth());B&&!ae()?r.style(`opacity`,Ke).transition().delay((e,t)=>L[t]).duration(F).ease(Ge).tween(`attr.width`,Ot):r.attr(`width`,e=>t(e[1])-t(e[0]))}function ut(){Ve(f).range([0,D]).hideEdges(`first`).ticks(_).extendedLine(V.left)(E.select(`.grid-lines-group`))}function dt(e){let t=we(u),n=x(f);M=e.data(C).enter().append(`g`).attr(`fill`,({key:e})=>qe(e)).classed(`layer`,!0);let r=M.selectAll(`.bar`).data(e=>mt(e)).enter().append(`rect`).classed(`bar`,!0).attr(`x`,e=>t(e.data.key)).attr(`y`,e=>n(e[1])).attr(`width`,t.bandwidth);B&&!ae()?r.style(`opacity`,Ke).transition().delay((e,t)=>L[t]).duration(F).ease(Ge).tween(`attr.height`,Mt):r.attr(`height`,e=>n(e[0])-n(e[1]))}function ft(){Be(u).range([0,O]).hideEdges(`first`).ticks(v).extendedLine(V.bottom)(E.select(`.grid-lines-group`))}function pt(){M&&E.selectAll(`.layer`).remove();let e=E.select(`.chart-group`).selectAll(`.layer`);L=be(20,(C[0].length+1)*20,20),w?lt(e):dt(e),e.exit().transition().style(`opacity`,0).remove()}function mt(e){return e.map(e=>{for(let t=0;t<e.length;t++)e[t]=U(e[t]);return e})}function ht(e){return ce(e,E.node())}function gt(e){let t=e-(o.left??0),n=we(u);return A.find(({key:e})=>{let r=n(e),i=r+n.bandwidth();return t>=r&&t<i})}function _t(e){let t=e-(o.top??0),n=we(f);return A.find(({key:e})=>{let r=n(e),i=r+n.bandwidth();return t>=r&&t<i})}function vt(){let e=C.reduce((e,t)=>[...e,...t.map(([e,t])=>[e,t]).flat()],[]);return Ne(e.filter(e=>!isNaN(e)))}function yt(){m(this).attr(`fill`,()=>String(re(m(this.parentNode).attr(`fill`)).darker()))}function bt(){m(this).attr(`fill`,()=>m(this.parentNode).attr(`fill`))}function xt(e,t,n){if(!Dt(n)){y&&!b&&(b=setTimeout(()=>wt(e,t,n),150));return}Tt(),y||Et(e,t,n);let[r,i]=ht(n),a=w?_t(i):gt(r),s,c;a&&(s=r-(o.left??0),c=i-(o.top??0),kt(s,c),W.call(`customMouseMove`,e,a,[s,c],[D,O],he))}function St(e,t,n){if(!Dt(n))return;let[r,i]=ht(n),a=w?_t(i):gt(r);W.call(`customClick`,e,a,ce(n,e),Ct(n.target))}function Ct(e){let t=e.parentNode,n=t?m(t).datum():null;if(!n||!Ee(n.key))return;let r=m(e).datum(),i=r&&r.data?r.data:A[Array.from(t.querySelectorAll(`.bar`)).indexOf(e)];if(i)return{name:n.key,value:i[n.key],key:i.key}}function wt(e,t,n){Tt(),y&&(y=!1,E.select(`.metadata-group`).attr(`transform`,`translate(9999, 0)`),W.call(`customMouseOut`,e,t,ce(n,e)))}function Tt(){b&&=(clearTimeout(b),null)}function Et(e,t,n){!y&&Dt(n)&&(y=!0,W.call(`customMouseOver`,e,t,ce(n,e)))}function Dt(e){return!!e&&!!e.target&&m(e.target).classed(`bar`)}function Ot(e){let t=x(u),n=m(this),r=i(0,1);return function(i){let a=t(e[0]*i),o=t(e[1]*i);n.attr(`x`,a).attr(`width`,U(o-a)).style(`opacity`,r(i))}}function kt(e,t){E.select(`.metadata-group`).attr(`transform`,`translate(${e},${t})`)}function At(e){j=We(e.map(({stack:e})=>e)),Pe&&(j=j.reverse()),A=ge(e,function(e){let t={};return e.forEach(e=>{e&&e[n]&&(t[e[n]]=Je(e))}),t.values=e,t},e=>String(H(e))).map(([e,t])=>({key:e,value:t})).map(function(e){return Object.assign({},{total:xe(_e(e.value,j)),key:e.key},e.value)})}function jt(){return s>Ie}function Mt(e){let t=x(f),n=m(this),r=i(0,1);return function(i){let a=t(e[1]*i),o=t(e[0]*i);n.attr(`y`,a).attr(`height`,U(o-a)).style(`opacity`,r(i))}}return G.a11yTitle=function(e){return arguments.length?(Z=e,this):Z},G.a11yDescription=function(e){return arguments.length?(Q=e,this):Q},G.a11yDataTable=function(e){return arguments.length?(Ze=e,this):Ze},G.a11yKeyboardNavigation=function(e){return arguments.length?(Qe=e,this):Qe},G.animationDuration=function(e){return arguments.length?(F=e,this):F},G.betweenBarsPadding=function(e){return arguments.length?(h=e,this):h},G.colorMap=function(e){return arguments.length?(ve=e,this):ve},G.colorSchema=function(e){return arguments.length?(me=e,this):me},G.exportChart=function(e,t){return Ae.call(G,E,e,t)},G.grid=function(e){return arguments.length?(R=e,this):R},G.hasPercentage=function(e){return arguments.length?(z=e?I:Ue,this):z===I},G.height=function(e){return arguments.length?(c=e,this):c},G.hasReversedStacks=function(e){return arguments.length?(Pe=e,this):Pe},G.isAnimated=function(e){return arguments.length?(B=e,this):B},G.isHorizontal=function(e){return arguments.length?(w=e,this):w},G.isNormalized=function(e){return arguments.length?(T=e,this):T},G.isLoading=function(e){return arguments.length?(l=e,this):l},G.margin=function(e){return arguments.length?(o={...o,...e},this):o},G.numberFormat=function(e){return arguments.length?(z=e,this):z},G.on=function(...e){let t=W.on(...e);return t===W?G:t},G.percentageAxisToMaxRatio=function(e){return arguments.length?(ue=e,this):ue},G.tooltipThreshold=function(e){return arguments.length?(Ie=e,this):Ie},G.valueLocale=function(e){return arguments.length?(g=e,this):g},G.width=function(e){return arguments.length?(s=e,this):s},G.xTicks=function(e){return arguments.length?(v=e,this):v},G.yAxisLabel=function(e){return arguments.length?(N=e,this):N},G.yAxisLabelOffset=function(e){return arguments.length?(P=e,this):P},G.yTicks=function(e){return arguments.length?(_=e,this):_},G.tooltip=function(e){return arguments.length?(e===$||(e&&Oe(this,e),$&&De(this,$),$=e,$&&E&&ke(this,$,E,$e)),this):$},G.render=function(e,t){return r(this,e,t)},G}var I,Ue,We;function L(){return(L=e((()=>{he(),ue(),s(),oe(),_(),y(),b(),me(),Re(),N(),l(),v(),n(),O(),a(),w(),Pe(),T(),A(),c(),Ie(),ve(),P(),S(),d(),C(),I=`%`,Ue=`,f`,We=e=>e.filter((e,t,n)=>n.indexOf(e)==t)})))()}var R,z;function B(){return(B=e((()=>{R=[{stack:`vivid`,value:0,name:`2011-01-05`},{stack:`vivid`,value:10,name:`2011-01-06`},{stack:`vivid`,value:16,name:`2011-01-07`},{stack:`vivid`,value:23,name:`2011-01-08`},{stack:`sparkling`,value:23,name:`2011-01-05`},{stack:`sparkling`,value:16,name:`2011-01-06`},{stack:`sparkling`,value:10,name:`2011-01-07`},{stack:`sparkling`,value:0,name:`2011-01-08`}],z={data:R}})))()}var Ge,V;function Ke(){return(Ke=e((()=>{Ge=[{stack:`vivid`,value:0,name:`2011-01-05`},{stack:`vivid`,value:4,name:`2011-01-06`},{stack:`vivid`,value:12,name:`2011-01-07`},{stack:`vivid`,value:23,name:`2011-01-08`},{stack:`sparkling`,value:18,name:`2011-01-05`},{stack:`sparkling`,value:16,name:`2011-01-06`},{stack:`sparkling`,value:10,name:`2011-01-07`},{stack:`sparkling`,value:0,name:`2011-01-08`},{stack:`sunny`,value:10,name:`2011-01-05`},{stack:`sunny`,value:20,name:`2011-01-06`},{stack:`sunny`,value:16,name:`2011-01-07`},{stack:`sunny`,value:25,name:`2011-01-08`}],V={data:Ge}})))()}var qe,H;function Je(){return(Je=e((()=>{qe=[{stack:`vivid`,value:5,name:`2011-01-05`},{stack:`sparkling`,value:-4,name:`2011-01-05`},{stack:`sunny`,value:3,name:`2011-01-05`},{stack:`vivid`,value:8,name:`2011-01-06`},{stack:`sparkling`,value:-2,name:`2011-01-06`},{stack:`sunny`,value:-5,name:`2011-01-06`},{stack:`vivid`,value:3,name:`2011-01-07`},{stack:`sparkling`,value:-7,name:`2011-01-07`},{stack:`sunny`,value:4,name:`2011-01-07`},{stack:`vivid`,value:6,name:`2011-01-08`},{stack:`sparkling`,value:-3,name:`2011-01-08`},{stack:`sunny`,value:2,name:`2011-01-08`}],H={data:qe}})))()}function Ye(e){this.Klass=Ye,this.config=f.defaults({},e),this.withNegativeValues=function(){let e=f.extend({},this.config,H);return new this.Klass(e)},this.with3Sources=function(){let e=f.extend({},this.config,V);return new this.Klass(e)},this.with2Sources=function(){let e=f.extend({},this.config,z);return new this.Klass(e)},this.build=function(){return this.config.data}}function U(){return(U=e((()=>{g(),B(),Ke(),Je()})))()}var W,G,K,q,J,Y,X,Xe,Z;function Q(){return(Q=e((()=>{l(),L(),D(),j(),o(),U(),A(),W=()=>new Ye,G=e=>{let t=k(),n=F(),r=m(t),i=r.node()?r.node().getBoundingClientRect().width:!1;if(i){let a=W().with3Sources().build();u(n,e).width(i).tooltip(E().title(`Tooltip title`)),n.render(r,a),M(t,n,`stacked-bar`)}return t},G.args=h(F,[`height`,`margin`,`isAnimated`,`colorSchema`,`isHorizontal`,`isNormalized`,`betweenBarsPadding`,`hasPercentage`,`hasReversedStacks`,`percentageAxisToMaxRatio`,`grid`,`xTicks`,`yTicks`,`yAxisLabel`,`yAxisLabelOffset`,`tooltipThreshold`,`numberFormat`,`isLoading`]),G.args.isAnimated=!1,G.argTypes=p(G.args),K=()=>{let e=k(),t=F(),n=m(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=E(),a;if(r){let e=W().with3Sources().build();t.isHorizontal(!0).tooltipThreshold(600).grid(`vertical`).height(400).width(r).isAnimated(!0).margin({left:100,top:40,right:30,bottom:20}).colorSchema(je.colorSchemas.red).on(`customMouseOver`,function(){i.show()}).on(`customMouseMove`,i.update).on(`customMouseOut`,function(){i.hide()}),t.render(n,e),i.topicLabel(`values`).nameLabel(`stack`).title(`Tooltip Title`),a=m(`.metadata-group`),a.datum([]).call(i)}return e},q=()=>{let e=k(),t=F(),n=m(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=E();if(r){let e=W().with3Sources().build();t.isAnimated(!0).width(r).on(`customMouseOver`,function(){i.show()}).on(`customMouseMove`,i.update).on(`customMouseOut`,function(){i.hide()}),t.render(n,e),i.topicLabel(`values`).nameLabel(`stack`).title(`Tooltip title`),m(`.metadata-group`).datum([]).call(i)}return e},J=()=>{let e=k(),t=F(),n=m(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=E();if(r){let e=W().with3Sources().build();t.isNormalized(!0).width(r).on(`customMouseOver`,function(){i.show()}).on(`customMouseMove`,i.update).on(`customMouseOut`,function(){i.hide()}),t.render(n,e),i.topicLabel(`values`).nameLabel(`stack`).title(`Tooltip title`),m(`.metadata-group`).datum([]).call(i)}return e},Y=()=>{let e=k(),t=F(),n=m(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=W().withNegativeValues().build();return r&&(t.isAnimated(!0).grid(`horizontal`).width(r).height(400),t.render(n,i)),e},X=()=>{let e=k(),t=F(),n=m(e),r=n.node()?n.node().getBoundingClientRect().width:!1,i=W().with3Sources().build();return r&&(t.width(r).height(400).isAnimated(!0).isLoading(!0),t.render(n,i)),e},Xe={title:`Charts/StackedBar`},Z=[`Playground`,`WithHorizontalDirection`,`WithAnimation`,`WithNormalizedStacks`,`WithNegativeValues`,`WithLoadingState`],G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`args => {
  const container = getCleanContainer();
  const stackedBar = stackedBarChart();
  const stackedBarContainer = select(container);
  const containerWidth = stackedBarContainer.node() ? stackedBarContainer.node().getBoundingClientRect().width : false;
  if (containerWidth) {
    const dataset = aTestDataSet().with3Sources().build();

    // The chart connects and places its tooltip, and sets the labels its
    // rows need
    applyArgs(stackedBar, args).width(containerWidth).tooltip(tooltip().title('Tooltip title'));
    stackedBar.render(stackedBarContainer, dataset);
    addExportButtons(container, stackedBar, 'stacked-bar');
  }
  return container;
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`() => {
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
    stackedBar.render(stackedBarContainer, dataset);

    // Tooltip Setup and start
    // The stacked bar dispatches its rows as \`values\`, named by \`stack\`
    chartTooltip.topicLabel('values').nameLabel('stack').title('Tooltip Title');

    // Note that if the viewport width is less than the tooltipThreshold value,
    // this container won't exist, and the tooltip won't show up
    tooltipContainer = select('.metadata-group');
    tooltipContainer.datum([]).call(chartTooltip);
  }
  return container;
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`() => {
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
    stackedBar.render(stackedBarContainer, dataset);

    // The stacked bar dispatches its rows as \`values\`, named by \`stack\`
    chartTooltip.topicLabel('values').nameLabel('stack').title('Tooltip title');
    select('.metadata-group').datum([]).call(chartTooltip);
  }
  return container;
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`() => {
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
    stackedBar.render(stackedBarContainer, dataset);

    // The stacked bar dispatches its rows as \`values\`, named by \`stack\`
    chartTooltip.topicLabel('values').nameLabel('stack').title('Tooltip title');
    select('.metadata-group').datum([]).call(chartTooltip);
  }
  return container;
}`,...J.parameters?.docs?.source},description:{story:`A 100% stacked bar: \`isNormalized(true)\` scales every stack to the full
height, so each segment shows its share of its stack and the axis runs from
0% to 100%. The tooltip still shows the values.`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const stackedBar = stackedBarChart();
  const stackedBarContainer = select(container);
  const containerWidth = stackedBarContainer.node() ? stackedBarContainer.node().getBoundingClientRect().width : false;
  const dataset = aTestDataSet().withNegativeValues().build();
  if (containerWidth) {
    stackedBar.isAnimated(true).grid('horizontal').width(containerWidth).height(400);
    stackedBar.render(stackedBarContainer, dataset);
  }
  return container;
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const stackedBar = stackedBarChart();
  const stackedBarContainer = select(container);
  const containerWidth = stackedBarContainer.node() ? stackedBarContainer.node().getBoundingClientRect().width : false;
  const dataset = aTestDataSet().with3Sources().build();
  if (containerWidth) {
    stackedBar.width(containerWidth).height(400).isAnimated(true).isLoading(true);
    stackedBar.render(stackedBarContainer, dataset);
  }
  return container;
}`,...X.parameters?.docs?.source}}}})))()}Q();export{G as Playground,q as WithAnimation,K as WithHorizontalDirection,X as WithLoadingState,Y as WithNegativeValues,J as WithNormalizedStacks,Z as __namedExportsOrder,Xe as default};