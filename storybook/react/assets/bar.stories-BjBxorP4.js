import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{D as r,E as i,n as a,r as o,t as s,w as c}from"./useChart-BLUInpsi.js";import{n as l,t as u}from"./Tooltip-BppP0SeQ.js";var d,f;function p(){return(p=t((()=>{d=e(n(),1),o(),s(),f=({chart:e=c,createTooltip:t,data:n,...r})=>{let i=a(e,n,r,{createTooltip:t});return d.createElement(`div`,{className:`bar-container`,ref:i})},f.__docgenInfo={description:``,methods:[],displayName:`Bar`,props:{a11yTitle:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`The name screen readers announce for the chart, set as its svg's
\`aria-label\`. Unset, the chart is announced by its type, such as "Bar chart".`},a11yDescription:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:"A longer description screen readers announce after the name, such as\nwhat the data shows, rendered as the svg's `<desc>`."},data:{required:!0,tsType:{name:`union`,raw:`BarChartDataShape[] | null`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [BarChartKeys.Value]: number;
    [BarChartKeys.Name]: string;
}`,signature:{properties:[]}}],raw:`BarChartDataShape[]`},{name:`null`}]},description:`Internally used, do not overwrite.

Required. \`null\` means the data has not arrived yet: nothing is drawn
until it does. Leaving it out is an error.`},animationDuration:{required:!1,tsType:{name:`number`},description:`Gets or Sets the duration of the animation`},betweenBarsPadding:{required:!1,tsType:{name:`number`},description:`Gets or Sets the padding of the chart`},chartGradient:{required:!1,tsType:{name:`tuple`,raw:`[string, string]`,elements:[{name:`string`},{name:`string`}]},description:`Gets or Sets the gradient colors of a bar in the chart`},colorSchema:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`Gets or Sets the colorSchema of the chart`},colorMap:{required:!1,tsType:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`},description:`Current colorMap or Chart module to chain calls`},enableLabels:{required:!1,tsType:{name:`boolean`},description:`If true, adds labels at the end of the bars`},hasPercentage:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the hasPercentage status`},hasSingleBarHighlight:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the hasSingleBarHighlight status. If the value is true (default), only the hovered bar is considered to be highlighted and will be darkened by default. If the value is false, all the bars but the hovered bar are considered to be highlighted and will be darkened (by default). To customize the bar highlight or remove it completely, use highlightBarFunction instead.`},height:{required:!1,tsType:{name:`number`},description:`Gets or Sets the height of the chart`},highlightBarFunction:{required:!1,tsType:{name:`union`,raw:`((bar: BarSelection) => void) | null`,elements:[{name:`unknown`},{name:`null`}]},description:`Gets or Sets the highlightBarFunction function. The callback passed to this function returns a bar selection from the bar chart. Use this function if you want to apply a custom behavior to the highlighted bar on hover. When hasSingleBarHighlight is true the highlighted bar will be the one that was hovered by the user. When hasSingleBarHighlight is false the highlighted bars are all the bars but the hovered one. The default highlight effect on a bar is darkening the highlighted bar(s) color.`},isAnimated:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the isAnimated property of the chart, making it to animate
when render. By default this is 'false'`},isHorizontal:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the horizontal direction of the chart`},isLoading:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets whether a loading state will be shown`},labelsMargin:{required:!1,tsType:{name:`number`},description:`Offset between end of bar and start of the percentage bars`},labelsNumberFormat:{required:!1,tsType:{name:`string`},description:`Gets or Sets the labels number format`},labelsSize:{required:!1,tsType:{name:`number`},description:`Get or Sets the labels text size`},loadingState:{required:!1,tsType:{name:`string`},description:`Gets or Sets the loading state of the chart`},margin:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{ top?: number; bottom?: number; left?: number; right?: number }`,signature:{properties:[{key:`top`,value:{name:`number`,required:!1}},{key:`bottom`,value:{name:`number`,required:!1}},{key:`left`,value:{name:`number`,required:!1}},{key:`right`,value:{name:`number`,required:!1}}]}},description:`Gets or Sets the margin of the chart`},numberFormat:{required:!1,tsType:{name:`string`},description:`Gets or Sets the number format of the bar chart`},orderingFunction:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(a: BarChartDataShape, b: BarChartDataShape) => number`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
    [BarChartKeys.Value]: number;
    [BarChartKeys.Name]: string;
}`,signature:{properties:[]}},name:`a`},{type:{name:`signature`,type:`object`,raw:`{
    [BarChartKeys.Value]: number;
    [BarChartKeys.Name]: string;
}`,signature:{properties:[]}},name:`b`}],return:{name:`number`}}},description:`Changes the order of items given the custom function`},percentageAxisToMaxRatio:{required:!1,tsType:{name:`number`},description:`Configurable extension of the x axis if your max point was 50%
you might want to show x axis to 60%, pass 1.2`},shouldReverseColorList:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets whether the color list should be reversed or not`},valueLocale:{required:!1,tsType:{name:`union`,raw:`LocalObject | null`,elements:[{name:`signature`,type:`object`,raw:`{
    decimal?: string;
    thousands?: string;
    grouping?: number[];
    currency?: string[];
    numerals?: string[];
    percent?: string;
    minus?: string;
    nan?: string;
}`,signature:{properties:[{key:`decimal`,value:{name:`string`,required:!1}},{key:`thousands`,value:{name:`string`,required:!1}},{key:`grouping`,value:{name:`Array`,elements:[{name:`number`}],raw:`number[]`,required:!1}},{key:`currency`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`numerals`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`percent`,value:{name:`string`,required:!1}},{key:`minus`,value:{name:`string`,required:!1}},{key:`nan`,value:{name:`string`,required:!1}}]}},{name:`null`}]},description:`Current locale object or Chart module to chain calls`},width:{required:!1,tsType:{name:`number`},description:`Gets or Sets the width of the chart`},xAxisLabel:{required:!1,tsType:{name:`string`},description:`Label or Chart module to chain calls`},xAxisLabelOffset:{required:!1,tsType:{name:`number`},description:`Gets or Sets the offset of the xAxisLabel on the chart`},xTicks:{required:!1,tsType:{name:`number`},description:`Gets or Sets the number of ticks of the x axis on the chart (Default is 5)`},yAxisLabel:{required:!1,tsType:{name:`string`},description:`Label or Chart module to chain calls`},yAxisLabelOffset:{required:!1,tsType:{name:`number`},description:`Gets or Sets the offset of the yAxisLabel on the chart`},yAxisPaddingBetweenChart:{required:!1,tsType:{name:`number`},description:`Space between y axis and chart (Default 10)`},yTicks:{required:!1,tsType:{name:`number`},description:`Gets or Sets the number of vertical ticks on the chart (Default is 6)`},customMouseOver:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:"Called when the pointer enters a bar, with what the chart dispatches.\n\n`ChartEventHandler` is the type the wrappers package publishes for these\nfour, and it is what `applyConfiguration` registers them through. The\nbare `Function` type will not do: no handler satisfies it structurally,\nso these would be unusable from TypeScript in practice."},customMouseMove:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:`Called on every pointer move over the chart.`},customMouseOut:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:`Called when the pointer leaves a bar.`},chart:{required:!1,tsType:{name:`Wrapper`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [BarChartKeys.Value]: number;
    [BarChartKeys.Name]: string;
}`,signature:{properties:[]}}],raw:`BarChartDataShape[]`},{name:`intersection`,raw:`ChartModuleSelection<BarChartDataShape[]> &
BarChartAPI`,elements:[{name:`signature`,type:`function`,raw:`<
    TElement extends Element,
    TParent extends Element | null,
    TParentDatum,
>(
    _selection: Selection<TElement, DataShape, TParent, TParentDatum>
) => void`,signature:{arguments:[{type:{name:`Selection`,elements:[{name:`TElement`},{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [BarChartKeys.Value]: number;
    [BarChartKeys.Name]: string;
}`,signature:{properties:[]}}],raw:`BarChartDataShape[]`},{name:`TParent`},{name:`TParentDatum`}],raw:`Selection<TElement, DataShape, TParent, TParentDatum>`},name:`_selection`}],return:{name:`void`}}},{name:`BarChartAPI`}]}],raw:`Wrapper<BarChartDataShape[], BarChartModule>`},description:`Internally used, do not overwrite.

@ignore`,defaultValue:{value:`{
    create(el, data, configuration = {}) {
        const container = select<HTMLElement, BarChartDataShape[]>(el);
        const chart = bar();

        validateContainer(container);
        validateConfiguration(chart, configuration);
        // Calls the chart with the container and dataset
        container.datum(data).call(applyConfiguration(chart, configuration));

        return chart;
    },

    update(el, data, configuration = {}, chart) {
        const container = select<HTMLElement, BarChartDataShape[]>(el);

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
@internal`}}}})))()}var m,h,g;function _(){return(_=t((()=>{m=()=>[{name:`A`,value:.08167},{name:`B`,value:.01492},{name:`C`,value:.02782},{name:`D`,value:.04253},{name:`E`,value:.12702},{name:`F`,value:.02288},{name:`G`,value:.02015},{name:`H`,value:.06094},{name:`I`,value:.06966},{name:`J`,value:.00153},{name:`K`,value:.00772},{name:`L`,value:.04025},{name:`M`,value:.02406},{name:`N`,value:.06749},{name:`O`,value:.07507},{name:`P`,value:.01929},{name:`Q`,value:95e-5},{name:`R`,value:.05987},{name:`S`,value:.06327},{name:`T`,value:.09056},{name:`U`,value:.02758},{name:`V`,value:.00978},{name:`W`,value:.0236},{name:`X`,value:.0015},{name:`Y`,value:.01974},{name:`Z`,value:74e-5}],h=()=>[{name:`Radiating`,value:2},{name:`Opalescent`,value:4},{name:`Shining`,value:3},{name:`Vibrant`,value:6},{name:`Vivid`,value:6},{name:`Brilliant`,value:1}],g={withLetters:m,withColors:h}})))()}var v,y,b,x,S,C,w,T;function E(){return(E=t((()=>{v=e(n(),1),p(),l(),_(),i(),y={title:`Charts/Bar`,component:f},b=e=>{let t=g.withLetters();return v.createElement(u,{data:t,render:t=>v.createElement(f,{...e,...t}),title:`Frequency`})},b.args={isAnimated:!1},b.parameters={controls:{exclude:[`data`,`chart`,`createTooltip`]}},x=()=>{let e=g.withColors();return v.createElement(f,{data:e,isHorizontal:!0,height:400,betweenBarsPadding:.3,colorSchema:r.colorSchemas.orange,margin:{left:100,right:40,top:40,bottom:40}})},S=()=>{let e=g.withLetters();return v.createElement(u,{data:e,render:e=>v.createElement(f,{...e,isAnimated:!0}),title:`Frequency`})},C=()=>v.createElement(f,{data:[],isLoading:!0}),w=()=>{let[e]=v.useState(g.withLetters),[t,n]=v.useState(!0);return v.useEffect(()=>{n(!1)},[]),v.createElement(f,{data:e,isLoading:t})},b.__docgenInfo={description:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart,
with its tooltip.`,methods:[],displayName:`Playground`},x.__docgenInfo={description:``,methods:[],displayName:`WithHorizontalDirectionAndColorSchema`},S.__docgenInfo={description:``,methods:[],displayName:`WithAnimation`},C.__docgenInfo={description:``,methods:[],displayName:`WithLoadingState`},w.__docgenInfo={description:"A chart that starts loading and then has its data: `isLoading` turns `false`\nand the chart replaces its loading state.",methods:[],displayName:`WithLoadingStateThatEnds`},T=[`Playground`,`WithHorizontalDirectionAndColorSchema`,`WithAnimation`,`WithLoadingState`,`WithLoadingStateThatEnds`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`args => {
  const data = barData.withLetters();
  const renderBar = (props: TooltipRenderArgs<typeof data>) => <Bar {...args} {...props} />;
  return <Tooltip data={data} render={renderBar} title="Frequency" />;
}`,...b.parameters?.docs?.source},description:{story:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart,
with its tooltip.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  const data = barData.withColors();
  return <Bar data={data} isHorizontal={true} height={400} betweenBarsPadding={0.3} colorSchema={colors.colorSchemas.orange} margin={{
    left: 100,
    right: 40,
    top: 40,
    bottom: 40
  }} />;
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
  const data = barData.withLetters();
  const renderBar = (props: TooltipRenderArgs<typeof data>) => <Bar {...props} isAnimated={true} />;
  return <Tooltip data={data} render={renderBar} title="Frequency" />;
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => {
  const data: [] = [];
  return <Bar data={data} isLoading={true} />;
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`() => {
  const [data] = React.useState(barData.withLetters);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setIsLoading(false);
  }, []);
  return <Bar data={data} isLoading={isLoading} />;
}`,...w.parameters?.docs?.source},description:{story:"A chart that starts loading and then has its data: `isLoading` turns `false`\nand the chart replaces its loading state.",...w.parameters?.docs?.description}}}})))()}E();export{b as Playground,S as WithAnimation,x as WithHorizontalDirectionAndColorSchema,C as WithLoadingState,w as WithLoadingStateThatEnds,T as __namedExportsOrder,y as default};