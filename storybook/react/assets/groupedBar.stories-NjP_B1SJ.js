import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-BGJ90fIb.js";import{n as r,r as i,t as a,v as o}from"./useChart-DxJRMu3P.js";import{n as s,t as c}from"./Tooltip-G5e8rweI.js";var l,u;function d(){return(d=t((()=>{l=e(n(),1),i(),a(),u=({chart:e=o,createTooltip:t,data:n,...i})=>{let a=r(e,n,i,{createTooltip:t});return l.createElement(`div`,{className:`grouped-bar-container`,ref:a})},u.__docgenInfo={description:``,methods:[],displayName:`GroupedBar`,props:{a11yTitle:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`The name screen readers announce for the chart, rendered as its svg's
\`<title>\`. Unset, the chart is announced by its type, such as "Bar chart".`},a11yDescription:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:"A longer description screen readers announce after the name, such as\nwhat the data shows, rendered as the svg's `<desc>`."},data:{required:!0,tsType:{name:`union`,raw:`GroupedBarChartDataShape[] | null`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [GroupedBarChartKeys.Value]: number;
    [GroupedBarChartKeys.Name]: string;
    [GroupedBarChartKeys.Group]: string;
}`,signature:{properties:[]}}],raw:`GroupedBarChartDataShape[]`},{name:`null`}]},description:`Internally used, do not overwrite.

Required. \`null\` means the data has not arrived yet: nothing is drawn
until it does. Leaving it out is an error.`},animationDuration:{required:!1,tsType:{name:`number`},description:`Gets or Sets the duration of the animation`},betweenBarsPadding:{required:!1,tsType:{name:`number`},description:`Gets or Sets the padding of the chart`},betweenGroupsPadding:{required:!1,tsType:{name:`number`},description:`Gets or Sets the padding between groups of bars`},colorMap:{required:!1,tsType:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`},description:`Current colorMap or Chart module to chain calls`},colorSchema:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`Gets or Sets the colorSchema of the chart`},exportChart:{required:!1,tsType:{name:`string`},description:`The filename to export the chart to. Setting it exports a png and fires
a download, which is what the chart's \`exportChart\` command does -- it
is not a callback, which is what this declared and what a reader would
have passed. The chart's exporter treats the title as optional, so a
filename on its own is enough.`},grid:{required:!1,tsType:{name:`union`,raw:`'vertical' | 'horizontal' | 'full' | null`,elements:[{name:`literal`,value:`'vertical'`},{name:`literal`,value:`'horizontal'`},{name:`literal`,value:`'full'`},{name:`null`}]},description:`Gets or Sets the grid mode.`},groupLabel:{required:!1,tsType:{name:`string`},description:`Gets or Sets the groupLabel of the chart`},height:{required:!1,tsType:{name:`number`},description:`Gets or Sets the height of the chart`},isAnimated:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the isAnimated property of the chart, making it to animate
when render. By default this is 'false'`},isHorizontal:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the horizontal direction of the chart`},isLoading:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets whether a loading state will be shown`},margin:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}`,signature:{properties:[{key:`top`,value:{name:`number`,required:!1}},{key:`bottom`,value:{name:`number`,required:!1}},{key:`left`,value:{name:`number`,required:!1}},{key:`right`,value:{name:`number`,required:!1}}]}},description:`Gets or Sets the margin of the chart`},nameLabel:{required:!1,tsType:{name:`string`},description:`Gets or Sets the nameLabel of the chart`},numberFormat:{required:!1,tsType:{name:`string`},description:`Gets or Sets the number format of the bar chart`},tooltipThreshold:{required:!1,tsType:{name:`number`},description:`Gets or Sets the minimum width of the graph in order to show the tooltip NOTE: This could also depend on the aspect ratio`},valueLabel:{required:!1,tsType:{name:`string`},description:`Gets or Sets the valueLabel of the chart`},valueLocale:{required:!1,tsType:{name:`union`,raw:`LocalObject | null`,elements:[{name:`signature`,type:`object`,raw:`{
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
as expected, as D3 decides at the end how many and where the ticks will appear.`},yAxisLabel:{required:!1,tsType:{name:`string`},description:`Gets or Sets the y-axis label of the chart`},yAxisLabelOffset:{required:!1,tsType:{name:`number`},description:`Gets or Sets the offset of the yAxisLabel of the chart. The method accepts both positive and negative values. The default value is -60`},yTicks:{required:!1,tsType:{name:`number`},description:`Gets or Sets the number of ticks of the y axis on the chart (Default is 5)`},yTickTextOffset:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{ x: number; y: number }`,signature:{properties:[{key:`x`,value:{name:`number`,required:!0}},{key:`y`,value:{name:`number`,required:!0}}]}},description:`Gets or Sets the x and y offset of ticks of the y axis on the chart`},customMouseOver:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:``},customMouseMove:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:``},customMouseOut:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:``},chart:{required:!1,tsType:{name:`Wrapper`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [GroupedBarChartKeys.Value]: number;
    [GroupedBarChartKeys.Name]: string;
    [GroupedBarChartKeys.Group]: string;
}`,signature:{properties:[]}}],raw:`GroupedBarChartDataShape[]`},{name:`intersection`,raw:`ChartModuleSelection<
    GroupedBarChartDataShape[]
> &
    GroupedBarChartAPI`,elements:[{name:`signature`,type:`function`,raw:`<
    TElement extends Element,
    TParent extends Element | null,
    TParentDatum,
>(
    _selection: Selection<TElement, DataShape, TParent, TParentDatum>
) => void`,signature:{arguments:[{type:{name:`Selection`,elements:[{name:`TElement`},{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [GroupedBarChartKeys.Value]: number;
    [GroupedBarChartKeys.Name]: string;
    [GroupedBarChartKeys.Group]: string;
}`,signature:{properties:[]}}],raw:`GroupedBarChartDataShape[]`},{name:`TParent`},{name:`TParentDatum`}],raw:`Selection<TElement, DataShape, TParent, TParentDatum>`},name:`_selection`}],return:{name:`void`}}},{name:`GroupedBarChartAPI`}]}],raw:`Wrapper<GroupedBarChartDataShape[], GroupedBarChartModule>`},description:`Internally used, do not overwrite.

@ignore`,defaultValue:{value:`{
    create(el, data, configuration = {}) {
        const container = select<HTMLElement, GroupedBarChartDataShape[]>(el);
        const chart = groupedBar();

        validateContainer(container);
        validateConfiguration(chart, configuration);

        // Calls the chart with the container and dataset
        container.datum(data).call(applyConfiguration(chart, configuration));

        return chart;
    },

    update(el, data, configuration = {}, chart) {
        const container = select<HTMLElement, GroupedBarChartDataShape[]>(el);

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
@internal`}}}})))()}var f,p,m;function h(){return(h=t((()=>{f=()=>[{name:`Dogs`,group:`Group A`,value:4},{name:`Dogs`,group:`Group B`,value:8},{name:`Dogs`,group:`Group C`,value:6},{name:`Cats`,group:`Group A`,value:2},{name:`Cats`,group:`Group B`,value:7},{name:`Cats`,group:`Group C`,value:12},{name:`Both`,group:`Group A`,value:5},{name:`Both`,group:`Group B`,value:6},{name:`Both`,group:`Group C`,value:5}],p=()=>[{name:`Ari`,group:`Group A`,value:12},{name:`Beth`,group:`Group B`,value:15}],m={with3Groups:f,with2Groups:p}})))()}var g,_,v,y,b,x,S;function C(){return(C=t((()=>{g=e(n(),1),d(),s(),h(),_={title:`Charts/GroupedBar`,component:u},v=e=>{let t=m.with3Groups();return g.createElement(c,{data:t,render:n=>g.createElement(u,{...e,...n,data:t}),title:`Tooltip Title`,dateLabel:`key`,nameLabel:`group`})},v.args={isAnimated:!1},v.parameters={controls:{exclude:[`data`,`chart`,`createTooltip`]}},y=()=>{let e=m.with3Groups();return g.createElement(u,{data:e,isHorizontal:!0,width:800,height:400})},b=()=>{let e=m.with3Groups();return g.createElement(c,{data:e,render:t=>g.createElement(u,{isAnimated:!0,...t,data:e}),title:`Tooltip Title`,dateLabel:`key`,nameLabel:`group`})},x=()=>g.createElement(u,{data:[],isLoading:!0}),v.__docgenInfo={description:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart,
with its tooltip.`,methods:[],displayName:`Playground`},y.__docgenInfo={description:``,methods:[],displayName:`WithHorizontalDirectionFixedSize`},b.__docgenInfo={description:``,methods:[],displayName:`WithAnimation`},x.__docgenInfo={description:``,methods:[],displayName:`WithLoadingState`},S=[`Playground`,`WithHorizontalDirectionFixedSize`,`WithAnimation`,`WithLoadingState`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`args => {
  const data = groupedBarData.with3Groups();
  const renderGroupedBar = (props: TooltipRenderArgs) => <GroupedBar {...args} {...props} data={data} />;

  // The chart dispatches each column as { key, values: [{ group, name,
  // value }] }: the title shows the key and each row a group
  return <Tooltip data={data} render={renderGroupedBar} title="Tooltip Title" dateLabel="key" nameLabel="group" />;
}`,...v.parameters?.docs?.source},description:{story:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart,
with its tooltip.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  const data = groupedBarData.with3Groups();
  return <GroupedBar data={data} isHorizontal={true} width={800} height={400} />;
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => {
  const data = groupedBarData.with3Groups();
  const renderGroupedBar = (props: TooltipRenderArgs) => <GroupedBar isAnimated={true} {...props} data={data} />;

  // The chart dispatches each column as { key, values: [{ group, name,
  // value }] }: the title shows the key and each row a group
  return <Tooltip data={data} render={renderGroupedBar} title="Tooltip Title" dateLabel="key" nameLabel="group" />;
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  const data: [] = [];
  return <GroupedBar data={data} isLoading={true} />;
}`,...x.parameters?.docs?.source}}}})))()}C();export{v as Playground,b as WithAnimation,y as WithHorizontalDirectionFixedSize,x as WithLoadingState,S as __namedExportsOrder,_ as default};