import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{$ as r,Q as i,c as a,d as o,f as s,g as c,h as l,i as u,j as d,l as f,n as p,o as m,r as h,s as g,t as _,u as v,v as y,z as b}from"./useChart-DDUr6ndH.js";import{n as x,t as S}from"./ordinal-DF61rc3G.js";import{n as C,r as w}from"./text-7gI9bkr7.js";function T(){let e={top:5,right:5,bottom:5,left:5},t=320,n=180,i=16,a=1.5,o=`s`,c=``,u=!1,d=null,f=!0,p,m=null,h=l.colorSchemas.britecharts,g,_,v,y,S,w=.5,T=`is-faded`,E=({id:e})=>e,D=({name:e})=>e,O=({quantity:e})=>b(o)(e)+c,k=({name:e})=>m===null?p(e):m[e]?m[e]:p(e),A=({quantity:e})=>typeof e==`number`||typeof e==`string`;function j(r){r.each(function(r){_=t-(e.left??0)-(e.right??0),v=n-(e.top??0)-(e.bottom??0),y=B(r),P(),L(this),u?H():U(),d&&(V(),W(d))})}function M(){let e=S.select(`.legend-line`).node().getBoundingClientRect().width+i;_-e<=0&&K(),R()}function N(){S.append(`g`).classed(`legend-container-group`,!0).attr(`transform`,`translate(${e.left},${e.top})`).append(`g`).classed(`legend-group`,!0)}function P(){p=x().range(h)}let F=null,I=null;function L(e){S||(S=r(e).append(`svg`).classed(`britechart britechart-legend`,!0),N()),S.attr(`viewBox`,[0,0,t,n]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,t).attr(`height`,n),s(S.node(),{a11yTitle:F,a11yDescription:I,fallbackTitle:`Legend`,role:`group`})}function R(){let e=S.select(`g.legend-container-group`).node().getBoundingClientRect().width+G(),n=t-e,r=n/2;n>0&&S.select(`g.legend-container-group`).attr(`transform`,`translate(${r},0)`)}function z(){let e=S.select(`g.legend-container-group`).node().getBoundingClientRect().width,n=t-e,r=n/2-e/2;n>0&&S.select(`g.legend-container-group`).attr(`transform`,`translate(${r},0)`)}function B(e){return f=e.filter(A).length===e.length,e.reduce((e,t)=>{let n=t;return n.quantity!==void 0&&n.quantity!==null&&(n.quantity=+n.quantity),n.name=String(n.name),n.id=+n.id,[...e,n]},[])}function V(){S.select(`.legend-group`).selectAll(`g.legend-entry`).classed(T,!1)}function H(){let e=i;S.select(`.legend-group`).selectAll(`g`).remove(),S.select(`.legend-group`).append(`g`).classed(`legend-line`,!0),g=S.select(`.legend-line`).selectAll(`g.legend-entry`).data(y),g.enter().append(`g`).classed(`legend-entry`,!0).attr(`data-item`,E).attr(`transform`,function({name:t}){let n=e,r=v/2,a=C(t,12);return e+=i+2*G()+a,`translate(${n},${r})`}).merge(g).append(`circle`).classed(`legend-circle`,!0).attr(`cx`,i/2).attr(`cy`,-5).attr(`r`,i/2).style(`fill`,k).style(`stroke-width`,1),S.select(`.legend-group`).selectAll(`g.legend-entry`).append(`text`).classed(`legend-entry-name`,!0).text(D).attr(`x`,G()).style(`font-size`,`12px`).style(`letter-spacing`,`${w}px`),S.select(`.legend-group`).selectAll(`g.legend-entry`).exit().transition().style(`opacity`,0).remove(),M()}function U(){S.select(`.legend-group`).selectAll(`g`).remove(),g=S.select(`.legend-group`).selectAll(`g.legend-line`).data(y),g.enter().append(`g`).classed(`legend-line`,!0).append(`g`).classed(`legend-entry`,!0).attr(`data-item`,E).attr(`transform`,function(e,t){let n=i+G(),r=v/(y.length+1);return`translate(${n},${(t+1)*r})`}).merge(g).append(`circle`).classed(`legend-circle`,!0).attr(`cx`,i/2).attr(`cy`,-5).attr(`r`,i/2).style(`fill`,k).style(`stroke-width`,1),S.select(`.legend-group`).selectAll(`g.legend-line`).selectAll(`g.legend-entry`).append(`text`).classed(`legend-entry-name`,!0).text(D).attr(`x`,G()).style(`font-size`,`12px`).style(`letter-spacing`,`${w}px`),f?q():z(),S.select(`.legend-group`).selectAll(`g.legend-line`).exit().transition().style(`opacity`,0).remove()}function W(e){let t=S.select(`[data-item="${e}"]`);t.nodes().length&&(S.select(`.legend-group`).selectAll(`g.legend-entry`).classed(T,!0),t.classed(T,!1))}function G(){return a*i}function K(){let e=S.selectAll(`.legend-entry`),t=e.size(),n=v/2*1.7,r=S.select(`.legend-group`).append(`g`).classed(`legend-line`,!0).attr(`transform`,`translate(0, ${n})`),a=e.filter(`:nth-child(${t})`);a.attr(`transform`,`translate(${i},0)`),r.append(()=>a.node())}function q(){S.select(`.legend-group`).selectAll(`g.legend-line`).selectAll(`g.legend-entry`).append(`text`).classed(`legend-entry-value`,!0).text(O).attr(`x`,_-40).style(`font-size`,`12px`).style(`letter-spacing`,`0.8px`).style(`text-anchor`,`end`).style(`startOffset`,`100%`)}return j.a11yTitle=function(e){return arguments.length?(F=e,this):F},j.a11yDescription=function(e){return arguments.length?(I=e,this):I},j.clearHighlight=function(){V()},j.colorMap=function(e){return arguments.length?(m=e,this):m},j.colorSchema=function(e){return arguments.length?(h=e,this):h},j.height=function(e){return arguments.length?(n=e,this):n},j.highlight=function(e){V(),W(e)},j.highlightEntryById=function(e){return arguments.length?(d=e,this):d},j.isHorizontal=function(e){return arguments.length?(u=e,this):u},j.margin=function(t){return arguments.length?(e={...e,...t},this):e},j.marginRatio=function(e){return arguments.length?(a=e,this):a},j.markerSize=function(e){return arguments.length?(i=e,this):i},j.numberFormat=function(e){return arguments.length?(o=e,this):o},j.unit=function(e){return arguments.length?(c=e,this):c},j.width=function(e){return arguments.length?(t=e,this):t},j}function E(){return(E=t((()=>{d(),S(),i(),y(),w(),c(),o()})))()}var D;function O(){return(O=t((()=>{i(),E(),a(),g(),h(),D={create(e,t,n={}){let i=r(e),a=T();return v(i),f(a,n,`legend`),i.datum(t).call(m(a,n)),a},update(e,t,n={},i){let a=r(e);return v(a),f(i,n,`legend`),m(i,n),t&&t.length?a.datum(t).call(i):a.call(i),i},destroy:u}})))()}var k,A;function j(){return(j=t((()=>{k=e(n(),1),O(),_(),A=({chart:e=D,createTooltip:t,data:n,...r})=>{let i=p(e,n,r);return k.createElement(`div`,{className:`legend-container`,ref:i})},A.__docgenInfo={description:``,methods:[],displayName:`Legend`,props:{a11yTitle:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`The name screen readers announce for the chart, set as its svg's
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

@ignore`}}}})))()}export{j as n,A as t};