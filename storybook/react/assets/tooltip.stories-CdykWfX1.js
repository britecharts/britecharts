import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-BGJ90fIb.js";import{n as r,t as i}from"./Tooltip-D6Yg9Shy.js";import{i as a,n as o,r as s,t as c}from"./donutChart.fixtures-C80YSI2G.js";var l,u,d,f;function p(){return(p=t((()=>{l=e(n(),1),a(),r(),o(),u={title:`Charts/Tooltip`,component:i},d=()=>{let e=c.with4Slices();return l.createElement(i,{data:e,render:t=>l.createElement(s,{...t,data:e})})},d.__docgenInfo={description:`A chart wrapped by a tooltip is handed \`createTooltip\`, which the donut
used to pass on to its wrapper as a configuration key, throwing "Method not
supported by Britechart: createTooltip". It now drops it, so the donut
renders; this story is the visual proof, and the one Chromatic diff that
fix causes (an error state becomes a chart).`,methods:[],displayName:`WrappingADonut`},f=[`WrappingADonut`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => {
  const data = donutData.with4Slices();
  return <Tooltip data={data} render={(props: TooltipRenderArgs) => <Donut {...props} data={data} />} />;
}`,...d.parameters?.docs?.source},description:{story:`A chart wrapped by a tooltip is handed \`createTooltip\`, which the donut
used to pass on to its wrapper as a configuration key, throwing "Method not
supported by Britechart: createTooltip". It now drops it, so the donut
renders; this story is the visual proof, and the one Chromatic diff that
fix causes (an error state becomes a chart).`,...d.parameters?.docs?.description}}}})))()}p();export{d as WrappingADonut,f as __namedExportsOrder,u as default};