import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-BGJ90fIb.js";import{n as r,r as i,s as a,t as o}from"./useChart-CgS3zd7o.js";import{n as s,t as c}from"./Tooltip-Cs4p3-yG.js";var l,u;function d(){return(d=t((()=>{l=e(n(),1),i(),o(),u=({chart:e=a,createTooltip:t,data:n,...i})=>{let o=r(e,n,i,{createTooltip:t});return l.createElement(`div`,{className:`stacked-bar-container`,ref:o})},u.__docgenInfo={description:``,methods:[],displayName:`StackedBar`,props:{a11yTitle:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`The name screen readers announce for the chart, rendered as its svg's
\`<title>\`. Unset, the chart is announced by its type, such as "Bar chart".`},a11yDescription:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:"A longer description screen readers announce after the name, such as\nwhat the data shows, rendered as the svg's `<desc>`."},data:{required:!0,tsType:{name:`union`,raw:`StackedBarChartDataShape[] | null`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [StackedBarChartKeys.Value]: number;
    [StackedBarChartKeys.Name]: string;
    [StackedBarChartKeys.Stack]: string;
}`,signature:{properties:[]}}],raw:`StackedBarChartDataShape[]`},{name:`null`}]},description:`Internally used, do not overwrite.

Required. \`null\` means the data has not arrived yet: nothing is drawn
until it does. Leaving it out is an error.`},animationDuration:{required:!1,tsType:{name:`number`},description:`Gets or Sets the duration of the animation`},betweenBarsPadding:{required:!1,tsType:{name:`number`},description:`Gets or Sets the padding of the stacked bar chart`},colorMap:{required:!1,tsType:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`},description:`Current colorMap or Chart module to chain calls`},colorSchema:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`Gets or Sets the colorSchema of the chart`},exportChart:{required:!1,tsType:{name:`string`},description:`The filename to export the chart to. Setting it exports a png and fires
a download, which is what the chart's \`exportChart\` command does; it is
not a callback.`},grid:{required:!1,tsType:{name:`union`,raw:`'vertical' | 'horizontal' | 'full' | null`,elements:[{name:`literal`,value:`'vertical'`},{name:`literal`,value:`'horizontal'`},{name:`literal`,value:`'full'`},{name:`null`}]},description:`Gets or Sets the grid mode.`},hasPercentage:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the hasPercentage status`},hasReversedStacks:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the hasReversedStacks property of the chart, reversing the order of stacks.`},height:{required:!1,tsType:{name:`number`},description:`Gets or Sets the height of the chart`},isAnimated:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the isAnimated property of the chart, making it to animate
when render. By default this is 'false'`},isHorizontal:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the horizontal direction of the chart`},isLoading:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets whether a loading state will be shown`},margin:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}`,signature:{properties:[{key:`top`,value:{name:`number`,required:!1}},{key:`bottom`,value:{name:`number`,required:!1}},{key:`left`,value:{name:`number`,required:!1}},{key:`right`,value:{name:`number`,required:!1}}]}},description:`Gets or Sets the margin of the chart`},nameLabel:{required:!1,tsType:{name:`string`},description:`Gets or Sets the nameLabel of the chart`},percentageAxisToMaxRatio:{required:!1,tsType:{name:`number`},description:`Configurable extension of the x axis
If your max point was 50% you might want to show x axis to 60%, pass 1.2`},stackLabel:{required:!1,tsType:{name:`string`},description:`Gets or Sets the stackLabel of the chart`},tooltipThreshold:{required:!1,tsType:{name:`number`},description:`Gets or Sets the minimum width of the graph in order
to show the tooltip NOTE: This could also depend on the aspect ratio`},valueLabel:{required:!1,tsType:{name:`string`},description:`Gets or Sets the valueLabel of the chart`},valueLocale:{required:!1,tsType:{name:`union`,raw:`LocalObject | null`,elements:[{name:`signature`,type:`object`,raw:`{
    decimal?: string;
    thousands?: string;
    grouping?: number[];
    currency?: string[];
    numerals?: string[];
    percent?: string;
    minus?: string;
    nan?: string;
}`,signature:{properties:[{key:`decimal`,value:{name:`string`,required:!1}},{key:`thousands`,value:{name:`string`,required:!1}},{key:`grouping`,value:{name:`Array`,elements:[{name:`number`}],raw:`number[]`,required:!1}},{key:`currency`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`numerals`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`percent`,value:{name:`string`,required:!1}},{key:`minus`,value:{name:`string`,required:!1}},{key:`nan`,value:{name:`string`,required:!1}}]}},{name:`null`}]},description:`Current locale object or Chart module to chain calls`},width:{required:!1,tsType:{name:`number`},description:`Gets or Sets the width of the chart`},xTicks:{required:!1,tsType:{name:`number`},description:`Exposes the ability to force the chart to show a certain x ticks. It
requires a \`xAxisFormat\` of 'custom' in order to work. NOTE: This
value needs to be a multiple of 2, 5 or 10. They won't always work
as expected, as D3 decides at the end how many and where the ticks will appear.`},yAxisLabel:{required:!1,tsType:{name:`string`},description:`Gets or Sets the y-axis label of the chart`},yAxisLabelOffset:{required:!1,tsType:{name:`number`},description:`Gets or Sets the offset of the yAxisLabel of the chart. The method accepts both positive and negative values. The default value is -60`},yTicks:{required:!1,tsType:{name:`number`},description:`Gets or Sets the number of ticks of the y axis on the chart (Default is 5)`},customMouseOver:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:``},customMouseMove:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:``},customMouseOut:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:``},chart:{required:!1,tsType:{name:`Wrapper`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [StackedBarChartKeys.Value]: number;
    [StackedBarChartKeys.Name]: string;
    [StackedBarChartKeys.Stack]: string;
}`,signature:{properties:[]}}],raw:`StackedBarChartDataShape[]`},{name:`intersection`,raw:`ChartModuleSelection<
    StackedBarChartDataShape[]
> &
    StackedBarChartAPI`,elements:[{name:`signature`,type:`function`,raw:`<
    TElement extends Element,
    TParent extends Element | null,
    TParentDatum,
>(
    _selection: Selection<TElement, DataShape, TParent, TParentDatum>
) => void`,signature:{arguments:[{type:{name:`Selection`,elements:[{name:`TElement`},{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [StackedBarChartKeys.Value]: number;
    [StackedBarChartKeys.Name]: string;
    [StackedBarChartKeys.Stack]: string;
}`,signature:{properties:[]}}],raw:`StackedBarChartDataShape[]`},{name:`TParent`},{name:`TParentDatum`}],raw:`Selection<TElement, DataShape, TParent, TParentDatum>`},name:`_selection`}],return:{name:`void`}}},{name:`StackedBarChartAPI`}]}],raw:`Wrapper<StackedBarChartDataShape[], StackedBarChartModule>`},description:`Internally used, do not overwrite.

@ignore`,defaultValue:{value:`{
    create(el, data, configuration = {}) {
        const container = select<HTMLElement, StackedBarChartDataShape[]>(el);
        const chart = stackedBar();

        validateContainer(container);
        validateConfiguration(chart, configuration);

        // Calls the chart with the container and dataset
        container.datum(data).call(applyConfiguration(chart, configuration));

        return chart;
    },

    update(el, data, configuration = {}, chart) {
        const container = select<HTMLElement, StackedBarChartDataShape[]>(el);

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
@internal`}}}})))()}var f,p,m,h;function g(){return(g=t((()=>{f=()=>[{name:`Shiny`,stack:`Bottom`,value:2},{name:`Shiny`,stack:`Middle`,value:9},{name:`Shiny`,stack:`Top`,value:4},{name:`Dazzling`,stack:`Bottom`,value:6},{name:`Dazzling`,stack:`Middle`,value:1},{name:`Dazzling`,stack:`Top`,value:2},{name:`Radiant`,stack:`Bottom`,value:7},{name:`Radiant`,stack:`Middle`,value:4},{name:`Radiant`,stack:`Top`,value:2}],p=()=>[{name:`2011-01-05`,stack:`vivid`,value:0},{name:`2011-01-06`,stack:`vivid`,value:4},{name:`2011-01-07`,stack:`vivid`,value:12},{name:`2011-01-08`,stack:`vivid`,value:23},{name:`2011-01-05`,stack:`sparkling`,value:18},{name:`2011-01-06`,stack:`sparkling`,value:16},{name:`2011-01-07`,stack:`sparkling`,value:10},{name:`2011-01-08`,stack:`sparkling`,value:0},{name:`2011-01-05`,stack:`sunny`,value:10},{name:`2011-01-06`,stack:`sunny`,value:20},{name:`2011-01-07`,stack:`sunny`,value:16},{name:`2011-01-08`,stack:`sunny`,value:25}],m=()=>[{name:`Dazzling`,stack:`Bottom`,value:6},{name:`Dazzling`,stack:`Middle`,value:1},{name:`Dazzling`,stack:`Top`,value:2},{name:`Radiant`,stack:`Bottom`,value:7},{name:`Radiant`,stack:`Middle`,value:4},{name:`Radiant`,stack:`Top`,value:2}],h={with3Sources:f,with3SourcesAndDates:p,with2Sources:m}})))()}var _,v,y,b,x,S,C;function w(){return(w=t((()=>{_=e(n(),1),d(),s(),g(),v={title:`Charts/StackedBar`,component:u},y=e=>{let t=h.with3SourcesAndDates();return _.createElement(c,{data:t,render:t=>_.createElement(u,{...e,...t}),title:`Tooltip Title`,dateLabel:`key`,nameLabel:`stack`})},y.args={isAnimated:!1},y.parameters={controls:{exclude:[`data`,`chart`,`createTooltip`]}},b=()=>{let e=h.with3Sources();return _.createElement(u,{data:e,isHorizontal:!0,width:600,height:400})},x=()=>{let e=h.with3SourcesAndDates();return _.createElement(c,{data:e,render:e=>_.createElement(u,{isAnimated:!0,...e}),title:`Tooltip Title`,dateLabel:`key`,nameLabel:`stack`})},S=()=>_.createElement(u,{data:[],isLoading:!0}),y.__docgenInfo={description:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart,
with its tooltip.`,methods:[],displayName:`Playground`},b.__docgenInfo={description:``,methods:[],displayName:`WithHorizontalDirectionAndFixedSize`},x.__docgenInfo={description:``,methods:[],displayName:`WithAnimation`},S.__docgenInfo={description:``,methods:[],displayName:`WithLoadingState`},C=[`Playground`,`WithHorizontalDirectionAndFixedSize`,`WithAnimation`,`WithLoadingState`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`args => {
  const data = stackedBarData.with3SourcesAndDates();
  const renderStackedBar = (props: TooltipRenderArgs<typeof data>) => <StackedBar {...args} {...props} />;
  return <Tooltip data={data} render={renderStackedBar} title="Tooltip Title" dateLabel="key" nameLabel="stack" />;
}`,...y.parameters?.docs?.source},description:{story:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart,
with its tooltip.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => {
  const data = stackedBarData.with3Sources();
  return <StackedBar data={data} isHorizontal={true} width={600} height={400} />;
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  const data = stackedBarData.with3SourcesAndDates();
  const renderStackedBar = (props: TooltipRenderArgs<typeof data>) => <StackedBar isAnimated={true} {...props} />;
  return <Tooltip data={data} render={renderStackedBar} title="Tooltip Title" dateLabel="key" nameLabel="stack" />;
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
  const data: [] = [];
  return <StackedBar data={data} isLoading={true} />;
}`,...S.parameters?.docs?.source}}}})))()}w();export{y as Playground,x as WithAnimation,b as WithHorizontalDirectionAndFixedSize,S as WithLoadingState,C as __namedExportsOrder,v as default};