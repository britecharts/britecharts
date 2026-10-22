import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{K as r,R as i,S as a,_ as o,b as s,c,dt as l,f as u,ft as d,i as f,l as p,n as m,o as h,p as g,r as _,s as v,t as y,u as b,y as x}from"./useChart-BW1kPAiP.js";import{i as S,t as C}from"./axis-B0w998iS.js";import{n as w,t as T}from"./linear-D1taf3bZ.js";import{o as E,r as D}from"./load-CFrz5JFm.js";import{n as O,t as k}from"./export-BiMpbFYg.js";function A(){let e={top:20,right:20,bottom:30,left:20},t=960,n=150,i=!1,a,s,c,l,u,f=x.colorSchemas.britecharts,p,m,h,_=``,v,y=6,b,S=5,T=.5,E,O=!1,A,j,M,N=[],P=[],F=[],I,L=()=>s/3;function R(r){r.each(function(r){a=t-(e.left??0)-(e.right??0),s=n-(e.top??0)-(e.bottom??0),J(this),o(I.node(),K&&!i?q(r):null),i?V():(B(),{ranges:N,measures:F,markers:P}=X(r),U(),z(),Q(),Z())})}function z(){b=C(c).ticks(y).tickPadding(5).tickFormat(r(_))}function B(){I.select(`.loading-state-group svg`).remove()}function V(){I.select(`.loading-state-group`).html(D)}function H(){let t=I.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${e.left}, ${e.top})`);I.append(`g`).classed(`loading-state-group`,!0),t.append(`g`).classed(`chart-group`,!0),t.append(`g`).classed(`axis-group`,!0),t.append(`g`).classed(`metadata-group`,!0)}function U(){let e=O?[a,0]:[0,a],t=[0,Math.max(...N,...P,...F)];c=w().domain(t).rangeRound(e).nice(),E=Y(c),l=N.map((e,t)=>T-t*.2).reverse(),u=N.map((e,t)=>.9-t*.3).reverse(),p=f[0],m=f[1],h=f[2]}let W=null,G=null,K=!0;function q(e){let t=X(e);return{columns:[`Series`,`Values`],rows:[[`Ranges`,t.ranges],[`Measures`,t.measures],[`Markers`,t.markers]].filter(([,e])=>e.length).map(([e,t])=>[e,t.join(`, `)])}}function J(e){I||(I=d(e).append(`svg`).classed(`britechart bullet-chart`,!0),H()),I.attr(`viewBox`,[0,0,t,n]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,t).attr(`height`,n),g(I.node(),{a11yTitle:W,a11yDescription:G,fallbackTitle:`Bullet chart`})}function Y(e){let t=e(0);return function(n){return Math.abs(e(n)-t)}}function X(e){return{ranges:[...e.ranges].sort().reverse(),measures:[...e.measures].sort().reverse(),markers:e.markers.length?[...e.markers].sort().reverse():[]}}function Z(){I.select(`.axis-group`).attr(`transform`,`translate(0, ${s+S})`).call(b),$()}function Q(){A&&A.remove(),j&&j.remove(),M&&M.remove(),A=I.select(`.chart-group`).selectAll(`rect.range`).data(N).enter().append(`rect`).attr(`fill`,p).attr(`opacity`,(e,t)=>l[t]).attr(`class`,(e,t)=>`range r${t}`).attr(`width`,E).attr(`height`,s).attr(`x`,O?c:0),j=I.select(`.chart-group`).selectAll(`rect.measure`).data(F).enter().append(`rect`).attr(`fill`,m).attr(`fill-opacity`,(e,t)=>u[t]).attr(`class`,(e,t)=>`measure m${t}`).attr(`width`,E).attr(`height`,L).attr(`x`,O?c:0).attr(`y`,L),P.length&&(M=I.select(`.chart-group`).selectAll(`line.marker-line`).data(P).enter().append(`line`).attr(`class`,`marker-line`).attr(`stroke`,h).attr(`stroke-width`,5).attr(`opacity`,u[0]).attr(`x1`,c).attr(`x2`,c).attr(`y1`,0).attr(`y2`,s))}function $(){v&&v.remove(),v=I.select(`.axis-group`).selectAll(`line.extended-x-line`).data([0]).enter().append(`line`).attr(`class`,`extended-x-line`).attr(`x1`,0).attr(`x2`,a)}return R.a11yTitle=function(e){return arguments.length?(W=e,this):W},R.a11yDescription=function(e){return arguments.length?(G=e,this):G},R.a11yDataTable=function(e){return arguments.length?(K=e,this):K},R.colorSchema=function(e){return arguments.length?(f=e,this):f},R.exportChart=function(e,t){return k.call(R,I,e,t)},R.isLoading=function(e){return arguments.length?(i=e,this):i},R.height=function(e){return arguments.length?(n=e,this):n},R.isReverse=function(e){return arguments.length?(O=e,this):O},R.margin=function(t){return arguments.length?(e={...e,...t},this):e},R.numberFormat=function(e){return arguments.length?(_=e,this):_},R.paddingBetweenAxisAndChart=function(e){return arguments.length?(S=e,this):S},R.startMaxRangeOpacity=function(e){return arguments.length?(T=e,this):T},R.ticks=function(e){return arguments.length?(y=e,this):y},R.width=function(e){return arguments.length?(t=e,this):t},R}function j(){return(j=t((()=>{S(),i(),T(),l(),a(),O(),E(),s(),u()})))()}var M;function N(){return(N=t((()=>{M={type:`object`,properties:{a11yDataTable:{type:`boolean`},a11yDescription:{anyOf:[{type:`null`},{type:`string`}]},a11yTitle:{anyOf:[{type:`null`},{type:`string`}]},colorSchema:{type:`array`,items:{type:`string`}},customBrushEnd:{not:{}},customBrushStart:{not:{}},customClick:{not:{}},customMouseMove:{not:{}},customMouseOut:{not:{}},customMouseOver:{not:{}},exportChart:{type:`string`},height:{type:`number`},isLoading:{type:`boolean`},isReverse:{type:`boolean`},margin:{type:`object`,properties:{left:{type:`number`},right:{type:`number`},top:{type:`number`},bottom:{type:`number`}}},numberFormat:{type:`string`},paddingBetweenAxisAndChart:{type:`number`},startMaxRangeOpacity:{type:`number`},ticks:{type:`number`},width:{type:`number`}},additionalProperties:!1}})))()}var P;function F(){return(F=t((()=>{l(),j(),c(),v(),_(),N(),P={create(e,t,n={}){let r=d(e),i=A();return b(r),p(i,n,`bullet`,M),r.datum(t[0]).call(h(i,n)),i},update(e,t,n={},r){let i=d(e);return b(i),p(r,n,`bullet`,M),h(r,n),t&&t.length?i.datum(t[0]).call(r):i.call(r),r},destroy:f}})))()}var I,L;function R(){return(R=t((()=>{I=e(n(),1),F(),y(),L=({chart:e=P,createTooltip:t,data:n,...r})=>{let i=m(e,n,r,{createTooltip:t});return I.createElement(`div`,{className:`bullet-container`,ref:i})},L.__docgenInfo={description:``,methods:[],displayName:`Bullet`,props:{a11yTitle:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`The name screen readers announce for the chart, set as its svg's
\`aria-label\`. Unset, the chart is announced by its type, such as "Bar chart".`},a11yDescription:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:"A longer description screen readers announce after the name, such as\nwhat the data shows, rendered as the svg's `<desc>`."},a11yDataTable:{required:!1,tsType:{name:`boolean`},description:`Whether the chart renders its data as a visually hidden table after its
svg, which screen readers can read cell by cell. On by default.`},data:{required:!0,tsType:{name:`union`,raw:`BulletChartDataShape[] | null`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
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
        validateConfiguration(chart, configuration, 'bullet', schema);

        // Calls the chart with the container and dataset
        container.datum(data[0]).call(applyConfiguration(chart, configuration));

        return chart;
    },

    update(el, data, configuration = {}, chart) {
        const container = select<HTMLElement, BulletChartDataShape>(el);

        validateContainer(container);
        validateConfiguration(chart, configuration, 'bullet', schema);
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

@ignore`}}}})))()}var z,B,V,H;function U(){return(U=t((()=>{z=()=>[{ranges:[130,160,250],measures:[150,180],markers:[175]}],B=()=>[{ranges:[130],measures:[150],markers:[105]}],V=()=>[{ranges:[50,100],measures:[25],markers:[]}],H={fullTestData:z,partialTestData:B,underRangeNoMarker:V}})))()}var W,G,K,q,J,Y;function X(){return(X=t((()=>{W=e(n(),1),R(),U(),G={title:`Charts/Bullet`,component:L},K=e=>{let t=H.fullTestData();return W.createElement(L,{...e,data:t})},K.parameters={controls:{exclude:[`data`,`chart`,`createTooltip`]}},q=()=>{let e=H.underRangeNoMarker();return W.createElement(L,{data:e})},J=()=>{let e=H.fullTestData();return W.createElement(L,{data:e,isLoading:!0})},K.__docgenInfo={description:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,methods:[],displayName:`Playground`},q.__docgenInfo={description:``,methods:[],displayName:`WithMeasureUnderRanges`},J.__docgenInfo={description:``,methods:[],displayName:`WithLoadingState`},Y=[`Playground`,`WithMeasureUnderRanges`,`WithLoadingState`],K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`args => {
  const data = bulletData.fullTestData();
  return <Bullet {...args} data={data} />;
}`,...K.parameters?.docs?.source},description:{story:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`() => {
  const data = bulletData.underRangeNoMarker();
  return <Bullet data={data} />;
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`() => {
  const data = bulletData.fullTestData();
  return <Bullet data={data} isLoading={true} />;
}`,...J.parameters?.docs?.source}}}})))()}X();export{K as Playground,J as WithLoadingState,q as WithMeasureUnderRanges,Y as __namedExportsOrder,G as default};