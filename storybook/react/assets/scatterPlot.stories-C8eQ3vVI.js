import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-BGJ90fIb.js";import{n as r,p as i,r as a,t as o}from"./useChart-DxJRMu3P.js";import{n as s,t as c}from"./Tooltip-G5e8rweI.js";var l,u;function d(){return(d=t((()=>{l=e(n(),1),a(),o(),u=({chart:e=i,createTooltip:t,data:n,...a})=>{let o=r(e,n,a,{createTooltip:t});return l.createElement(`div`,{className:`scatter-plot-container`,ref:o})},u.__docgenInfo={description:``,methods:[],displayName:`ScatterPlot`,props:{a11yTitle:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`The name screen readers announce for the chart, rendered as its svg's
\`<title>\`. Unset, the chart is announced by its type, such as "Bar chart".`},a11yDescription:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:"A longer description screen readers announce after the name, such as\nwhat the data shows, rendered as the svg's `<desc>`."},data:{required:!0,tsType:{name:`union`,raw:`ScatterPlotDataShape[] | null`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [ScatterPlotKeys.Name]: string;
    [ScatterPlotKeys.X]: number;
    [ScatterPlotKeys.Y]: number;
}`,signature:{properties:[]}}],raw:`ScatterPlotDataShape[]`},{name:`null`}]},description:`Internally used, do not overwrite.

Required. \`null\` means the data has not arrived yet: nothing is drawn
until it does. Leaving it out is an error.`},animationDuration:{required:!1,tsType:{name:`number`},description:`Gets or Sets the duration of the animation`},circleStrokeOpacity:{required:!1,tsType:{name:`number`},description:`Gets or Sets each circle's border opacity value of the chart.
It makes each circle border transparent if it's less than 1.`},circleStrokeWidth:{required:!1,tsType:{name:`number`},description:`Gets or Sets each circle's border width value of the chart.`},circleOpacity:{required:!1,tsType:{name:`number`},description:`Gets or Sets the circles opacity value of the chart.
It makes the area of each data point more transparent if it's less than 1.`},colorMap:{required:!1,tsType:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`},description:`Current colorMap or Chart module to chain calls`},colorSchema:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`Gets or Sets the colorSchema of the chart`},enableZoom:{required:!1,tsType:{name:`boolean`},description:"Gets or Sets whether the chart supports zoom controls. `false` by default.\nIf `true`, zoom event handling will be added to the chart."},grid:{required:!1,tsType:{name:`union`,raw:`'vertical' | 'horizontal' | 'full' | null`,elements:[{name:`literal`,value:`'vertical'`},{name:`literal`,value:`'horizontal'`},{name:`literal`,value:`'full'`},{name:`null`}]},description:`Gets or Sets the grid mode`},hasCrossHairs:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the hasCrossHairs status. If true, the hovered data point
will be highlighted with lines and legend from both x and y axis.`},hasHollowCircles:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the hasHollowCircles value of the chart area`},hasTrendline:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the hasTrendline value of the chart area. If true, the
trendline calculated based off the linear regression formula will be drawn`},height:{required:!1,tsType:{name:`number`},description:`Gets or Sets the height of the chart`},highlightTextLegendOffset:{required:!1,tsType:{name:`number`},description:`Sets a custom distance between the legend values and both axes.
The legends show up when hasCrossHairs is true.`},isAnimated:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the isAnimated property of the chart, making it to animate
when render. By default this is 'false'`},isLoading:{required:!1,tsType:{name:`boolean`},description:`Current loading state flag or Chart module to chain calls`},margin:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}`,signature:{properties:[{key:`top`,value:{name:`number`,required:!1}},{key:`bottom`,value:{name:`number`,required:!1}},{key:`left`,value:{name:`number`,required:!1}},{key:`right`,value:{name:`number`,required:!1}}]}},description:`Gets or Sets the margin of the chart`},maxCircleArea:{required:!1,tsType:{name:`number`},description:`Gets or Sets the maximum area of a circle in the chart`},valueLocale:{required:!1,tsType:{name:`union`,raw:`LocalObject | null`,elements:[{name:`signature`,type:`object`,raw:`{
    decimal?: string;
    thousands?: string;
    grouping?: number[];
    currency?: string[];
    numerals?: string[];
    percent?: string;
    minus?: string;
    nan?: string;
}`,signature:{properties:[{key:`decimal`,value:{name:`string`,required:!1}},{key:`thousands`,value:{name:`string`,required:!1}},{key:`grouping`,value:{name:`Array`,elements:[{name:`number`}],raw:`number[]`,required:!1}},{key:`currency`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`numerals`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`percent`,value:{name:`string`,required:!1}},{key:`minus`,value:{name:`string`,required:!1}},{key:`nan`,value:{name:`string`,required:!1}}]}},{name:`null`}]},description:`Current locale object or Chart module to chain calls`},width:{required:!1,tsType:{name:`number`},description:`Gets or Sets the width of the chart`},xAxisFormat:{required:!1,tsType:{name:`string`},description:`Exposes the ability to set the format of the x-axis values`},xAxisFormatType:{required:!1,tsType:{name:`string`},description:"Exposes the ability to set the formatter of the x-axis values.\nThe `timeFormat` formatter function is applied if a custom `xAxisFormatType`\nthat is not equal to 'number' is provided"},xAxisLabel:{required:!1,tsType:{name:`string`},description:`Gets or Sets the xAxisLabel of the chart`},xAxisLabelOffset:{required:!1,tsType:{name:`number`},description:`Gets or Sets the offset of the xAxisLabel of the chart`},xTicks:{required:!1,tsType:{name:`number`},description:`Gets or Sets the number of ticks of the x axis on the chart`},yAxisFormat:{required:!1,tsType:{name:`string`},description:`Exposes the ability to set the format of the y-axis values`},yAxisLabel:{required:!1,tsType:{name:`string`},description:`Gets or Sets the yAxisLabel of the chart`},yAxisLabelOffset:{required:!1,tsType:{name:`number`},description:`Gets or Sets the offset of the yAxisLabel of the chart`},yTicks:{required:!1,tsType:{name:`number`},description:`Gets or Sets the number of ticks of the y axis on the chart`},customMouseMove:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:`Called with the hovered point ({ name, x, y }), its position [x, y]
and the chart's size [width, height]`},customMouseOver:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:`Called when the pointer enters a point`},customMouseOut:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:`Called when the pointer leaves the chart`},customClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:`Called with the clicked point, its position and the chart's size`},chart:{required:!1,tsType:{name:`Wrapper`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [ScatterPlotKeys.Name]: string;
    [ScatterPlotKeys.X]: number;
    [ScatterPlotKeys.Y]: number;
}`,signature:{properties:[]}}],raw:`ScatterPlotDataShape[]`},{name:`intersection`,raw:`ChartModuleSelection<ScatterPlotDataShape[]> &
ScatterPlotAPI`,elements:[{name:`signature`,type:`function`,raw:`<
    TElement extends Element,
    TParent extends Element | null,
    TParentDatum,
>(
    _selection: Selection<TElement, DataShape, TParent, TParentDatum>
) => void`,signature:{arguments:[{type:{name:`Selection`,elements:[{name:`TElement`},{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [ScatterPlotKeys.Name]: string;
    [ScatterPlotKeys.X]: number;
    [ScatterPlotKeys.Y]: number;
}`,signature:{properties:[]}}],raw:`ScatterPlotDataShape[]`},{name:`TParent`},{name:`TParentDatum`}],raw:`Selection<TElement, DataShape, TParent, TParentDatum>`},name:`_selection`}],return:{name:`void`}}},{name:`ScatterPlotAPI`}]}],raw:`Wrapper<ScatterPlotDataShape[], ScatterPlotModule>`},description:`Internally used, do not overwrite.

@ignore`,defaultValue:{value:`{
    create(el, data, configuration = {}) {
        const container = select<HTMLElement, ScatterPlotDataShape[]>(el);
        const chart = scatterPlot();

        validateContainer(container);
        validateConfiguration(chart, configuration);

        // Calls the chart with the container and dataset
        container.datum(data).call(applyConfiguration(chart, configuration));

        return chart;
    },

    update(el, data, configuration = {}, chart) {
        const container = select<HTMLElement, ScatterPlotDataShape[]>(el);

        validateContainer(container);
        validateConfiguration(chart, configuration);
        applyConfiguration(chart, configuration);

        // Calls the chart with the container and dataset.
        //
        // \`data && data.length\`, so an update with no data -- empty, null or
        // undefined -- keeps whatever is already bound, as every wrapper does.
        if (data && data.length) {
            container.datum(data).call(chart);
        } else {
            container.call(chart);
        }

        return chart;
    },

    destroy: removeChartSvg,
}`,computed:!1}},createTooltip:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Internally used, do not overwrite.

@ignore
@internal`}}}})))()}var f,p,m,h;function g(){return(g=t((()=>{f=()=>[{name:`Ice Cream Sales`,x:14.2,y:215},{name:`Ice Cream Sales`,x:16.4,y:325},{name:`Ice Cream Sales`,x:11.9,y:185},{name:`Ice Cream Sales`,x:15.2,y:332},{name:`Ice Cream Sales`,x:18.5,y:406},{name:`Ice Cream Sales`,x:22.1,y:522},{name:`Ice Cream Sales`,x:19.4,y:412},{name:`Ice Cream Sales`,x:25.1,y:614},{name:`Ice Cream Sales`,x:23.4,y:544},{name:`Ice Cream Sales`,x:18.1,y:421},{name:`Ice Cream Sales`,x:22.6,y:445},{name:`Ice Cream Sales`,x:17.2,y:408}],p=()=>[{name:`radiating`,x:112,y:47},{name:`reflecting`,x:374,y:112},{name:`blazing`,x:295,y:250},{name:`reflecting`,x:195,y:168},{name:`vivid`,x:195,y:138},{name:`radiating`,x:197,y:173},{name:`vivid`,x:137,y:213},{name:`radiating`,x:317,y:313}],m=()=>[{name:`Temperature delta`,x:-12.4,y:-30},{name:`Temperature delta`,x:-8.1,y:45},{name:`Temperature delta`,x:-4.6,y:-12},{name:`Temperature delta`,x:-1.2,y:28},{name:`Temperature delta`,x:2.5,y:-40},{name:`Temperature delta`,x:5.9,y:15},{name:`Temperature delta`,x:9.3,y:-22},{name:`Temperature delta`,x:12.8,y:52},{name:`Temperature delta`,x:16.1,y:-8},{name:`Temperature delta`,x:19.7,y:36},{name:`Temperature delta`,x:23.2,y:-55},{name:`Temperature delta`,x:26.6,y:18}],h={withOneSource:f,withFourNames:p,withNegativeValues:m}})))()}var _,v,y,b,x,S,C,w,T;function E(){return(E=t((()=>{_=e(n(),1),d(),s(),g(),v={title:`Charts/ScatterPlot`,component:u},y=e=>{let t=h.withOneSource();return _.createElement(c,{data:t,render:n=>_.createElement(u,{...e,...n,data:t}),title:`Temperature (C)`,nameLabel:`x`,valueLabel:`y`,numberFormat:`$`})},y.args={isAnimated:!1},y.parameters={controls:{exclude:[`data`,`chart`,`createTooltip`]}},b=()=>{let e=h.withOneSource();return _.createElement(u,{data:e,isAnimated:!0,circleOpacity:.6,hasTrendline:!0,grid:`horizontal`,margin:{top:20,right:20,bottom:50,left:60},xAxisFormat:`.1f`,xAxisLabel:`Temperature (C)`,yAxisFormat:`$`,yAxisLabel:`Ice Cream Sales`})},x=()=>{let e=h.withOneSource();return _.createElement(c,{data:e,render:t=>_.createElement(u,{isAnimated:!0,...t,data:e}),title:`Temperature (C)`,nameLabel:`x`,valueLabel:`y`,numberFormat:`$`})},S=()=>{let e=h.withFourNames();return _.createElement(u,{data:e,isAnimated:!0,hasCrossHairs:!0,hasHollowCircles:!0,maxCircleArea:15,margin:{top:20,right:20,bottom:45,left:60}})},C=()=>{let e=h.withNegativeValues();return _.createElement(u,{data:e,isAnimated:!0,height:400})},w=()=>_.createElement(u,{data:[],isLoading:!0}),y.__docgenInfo={description:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart,
with its tooltip.`,methods:[],displayName:`Playground`},b.__docgenInfo={description:``,methods:[],displayName:`WithTrendlineAndGrid`},x.__docgenInfo={description:``,methods:[],displayName:`WithAnimation`},S.__docgenInfo={description:``,methods:[],displayName:`WithCrossHairsAndHollowCircles`},C.__docgenInfo={description:``,methods:[],displayName:`WithNegativeValues`},w.__docgenInfo={description:``,methods:[],displayName:`WithLoadingState`},T=[`Playground`,`WithTrendlineAndGrid`,`WithAnimation`,`WithCrossHairsAndHollowCircles`,`WithNegativeValues`,`WithLoadingState`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`args => {
  const data = scatterPlotData.withOneSource();
  const renderScatterPlot = (props: TooltipRenderArgs) => <ScatterPlot {...args} {...props} data={data} />;

  // The chart dispatches the hovered point as { name, x, y }: the tooltip
  // shows a single value, the y, titled with the x
  return <Tooltip data={data} render={renderScatterPlot} title="Temperature (C)" nameLabel="x" valueLabel="y" numberFormat="$" />;
}`,...y.parameters?.docs?.source},description:{story:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart,
with its tooltip.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => {
  const data = scatterPlotData.withOneSource();
  return <ScatterPlot data={data} isAnimated={true} circleOpacity={0.6} hasTrendline={true} grid="horizontal" margin={{
    top: 20,
    right: 20,
    bottom: 50,
    left: 60
  }} xAxisFormat=".1f" xAxisLabel="Temperature (C)" yAxisFormat="$" yAxisLabel="Ice Cream Sales" />;
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  const data = scatterPlotData.withOneSource();
  const renderScatterPlot = (props: TooltipRenderArgs) => <ScatterPlot isAnimated={true} {...props} data={data} />;

  // The chart dispatches the hovered point as { name, x, y }: the tooltip
  // shows a single value, the y, titled with the x
  return <Tooltip data={data} render={renderScatterPlot} title="Temperature (C)" nameLabel="x" valueLabel="y" numberFormat="$" />;
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
  const data = scatterPlotData.withFourNames();
  return <ScatterPlot data={data} isAnimated={true} hasCrossHairs={true} hasHollowCircles={true} maxCircleArea={15} margin={{
    top: 20,
    right: 20,
    bottom: 45,
    left: 60
  }} />;
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => {
  const data = scatterPlotData.withNegativeValues();
  return <ScatterPlot data={data} isAnimated={true} height={400} />;
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`() => {
  const data: [] = [];
  return <ScatterPlot data={data} isLoading={true} />;
}`,...w.parameters?.docs?.source}}}})))()}E();export{y as Playground,x as WithAnimation,S as WithCrossHairsAndHollowCircles,w as WithLoadingState,C as WithNegativeValues,b as WithTrendlineAndGrid,T as __namedExportsOrder,v as default};