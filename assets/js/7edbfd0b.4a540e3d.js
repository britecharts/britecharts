"use strict";(self.webpackChunk_britecharts_docs=self.webpackChunk_britecharts_docs||[]).push([[607],{3905:(e,t,r)=>{r.d(t,{Zo:()=>h,kt:()=>p});var o=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function n(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,o,i=function(e,t){if(null==e)return{};var r,o,i={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=o.createContext({}),c=function(e){var t=o.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):n(n({},t),e)),r},h=function(e){var t=c(e.components);return o.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,h=s(e,["components","mdxType","originalType","parentName"]),m=c(r),p=i,d=m["".concat(l,".").concat(p)]||m[p]||u[p]||a;return r?o.createElement(d,n(n({ref:t},h),{},{components:r})):o.createElement(d,n({ref:t},h))}));function p(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,n=new Array(a);n[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,n[1]=s;for(var c=2;c<a;c++)n[c]=r[c];return o.createElement.apply(null,n)}return o.createElement.apply(null,r)}m.displayName="MDXCreateElement"},2942:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>n,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var o=r(3117),i=(r(7294),r(3905));const a={sidebar_position:2},n="User How-To Guides",s={unversionedId:"how-tos/user-how-to-guides",id:"how-tos/user-how-to-guides",title:"User How-To Guides",description:"Our how-to guides are recipes to address specific and critical use cases when working with Britecharts. They assume some knowledge about Britecharts and the library structure. If this is the first time you work with Britecharts, we recommend you to read the Getting Started Tutorial first.",source:"@site/docs/how-tos/user-how-to-guides.md",sourceDirName:"how-tos",slug:"/how-tos/user-how-to-guides",permalink:"/britecharts/docs/how-tos/user-how-to-guides",draft:!1,editUrl:"https://github.com/britecharts/britecharts/edit/main/website/docs/how-tos/user-how-to-guides.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"How-To Guides",permalink:"/britecharts/docs/how-tos/how-to-index"},next:{title:"Contributor How To Guides",permalink:"/britecharts/docs/how-tos/contributor-how-to-guides"}},l={},c=[{value:"How to Customize the Chart&#39;s Colors",id:"how-to-customize-the-charts-colors",level:2},{value:"How to Configure Time Scales",id:"how-to-configure-time-scales",level:2}],h={toc:c};function u(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,o.Z)({},h,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"user-how-to-guides"},"User How-To Guides"),(0,i.kt)("p",null,"Our how-to guides are recipes to address specific and critical use cases when working with Britecharts. They assume some knowledge about Britecharts and the library structure. If this is the first time you work with Britecharts, we recommend you to read the ",(0,i.kt)("a",{parentName:"p",href:"http://britecharts.github.io/britecharts/getting-started.html"},"Getting Started Tutorial")," first."),(0,i.kt)("h2",{id:"how-to-customize-the-charts-colors"},"How to Customize the Chart's Colors"),(0,i.kt)("p",null,"Follow these steps to customize Britecharts' charts to use different color schemas:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Find out if your chart supports the ",(0,i.kt)("inlineCode",{parentName:"li"},".colorSchema()")," configuration, if so, keep on reading"),(0,i.kt)("li",{parentName:"ol"},"Check the ",(0,i.kt)("a",{parentName:"li",href:"**"},"Color Palettes demo page")," and find a palette you like"),(0,i.kt)("li",{parentName:"ol"},"Import the ",(0,i.kt)("inlineCode",{parentName:"li"},"colors")," helper at the top of your file"),(0,i.kt)("li",{parentName:"ol"},"Set the color palette with ",(0,i.kt)("inlineCode",{parentName:"li"},".colorSchema(colors.colorSchemas.orange)")," or with any other color schema"),(0,i.kt)("li",{parentName:"ol"},"Draw the chart")),(0,i.kt)("p",null,"Note that in some charts we can only configure a gradient. Use the ",(0,i.kt)("inlineCode",{parentName:"p"},"colorGradients")," object instead of ",(0,i.kt)("inlineCode",{parentName:"p"},"colorSchemas")," within the colors helper. You can explore other options in the source code of the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/Golodhros/britecharts/blob/main/packages/core/src/charts/helpers/color.js"},"colors file"),"."),(0,i.kt)("h2",{id:"how-to-configure-time-scales"},"How to Configure Time Scales"),(0,i.kt)("p",null,"Britecharts has some logic to try guessing the best date format on time series charts from the time period of the dataset. As we haven't bulletproofed this algorithm, and sometimes users want specific formats, we also expose configuration options to set custom formats."),(0,i.kt)("p",null,"The next steps apply to time series charts like the line chart, stacked area chart and brush chart:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Render the chart using the default settings, see if the x-axis format is satisfactory. If not, keep on reading."),(0,i.kt)("li",{parentName:"ol"},"Check the chart's reference to find out the configuration options, for example, the ",(0,i.kt)("a",{parentName:"li",href:"/docs/API/line"},"line chart reference")),(0,i.kt)("li",{parentName:"ol"},"Check the options within the ",(0,i.kt)("inlineCode",{parentName:"li"},"axisTimeCombinations")," object of the chart instance:")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"console.log('combinations', line.axisTimeCombinations);\n// Returns\n{\n    MINUTE_HOUR: 'minute-hour',\n    HOUR_DAY: 'hour-daymonth',\n    DAY_MONTH: 'day-month',\n    MONTH_YEAR: 'month-year',\n    CUSTOM: 'custom'\n}\n")),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Set the ",(0,i.kt)("inlineCode",{parentName:"li"},"xAxisFormat")," parameter to a value from the ones below (except 'custom')"),(0,i.kt)("li",{parentName:"ol"},"Draw the chart and see if it meets your criteria. If not, try with other time combination. If still doesn't feel right, see next step."),(0,i.kt)("li",{parentName:"ol"},"Set the ",(0,i.kt)("inlineCode",{parentName:"li"},"xAxisFormat")," parameter to the value ",(0,i.kt)("inlineCode",{parentName:"li"},"'custom'")),(0,i.kt)("li",{parentName:"ol"},"Set the ",(0,i.kt)("inlineCode",{parentName:"li"},"xAxisCustomFormat")," parameter to a valid ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/d3/d3-time-format#locale_format"},"D3.js time format specifier string"),". For example: ",(0,i.kt)("inlineCode",{parentName:"li"},"line.xAxisCustomFormat('%H')")),(0,i.kt)("li",{parentName:"ol"},"Play around with different specifiers until finding something that works. You can experiment in ",(0,i.kt)("a",{parentName:"li",href:"https://bl.ocks.org/zanarmstrong/ca0adb7e426c12c06a95"},"this block example"),".")),(0,i.kt)("p",null,"Remember that for increased accuracy, all date formats in Britecharts should be provided in ",(0,i.kt)("a",{parentName:"p",href:"http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15"},"ISO 8601 Extended Format"),"."))}u.isMDXComponent=!0}}]);