import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-BGJ90fIb.js";import{a as r,r as i}from"./useChart-BKQ5wJ36.js";var a,o,s,c,l,u,d,f;function p(){return(p=t((()=>{a=e(n(),1),i(),o=`.metadata-group .vertical-marker-container`,s=`.metadata-group`,c=`.britechart-tooltip`,l={isActive:!1,x:0,y:0,dataPoint:null,topicColorMap:null},u=e=>{let t={...e};return delete t.data,delete t.chart,delete t.render,delete t.customMouseMove,delete t.customMouseOut,delete t.customMouseOver,t},d=e=>e?e.querySelector(o)||e.querySelector(s):null,f=e=>{let{chart:t=r}=e,n=(0,a.useRef)(null),i=(0,a.useRef)(null),o=(0,a.useRef)(t),s=(0,a.useRef)(!1),f=(0,a.useRef)({props:null,element:null}),[p,m]=(0,a.useState)(l),h=()=>{let r=d(n.current);r&&(i.current&&r.querySelector(c)||(i.current=t.create(r,u(e))))};return e.render&&e!==f.current.props&&(f.current={props:e,element:e.render({data:e.data,createTooltip:h,customMouseMove:(t,n,r,i)=>{let[a,o]=Array.isArray(n)?n:[];m(e=>({...e,dataPoint:t,topicColorMap:i||null,x:a,y:o})),e.customMouseMove&&e.customMouseMove(t,n,r,i)},customMouseOut:()=>{m(e=>({...e,isActive:!1})),e.customMouseOut&&e.customMouseOut()},customMouseOver:()=>{m(e=>({...e,isActive:!0})),e.customMouseOver&&e.customMouseOver()}})}),(0,a.useLayoutEffect)(()=>{if(o.current=t,!s.current){s.current=!0,h();return}let r=d(n.current);r&&i.current&&(i.current=t.update(r,u(e),p,i.current))}),(0,a.useLayoutEffect)(()=>{let e=n.current;return()=>{o.current.destroy(e),i.current=null,s.current=!1}},[]),a.createElement(`div`,{className:`tooltip-chart-wrapper`,ref:n},f.current.element)},f.__docgenInfo={description:``,methods:[],displayName:`Tooltip`,props:{dateCustomFormat:{required:!1,tsType:{name:`string`},description:`Exposes the ability to use a custom date format`},dateFormat:{required:!1,tsType:{name:`string`},description:`Exposes the ability to force the tooltip to use a certain date format`},dateLabel:{required:!1,tsType:{name:`string`},description:`Gets or Sets the dateLabel of the data`},hide:{required:!1,tsType:{name:`boolean`},description:`Hides the tooltip`},locale:{required:!1,tsType:{name:`string`},description:`Pass locale for the tooltip to render the date in`},nameLabel:{required:!1,tsType:{name:`string`},description:`Gets or Sets the nameLabel of the data`},numberFormat:{required:!1,tsType:{name:`string`},description:`Gets or Sets the number format of the bar chart`},shouldShowDateInTitle:{required:!1,tsType:{name:`boolean`},description:`Gets or Sets shouldShowDateInTitle`},show:{required:!1,tsType:{name:`union`,raw:`TooltipListDataShape | TooltipSingleDataShape`,elements:[{name:`signature`,type:`object`,raw:`{
    [tooltipKeys.Date]: string;
    [tooltipKeys.Topics]: TooltipTopic[];
}`,signature:{properties:[]}},{name:`signature`,type:`object`,raw:`{
    name: string;
    value: number;
}`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`number`,required:!0}}]}}]},description:`Shows the tooltip`},title:{required:!1,tsType:{name:`string`},description:`Gets or Sets the title of the tooltip (to only show the date, set a blank title)`},tooltipOffset:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
    x?: number;
    y?: number;
}`,signature:{properties:[{key:`x`,value:{name:`number`,required:!1}},{key:`y`,value:{name:`number`,required:!1}}]}},description:`Pass an override for the offset of your tooltip`},topicLabel:{required:!1,tsType:{name:`string`},description:`Gets or Sets the topicLabel of the data`},topicsOrder:{required:!1,tsType:{name:`Array`,elements:[{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}]}],raw:`Array<string | number>`},description:`Pass an override for the ordering of your tooltip`},update:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
    [tooltipKeys.Date]: string;
    [tooltipKeys.Topics]: TooltipTopic[];
}`,signature:{properties:[]}},description:`Updates the position and content of the tooltip`},valueFormatter:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: number) => number`,signature:{arguments:[{type:{name:`number`},name:`value`}],return:{name:`number`}}},description:`Gets or Sets the formatter function for the value displayed on the tooltip.`},valueLabel:{required:!1,tsType:{name:`string`},description:`Gets or Sets the valueLabel of the data`},layout:{required:!1,tsType:{name:`union`,raw:`'auto' | 'list' | 'single'`,elements:[{name:`literal`,value:`'auto'`},{name:`literal`,value:`'list'`},{name:`literal`,value:`'single'`}]},description:`Gets or Sets the layout: 'list' (title and one row per topic), 'single' (title,
name and a big value) or 'auto' (the default: by the data point's shape).`},maxEntries:{required:!1,tsType:{name:`number`},description:`Gets or Sets the most rows the tooltip shows; past that, the last row reads "+n more".
0 shows every row. Default 12.`},xAxisValueType:{required:!1,tsType:{name:`union`,raw:`'auto' | 'date' | 'number' | 'category'`,elements:[{name:`literal`,value:`'auto'`},{name:`literal`,value:`'date'`},{name:`literal`,value:`'number'`},{name:`literal`,value:`'category'`}]},description:`Gets or Sets how the key of the data point is shown in the title: 'date', 'number',
'category' (as it is), or 'auto' (the default), which picks one per key.`},chart:{required:!1,tsType:{name:`TooltipWrapperShape`},description:`Internally used, do not overwrite.

@ignore`},render:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(args: TooltipRenderArgs<TData>) => ReactNode`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
    data: TData;
    createTooltip: () => void;
    customMouseMove: (
        dataPoint: object,
        position: [number, number],
        size?: [number, number],
        topicColorMap?: Record<string, string>
    ) => void;
    customMouseOut: () => void;
    customMouseOver: () => void;
}`,signature:{properties:[{key:`data`,value:{name:`TData`,required:!0}},{key:`createTooltip`,value:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}},required:!0}},{key:`customMouseMove`,value:{name:`signature`,type:`function`,raw:`(
    dataPoint: object,
    position: [number, number],
    size?: [number, number],
    topicColorMap?: Record<string, string>
) => void`,signature:{arguments:[{type:{name:`object`},name:`dataPoint`},{type:{name:`tuple`,raw:`[number, number]`,elements:[{name:`number`},{name:`number`}]},name:`position`},{type:{name:`tuple`,raw:`[number, number]`,elements:[{name:`number`},{name:`number`}]},name:`size`},{type:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`},name:`topicColorMap`}],return:{name:`void`}},required:!0}},{key:`customMouseOut`,value:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}},required:!0}},{key:`customMouseOver`,value:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}},required:!0}}]}},name:`args`}],return:{name:`ReactNode`}}},description:`Internally used, do not overwrite.

@ignore`},data:{required:!0,tsType:{name:`TData`},description:`Internally used, do not overwrite.

@ignore`},customMouseMove:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(
    dataPoint: object,
    position: [number, number],
    size?: [number, number],
    topicColorMap?: Record<string, string>
) => void`,signature:{arguments:[{type:{name:`object`},name:`dataPoint`},{type:{name:`tuple`,raw:`[number, number]`,elements:[{name:`number`},{name:`number`}]},name:`position`},{type:{name:`tuple`,raw:`[number, number]`,elements:[{name:`number`},{name:`number`}]},name:`size`},{type:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`},name:`topicColorMap`}],return:{name:`void`}}},description:`Called after the tooltip updates, with what the chart dispatches on
customMouseMove: the data point, its anchor [x, y], the chart's size and,
from the multi-value charts, the topic colours.`},customMouseOut:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Called after the tooltip hides, when the pointer leaves the chart`},customMouseOver:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Called after the tooltip shows, when the pointer enters the chart`}}}})))()}export{p as n,f as t};