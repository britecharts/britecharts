import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{F as r,U as i,_ as a,c as o,ct as s,d as c,f as l,g as u,i as d,l as f,lt as p,n as m,o as h,p as g,r as _,s as v,t as y,u as b,y as x}from"./useChart-D3Rr4D-_.js";import{n as S,t as C}from"./ordinal-BmZ7Uy5l.js";import{a as w,o as T}from"./constants-C5vU1Sjl.js";import{n as E,r as D}from"./text-Vq4uGtnA.js";function O(){let e={top:5,right:5,bottom:5,left:5},t=320,n=180,r=16,a=1.5,o=`s`,s=``,c=!1,d=null,f=!0,m,h=null,_=u.colorSchemas.britecharts,v,y,b,x,C,w=.5,D=`is-faded`,O=({id:e})=>e,k=({name:e})=>e,A=({quantity:e})=>i(o)(e)+s,j=({name:e})=>h===null?m(e):h[e]?h[e]:m(e),M=({quantity:e})=>typeof e==`number`||typeof e==`string`;function N(r){r.each(function(r){y=t-(e.left??0)-(e.right??0),b=n-(e.top??0)-(e.bottom??0),x=H(r),I(),z(this),c?W():G(),d&&(U(),K(d))})}function P(){let e=C.select(`.legend-line`).node().getBoundingClientRect().width+r;y-e<=0&&J(),B()}function F(){C.append(`g`).classed(`legend-container-group`,!0).attr(`transform`,`translate(${e.left},${e.top})`).append(`g`).classed(`legend-group`,!0)}function I(){m=S().range(_)}let L=null,R=null;function z(e){C||(C=p(e).append(`svg`).classed(`britechart britechart-legend`,!0),F()),C.attr(`viewBox`,[0,0,t,n]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,t).attr(`height`,n),l(C.node(),{a11yTitle:L,a11yDescription:R,fallbackTitle:`Legend`,role:`group`})}function B(){let e=C.select(`g.legend-container-group`).node().getBoundingClientRect().width+q(),n=t-e,r=n/2;n>0&&C.select(`g.legend-container-group`).attr(`transform`,`translate(${r},0)`)}function V(){let e=C.select(`g.legend-container-group`).node().getBoundingClientRect().width,n=t-e,r=n/2-e/2;n>0&&C.select(`g.legend-container-group`).attr(`transform`,`translate(${r},0)`)}function H(e){return f=e.filter(M).length===e.length,e.reduce((e,t)=>{let n=t;return n.quantity!==void 0&&n.quantity!==null&&(n.quantity=+n.quantity),n.name=String(n.name),n.id=+n.id,[...e,n]},[])}function U(){C.select(`.legend-group`).selectAll(`g.legend-entry`).classed(D,!1)}function W(){let e=r;C.select(`.legend-group`).selectAll(`g`).remove(),C.select(`.legend-group`).append(`g`).classed(`legend-line`,!0),v=C.select(`.legend-line`).selectAll(`g.legend-entry`).data(x),v.enter().append(`g`).classed(`legend-entry`,!0).attr(`data-item`,O).attr(`transform`,function({name:t}){let n=e,i=b/2,a=E(t,12);return e+=r+2*q()+a,`translate(${n},${i})`}).merge(v).append(`circle`).classed(`legend-circle`,!0).attr(`cx`,r/2).attr(`cy`,-5).attr(`r`,r/2).style(`fill`,j).style(`stroke-width`,1),C.select(`.legend-group`).selectAll(`g.legend-entry`).append(`text`).classed(`legend-entry-name`,!0).text(k).attr(`x`,q()).style(`font-size`,`12px`).style(`letter-spacing`,`${w}px`),C.select(`.legend-group`).selectAll(`g.legend-entry`).exit().transition().duration(g(T.defaultDuration)).style(`opacity`,0).remove(),P()}function G(){C.select(`.legend-group`).selectAll(`g`).remove(),v=C.select(`.legend-group`).selectAll(`g.legend-line`).data(x),v.enter().append(`g`).classed(`legend-line`,!0).append(`g`).classed(`legend-entry`,!0).attr(`data-item`,O).attr(`transform`,function(e,t){let n=r+q(),i=b/(x.length+1);return`translate(${n},${(t+1)*i})`}).merge(v).append(`circle`).classed(`legend-circle`,!0).attr(`cx`,r/2).attr(`cy`,-5).attr(`r`,r/2).style(`fill`,j).style(`stroke-width`,1),C.select(`.legend-group`).selectAll(`g.legend-line`).selectAll(`g.legend-entry`).append(`text`).classed(`legend-entry-name`,!0).text(k).attr(`x`,q()).style(`font-size`,`12px`).style(`letter-spacing`,`${w}px`),f?Y():V(),C.select(`.legend-group`).selectAll(`g.legend-line`).exit().transition().duration(g(T.defaultDuration)).style(`opacity`,0).remove()}function K(e){let t=C.select(`[data-item="${e}"]`);t.nodes().length&&(C.select(`.legend-group`).selectAll(`g.legend-entry`).classed(D,!0),t.classed(D,!1))}function q(){return a*r}function J(){let e=C.selectAll(`.legend-entry`),t=e.size(),n=b/2*1.7,i=C.select(`.legend-group`).append(`g`).classed(`legend-line`,!0).attr(`transform`,`translate(0, ${n})`),a=e.filter(`:nth-child(${t})`);a.attr(`transform`,`translate(${r},0)`),i.append(()=>a.node())}function Y(){C.select(`.legend-group`).selectAll(`g.legend-line`).selectAll(`g.legend-entry`).append(`text`).classed(`legend-entry-value`,!0).text(A).attr(`x`,y-40).style(`font-size`,`12px`).style(`letter-spacing`,`0.8px`).style(`text-anchor`,`end`).style(`startOffset`,`100%`)}return N.a11yTitle=function(e){return arguments.length?(L=e,this):L},N.a11yDescription=function(e){return arguments.length?(R=e,this):R},N.clearHighlight=function(){U()},N.colorMap=function(e){return arguments.length?(h=e,this):h},N.colorSchema=function(e){return arguments.length?(_=e,this):_},N.height=function(e){return arguments.length?(n=e,this):n},N.highlight=function(e){U(),K(e)},N.highlightEntryById=function(e){return arguments.length?(d=e,this):d},N.isHorizontal=function(e){return arguments.length?(c=e,this):c},N.margin=function(t){return arguments.length?(e={...e,...t},this):e},N.marginRatio=function(e){return arguments.length?(a=e,this):a},N.markerSize=function(e){return arguments.length?(r=e,this):r},N.numberFormat=function(e){return arguments.length?(o=e,this):o},N.unit=function(e){return arguments.length?(s=e,this):s},N.width=function(e){return arguments.length?(t=e,this):t},N}function k(){return(k=t((()=>{r(),C(),s(),x(),D(),a(),c(),w()})))()}var A;function j(){return(j=t((()=>{s(),k(),o(),v(),_(),A={create(e,t,n={}){let r=p(e),i=O();return b(r),f(i,n,`legend`),r.datum(t).call(h(i,n)),i},update(e,t,n={},r){let i=p(e);return b(i),f(r,n,`legend`),h(r,n),t&&t.length?i.datum(t).call(r):i.call(r),r},destroy:d}})))()}var M,N;function P(){return(P=t((()=>{M=e(n(),1),j(),y(),N=({chart:e=A,createTooltip:t,data:n,...r})=>{let i=m(e,n,r);return M.createElement(`div`,{className:`legend-container`,ref:i})},N.__docgenInfo={description:``,methods:[],displayName:`Legend`,props:{a11yTitle:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`The name screen readers announce for the chart, set as its svg's
\`aria-label\`. Unset, the chart is announced by its type, such as "Bar chart".`},a11yDescription:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:"A longer description screen readers announce after the name, such as\nwhat the data shows, rendered as the svg's `<desc>`."},data:{required:!0,tsType:{name:`union`,raw:`LegendDataShape[] | null`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
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
        validateConfiguration(chart, configuration, 'legend');

        // Calls the chart with the container and dataset
        container.datum(data).call(applyConfiguration(chart, configuration));

        return chart;
    },

    update(el, data, configuration = {}, chart) {
        const container = select<HTMLElement, LegendDataShape[]>(el);

        validateContainer(container);
        validateConfiguration(chart, configuration, 'legend');
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

@ignore`}}}})))()}export{P as n,N as t};