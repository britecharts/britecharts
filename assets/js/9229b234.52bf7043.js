"use strict";(self.webpackChunk_britecharts_docs=self.webpackChunk_britecharts_docs||[]).push([[2365],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>s});var l=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,l)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function p(e,t){if(null==e)return{};var a,l,n=function(e,t){if(null==e)return{};var a,l,n={},r=Object.keys(e);for(l=0;l<r.length;l++)a=r[l],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(l=0;l<r.length;l++)a=r[l],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var i=l.createContext({}),d=function(e){var t=l.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},u=function(e){var t=d(e.components);return l.createElement(i.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return l.createElement(l.Fragment,{},t)}},k=l.forwardRef((function(e,t){var a=e.components,n=e.mdxType,r=e.originalType,i=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),k=d(a),s=n,c=k["".concat(i,".").concat(s)]||k[s]||m[s]||r;return a?l.createElement(c,o(o({ref:t},u),{},{components:a})):l.createElement(c,o({ref:t},u))}));function s(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=a.length,o=new Array(r);o[0]=k;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p.mdxType="string"==typeof e?e:n,o[1]=p;for(var d=2;d<r;d++)o[d]=a[d];return l.createElement.apply(null,o)}return l.createElement.apply(null,a)}k.displayName="MDXCreateElement"},4580:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>o,default:()=>m,frontMatter:()=>r,metadata:()=>p,toc:()=>d});var l=a(3117),n=(a(7294),a(3905));const r={},o=void 0,p={unversionedId:"API/sparkline",id:"API/sparkline",title:"sparkline",description:"Sparkline Chart reusable API module that allows us",source:"@site/docs/API/sparkline.md",sourceDirName:"API",slug:"/API/sparkline",permalink:"/britecharts/docs/API/sparkline",draft:!1,editUrl:"https://github.com/britecharts/britecharts/edit/main/website/docs/API/sparkline.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"scatter-plot",permalink:"/britecharts/docs/API/scatter-plot"},next:{title:"stacked-area",permalink:"/britecharts/docs/API/stacked-area"}},i={},d=[{value:"exports(_selection, _data) \u23cf",id:"exports_selection-_data-",level:2},{value:"exports.animationDuration(_x) \u21d2 <code>duration</code> | <code>module</code>",id:"exportsanimationduration_x--duration--module",level:3},{value:"exports.areaGradient(_x) \u21d2 <code>areaGradient</code> | <code>module</code>",id:"exportsareagradient_x--areagradient--module",level:3},{value:"<del>exports.dateLabel(_x) \u21d2 <code>dateLabel</code> | <code>module</code></del>",id:"exportsdatelabel_x--codedatelabelcode--codemodulecode",level:3},{value:"exports.exportChart(filename, title) \u21d2 <code>Promise</code>",id:"exportsexportchartfilename-title--promise",level:3},{value:"exports.height(_x) \u21d2 <code>height</code> | <code>module</code>",id:"exportsheight_x--height--module",level:3},{value:"exports.isAnimated(_x) \u21d2 <code>isAnimated</code> | <code>module</code>",id:"exportsisanimated_x--isanimated--module",level:3},{value:"exports.lineGradient(_x) \u21d2 <code>lineGradient</code> | <code>module</code>",id:"exportslinegradient_x--linegradient--module",level:3},{value:"exports.isLoading(flag) \u21d2 <code>boolean</code> | <code>module</code>",id:"exportsisloadingflag--boolean--module",level:3},{value:"exports.margin(_x) \u21d2 <code>object</code> | <code>module</code>",id:"exportsmargin_x--object--module",level:3},{value:"exports.titleText(_x) \u21d2 <code>string</code> | <code>module</code>",id:"exportstitletext_x--string--module",level:3},{value:"exports.titleTextStyle(_x) \u21d2 <code>Object</code> | <code>module</code>",id:"exportstitletextstyle_x--object--module",level:3},{value:"<del>exports.valueLabel(_x) \u21d2 <code>valueLabel</code> | <code>module</code></del>",id:"exportsvaluelabel_x--codevaluelabelcode--codemodulecode",level:3},{value:"exports.width(_x) \u21d2 <code>width</code> | <code>module</code>",id:"exportswidth_x--width--module",level:3},{value:"exports~SparklineChartData : <code>Array.&lt;Object&gt;</code>",id:"exportssparklinechartdata--arrayobject",level:3}],u={toc:d};function m(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,l.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("a",{name:"module_Sparkline"}),(0,n.kt)("h1",{id:"sparkline"},"Sparkline"),(0,n.kt)("p",null,"Sparkline Chart reusable API module that allows us\nrendering a sparkline configurable chart."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Requires"),": ",(0,n.kt)("code",null,"module:d3-array,"),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Example"),"  "),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-js"},"const sparkLineChart = sparkline();\n\nsparkLineChart\n    .width(200)\n    .height(100);\n\nd3Selection.select('.css-selector')\n    .datum(dataset)\n    .call(sparkLineChart);\n")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Sparkline"},"Sparkline"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#exp_module_Sparkline--exports"},"exports(_selection, _data)")," \u23cf",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("em",{parentName:"li"},"static"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Sparkline--exports.animationDuration"},".animationDuration(_x)")," \u21d2 ",(0,n.kt)("code",null,"duration")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Sparkline--exports.areaGradient"},".areaGradient(_x)")," \u21d2 ",(0,n.kt)("code",null,"areaGradient")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("del",{parentName:"li"},(0,n.kt)("a",{parentName:"del",href:"#module_Sparkline--exports.dateLabel"},".dateLabel(_x)")," \u21d2 ",(0,n.kt)("code",null,"dateLabel")," ","|"," ",(0,n.kt)("code",null,"module"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Sparkline--exports.exportChart"},".exportChart(filename, title)")," \u21d2 ",(0,n.kt)("code",null,"Promise")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Sparkline--exports.height"},".height(_x)")," \u21d2 ",(0,n.kt)("code",null,"height")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Sparkline--exports.isAnimated"},".isAnimated(_x)")," \u21d2 ",(0,n.kt)("code",null,"isAnimated")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Sparkline--exports.lineGradient"},".lineGradient(_x)")," \u21d2 ",(0,n.kt)("code",null,"lineGradient")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Sparkline--exports.isLoading"},".isLoading(flag)")," \u21d2 ",(0,n.kt)("code",null,"boolean")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Sparkline--exports.margin"},".margin(_x)")," \u21d2 ",(0,n.kt)("code",null,"object")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Sparkline--exports.titleText"},".titleText(_x)")," \u21d2 ",(0,n.kt)("code",null,"string")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Sparkline--exports.titleTextStyle"},".titleTextStyle(_x)")," \u21d2 ",(0,n.kt)("code",null,"Object")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("del",{parentName:"li"},(0,n.kt)("a",{parentName:"del",href:"#module_Sparkline--exports.valueLabel"},".valueLabel(_x)")," \u21d2 ",(0,n.kt)("code",null,"valueLabel")," ","|"," ",(0,n.kt)("code",null,"module"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Sparkline--exports.width"},".width(_x)")," \u21d2 ",(0,n.kt)("code",null,"width")," ","|"," ",(0,n.kt)("code",null,"module")))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("em",{parentName:"li"},"inner"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Sparkline--exports..SparklineChartData"},"~SparklineChartData")," : ",(0,n.kt)("code",null,"Array.","<","Object",">"))))))))),(0,n.kt)("a",{name:"exp_module_Sparkline--exports"}),(0,n.kt)("h2",{id:"exports_selection-_data-"},"exports(_selection, _data) \u23cf"),(0,n.kt)("p",null,"This function creates the graph using the selection and data provided"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": Exported function  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_selection"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"D3Selection")),(0,n.kt)("td",{parentName:"tr",align:null},"A d3 selection that represents the container(s) where the chart(s) will be rendered")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_data"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"SparklineChartData")),(0,n.kt)("td",{parentName:"tr",align:null},"The data to attach and generate the chart")))),(0,n.kt)("a",{name:"module_Sparkline--exports.animationDuration"}),(0,n.kt)("h3",{id:"exportsanimationduration_x--duration--module"},"exports.animationDuration(_x) \u21d2 ",(0,n.kt)("code",null,"duration")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("p",null,"Gets or Sets the duration of the animation"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Sparkline--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"duration")," ","|"," ",(0,n.kt)("code",null,"module")," - Current animation duration or Chart module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Default"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"number")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"1200")),(0,n.kt)("td",{parentName:"tr",align:null},"Desired animation duration for the graph")))),(0,n.kt)("a",{name:"module_Sparkline--exports.areaGradient"}),(0,n.kt)("h3",{id:"exportsareagradient_x--areagradient--module"},"exports.areaGradient(_x) \u21d2 ",(0,n.kt)("code",null,"areaGradient")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("p",null,"Gets or Sets the areaGradient of the chart"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Sparkline--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"areaGradient")," ","|"," ",(0,n.kt)("code",null,"module")," - Current areaGradient or Chart module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"Array.","<","string",">")),(0,n.kt)("td",{parentName:"tr",align:null},"= ","['#F5FDFF', '#F6FEFC']","   Desired areaGradient for the graph")))),(0,n.kt)("a",{name:"module_Sparkline--exports.dateLabel"}),(0,n.kt)("h3",{id:"exportsdatelabel_x--codedatelabelcode--codemodulecode"},(0,n.kt)("del",{parentName:"h3"},"exports.dateLabel(_x) \u21d2 ",(0,n.kt)("code",null,"dateLabel")," ","|"," ",(0,n.kt)("code",null,"module"))),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("em",{parentName:"strong"},"Deprecated"))),(0,n.kt)("p",null,"Gets or Sets the dateLabel of the chart"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Sparkline--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"dateLabel")," ","|"," ",(0,n.kt)("code",null,"module")," - Current dateLabel or Chart module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"number")),(0,n.kt)("td",{parentName:"tr",align:null},"Desired dateLabel for the graph")))),(0,n.kt)("a",{name:"module_Sparkline--exports.exportChart"}),(0,n.kt)("h3",{id:"exportsexportchartfilename-title--promise"},"exports.exportChart(filename, title) \u21d2 ",(0,n.kt)("code",null,"Promise")),(0,n.kt)("p",null,"Chart exported to png and a download action is fired"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Sparkline--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"Promise")," - Promise that resolves if the chart image was loaded and downloaded successfully",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"filename"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"string")),(0,n.kt)("td",{parentName:"tr",align:null},"File title for the resulting picture")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"title"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"string")),(0,n.kt)("td",{parentName:"tr",align:null},"Title to add at the top of the exported picture")))),(0,n.kt)("a",{name:"module_Sparkline--exports.height"}),(0,n.kt)("h3",{id:"exportsheight_x--height--module"},"exports.height(_x) \u21d2 ",(0,n.kt)("code",null,"height")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("p",null,"Gets or Sets the height of the chart"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Sparkline--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"height")," ","|"," ",(0,n.kt)("code",null,"module")," - Current height or Chart module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Default"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"number")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"30")),(0,n.kt)("td",{parentName:"tr",align:null},"Desired height for the graph")))),(0,n.kt)("a",{name:"module_Sparkline--exports.isAnimated"}),(0,n.kt)("h3",{id:"exportsisanimated_x--isanimated--module"},"exports.isAnimated(_x) \u21d2 ",(0,n.kt)("code",null,"isAnimated")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("p",null,"Gets or Sets the isAnimated property of the chart, making it to animate when render.\nBy default this is 'false'"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Sparkline--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"isAnimated")," ","|"," ",(0,n.kt)("code",null,"module")," - Current isAnimated flag or Chart module",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Default"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"boolean")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"false")),(0,n.kt)("td",{parentName:"tr",align:null},"Desired animation flag")))),(0,n.kt)("a",{name:"module_Sparkline--exports.lineGradient"}),(0,n.kt)("h3",{id:"exportslinegradient_x--linegradient--module"},"exports.lineGradient(_x) \u21d2 ",(0,n.kt)("code",null,"lineGradient")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("p",null,"Gets or Sets the lineGradient of the chart"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Sparkline--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"lineGradient")," ","|"," ",(0,n.kt)("code",null,"module")," - Current lineGradient or Chart module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"Array.","<","string",">")),(0,n.kt)("td",{parentName:"tr",align:null},"= colorHelper.colorGradients.greenBlue     Desired lineGradient for the graph")))),(0,n.kt)("a",{name:"module_Sparkline--exports.isLoading"}),(0,n.kt)("h3",{id:"exportsisloadingflag--boolean--module"},"exports.isLoading(flag) \u21d2 ",(0,n.kt)("code",null,"boolean")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("p",null,"Gets or Sets the loading state of the chart"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Sparkline--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"boolean")," ","|"," ",(0,n.kt)("code",null,"module")," - Current loading state flag or Chart module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"flag"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"boolean")),(0,n.kt)("td",{parentName:"tr",align:null},"Desired value for the loading state")))),(0,n.kt)("a",{name:"module_Sparkline--exports.margin"}),(0,n.kt)("h3",{id:"exportsmargin_x--object--module"},"exports.margin(_x) \u21d2 ",(0,n.kt)("code",null,"object")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("p",null,"Gets or Sets the margin of the chart"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Sparkline--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"object")," ","|"," ",(0,n.kt)("code",null,"module")," - Current margin or Chart module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"object")),(0,n.kt)("td",{parentName:"tr",align:null},"Margin object to get/set")))),(0,n.kt)("a",{name:"module_Sparkline--exports.titleText"}),(0,n.kt)("h3",{id:"exportstitletext_x--string--module"},"exports.titleText(_x) \u21d2 ",(0,n.kt)("code",null,"string")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("p",null,"Gets or Sets the text of the title at the top of sparkline.\nTo style the title, use the titleTextStyle method below."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Sparkline--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"string")," ","|"," ",(0,n.kt)("code",null,"module")," - Current titleText or Chart module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"string")),(0,n.kt)("td",{parentName:"tr",align:null},"= null   String to set")))),(0,n.kt)("a",{name:"module_Sparkline--exports.titleTextStyle"}),(0,n.kt)("h3",{id:"exportstitletextstyle_x--object--module"},"exports.titleTextStyle(_x) \u21d2 ",(0,n.kt)("code",null,"Object")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("p",null,"Gets or Sets the text style object of the title at the top of sparkline.\nUsing this method, you can set font-family, font-size, font-weight, font-style,\nand color (fill). The default text font settings:"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Sparkline--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"Object")," ","|"," ",(0,n.kt)("code",null,"module")," - Current titleTextStyle or Chart module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"object")),(0,n.kt)("td",{parentName:"tr",align:null},"Object with text font configurations")))),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Example"),"  "),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-js"},"<pre>\n<code>\n{\n   'font-family': 'sans-serif',\n   'font-size': '22px',\n   'font-weight': 0,\n   'font-style': 'normal',\n   'fill': linearGradient[0]\n}\n</code>\n</pre>\n\nYou can set attributes individually. Setting just 'font-family'\nwithin the object will set custom 'font-family` while the rest\nof the attributes will have the default values provided above.\n")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Example"),"  "),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-js"},"sparkline.titleTextStyle({\n   'font-family': 'Roboto',\n   'font-size': '1.5em',\n   'font-weight': 600,\n   'font-style': 'italic',\n   'fill': 'lightblue'\n})\n")),(0,n.kt)("a",{name:"module_Sparkline--exports.valueLabel"}),(0,n.kt)("h3",{id:"exportsvaluelabel_x--codevaluelabelcode--codemodulecode"},(0,n.kt)("del",{parentName:"h3"},"exports.valueLabel(_x) \u21d2 ",(0,n.kt)("code",null,"valueLabel")," ","|"," ",(0,n.kt)("code",null,"module"))),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("em",{parentName:"strong"},"Deprecated"))),(0,n.kt)("p",null,"Gets or Sets the valueLabel of the chart"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Sparkline--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"valueLabel")," ","|"," ",(0,n.kt)("code",null,"module")," - Current valueLabel or Chart module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"number")),(0,n.kt)("td",{parentName:"tr",align:null},"Desired valueLabel for the graph")))),(0,n.kt)("a",{name:"module_Sparkline--exports.width"}),(0,n.kt)("h3",{id:"exportswidth_x--width--module"},"exports.width(_x) \u21d2 ",(0,n.kt)("code",null,"width")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("p",null,"Gets or Sets the width of the chart"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Sparkline--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"width")," ","|"," ",(0,n.kt)("code",null,"module")," - Current width or Chart module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Default"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"number")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"100")),(0,n.kt)("td",{parentName:"tr",align:null},"Desired width for the graph")))),(0,n.kt)("a",{name:"module_Sparkline--exports..SparklineChartData"}),(0,n.kt)("h3",{id:"exportssparklinechartdata--arrayobject"},"exports~SparklineChartData : ",(0,n.kt)("code",null,"Array.","<","Object",">")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": inner typedef of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Sparkline--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Properties")),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Name"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"value"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"number")),(0,n.kt)("td",{parentName:"tr",align:null},"Value of the group (required)")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"name"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"string")),(0,n.kt)("td",{parentName:"tr",align:null},"Name of the group (required)")))),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Example"),"  "),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-js"},"[\n    {\n        value: 1,\n        date: '2011-01-06T00:00:00Z'\n    },\n    {\n        value: 2,\n        date: '2011-01-07T00:00:00Z'\n    }\n]\n")))}m.isMDXComponent=!0}}]);