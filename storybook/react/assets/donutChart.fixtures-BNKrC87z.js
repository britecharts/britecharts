import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-BGJ90fIb.js";import{b as r,n as i,r as a,t as o}from"./useChart-BKQ5wJ36.js";var s,c;function l(){return(l=t((()=>{s=e(n(),1),a(),o(),c=({chart:e=r,isAnimated:t=!0,createTooltip:n,data:a,...o})=>{let c=i(e,a,{isAnimated:t,...o});return s.createElement(`div`,{className:`donut-container`,style:{textAlign:`center`},ref:c})},c.__docgenInfo={description:``,methods:[],displayName:`Donut`,props:{a11yTitle:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`The name screen readers announce for the chart, rendered as its svg's
\`<title>\`. Unset, the chart is announced by its type, such as "Bar chart".`},a11yDescription:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:"A longer description screen readers announce after the name, such as\nwhat the data shows, rendered as the svg's `<desc>`."},data:{required:!0,tsType:{name:`union`,raw:`DonutChartDataShape[] | null`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [DonutChartKeys.Name]: string;
    [DonutChartKeys.Quantity]: number;
    /** Computed from the quantities when not given. */
    [DonutChartKeys.Percentage]?: number;
    /** Only the legend feature needs it. */
    [DonutChartKeys.ID]?: number;
}`,signature:{properties:[]}}],raw:`DonutChartDataShape[]`},{name:`null`}]},description:`Internally used, do not overwrite.

Required. \`null\` means the data has not arrived yet: nothing is drawn
until it does. Leaving it out is an error.`},animationDuration:{required:!1,tsType:{name:`number`},description:`Gets or Sets the duration of the animation`},centeredTextFunction:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(datum: DonutChartDataShape) => string`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
    [DonutChartKeys.Name]: string;
    [DonutChartKeys.Quantity]: number;
    /** Computed from the quantities when not given. */
    [DonutChartKeys.Percentage]?: number;
    /** Only the legend feature needs it. */
    [DonutChartKeys.ID]?: number;
}`,signature:{properties:[]}},name:`datum`}],return:{name:`string`}}},description:'Gets or Sets the centeredTextFunction of the chart. If function is provided the format will be changed by the custom function\'s value format. The default format function value is "${d.percentage}% ${d.name}". The callback will provide the data object with id, name, percentage, and quantity. Also provides the component added by the user in each data entry'},colorMap:{required:!1,tsType:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`},description:`Current colorMap or Chart module to chain calls`},colorSchema:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`Gets or Sets the colorSchema of the chart`},emptyDataConfig:{required:!1,tsType:{name:`DonutEmptyDataConfig`},description:`Gets or Sets the emptyDataConfig of the chart. If set and data is empty (quantity adds up to zero or there are no entries), the chart will render an empty slice with a given color (light gray by default)`},externalRadius:{required:!1,tsType:{name:`number`},description:`Gets or Sets the externalRadius of the chart`},hasCenterLegend:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the hasCenterLegend property of the chart, making it
display the legend at the center of the donut. By default this is 'true'`},hasFixedHighlightedSlice:{required:!1,tsType:{name:`boolean`},description:"Gets or Sets the hasFixedHighlightedSlice property of the chart, making it\nto highlight the selected slice id set with `highlightSliceById` all the time."},hasHoverAnimation:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the hasHoverAnimation property of the chart. By default, donut chart highlights the hovered slice. This property explicitly disables this hover behavior.`},hasLastHoverSliceHighlighted:{required:!1,tsType:{name:`boolean`},description:`Gets or sets the hasLastHoverSliceHighlighted property.
If property is true, the last hovered slice will be highlighted after 'mouseout\` event is triggered.
The last hovered slice will remain in highlight state. Note: if both hasFixedHighlightedSlice and hasLastHoverSliceHighlighted are true, the latter property will override the former.`},height:{required:!1,tsType:{name:`number`},description:`Gets or Sets the height of the chart`},highlightSliceById:{required:!1,tsType:{name:`number`},description:`Gets or Sets the id of the slice to highlight`},internalRadius:{required:!1,tsType:{name:`number`},description:`Gets or Sets the internalRadius of the chart`},isAnimated:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the isAnimated property of the chart, making it to animate
when render. By default this is 'false'`,defaultValue:{value:`true`,computed:!1}},isLoading:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets whether a loading state will be shown`},margin:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}`,signature:{properties:[{key:`top`,value:{name:`number`,required:!1}},{key:`bottom`,value:{name:`number`,required:!1}},{key:`left`,value:{name:`number`,required:!1}},{key:`right`,value:{name:`number`,required:!1}}]}},description:`Gets or Sets the margin of the chart`},numberFormat:{required:!1,tsType:{name:`string`},description:`Gets or Sets the number format of the donut chart`},orderingFunction:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(
    a: DonutChartDataShape,
    b: DonutChartDataShape
) => number`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
    [DonutChartKeys.Name]: string;
    [DonutChartKeys.Quantity]: number;
    /** Computed from the quantities when not given. */
    [DonutChartKeys.Percentage]?: number;
    /** Only the legend feature needs it. */
    [DonutChartKeys.ID]?: number;
}`,signature:{properties:[]}},name:`a`},{type:{name:`signature`,type:`object`,raw:`{
    [DonutChartKeys.Name]: string;
    [DonutChartKeys.Quantity]: number;
    /** Computed from the quantities when not given. */
    [DonutChartKeys.Percentage]?: number;
    /** Only the legend feature needs it. */
    [DonutChartKeys.ID]?: number;
}`,signature:{properties:[]}},name:`b`}],return:{name:`number`}}},description:`Changes the order of items given custom function`},percentageFormat:{required:!1,tsType:{name:`string`},description:`Gets or Sets the percentage format for the percentage label`},radiusHoverOffset:{required:!1,tsType:{name:`number`},description:`Gets or Sets the radiusHoverOffset of the chart`},width:{required:!1,tsType:{name:`number`},description:`Gets or Sets the width of the chart`},customMouseOver:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:``},customMouseOut:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:``},customMouseMove:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:``},customClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(...args: never[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`never`}],raw:`never[]`},name:`args`,rest:!0}],return:{name:`void`}}},description:``},chart:{required:!1,tsType:{name:`Wrapper`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [DonutChartKeys.Name]: string;
    [DonutChartKeys.Quantity]: number;
    /** Computed from the quantities when not given. */
    [DonutChartKeys.Percentage]?: number;
    /** Only the legend feature needs it. */
    [DonutChartKeys.ID]?: number;
}`,signature:{properties:[]}}],raw:`DonutChartDataShape[]`},{name:`intersection`,raw:`ChartModuleSelection<DonutChartDataShape[]> &
DonutChartAPI`,elements:[{name:`signature`,type:`function`,raw:`<
    TElement extends Element,
    TParent extends Element | null,
    TParentDatum,
>(
    _selection: Selection<TElement, DataShape, TParent, TParentDatum>
) => void`,signature:{arguments:[{type:{name:`Selection`,elements:[{name:`TElement`},{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [DonutChartKeys.Name]: string;
    [DonutChartKeys.Quantity]: number;
    /** Computed from the quantities when not given. */
    [DonutChartKeys.Percentage]?: number;
    /** Only the legend feature needs it. */
    [DonutChartKeys.ID]?: number;
}`,signature:{properties:[]}}],raw:`DonutChartDataShape[]`},{name:`TParent`},{name:`TParentDatum`}],raw:`Selection<TElement, DataShape, TParent, TParentDatum>`},name:`_selection`}],return:{name:`void`}}},{name:`DonutChartAPI`}]}],raw:`Wrapper<DonutChartDataShape[], DonutChartModule>`},description:`Internally used, do not overwrite.`,defaultValue:{value:`{
    create(el, data, configuration = {}) {
        const container = select<HTMLElement, DonutChartDataShape[]>(el);
        const chart = donut();

        validateContainer(container);
        validateConfiguration(chart, configuration);

        // Calls the chart with the container and dataset
        container.datum(data).call(applyConfiguration(chart, configuration));

        return chart;
    },

    update(el, data, configuration = {}, chart) {
        const container = select<HTMLElement, DonutChartDataShape[]>(el);

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

Accepted and deliberately dropped: a Tooltip hands this to every chart
it decorates, and this component takes it out of the configuration
rather than passing it on. Declared so a TypeScript consumer using
Tooltip's render prop around a Donut can pass it.

@ignore`}}}})))()}var u,d;function f(){return(f=t((()=>{u=()=>[{quantity:60,percentage:60,name:`React`,id:1},{quantity:20,percentage:20,name:`Ember`,id:2},{quantity:10,percentage:10,name:`Angular`,id:3},{quantity:10,percentage:10,name:`Backbone`,id:4}],d={with4Slices:u}})))()}export{l as i,f as n,c as r,d as t};