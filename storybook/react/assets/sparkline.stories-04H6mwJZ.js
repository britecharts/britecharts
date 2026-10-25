import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{A as r,C as i,E as ee,M as a,_ as te,_t as o,c as s,f as c,g as ne,i as l,k as re,l as u,n as d,o as f,p as ie,r as p,s as m,t as h,u as g,vt as _}from"./useChart-Ceyp51N_.js";import{n as ae}from"./quad-qkBhhiXk.js";import{n as v,t as y}from"./linear-tBFoeF3H.js";import{t as b}from"./extent-CL2rf33s.js";import{N as x,a as S,j as C,l as w,o as oe,u as T}from"./constants-Mq23CJ7w.js";import{n as E,t as D}from"./export-CV8-jvTj.js";import{n as O,t as k}from"./line-BOOYRKJD.js";import{n as A,t as se}from"./area-ByGNRosW.js";function j(){let e={left:5,right:5,top:5,bottom:5},t=100,n=30,r=!1,i,a,o=[`var(--bc-sparkline-area-start, #f5fdff)`,`var(--bc-sparkline-area-end, #f6fefc)`],s,c=re.colorGradients.greenBlue,l,u,d,f,p,m,h=!1,g=oe.duration,y,S,C,T=x(`sparkline-area-gradient`),E=x(`sparkline-line-gradient`),k=x(`maskingClip`),A=ae,j=({date:e})=>e,M=({value:e})=>e;function N(i){i.each(function(i){f=t-(e.left??0)-(e.right??0),p=n-(e.top??0)-(e.bottom??0),m=V(i),B(this),te(d.node(),R&&!r?z():null),r?q():(H(),F(),U(),W(),G(),K(),J())})}function P(){let t=d.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${e.left},${e.top})`);d.append(`g`).classed(`loading-state-group`,!0),t.append(`g`).classed(`chart-group`,!0),t.append(`g`).classed(`metadata-group`,!0)}function F(){i=v().domain(b(m,j)).range([0,f]),a=v().domain(b(m,M)).range([p,0])}let I=null,L=null,R=!0;function z(){return{columns:[`Date`,`Value`],rows:m.map(e=>[e.date,e.value])}}function B(e){d||(d=_(e).append(`svg`).classed(`britechart sparkline`,!0),P()),d.attr(`viewBox`,[0,0,t,n]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,t).attr(`height`,n),ie(d.node(),{a11yTitle:I,a11yDescription:L,fallbackTitle:`Sparkline`})}function V(e){return e.reduce((e,t)=>{let n=t;return n.date=new Date(n.date),n.value=+n.value,[...e,n]},[])}function H(){d.select(`.loading-state-group svg`).remove()}function U(){let e=d.select(`.metadata-group`);(s||l)&&(d.selectAll(`#${T}`).remove(),d.selectAll(`#${E}`).remove()),s=e.append(`linearGradient`).attr(`id`,T).attr(`class`,`area-gradient`).attr(`gradientUnits`,`userSpaceOnUse`).attr(`x1`,0).attr(`x2`,i(m[m.length-1].date)).attr(`y1`,0).attr(`y2`,0).selectAll(`stop`).data([{offset:`0%`,color:o[0]},{offset:`100%`,color:o[1]}]).enter().append(`stop`).attr(`offset`,({offset:e})=>e).style(`stop-color`,({color:e})=>e),l=e.append(`linearGradient`).attr(`id`,E).attr(`class`,`line-gradient`).attr(`gradientUnits`,`userSpaceOnUse`).attr(`x1`,0).attr(`x2`,i(m[m.length-1].date)).attr(`y1`,0).attr(`y2`,0).selectAll(`stop`).data([{offset:`0%`,color:c[0]},{offset:`100%`,color:c[1]}]).enter().append(`stop`).attr(`offset`,({offset:e})=>e).style(`stop-color`,({color:e})=>e)}function W(){u&&d.selectAll(`#${k}`).remove(),h&&!ne()&&(u=d.select(`.metadata-group`).append(`clipPath`).attr(`id`,k).attr(`class`,`clip-path`).append(`rect`).attr(`width`,0).attr(`height`,n),_(`#${k} rect`).transition().ease(A).duration(g).attr(`width`,t))}function G(){S&&d.selectAll(`.sparkline-area`).remove(),S=se().x(({date:e})=>i(e)).y0(()=>a(0)+1).y1(({value:e})=>a(e)).curve(w),d.select(`.chart-group`).append(`path`).datum(m).attr(`class`,`sparkline-area`).attr(`fill`,`url(#${T})`).attr(`d`,S).attr(`clip-path`,`url(#${k})`)}function K(){y&&d.selectAll(`.line`).remove(),y=O().curve(w).x(({date:e})=>i(e)).y(({value:e})=>a(e)),d.select(`.chart-group`).append(`path`).datum(m).attr(`class`,`line`).attr(`stroke`,`url(#${E})`).attr(`d`,y).attr(`clip-path`,`url(#${k})`).attr(`fill`,`none`)}function q(){d.select(`.loading-state-group`).html(ee)}function J(){C&&d.selectAll(`.sparkline-circle`).remove(),C=d.selectAll(`.chart-group`).append(`circle`).attr(`class`,`sparkline-circle`).attr(`cx`,i(m[m.length-1].date)).attr(`cy`,a(m[m.length-1].value)).attr(`r`,1.5)}return N.a11yTitle=function(e){return arguments.length?(I=e,this):I},N.a11yDescription=function(e){return arguments.length?(L=e,this):L},N.a11yDataTable=function(e){return arguments.length?(R=e,this):R},N.animationDuration=function(e){return arguments.length?(g=e,this):g},N.areaGradient=function(e){return arguments.length?(o=e,this):o},N.exportChart=function(e,t){return D.call(N,d,e,t)},N.height=function(e){return arguments.length?(n=e,this):n},N.isAnimated=function(e){return arguments.length?(h=e,this):h},N.lineGradient=function(e){return arguments.length?(c=e,this):c},N.isLoading=function(e){return arguments.length?(r=e,this):r},N.margin=function(t){return arguments.length?(e={...e,...t},this):e},N.width=function(e){return arguments.length?(t=e,this):t},N}function M(){return(M=t((()=>{y(),A(),k(),T(),o(),a(),E(),r(),i(),C(),S(),c()})))()}var N;function P(){return(P=t((()=>{N={type:`object`,properties:{a11yDataTable:{type:`boolean`},a11yDescription:{anyOf:[{type:`null`},{type:`string`}]},a11yTitle:{anyOf:[{type:`null`},{type:`string`}]},animationDuration:{type:`number`},areaGradient:{type:`array`,prefixItems:[{type:`string`},{type:`string`}],items:!1,minItems:2},customBrushEnd:{not:{}},customBrushStart:{not:{}},customClick:{not:{}},customMouseMove:{not:{}},customMouseOut:{not:{}},customMouseOver:{not:{}},exportChart:{type:`string`},height:{type:`number`},isAnimated:{type:`boolean`},isLoading:{type:`boolean`},lineGradient:{type:`array`,prefixItems:[{type:`string`},{type:`string`}],items:!1,minItems:2},margin:{type:`object`,properties:{left:{type:`number`},right:{type:`number`},top:{type:`number`},bottom:{type:`number`}}},width:{type:`number`}},additionalProperties:!1}})))()}var F;function I(){return(I=t((()=>{o(),M(),s(),m(),p(),P(),F={create(e,t,n={}){let r=_(e),i=j();return g(r),u(i,n,`sparkline`,N),r.datum(t).call(f(i,n)),i},update(e,t,n={},r){let i=_(e);return g(i),u(r,n,`sparkline`,N),f(r,n),t&&t.length?i.datum(t).call(r):i.call(r),r},destroy:l}})))()}var L,R;function z(){return(z=t((()=>{L=e(n(),1),I(),h(),R=({chart:e=F,createTooltip:t,data:n,...r})=>{let i=d(e,n,r,{createTooltip:t});return L.createElement(`div`,{className:`sparkline-container`,ref:i})},R.__docgenInfo={description:``,methods:[],displayName:`Sparkline`,props:{a11yTitle:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`The name screen readers announce for the chart, set as its svg's
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