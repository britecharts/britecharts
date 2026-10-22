import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{i as r,n as i,r as a,t as o}from"./donutChart.fixtures-BpnNocdw.js";import{n as s,t as c}from"./Legend-DwKCw7a4.js";var l,u,d,f,p,m,h,g;function _(){return(_=t((()=>{l=e(n(),1),r(),s(),i(),u={title:`Charts/Donut`,component:a},d=e=>{let t=o.with4Slices();return l.createElement(a,{...e,data:t})},d.args={isAnimated:!1},d.parameters={controls:{exclude:[`data`,`chart`,`createTooltip`]}},f=()=>{let e=o.with4Slices(),t={top:10,bottom:10,left:0,right:30},[n,r]=l.useState();return l.createElement(l.Fragment,null,l.createElement(a,{data:e,height:500,width:500,externalRadius:200,internalRadius:100,isAnimated:!1,highlightSliceById:n,customMouseOver:(e=>{r(e.data.id)}).bind(void 0),customMouseOut:(()=>{r(99999)}).bind(void 0)}),l.createElement(c,{data:o.with4Slices(),height:200,width:500,margin:t,highlightEntryById:n}))},p=()=>{let e=o.with4Slices();return l.createElement(a,{data:e,isAnimated:!0})},m=()=>{let e=o.with4Slices();return l.createElement(a,{data:e,customMouseOver:()=>console.log(`Mouse Over`),externalRadius:100,internalRadius:47,highlightSliceById:1,isAnimated:!1})},h=()=>l.createElement(a,{data:[],isLoading:!0}),d.__docgenInfo={description:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,methods:[],displayName:`Playground`},f.__docgenInfo={description:``,methods:[],displayName:`WithHighlightedLegend`},p.__docgenInfo={description:``,methods:[],displayName:`WithAnimation`},m.__docgenInfo={description:``,methods:[],displayName:`WithHoverEvent`},h.__docgenInfo={description:``,methods:[],displayName:`WithLoadingState`},g=[`Playground`,`WithHighlightedLegend`,`WithAnimation`,`WithHoverEvent`,`WithLoadingState`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`args => {
  const data = donutData.with4Slices();
  return <Donut {...args} data={data} />;
}`,...d.parameters?.docs?.source},description:{story:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,...d.parameters?.docs?.description}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`() => {
  const data = donutData.with4Slices();
  const legendMargin = {
    top: 10,
    bottom: 10,
    left: 0,
    right: 30
  };
  const width = 500;
  const [highlightedSlice, setHighlightedSlice] = React.useState<number>();
  const handleMouseOver = (data: {
    data: {
      id: number;
    };
  }) => {
    setHighlightedSlice(data.data.id);
  };
  const handleMouseOut = () => {
    setHighlightedSlice(99999);
  };
  return <>
            <Donut data={data} height={width} width={width} externalRadius={width / 2.5} internalRadius={width / 5} isAnimated={false} highlightSliceById={highlightedSlice} customMouseOver={handleMouseOver.bind(this)} customMouseOut={handleMouseOut.bind(this)} />
            <Legend data={donutData.with4Slices()} height={200} width={width} margin={legendMargin} highlightEntryById={highlightedSlice} />
        </>;
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
  const data = donutData.with4Slices();
  return <Donut data={data} isAnimated={true} />;
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  const data = donutData.with4Slices();
  const logMouseOver = () => console.log('Mouse Over');
  return <Donut data={data} customMouseOver={logMouseOver} externalRadius={100} internalRadius={47} highlightSliceById={1} isAnimated={false} />;
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  const data: [] = [];
  return <Donut data={data} isLoading={true} />;
}`,...h.parameters?.docs?.source}}}})))()}_();export{d as Playground,p as WithAnimation,f as WithHighlightedLegend,m as WithHoverEvent,h as WithLoadingState,g as __namedExportsOrder,u as default};