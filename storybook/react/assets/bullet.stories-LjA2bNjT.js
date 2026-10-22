import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{F as r,U as i,_ as a,c as o,ct as s,d as c,f as l,g as u,i as d,l as f,lt as p,n as m,o as h,r as g,s as _,t as v,u as y,y as b}from"./useChart-D3Rr4D-_.js";import{i as x,t as S}from"./axis-B0w998iS.js";import{n as C,t as w}from"./linear-DGEEY0NX.js";import{o as T,r as E}from"./load-BZ_VMlPL.js";import{n as D,t as O}from"./export-Dg4NGHQ_.js";function k(){let e={top:20,right:20,bottom:30,left:20},t=960,n=150,r=!1,a,o,s,c,d,f=u.colorSchemas.britecharts,m,h,g,_=``,v,y=6,b,x=5,w=.5,T,D=!1,k,A,j,M=[],N=[],P=[],F,I=()=>o/3;function L(i){i.each(function(i){a=t-(e.left??0)-(e.right??0),o=n-(e.top??0)-(e.bottom??0),G(this),r?B():(z(),{ranges:M,measures:P,markers:N}=q(i),H(),R(),Y(),J())})}function R(){b=S(s).ticks(y).tickPadding(5).tickFormat(i(_))}function z(){F.select(`.loading-state-group svg`).remove()}function B(){F.select(`.loading-state-group`).html(E)}function V(){let t=F.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${e.left}, ${e.top})`);F.append(`g`).classed(`loading-state-group`,!0),t.append(`g`).classed(`chart-group`,!0),t.append(`g`).classed(`axis-group`,!0),t.append(`g`).classed(`metadata-group`,!0)}function H(){let e=D?[a,0]:[0,a],t=[0,Math.max(...M,...N,...P)];s=C().domain(t).rangeRound(e).nice(),T=K(s),c=M.map((e,t)=>w-t*.2).reverse(),d=M.map((e,t)=>.9-t*.3).reverse(),m=f[0],h=f[1],g=f[2]}let U=null,W=null;function G(e){F||(F=p(e).append(`svg`).classed(`britechart bullet-chart`,!0),V()),F.attr(`viewBox`,[0,0,t,n]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,t).attr(`height`,n),l(F.node(),{a11yTitle:U,a11yDescription:W,fallbackTitle:`Bullet chart`})}function K(e){let t=e(0);return function(n){return Math.abs(e(n)-t)}}function q(e){return{ranges:[...e.ranges].sort().reverse(),measures:[...e.measures].sort().reverse(),markers:e.markers.length?[...e.markers].sort().reverse():[]}}function J(){F.select(`.axis-group`).attr(`transform`,`translate(0, ${o+x})`).call(b),X()}function Y(){k&&k.remove(),A&&A.remove(),j&&j.remove(),k=F.select(`.chart-group`).selectAll(`rect.range`).data(M).enter().append(`rect`).attr(`fill`,m).attr(`opacity`,(e,t)=>c[t]).attr(`class`,(e,t)=>`range r${t}`).attr(`width`,T).attr(`height`,o).attr(`x`,D?s:0),A=F.select(`.chart-group`).selectAll(`rect.measure`).data(P).enter().append(`rect`).attr(`fill`,h).attr(`fill-opacity`,(e,t)=>d[t]).attr(`class`,(e,t)=>`measure m${t}`).attr(`width`,T).attr(`height`,I).attr(`x`,D?s:0).attr(`y`,I),N.length&&(j=F.select(`.chart-group`).selectAll(`line.marker-line`).data(N).enter().append(`line`).attr(`class`,`marker-line`).attr(`stroke`,g).attr(`stroke-width`,5).attr(`opacity`,d[0]).attr(`x1`,s).attr(`x2`,s).attr(`y1`,0).attr(`y2`,o))}function X(){v&&v.remove(),v=F.select(`.axis-group`).selectAll(`line.extended-x-line`).data([0]).enter().append(`line`).attr(`class`,`extended-x-line`).attr(`x1`,0).attr(`x2`,a)}return L.a11yTitle=function(e){return arguments.length?(U=e,this):U},L.a11yDescription=function(e){return arguments.length?(W=e,this):W},L.colorSchema=function(e){return arguments.length?(f=e,this):f},L.exportChart=function(e,t){return O.call(L,F,e,t)},L.isLoading=function(e){return arguments.length?(r=e,this):r},L.height=function(e){return arguments.length?(n=e,this):n},L.isReverse=function(e){return arguments.length?(D=e,this):D},L.margin=function(t){return arguments.length?(e={...e,...t},this):e},L.numberFormat=function(e){return arguments.length?(_=e,this):_},L.paddingBetweenAxisAndChart=function(e){return arguments.length?(x=e,this):x},L.startMaxRangeOpacity=function(e){return arguments.length?(w=e,this):w},L.ticks=function(e){return arguments.length?(y=e,this):y},L.width=function(e){return arguments.length?(t=e,this):t},L}function A(){return(A=t((()=>{x(),r(),w(),s(),b(),D(),T(),a(),c()})))()}var j;function M(){return(M=t((()=>{s(),A(),o(),_(),g(),j={create(e,t,n={}){let r=p(e),i=k();return y(r),f(i,n,`bullet`),r.datum(t[0]).call(h(i,n)),i},update(e,t,n={},r){let i=p(e);return y(i),f(r,n,`bullet`),h(r,n),t&&t.length?i.datum(t[0]).call(r):i.call(r),r},destroy:d}})))()}var N,P;function F(){return(F=t((()=>{N=e(n(),1),M(),v(),P=({chart:e=j,createTooltip:t,data:n,...r})=>{let i=m(e,n,r,{createTooltip:t});return N.createElement(`div`,{className:`bullet-container`,ref:i})},P.__docgenInfo={description:``,methods:[],displayName:`Bullet`,props:{a11yTitle:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`The name screen readers announce for the chart, set as its svg's
\`aria-label\`. Unset, the chart is announced by its type, such as "Bar chart".`},a11yDescription:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:"A longer description screen readers announce after the name, such as\nwhat the data shows, rendered as the svg's `<desc>`."},data:{required:!0,tsType:{name:`union`,raw:`BulletChartDataShape[] | null`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [BulletChartKeys.Ranges]: [number?, number?, number?];
    [BulletChartKeys.Measures]: [number?, number?, number?];
    [BulletChartKeys.Markers]: [number?];
}`,signature:{properties:[]}}],raw:`BulletChartDataShape[]`},{name:`null`}]},description:`Internally used, do not overwrite.

Required. \`null\` means the data has not arrived yet: nothing is drawn
until it does. Leaving it out is an error.`},colorSchema:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`Gets or Sets the colorSchema of the chart. The first color from the array will be applied to range bars (the wider bars). The second color from the array will be applied to measure bars (the narrow bars) and marker lines.`},exportChart:{required:!1,tsType:{name:`string`},description:`The filename to export the chart to. Setting it exports the chart and fires
a download, which is what the chart's \`exportChart\` command does; it is
not a callback. The chart's exporter treats the title as optional, so a
filename on its own is enough.
A filename ending in \`.svg\` downloads an svg file, and any other a png.`},height:{required:!1,tsType:{name:`number`},description:`Gets or Sets the height of the chart`},isLoading:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets whether a loading state will be shown`},isReverse:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets the isReverse status of the chart. If true, the elements will be rendered in reverse order.`},margin:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{ top?: number; bottom?: number; left?: number; right?: number }`,signature:{properties:[{key:`top`,value:{name:`number`,required:!1}},{key:`bottom`,value:{name:`number`,required:!1}},{key:`left`,value:{name:`number`,required:!1}},{key:`right`,value:{name:`number`,required:!1}}]}},description:`Gets or Sets the margin of the chart`},numberFormat:{required:!1,tsType:{name:`string`},description:`Gets or Sets the number format of the bar chart`},paddingBetweenAxisAndChart:{required:!1,tsType:{name:`number`},description:`Space between axis and chart`},startMaxRangeOpacity:{required:!1,tsType:{name:`number`},description:`Gets or Sets the starting point of the capacity range.
Default is 0.5`},ticks:{required:!1,tsType:{name:`number`},description:`Gets or Sets the number of ticks of the x axis on the chart
Default is 5`},width:{required:!1,tsType:{name:`number`},description:`Gets or Sets the width of the chart`},chart:{required:!1,tsType:{name:`Wrapper`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [BulletChartKeys.Ranges]: [number?, number?, number?];
    [BulletChartKeys.Measures]: [number?, number?, number?];
    [BulletChartKeys.Markers]: [number?];
}`,signature:{properties:[]}}],raw:`BulletChartDataShape[]`},{name:`intersection`,raw:`ChartModuleSelection<BulletChartDataShape> &
BulletChartAPI`,elements:[{name:`signature`,type:`function`,raw:`<
    TElement extends Element,
    TParent extends Element | null,
    TParentDatum,
>(
    _selection: Selection<TElement, DataShape, TParent, TParentDatum>
) => void`,signature:{arguments:[{type:{name:`Selection`,elements:[{name:`TElement`},{name:`signature`,type:`object`,raw:`{
    [BulletChartKeys.Ranges]: [number?, number?, number?];
    [BulletChartKeys.Measures]: [number?, number?, number?];
    [BulletChartKeys.Markers]: [number?];
}`,signature:{properties:[]}},{name:`TParent`},{name:`TParentDatum`}],raw:`Selection<TElement, DataShape, TParent, TParentDatum>`},name:`_selection`}],return:{name:`void`}}},{name:`BulletChartAPI`}]}],raw:`Wrapper<BulletChartDataShape[], BulletChartModule>`},description:`Internally used, do not overwrite.

@ignore`,defaultValue:{value:`{
    create(el, data, configuration = {}) {
        const container = select<HTMLElement, BulletChartDataShape>(el);
        const chart = bullet();

        validateContainer(container);
        validateConfiguration(chart, configuration, 'bullet');

        // Calls the chart with the container and dataset
        container.datum(data[0]).call(applyConfiguration(chart, configuration));

        return chart;
    },

    update(el, data, configuration = {}, chart) {
        const container = select<HTMLElement, BulletChartDataShape>(el);

        validateContainer(container);
        validateConfiguration(chart, configuration, 'bullet');
        applyConfiguration(chart, configuration);

        // Calls the chart with the container and dataset
        if (data && data.length) {
            container.datum(data[0]).call(chart);
        } else {
            container.call(chart);
        }

        return chart;
    },

    destroy: removeChartSvg,
}`,computed:!1}},createTooltip:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Internally used, do not overwrite.

Asked for again after each update, so a tooltip can be attached to the
chart the wrapper has just drawn.

@ignore`}}}})))()}var I,L,R,z;function B(){return(B=t((()=>{I=()=>[{ranges:[130,160,250],measures:[150,180],markers:[175]}],L=()=>[{ranges:[130],measures:[150],markers:[105]}],R=()=>[{ranges:[50,100],measures:[25],markers:[]}],z={fullTestData:I,partialTestData:L,underRangeNoMarker:R}})))()}var V,H,U,W,G,K;function q(){return(q=t((()=>{V=e(n(),1),F(),B(),H={title:`Charts/Bullet`,component:P},U=e=>{let t=z.fullTestData();return V.createElement(P,{...e,data:t})},U.parameters={controls:{exclude:[`data`,`chart`,`createTooltip`]}},W=()=>{let e=z.underRangeNoMarker();return V.createElement(P,{data:e})},G=()=>{let e=z.fullTestData();return V.createElement(P,{data:e,isLoading:!0})},U.__docgenInfo={description:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,methods:[],displayName:`Playground`},W.__docgenInfo={description:``,methods:[],displayName:`WithMeasureUnderRanges`},G.__docgenInfo={description:``,methods:[],displayName:`WithLoadingState`},K=[`Playground`,`WithMeasureUnderRanges`,`WithLoadingState`],U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`args => {
  const data = bulletData.fullTestData();
  return <Bullet {...args} data={data} />;
}`,...U.parameters?.docs?.source},description:{story:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,...U.parameters?.docs?.description}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`() => {
  const data = bulletData.underRangeNoMarker();
  return <Bullet data={data} />;
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`() => {
  const data = bulletData.fullTestData();
  return <Bullet data={data} isLoading={true} />;
}`,...G.parameters?.docs?.source}}}})))()}q();export{U as Playground,G as WithLoadingState,W as WithMeasureUnderRanges,K as __namedExportsOrder,H as default};