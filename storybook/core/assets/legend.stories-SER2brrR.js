import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,i as n,o as r,ot as i,s as a,st as o}from"./index-all-BPoXWgX4.js";import{n as s,r as c}from"./helpers-CrbXQEV5.js";import{a as l,i as u,n as d,o as f,r as p,t as m}from"./donutChartDataBuilder-C0aDbSlR.js";var h,g,_,v,y,b,x,S,C;function w(){return(w=e((()=>{i(),l(),p(),c(),t(),d(),h=()=>new m,g=(e,t)=>{let n=u(),r=document.createElement(`div`);r.classList=`legend-chart-container`,e.appendChild(r);let i=o(r),a=i.node()?i.node().getBoundingClientRect().width:!1;return a&&(i.selectAll(`.britechart-legend`).remove(),n.isHorizontal(!0).width(a*.6).markerSize(8).height(30),i.datum(t).call(n)),n},_=(e,t)=>{let n=u(),r=document.createElement(`div`);r.classList=`legend-chart-container`,e.appendChild(r);let i=o(r),a=i.node()?i.node().getBoundingClientRect().width:!1;return a&&(i.selectAll(`.britechart-legend`).remove(),n.width(a/2).height(200),i.datum(t).call(n)),n},v=e=>{let t=s(),r=u(),i=o(t),a=i.node()?i.node().getBoundingClientRect().width:!1;if(a){let t=h().withFivePlusOther().build();n(r,e).width(a),i.datum(t).call(r)}return t},v.args=a(u,[`height`,`margin`,`colorSchema`,`isHorizontal`,`marginRatio`,`markerSize`,`unit`,`numberFormat`,`highlightEntryById`]),v.argTypes=r(v.args),y=()=>{let e=s(),t=h().withFivePlusOther().build();return _(e,t),e},b=()=>{let e=s(),t=h().withThreeCategories().build();return g(e,t),e},x=()=>{let e=s(),t=o(e),n=t.node()?t.node().getBoundingClientRect().width:!1,r=f(),i=h().withThreeCategories().build(),a=JSON.parse(JSON.stringify(i)).map(e=>(delete e.quantity,e)),c=_(e,a);return n&&(r.highlightSliceById(11).hasFixedHighlightedSlice(!0).width(n).height(n/1.8).externalRadius(n/5).internalRadius(n/10).on(`customMouseOver`,function(e){c.highlight(e.data.id)}).on(`customMouseOut`,function(){c.highlight(11)}),c.highlight(11),t.datum(i).call(r)),e},S={title:`Charts/Legend`},C=[`Playground`,`WithStackDirection`,`WithInlineDirection`,`WithDonutBounded`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`args => {
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