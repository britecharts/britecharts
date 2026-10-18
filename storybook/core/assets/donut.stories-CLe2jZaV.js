import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,at as n,i as r,it as i,o as a,s as o}from"./index-all-CjBvOLpq.js";import{n as s,t as c}from"./helpers-DK6iEQil.js";import{i as l,n as u,r as d,t as f}from"./donutChartDataBuilder-CeTnqiEq.js";import{n as p,t as m}from"./legend-CFRugdBV.js";var h,g,_,v,y,b,x,S,C,w,T,E,D;function O(){return(O=e((()=>{i(),d(),m(),s(),t(),u(),h=()=>new f,g=h().withFivePlusOther().build(),h().withThreeCategories().build(),_=(e,t)=>{let r=p(),i=document.createElement(`div`);i.classList=`legend-chart-container`,e.appendChild(i);let a=n(i),o=a.node()?a.node().getBoundingClientRect().width:!1;return o&&(a.selectAll(`.britechart-legend`).remove(),r.width(o*.8).height(200).numberFormat(`s`),a.datum(t).call(r)),r},v=(e,t)=>{let r=p(),i=document.createElement(`div`);i.classList=`legend-chart-container`,e.appendChild(i);let a=n(i),o=a.node()?a.node().getBoundingClientRect().width:!1;return o&&(a.selectAll(`.britechart-legend`).remove(),r.isHorizontal(!0).width(o*.6).markerSize(8).height(40),a.datum(t).call(r)),r},y=(e,t)=>{let r=p(),i=document.createElement(`div`);i.classList=`legend-chart-container`,e.appendChild(i);let a=n(i),o=a.node()?a.node().getBoundingClientRect().width:!1;return o&&(a.selectAll(`.britechart-legend`).remove(),r.width(o).height(100),a.datum(t).call(r)),r},b=e=>{let t=c(),i=l(),a=n(t),o=a.node()?a.node().getBoundingClientRect().width:!1;return o&&(r(i,e).width(o),a.datum(g).call(i)),t},b.args=o(l,[`height`,`margin`,`isAnimated`,`colorSchema`,`externalRadius`,`internalRadius`,`radiusHoverOffset`,`hasCenterLegend`,`hasFixedHighlightedSlice`,`hasHoverAnimation`,`hasLastHoverSliceHighlighted`,`highlightSliceById`,`percentageFormat`,`numberFormat`,`isLoading`]),b.args.isAnimated=!1,b.argTypes=a(b.args),x=()=>{let e=c(),t=n(e),r=t.node()?t.node().getBoundingClientRect().width:!1,i=l();if(r){let e=Math.min(r,400);i.isAnimated(!0).highlightSliceById(2).width(r).height(e).externalRadius(e/2.5).internalRadius(e/5).on(`customMouseOver`,e=>{a.highlight(e.data.id)}).on(`customMouseOut`,()=>{a.clearHighlight()}),t.datum(g).call(i)}let a=_(e,g);return e},S=()=>{let e=c(),t=n(e),r=t.node()?t.node().getBoundingClientRect().width:!1,i=l(),a=h().withThreeCategories().build();r&&(i.width(r).height(r/1.8).externalRadius(r/5).internalRadius(r/10).on(`customMouseOver`,e=>{o.highlight(e.data.id)}).on(`customMouseOut`,()=>{o.clearHighlight()}),t.datum(a).call(i));let o=v(e,a);return e},C=()=>{let e=c(),t=l(),r=n(e),i=r.node()?r.node().getBoundingClientRect().width:!1;return i&&(t.isAnimated(!0).width(i),r.datum(g).call(t)),e},w=()=>{let e=c(),t=n(e),r=t.node()?t.node().getBoundingClientRect().width:!1,i=l(),a=h().withThreeCategories().build(),o=JSON.parse(JSON.stringify(a)).map(e=>(delete e.quantity,e)),s=y(e,o);return r&&(i.highlightSliceById(11).hasFixedHighlightedSlice(!0).width(r).height(r/1.8).externalRadius(r/5).internalRadius(r/10).on(`customMouseOver`,function(e){s.highlight(e.data.id)}).on(`customMouseOut`,function(){s.highlight(11)}),s.highlight(11),t.datum(a).call(i)),e},T=()=>{let e=c(),t=n(e),r=t.node()?t.node().getBoundingClientRect().width:!1,i=l(),a=h().withFivePlusOther().build();return r&&(i.isAnimated(!0).highlightSliceById(2).width(r).height(r).externalRadius(r/2.5).internalRadius(r/5).isLoading(!0),t.datum(a).call(i)),e},E={title:`Charts/Donut`},D=[`Playground`,`WithAnimationAndLegend`,`WithInlineLegend`,`WithAnimation`,`WithHighlightedSliceChart`,`WithLoadingState`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`args => {
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