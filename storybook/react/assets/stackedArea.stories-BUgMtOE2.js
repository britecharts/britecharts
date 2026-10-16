import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-BGJ90fIb.js";import{l as r,n as i,r as a,t as o}from"./useChart-DxJRMu3P.js";import{n as s,t as c}from"./Tooltip-G5e8rweI.js";var l,u;function d(){return(d=t((()=>{l=e(n(),1),a(),o(),u=({chart:e=r,createTooltip:t,data:n,...a})=>{let o=i(e,n,a,{createTooltip:t});return l.createElement(`div`,{className:`stacked-area-container`,ref:o})},u.__docgenInfo={description:``,methods:[],displayName:`StackedArea`,props:{a11yTitle:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`The name screen readers announce for the chart, rendered as its svg's
\`<title>\`. Unset, the chart is announced by its type, such as "Bar chart".`},a11yDescription:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:"A longer description screen readers announce after the name, such as\nwhat the data shows, rendered as the svg's `<desc>`."},data:{required:!0,tsType:{name:`union`,raw:`StackedAreaChartDataShape[] | null`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [StackedAreaChartKeys.Date]: string;
    [StackedAreaChartKeys.Name]: string;
    [StackedAreaChartKeys.Value]: number;
}`,signature:{properties:[]}}],raw:`StackedAreaChartDataShape[]`},{name:`null`}]},description:`Internally used, do not overwrite.

Required. \`null\` means the data has not arrived yet: nothing is drawn
until it does. Leaving it out is an error.`},animationDuration:{required:!1,tsType:{name:`number`},description:`Gets or Sets the duration of the animation`},areaCurve:{required:!1,tsType:{name:`string`},description:`Gets or Sets the area curve of the stacked area.`},areaOpacity:{required:!1,tsType:{name:`number`},description:`Gets or Sets the opacity of the stacked areas in the chart
(all of them will have the same opacity)`},colorMap:{required:!1,tsType:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`},description:`Current colorMap or Chart module to chain calls`},colorSchema:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`Gets or Sets the colorSchema of the chart`},dateLabel:{required:!1,tsType:{name:`string`},description:`Gets or Sets the dateLabel of the chart`},emptyDataConfig:{required:!1,tsType:{name:`StackedAreaEmptyDataConfig`},description:`Gets or Sets the emptyDataConfig of the chart`},exportChart:{required:!1,tsType:{name:`string`},description:`The filename to export the chart to. Setting it exports a png and fires
a download, which is what the chart's \`exportChart\` command does; it is
not a callback.`},grid:{required:!1,tsType:{name:`union`,raw:`'vertical' | 'horizontal' | 'full' | null`,elements:[{name:`literal`,value:`'vertical'`},{name:`literal`,value:`'horizontal'`},{name:`literal`,value:`'full'`},{name:`null`}]},description:`Gets or Sets the grid mode.`},hasOutline:{required:!1,tsType:{name:`boolean`},description:`Enables or disables the outline at the top of the areas.
By default this is 'true'`},height:{required:!1,tsType:{name:`number`},description:`Gets or Sets the height of the chart`},isAnimated:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the isAnimated property of the chart, making it to animate
when render. By default this is 'false'`},isLoading:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets whether a loading state will be shown`},keyLabel:{required:!1,tsType:{name:`string`},description:`Gets or Sets the keyLabel of the chart`},locale:{required:!1,tsType:{name:`string`},description:`Pass language tag for the tooltip to localize the date. Feature
uses Intl.DateTimeFormat, for compatability and support, refer
to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat`},margin:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}`,signature:{properties:[{key:`top`,value:{name:`number`,required:!1}},{key:`bottom`,value:{name:`number`,required:!1}},{key:`left`,value:{name:`number`,required:!1}},{key:`right`,value:{name:`number`,required:!1}}]}},description:`Gets or Sets the margin of the chart`},tooltipThreshold:{required:!1,tsType:{name:`number`},description:`Gets or Sets the minimum width of the graph in order
to show the tooltip NOTE: This could also depend on the aspect ratio`},topicsOrder:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`Pass an override for the ordering of the topics`},valueLabel:{required:!1,tsType:{name:`string`},description:`Gets or Sets the valueLabel of the chart`},width:{required:!1,tsType:{name:`number`},description:`Gets or Sets the width of the chart`},xAxisCustomFormat:{required:!1,tsType:{name:`string`},description:`Exposes the ability to force the chart to show a certain x format
It requires a \`xAxisFormat\` of 'custom' in order to work.
NOTE: localization not supported`},xAxisFormat:{required:!1,tsType:{name:`union`,raw:"AxisTimeCombination | `${AxisTimeCombination}`",elements:[{name:`AxisTimeCombination`},{name:`literal`,value:"`${AxisTimeCombination}`"}]},description:`Exposes the ability to force the chart to show a certain x axis grouping`},xAxisScale:{required:!1,tsType:{name:`union`,raw:`'linear' | 'logarithmic'`,elements:[{name:`literal`,value:`'linear'`},{name:`literal`,value:`'logarithmic'`}]},description:"Gets or Sets the `xAxisScale`. Choose between 'linear' and 'logarithmic'.\nThe setting will only work if `xAxisValueType` is set to 'number' as well, otherwise it won't influence the visualization."},xAxisValueType:{required:!1,tsType:{name:`union`,raw:`'date' | 'number'`,elements:[{name:`literal`,value:`'date'`},{name:`literal`,value:`'number'`}]},description:"Gets or Sets the `xAxisValueType`. Choose between 'date' and 'number'.\nWhen set to `number` the values of the x-axis must not be dates anymore, but can be arbitrary numbers."},xTicks:{required:!1,tsType:{name:`number`},description:`Exposes the ability to force the chart to show a certain x ticks. It
requires a \`xAxisFormat\` of 'custom' in order to work. NOTE: This
value needs to be a multiple of 2, 5 or 10. They won't always work
as expected, as D3 decides at the end how many and where the ticks will appear.`},yAxisBaseline:{required:!1,tsType:{name:`number`},description:`Gets or Sets the yAxisBaseline - this is the y-value where the area starts from in y-direction (default is 0).
Change this value if you don't want to start your area from y=0.`},yAxisLabel:{required:!1,tsType:{name:`string`},description:`Gets or Sets the y-axis label of the chart`},yAxisLabelOffset:{required:!1,tsType:{name:`number`},description:`Gets or Sets the offset of the yAxisLabel of the chart. The method accepts both positive and negative values. The default value is -60`},yTicks:{required:!1,tsType:{name:`number`},description:`Gets or Sets the number of ticks of the y axis on the chart (Default is 5)`},customMouseOver:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:``},customMouseMove:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:``},customMouseOut:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:``},chart:{required:!1,tsType:{name:`Wrapper`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [StackedAreaChartKeys.Date]: string;
    [StackedAreaChartKeys.Name]: string;
    [StackedAreaChartKeys.Value]: number;
}`,signature:{properties:[]}}],raw:`StackedAreaChartDataShape[]`},{name:`intersection`,raw:`ChartModuleSelection<
    StackedAreaChartDataShape[]
> &
    StackedAreaChartAPI`,elements:[{name:`signature`,type:`function`,raw:`<
    TElement extends Element,
    TParent extends Element | null,
    TParentDatum,
>(
    _selection: Selection<TElement, DataShape, TParent, TParentDatum>
) => void`,signature:{arguments:[{type:{name:`Selection`,elements:[{name:`TElement`},{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [StackedAreaChartKeys.Date]: string;
    [StackedAreaChartKeys.Name]: string;
    [StackedAreaChartKeys.Value]: number;
}`,signature:{properties:[]}}],raw:`StackedAreaChartDataShape[]`},{name:`TParent`},{name:`TParentDatum`}],raw:`Selection<TElement, DataShape, TParent, TParentDatum>`},name:`_selection`}],return:{name:`void`}}},{name:`StackedAreaChartAPI`}]}],raw:`Wrapper<StackedAreaChartDataShape[], StackedAreaChartModule>`},description:`Internally used, do not overwrite.

@ignore`,defaultValue:{value:`{
    create(el, data, configuration = {}) {
        const container = select<HTMLElement, StackedAreaChartDataShape[]>(el);
        const chart = stackedArea();

        validateContainer(container);
        validateConfiguration(chart, configuration);

        // Calls the chart with the container and dataset
        container.datum(data).call(applyConfiguration(chart, configuration));

        return chart;
    },

    update(el, data, configuration = {}, chart) {
        const container = select<HTMLElement, StackedAreaChartDataShape[]>(el);
        const shouldUpdateData = data && data.length;

        validateContainer(container);
        validateConfiguration(chart, configuration);
        applyConfiguration(chart, configuration);

        // Calls the chart with the container and dataset.
        //
        // \`data && data.length\`, kept in its own variable the way the
        // JavaScript had it: an update with no data -- empty, null or
        // undefined -- keeps whatever is already bound, as every wrapper does.
        if (shouldUpdateData) {
            container.datum(data).call(chart);
        } else {
            container.call(chart);
        }

        return chart;
    },

    destroy: removeChartSvg,
}`,computed:!1}},createTooltip:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Internally used, do not overwrite.

@ignore
@internal`}}}})))()}var f,p,m;function h(){return(h=t((()=>{f=()=>[{name:`Direct`,value:0,date:`2011-01-05T00:00:00`},{name:`Direct`,value:10,date:`2011-01-06T00:00:00`},{name:`Direct`,value:7,date:`2011-01-07T00:00:00`},{name:`Direct`,value:6,date:`2011-01-08T00:00:00`},{name:`Eventbrite`,value:3,date:`2011-01-05T00:00:00`},{name:`Eventbrite`,value:16,date:`2011-01-06T00:00:00`},{name:`Eventbrite`,value:10,date:`2011-01-07T00:00:00`},{name:`Eventbrite`,value:0,date:`2011-01-08T00:00:00`},{name:`Email`,value:10,date:`2011-01-05T00:00:00`},{name:`Email`,value:15,date:`2011-01-06T00:00:00`},{name:`Email`,value:3,date:`2011-01-07T00:00:00`},{name:`Email`,value:33,date:`2011-01-08T00:00:00`}],p=()=>[{date:`2017-02-16T00:00:00-08:00`,name:`Organizer Channels`,value:5},{date:`2017-02-16T00:00:00-08:00`,name:`Eventbrite Channels`,value:0},{date:`2017-02-17T00:00:00-08:00`,name:`Eventbrite Channels`,value:1},{date:`2017-02-17T00:00:00-08:00`,name:`Organizer Channels`,value:13},{date:`2017-02-18T00:00:00-08:00`,name:`Organizer Channels`,value:15},{date:`2017-02-18T00:00:00-08:00`,name:`Eventbrite Channels`,value:1},{date:`2017-02-19T00:00:00-08:00`,name:`Organizer Channels`,value:15},{date:`2017-02-19T00:00:00-08:00`,name:`Eventbrite Channels`,value:1},{date:`2017-02-20T00:00:00-08:00`,name:`Organizer Channels`,value:15},{date:`2017-02-20T00:00:00-08:00`,name:`Eventbrite Channels`,value:1},{date:`2017-02-21T00:00:00-08:00`,name:`Organizer Channels`,value:18},{date:`2017-02-21T00:00:00-08:00`,name:`Eventbrite Channels`,value:1},{date:`2017-02-22T00:00:00-08:00`,name:`Organizer Channels`,value:19},{date:`2017-02-22T00:00:00-08:00`,name:`Eventbrite Channels`,value:1},{date:`2017-02-23T00:00:00-08:00`,name:`Eventbrite Channels`,value:2},{date:`2017-02-23T00:00:00-08:00`,name:`Organizer Channels`,value:22},{date:`2017-02-24T00:00:00-08:00`,name:`Organizer Channels`,value:25},{date:`2017-02-24T00:00:00-08:00`,name:`Eventbrite Channels`,value:2},{date:`2017-02-25T00:00:00-08:00`,name:`Organizer Channels`,value:28},{date:`2017-02-25T00:00:00-08:00`,name:`Eventbrite Channels`,value:2},{date:`2017-02-26T00:00:00-08:00`,name:`Organizer Channels`,value:30},{date:`2017-02-26T00:00:00-08:00`,name:`Eventbrite Channels`,value:2},{date:`2017-02-27T00:00:00-08:00`,name:`Organizer Channels`,value:30},{date:`2017-02-27T00:00:00-08:00`,name:`Eventbrite Channels`,value:2},{date:`2017-02-28T00:00:00-08:00`,name:`Organizer Channels`,value:31},{date:`2017-02-28T00:00:00-08:00`,name:`Eventbrite Channels`,value:2},{date:`2017-03-01T00:00:00-08:00`,name:`Organizer Channels`,value:33},{date:`2017-03-01T00:00:00-08:00`,name:`Eventbrite Channels`,value:2},{date:`2017-03-02T00:00:00-08:00`,name:`Organizer Channels`,value:33},{date:`2017-03-02T00:00:00-08:00`,name:`Eventbrite Channels`,value:2},{date:`2017-03-03T00:00:00-08:00`,name:`Eventbrite Channels`,value:4},{date:`2017-03-03T00:00:00-08:00`,name:`Organizer Channels`,value:34},{date:`2017-03-04T00:00:00-08:00`,name:`Eventbrite Channels`,value:4},{date:`2017-03-04T00:00:00-08:00`,name:`Organizer Channels`,value:34},{date:`2017-03-05T00:00:00-08:00`,name:`Organizer Channels`,value:37},{date:`2017-03-05T00:00:00-08:00`,name:`Eventbrite Channels`,value:4},{date:`2017-03-06T00:00:00-08:00`,name:`Eventbrite Channels`,value:5},{date:`2017-03-06T00:00:00-08:00`,name:`Organizer Channels`,value:41},{date:`2017-03-07T00:00:00-08:00`,name:`Organizer Channels`,value:69},{date:`2017-03-07T00:00:00-08:00`,name:`Eventbrite Channels`,value:5},{date:`2017-03-08T00:00:00-08:00`,name:`Organizer Channels`,value:77},{date:`2017-03-08T00:00:00-08:00`,name:`Eventbrite Channels`,value:5},{date:`2017-03-09T00:00:00-08:00`,name:`Eventbrite Channels`,value:8},{date:`2017-03-09T00:00:00-08:00`,name:`Organizer Channels`,value:79},{date:`2017-03-10T00:00:00-08:00`,name:`Organizer Channels`,value:85},{date:`2017-03-10T00:00:00-08:00`,name:`Eventbrite Channels`,value:8},{date:`2017-03-11T00:00:00-08:00`,name:`Organizer Channels`,value:85},{date:`2017-03-11T00:00:00-08:00`,name:`Eventbrite Channels`,value:8},{date:`2017-03-12T00:00:00-08:00`,name:`Organizer Channels`,value:85},{date:`2017-03-12T00:00:00-08:00`,name:`Eventbrite Channels`,value:8},{date:`2017-03-13T00:00:00-07:00`,name:`Organizer Channels`,value:85},{date:`2017-03-13T00:00:00-07:00`,name:`Eventbrite Channels`,value:8},{date:`2017-03-14T00:00:00-07:00`,name:`Organizer Channels`,value:85},{date:`2017-03-14T00:00:00-07:00`,name:`Eventbrite Channels`,value:8},{date:`2017-03-15T00:00:00-07:00`,name:`Organizer Channels`,value:85},{date:`2017-03-15T00:00:00-07:00`,name:`Eventbrite Channels`,value:8},{date:`2017-03-16T00:00:00-07:00`,name:`Organizer Channels`,value:85},{date:`2017-03-16T00:00:00-07:00`,name:`Eventbrite Channels`,value:8},{date:`2017-03-17T00:00:00-07:00`,name:`Organizer Channels`,value:85},{date:`2017-03-17T00:00:00-07:00`,name:`Eventbrite Channels`,value:8}],m={with3Sources:f,with2Sources:p}})))()}var g,_,v,y,b,x,S;function C(){return(C=t((()=>{g=e(n(),1),d(),s(),h(),_={title:`Charts/StackedArea`,component:u},v=e=>{let t=m.with3Sources();return g.createElement(c,{data:t,render:n=>g.createElement(u,{...e,...n,data:t}),title:`Tooltip`})},v.args={isAnimated:!1},v.parameters={controls:{exclude:[`data`,`chart`,`createTooltip`]}},y=()=>{let e=m.with3Sources();return g.createElement(c,{data:e,render:t=>g.createElement(u,{isAnimated:!0,...t,data:e}),title:`Tooltip`})},b=()=>{let e=m.with2Sources();return g.createElement(u,{data:e,customMouseOver:()=>console.log(`Mouse Over`),customMouseMove:(e,t,n,r)=>{console.log(`Mouse Move: dataPoint`,e),console.log(`Mouse Move: position`,t),console.log(`Mouse Move: size`,n),console.log(`Mouse Move: topicColorMap`,r)},customMouseOut:()=>console.log(`Mouse Out`)})},x=()=>g.createElement(u,{data:[],isLoading:!0}),v.__docgenInfo={description:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart,
with its tooltip.`,methods:[],displayName:`Playground`},y.__docgenInfo={description:``,methods:[],displayName:`WithAnimation`},b.__docgenInfo={description:``,methods:[],displayName:`WithMouseEventsOnConsole`},x.__docgenInfo={description:``,methods:[],displayName:`WithLoadingState`},S=[`Playground`,`WithAnimation`,`WithMouseEventsOnConsole`,`WithLoadingState`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`args => {
  const data = stackedAreaData.with3Sources();
  const renderStackedArea = (props: TooltipRenderArgs) => <StackedArea {...args} {...props} data={data} />;

  // No topicLabel here: @britecharts/wrappers already sets it to 'values' when
  // it creates the tooltip, and passing it again re-runs the deprecated setter
  // on every mouse move.
  return <Tooltip data={data} render={renderStackedArea} title="Tooltip" />;
}`,...v.parameters?.docs?.source},description:{story:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart,
with its tooltip.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  const data = stackedAreaData.with3Sources();
  const renderStackedArea = (props: TooltipRenderArgs) => <StackedArea isAnimated={true} {...props} data={data} />;

  // No topicLabel here: @britecharts/wrappers already sets it to 'values' when
  // it creates the tooltip, and passing it again re-runs the deprecated setter
  // on every mouse move.
  return <Tooltip data={data} render={renderStackedArea} title="Tooltip" />;
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => {
  const data = stackedAreaData.with2Sources();
  const logMouseOver = () => console.log('Mouse Over');
  const logMouseOut = () => console.log('Mouse Out');
  // What every chart dispatches on customMouseMove: the data point, its
  // anchor [x, y], the chart's size and the topic colours
  const logMouseMove: TooltipRenderArgs['customMouseMove'] = (dataPoint, position, size, topicColorMap) => {
    console.log('Mouse Move: dataPoint', dataPoint);
    console.log('Mouse Move: position', position);
    console.log('Mouse Move: size', size);
    console.log('Mouse Move: topicColorMap', topicColorMap);
  };
  return <StackedArea data={data} customMouseOver={logMouseOver} customMouseMove={logMouseMove} customMouseOut={logMouseOut} />;
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  const data: [] = [];
  return <StackedArea data={data} isLoading={true} />;
}`,...x.parameters?.docs?.source}}}})))()}C();export{v as Playground,y as WithAnimation,x as WithLoadingState,b as WithMouseEventsOnConsole,S as __namedExportsOrder,_ as default};