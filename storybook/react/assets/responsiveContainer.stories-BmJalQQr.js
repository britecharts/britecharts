import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{i as r,n as i,r as a,t as o}from"./lineChart.fixtures-0PrUoRLf.js";import{n as s,t as c}from"./optimizedResize-CWynukOQ.js";var l,u;function d(){return(d=t((()=>{l=e(n(),1),c(),u=({render:e})=>{let t=(0,l.useRef)(null),n=(0,l.useRef)(500),[r,i]=(0,l.useState)(500);return(0,l.useLayoutEffect)(()=>{let e=()=>{t.current&&t.current.clientWidth!==n.current&&(n.current=t.current.clientWidth,i(n.current))};return s.addHorizontal(e),e(),()=>s.remove(e)},[]),l.createElement(`div`,{className:`responsive-container`,ref:t},e?e({width:r}):null)},u.__docgenInfo={description:``,methods:[],displayName:`ResponsiveContainer`,props:{render:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(size: { width: number }) => ReactNode`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{ width: number }`,signature:{properties:[{key:`width`,value:{name:`number`,required:!0}}]}},name:`size`}],return:{name:`ReactNode`}}},description:`Draws what should fill the container, given the width the container has
measured. Called again when the window is resized.`}}}})))()}var f,p,m,h,g;function _(){return(_=t((()=>{f=e(n(),1),r(),d(),o(),p={title:`Helpers/ResponsiveContainer`,component:u},m=()=>{let e=i.oneSet();return f.createElement(`div`,{style:{width:`100%`}},f.createElement(u,{render:({width:t})=>f.createElement(a,{data:e,width:t,height:300,margin:{top:60,right:30,bottom:60,left:70}})}))},h=()=>{let e=i.oneSet();return f.createElement(`div`,{style:{width:`100%`,maxWidth:360}},f.createElement(u,{render:({width:t})=>f.createElement(a,{data:e,width:t,height:300,margin:{top:60,right:30,bottom:60,left:70}})}))},m.__docgenInfo={description:`The container measures itself after mount and again whenever the window is
resized, and hands the chart its width: resize the window to see the chart
follow. The frame fills the width available.`,methods:[],displayName:`WithALineChart`},h.__docgenInfo={description:`A frame capped at 360px: the chart takes the frame's width, not the
window's, until the window gets narrower than the frame.`,methods:[],displayName:`InANarrowFrame`},g=[`WithALineChart`,`InANarrowFrame`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  const data = lineData.oneSet();
  return <div style={{
    width: '100%'
  }}>
            <ResponsiveContainer render={({
      width
    }) => <Line data={data} width={width} height={300} margin={{
      top: 60,
      right: 30,
      bottom: 60,
      left: 70
    }} />} />
        </div>;
}`,...m.parameters?.docs?.source},description:{story:`The container measures itself after mount and again whenever the window is
resized, and hands the chart its width: resize the window to see the chart
follow. The frame fills the width available.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  const data = lineData.oneSet();
  return <div style={{
    width: '100%',
    maxWidth: 360
  }}>
            <ResponsiveContainer render={({
      width
    }) => <Line data={data} width={width} height={300} margin={{
      top: 60,
      right: 30,
      bottom: 60,
      left: 70
    }} />} />
        </div>;
}`,...h.parameters?.docs?.source},description:{story:`A frame capped at 360px: the chart takes the frame's width, not the
window's, until the window gets narrower than the frame.`,...h.parameters?.docs?.description}}}})))()}_();export{h as InANarrowFrame,m as WithALineChart,g as __namedExportsOrder,p as default};