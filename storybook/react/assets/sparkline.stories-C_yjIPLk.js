import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-BGJ90fIb.js";import{d as r,n as i,r as a,t as o}from"./useChart-DruuKiPZ.js";var s,c;function l(){return(l=t((()=>{s=e(n(),1),a(),o(),c=({chart:e=r,createTooltip:t,data:n,...a})=>{let o=i(e,n,a,{createTooltip:t});return s.createElement(`div`,{className:`sparkline-container`,ref:o})},c.__docgenInfo={description:``,methods:[],displayName:`Sparkline`,props:{a11yTitle:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`The name screen readers announce for the chart, rendered as its svg's
\`<title>\`. Unset, the chart is announced by its type, such as "Bar chart".`},a11yDescription:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:"A longer description screen readers announce after the name, such as\nwhat the data shows, rendered as the svg's `<desc>`."},data:{required:!0,tsType:{name:`union`,raw:`SparklineChartDataShape[] | null`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [SparklineChartKeys.Value]: number;
    [SparklineChartKeys.Date]: string;
}`,signature:{properties:[]}}],raw:`SparklineChartDataShape[]`},{name:`null`}]},description:`Internally used, do not overwrite.

Required. \`null\` means the data has not arrived yet: nothing is drawn
until it does. Leaving it out is an error.`},animationDuration:{required:!1,tsType:{name:`number`},description:`Gets or Sets the duration of the animation`},areaGradient:{required:!1,tsType:{name:`tuple`,raw:`[string, string]`,elements:[{name:`string`},{name:`string`}]},description:`Gets or Sets the areaGradient of the chart`},dateLabel:{required:!1,tsType:{name:`string`},description:`Gets or Sets the dateLabel of the chart`},exportChart:{required:!1,tsType:{name:`string`},description:`The filename to export the chart to. Setting it exports a png and fires
a download, which is what the chart's \`exportChart\` command does; it is
not a callback, and the four other components that declare this prop had
it as one. The chart's exporter treats the title as optional, so a
filename on its own is enough.`},height:{required:!1,tsType:{name:`number`},description:`Gets or Sets the height of the chart`},isAnimated:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the isAnimated property of the chart,
making it to animate when render.
By default this is 'false'`},isLoading:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets whether a loading state will be shown`},lineGradient:{required:!1,tsType:{name:`tuple`,raw:`[string, string]`,elements:[{name:`string`},{name:`string`}]},description:`Gets or Sets the lineGradient of the chart`},margin:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}`,signature:{properties:[{key:`top`,value:{name:`number`,required:!1}},{key:`bottom`,value:{name:`number`,required:!1}},{key:`left`,value:{name:`number`,required:!1}},{key:`right`,value:{name:`number`,required:!1}}]}},description:`Gets or Sets the margin of the chart`},valueLabel:{required:!1,tsType:{name:`string`},description:`Gets or Sets the valueLabel of the chart`},width:{required:!1,tsType:{name:`number`},description:`Gets or Sets the width of the chart`},chart:{required:!1,tsType:{name:`Wrapper`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [SparklineChartKeys.Value]: number;
    [SparklineChartKeys.Date]: string;
}`,signature:{properties:[]}}],raw:`SparklineChartDataShape[]`},{name:`intersection`,raw:`ChartModuleSelection<
    SparklineChartDataShape[]
> &
    SparklineChartAPI`,elements:[{name:`signature`,type:`function`,raw:`<
    TElement extends Element,
    TParent extends Element | null,
    TParentDatum,
>(
    _selection: Selection<TElement, DataShape, TParent, TParentDatum>
) => void`,signature:{arguments:[{type:{name:`Selection`,elements:[{name:`TElement`},{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [SparklineChartKeys.Value]: number;
    [SparklineChartKeys.Date]: string;
}`,signature:{properties:[]}}],raw:`SparklineChartDataShape[]`},{name:`TParent`},{name:`TParentDatum`}],raw:`Selection<TElement, DataShape, TParent, TParentDatum>`},name:`_selection`}],return:{name:`void`}}},{name:`SparklineChartAPI`}]}],raw:`Wrapper<SparklineChartDataShape[], SparklineChartModule>`},description:`Internally used, do not overwrite.

@ignore`,defaultValue:{value:`{
    create(el, data, configuration = {}) {
        const container = select<HTMLElement, SparklineChartDataShape[]>(
            el
        );
        const chart = sparkline();

        validateContainer(container);
        validateConfiguration(chart, configuration);

        // Calls the chart with the container and dataset
        container
            .datum(data)
            .call(applyConfiguration(chart, configuration));

        return chart;
    },

    update(el, data, configuration = {}, chart) {
        const container = select<HTMLElement, SparklineChartDataShape[]>(
            el
        );

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
@internal`}}}})))()}var u,d,f;function p(){return(p=t((()=>{u=()=>[{name:`Blazing`,value:2,date:`2011-01-05T00:00:00Z`},{name:`Blazing`,value:2,date:`2011-01-06T00:00:00Z`},{name:`Blazing`,value:3,date:`2011-01-07T00:00:00Z`},{name:`Blazing`,value:5,date:`2011-01-08T00:00:00Z`},{name:`Blazing`,value:3,date:`2011-01-09T00:00:00Z`},{name:`Blazing`,value:6,date:`2011-01-10T00:00:00Z`},{name:`Blazing`,value:7,date:`2011-01-11T00:00:00Z`},{name:`Blazing`,value:1,date:`2011-01-12T00:00:00Z`}],d=()=>[{name:`Glittering`,value:2,date:`2011-01-05T00:00:00Z`},{name:`Glittering`,value:5,date:`2011-01-06T00:00:00Z`},{name:`Glittering`,value:16,date:`2011-01-07T00:00:00Z`},{name:`Glittering`,value:23,date:`2011-01-08T00:00:00Z`},{name:`Glittering`,value:18,date:`2011-01-09T00:00:00Z`},{name:`Glittering`,value:25,date:`2011-01-10T00:00:00Z`},{name:`Glittering`,value:28,date:`2011-01-11T00:00:00Z`},{name:`Glittering`,value:2,date:`2011-01-12T00:00:00Z`}],f={withLowValues:u,with1Source:d}})))()}var m,h,g,_,v,y,b;function x(){return(x=t((()=>{m=e(n(),1),l(),p(),h={title:`Charts/Sparkline`,component:c},g=e=>{let t=f.with1Source();return m.createElement(c,{...e,data:t})},g.args={isAnimated:!1},g.parameters={controls:{exclude:[`data`,`chart`,`createTooltip`]}},_=()=>{let e=f.withLowValues();return m.createElement(c,{data:e,height:100,width:400})},v=()=>{let e=f.with1Source();return m.createElement(c,{data:e,isAnimated:!0,width:400,animationDuration:1e3,height:100})},y=()=>m.createElement(c,{data:[],height:100,width:200,isLoading:!0}),g.__docgenInfo={description:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,methods:[],displayName:`Playground`},_.__docgenInfo={description:``,methods:[],displayName:`WithFixedWidth`},v.__docgenInfo={description:``,methods:[],displayName:`WithAnimation`},y.__docgenInfo={description:``,methods:[],displayName:`WithLoadingState`},b=[`Playground`,`WithFixedWidth`,`WithAnimation`,`WithLoadingState`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`args => {
  const data = sparklineData.with1Source();
  return <Sparkline {...args} data={data} />;
}`,...g.parameters?.docs?.source},description:{story:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`() => {
  const data = sparklineData.withLowValues();
  return <Sparkline data={data} height={100} width={400} />;
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => {
  const data = sparklineData.with1Source();
  return <Sparkline data={data} isAnimated={true} width={400} animationDuration={1000} height={100} />;
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  const data: [] = [];
  return <Sparkline data={data} height={100} width={200} isLoading={true} />;
}`,...y.parameters?.docs?.source}}}})))()}x();export{g as Playground,v as WithAnimation,_ as WithFixedWidth,y as WithLoadingState,b as __namedExportsOrder,h as default};