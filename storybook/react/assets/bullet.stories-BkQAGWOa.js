import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{A as r,C as i,M as a,Q as o,W as s,_ as c,_t as l,b as u,c as d,f,i as p,k as m,l as h,n as g,o as _,p as v,r as y,s as b,t as x,u as S,vt as C}from"./useChart-Ceyp51N_.js";import{i as w,t as T}from"./axis-B0w998iS.js";import{n as ee,t as E}from"./linear-tBFoeF3H.js";import{n as D,t as O}from"./export-CV8-jvTj.js";function k(){let e={top:20,right:20,bottom:30,left:20},t=960,n=150,r=!1,i,a,s,l,d,f=m.colorSchemas.britecharts,p,h,g,_=``,y,b=6,x,S=5,w=.5,E,D=!1,k,A,j,M=[],N=[],P=[],F,I=()=>a/3;function L(o){o.each(function(o){i=t-(e.left??0)-(e.right??0),a=n-(e.top??0)-(e.bottom??0),q(this),c(F.node(),G&&!r?K(o):null),r?B():(z(),{ranges:M,measures:P,markers:N}=Y(o),H(),R(),Z(),X())})}function R(){x=T(s).ticks(b).tickPadding(5).tickFormat(o(_))}function z(){F.select(`.loading-state-group svg`).remove()}function B(){F.select(`.loading-state-group`).html(u)}function V(){let t=F.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${e.left}, ${e.top})`);F.append(`g`).classed(`loading-state-group`,!0),t.append(`g`).classed(`chart-group`,!0),t.append(`g`).classed(`axis-group`,!0),t.append(`g`).classed(`metadata-group`,!0)}function H(){let e=D?[i,0]:[0,i],t=[0,Math.max(...M,...N,...P)];s=ee().domain(t).rangeRound(e).nice(),E=J(s),l=M.map((e,t)=>w-t*.2).reverse(),d=M.map((e,t)=>.9-t*.3).reverse(),p=f[0],h=f[1],g=f[2]}let U=null,W=null,G=!0;function K(e){let t=Y(e);return{columns:[`Series`,`Values`],rows:[[`Ranges`,t.ranges],[`Measures`,t.measures],[`Markers`,t.markers]].filter(([,e])=>e.length).map(([e,t])=>[e,t.join(`, `)])}}function q(e){F||(F=C(e).append(`svg`).classed(`britechart bullet-chart`,!0),V()),F.attr(`viewBox`,[0,0,t,n]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,t).attr(`height`,n),v(F.node(),{a11yTitle:U,a11yDescription:W,fallbackTitle:`Bullet chart`})}function J(e){let t=e(0);return function(n){return Math.abs(e(n)-t)}}function Y(e){return{ranges:[...e.ranges].sort().reverse(),measures:[...e.measures].sort().reverse(),markers:e.markers.length?[...e.markers].sort().reverse():[]}}function X(){F.select(`.axis-group`).attr(`transform`,`translate(0, ${a+S})`).call(x),Q()}function Z(){k&&k.remove(),A&&A.remove(),j&&j.remove(),k=F.select(`.chart-group`).selectAll(`rect.range`).data(M).enter().append(`rect`).attr(`fill`,p).attr(`opacity`,(e,t)=>l[t]).attr(`class`,(e,t)=>`range r${t}`).attr(`width`,E).attr(`height`,a).attr(`x`,D?s:0),A=F.select(`.chart-group`).selectAll(`rect.measure`).data(P).enter().append(`rect`).attr(`fill`,h).attr(`fill-opacity`,(e,t)=>d[t]).attr(`class`,(e,t)=>`measure m${t}`).attr(`width`,E).attr(`height`,I).attr(`x`,D?s:0).attr(`y`,I),N.length&&(j=F.select(`.chart-group`).selectAll(`line.marker-line`).data(N).enter().append(`line`).attr(`class`,`marker-line`).attr(`stroke`,g).attr(`stroke-width`,5).attr(`opacity`,d[0]).attr(`x1`,s).attr(`x2`,s).attr(`y1`,0).attr(`y2`,a))}function Q(){y&&y.remove(),y=F.select(`.axis-group`).selectAll(`line.extended-x-line`).data([0]).enter().append(`line`).attr(`class`,`extended-x-line`).attr(`x1`,0).attr(`x2`,i)}return L.a11yTitle=function(e){return arguments.length?(U=e,this):U},L.a11yDescription=function(e){return arguments.length?(W=e,this):W},L.a11yDataTable=function(e){return arguments.length?(G=e,this):G},L.colorSchema=function(e){return arguments.length?(f=e,this):f},L.exportChart=function(e,t){return O.call(L,F,e,t)},L.isLoading=function(e){return arguments.length?(r=e,this):r},L.height=function(e){return arguments.length?(n=e,this):n},L.isReverse=function(e){return arguments.length?(D=e,this):D},L.margin=function(t){return arguments.length?(e={...e,...t},this):e},L.numberFormat=function(e){return arguments.length?(_=e,this):_},L.paddingBetweenAxisAndChart=function(e){return arguments.length?(S=e,this):S},L.startMaxRangeOpacity=function(e){return arguments.length?(w=e,this):w},L.ticks=function(e){return arguments.length?(b=e,this):b},L.width=function(e){return arguments.length?(t=e,this):t},L}function A(){return(A=t((()=>{w(),s(),E(),l(),a(),D(),i(),r(),f()})))()}var j;function M(){return(M=t((()=>{j={type:`object`,properties:{a11yDataTable:{type:`boolean`},a11yDescription:{anyOf:[{type:`null`},{type:`string`}]},a11yTitle:{anyOf:[{type:`null`},{type:`string`}]},colorSchema:{type:`array`,items:{type:`string`}},customBrushEnd:{not:{}},customBrushStart:{not:{}},customClick:{not:{}},customMouseMove:{not:{}},customMouseOut:{not:{}},customMouseOver:{not:{}},exportChart:{type:`string`},height:{type:`number`},isLoading:{type:`boolean`},isReverse:{type:`boolean`},margin:{type:`object`,properties:{left:{type:`number`},right:{type:`number`},top:{type:`number`},bottom:{type:`number`}}},numberFormat:{type:`string`},paddingBetweenAxisAndChart:{type:`number`},startMaxRangeOpacity:{type:`number`},ticks:{type:`number`},width:{type:`number`}},additionalProperties:!1}})))()}var N;function P(){return(P=t((()=>{l(),A(),d(),b(),y(),M(),N={create(e,t,n={}){let r=C(e),i=k();return S(r),h(i,n,`bullet`,j),r.datum(t[0]).call(_(i,n)),i},update(e,t,n={},r){let i=C(e);return S(i),h(r,n,`bullet`,j),_(r,n),t&&t.length?i.datum(t[0]).call(r):i.call(r),r},destroy:p}})))()}var F,I;function L(){return(L=t((()=>{F=e(n(),1),P(),x(),I=({chart:e=N,createTooltip:t,data:n,...r})=>{let i=g(e,n,r,{createTooltip:t});return F.createElement(`div`,{className:`bullet-container`,ref:i})},I.__docgenInfo={description:``,methods:[],displayName:`Bullet`,props:{a11yTitle:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`The name screen readers announce for the chart, set as its svg's
\`aria-label\`. Unset, the chart is announced by its type, such as "Bar chart".`},a11yDescription:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:"A longer description screen readers announce after the name, such as\nwhat the data shows, rendered as the svg's `<desc>`."},a11yDataTable:{required:!1,tsType:{name:`boolean`},description:`Whether the chart renders its data as a visually hidden table after its
svg, which screen readers can read cell by cell. On by default.`},data:{required:!0,tsType:{name:`union`,raw:`BulletChartDataShape[] | null`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [BulletChartKeys.Ranges]: [number?, number?, number?];
    [BulletChartKeys.Measures]: [number?, number?, number?];
    [BulletChartKeys.Markers]: number[];
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
    [BulletChartKeys.Markers]: number[];
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
    [BulletChartKeys.Markers]: number[];
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

@ignore`}}}})))()}var R,z,B,V,H,U;function W(){return(W=t((()=>{R=()=>[{ranges:[130,160,250],measures:[150,180],markers:[175]}],z=()=>[{ranges:[130],measures:[150],markers:[105]}],B=()=>[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600]}],V=()=>[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[]}],H=()=>[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600,3e3]},{ranges:[1300,1900,3e3],measures:[1700,2e3],markers:[1600]},{ranges:[1300,1500,2e3],measures:[1500,1800],markers:[1950]},{ranges:[1e3,2e3],measures:[1500],markers:[]},{ranges:[1e3,2e3],measures:[500],markers:[]}],U={fullTestData:R,partialTestData:z,withAllElements:B,withNoMarker:V,withManyCPUData:H}})))()}var G,K,q,J,Y,X,Z,Q;function $(){return($=t((()=>{G=e(n(),1),L(),W(),K={title:`Charts/Bullet`,component:I},q=(e,t={})=>G.createElement(G.Fragment,null,e.map((e,n)=>G.createElement(I,{key:n,...t,data:[e]}))),J=e=>q(U.withAllElements(),e),J.parameters={controls:{exclude:[`data`,`chart`,`createTooltip`]}},Y=()=>q(U.withNoMarker()),X=()=>q(U.withManyCPUData()),Z=()=>{let e=U.withAllElements();return G.createElement(I,{data:e,isLoading:!0})},J.__docgenInfo={description:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,methods:[],displayName:`Playground`},Y.__docgenInfo={description:``,methods:[],displayName:`WithNoMarker`},X.__docgenInfo={description:``,methods:[],displayName:`WithDashboardAlignment`},Z.__docgenInfo={description:``,methods:[],displayName:`WithLoadingState`},Q=[`Playground`,`WithNoMarker`,`WithDashboardAlignment`,`WithLoadingState`],J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`args => renderBullets(bulletData.withAllElements(), args)`,...J.parameters?.docs?.source},description:{story:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`() => renderBullets(bulletData.withNoMarker())`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`() => renderBullets(bulletData.withManyCPUData())`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`() => {
  const data = bulletData.withAllElements();
  return <Bullet data={data} isLoading={true} />;
}`,...Z.parameters?.docs?.source}}}})))()}$();export{J as Playground,X as WithDashboardAlignment,Z as WithLoadingState,Y as WithNoMarker,Q as __namedExportsOrder,K as default};