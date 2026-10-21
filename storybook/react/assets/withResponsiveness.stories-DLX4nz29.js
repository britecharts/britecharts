import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{i as r,n as i,r as a,t as o}from"./lineChart.fixtures-B3kaJM5T.js";import{n as s,t as c}from"./optimizedResize-CWynukOQ.js";function l(e){let t=t=>{let n=(0,u.useRef)(null),r=(0,u.useRef)(500),[i,a]=(0,u.useState)(500);return(0,u.useLayoutEffect)(()=>{let e=()=>{n.current&&n.current.clientWidth!==r.current&&(r.current=n.current.clientWidth,a(r.current))};return s.addHorizontal(e),e(),()=>s.remove(e)},[]),u.createElement(`div`,{className:`responsive-container`,ref:n},u.createElement(e,{width:i,...t}))};return t.displayName=`withResponsiveness(${e.displayName||e.name||`Component`})`,u.memo(t)}var u;function d(){return(d=t((()=>{u=e(n(),1),c()})))()}var f,p,m,h,g;function _(){return(_=t((()=>{f=e(n(),1),r(),o(),d(),p=l(a),m={title:`Helpers/withResponsiveness`},h=()=>{let e=i.oneSet();return f.createElement(`div`,{style:{width:`100%`}},f.createElement(p,{data:e,height:300,margin:{top:60,right:30,bottom:60,left:70}}))},h.__docgenInfo={description:`The higher-order component measures its own wrapper after mount and again
whenever the window is resized, and passes the chart its width: resize the
window to see the chart follow. The frame fills the width available.`,methods:[],displayName:`WithALineChart`},g=[`WithALineChart`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  const data = lineData.oneSet();
  return <div style={{
    width: '100%'
  }}>
            <ResponsiveLine data={data} height={300} margin={{
      top: 60,
      right: 30,
      bottom: 60,
      left: 70
    }} />
        </div>;
}`,...h.parameters?.docs?.source},description:{story:`The higher-order component measures its own wrapper after mount and again
whenever the window is resized, and passes the chart its width: resize the
window to see the chart follow. The frame fills the width available.`,...h.parameters?.docs?.description}}}})))()}_();export{h as WithALineChart,g as __namedExportsOrder,m as default};