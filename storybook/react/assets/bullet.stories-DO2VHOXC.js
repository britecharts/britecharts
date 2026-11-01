import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{A as r,C as i,K as a,M as o,N as s,P as c,_ as ee,b as te,bt as l,c as u,et as ne,f as d,i as f,k as re,l as p,n as m,o as h,p as g,r as _,s as v,t as y,u as b,yt as x}from"./useChart-B2P80PDP.js";import{i as S,t as ie}from"./axis-B0w998iS.js";import{n as C,t as w}from"./linear-v2Jo37rp.js";import{n as T,t as E}from"./export-DBi7VGqB.js";function D(){let e={top:20,right:20,bottom:30,left:20},t=960,n=150,r=!1,i,a,o,c,u,d,f=re.colorSchemas.britecharts,p,m,h,_=``,v,y=6,b,x=5,S=.5,w,T=!1,D,O,k,A=[],j=[],M=[],N,P=.3,F=()=>a/3;function I(o){o.each(function(o){i=t-(e.left??0)-(e.right??0),a=n-(e.top??0)-(e.bottom??0),q(this),ee(N.node(),W&&!r?K(o):null),r?z():(R(),{ranges:A,measures:M,markers:j}=Y(o),V(),L(),Z(),X())})}function L(){b=ie(o).ticks(y).tickPadding(5).tickFormat(ne(_))}function R(){N.select(`.loading-state-group svg`).remove()}function z(){N.select(`.loading-state-group`).html(te)}function B(){let t=N.append(`g`).classed(`container-group`,!0).attr(`transform`,`translate(${e.left}, ${e.top})`);N.append(`g`).classed(`loading-state-group`,!0),t.append(`g`).classed(`chart-group`,!0),t.append(`g`).classed(`axis-group`,!0),t.append(`g`).classed(`metadata-group`,!0)}function V(){let e=T?[i,0]:[0,i],t=[0,Math.max(...A,...j,...M)];o=C().domain(t).rangeRound(e).nice(),w=J(o),c=A.map((e,t)=>S-t*.2).reverse(),u=M.map((e,t)=>.9-t*P).reverse(),d=.9-(A.length-1)*P,p=f[0],m=f[1],h=f[2]}let H=null,U=null,W=!0,G=e=>[...e].sort((e,t)=>t-e);function K(e){let t=Y(e);return{columns:[`Series`,`Values`],rows:[[`Ranges`,t.ranges],[`Measures`,t.measures],[`Markers`,t.markers]].filter(([,e])=>e.length).map(([e,t])=>[e,t.join(`, `)])}}function q(e){N||(N=l(e).append(`svg`).classed(`britechart bullet-chart`,!0),B()),N.attr(`viewBox`,[0,0,t,n]).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`).attr(`width`,t).attr(`height`,n),g(N.node(),{a11yTitle:H,a11yDescription:U,fallbackTitle:`Bullet chart`})}function J(e){let t=e(0);return function(n){return Math.abs(e(n)-t)}}function Y(e){return{ranges:G(e.ranges),measures:G(e.measures),markers:G(e.markers??[])}}function X(){N.select(`.axis-group`).attr(`transform`,`translate(0, ${a+x})`).call(b),Q()}function Z(){D&&D.remove(),O&&O.remove(),k&&k.remove(),D=N.select(`.chart-group`).selectAll(`rect.range`).data(A).enter().append(`rect`).attr(`fill`,p).attr(`opacity`,(e,t)=>c[t]).attr(`class`,(e,t)=>`range r${t}`).attr(`width`,w).attr(`height`,a).attr(`x`,T?o:0),O=N.select(`.chart-group`).selectAll(`rect.measure`).data(M).enter().append(`rect`).attr(`fill`,m).attr(`fill-opacity`,(e,t)=>u[t]).attr(`class`,(e,t)=>`measure m${t}`).attr(`width`,w).attr(`height`,F).attr(`x`,T?o:0).attr(`y`,F),j.length&&(k=N.select(`.chart-group`).selectAll(`line.marker-line`).data(j).enter().append(`line`).attr(`class`,`marker-line`).attr(`stroke`,h).attr(`stroke-width`,5).attr(`opacity`,d).attr(`x1`,o).attr(`x2`,o).attr(`y1`,0).attr(`y2`,a))}function Q(){v&&v.remove(),v=N.select(`.axis-group`).selectAll(`line.extended-x-line`).data([0]).enter().append(`line`).attr(`class`,`extended-x-line`).attr(`x1`,0).attr(`x2`,i)}return I.a11yTitle=function(e){return arguments.length?(H=e,this):H},I.a11yDescription=function(e){return arguments.length?(U=e,this):U},I.a11yDataTable=function(e){return arguments.length?(W=e,this):W},I.colorSchema=function(e){return arguments.length?(f=e,this):f},I.exportChart=function(e,t){return E.call(I,N,e,t)},I.isLoading=function(e){return arguments.length?(r=e,this):r},I.height=function(e){return arguments.length?(n=e,this):n},I.isReverse=function(e){return arguments.length?(T=e,this):T},I.margin=function(t){return arguments.length?(e={...e,...t},this):e},I.numberFormat=function(e){return arguments.length?(_=e,this):_},I.paddingBetweenAxisAndChart=function(e){return arguments.length?(x=e,this):x},I.startMaxRangeOpacity=function(e){return arguments.length?(S=e,this):S},I.ticks=function(e){return arguments.length?(y=e,this):y},I.width=function(e){return arguments.length?(t=e,this):t},I.render=function(e,t){return s(this,e,t)},I}function O(){return(O=t((()=>{S(),a(),w(),x(),c(),T(),o(),i(),r(),d()})))()}var k;function A(){return(A=t((()=>{k={type:`object`,properties:{a11yDataTable:{type:`boolean`},a11yDescription:{anyOf:[{type:`null`},{type:`string`}]},a11yTitle:{anyOf:[{type:`null`},{type:`string`}]},colorSchema:{type:`array`,items:{type:`string`}},customBrushEnd:{not:{}},customBrushStart:{not:{}},customClick:{not:{}},customMouseMove:{not:{}},customMouseOut:{not:{}},customMouseOver:{not:{}},exportChart:{type:`string`},height:{type:`number`},isLoading:{type:`boolean`},isReverse:{type:`boolean`},margin:{type:`object`,properties:{left:{type:`number`},right:{type:`number`},top:{type:`number`},bottom:{type:`number`}}},numberFormat:{type:`string`},paddingBetweenAxisAndChart:{type:`number`},startMaxRangeOpacity:{type:`number`},ticks:{type:`number`},width:{type:`number`}},additionalProperties:!1}})))()}var j;function M(){return(M=t((()=>{x(),O(),u(),v(),_(),A(),j={create(e,t,n={}){let r=l(e),i=D();return b(r),p(i,n,`bullet`,k),r.datum(t[0]).call(h(i,n)),i},update(e,t,n={},r){let i=l(e);return b(i),p(r,n,`bullet`,k),h(r,n),t&&t.length?i.datum(t[0]).call(r):i.call(r),r},destroy:f}})))()}var N,P;function F(){return(F=t((()=>{N=e(n(),1),M(),y(),P=({chart:e=j,createTooltip:t,data:n,...r})=>{let i=m(e,n,r,{createTooltip:t});return N.createElement(`div`,{className:`bullet-container`,ref:i})},P.__docgenInfo={description:``,methods:[],displayName:`Bullet`,props:{a11yTitle:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`The name screen readers announce for the chart, set as its svg's
\`aria-label\`. Unset, the chart is announced by its type, such as "Bar chart".`},a11yDescription:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:"A longer description screen readers announce after the name, such as\nwhat the data shows, rendered as the svg's `<desc>`."},a11yDataTable:{required:!1,tsType:{name:`boolean`},description:`Whether the chart renders its data as a visually hidden table after its
svg, which screen readers can read cell by cell. On by default.`},data:{required:!0,tsType:{name:`union`,raw:`BulletChartDataShape[] | null`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
    [BulletChartKeys.Ranges]: [number?, number?, number?];
    [BulletChartKeys.Measures]: [number?, number?, number?];
    [BulletChartKeys.Markers]?: number[];
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
    [BulletChartKeys.Markers]?: number[];
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
    [BulletChartKeys.Markers]?: number[];
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

@ignore`}}}})))()}var I,L,R,z,B,V,H;function U(){return(U=t((()=>{I=()=>[{ranges:[130,160,250],measures:[150,180],markers:[175]}],L=()=>[{ranges:[130],measures:[150],markers:[105]}],R=()=>[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600]}],z=()=>[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[]}],B=()=>[{ranges:[2e3,3500],measures:[1800]},{ranges:[1500,2100,3500],measures:[1800]},{ranges:[1500,2100,3500],measures:[1800,2200]},{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600]},{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600,3e3]}],V=()=>[{ranges:[1500,2100,3500],measures:[1800,2200],markers:[2600,3e3]},{ranges:[1300,1900,3e3],measures:[1700,2e3],markers:[1600]},{ranges:[1300,1500,2e3],measures:[1500,1800],markers:[1950]},{ranges:[1e3,2e3],measures:[1500],markers:[]},{ranges:[1e3,2e3],measures:[500],markers:[]}],H={fullTestData:I,partialTestData:L,withAllElements:R,withNoMarker:z,withIncreasingDetail:B,withManyCPUData:V}})))()}var W,G,K,q,J,Y,X,Z,Q;function $(){return($=t((()=>{W=e(n(),1),F(),U(),G={title:`Charts/Bullet`,component:P},K=(e,t={})=>W.createElement(W.Fragment,null,e.map((e,n)=>W.createElement(P,{key:n,...t,data:[e]}))),q=e=>K(H.withAllElements(),e),q.parameters={controls:{exclude:[`data`,`chart`,`createTooltip`]}},J=()=>K(H.withNoMarker()),Y=[`Start with a measure on two ranges: the value and its bands`,`Add a third range for one more band`,`Add a second measure, such as a forecast`,`Add a marker for the target`,`Add a second marker for a stretch target`],X=()=>W.createElement(W.Fragment,null,H.withIncreasingDetail().map((e,t)=>W.createElement(`div`,{key:t},W.createElement(`p`,{className:`story-caption`},Y[t]),W.createElement(P,{data:[e],height:100}))),W.createElement(`p`,{className:`story-caption`},`Each bullet is its own chart. They line up because they share a width and a largest value, which sets the axis.`)),Z=()=>{let e=H.withAllElements();return W.createElement(P,{data:e,isLoading:!0})},q.__docgenInfo={description:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,methods:[],displayName:`Playground`},J.__docgenInfo={description:``,methods:[],displayName:`WithNoMarker`},X.__docgenInfo={description:``,methods:[],displayName:`WithDashboardAlignment`},Z.__docgenInfo={description:``,methods:[],displayName:`WithLoadingState`},Q=[`Playground`,`WithNoMarker`,`WithDashboardAlignment`,`WithLoadingState`],q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`args => renderBullets(bulletData.withAllElements(), args)`,...q.parameters?.docs?.source},description:{story:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`() => renderBullets(bulletData.withNoMarker())`,...J.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`() => <>
        {bulletData.withIncreasingDetail().map((bullet, index) => <div key={index}>
                <p className="story-caption">{DETAIL_STEPS[index]}</p>
                <Bullet data={[bullet]} height={100} />
            </div>)}
        <p className="story-caption">
            Each bullet is its own chart. They line up because they share a
            width and a largest value, which sets the axis.
        </p>
    </>`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`() => {
  const data = bulletData.withAllElements();
  return <Bullet data={data} isLoading={true} />;
}`,...Z.parameters?.docs?.source}}}})))()}$();export{q as Playground,X as WithDashboardAlignment,Z as WithLoadingState,J as WithNoMarker,Q as __namedExportsOrder,G as default};