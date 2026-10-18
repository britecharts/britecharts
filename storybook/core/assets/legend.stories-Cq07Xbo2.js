import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,at as n,i as r,o as i,ot as a,s as o}from"./index-all-C7qQZ8XB.js";import{n as s,t as c}from"./helpers-Dyqi9w-G.js";import{i as l,n as u,r as d,t as f}from"./donutChartDataBuilder-0NN5rE9_.js";import{n as p,t as m}from"./legend-0MV5mdjA.js";var h,g,_,v,y,b,x,S,C;function w(){return(w=e((()=>{n(),d(),m(),s(),t(),u(),h=()=>new f,g=(e,t)=>{let n=p(),r=document.createElement(`div`);r.classList=`legend-chart-container`,e.appendChild(r);let i=a(r),o=i.node()?i.node().getBoundingClientRect().width:!1;return o&&(i.selectAll(`.britechart-legend`).remove(),n.isHorizontal(!0).width(o*.6).markerSize(8).height(30),i.datum(t).call(n)),n},_=(e,t)=>{let n=p(),r=document.createElement(`div`);r.classList=`legend-chart-container`,e.appendChild(r);let i=a(r),o=i.node()?i.node().getBoundingClientRect().width:!1;return o&&(i.selectAll(`.britechart-legend`).remove(),n.width(o/2).height(200),i.datum(t).call(n)),n},v=e=>{let t=c(),n=p(),i=a(t),o=i.node()?i.node().getBoundingClientRect().width:!1;if(o){let t=h().withFivePlusOther().build();r(n,e).width(o),i.datum(t).call(n)}return t},v.args=o(p,[`height`,`margin`,`colorSchema`,`isHorizontal`,`marginRatio`,`markerSize`,`unit`,`numberFormat`,`highlightEntryById`]),v.argTypes=i(v.args),y=()=>{let e=c(),t=h().withFivePlusOther().build();return _(e,t),e},b=()=>{let e=c(),t=h().withThreeCategories().build();return g(e,t),e},x=()=>{let e=c(),t=a(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=l(),i=h().withThreeCategories().build(),o=JSON.parse(JSON.stringify(i)).map(e=>(delete e.quantity,e)),s=_(e,o);return n&&(r.highlightSliceById(11).hasFixedHighlightedSlice(!0).width(n).height(n/1.8).externalRadius(n/5).internalRadius(n/10).on(`customMouseOver`,function(e){s.highlight(e.data.id)}).on(`customMouseOut`,function(){s.highlight(11)}),s.highlight(11),t.datum(i).call(r)),e},S={title:`Charts/Legend`},C=[`Playground`,`WithStackDirection`,`WithInlineDirection`,`WithDonutBounded`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`args => {
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
  const legendChart = getVerticalLegendChart(container, dataset);
  return container;
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const dataset = aTestDataSet().withThreeCategories().build();
  const legendChart = getInlineLegendChart(container, dataset);
  return container;
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
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
}`,...x.parameters?.docs?.source}}}})))()}w();export{v as Playground,x as WithDonutBounded,b as WithInlineDirection,y as WithStackDirection,C as __namedExportsOrder,S as default};