import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{A as r,C as i,E as ee,M as a,N as te,P as o,_ as ne,bt as s,c,f as l,g as re,i as u,k as ie,l as d,n as f,o as p,p as m,r as h,s as g,t as _,u as v,yt as y}from"./useChart-Dtzmdjjt.js";import{n as ae}from"./quad-qkBhhiXk.js";import{n as b,t as x}from"./linear-DTS9sWuJ.js";import{t as S}from"./extent-CL2rf33s.js";import{N as C,a as w,j as T,l as E,o as oe,u as D}from"./constants-lTVO4eNN.js";import{n as O,t as se}from"./export-C3NZd6te.js";import{n as ce,t as k}from"./line-D8Gh3ZYe.js";import{n as A,t as le}from"./area-BwciJkHy.js";function j(){let e={left:5,right:5,top:5,bottom:5},t=100,n=30,r=!1,i,a,o=[`var(--bc-sparkline-area-start, #f5fdff)`,`var(--bc-sparkline-area-end, #f6fefc)`],c,l=ie.colorGradients.greenBlue,u,d,f,p,h,g,_=!1,v=oe.duration,y,x,w,T=C(`sparkline-area-gradient`),D=C(`sparkline-line-gradient`),O=C(`maskingClip`),k=ae,A=({date:e})=>e,j=({value:e})=>e;function M(i){i.each(function(i){p=t-(e.left??0)-(e.right??0),h=n-(e.top??0)-(e.bottom??0),g=B(i),z(this),ne(f.node(),L&&!r?R():null),r?K():(V(),P(),H(),U(),W(),G(),q())})}function N(){let t=f.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${e.left},${e.top})`);f.append(`g`).classed(`loading-state-group`,!0),t.append(`g`).classed(`chart-group`,!0),t.append(`g`).classed(`metadata-group`,!0)}function P(){i=b().domain(S(g,A)).range([0,p]),a=b().domain(S(g,j)).range([h,0])}let F=null,I=null,L=!0;function R(){return{columns:[`Date`,`Value`],rows:g.map(e=>[e.date,e.value])}}function z(e){f||(f=s(e).append(`svg`).classed(`britechart sparkline`,!0),N()),f.attr(`viewBox`,[0,0,t,n]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,t).attr(`height`,n),m(f.node(),{a11yTitle:F,a11yDescription:I,fallbackTitle:`Sparkline`})}function B(e){return e.reduce((e,t)=>{let n=t;return n.date=new Date(n.date),n.value=+n.value,[...e,n]},[])}function V(){f.select(`.loading-state-group svg`).remove()}function H(){let e=f.select(`.metadata-group`);(c||u)&&(f.selectAll(`#${T}`).remove(),f.selectAll(`#${D}`).remove()),c=e.append(`linearGradient`).attr(`id`,T).attr(`class`,`area-gradient`).attr(`gradientUnits`,`userSpaceOnUse`).attr(`x1`,0).attr(`x2`,i(g[g.length-1].date)).attr(`y1`,0).attr(`y2`,0).selectAll(`stop`).data([{offset:`0%`,color:o[0]},{offset:`100%`,color:o[1]}]).enter().append(`stop`).attr(`offset`,({offset:e})=>e).style(`stop-color`,({color:e})=>e),u=e.append(`linearGradient`).attr(`id`,D).attr(`class`,`line-gradient`).attr(`gradientUnits`,`userSpaceOnUse`).attr(`x1`,0).attr(`x2`,i(g[g.length-1].date)).attr(`y1`,0).attr(`y2`,0).selectAll(`stop`).data([{offset:`0%`,color:l[0]},{offset:`100%`,color:l[1]}]).enter().append(`stop`).attr(`offset`,({offset:e})=>e).style(`stop-color`,({color:e})=>e)}function U(){d&&f.selectAll(`#${O}`).remove(),_&&!re()&&(d=f.select(`.metadata-group`).append(`clipPath`).attr(`id`,O).attr(`class`,`clip-path`).append(`rect`).attr(`width`,0).attr(`height`,n),s(`#${O} rect`).transition().ease(k).duration(v).attr(`width`,t))}function W(){x&&f.selectAll(`.sparkline-area`).remove(),x=le().x(({date:e})=>i(e)).y0(()=>a(0)+1).y1(({value:e})=>a(e)).curve(E),f.select(`.chart-group`).append(`path`).datum(g).attr(`class`,`sparkline-area`).attr(`fill`,`url(#${T})`).attr(`d`,x).attr(`clip-path`,`url(#${O})`)}function G(){y&&f.selectAll(`.line`).remove(),y=ce().curve(E).x(({date:e})=>i(e)).y(({value:e})=>a(e)),f.select(`.chart-group`).append(`path`).datum(g).attr(`class`,`line`).attr(`stroke`,`url(#${D})`).attr(`d`,y).attr(`clip-path`,`url(#${O})`).attr(`fill`,`none`)}function K(){f.select(`.loading-state-group`).html(ee)}function q(){w&&f.selectAll(`.sparkline-circle`).remove(),w=f.selectAll(`.chart-group`).append(`circle`).attr(`class`,`sparkline-circle`).attr(`cx`,i(g[g.length-1].date)).attr(`cy`,a(g[g.length-1].value)).attr(`r`,1.5)}return M.a11yTitle=function(e){return arguments.length?(F=e,this):F},M.a11yDescription=function(e){return arguments.length?(I=e,this):I},M.a11yDataTable=function(e){return arguments.length?(L=e,this):L},M.animationDuration=function(e){return arguments.length?(v=e,this):v},M.areaGradient=function(e){return arguments.length?(o=e,this):o},M.exportChart=function(e,t){return se.call(M,f,e,t)},M.height=function(e){return arguments.length?(n=e,this):n},M.isAnimated=function(e){return arguments.length?(_=e,this):_},M.lineGradient=function(e){return arguments.length?(l=e,this):l},M.isLoading=function(e){return arguments.length?(r=e,this):r},M.margin=function(t){return arguments.length?(e={...e,...t},this):e},M.width=function(e){return arguments.length?(t=e,this):t},M.render=function(e,t){return te(this,e,t)},M}function M(){return(M=t((()=>{x(),A(),k(),D(),y(),o(),O(),a(),r(),i(),T(),w(),l()})))()}var N;function P(){return(P=t((()=>{N={type:`object`,properties:{a11yDataTable:{type:`boolean`},a11yDescription:{anyOf:[{type:`null`},{type:`string`}]},a11yTitle:{anyOf:[{type:`null`},{type:`string`}]},animationDuration:{type:`number`},areaGradient:{type:`array`,prefixItems:[{type:`string`},{type:`string`}],items:!1,minItems:2},customBrushEnd:{not:{}},customBrushStart:{not:{}},customClick:{not:{}},customMouseMove:{not:{}},customMouseOut:{not:{}},customMouseOver:{not:{}},exportChart:{type:`string`},height:{type:`number`},isAnimated:{type:`boolean`},isLoading:{type:`boolean`},lineGradient:{type:`array`,prefixItems:[{type:`string`},{type:`string`}],items:!1,minItems:2},margin:{type:`object`,properties:{left:{type:`number`},right:{type:`number`},top:{type:`number`},bottom:{type:`number`}}},width:{type:`number`}},additionalProperties:!1}})))()}var F;function I(){return(I=t((()=>{y(),M(),c(),g(),h(),P(),F={create(e,t,n={}){let r=s(e),i=j();return v(r),d(i,n,`sparkline`,N),r.datum(t).call(p(i,n)),i},update(e,t,n={},r){let i=s(e);return v(i),d(r,n,`sparkline`,N),p(r,n),t&&t.length?i.datum(t).call(r):i.call(r),r},destroy:u}})))()}var L,R;function z(){return(z=t((()=>{L=e(n(),1),I(),_(),R=({chart:e=F,createTooltip:t,data:n,...r})=>{let i=f(e,n,r,{createTooltip:t});return L.createElement(`div`,{className:`sparkline-container`,ref:i})},R.__docgenInfo={description:``,methods:[],displayName:`Sparkline`,props:{a11yTitle:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`The name screen readers announce for the chart, set as its svg's
\`aria-label\`. Unset, the chart is announced by its type, such as "Bar chart".`},a11yDescription:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:"A longer description screen readers announce after the name, such as\nwhat the data shows, rendered as the svg's `<desc>`."},a11yDataTable:{required:!1,tsType:{name:`boolean`},description:`Whether the chart renders its data as a visually hidden table after its
svg, which screen readers can read cell by cell. On by default.`},data:{required:!0,tsType:{name:`union`,raw:`SparklineChartDataShape[] | null`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [SparklineChartKeys.Value]: number;
    [SparklineChartKeys.Date]: string;
}`,signature:{properties:[]}}],raw:`SparklineChartDataShape[]`},{name:`null`}]},description:`Internally used, do not overwrite.

Required. \`null\` means the data has not arrived yet: nothing is drawn
until it does. Leaving it out is an error.`},animationDuration:{required:!1,tsType:{name:`number`},description:`Gets or Sets the duration of the animation`},areaGradient:{required:!1,tsType:{name:`tuple`,raw:`[string, string]`,elements:[{name:`string`},{name:`string`}]},description:`Gets or Sets the areaGradient of the chart`},exportChart:{required:!1,tsType:{name:`string`},description:`The filename to export the chart to. Setting it exports the chart and fires
a download, which is what the chart's \`exportChart\` command does; it is
not a callback. The chart's exporter treats the title as optional, so a
filename on its own is enough.
A filename ending in \`.svg\` downloads an svg file, and any other a png.`},height:{required:!1,tsType:{name:`number`},description:`Gets or Sets the height of the chart`},isAnimated:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the isAnimated property of the chart,
making it to animate when render.
By default this is 'false'`},isLoading:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets whether a loading state will be shown`},lineGradient:{required:!1,tsType:{name:`tuple`,raw:`[string, string]`,elements:[{name:`string`},{name:`string`}]},description:`Gets or Sets the lineGradient of the chart`},margin:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}`,signature:{properties:[{key:`top`,value:{name:`number`,required:!1}},{key:`bottom`,value:{name:`number`,required:!1}},{key:`left`,value:{name:`number`,required:!1}},{key:`right`,value:{name:`number`,required:!1}}]}},description:`Gets or Sets the margin of the chart`},width:{required:!1,tsType:{name:`number`},description:`Gets or Sets the width of the chart`},chart:{required:!1,tsType:{name:`Wrapper`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
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
        validateConfiguration(chart, configuration, 'sparkline', schema);

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
        validateConfiguration(chart, configuration, 'sparkline', schema);
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
@internal`}}}})))()}var B,V,H,U;function W(){return(W=t((()=>{B=()=>[{name:`Blazing`,value:2,date:`2011-01-05T00:00:00Z`},{name:`Blazing`,value:2,date:`2011-01-06T00:00:00Z`},{name:`Blazing`,value:3,date:`2011-01-07T00:00:00Z`},{name:`Blazing`,value:5,date:`2011-01-08T00:00:00Z`},{name:`Blazing`,value:3,date:`2011-01-09T00:00:00Z`},{name:`Blazing`,value:6,date:`2011-01-10T00:00:00Z`},{name:`Blazing`,value:7,date:`2011-01-11T00:00:00Z`},{name:`Blazing`,value:1,date:`2011-01-12T00:00:00Z`}],V=()=>[{name:`Glittering`,value:2,date:`2011-01-05T00:00:00Z`},{name:`Glittering`,value:5,date:`2011-01-06T00:00:00Z`},{name:`Glittering`,value:16,date:`2011-01-07T00:00:00Z`},{name:`Glittering`,value:23,date:`2011-01-08T00:00:00Z`},{name:`Glittering`,value:18,date:`2011-01-09T00:00:00Z`},{name:`Glittering`,value:25,date:`2011-01-10T00:00:00Z`},{name:`Glittering`,value:28,date:`2011-01-11T00:00:00Z`},{name:`Glittering`,value:2,date:`2011-01-12T00:00:00Z`}],H=()=>[{name:`Glittering`,value:2,date:`2011-01-05T00:00:00Z`},{name:`Glittering`,value:-3,date:`2011-01-06T00:00:00Z`},{name:`Glittering`,value:5,date:`2011-01-07T00:00:00Z`},{name:`Glittering`,value:-1,date:`2011-01-08T00:00:00Z`},{name:`Glittering`,value:4,date:`2011-01-09T00:00:00Z`},{name:`Glittering`,value:-6,date:`2011-01-10T00:00:00Z`},{name:`Glittering`,value:3,date:`2011-01-11T00:00:00Z`},{name:`Glittering`,value:1,date:`2011-01-12T00:00:00Z`}],U={withNegativeValues:H,withLowValues:B,with1Source:V}})))()}var G,K,q,J,Y,X,Z,Q;function $(){return($=t((()=>{G=e(n(),1),z(),W(),K={title:`Charts/Sparkline`,component:R},q=e=>{let t=U.with1Source();return G.createElement(R,{...e,data:t})},q.args={isAnimated:!1},q.parameters={controls:{exclude:[`data`,`chart`,`createTooltip`]}},J=()=>{let e=U.withLowValues();return G.createElement(R,{data:e,height:100,width:400})},Y=()=>{let e=U.with1Source();return G.createElement(R,{data:e,isAnimated:!0})},X=()=>{let e=U.withNegativeValues();return G.createElement(R,{data:e,isAnimated:!0})},Z=()=>{let e=U.with1Source();return G.createElement(R,{data:e,isAnimated:!0,isLoading:!0})},q.__docgenInfo={description:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,methods:[],displayName:`Playground`},J.__docgenInfo={description:``,methods:[],displayName:`WithFixedWidth`},Y.__docgenInfo={description:``,methods:[],displayName:`WithAnimation`},X.__docgenInfo={description:``,methods:[],displayName:`WithNegativeValues`},Z.__docgenInfo={description:``,methods:[],displayName:`WithLoadingState`},Q=[`Playground`,`WithFixedWidth`,`WithAnimation`,`WithNegativeValues`,`WithLoadingState`],q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`args => {
  const data = sparklineData.with1Source();
  return <Sparkline {...args} data={data} />;
}`,...q.parameters?.docs?.source},description:{story:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`() => {
  const data = sparklineData.withLowValues();
  return <Sparkline data={data} height={100} width={400} />;
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`() => {
  const data = sparklineData.with1Source();
  return <Sparkline data={data} isAnimated={true} />;
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`() => {
  const data = sparklineData.withNegativeValues();
  return <Sparkline data={data} isAnimated={true} />;
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`() => {
  const data = sparklineData.with1Source();
  return <Sparkline data={data} isAnimated={true} isLoading={true} />;
}`,...Z.parameters?.docs?.source}}}})))()}$();export{q as Playground,Y as WithAnimation,J as WithFixedWidth,Z as WithLoadingState,X as WithNegativeValues,Q as __namedExportsOrder,K as default};