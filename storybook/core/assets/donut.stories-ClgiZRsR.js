import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,ft as n,i as r,o as i,pt as a,s as o}from"./index-all-BIfgpmrH.js";import{n as s,r as c,t as l}from"./helpers-CrbXQEV5.js";import{a as u,i as d,n as f,o as p,r as m,t as h}from"./donutChartDataBuilder-1gpwqvvO.js";var g,_,v,y,b,x,S,C,w,T,E,D,O,k,A;function j(){return(j=e((()=>{n(),u(),m(),c(),t(),f(),g=()=>new h,_=g().withFivePlusOther().build(),g().withThreeCategories().build(),v=(e,t,n)=>{let r=d(),i=document.createElement(`div`);return i.classList=`legend-chart-container`,e.appendChild(i),r.width(n).height((t.length+1)*32).numberFormat(`s`),r.render(i,t),r},y=(e,t)=>{let n=d(),r=document.createElement(`div`);r.classList=`legend-chart-container`,e.appendChild(r);let i=a(r),o=i.node()?i.node().getBoundingClientRect().width:!1;return o&&(i.selectAll(`.britechart-legend`).remove(),n.isHorizontal(!0).width(o).markerSize(8).height(40),n.render(i,t)),n},b=(e,t)=>{let n=d(),r=document.createElement(`div`);r.classList=`legend-chart-container`,e.appendChild(r);let i=a(r),o=i.node()?i.node().getBoundingClientRect().width:!1;return o&&(i.selectAll(`.britechart-legend`).remove(),n.width(o).height(100),n.render(i,t)),n},x=e=>{let t=s(),n=p(),i=a(t),o=i.node()?i.node().getBoundingClientRect().width:!1;return o&&(r(n,e).width(o),n.render(i,_),l(t,n,`donut`)),t},x.args=o(p,[`height`,`margin`,`isAnimated`,`colorSchema`,`externalRadius`,`internalRadius`,`radiusHoverOffset`,`hasCenterLegend`,`hasFixedHighlightedSlice`,`hasHoverAnimation`,`hasLastHoverSliceHighlighted`,`highlightSliceById`,`percentageFormat`,`numberFormat`,`isLoading`]),x.args.isAnimated=!1,x.argTypes=i(x.args),S=()=>{let e=s(),t=a(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=p(),i;if(n){let a=n*.55,o=Math.min(a,400);e.style.display=`flex`,e.style.alignItems=`center`,r.isAnimated(!0).highlightSliceById(2).width(a).height(o).externalRadius(o/2.5).internalRadius(o/5).on(`customMouseOver`,e=>{i.highlight(e.data.id)}).on(`customMouseOut`,()=>{i.clearHighlight()}),r.render(t,_),i=v(e,_,n*.4)}return e},C=()=>{let e=s(),t=a(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=p(),i=g().withThreeCategories().build();n&&(r.width(n).height(n/1.8).externalRadius(n/5).internalRadius(n/10).on(`customMouseOver`,e=>{o.highlight(e.data.id)}).on(`customMouseOut`,()=>{o.clearHighlight()}),r.render(t,i));let o=y(e,i);return e},w=()=>{let e=s(),t=p(),n=a(e),r=n.node()?n.node().getBoundingClientRect().width:!1;return r&&(t.isAnimated(!0).width(r),t.render(n,_)),e},T=()=>{let e=s(),t=a(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=p(),i=g().withFourSlices().build(),o=JSON.parse(JSON.stringify(i)).map(e=>(delete e.quantity,e)),c=b(e,o);return n&&(r.highlightSliceById(2).hasFixedHighlightedSlice(!0).width(n).height(n/1.8).externalRadius(n/5).internalRadius(n/10).on(`customMouseOver`,function(e){c.highlight(e.data.id)}).on(`customMouseOut`,function(){c.highlight(2)}),c.highlight(2),r.render(t,i)),e},E=()=>{let e=s(),t=a(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=p();if(n){let i=document.createElement(`p`);i.textContent=`Hover a slice`,r.width(n).height(Math.min(n,400)).externalRadius(100).internalRadius(47).highlightSliceById(1).on(`customMouseOver`,e=>{i.textContent=`Mouse over: ${e.data.name}`}),r.render(t,_),e.appendChild(i)}return e},D=()=>{let e=s(),t=a(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=p(),i=d();if(n){let a=n*.55;e.style.display=`flex`,e.style.alignItems=`center`,r.width(a).height(a*.8).externalRadius(a/3.5).internalRadius(0).hasCenterLegend(!1).a11yTitle(`Visits by source`).on(`customMouseOver`,function(e){i.highlight(e.data.id)}).on(`customMouseOut`,function(){i.clearHighlight()}),r.render(t,_);let o=document.createElement(`div`);e.appendChild(o),i.width(n*.4).height((_.length+1)*32),i.render(o,_)}return e},O=()=>{let e=s(),t=a(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=p(),i=g().withFivePlusOther().build();if(n){let e=Math.min(n,400);r.isAnimated(!0).highlightSliceById(2).width(n).height(e).externalRadius(e/2.5).internalRadius(e/5).isLoading(!0),r.render(t,i)}return e},k={title:`Charts/Donut`},A=[`Playground`,`WithAnimationAndLegend`,`WithInlineLegend`,`WithAnimation`,`WithHighlightedSlice`,`WithHoverEvent`,`WithPieChartFormat`,`WithLoadingState`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`args => {
  const container = getCleanContainer();
  const donutChart = donut();
  const donutContainer = select(container);
  const containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false;
  if (containerWidth) {
    applyArgs(donutChart, args).width(containerWidth);
    donutChart.render(donutContainer, dataset);
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
    donutChart.render(donutContainer, dataset);
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
    donutChart.render(donutContainer, dataset);
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
    donutChart.render(donutContainer, dataset);
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
    donutChart.render(donutContainer, dataset);
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
    donutChart.render(donutContainer, dataset);
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
    pieChart.render(donutContainer, dataset);

    // On the pie's right, with room for each entry: the legend splits its
    // height evenly between them, so a short one stacks the markers
    const legendWrapper = document.createElement('div');
    container.appendChild(legendWrapper);
    legendChart.width(containerWidth * 0.4).height((dataset.length + 1) * 32);
    legendChart.render(legendWrapper, dataset);
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
    donutChart.render(donutContainer, dataset);
  }
  return container;
}`,...O.parameters?.docs?.source}}}})))()}j();export{x as Playground,w as WithAnimation,S as WithAnimationAndLegend,T as WithHighlightedSlice,E as WithHoverEvent,C as WithInlineLegend,O as WithLoadingState,D as WithPieChartFormat,A as __namedExportsOrder,k as default};