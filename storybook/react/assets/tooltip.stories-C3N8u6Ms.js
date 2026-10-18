import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-BGJ90fIb.js";import{n as r,t as i}from"./Tooltip-DZKHRAd5.js";import{i as a,n as o,r as s,t as c}from"./donutChart.fixtures-BzHYjl4R.js";var l,u,d,f;function p(){return(p=t((()=>{l=e(n(),1),a(),r(),o(),u={title:`Charts/Tooltip`,component:i},d=()=>{let e=c.with4Slices();return l.createElement(i,{data:e,render:e=>l.createElement(s,e)})},d.__docgenInfo={description:`A chart wrapped by a tooltip is handed \`createTooltip\`. The donut drops it
rather than passing it on to its wrapper as a configuration key, which
throws "Method not supported by Britechart: createTooltip"; this story shows
the donut rendering.`,methods:[],displayName:`WrappingADonut`},f=[`WrappingADonut`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => {
  const data = donutData.with4Slices();
  return <Tooltip data={data} render={props => <Donut {...props} />} />;
}`,...d.parameters?.docs?.source},description:{story:`A chart wrapped by a tooltip is handed \`createTooltip\`. The donut drops it
rather than passing it on to its wrapper as a configuration key, which
throws "Method not supported by Britechart: createTooltip"; this story shows
the donut rendering.`,...d.parameters?.docs?.description}}}})))()}p();export{d as WrappingADonut,f as __namedExportsOrder,u as default};