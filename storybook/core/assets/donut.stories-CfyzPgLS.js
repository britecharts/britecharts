import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,i as n,o as r,ot as i,s as a,st as o}from"./index-all-C3m7CdM7.js";import{n as s,t as c}from"./helpers-BKrpDpmp.js";import{a as l,i as u,n as d,o as f,r as p,t as m}from"./donutChartDataBuilder-CUEWu7Ex.js";var h,g,_,v,y,b,x,S,C,w,T,E,D;function O(){return(O=e((()=>{i(),l(),p(),s(),t(),d(),h=()=>new m,g=h().withFivePlusOther().build(),h().withThreeCategories().build(),_=(e,t)=>{let n=u(),r=document.createElement(`div`);r.classList=`legend-chart-container`,e.appendChild(r);let i=o(r),a=i.node()?i.node().getBoundingClientRect().width:!1;return a&&(i.selectAll(`.britechart-legend`).remove(),n.width(a*.8).height(200).numberFormat(`s`),i.datum(t).call(n)),n},v=(e,t)=>{let n=u(),r=document.createElement(`div`);r.classList=`legend-chart-container`,e.appendChild(r);let i=o(r),a=i.node()?i.node().getBoundingClientRect().width:!1;return a&&(i.selectAll(`.britechart-legend`).remove(),n.isHorizontal(!0).width(a*.6).markerSize(8).height(40),i.datum(t).call(n)),n},y=(e,t)=>{let n=u(),r=document.createElement(`div`);r.classList=`legend-chart-container`,e.appendChild(r);let i=o(r),a=i.node()?i.node().getBoundingClientRect().width:!1;return a&&(i.selectAll(`.britechart-legend`).remove(),n.width(a).height(100),i.datum(t).call(n)),n},b=e=>{let t=c(),r=f(),i=o(t),a=i.node()?i.node().getBoundingClientRect().width:!1;return a&&(n(r,e).width(a),i.datum(g).call(r)),t},b.args=a(f,[`height`,`margin`,`isAnimated`,`colorSchema`,`externalRadius`,`internalRadius`,`radiusHoverOffset`,`hasCenterLegend`,`hasFixedHighlightedSlice`,`hasHoverAnimation`,`hasLastHoverSliceHighlighted`,`highlightSliceById`,`percentageFormat`,`numberFormat`,`isLoading`]),b.args.isAnimated=!1,b.argTypes=r(b.args),x=()=>{let e=c(),t=o(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=f();if(n){let e=Math.min(n,400);r.isAnimated(!0).highlightSliceById(2).width(n).height(e).externalRadius(e/2.5).internalRadius(e/5).on(`customMouseOver`,e=>{i.highlight(e.data.id)}).on(`customMouseOut`,()=>{i.clearHighlight()}),t.datum(g).call(r)}let i=_(e,g);return e},S=()=>{let e=c(),t=o(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=f(),i=h().withThreeCategories().build();n&&(r.width(n).height(n/1.8).externalRadius(n/5).internalRadius(n/10).on(`customMouseOver`,e=>{a.highlight(e.data.id)}).on(`customMouseOut`,()=>{a.clearHighlight()}),t.datum(i).call(r));let a=v(e,i);return e},C=()=>{let e=c(),t=f(),n=o(e),r=n.node()?n.node().getBoundingClientRect().width:!1;return r&&(t.isAnimated(!0).width(r),n.datum(g).call(t)),e},w=()=>{let e=c(),t=o(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=f(),i=h().withThreeCategories().build(),a=JSON.parse(JSON.stringify(i)).map(e=>(delete e.quantity,e)),s=y(e,a);return n&&(r.highlightSliceById(11).hasFixedHighlightedSlice(!0).width(n).height(n/1.8).externalRadius(n/5).internalRadius(n/10).on(`customMouseOver`,function(e){s.highlight(e.data.id)}).on(`customMouseOut`,function(){s.highlight(11)}),s.highlight(11),t.datum(i).call(r)),e},T=()=>{let e=c(),t=o(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=f(),i=h().withFivePlusOther().build();return n&&(r.isAnimated(!0).highlightSliceById(2).width(n).height(n).externalRadius(n/2.5).internalRadius(n/5).isLoading(!0),t.datum(i).call(r)),e},E={title:`Charts/Donut`},D=[`Playground`,`WithAnimationAndLegend`,`WithInlineLegend`,`WithAnimation`,`WithHighlightedSliceChart`,`WithLoadingState`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`args => {
  const container = getCleanContainer();
  const donutChart = donut();
  const donutContainer = select(container);
  const containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false;
  if (containerWidth) {
    applyArgs(donutChart, args).width(containerWidth);
    donutContainer.datum(dataset).call(donutChart);
  }
  return container;
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const donutContainer = select(container);
  const containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false;
  const donutChart = donut();
  if (containerWidth) {
    // Capped, so a wide canvas does not draw a ring as wide as itself
    const chartHeight = Math.min(containerWidth, 400);
    donutChart.isAnimated(true).highlightSliceById(2).width(containerWidth).height(chartHeight).externalRadius(chartHeight / 2.5).internalRadius(chartHeight / 5).on('customMouseOver', data => {
      legendChart.highlight(data.data.id);
    }).on('customMouseOut', () => {
      legendChart.clearHighlight();
    });
    donutContainer.datum(dataset).call(donutChart);
  }
  const legendChart = getLegendChart(container, dataset);
  return container;
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const donutContainer = select(container);
  const containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false;
  const donutChart = donut();
  const dataset = aTestDataSet().withThreeCategories().build();
  if (containerWidth) {
    donutChart.width(containerWidth).height(containerWidth / 1.8).externalRadius(containerWidth / 5).internalRadius(containerWidth / 10).on('customMouseOver', data => {
      legendChart.highlight(data.data.id);
    }).on('customMouseOut', () => {
      legendChart.clearHighlight();
    });
    donutContainer.datum(dataset).call(donutChart);
  }
  const legendChart = getInlineLegendChart(container, dataset);
  return container;
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const donutChart = donut();
  const donutContainer = select(container);
  const containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false;
  if (containerWidth) {
    donutChart.isAnimated(true).width(containerWidth);
    donutContainer.datum(dataset).call(donutChart);
  }
  return container;
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const donutContainer = select(container);
  const containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false;
  const donutChart = donut();
  const dataset = aTestDataSet().withThreeCategories().build();
  const dataNoQuantity = JSON.parse(JSON.stringify(dataset)).map(item => {
    delete item.quantity;
    return item;
  });
  const legendChart = getVerticalLegendChart(container, dataNoQuantity);
  if (containerWidth) {
    donutChart.highlightSliceById(11).hasFixedHighlightedSlice(true).width(containerWidth).height(containerWidth / 1.8).externalRadius(containerWidth / 5).internalRadius(containerWidth / 10).on('customMouseOver', function (slice) {
      legendChart.highlight(slice.data.id);
    }).on('customMouseOut', function () {
      legendChart.highlight(11);
    });
    legendChart.highlight(11);
    donutContainer.datum(dataset).call(donutChart);
  }
  return container;
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const donutContainer = select(container);
  const containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false;
  const donutChart = donut();
  const dataset = aTestDataSet().withFivePlusOther().build();
  if (containerWidth) {
    donutChart.isAnimated(true).highlightSliceById(2).width(containerWidth).height(containerWidth).externalRadius(containerWidth / 2.5).internalRadius(containerWidth / 5).isLoading(true);
    donutContainer.datum(dataset).call(donutChart);
  }
  return container;
}`,...T.parameters?.docs?.source}}}})))()}O();export{b as Playground,C as WithAnimation,x as WithAnimationAndLegend,w as WithHighlightedSliceChart,S as WithInlineLegend,T as WithLoadingState,D as __namedExportsOrder,E as default};