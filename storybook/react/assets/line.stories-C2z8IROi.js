import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{A as r,j as i}from"./useChart-Be0xPP2v.js";import{i as a,n as o,r as s,t as c}from"./lineChart.fixtures-zugE8_Q3.js";import{n as l,t as u}from"./Tooltip-Dub4jwx3.js";import{n as d,t as f}from"./Brush-2KChIHP1.js";var p,m,h,g,_,v,y,b,x,S,C;function w(){return(w=t((()=>{p=e(n(),1),d(),a(),l(),c(),i(),m={title:`Charts/Line`,component:s},h=e=>{let t=o.fiveTopics();return p.createElement(u,{data:t,render:t=>p.createElement(s,{...e,...t}),topicLabel:`topics`,title:`Tooltip Title`})},h.args={isAnimated:!1,grid:`horizontal`,yTicks:10},h.parameters={controls:{exclude:[`data`,`chart`,`createTooltip`]}},g={top:60,bottom:50,left:50,right:30},_=()=>{let e=o.oneSet();return p.createElement(u,{data:e,render:e=>p.createElement(s,{height:300,margin:g,lineCurve:`basis`,grid:`vertical`,tooltipThreshold:600,...e}),topicLabel:`topics`,title:`Quantity Sold`})},v=()=>{let e=o.fiveTopics();return p.createElement(u,{data:e,render:e=>p.createElement(s,{height:300,margin:g,grid:`full`,...e}),topicLabel:`topics`,title:`Quantity Sold`})},y=()=>{let e=o.fiveTopics();return p.createElement(u,{data:e,render:e=>p.createElement(s,{isAnimated:!0,...e}),topicLabel:`topics`,title:`Tooltip Title`})},b=()=>{let e=o.fiveTopics();return p.createElement(s,{data:e,margin:g,lineCurve:`stepBefore`,tooltipThreshold:200,colorSchema:r.colorSchemas.teal})},x=()=>{let e=o.fiveTopics(),[t,n]=(0,p.useState)(null),r=new Map;e.data.forEach(({date:e,value:t})=>{r.set(e,(r.get(e)??0)+t)});let i=[...r.entries()].map(([e,t])=>({date:e,value:t})),a=t?{data:e.data.filter(({date:e})=>{let n=new Date(e);return n>=t[0]&&n<=t[1]})}:e;return p.createElement(`div`,null,p.createElement(u,{data:a,render:e=>p.createElement(s,{isAnimated:!0,grid:`horizontal`,tooltipThreshold:600,margin:g,yAxisLabel:`Value Axis Label`,...e}),topicLabel:`topics`,title:`Quantity Sold`}),p.createElement(f,{data:i,height:100,isAnimated:!0,margin:{top:0,bottom:40,left:50,right:30},customBrushEnd:(...e)=>{let[[t,r]]=e;n(t&&r?[t,r]:null)}}))},S=()=>p.createElement(s,{data:{data:[]},isLoading:!0}),h.__docgenInfo={description:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart,
with horizontal grid lines and its tooltip.`,methods:[],displayName:`Playground`},_.__docgenInfo={description:``,methods:[],displayName:`WithSingleLine`},v.__docgenInfo={description:``,methods:[],displayName:`WithManyLines`},y.__docgenInfo={description:``,methods:[],displayName:`WithAnimation`},b.__docgenInfo={description:``,methods:[],displayName:`WithStepBeforeCurveAndTealColorSchema`},x.__docgenInfo={description:`The Brush gets the total per date and, once a range is selected, the Line
redraws with only the dates inside it.`,methods:[],displayName:`WithTooltipAndBrush`},S.__docgenInfo={description:``,methods:[],displayName:`WithLoadingState`},C=[`Playground`,`WithSingleLine`,`WithManyLines`,`WithAnimation`,`WithStepBeforeCurveAndTealColorSchema`,`WithTooltipAndBrush`,`WithLoadingState`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`args => {
  const data = lineData.fiveTopics();
  const renderLine = (props: TooltipRenderArgs<typeof data>) => <Line {...args} {...props} />;
  return <Tooltip data={data} render={renderLine}
  // Tooltip reads rows from \`values\`; the line's are under \`topics\`
  topicLabel="topics" title="Tooltip Title" />;
}`,...h.parameters?.docs?.source},description:{story:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart,
with horizontal grid lines and its tooltip.`,...h.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`() => {
  const data = lineData.oneSet();
  const renderLine = (props: TooltipRenderArgs<typeof data>) => <Line height={300} margin={lineMargin} lineCurve="basis" grid="vertical" tooltipThreshold={600} {...props} />;
  return <Tooltip data={data} render={renderLine}
  // Tooltip reads rows from \`values\`; the line's are under \`topics\`
  topicLabel="topics" title="Quantity Sold" />;
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => {
  const data = lineData.fiveTopics();
  const renderLine = (props: TooltipRenderArgs<typeof data>) => <Line height={300} margin={lineMargin} grid="full" {...props} />;
  return <Tooltip data={data} render={renderLine}
  // Tooltip reads rows from \`values\`; the line's are under \`topics\`
  topicLabel="topics" title="Quantity Sold" />;
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  const data = lineData.fiveTopics();
  const renderLine = (props: TooltipRenderArgs<typeof data>) => <Line isAnimated={true} {...props} />;
  return <Tooltip data={data} render={renderLine}
  // Tooltip reads rows from \`values\`; the line's are under \`topics\`
  topicLabel="topics" title="Tooltip Title" />;
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => {
  const data = lineData.fiveTopics();
  return <Line data={data} margin={lineMargin} lineCurve="stepBefore" tooltipThreshold={200} colorSchema={colors.colorSchemas.teal} />;
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  const allData = lineData.fiveTopics();
  const [range, setRange] = useState<[Date, Date] | null>(null);
  const totals = new Map<string, number>();
  allData.data.forEach(({
    date,
    value
  }) => {
    totals.set(date, (totals.get(date) ?? 0) + value);
  });
  const brushData = [...totals.entries()].map(([date, value]) => ({
    date,
    value
  }));
  const data = range ? {
    data: allData.data.filter(({
      date
    }) => {
      const time = new Date(date);
      return time >= range[0] && time <= range[1];
    })
  } : allData;
  const handleBrushEnd = (...args: never[]) => {
    // One argument: the selection's [start, end]
    const [[start, end]] = args as unknown as [[Date | null, Date | null]];
    setRange(start && end ? [start, end] : null);
  };
  const renderLine = (props: TooltipRenderArgs<typeof data>) => <Line isAnimated={true} grid="horizontal" tooltipThreshold={600} margin={lineMargin} yAxisLabel="Value Axis Label" {...props} />;
  return <div>
            <Tooltip data={data} render={renderLine}
    // Tooltip reads rows from \`values\`; the line's are under \`topics\`
    topicLabel="topics" title="Quantity Sold" />
            <Brush data={brushData} height={100} isAnimated={true} margin={{
      top: 0,
      bottom: 40,
      left: 50,
      right: 30
    }} customBrushEnd={handleBrushEnd} />
        </div>;
}`,...x.parameters?.docs?.source},description:{story:`The Brush gets the total per date and, once a range is selected, the Line
redraws with only the dates inside it.`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
  const data = {
    data: []
  };
  return <Line data={data} isLoading={true} />;
}`,...S.parameters?.docs?.source}}}})))()}w();export{h as Playground,y as WithAnimation,S as WithLoadingState,v as WithManyLines,_ as WithSingleLine,b as WithStepBeforeCurveAndTealColorSchema,x as WithTooltipAndBrush,C as __namedExportsOrder,m as default};