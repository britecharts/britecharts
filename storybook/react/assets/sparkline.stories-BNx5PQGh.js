import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{c as r,ct as i,d as a,f as ee,g as o,h as s,i as c,l,n as u,o as d,p as te,r as f,s as p,st as m,t as h,u as g,v as _}from"./useChart-Oe-9O4HW.js";import{n as v}from"./quad-qkBhhiXk.js";import{n as y,t as b}from"./linear-Dx2HD35t.js";import{t as x}from"./extent-CL2rf33s.js";import{N as S,a as C,j as w,l as T,o as E,u as D}from"./constants-BWmfVXy3.js";import{l as ne,o as O}from"./load-BNqb1cG1.js";import{n as k,t as A}from"./export-Ckvi56DD.js";import{n as j,t as M}from"./line-Bf-EDDrL.js";import{n as N,t as P}from"./area-Ch_cZ3dZ.js";function F(){let e={left:5,right:5,top:5,bottom:5},t=100,n=30,r=!1,a,o,c=[`#F5FDFF`,`#F6FEFC`],l,u=s.colorGradients.greenBlue,d,f,p,m,h,g,_=!1,b=E.duration,C,w,D,O=S(`sparkline-area-gradient`),k=S(`sparkline-line-gradient`),M=S(`maskingClip`),N=v,F=({date:e})=>e,I=({value:e})=>e;function L(i){i.each(function(i){m=t-(e.left??0)-(e.right??0),h=n-(e.top??0)-(e.bottom??0),g=U(i),H(this),r?Y():(W(),z(),G(),K(),q(),J(),X())})}function R(){let t=p.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${e.left},${e.top})`);p.append(`g`).classed(`loading-state-group`,!0),t.append(`g`).classed(`chart-group`,!0),t.append(`g`).classed(`metadata-group`,!0)}function z(){a=y().domain(x(g,F)).range([0,m]),o=y().domain(x(g,I)).range([h,0])}let B=null,V=null;function H(e){p||(p=i(e).append(`svg`).classed(`britechart sparkline`,!0),R()),p.attr(`viewBox`,[0,0,t,n]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,t).attr(`height`,n),ee(p.node(),{a11yTitle:B,a11yDescription:V,fallbackTitle:`Sparkline`})}function U(e){return e.reduce((e,t)=>{let n=t;return n.date=new Date(n.date),n.value=+n.value,[...e,n]},[])}function W(){p.select(`.loading-state-group svg`).remove()}function G(){let e=p.select(`.metadata-group`);(l||d)&&(p.selectAll(`#${O}`).remove(),p.selectAll(`#${k}`).remove()),l=e.append(`linearGradient`).attr(`id`,O).attr(`class`,`area-gradient`).attr(`gradientUnits`,`userSpaceOnUse`).attr(`x1`,0).attr(`x2`,a(g[g.length-1].date)).attr(`y1`,0).attr(`y2`,0).selectAll(`stop`).data([{offset:`0%`,color:c[0]},{offset:`100%`,color:c[1]}]).enter().append(`stop`).attr(`offset`,({offset:e})=>e).attr(`stop-color`,({color:e})=>e),d=e.append(`linearGradient`).attr(`id`,k).attr(`class`,`line-gradient`).attr(`gradientUnits`,`userSpaceOnUse`).attr(`x1`,0).attr(`x2`,a(g[g.length-1].date)).attr(`y1`,0).attr(`y2`,0).selectAll(`stop`).data([{offset:`0%`,color:u[0]},{offset:`100%`,color:u[1]}]).enter().append(`stop`).attr(`offset`,({offset:e})=>e).attr(`stop-color`,({color:e})=>e)}function K(){f&&p.selectAll(`#${M}`).remove(),_&&!te()&&(f=p.select(`.metadata-group`).append(`clipPath`).attr(`id`,M).attr(`class`,`clip-path`).append(`rect`).attr(`width`,0).attr(`height`,n),i(`#${M} rect`).transition().ease(N).duration(b).attr(`width`,t))}function q(){w&&p.selectAll(`.sparkline-area`).remove(),w=P().x(({date:e})=>a(e)).y0(()=>o(0)+1).y1(({value:e})=>o(e)).curve(T),p.select(`.chart-group`).append(`path`).datum(g).attr(`class`,`sparkline-area`).attr(`fill`,`url(#${O})`).attr(`d`,w).attr(`clip-path`,`url(#${M})`)}function J(){C&&p.selectAll(`.line`).remove(),C=j().curve(T).x(({date:e})=>a(e)).y(({value:e})=>o(e)),p.select(`.chart-group`).append(`path`).datum(g).attr(`class`,`line`).attr(`stroke`,`url(#${k})`).attr(`d`,C).attr(`clip-path`,`url(#${M})`).attr(`fill`,`none`)}function Y(){p.select(`.loading-state-group`).html(ne)}function X(){D&&p.selectAll(`.sparkline-circle`).remove(),D=p.selectAll(`.chart-group`).append(`circle`).attr(`class`,`sparkline-circle`).attr(`cx`,a(g[g.length-1].date)).attr(`cy`,o(g[g.length-1].value)).attr(`r`,1.5)}return L.a11yTitle=function(e){return arguments.length?(B=e,this):B},L.a11yDescription=function(e){return arguments.length?(V=e,this):V},L.animationDuration=function(e){return arguments.length?(b=e,this):b},L.areaGradient=function(e){return arguments.length?(c=e,this):c},L.exportChart=function(e,t){return A.call(L,p,e,t)},L.height=function(e){return arguments.length?(n=e,this):n},L.isAnimated=function(e){return arguments.length?(_=e,this):_},L.lineGradient=function(e){return arguments.length?(u=e,this):u},L.isLoading=function(e){return arguments.length?(r=e,this):r},L.margin=function(t){return arguments.length?(e={...e,...t},this):e},L.width=function(e){return arguments.length?(t=e,this):t},L}function I(){return(I=t((()=>{b(),N(),M(),D(),m(),_(),k(),o(),O(),w(),C(),a()})))()}var L;function R(){return(R=t((()=>{m(),I(),r(),p(),f(),L={create(e,t,n={}){let r=i(e),a=F();return g(r),l(a,n,`sparkline`),r.datum(t).call(d(a,n)),a},update(e,t,n={},r){let a=i(e);return g(a),l(r,n,`sparkline`),d(r,n),t&&t.length?a.datum(t).call(r):a.call(r),r},destroy:c}})))()}var z,B;function V(){return(V=t((()=>{z=e(n(),1),R(),h(),B=({chart:e=L,createTooltip:t,data:n,...r})=>{let i=u(e,n,r,{createTooltip:t});return z.createElement(`div`,{className:`sparkline-container`,ref:i})},B.__docgenInfo={description:``,methods:[],displayName:`Sparkline`,props:{a11yTitle:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`The name screen readers announce for the chart, set as its svg's
\`aria-label\`. Unset, the chart is announced by its type, such as "Bar chart".`},a11yDescription:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:"A longer description screen readers announce after the name, such as\nwhat the data shows, rendered as the svg's `<desc>`."},data:{required:!0,tsType:{name:`union`,raw:`SparklineChartDataShape[] | null`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
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
        validateConfiguration(chart, configuration, 'sparkline');

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
        validateConfiguration(chart, configuration, 'sparkline');
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
@internal`}}}})))()}var H,U,W;function G(){return(G=t((()=>{H=()=>[{name:`Blazing`,value:2,date:`2011-01-05T00:00:00Z`},{name:`Blazing`,value:2,date:`2011-01-06T00:00:00Z`},{name:`Blazing`,value:3,date:`2011-01-07T00:00:00Z`},{name:`Blazing`,value:5,date:`2011-01-08T00:00:00Z`},{name:`Blazing`,value:3,date:`2011-01-09T00:00:00Z`},{name:`Blazing`,value:6,date:`2011-01-10T00:00:00Z`},{name:`Blazing`,value:7,date:`2011-01-11T00:00:00Z`},{name:`Blazing`,value:1,date:`2011-01-12T00:00:00Z`}],U=()=>[{name:`Glittering`,value:2,date:`2011-01-05T00:00:00Z`},{name:`Glittering`,value:5,date:`2011-01-06T00:00:00Z`},{name:`Glittering`,value:16,date:`2011-01-07T00:00:00Z`},{name:`Glittering`,value:23,date:`2011-01-08T00:00:00Z`},{name:`Glittering`,value:18,date:`2011-01-09T00:00:00Z`},{name:`Glittering`,value:25,date:`2011-01-10T00:00:00Z`},{name:`Glittering`,value:28,date:`2011-01-11T00:00:00Z`},{name:`Glittering`,value:2,date:`2011-01-12T00:00:00Z`}],W={withLowValues:H,with1Source:U}})))()}var K,q,J,Y,X,Z,Q;function $(){return($=t((()=>{K=e(n(),1),V(),G(),q={title:`Charts/Sparkline`,component:B},J=e=>{let t=W.with1Source();return K.createElement(B,{...e,data:t})},J.args={isAnimated:!1},J.parameters={controls:{exclude:[`data`,`chart`,`createTooltip`]}},Y=()=>{let e=W.withLowValues();return K.createElement(B,{data:e,height:100,width:400})},X=()=>{let e=W.with1Source();return K.createElement(B,{data:e,isAnimated:!0,width:400,animationDuration:1e3,height:100})},Z=()=>K.createElement(B,{data:[],height:100,width:200,isLoading:!0}),J.__docgenInfo={description:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,methods:[],displayName:`Playground`},Y.__docgenInfo={description:``,methods:[],displayName:`WithFixedWidth`},X.__docgenInfo={description:``,methods:[],displayName:`WithAnimation`},Z.__docgenInfo={description:``,methods:[],displayName:`WithLoadingState`},Q=[`Playground`,`WithFixedWidth`,`WithAnimation`,`WithLoadingState`],J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`args => {
  const data = sparklineData.with1Source();
  return <Sparkline {...args} data={data} />;
}`,...J.parameters?.docs?.source},description:{story:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`() => {
  const data = sparklineData.withLowValues();
  return <Sparkline data={data} height={100} width={400} />;
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`() => {
  const data = sparklineData.with1Source();
  return <Sparkline data={data} isAnimated={true} width={400} animationDuration={1000} height={100} />;
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`() => {
  const data: [] = [];
  return <Sparkline data={data} height={100} width={200} isLoading={true} />;
}`,...Z.parameters?.docs?.source}}}})))()}$();export{J as Playground,X as WithAnimation,Y as WithFixedWidth,Z as WithLoadingState,Q as __namedExportsOrder,q as default};