import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{a as r,i,n as a,o,r as s,t as c}from"./donutChart.fixtures-CESB7tBU.js";var l,u;function d(){return(d=t((()=>{l=()=>[{name:`Shiny`,id:1,quantity:86},{name:`Blazing`,id:2,quantity:300},{name:`Dazzling`,id:3,quantity:276},{name:`Radiant`,id:4,quantity:195},{name:`Sparkling`,id:5,quantity:36},{name:`Other`,id:0,quantity:814}],u={with6Points:l}})))()}var f,p,m,h,g,_,v,y,b;function x(){return(x=t((()=>{f=e(n(),1),i(),d(),a(),o(),p={title:`Charts/Legend`,component:s},m=e=>{let t=u.with6Points();return f.createElement(s,{height:250,width:400,...e,data:t})},m.parameters={controls:{exclude:[`data`,`chart`,`createTooltip`]}},h=()=>{let e=u.with6Points();return f.createElement(s,{data:e,width:400,height:200})},g=()=>{let e=u.with6Points();return f.createElement(s,{data:e,isHorizontal:!0,marginRatio:1.8,height:100})},_=()=>{let e=u.with6Points();return f.createElement(s,{data:e,isHorizontal:!0,markerSize:8,marginRatio:1.8,width:500,height:100})},v=()=>{let e=c.with4Slices(),t=e.map(({name:e,id:t})=>({name:e,id:t})),[n,i]=f.useState(2);return f.createElement(`div`,null,f.createElement(s,{data:t,height:(e.length+1)*40,width:300,highlightEntryById:n}),f.createElement(r,{data:e,height:500/1.8,width:500,externalRadius:100,internalRadius:50,isAnimated:!1,highlightSliceById:2,hasFixedHighlightedSlice:!0,customMouseOver:e=>i(e.data.id),customMouseOut:()=>i(2)}))},y=()=>f.createElement(s,{data:null,height:250,width:400}),m.__docgenInfo={description:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,methods:[],displayName:`Playground`},h.__docgenInfo={description:``,methods:[],displayName:`WithStackDirection`},g.__docgenInfo={description:``,methods:[],displayName:`WithInlineDirection`},_.__docgenInfo={description:``,methods:[],displayName:`WithInlineDirectionAndSmallerMarkers`},v.__docgenInfo={description:`The legend bounds a donut: hovering a slice highlights its entry, and
leaving returns to the fixed slice. The legend draws names only, no
quantity.`,methods:[],displayName:`WithDonutBounded`},y.__docgenInfo={description:`With \`data={null}\` the legend waits like every other chart: nothing is
drawn until the data arrives, rather than throwing ("Cannot read properties
of undefined (reading 'filter')") on data it does not have yet.`,methods:[],displayName:`WithNoData`},b=[`Playground`,`WithStackDirection`,`WithInlineDirection`,`WithInlineDirectionAndSmallerMarkers`,`WithDonutBounded`,`WithNoData`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`args => {
  const data = legendData.with6Points();
  return <Legend height={250} width={400} {...args} data={data} />;
}`,...m.parameters?.docs?.source},description:{story:`Every prop the chart takes, editable from the Controls panel. Left unset, a
prop keeps the chart's own default, so this starts as the default chart.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  const data = legendData.with6Points();
  return <Legend data={data} width={400} height={200} />;
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
  const data = legendData.with6Points();
  return <Legend data={data} isHorizontal={true} marginRatio={1.8} height={100} />;
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`() => {
  const data = legendData.with6Points();
  return <Legend data={data} isHorizontal={true} markerSize={8} marginRatio={1.8} width={500} height={100} />;
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => {
  const data = donutData.with4Slices();
  const dataNoQuantity = data.map(({
    name,
    id
  }) => ({
    name,
    id
  }));
  const fixedSlice = 2;
  const width = 500;
  const [highlightedEntry, setHighlightedEntry] = React.useState(fixedSlice);
  return <div>
            <Legend data={dataNoQuantity} height={(data.length + 1) * 40} width={300} highlightEntryById={highlightedEntry} />
            <Donut data={data} height={width / 1.8} width={width} externalRadius={width / 5} internalRadius={width / 10} isAnimated={false} highlightSliceById={fixedSlice} hasFixedHighlightedSlice={true} customMouseOver={(slice: {
      data: {
        id: number;
      };
    }) => setHighlightedEntry(slice.data.id)} customMouseOut={() => setHighlightedEntry(fixedSlice)} />
        </div>;
}`,...v.parameters?.docs?.source},description:{story:`The legend bounds a donut: hovering a slice highlights its entry, and
leaving returns to the fixed slice. The legend draws names only, no
quantity.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => <Legend data={null} height={250} width={400} />`,...y.parameters?.docs?.source},description:{story:`With \`data={null}\` the legend waits like every other chart: nothing is
drawn until the data arrives, rather than throwing ("Cannot read properties
of undefined (reading 'filter')") on data it does not have yet.`,...y.parameters?.docs?.description}}}})))()}x();export{m as Playground,v as WithDonutBounded,g as WithInlineDirection,_ as WithInlineDirectionAndSmallerMarkers,y as WithNoData,h as WithStackDirection,b as __namedExportsOrder,p as default};