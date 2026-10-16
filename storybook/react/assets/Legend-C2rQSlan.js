import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-BGJ90fIb.js";import{_ as r,n as i,r as a,t as o}from"./useChart-DruuKiPZ.js";var s,c;function l(){return(l=t((()=>{s=e(n(),1),a(),o(),c=({chart:e=r,createTooltip:t,data:n,...a})=>{let o=i(e,n,a);return s.createElement(`div`,{className:`legend-container`,ref:o})},c.__docgenInfo={description:``,methods:[],displayName:`Legend`,props:{a11yTitle:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`The name screen readers announce for the chart, rendered as its svg's
\`<title>\`. Unset, the chart is announced by its type, such as "Bar chart".`},a11yDescription:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:"A longer description screen readers announce after the name, such as\nwhat the data shows, rendered as the svg's `<desc>`."},data:{required:!0,tsType:{name:`union`,raw:`LegendDataShape[] | null`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [LegendKeys.Name]: string;
    [LegendKeys.Id]: number;
    [LegendKeys.Quantity]?: number;
}`,signature:{properties:[]}}],raw:`LegendDataShape[]`},{name:`null`}]},description:`The data to be used by the chart

Required. \`null\` means the data has not arrived yet: nothing is drawn
until it does. Leaving it out is an error.`},clearHighlight:{required:!1,tsType:{name:`boolean`},description:`Clears all highlighted entries`},colorMap:{required:!1,tsType:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`},description:`Current colorMap or Chart module to chain calls`},colorSchema:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`Gets or Sets the colorSchema of the chart`},height:{required:!1,tsType:{name:`number`},description:`Gets or Sets the height of the legend chart`},highlight:{required:!1,tsType:{name:`number`},description:`Command that highlights a line entry by fading the rest of lines`},highlightEntryById:{required:!1,tsType:{name:`number`},description:`Highlights a line entry by fading the rest of lines`},isHorizontal:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the horizontal mode on the legend`},margin:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}`,signature:{properties:[{key:`top`,value:{name:`number`,required:!1}},{key:`bottom`,value:{name:`number`,required:!1}},{key:`left`,value:{name:`number`,required:!1}},{key:`right`,value:{name:`number`,required:!1}}]}},description:`Gets or Sets the margin of the legend chart`},marginRatio:{required:!1,tsType:{name:`number`},description:`Gets or Sets the margin ratio of the legend chart. Used to determine spacing between legend elements.`},markerSize:{required:!1,tsType:{name:`number`},description:`Gets or Sets the markerSize of the legend chart. This markerSize will determine
the horizontal and vertical size of the colored marks added as color
identifiers for the chart's categories.`},numberFormat:{required:!1,tsType:{name:`string`},description:`Gets or Sets the number format of the legend chart`},unit:{required:!1,tsType:{name:`string`},description:`Gets or Sets the unit of the value`},width:{required:!1,tsType:{name:`number`},description:`Gets or Sets the width of the chart`},chart:{required:!1,tsType:{name:`Wrapper`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [LegendKeys.Name]: string;
    [LegendKeys.Id]: number;
    [LegendKeys.Quantity]?: number;
}`,signature:{properties:[]}}],raw:`LegendDataShape[]`},{name:`intersection`,raw:`ChartModuleSelection<LegendDataShape[]> & LegendAPI`,elements:[{name:`signature`,type:`function`,raw:`<
    TElement extends Element,
    TParent extends Element | null,
    TParentDatum,
>(
    _selection: Selection<TElement, DataShape, TParent, TParentDatum>
) => void`,signature:{arguments:[{type:{name:`Selection`,elements:[{name:`TElement`},{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [LegendKeys.Name]: string;
    [LegendKeys.Id]: number;
    [LegendKeys.Quantity]?: number;
}`,signature:{properties:[]}}],raw:`LegendDataShape[]`},{name:`TParent`},{name:`TParentDatum`}],raw:`Selection<TElement, DataShape, TParent, TParentDatum>`},name:`_selection`}],return:{name:`void`}}},{name:`LegendAPI`}]}],raw:`Wrapper<LegendDataShape[], LegendModule>`},description:`Internally used, do not overwrite.

@ignore`,defaultValue:{value:`{
    create(el, data, configuration = {}) {
        const container = select<HTMLElement, LegendDataShape[]>(el);
        const chart = legend();

        validateContainer(container);
        validateConfiguration(chart, configuration);

        // Calls the chart with the container and dataset
        container.datum(data).call(applyConfiguration(chart, configuration));

        return chart;
    },

    update(el, data, configuration = {}, chart) {
        const container = select<HTMLElement, LegendDataShape[]>(el);

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
it decorates, and a legend has no tooltip to redraw. Declared so a
TypeScript consumer can pass it.

@ignore`}}}})))()}export{l as n,c as t};