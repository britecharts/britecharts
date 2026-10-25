import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,dt as n,i as r,o as i,s as a,ut as o}from"./index-all-DhiTiQVV.js";import{n as s,r as c}from"./helpers-CrbXQEV5.js";import{a as l,i as u,n as d,o as f,r as p,t as m}from"./donutChartDataBuilder-BfF1JjXs.js";var h,g,_,v,y,b,x,S,C,w;function T(){return(T=e((()=>{o(),l(),p(),c(),t(),d(),h=()=>new m,g=(e,t,r)=>{let i=u(),a=document.createElement(`div`);a.classList=`legend-chart-container`,e.appendChild(a);let o=n(a),s=o.node()?o.node().getBoundingClientRect().width:!1;return s&&(o.selectAll(`.britechart-legend`).remove(),i.isHorizontal(!0).width(s*.6).height(30),r&&i.markerSize(r),o.datum(t).call(i)),i},_=(e,t)=>{let r=u(),i=document.createElement(`div`);i.classList=`legend-chart-container`,e.appendChild(i);let a=n(i),o=a.node()?a.node().getBoundingClientRect().width:!1;return o&&(a.selectAll(`.britechart-legend`).remove(),r.width(o/2).height(200),a.datum(t).call(r)),r},v=e=>{let t=s(),i=u(),a=n(t),o=a.node()?a.node().getBoundingClientRect().width:!1;if(o){let t=h().withFivePlusOther().build();r(i,e).width(o),a.datum(t).call(i)}return t},v.args=a(u,[`height`,`margin`,`colorSchema`,`isHorizontal`,`marginRatio`,`markerSize`,`unit`,`numberFormat`,`highlightEntryById`]),v.argTypes=i(v.args),y=()=>{let e=s(),t=h().withFivePlusOther().build();return _(e,t),e},b=()=>{let e=s(),t=h().withFivePlusOther().build();return g(e,t),e},x=()=>{let e=s(),t=h().withFivePlusOther().build();return g(e,t,8),e},S=()=>{let e=s(),t=n(e),r=t.node()?t.node().getBoundingClientRect().width:!1,i=f(),a=h().withFourSlices().build(),o=JSON.parse(JSON.stringify(a)).map(e=>(delete e.quantity,e)),c=_(e,o);return r&&(i.highlightSliceById(2).hasFixedHighlightedSlice(!0).width(r).height(r/1.8).externalRadius(r/5).internalRadius(r/10).on(`customMouseOver`,function(e){c.highlight(e.data.id)}).on(`customMouseOut`,function(){c.highlight(2)}),c.highlight(2),t.datum(a).call(i)),e},C={title:`Charts/Legend`},w=[`Playground`,`WithStackDirection`,`WithInlineDirection`,`WithInlineDirectionAndSmallerMarkers`,`WithDonutBounded`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`args => {
  const container = getCleanContainer();
  const legendChart = legend();
  const legendContainer = select(container);
  const containerWidth = legendContainer.node() ? legendContainer.node().getBoundingClientRect().width : false;
  if (containerWidth) {
    const dataset = aTestDataSet().withFivePlusOther().build();
    applyArgs(legendChart, args).width(containerWidth);
    legendContainer.datum(dataset).call(legendChart);
  }
  return container;
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const dataset = aTestDataSet().withFivePlusOther().build();
  getVerticalLegendChart(container, dataset);
  return container;
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const dataset = aTestDataSet().withFivePlusOther().build();
  getInlineLegendChart(container, dataset);
  return container;
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const dataset = aTestDataSet().withFivePlusOther().build();
  getInlineLegendChart(container, dataset, 8);
  return container;
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
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
}`,...S.parameters?.docs?.source}}}})))()}T();export{v as Playground,S as WithDonutBounded,b as WithInlineDirection,x as WithInlineDirectionAndSmallerMarkers,y as WithStackDirection,w as __namedExportsOrder,C as default};