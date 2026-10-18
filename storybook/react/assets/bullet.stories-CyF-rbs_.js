import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-BGJ90fIb.js";import{S as r,n as i,r as a,t as o}from"./useChart-2_dA5eeG.js";var s,c;function l(){return(l=t((()=>{s=e(n(),1),a(),o(),c=({chart:e=r,createTooltip:t,data:n,...a})=>{let o=i(e,n,a,{createTooltip:t});return s.createElement(`div`,{className:`bullet-container`,ref:o})},c.__docgenInfo={description:``,methods:[],displayName:`Bullet`,props:{a11yTitle:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`The name screen readers announce for the chart, set as its svg's
\`aria-label\`. Unset, the chart is announced by its type, such as "Bar chart".`},a11yDescription:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:"A longer description screen readers announce after the name, such as\nwhat the data shows, rendered as the svg's `<desc>`."},data:{required:!0,tsType:{name:`union`,raw:`BulletChartDataShape[] | null`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [BulletChartKeys.Ranges]: [number?, number?, number?];
    [BulletChartKeys.Measures]: [number?, number?, number?];
    [BulletChartKeys.Markers]: [number?];
}`,signature:{properties:[]}}],raw:`BulletChartDataShape[]`},{name:`null`}]},description:`Internally used, do not overwrite.

Required. \`null\` means the data has not arrived yet: nothing is drawn
until it does. Leaving it out is an error.`},colorSchema:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`Gets or Sets the colorSchema of the chart. The first color from the array will be applied to range bars (the wider bars). The second color from the array will be applied to measure bars (the narrow bars) and marker lines.`},height:{required:!1,tsType:{name:`number`},description:`Gets or Sets the height of the chart`},isLoading:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets whether a loading state will be shown`},isReverse:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the isReverse status of the chart. If true, the elements will be rendered in reverse order.`},margin:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{ top?: number; bottom?: number; left?: number; right?: number }`,signature:{properties:[{key:`top`,value:{name:`number`,required:!1}},{key:`bottom`,value:{name:`number`,required:!1}},{key:`left`,value:{name:`number`,required:!1}},{key:`right`,value:{name:`number`,required:!1}}]}},description:`Gets or Sets the margin of the chart`},numberFormat:{required:!1,tsType:{name:`string`},description:`Gets or Sets the number format of the bar chart`},paddingBetweenAxisAndChart:{required:!1,tsType:{name:`number`},description:`Space between axis and chart`},startMaxRangeOpacity:{required:!1,tsType:{name:`number`},description:`Gets or Sets the starting point of the capacity range.
Default is 0.5`},ticks:{required:!1,tsType:{name:`number`},description:`Gets or Sets the number of ticks of the x axis on the chart
Default is 5`},width:{required:!1,tsType:{name:`number`},description:`Gets or Sets the width of the chart`},chart:{required:!1,tsType:{name:`Wrapper`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [BulletChartKeys.Ranges]: [number?, number?, number?];
    [BulletChartKeys.Measures]: [number?, number?, number?];
    [BulletChartKeys.Markers]: [number?];
}`,signature:{properties:[]}}],raw:`BulletChartDataShape[]`},{name:`intersection`,raw:`ChartModuleSelection<BulletChartDataShape> &
BulletChartAPI`,elements:[{name:`signature`,type:`function`,raw:`<
    TElement extends Element,
    TParent extends Element | null,
    TParentDatum,
>(
    _selection: Selection<TElement, DataShape, TParent, TParentDatum>
) => void`,signature:{arguments:[{type:{name:`Selection`,elements:[{name:`TElement`},{name:`signature`,type:`object`,raw:`{
    [BulletChartKeys.Ranges]: [number?, number?, number?];
    [BulletChartKeys.Measures]: [number?, number?, number?];
    [BulletChartKeys.Markers]: [number?];
}`,signature:{properties:[]}},{name:`TParent`},{name:`TParentDatum`}],raw:`Selection<TElement, DataShape, TParent, TParentDatum>`},name:`_selection`}],return:{name:`void`}}},{name:`BulletChartAPI`}]}],raw:`Wrapper<BulletChartDataShape[], BulletChartModule>`},description:`Internally used, do not overwrite.

@ignore`,defaultValue:{value:`{
    create(el, data, configuration = {}) {
        const container = select<HTMLElement, BulletChartDataShape>(el);
        const chart = bullet();

        validateContainer(container);
        validateConfiguration(chart, configuration);

        // Calls the chart with the container and dataset
        container.datum(data[0]).call(applyConfiguration(chart, configuration));

        return chart;
    },

    update(el, data, configuration = {}, chart) {
        const container = select<HTMLElement, BulletChartDataShape>(el);

        validateContainer(container);
        validateConfiguration(chart, configuration);
        applyConfiguration(chart, configuration);

        // Calls the chart with the container and dataset
        if (data && data.length) {
            container.datum(data[0]).call(chart);
        } else {
            container.call(chart);
        }

        return chart;
    },

    destroy: removeChartSvg,
}`,computed:!1}},createTooltip:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Internally used, do not overwrite.

Asked for again after each update, so a tooltip can be attached to the
chart the wrapper has just drawn.

@ignore`}}}})))()}var u,d,f,p;function m(){return(m=t((()=>{u=()=>[{ranges:[130,160,250],measures:[150,180],markers:[175]}],d=()=>[{ranges:[130],measures:[150],markers:[105]}],f=()=>[{ranges:[50,100],measures:[25],markers:[]}],p={fullTestData:u,partialTestData:d,underRangeNoMarker:f}})))()}var h,g,_,v,y,b;function x(){return(x=t((()=>{h=e(n(),1),l(),m(),g={title:`Charts/Bullet`,component:c},_=e=>{let t=p.fullTestData();return h.createElement(c,{...e,data:t})},_.parameters={controls:{exclude:[`data`,`chart`,`createTooltip`]}},v=()=>{let e=p.underRangeNoMarker();return h.createElement(c,{data:e})},y=()=>{let e=p.fullTestData();return h.createElement(c,{data:e,isLoading:!0})},_.__docgenInfo={description:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,methods:[],displayName:`Playground`},v.__docgenInfo={description:``,methods:[],displayName:`WithMeasureUnderRanges`},y.__docgenInfo={description:``,methods:[],displayName:`WithLoadingState`},b=[`Playground`,`WithMeasureUnderRanges`,`WithLoadingState`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`args => {
  const data = bulletData.fullTestData();
  return <Bullet {...args} data={data} />;
}`,..._.parameters?.docs?.source},description:{story:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => {
  const data = bulletData.underRangeNoMarker();
  return <Bullet data={data} />;
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  const data = bulletData.fullTestData();
  return <Bullet data={data} isLoading={true} />;
}`,...y.parameters?.docs?.source}}}})))()}x();export{_ as Playground,y as WithLoadingState,v as WithMeasureUnderRanges,b as __namedExportsOrder,g as default};