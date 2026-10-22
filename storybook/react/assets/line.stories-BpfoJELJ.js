import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{b as r,y as i}from"./useChart-BW1kPAiP.js";import{i as a,n as o,r as s,t as c}from"./lineChart.fixtures-0PrUoRLf.js";import{n as l,t as u}from"./Tooltip-Dh8sdW2Q.js";var d,f,p,m,h,g,_,v,y;function b(){return(b=t((()=>{d=e(n(),1),a(),l(),c(),r(),f={title:`Charts/Line`,component:s},p=e=>{let t=o.oneSet();return d.createElement(u,{data:t,render:t=>d.createElement(s,{...e,...t}),topicLabel:`topics`,title:`Tooltip Title`})},p.args={isAnimated:!1},p.parameters={controls:{exclude:[`data`,`chart`,`createTooltip`]}},m=()=>{let e=o.oneSet();return d.createElement(u,{data:e,render:e=>d.createElement(s,{margin:{top:60,right:30,bottom:60,left:70},lineCurve:`basis`,...e}),topicLabel:`topics`,title:`Tooltip Title`})},h=()=>{let e=o.fiveTopics();return d.createElement(u,{data:e,render:e=>d.createElement(s,{margin:{top:60,right:30,bottom:60,left:70},tooltipThreshold:0,...e}),topicLabel:`topics`,title:``})},g=()=>{let e=o.oneSet();return d.createElement(u,{data:e,render:e=>d.createElement(s,{isAnimated:!0,...e}),topicLabel:`topics`,title:`Tooltip Title`})},_=()=>{let e=o.fiveTopics();return d.createElement(s,{data:e,margin:{top:60,right:30,bottom:60,left:70},lineCurve:`stepBefore`,tooltipThreshold:200,colorSchema:i.colorSchemas.teal})},v=()=>d.createElement(s,{data:{data:[]},isLoading:!0}),p.__docgenInfo={description:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart,
with its tooltip.`,methods:[],displayName:`Playground`},m.__docgenInfo={description:``,methods:[],displayName:`WithOneLineAndTooltipAndBasisCurve`},h.__docgenInfo={description:``,methods:[],displayName:`WithMultipleLinesAndTooltip`},g.__docgenInfo={description:``,methods:[],displayName:`WithAnimation`},_.__docgenInfo={description:``,methods:[],displayName:`WithMultipleLinesAndStepBeforeCurveAndTealColorSchema`},v.__docgenInfo={description:``,methods:[],displayName:`WithLoadingState`},y=[`Playground`,`WithOneLineAndTooltipAndBasisCurve`,`WithMultipleLinesAndTooltip`,`WithAnimation`,`WithMultipleLinesAndStepBeforeCurveAndTealColorSchema`,`WithLoadingState`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`args => {
  const data = lineData.oneSet();
  const renderLine = (props: TooltipRenderArgs<typeof data>) => <Line {...args} {...props} />;
  return <Tooltip data={data} render={renderLine}
  // Tooltip reads rows from \`values\`; the line's are under \`topics\`
  topicLabel="topics" title="Tooltip Title" />;
}`,...p.parameters?.docs?.source},description:{story:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart,
with its tooltip.`,...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  const data = lineData.oneSet();
  const renderLine = (props: TooltipRenderArgs<typeof data>) => <Line margin={{
    top: 60,
    right: 30,
    bottom: 60,
    left: 70
  }} lineCurve="basis" {...props} />;
  return <Tooltip data={data} render={renderLine}
  // Tooltip reads rows from \`values\`; the line's are under \`topics\`
  topicLabel="topics" title="Tooltip Title" />;
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  const data = lineData.fiveTopics();
  const renderLine = (props: TooltipRenderArgs<typeof data>) => <Line margin={{
    top: 60,
    right: 30,
    bottom: 60,
    left: 70
  }} tooltipThreshold={0} {...props} />;
  return <Tooltip data={data} render={renderLine}
  // Tooltip reads rows from \`values\`; the line's are under \`topics\`
  topicLabel="topics" title="" />;
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
  const data = lineData.oneSet();
  const renderLine = (props: TooltipRenderArgs<typeof data>) => <Line isAnimated={true} {...props} />;
  return <Tooltip data={data} render={renderLine}
  // Tooltip reads rows from \`values\`; the line's are under \`topics\`
  topicLabel="topics" title="Tooltip Title" />;
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`() => {
  const data = lineData.fiveTopics();
  return <Line data={data} margin={{
    top: 60,
    right: 30,
    bottom: 60,
    left: 70
  }} lineCurve="stepBefore" tooltipThreshold={200} colorSchema={colors.colorSchemas.teal} />;
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => {
  const data = {
    data: []
  };
  return <Line data={data} isLoading={true} />;
}`,...v.parameters?.docs?.source}}}})))()}b();export{p as Playground,g as WithAnimation,v as WithLoadingState,_ as WithMultipleLinesAndStepBeforeCurveAndTealColorSchema,h as WithMultipleLinesAndTooltip,m as WithOneLineAndTooltipAndBasisCurve,y as __namedExportsOrder,f as default};