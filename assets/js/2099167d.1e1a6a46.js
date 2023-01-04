"use strict";(self.webpackChunk_britecharts_docs=self.webpackChunk_britecharts_docs||[]).push([[263],{3905:(t,e,a)=>{a.d(e,{Zo:()=>u,kt:()=>k});var l=a(7294);function n(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function o(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);e&&(l=l.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,l)}return a}function r(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?o(Object(a),!0).forEach((function(e){n(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function p(t,e){if(null==t)return{};var a,l,n=function(t,e){if(null==t)return{};var a,l,n={},o=Object.keys(t);for(l=0;l<o.length;l++)a=o[l],e.indexOf(a)>=0||(n[a]=t[a]);return n}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(l=0;l<o.length;l++)a=o[l],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(n[a]=t[a])}return n}var d=l.createContext({}),i=function(t){var e=l.useContext(d),a=e;return t&&(a="function"==typeof t?t(e):r(r({},e),t)),a},u=function(t){var e=i(t.components);return l.createElement(d.Provider,{value:e},t.children)},m={inlineCode:"code",wrapper:function(t){var e=t.children;return l.createElement(l.Fragment,{},e)}},s=l.forwardRef((function(t,e){var a=t.components,n=t.mdxType,o=t.originalType,d=t.parentName,u=p(t,["components","mdxType","originalType","parentName"]),s=i(a),k=n,c=s["".concat(d,".").concat(k)]||s[k]||m[k]||o;return a?l.createElement(c,r(r({ref:e},u),{},{components:a})):l.createElement(c,r({ref:e},u))}));function k(t,e){var a=arguments,n=e&&e.mdxType;if("string"==typeof t||n){var o=a.length,r=new Array(o);r[0]=s;var p={};for(var d in e)hasOwnProperty.call(e,d)&&(p[d]=e[d]);p.originalType=t,p.mdxType="string"==typeof t?t:n,r[1]=p;for(var i=2;i<o;i++)r[i]=a[i];return l.createElement.apply(null,r)}return l.createElement.apply(null,a)}s.displayName="MDXCreateElement"},3757:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>d,contentTitle:()=>r,default:()=>m,frontMatter:()=>o,metadata:()=>p,toc:()=>i});var l=a(3117),n=(a(7294),a(3905));const o={},r=void 0,p={unversionedId:"API/tooltip",id:"API/tooltip",title:"tooltip",description:"Tooltip Component reusable API class that renders a",source:"@site/docs/API/tooltip.md",sourceDirName:"API",slug:"/API/tooltip",permalink:"/docs/API/tooltip",draft:!1,editUrl:"https://github.com/britecharts/britecharts/edit/main/website/docs/API/tooltip.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"step",permalink:"/docs/API/step"},next:{title:"How-To Guides",permalink:"/docs/how-tos/how-to-index"}},d={},i=[{value:"exports(_selection, _data) \u23cf",id:"exports_selection-_data-",level:2},{value:"exports.axisTimeCombinations",id:"exportsaxistimecombinations",level:3},{value:"exports.dateFormat(_x) \u21d2 <code>String</code> | <code>module</code>",id:"exportsdateformat_x--string--module",level:3},{value:"exports.dateCustomFormat(_x) \u21d2 <code>String</code> | <code>module</code>",id:"exportsdatecustomformat_x--string--module",level:3},{value:"<del>exports.dateLabel(_x) \u21d2 <code>String</code> | <code>module</code></del>",id:"exportsdatelabel_x--codestringcode--codemodulecode",level:3},{value:"exports.hide() \u21d2 <code>module</code>",id:"exportshide--module",level:3},{value:"exports.locale(_x) \u21d2 <code>String</code> | <code>module</code>",id:"exportslocale_x--string--module",level:3},{value:"<del>exports.nameLabel(_x) \u21d2 <code>String</code> | <code>module</code></del>",id:"exportsnamelabel_x--codestringcode--codemodulecode",level:3},{value:"exports.numberFormat(_x) \u21d2 <code>string</code> | <code>module</code>",id:"exportsnumberformat_x--string--module",level:3},{value:"exports.valueFormatter(_x) \u21d2 <code>function</code> | <code>module</code>",id:"exportsvalueformatter_x--function--module",level:3},{value:"exports.shouldShowDateInTitle(_x) \u21d2 <code>Boolean</code> | <code>module</code>",id:"exportsshouldshowdateintitle_x--boolean--module",level:3},{value:"exports.show() \u21d2 <code>module</code>",id:"exportsshow--module",level:3},{value:"exports.title(_x) \u21d2 <code>String</code> | <code>module</code>",id:"exportstitle_x--string--module",level:3},{value:"exports.tooltipOffset(tooltipOffset) \u21d2 <code>Object</code> | <code>module</code>",id:"exportstooltipoffsettooltipoffset--object--module",level:3},{value:"exports.topicsOrder(_x) \u21d2 <code>Array.&lt;String&gt;</code> | <code>module</code>",id:"exportstopicsorder_x--arraystring--module",level:3},{value:"<del>exports.topicLabel(_x) \u21d2 <code>String</code> | <code>module</code></del>",id:"exportstopiclabel_x--codestringcode--codemodulecode",level:3},{value:"exports.update(dataPoint, colorMapping, position) \u21d2 <code>Module</code>",id:"exportsupdatedatapoint-colormapping-position--module",level:3},{value:"<del>exports.valueLabel(_x) \u21d2 <code>String</code> | <code>module</code></del>",id:"exportsvaluelabel_x--codestringcode--codemodulecode",level:3},{value:"exports.xAxisValueType(_x) \u21d2 <code>String</code> | <code>module</code>",id:"exportsxaxisvaluetype_x--string--module",level:3}],u={toc:i};function m(t){let{components:e,...a}=t;return(0,n.kt)("wrapper",(0,l.Z)({},u,a,{components:e,mdxType:"MDXLayout"}),(0,n.kt)("a",{name:"module_Tooltip"}),(0,n.kt)("h1",{id:"tooltip"},"Tooltip"),(0,n.kt)("p",null,"Tooltip Component reusable API class that renders a\nsimple and configurable tooltip element for Britechart's\nline chart or stacked area chart."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Requires"),": ",(0,n.kt)("code",null,"module:d3-array,"),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Example"),"  "),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-js"},"const lineChart = line(),\n    tooltip = tooltip();\n\ntooltip\n    .title('Tooltip title');\n\nlineChart\n    .width(500)\n    .on('customMouseOver', function() {\n         tooltip.show();\n    })\n    .on('customMouseMove', function(dataPoint, topicColorMap, dataPointXPosition) {\n         tooltip.update(dataPoint, topicColorMap, dataPointXPosition);\n    })\n    .on('customMouseOut', function() {\n         tooltip.hide();\n    });\n\nd3Selection.select('.css-selector')\n    .datum(dataset)\n    .call(lineChart);\n\nd3Selection.select('.metadata-group .hover-marker')\n    .datum([])\n    .call(tooltip);\n")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Tooltip"},"Tooltip"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#exp_module_Tooltip--exports"},"exports(_selection, _data)")," \u23cf",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Tooltip--exports.axisTimeCombinations"},".axisTimeCombinations")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Tooltip--exports.dateFormat"},".dateFormat(_x)")," \u21d2 ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Tooltip--exports.dateCustomFormat"},".dateCustomFormat(_x)")," \u21d2 ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("del",{parentName:"li"},(0,n.kt)("a",{parentName:"del",href:"#module_Tooltip--exports.dateLabel"},".dateLabel(_x)")," \u21d2 ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Tooltip--exports.hide"},".hide()")," \u21d2 ",(0,n.kt)("code",null,"module")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Tooltip--exports.locale"},".locale(_x)")," \u21d2 ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("del",{parentName:"li"},(0,n.kt)("a",{parentName:"del",href:"#module_Tooltip--exports.nameLabel"},".nameLabel(_x)")," \u21d2 ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Tooltip--exports.numberFormat"},".numberFormat(_x)")," \u21d2 ",(0,n.kt)("code",null,"string")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Tooltip--exports.valueFormatter"},".valueFormatter(_x)")," \u21d2 ",(0,n.kt)("code",null,"function")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Tooltip--exports.shouldShowDateInTitle"},".shouldShowDateInTitle(_x)")," \u21d2 ",(0,n.kt)("code",null,"Boolean")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Tooltip--exports.show"},".show()")," \u21d2 ",(0,n.kt)("code",null,"module")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Tooltip--exports.title"},".title(_x)")," \u21d2 ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Tooltip--exports.tooltipOffset"},".tooltipOffset(tooltipOffset)")," \u21d2 ",(0,n.kt)("code",null,"Object")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Tooltip--exports.topicsOrder"},".topicsOrder(_x)")," \u21d2 ",(0,n.kt)("code",null,"Array.","<","String",">")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("del",{parentName:"li"},(0,n.kt)("a",{parentName:"del",href:"#module_Tooltip--exports.topicLabel"},".topicLabel(_x)")," \u21d2 ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Tooltip--exports.update"},".update(dataPoint, colorMapping, position)")," \u21d2 ",(0,n.kt)("code",null,"Module")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("del",{parentName:"li"},(0,n.kt)("a",{parentName:"del",href:"#module_Tooltip--exports.valueLabel"},".valueLabel(_x)")," \u21d2 ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#module_Tooltip--exports.xAxisValueType"},".xAxisValueType([_x])")," \u21d2 ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module"))))))),(0,n.kt)("a",{name:"exp_module_Tooltip--exports"}),(0,n.kt)("h2",{id:"exports_selection-_data-"},"exports(_selection, _data) \u23cf"),(0,n.kt)("p",null,"This function creates the graph using the selection as container"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": Exported function  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_selection"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"D3Selection")),(0,n.kt)("td",{parentName:"tr",align:null},"A d3 selection that represents                                  the container(s) where the chart(s) will be rendered")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_data"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"Object")),(0,n.kt)("td",{parentName:"tr",align:null},"The data to attach and generate the chart")))),(0,n.kt)("a",{name:"module_Tooltip--exports.axisTimeCombinations"}),(0,n.kt)("h3",{id:"exportsaxistimecombinations"},"exports.axisTimeCombinations"),(0,n.kt)("p",null,"constants to be used to force the x axis to respect a certain granularity\ncurrent options: HOUR_DAY, DAY_MONTH, MONTH_YEAR"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static property of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Tooltip--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Example"),"  "),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-js"},"tooltip.dateFormat(tooltip.axisTimeCombinations.HOUR_DAY)\n")),(0,n.kt)("a",{name:"module_Tooltip--exports.dateFormat"}),(0,n.kt)("h3",{id:"exportsdateformat_x--string--module"},"exports.dateFormat(_x) \u21d2 ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("p",null,"Exposes the ability to force the tooltip to use a certain date format"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Tooltip--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module")," - Current format or module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"String")),(0,n.kt)("td",{parentName:"tr",align:null},"Desired format")))),(0,n.kt)("a",{name:"module_Tooltip--exports.dateCustomFormat"}),(0,n.kt)("h3",{id:"exportsdatecustomformat_x--string--module"},"exports.dateCustomFormat(_x) \u21d2 ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("p",null,"Exposes the ability to use a custom date format"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Tooltip--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module")," - Current format or module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"String")),(0,n.kt)("td",{parentName:"tr",align:null},"Desired custom format")))),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Example"),"  "),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-js"},"tooltip.dateFormat(tooltip.axisTimeCombinations.CUSTOM);\ntooltip.dateCustomFormat('%H:%M %p')\n")),(0,n.kt)("a",{name:"module_Tooltip--exports.dateLabel"}),(0,n.kt)("h3",{id:"exportsdatelabel_x--codestringcode--codemodulecode"},(0,n.kt)("del",{parentName:"h3"},"exports.dateLabel(_x) \u21d2 ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module"))),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("em",{parentName:"strong"},"Deprecated"))),(0,n.kt)("p",null,"Gets or Sets the dateLabel of the data"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Tooltip--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module")," - Current dateLabel or Chart module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"String")),(0,n.kt)("td",{parentName:"tr",align:null},"Desired dateLabel")))),(0,n.kt)("a",{name:"module_Tooltip--exports.hide"}),(0,n.kt)("h3",{id:"exportshide--module"},"exports.hide() \u21d2 ",(0,n.kt)("code",null,"module")),(0,n.kt)("p",null,"Hides the tooltip"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Tooltip--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"module")," - Tooltip module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("a",{name:"module_Tooltip--exports.locale"}),(0,n.kt)("h3",{id:"exportslocale_x--string--module"},"exports.locale(_x) \u21d2 ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("p",null,"Pass locale for the tooltip to render the date in"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Tooltip--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module")," - Current locale or module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"String")),(0,n.kt)("td",{parentName:"tr",align:null},"Must be a locale tag like 'en-US' or 'fr-FR'")))),(0,n.kt)("a",{name:"module_Tooltip--exports.nameLabel"}),(0,n.kt)("h3",{id:"exportsnamelabel_x--codestringcode--codemodulecode"},(0,n.kt)("del",{parentName:"h3"},"exports.nameLabel(_x) \u21d2 ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module"))),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("em",{parentName:"strong"},"Deprecated"))),(0,n.kt)("p",null,"Gets or Sets the nameLabel of the data"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Tooltip--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module")," - Current nameLabel or Chart module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"String")),(0,n.kt)("td",{parentName:"tr",align:null},"Desired nameLabel")))),(0,n.kt)("a",{name:"module_Tooltip--exports.numberFormat"}),(0,n.kt)("h3",{id:"exportsnumberformat_x--string--module"},"exports.numberFormat(_x) \u21d2 ",(0,n.kt)("code",null,"string")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("p",null,"Gets or Sets the number format for the value displayed on the tooltip"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Tooltip--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"string")," ","|"," ",(0,n.kt)("code",null,"module")," - Current numberFormat or Chart module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"string")),(0,n.kt)("td",{parentName:"tr",align:null},"Desired numberFormat for the chart. See examples ",(0,n.kt)("a",{parentName:"td",href:"https://observablehq.com/@d3/d3-format"},"here"))))),(0,n.kt)("a",{name:"module_Tooltip--exports.valueFormatter"}),(0,n.kt)("h3",{id:"exportsvalueformatter_x--function--module"},"exports.valueFormatter(_x) \u21d2 ",(0,n.kt)("code",null,"function")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("p",null,"Gets or Sets the formatter function for the value displayed on the tooltip.\nSetting this property makes the tooltip ignore numberFormat."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Tooltip--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"function")," ","|"," ",(0,n.kt)("code",null,"module")," - Current valueFormatter or Chart module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"function")),(0,n.kt)("td",{parentName:"tr",align:null},"Desired formatter function")))),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Example"),"  "),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-js"},"tooltipChart.valueFormatter(value => value.toString().length.toString())\n")),(0,n.kt)("a",{name:"module_Tooltip--exports.shouldShowDateInTitle"}),(0,n.kt)("h3",{id:"exportsshouldshowdateintitle_x--boolean--module"},"exports.shouldShowDateInTitle(_x) \u21d2 ",(0,n.kt)("code",null,"Boolean")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("p",null,"Gets or Sets shouldShowDateInTitle"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Tooltip--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"Boolean")," ","|"," ",(0,n.kt)("code",null,"module")," - Current shouldShowDateInTitle or Chart module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"Boolean")),(0,n.kt)("td",{parentName:"tr",align:null},"Desired value")))),(0,n.kt)("a",{name:"module_Tooltip--exports.show"}),(0,n.kt)("h3",{id:"exportsshow--module"},"exports.show() \u21d2 ",(0,n.kt)("code",null,"module")),(0,n.kt)("p",null,"Shows the tooltip"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Tooltip--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"module")," - Tooltip module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("a",{name:"module_Tooltip--exports.title"}),(0,n.kt)("h3",{id:"exportstitle_x--string--module"},"exports.title(_x) \u21d2 ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("p",null,"Gets or Sets the title of the tooltip (to only show the date, set a blank title)"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Tooltip--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module")," - Current title or module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"String")),(0,n.kt)("td",{parentName:"tr",align:null},"Desired title")))),(0,n.kt)("a",{name:"module_Tooltip--exports.tooltipOffset"}),(0,n.kt)("h3",{id:"exportstooltipoffsettooltipoffset--object--module"},"exports.tooltipOffset(tooltipOffset) \u21d2 ",(0,n.kt)("code",null,"Object")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("p",null,"Pass an override for the offset of your tooltip"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Tooltip--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"Object")," ","|"," ",(0,n.kt)("code",null,"module")," - Current tooltipOffset",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"tooltipOffset"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"Object")),(0,n.kt)("td",{parentName:"tr",align:null},"Object representing the X and Y offsets")))),(0,n.kt)("a",{name:"module_Tooltip--exports.topicsOrder"}),(0,n.kt)("h3",{id:"exportstopicsorder_x--arraystring--module"},"exports.topicsOrder(_x) \u21d2 ",(0,n.kt)("code",null,"Array.","<","String",">")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("p",null,"Pass an override for the ordering of your tooltip"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Tooltip--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"Array.","<","String",">")," ","|"," ",(0,n.kt)("code",null,"module")," - Current overrideOrder or Chart module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"Array.","<","String",">")),(0,n.kt)("td",{parentName:"tr",align:null},"Array of the names of your tooltip items")))),(0,n.kt)("a",{name:"module_Tooltip--exports.topicLabel"}),(0,n.kt)("h3",{id:"exportstopiclabel_x--codestringcode--codemodulecode"},(0,n.kt)("del",{parentName:"h3"},"exports.topicLabel(_x) \u21d2 ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module"))),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("em",{parentName:"strong"},"Deprecated"))),(0,n.kt)("p",null,"Gets or Sets the topicLabel of the data"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Tooltip--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module")," - Current topicLabel or Chart module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"String")),(0,n.kt)("td",{parentName:"tr",align:null},"Desired topicLabel")))),(0,n.kt)("a",{name:"module_Tooltip--exports.update"}),(0,n.kt)("h3",{id:"exportsupdatedatapoint-colormapping-position--module"},"exports.update(dataPoint, colorMapping, position) \u21d2 ",(0,n.kt)("code",null,"Module")),(0,n.kt)("p",null,"Updates the position and content of the tooltip"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Tooltip--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"Module")," - Tooltip module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"dataPoint"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"Object")),(0,n.kt)("td",{parentName:"tr",align:null},"Datapoint to represent")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"colorMapping"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"Object")),(0,n.kt)("td",{parentName:"tr",align:null},"Color scheme of the topics")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"position"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"Number")),(0,n.kt)("td",{parentName:"tr",align:null},"X-scale position in pixels")))),(0,n.kt)("a",{name:"module_Tooltip--exports.valueLabel"}),(0,n.kt)("h3",{id:"exportsvaluelabel_x--codestringcode--codemodulecode"},(0,n.kt)("del",{parentName:"h3"},"exports.valueLabel(_x) \u21d2 ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module"))),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("em",{parentName:"strong"},"Deprecated"))),(0,n.kt)("p",null,"Gets or Sets the valueLabel of the data"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Tooltip--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module")," - Current valueLabel or Chart module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"_x"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"String")),(0,n.kt)("td",{parentName:"tr",align:null},"Desired valueLabel")))),(0,n.kt)("a",{name:"module_Tooltip--exports.xAxisValueType"}),(0,n.kt)("h3",{id:"exportsxaxisvaluetype_x--string--module"},"exports.xAxisValueType(","[_x]",") \u21d2 ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module")),(0,n.kt)("p",null,"Gets or Sets the ",(0,n.kt)("inlineCode",{parentName:"p"},"xAxisValueType")," of the data. Choose between 'date' and 'number'. When set to\nnumber, the x-Axis values won't be parsed as dates anymore, but as numbers."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Kind"),": static method of ",(0,n.kt)("a",{parentName:"p",href:"#exp_module_Tooltip--exports"},(0,n.kt)("code",null,"exports")),(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Returns"),": ",(0,n.kt)("code",null,"String")," ","|"," ",(0,n.kt)("code",null,"module")," - Current keyType or Chart module to chain calls",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("strong",{parentName:"p"},"Access"),": public  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Default"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"[_x]"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"String")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"'","date","'")),(0,n.kt)("td",{parentName:"tr",align:null},"Desired keyType")))))}m.isMDXComponent=!0}}]);