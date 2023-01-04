"use strict";(self.webpackChunk_britecharts_docs=self.webpackChunk_britecharts_docs||[]).push([[5046],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>d});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),h=l(r),d=a,m=h["".concat(c,".").concat(d)]||h[d]||u[d]||i;return r?n.createElement(m,o(o({ref:t},p),{},{components:r})):n.createElement(m,o({ref:t},p))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=h;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var l=2;l<i;l++)o[l]=r[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}h.displayName="MDXCreateElement"},8248:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var n=r(3117),a=(r(7294),r(3905));const i={sidebar_position:6},o="The Reusable Chart API",s={unversionedId:"topics/reusable-api",id:"topics/reusable-api",title:"The Reusable Chart API",description:"The Reusable Chart API is a modular structure to create and reuse D3.js components. We saw the first example of this pattern in Mike Bostock\u2019s seminal post Towards Reusable Charts (2012).",source:"@site/docs/topics/reusable-api.md",sourceDirName:"topics",slug:"/topics/reusable-api",permalink:"/britecharts/docs/topics/reusable-api",draft:!1,editUrl:"https://github.com/britecharts/britecharts/edit/main/website/docs/topics/reusable-api.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"tutorialSidebar",previous:{title:"The Build System",permalink:"/britecharts/docs/topics/build-system"},next:{title:"Issue and Feature Labelling",permalink:"/britecharts/docs/topics/github-labels"}},c={},l=[],p={toc:l};function u(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"the-reusable-chart-api"},"The Reusable Chart API"),(0,a.kt)("p",null,"The Reusable Chart API is a modular structure to create and reuse D3.js components. We saw the first example of this pattern in Mike Bostock\u2019s seminal post ",(0,a.kt)("a",{parentName:"p",href:"http://bost.ocks.org/mike/chart/"},"Towards Reusable Charts (2012)"),"."),(0,a.kt)("p",null,"We built Britecharts using this design pattern, so that all our components benefit from its characteristics. They are all ",(0,a.kt)("em",{parentName:"p"},"simple, modular, reusable, composable, and testable"),"."),(0,a.kt)("p",null,"The pattern is based in a closure that allows us to keep properties private and define the elements of the components' API. Take a look at the code:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"/**\n * This function creates the graph using the selection as container\n * @param {D3Selection} _selection A d3 selection that represents\n * the container(s) where the chart(s) will be rendered\n */\nfunction exports(_selection) {\n    /* @param {object} _data The data to attach and generate the chart */\n    _selection.each(function (_data) {\n        chartWidth = width - margin.left - margin.right;\n        chartHeight = height - margin.top - margin.bottom;\n        data = _data;\n\n        buildScales();\n        buildAxis();\n        buildSVG(this);\n        buildContainerGroups();\n        drawBars();\n        drawAxis();\n    });\n}\n\n/**\n * Gets or Sets the margin of the chart\n * @param {object} _x            Margin object to get/set\n * @return { margin | module}    Current margin or Bar Chart module to chain calls\n * @public\n */\nexports.margin = function (_x) {\n    if (!arguments.length) {\n        return margin;\n    }\n    margin = _x;\n    return this;\n};\n\nreturn exports;\n")),(0,a.kt)("p",null,"This piece of code returns a function that accepts a D3.js selection as input. Then, it extracts the data of that selection to build a chart, using the selection as the container. It also accepts some configuration (the margin, in this case) that we can set beforehand."),(0,a.kt)("p",null,"To learn more about this pattern you can read ",(0,a.kt)("a",{parentName:"p",href:"https://www.eventbrite.com/engineering/leveling-up-d3-the-reusable-chart-api/"},"this blog post")," on Eventbrite's Engineering Blog."))}u.isMDXComponent=!0}}]);