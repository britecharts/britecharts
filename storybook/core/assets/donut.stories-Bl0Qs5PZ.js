import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,dt as n,i as r,o as i,s as a,ut as o}from"./index-all-DhiTiQVV.js";import{n as s,r as c,t as l}from"./helpers-CrbXQEV5.js";import{a as u,i as d,n as f,o as p,r as m,t as h}from"./donutChartDataBuilder-BfF1JjXs.js";var g,_,v,y,b,x,S,C,w,T,E,D,O,k,A;function j(){return(j=e((()=>{o(),u(),m(),c(),t(),f(),g=()=>new h,_=g().withFivePlusOther().build(),g().withThreeCategories().build(),v=(e,t,r)=>{let i=d(),a=document.createElement(`div`);return a.classList=`legend-chart-container`,e.appendChild(a),i.width(r).height((t.length+1)*32).numberFormat(`s`),n(a).datum(t).call(i),i},y=(e,t)=>{let r=d(),i=document.createElement(`div`);i.classList=`legend-chart-container`,e.appendChild(i);let a=n(i),o=a.node()?a.node().getBoundingClientRect().width:!1;return o&&(a.selectAll(`.britechart-legend`).remove(),r.isHorizontal(!0).width(o).markerSize(8).height(40),a.datum(t).call(r)),r},b=(e,t)=>{let r=d(),i=document.createElement(`div`);i.classList=`legend-chart-container`,e.appendChild(i);let a=n(i),o=a.node()?a.node().getBoundingClientRect().width:!1;return o&&(a.selectAll(`.britechart-legend`).remove(),r.width(o).height(100),a.datum(t).call(r)),r},x=e=>{let t=s(),i=p(),a=n(t),o=a.node()?a.node().getBoundingClientRect().width:!1;return o&&(r(i,e).width(o),a.datum(_).call(i),l(t,i,`donut`)),t},x.args=a(p,[`height`,`margin`,`isAnimated`,`colorSchema`,`externalRadius`,`internalRadius`,`radiusHoverOffset`,`hasCenterLegend`,`hasFixedHighlightedSlice`,`hasHoverAnimation`,`hasLastHoverSliceHighlighted`,`highlightSliceById`,`percentageFormat`,`numberFormat`,`isLoading`]),x.args.isAnimated=!1,x.argTypes=i(x.args),S=()=>{let e=s(),t=n(e),r=t.node()?t.node().getBoundingClientRect().width:!1,i=p(),a;if(r){let n=r*.55,o=Math.min(n,400);e.style.display=`flex`,e.style.alignItems=`center`,i.isAnimated(!0).highlightSliceById(2).width(n).height(o).externalRadius(o/2.5).internalRadius(o/5).on(`customMouseOver`,e=>{a.highlight(e.data.id)}).on(`customMouseOut`,()=>{a.clearHighlight()}),t.datum(_).call(i),a=v(e,_,r*.4)}return e},C=()=>{let e=s(),t=n(e),r=t.node()?t.node().getBoundingClientRect().width:!1,i=p(),a=g().withThreeCategories().build();r&&(i.width(r).height(r/1.8).externalRadius(r/5).internalRadius(r/10).on(`customMouseOver`,e=>{o.highlight(e.data.id)}).on(`customMouseOut`,()=>{o.clearHighlight()}),t.datum(a).call(i));let o=y(e,a);return e},w=()=>{let e=s(),t=p(),r=n(e),i=r.node()?r.node().getBoundingClientRect().width:!1;return i&&(t.isAnimated(!0).width(i),r.datum(_).call(t)),e},T=()=>{let e=s(),t=n(e),r=t.node()?t.node().getBoundingClientRect().width:!1,i=p(),a=g().withFourSlices().build(),o=JSON.parse(JSON.stringify(a)).map(e=>(delete e.quantity,e)),c=b(e,o);return r&&(i.highlightSliceById(2).hasFixedHighlightedSlice(!0).width(r).height(r/1.8).externalRadius(r/5).internalRadius(r/10).on(`customMouseOver`,function(e){c.highlight(e.data.id)}).on(`customMouseOut`,function(){c.highlight(2)}),c.highlight(2),t.datum(a).call(i)),e},E=()=>{let e=s(),t=n(e),r=t.node()?t.node().getBoundingClientRect().width:!1,i=p();if(r){let n=document.createElement(`p`);n.textContent=`Hover a slice`,i.width(r).height(Math.min(r,400)).externalRadius(100).internalRadius(47).highlightSliceById(1).on(`customMouseOver`,e=>{n.textContent=`Mouse over: ${e.data.name}`}),t.datum(_).call(i),e.appendChild(n)}return e},D=()=>{let e=s(),t=n(e),r=t.node()?t.node().getBoundingClientRect().width:!1,i=p(),a=d();if(r){let o=r*.55;e.style.display=`flex`,e.style.alignItems=`center`,i.width(o).height(o*.8).externalRadius(o/3.5).internalRadius(0).hasCenterLegend(!1).a11yTitle(`Visits by source`).on(`customMouseOver`,function(e){a.highlight(e.data.id)}).on(`customMouseOut`,function(){a.clearHighlight()}),t.datum(_).call(i);let s=document.createElement(`div`);e.appendChild(s),a.width(r*.4).height((_.length+1)*32),n(s).datum(_).call(a)}return e},O=()=>{let e=s(),t=n(e),r=t.node()?t.node().getBoundingClientRect().width:!1,i=p(),a=g().withFivePlusOther().build();if(r){let e=Math.min(r,400);i.isAnimated(!0).highlightSliceById(2).width(r).height(e).externalRadius(e/2.5).internalRadius(e/5).isLoading(!0),t.datum(a).call(i)}return e},k={title:`Charts/Donut`},A=[`Playground`,`WithAnimationAndLegend`,`WithInlineLegend`,`WithAnimation`,`WithHighlightedSlice`,`WithHoverEvent`,`WithPieChartFormat`,`WithLoadingState`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`args => {
  const container = getCleanContainer();
  const donutChart = donut();
  const donutContainer = select(container);
  const containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false;
  if (containerWidth) {
    applyArgs(donutChart, args).width(containerWidth);
    donutContainer.datum(dataset).call(donutChart);
    addExportButtons(container, donutChart, 'donut');
  }
  return container;
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const donutContainer = select(container);
  const containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false;
  const donutChart = donut();
  let legendChart;
  if (containerWidth) {
    const chartWidth = containerWidth * 0.55;
    // Capped, so a wide canvas does not draw a ring as wide as itself
    const chartHeight = Math.min(chartWidth, 400);

    // The donut and its legend side by side
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    donutChart.isAnimated(true).highlightSliceById(2).width(chartWidth).height(chartHeight).externalRadius(chartHeight / 2.5).internalRadius(chartHeight / 5).on('customMouseOver', data => {
      legendChart.highlight(data.data.id);
    }).on('customMouseOut', () => {
      legendChart.clearHighlight();
    });
    donutContainer.datum(dataset).call(donutChart);
    legendChart = getLegendChart(container, dataset, containerWidth * 0.4);
  }
  return container;
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => {
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
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const donutChart = donut();
  const donutContainer = select(container);
  const containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false;
  if (containerWidth) {
    donutChart.isAnimated(true).width(containerWidth);
    donutContainer.datum(dataset).call(donutChart);
  }
  return container;
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const donutContainer = select(container);
  const containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false;
  const donutChart = donut();
  const dataset = aTestDataSet().withFourSlices().build();
  const fixedSlice = 2;
  const dataNoQuantity = JSON.parse(JSON.stringify(dataset)).map(item => {
    delete item.quantity;
    return item;
  });
  const legendChart = getVerticalLegendChart(container, dataNoQuantity);
  if (containerWidth) {
    donutChart.highlightSliceById(fixedSlice).hasFixedHighlightedSlice(true).width(containerWidth).height(containerWidth / 1.8).externalRadius(containerWidth / 5).internalRadius(containerWidth / 10).on('customMouseOver', function (slice) {
      legendChart.highlight(slice.data.id);
    }).on('customMouseOut', function () {
      legendChart.highlight(fixedSlice);
    });
    legendChart.highlight(fixedSlice);
    donutContainer.datum(dataset).call(donutChart);
  }
  return container;
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const donutContainer = select(container);
  const containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false;
  const donutChart = donut();
  if (containerWidth) {
    const status = document.createElement('p');
    status.textContent = 'Hover a slice';
    donutChart.width(containerWidth).height(Math.min(containerWidth, 400)).externalRadius(100).internalRadius(47).highlightSliceById(1).on('customMouseOver', slice => {
      status.textContent = \`Mouse over: \${slice.data.name}\`;
    });
    donutContainer.datum(dataset).call(donutChart);
    container.appendChild(status);
  }
  return container;
}`,...E.parameters?.docs?.source},description:{story:"Hovering a slice reports it through `customMouseOver`: here, in the line\nunder the chart.",...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const donutContainer = select(container);
  const containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false;
  const pieChart = donut();
  const legendChart = legend();
  if (containerWidth) {
    const pieWidth = containerWidth * 0.55;

    // The pie and its legend side by side
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    pieChart.width(pieWidth).height(pieWidth * 0.8).externalRadius(pieWidth / 3.5).internalRadius(0).hasCenterLegend(false).a11yTitle('Visits by source').on('customMouseOver', function (slice) {
      legendChart.highlight(slice.data.id);
    }).on('customMouseOut', function () {
      legendChart.clearHighlight();
    });
    donutContainer.datum(dataset).call(pieChart);

    // On the pie's right, with room for each entry: the legend splits its
    // height evenly between them, so a short one stacks the markers
    const legendWrapper = document.createElement('div');
    container.appendChild(legendWrapper);
    legendChart.width(containerWidth * 0.4).height((dataset.length + 1) * 32);
    select(legendWrapper).datum(dataset).call(legendChart);
  }
  return container;
}`,...D.parameters?.docs?.source},description:{story:"A pie chart is a donut without a hole: `internalRadius(0)`. With no hole,\nthere is no room for the centred text, so `hasCenterLegend(false)` turns it\noff and the legend on its right names each slice, highlighting the one\nunder the pointer.",...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const donutContainer = select(container);
  const containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false;
  const donutChart = donut();
  const dataset = aTestDataSet().withFivePlusOther().build();
  if (containerWidth) {
    // Capped, so a wide canvas does not draw a ring as wide as itself
    const chartHeight = Math.min(containerWidth, 400);
    donutChart.isAnimated(true).highlightSliceById(2).width(containerWidth).height(chartHeight).externalRadius(chartHeight / 2.5).internalRadius(chartHeight / 5).isLoading(true);
    donutContainer.datum(dataset).call(donutChart);
  }
  return container;
}`,...O.parameters?.docs?.source}}}})))()}j();export{x as Playground,w as WithAnimation,S as WithAnimationAndLegend,T as WithHighlightedSlice,E as WithHoverEvent,C as WithInlineLegend,O as WithLoadingState,D as WithPieChartFormat,A as __namedExportsOrder,k as default};