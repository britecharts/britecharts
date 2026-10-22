import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{i as r,n as i,r as a,t as o}from"./donutChart.fixtures-BImiBNMm.js";import{n as s,t as c}from"./Legend-X7VCkeIP.js";var l,u,d,f,p,m,h,g,_,v,y;function b(){return(b=t((()=>{l=e(n(),1),r(),s(),i(),u={title:`Charts/Donut`,component:a},d=e=>{let t=o.with4Slices();return l.createElement(a,{...e,data:t})},d.args={isAnimated:!1},d.parameters={controls:{exclude:[`data`,`chart`,`createTooltip`]}},f=()=>{let e=o.with4Slices(),t={top:10,bottom:10,left:0,right:30},[n,r]=l.useState();return l.createElement(`div`,{style:{display:`flex`,alignItems:`center`}},l.createElement(a,{data:e,height:500,width:500,externalRadius:200,internalRadius:100,isAnimated:!1,highlightSliceById:n,customMouseOver:(e=>{r(e.data.id)}).bind(void 0),customMouseOut:(()=>{r(99999)}).bind(void 0)}),l.createElement(c,{data:o.with4Slices(),height:(e.length+1)*40,width:300,margin:t,highlightEntryById:n}))},p=()=>{let e=o.with4Slices(),[t,n]=l.useState(2);return l.createElement(`div`,{style:{display:`flex`,alignItems:`center`}},l.createElement(a,{data:e,height:400,width:500,externalRadius:500/3.5,internalRadius:500/7,isAnimated:!1,highlightSliceById:2,hasFixedHighlightedSlice:!0,customMouseOver:e=>n(e.data.id),customMouseOut:()=>n(2)}),l.createElement(c,{data:e,height:(e.length+1)*40,width:300,highlightEntryById:t}))},m=()=>{let e=o.with4Slices();return l.createElement(a,{data:e,isAnimated:!0})},h=()=>{let e=o.with4Slices();return l.createElement(a,{data:e,customMouseOver:()=>console.log(`Mouse Over`),externalRadius:100,internalRadius:47,highlightSliceById:1,isAnimated:!1})},g=-1,_=()=>{let e=o.with4Slices(),[t,n]=l.useState(g);return l.createElement(`div`,{style:{display:`flex`,alignItems:`center`}},l.createElement(a,{data:e,height:400,width:500,externalRadius:500/3.5,internalRadius:0,hasCenterLegend:!1,a11yTitle:`Visits by source`,isAnimated:!1,customMouseOver:e=>n(e.data.id),customMouseOut:()=>n(g)}),l.createElement(c,{data:e,height:(e.length+1)*40,width:300,highlightEntryById:t}))},v=()=>l.createElement(a,{data:[],isLoading:!0}),d.__docgenInfo={description:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,methods:[],displayName:`Playground`},f.__docgenInfo={description:``,methods:[],displayName:`WithHighlightedLegend`},p.__docgenInfo={description:"One slice stays highlighted, `highlightSliceById` with\n`hasFixedHighlightedSlice`, and the legend follows it: hovering another\nslice highlights that one, and leaving returns to the fixed slice.",methods:[],displayName:`WithHighlightedSlice`},m.__docgenInfo={description:``,methods:[],displayName:`WithAnimation`},h.__docgenInfo={description:``,methods:[],displayName:`WithHoverEvent`},_.__docgenInfo={description:``,methods:[],displayName:`WithPieChartFormat`},v.__docgenInfo={description:``,methods:[],displayName:`WithLoadingState`},y=[`Playground`,`WithHighlightedLegend`,`WithHighlightedSlice`,`WithAnimation`,`WithHoverEvent`,`WithPieChartFormat`,`WithLoadingState`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`args => {
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
  return <div style={{
    display: 'flex',
    alignItems: 'center'
  }}>
            <Donut data={data} height={width} width={width} externalRadius={width / 2.5} internalRadius={width / 5} isAnimated={false} highlightSliceById={highlightedSlice} customMouseOver={handleMouseOver.bind(this)} customMouseOut={handleMouseOut.bind(this)} />
            <Legend data={donutData.with4Slices()} height={(data.length + 1) * 40} width={300} margin={legendMargin} highlightEntryById={highlightedSlice} />
        </div>;
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
  const data = donutData.with4Slices();
  const fixedSlice = 2;
  const width = 500;
  const [highlightedEntry, setHighlightedEntry] = React.useState(fixedSlice);
  return <div style={{
    display: 'flex',
    alignItems: 'center'
  }}>
            <Donut data={data} height={width * 0.8} width={width} externalRadius={width / 3.5} internalRadius={width / 7} isAnimated={false} highlightSliceById={fixedSlice} hasFixedHighlightedSlice={true} customMouseOver={(slice: {
      data: {
        id: number;
      };
    }) => setHighlightedEntry(slice.data.id)} customMouseOut={() => setHighlightedEntry(fixedSlice)} />
            <Legend data={data} height={(data.length + 1) * 40} width={300} highlightEntryById={highlightedEntry} />
        </div>;
}`,...p.parameters?.docs?.source},description:{story:"One slice stays highlighted, `highlightSliceById` with\n`hasFixedHighlightedSlice`, and the legend follows it: hovering another\nslice highlights that one, and leaving returns to the fixed slice.",...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  const data = donutData.with4Slices();
  return <Donut data={data} isAnimated={true} />;
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  const data = donutData.with4Slices();
  const logMouseOver = () => console.log('Mouse Over');
  return <Donut data={data} customMouseOver={logMouseOver} externalRadius={100} internalRadius={47} highlightSliceById={1} isAnimated={false} />;
}`,...h.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`() => {
  const data = donutData.with4Slices();
  const width = 500;
  const [highlightedSlice, setHighlightedSlice] = React.useState(NO_SLICE);
  return <div style={{
    display: 'flex',
    alignItems: 'center'
  }}>
            <Donut data={data} height={width * 0.8} width={width} externalRadius={width / 3.5} internalRadius={0} hasCenterLegend={false} a11yTitle="Visits by source" isAnimated={false} customMouseOver={(slice: {
      data: {
        id: number;
      };
    }) => setHighlightedSlice(slice.data.id)} customMouseOut={() => setHighlightedSlice(NO_SLICE)} />
            <Legend data={data} height={(data.length + 1) * 40} width={300} highlightEntryById={highlightedSlice} />
        </div>;
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => {
  const data: [] = [];
  return <Donut data={data} isLoading={true} />;
}`,...v.parameters?.docs?.source}}}})))()}b();export{d as Playground,m as WithAnimation,f as WithHighlightedLegend,p as WithHighlightedSlice,h as WithHoverEvent,v as WithLoadingState,_ as WithPieChartFormat,y as __namedExportsOrder,u as default};