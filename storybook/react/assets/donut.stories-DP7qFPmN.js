import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{a as r,i,n as a,o,r as s,t as c}from"./donutChart.fixtures-CESB7tBU.js";var l,u,d,f,p,m,h,g,_,v,y,b;function x(){return(x=t((()=>{l=e(n(),1),o(),i(),a(),u={title:`Charts/Donut`,component:r},d=-1,f=e=>{let t=c.with6Slices();return l.createElement(r,{...e,data:t})},f.args={isAnimated:!1},f.parameters={controls:{exclude:[`data`,`chart`,`createTooltip`]}},p=()=>{let e=c.with6Slices(),t={top:10,bottom:10,left:0,right:30},[n,i]=l.useState();return l.createElement(`div`,{style:{display:`flex`,alignItems:`center`}},l.createElement(r,{data:e,height:500,width:500,externalRadius:200,internalRadius:100,isAnimated:!0,highlightSliceById:n,customMouseOver:(e=>{i(e.data.id)}).bind(void 0),customMouseOut:(()=>{i(99999)}).bind(void 0)}),l.createElement(s,{data:c.with6Slices(),height:(e.length+1)*40,width:300,margin:t,highlightEntryById:n}))},m=()=>{let e=c.with3Slices(),[t,n]=l.useState(d);return l.createElement(`div`,{style:{width:500}},l.createElement(r,{data:e,height:500/1.8,width:500,externalRadius:100,internalRadius:50,isAnimated:!1,customMouseOver:e=>n(e.data.id),customMouseOut:()=>n(d)}),l.createElement(s,{data:e,isHorizontal:!0,height:40,width:500,markerSize:8,highlightEntryById:t}))},h=()=>{let e=c.with6Slices();return l.createElement(r,{data:e,isAnimated:!0})},g=()=>{let e=c.with4Slices(),[t,n]=l.useState(2);return l.createElement(`div`,{style:{display:`flex`,alignItems:`center`}},l.createElement(r,{data:e,height:400,width:500,externalRadius:500/3.5,internalRadius:500/7,isAnimated:!1,highlightSliceById:2,hasFixedHighlightedSlice:!0,customMouseOver:e=>n(e.data.id),customMouseOut:()=>n(2)}),l.createElement(s,{data:e,height:(e.length+1)*40,width:300,highlightEntryById:t}))},_=()=>{let e=c.with6Slices(),[t,n]=l.useState(`Hover a slice`);return l.createElement(`div`,null,l.createElement(r,{data:e,customMouseOver:e=>n(`Mouse over: ${e.data.name}`),externalRadius:100,internalRadius:47,highlightSliceById:1,isAnimated:!1}),l.createElement(`p`,null,t))},v=()=>{let e=c.with6Slices(),[t,n]=l.useState(d);return l.createElement(`div`,{style:{display:`flex`,alignItems:`center`}},l.createElement(r,{data:e,height:400,width:500,externalRadius:500/3.5,internalRadius:0,hasCenterLegend:!1,a11yTitle:`Visits by source`,isAnimated:!1,customMouseOver:e=>n(e.data.id),customMouseOut:()=>n(d)}),l.createElement(s,{data:e,height:(e.length+1)*40,width:300,highlightEntryById:t}))},y=()=>{let e=c.with6Slices();return l.createElement(r,{data:e,isLoading:!0})},f.__docgenInfo={description:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,methods:[],displayName:`Playground`},p.__docgenInfo={description:``,methods:[],displayName:`WithAnimationAndLegend`},m.__docgenInfo={description:``,methods:[],displayName:`WithInlineLegend`},h.__docgenInfo={description:``,methods:[],displayName:`WithAnimation`},g.__docgenInfo={description:"One slice stays highlighted, `highlightSliceById` with\n`hasFixedHighlightedSlice`, and the legend follows it: hovering another\nslice highlights that one, and leaving returns to the fixed slice.",methods:[],displayName:`WithHighlightedSlice`},_.__docgenInfo={description:"Hovering a slice reports it through `customMouseOver`: here, in the line\nunder the chart.",methods:[],displayName:`WithHoverEvent`},v.__docgenInfo={description:"A pie chart is a donut without a hole: `internalRadius={0}`. With no hole,\nthere is no room for the centred text, so `hasCenterLegend={false}` turns\nit off and the legend on its right names each slice, highlighting the one\nunder the pointer.",methods:[],displayName:`WithPieChartFormat`},y.__docgenInfo={description:``,methods:[],displayName:`WithLoadingState`},b=[`Playground`,`WithAnimationAndLegend`,`WithInlineLegend`,`WithAnimation`,`WithHighlightedSlice`,`WithHoverEvent`,`WithPieChartFormat`,`WithLoadingState`],f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`args => {
  const data = donutData.with6Slices();
  return <Donut {...args} data={data} />;
}`,...f.parameters?.docs?.source},description:{story:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,...f.parameters?.docs?.description}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
  const data = donutData.with6Slices();
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
            <Donut data={data} height={width} width={width} externalRadius={width / 2.5} internalRadius={width / 5} isAnimated={true} highlightSliceById={highlightedSlice} customMouseOver={handleMouseOver.bind(this)} customMouseOut={handleMouseOut.bind(this)} />
            <Legend data={donutData.with6Slices()} height={(data.length + 1) * 40} width={300} margin={legendMargin} highlightEntryById={highlightedSlice} />
        </div>;
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  const data = donutData.with3Slices();
  const width = 500;
  const [highlightedSlice, setHighlightedSlice] = React.useState(NO_SLICE);
  return <div style={{
    width
  }}>
            <Donut data={data} height={width / 1.8} width={width} externalRadius={width / 5} internalRadius={width / 10} isAnimated={false} customMouseOver={(slice: {
      data: {
        id: number;
      };
    }) => setHighlightedSlice(slice.data.id)} customMouseOut={() => setHighlightedSlice(NO_SLICE)} />
            <Legend data={data} isHorizontal={true} height={40} width={width} markerSize={8} highlightEntryById={highlightedSlice} />
        </div>;
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  const data = donutData.with6Slices();
  return <Donut data={data} isAnimated={true} />;
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
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
}`,...g.parameters?.docs?.source},description:{story:"One slice stays highlighted, `highlightSliceById` with\n`hasFixedHighlightedSlice`, and the legend follows it: hovering another\nslice highlights that one, and leaving returns to the fixed slice.",...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`() => {
  const data = donutData.with6Slices();
  const [message, setMessage] = React.useState('Hover a slice');
  return <div>
            <Donut data={data} customMouseOver={(slice: {
      data: {
        name: string;
      };
    }) => setMessage(\`Mouse over: \${slice.data.name}\`)} externalRadius={100} internalRadius={47} highlightSliceById={1} isAnimated={false} />
            <p>{message}</p>
        </div>;
}`,..._.parameters?.docs?.source},description:{story:"Hovering a slice reports it through `customMouseOver`: here, in the line\nunder the chart.",..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => {
  const data = donutData.with6Slices();
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
}`,...v.parameters?.docs?.source},description:{story:"A pie chart is a donut without a hole: `internalRadius={0}`. With no hole,\nthere is no room for the centred text, so `hasCenterLegend={false}` turns\nit off and the legend on its right names each slice, highlighting the one\nunder the pointer.",...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  const data = donutData.with6Slices();
  return <Donut data={data} isLoading={true} />;
}`,...y.parameters?.docs?.source}}}})))()}x();export{f as Playground,h as WithAnimation,p as WithAnimationAndLegend,g as WithHighlightedSlice,_ as WithHoverEvent,m as WithInlineLegend,y as WithLoadingState,v as WithPieChartFormat,b as __namedExportsOrder,u as default};