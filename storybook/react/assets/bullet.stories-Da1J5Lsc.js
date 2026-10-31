import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{A as r,C as i,K as a,M as o,N as s,P as c,_ as l,b as ee,bt as u,c as d,et as f,f as p,i as m,k as h,l as g,n as _,o as v,p as te,r as y,s as b,t as x,u as S,yt as C}from"./useChart-B2P80PDP.js";import{i as w,t as T}from"./axis-B0w998iS.js";import{n as E,t as D}from"./linear-v2Jo37rp.js";import{n as O,t as ne}from"./export-DBi7VGqB.js";function k(){let e={top:20,right:20,bottom:30,left:20},t=960,n=150,r=!1,i,a,o,c,d,p=h.colorSchemas.britecharts,m,g,_,v=``,y,b=6,x,S=5,C=.5,w,D=!1,O,k,A,j=[],M=[],N=[],P,F=()=>a/3;function I(o){o.each(function(o){i=t-(e.left??0)-(e.right??0),a=n-(e.top??0)-(e.bottom??0),K(this),l(P.node(),W&&!r?G(o):null),r?z():(R(),{ranges:j,measures:N,markers:M}=J(o),V(),L(),X(),Y())})}function L(){x=T(o).ticks(b).tickPadding(5).tickFormat(f(v))}function R(){P.select(`.loading-state-group svg`).remove()}function z(){P.select(`.loading-state-group`).html(ee)}function B(){let t=P.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${e.left}, ${e.top})`);P.append(`g`).classed(`loading-state-group`,!0),t.append(`g`).classed(`chart-group`,!0),t.append(`g`).classed(`axis-group`,!0),t.append(`g`).classed(`metadata-group`,!0)}function V(){let e=D?[i,0]:[0,i],t=[0,Math.max(...j,...M,...N)];o=E().domain(t).rangeRound(e).nice(),w=q(o),c=j.map((e,t)=>C-t*.2).reverse(),d=j.map((e,t)=>.9-t*.3).reverse(),m=p[0],g=p[1],_=p[2]}let H=null,U=null,W=!0;function G(e){let t=J(e);return{columns:[`Series`,`Values`],rows:[[`Ranges`,t.ranges],[`Measures`,t.measures],[`Markers`,t.markers]].filter(([,e])=>e.length).map(([e,t])=>[e,t.join(`, `)])}}function K(e){P||(P=u(e).append(`svg`).classed(`britechart bullet-chart`,!0),B()),P.attr(`viewBox`,[0,0,t,n]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,t).attr(`height`,n),te(P.node(),{a11yTitle:H,a11yDescription:U,fallbackTitle:`Bullet chart`})}function q(e){let t=e(0);return function(n){return Math.abs(e(n)-t)}}function J(e){return{ranges:[...e.ranges].sort().reverse(),measures:[...e.measures].sort().reverse(),markers:e.markers.length?[...e.markers].sort().reverse():[]}}function Y(){P.select(`.axis-group`).attr(`transform`,`translate(0, ${a+S})`).call(x),Z()}function X(){O&&O.remove(),k&&k.remove(),A&&A.remove(),O=P.select(`.chart-group`).selectAll(`rect.range`).data(j).enter().append(`rect`).attr(`fill`,m).attr(`opacity`,(e,t)=>c[t]).attr(`class`,(e,t)=>`range r${t}`).attr(`width`,w).attr(`height`,a).attr(`x`,D?o:0),k=P.select(`.chart-group`).selectAll(`rect.measure`).data(N).enter().append(`rect`).attr(`fill`,g).attr(`fill-opacity`,(e,t)=>d[t]).attr(`class`,(e,t)=>`measure m${t}`).attr(`width`,w).attr(`height`,F).attr(`x`,D?o:0).attr(`y`,F),M.length&&(A=P.select(`.chart-group`).selectAll(`line.marker-line`).data(M).enter().append(`line`).attr(`class`,`marker-line`).attr(`stroke`,_).attr(`stroke-width`,5).attr(`opacity`,d[0]).attr(`x1`,o).attr(`x2`,o).attr(`y1`,0).attr(`y2`,a))}function Z(){y&&y.remove(),y=P.select(`.axis-group`).selectAll(`line.extended-x-line`).data([0]).enter().append(`line`).attr(`class`,`extended-x-line`).attr(`x1`,0).attr(`x2`,i)}return I.a11yTitle=function(e){return arguments.length?(H=e,this):H},I.a11yDescription=function(e){return arguments.length?(U=e,this):U},I.a11yDataTable=function(e){return arguments.length?(W=e,this):W},I.colorSchema=function(e){return arguments.length?(p=e,this):p},I.exportChart=function(e,t){return ne.call(I,P,e,t)},I.isLoading=function(e){return arguments.length?(r=e,this):r},I.height=function(e){return arguments.length?(n=e,this):n},I.isReverse=function(e){return arguments.length?(D=e,this):D},I.margin=function(t){return arguments.length?(e={...e,...t},this):e},I.numberFormat=function(e){return arguments.length?(v=e,this):v},I.paddingBetweenAxisAndChart=function(e){return arguments.length?(S=e,this):S},I.startMaxRangeOpacity=function(e){return arguments.length?(C=e,this):C},I.ticks=function(e){return arguments.length?(b=e,this):b},I.width=function(e){return arguments.length?(t=e,this):t},I.render=function(e,t){return s(this,e,t)},I}function A(){return(A=t((()=>{w(),a(),D(),C(),c(),O(),o(),i(),r(),p()})))()}var j;function M(){return(M=t((()=>{j={type:`object`,properties:{a11yDataTable:{type:`boolean`},a11yDescription:{anyOf:[{type:`null`},{type:`string`}]},a11yTitle:{anyOf:[{type:`null`},{type:`string`}]},colorSchema:{type:`array`,items:{type:`string`}},customBrushEnd:{not:{}},customBrushStart:{not:{}},customClick:{not:{}},customMouseMove:{not:{}},customMouseOut:{not:{}},customMouseOver:{not:{}},exportChart:{type:`string`},height:{type:`number`},isLoading:{type:`boolean`},isReverse:{type:`boolean`},margin:{type:`object`,properties:{left:{type:`number`},right:{type:`number`},top:{type:`number`},bottom:{type:`number`}}},numberFormat:{type:`string`},paddingBetweenAxisAndChart:{type:`number`},startMaxRangeOpacity:{type:`number`},ticks:{type:`number`},width:{type:`number`}},additionalProperties:!1}})))()}var N;function P(){return(P=t((()=>{C(),A(),d(),b(),y(),M(),N={create(e,t,n={}){let r=u(e),i=k();return S(r),g(i,n,`bullet`,j),r.datum(t[0]).call(v(i,n)),i},update(e,t,n={},r){let i=u(e);return S(i),g(r,n,`bullet`,j),v(r,n),t&&t.length?i.datum(t[0]).call(r):i.call(r),r},destroy:m}})))()}var F,I;function L(){return(L=t((()=>{F=e(n(),1),P(),x(),I=({chart:e=N,createTooltip:t,data:n,...r})=>{let i=_(e,n,r,{createTooltip:t});return F.createElement(`div`,{className:`bullet-container`,ref:i})},I.__docgenInfo={description:``,methods:[],displayName:`Bullet`,props:{a11yTitle:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`The name screen readers announce for the chart, set as its svg's
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