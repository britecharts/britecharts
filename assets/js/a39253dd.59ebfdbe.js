"use strict";(self.webpackChunk_britecharts_docs=self.webpackChunk_britecharts_docs||[]).push([[1864],{3905:(t,e,a)=>{a.d(e,{Zo:()=>c,kt:()=>m});var r=a(7294);function i(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function s(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function n(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?s(Object(a),!0).forEach((function(e){i(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function o(t,e){if(null==t)return{};var a,r,i=function(t,e){if(null==t)return{};var a,r,i={},s=Object.keys(t);for(r=0;r<s.length;r++)a=s[r],e.indexOf(a)>=0||(i[a]=t[a]);return i}(t,e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(r=0;r<s.length;r++)a=s[r],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(i[a]=t[a])}return i}var h=r.createContext({}),l=function(t){var e=r.useContext(h),a=e;return t&&(a="function"==typeof t?t(e):n(n({},e),t)),a},c=function(t){var e=l(t.components);return r.createElement(h.Provider,{value:e},t.children)},p={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},u=r.forwardRef((function(t,e){var a=t.components,i=t.mdxType,s=t.originalType,h=t.parentName,c=o(t,["components","mdxType","originalType","parentName"]),u=l(a),m=i,b=u["".concat(h,".").concat(m)]||u[m]||p[m]||s;return a?r.createElement(b,n(n({ref:e},c),{},{components:a})):r.createElement(b,n({ref:e},c))}));function m(t,e){var a=arguments,i=e&&e.mdxType;if("string"==typeof t||i){var s=a.length,n=new Array(s);n[0]=u;var o={};for(var h in e)hasOwnProperty.call(e,h)&&(o[h]=e[h]);o.originalType=t,o.mdxType="string"==typeof t?t:i,n[1]=o;for(var l=2;l<s;l++)n[l]=a[l];return r.createElement.apply(null,n)}return r.createElement.apply(null,a)}u.displayName="MDXCreateElement"},1607:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>h,contentTitle:()=>n,default:()=>p,frontMatter:()=>s,metadata:()=>o,toc:()=>l});var r=a(3117),i=(a(7294),a(3905));const s={sidebar_position:1},n="Britecharts",o={unversionedId:"Britecharts",id:"Britecharts",title:"Britecharts",description:"Britecharts makes it easier to build stunning D3.js-powered interactive charts with little code.",source:"@site/docs/Britecharts.md",sourceDirName:".",slug:"/Britecharts",permalink:"/britecharts/docs/Britecharts",draft:!1,editUrl:"https://github.com/britecharts/britecharts/edit/main/website/docs/Britecharts.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"Tutorials",permalink:"/britecharts/docs/tutorials/tutorials-index"}},h={},l=[{value:"Key Features",id:"key-features",level:2},{value:"Usage",id:"usage",level:2},{value:"API",id:"api",level:2},{value:"Installation",id:"installation",level:2},{value:"See Also",id:"see-also",level:2},{value:"Community Roadmap",id:"community-roadmap",level:2},{value:"How to Contribute",id:"how-to-contribute",level:2},{value:"Code of Conduct",id:"code-of-conduct",level:2},{value:"Acknowledgments",id:"acknowledgments",level:2},{value:"Contributors \u2728",id:"contributors-",level:2},{value:"License",id:"license",level:2}],c={toc:l};function p(t){let{components:e,...a}=t;return(0,i.kt)("wrapper",(0,r.Z)({},c,a,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"britecharts"},"Britecharts"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Britecharts makes it easier to build stunning ",(0,i.kt)("a",{parentName:"p",href:"https://d3js.org/"},"D3.js"),"-powered interactive charts with little code.")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://opensource.org/licenses/Apache-2.0"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/badge/License-Apache%202.0-blue.svg",alt:"License"}))," ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/britecharts/britecharts/actions/workflows/tests.yml"},(0,i.kt)("img",{parentName:"a",src:"https://github.com/britecharts/britecharts/actions/workflows/tests.yml/badge.svg",alt:"test workflow"}))," ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/britecharts/britecharts/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/github/issues-pr-raw/britecharts/britecharts",alt:"GitHub pull requests"}))," ",(0,i.kt)("a",{parentName:"p",href:"https://www.jsdelivr.com/package/npm/britecharts"},(0,i.kt)("img",{parentName:"a",src:"https://data.jsdelivr.com/v1/package/npm/britecharts/badge",alt:null}))),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/britecharts/britecharts/blob/master/.github/CONTRIBUTING.md"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/badge/PRs-welcome-brightgreen.svg",alt:"PRs Welcome"}))," ",(0,i.kt)("a",{parentName:"p",href:"#toc8__anchor"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square",alt:"All Contributors"}))," ",(0,i.kt)("a",{parentName:"p",href:"https://twitter.com/Britecharts/followers"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/twitter/follow/britecharts.svg?style=social&label=Follow",alt:"Twitter Follow"}))),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"th",href:"https://britecharts.github.io/britecharts/tutorial-bar.html",title:"Check the Demo"},(0,i.kt)("img",{parentName:"a",src:"https://raw.githubusercontent.com/britecharts/britecharts/master/src/doc/images/thumbnails/bar-chart.png",alt:"Bar Chart"}))),(0,i.kt)("th",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"th",href:"https://britecharts.github.io/britecharts/tutorial-line.html",title:"Check the Demo"},(0,i.kt)("img",{parentName:"a",src:"https://raw.githubusercontent.com/britecharts/britecharts/master/src/doc/images/thumbnails/line-chart.png",alt:"Line Chart"}))),(0,i.kt)("th",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"th",href:"https://britecharts.github.io/britecharts/tutorial-donut.html",title:"Check the Demo"},(0,i.kt)("img",{parentName:"a",src:"https://raw.githubusercontent.com/britecharts/britecharts/master/src/doc/images/thumbnails/donut-chart.png",alt:"Donut Chart"}))))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"[",(0,i.kt)("img",{parentName:"td",src:"https://raw.githubusercontent.com/britecharts/britecharts/master/src/doc/images/thumbnails/stacked-bar-chart.png",alt:"Stacked Bar Chart"}),"][stackedbarchart-story]"),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://britecharts.github.io/britecharts/tutorial-stacked-area.html",title:"Check the Demo"},(0,i.kt)("img",{parentName:"a",src:"https://raw.githubusercontent.com/britecharts/britecharts/master/src/doc/images/thumbnails/stacked-area-chart-large.png",alt:"Stacked Area Chart"}))),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://britecharts.github.io/britecharts/tutorial-grouped-bar.html",title:"Check the Demo"},(0,i.kt)("img",{parentName:"a",src:"https://raw.githubusercontent.com/britecharts/britecharts/master/src/doc/images/thumbnails/grouped-bar-chart.png",alt:"Grouped Bar Chart"})))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://britecharts.github.io/britecharts/tutorial-sparkline.html",title:"Check the Demo"},(0,i.kt)("img",{parentName:"a",src:"https://raw.githubusercontent.com/britecharts/britecharts/master/src/doc/images/thumbnails/sparkline-chart.png",alt:"Sparkline Chart"}))),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://britecharts.github.io/britecharts/tutorial-donut.html",title:"Check the Demo"},(0,i.kt)("img",{parentName:"a",src:"https://raw.githubusercontent.com/britecharts/britecharts/master/src/doc/images/thumbnails/legend-chart.png",alt:"Legend Chart"}))),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://britecharts.github.io/britecharts/tutorial-brush.html",title:"Check the Demo"},(0,i.kt)("img",{parentName:"a",src:"https://raw.githubusercontent.com/britecharts/britecharts/master/src/doc/images/thumbnails/brush-chart.png",alt:"Brush Chart"})))))),(0,i.kt)("div",{align:"center"},(0,i.kt)("a",{href:"https://britecharts.github.io/britecharts/getting-started.html"},"Quickstart*"),(0,i.kt)("span",null," \xb7 "),(0,i.kt)("a",{href:"https://britecharts.github.io/britecharts/tutorials-index.html"},"Tutorials*"),(0,i.kt)("span",null," \xb7 "),(0,i.kt)("a",{href:"https://britecharts.github.io/britecharts/"},"Docs"),(0,i.kt)("span",null," \xb7 "),(0,i.kt)("a",{href:"https://github.com/britecharts/britecharts-test-project"},"Test Project"),(0,i.kt)("span",null," \xb7 "),(0,i.kt)("a",{href:"https://britecharts.github.io/britecharts/tutorial-kitchen-sink.html"},"Storybook*"),(0,i.kt)("span",null," \xb7 "),(0,i.kt)("a",{href:"https://britecharts.github.io/britecharts/contributor-how-to-guides.html"},"Contribute*"),(0,i.kt)("br",null),"Support: ",(0,i.kt)("a",{href:"https://twitter.com/britecharts"},"Twitter"),", ",(0,i.kt)("a",{href:"https://github.com/britecharts/britecharts/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc"},"Issues"),(0,i.kt)("span",null," & "),(0,i.kt)("a",{href:"https://d3js.slack.com/messages/tools-britecharts/"},"Slack")),(0,i.kt)("br",null),(0,i.kt)("p",null,"Britecharts is a client-side ",(0,i.kt)("strong",{parentName:"p"},"reusable Charting Library")," based on ",(0,i.kt)("a",{parentName:"p",href:"https://d3js.org/"},"D3.js v5")," that provides easy composition of charts and components to create amazing data visualizations."),(0,i.kt)("h2",{id:"key-features"},"Key Features"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"\ud83d\udee0 ",(0,i.kt)("strong",{parentName:"li"},"Reusable")," - Configure your charts to create different looks and behaviors."),(0,i.kt)("li",{parentName:"ul"},"\ud83c\udfd7 ",(0,i.kt)("strong",{parentName:"li"},"Composable")," - Mix and match components to create insightful experiences."),(0,i.kt)("li",{parentName:"ul"},"\ud83c\udf08 ",(0,i.kt)("strong",{parentName:"li"},"Great design")," - Clean and vivid looks to amaze your users."),(0,i.kt)("li",{parentName:"ul"},"\u2699\ufe0f ",(0,i.kt)("strong",{parentName:"li"},"Simple")," - The codebase is a regular D3.js code you can fork and modify.")),(0,i.kt)("p",null,"Britecharts ",(0,i.kt)("a",{parentName:"p",href:"https://britecharts.github.io/britecharts/tutorial-kitchen-sink.html*"},"components")," have been written in ES2016 with a Test Driven methodology, so they are ",(0,i.kt)("strong",{parentName:"p"},"fully tested"),", and we are committed to keeping them that way."),(0,i.kt)("h2",{id:"usage"},"Usage"),(0,i.kt)("p",null,"The typical use of Britecharts involves creating a chart using its simple API, then rendering it on a container that has previously had data applied to it. The code will look like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"    import { select } from 'd3-selection';\n    import { bar } from '@britecharts/core';\n\n    const barChart = bar();\n    const barContainer = select('.bar-chart-container');\n    const dataset = [...];\n\n    barChart\n        .width(500)\n        .height(300);\n\n    barContainer.datum(dataset).call(barChart);\n")),(0,i.kt)("p",null,"To use Britecharts with React, you will need to use the ",(0,i.kt)("inlineCode",{parentName:"p"},"@britecharts/react")," ",(0,i.kt)("a",{parentName:"p",href:"packages/react-readme"},"package"),". Also, if you use Angular, check out ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/colapdev/ngx-britecharts"},"ngx-britecharts")," and their ",(0,i.kt)("a",{parentName:"p",href:"https://colapdev.github.io/ngx-britecharts/"},"demos"),". We also include a set of wrappers in ",(0,i.kt)("inlineCode",{parentName:"p"},"@britecharts/wrappers")," that you can use to employ Britecharts with other web frameworks."),(0,i.kt)("h2",{id:"api"},"API"),(0,i.kt)("p",null,"All the components expose ",(0,i.kt)("strong",{parentName:"p"},"common API methods")," like width, height, and margin. Additionally, each component exposes specific methods you can find in the documentation:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"API/line"},"API"),", ",(0,i.kt)("a",{parentName:"li",href:"https://britecharts.github.io/britecharts/tutorial-line.html",title:"Check the Demo"},"Demo")," Line Chart"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"API/bar"},"API"),", ",(0,i.kt)("a",{parentName:"li",href:"https://britecharts.github.io/britecharts/tutorial-bar.html",title:"Check the Demo"},"Demo")," Bar Chart"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"API/donut"},"API"),", ",(0,i.kt)("a",{parentName:"li",href:"https://britecharts.github.io/britecharts/tutorial-donut.html",title:"Check the Demo"},"Demo")," Donut Chart"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"API/stacked-bar"},"API"),", ",(0,i.kt)("a",{parentName:"li",href:"https://britecharts.github.io/britecharts/tutorial-stacked-bar.html",title:"Check the Demo"},"Demo")," Stacked Bar Chart"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"API/grouped-bar"},"API"),", ",(0,i.kt)("a",{parentName:"li",href:"https://britecharts.github.io/britecharts/tutorial-grouped-bar.html",title:"Check the Demo"},"Demo")," Grouped Bar Chart"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"API/bullet"},"API"),", ",(0,i.kt)("a",{parentName:"li",href:"https://britecharts.github.io/britecharts/tutorial-bullet.html",title:"Check the Demo"},"Demo")," Bullet Chart"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"API/brush"},"API"),", ",(0,i.kt)("a",{parentName:"li",href:"https://britecharts.github.io/britecharts/tutorial-brush.html",title:"Check the Demo"},"Demo")," Brush Chart"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"API/scatter-plot"},"API"),", ",(0,i.kt)("a",{parentName:"li",href:"https://britecharts.github.io/britecharts/tutorial-scatter-plot.html",title:"Check the Demo"},"Demo")," Scatter Plot"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"API/sparkline"},"API"),", ",(0,i.kt)("a",{parentName:"li",href:"https://britecharts.github.io/britecharts/tutorial-sparkline.html",title:"Check the Demo"},"Demo")," Sparkline Chart"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"API/stacked-area"},"API"),", ",(0,i.kt)("a",{parentName:"li",href:"https://britecharts.github.io/britecharts/tutorial-stacked-area.html",title:"Check the Demo"},"Demo")," Stacked Area Chart"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"API/step"},"API"),", ",(0,i.kt)("a",{parentName:"li",href:"https://britecharts.github.io/britecharts/tutorial-step.html",title:"Check the Demo"},"Demo")," Step Chart"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"API/mini-tooltip"},"API"),", ",(0,i.kt)("a",{parentName:"li",href:"https://britecharts.github.io/britecharts/tutorial-bar.html",title:"Check the Demo"},"Demo")," Mini Tooltip"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"API/tooltip"},"API"),", ",(0,i.kt)("a",{parentName:"li",href:"https://britecharts.github.io/britecharts/tutorial-line.html",title:"Check the Demo"},"Demo")," Tooltip"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"API/legend"},"API"),", ",(0,i.kt)("a",{parentName:"li",href:"https://britecharts.github.io/britecharts/tutorial-donut.html",title:"Check the Demo"},"Demo")," Legend")),(0,i.kt)("h2",{id:"installation"},"Installation"),(0,i.kt)("p",null,"Britecharts components are distributed in ",(0,i.kt)("strong",{parentName:"p"},"UMD modules")," and ",(0,i.kt)("strong",{parentName:"p"},"ES modules"),", each one exposing a D3.js component written with the ",(0,i.kt)("a",{parentName:"p",href:"https://bost.ocks.org/mike/chart/"},"Reusable API pattern"),". To use any of the Britecharts modules, you will need to require the chart in your JS file using CommonJS modules, ES modules, or adding a ",(0,i.kt)("inlineCode",{parentName:"p"},"<script>")," tag with the ",(0,i.kt)("inlineCode",{parentName:"p"},"src")," pointing to the file or CDN bundle. You would also need to load the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/d3/d3-selection"},"d3-selection")," submodule to select the chart container."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"   npm install --save @britecharts/core d3-selection\n   # or\n   yarn add @britecharts/core d3-selection\n")),(0,i.kt)("p",null,"Alternatively, you can load Britecharts from our ",(0,i.kt)("a",{parentName:"p",href:"https://cdn.jsdelivr.net/npm/britecharts/dist/"},"CDN")," as we do in this ",(0,i.kt)("a",{parentName:"p",href:"https://britecharts.github.io/britecharts/cdn.html"},"demo")," page or play around in our ",(0,i.kt)("a",{parentName:"p",href:"https://codepen.io/Britecharts/pens/forked/"},"CodePen")," demo projects."),(0,i.kt)("p",null,"Then, in your JavaScript module file you can now import and use charts:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"import { bar } from '@britecharts/core';\nimport { select } from 'd3-selection';\n\nconst barChart = bar();\nconst container = select('#container');\n\nconst barData = [\n    { name: 'Luminous', value: 2 },\n    { name: 'Glittering', value: 5 },\n    { name: 'Intense', value: 4 },\n    { name: 'Radiant', value: 3 }\n];\n\nbarChart\n    .margin({ left: 100 })\n    .isHorizontal(true)\n    .height(400)\n    .width(600);\n\ncontainer.datum(barData).call(barChart);\n")),(0,i.kt)("p",null,"Britecharts comes with a basic set of CSS styles that you would load with a ",(0,i.kt)("inlineCode",{parentName:"p"},"<link>")," tag in your page's ",(0,i.kt)("inlineCode",{parentName:"p"},"<head>"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},'<link\n    rel="stylesheet"\n    href="./node_modules/britecharts/dist/css/britecharts.css"\n/>*\n')),(0,i.kt)("p",null,"You can customize CSS using new styles. Check our ",(0,i.kt)("a",{parentName:"p",href:"tutorials/styling-charts"},"Styling Britecharts tutorial")," to get started."),(0,i.kt)("h2",{id:"see-also"},"See Also"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://britecharts.github.io/britecharts/"},"Documentation Homepage")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"tutorials/getting-started"},"Getting Started Guide")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"tutorials/tutorials-index"},"Tutorials")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"how-tos/how-to-index"},"How To Guides")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"topics/topics-index"},"Topics")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/britecharts/britecharts/blob/main/.github/CONTRIBUTING.md"},"Contributing Guide")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/britecharts/britecharts"},"Github Repo")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/britecharts/britecharts/blob/main/CHANGELOG.md"},"Changelog"))),(0,i.kt)("h2",{id:"community-roadmap"},"Community Roadmap"),(0,i.kt)("p",null,"This project is in active development. We want your input about what is important, for that, add your votes using the \ud83d\udc4d reaction:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/britecharts/britecharts/issues?q=is%3Aissue+is%3Aclosed+sort%3Areactions-%2B1-desc+label%3Atype%3Afeature+"},"Top Feature Requests")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/britecharts/britecharts/issues?q=is%3Aissue+is%3Aclosed+sort%3Areactions-%2B1-desc+label%3Atype%3Adocumentation+"},"Documentation Requests")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/britecharts/britecharts/issues?q=is%3Aissue+is%3Aclosed+sort%3Areactions-%2B1-desc+label%3Atype%3Abug+"},"Top Bugs"))),(0,i.kt)("h2",{id:"how-to-contribute"},"How to Contribute"),(0,i.kt)("p",null,"Whether you're helping us fix bugs, improving the docs, or spreading the word, we'd love to have you as part of the Britecharts community!"),(0,i.kt)("p",null,"To give your feedback, you can open a new issue. You can also find us in the ",(0,i.kt)("a",{parentName:"p",href:"https://d3js.slack.com/messages/tools-britecharts/"},"D3.js slack group"),", in the ",(0,i.kt)("strong",{parentName:"p"},"#tool-britecharts")," channel. We are looking for contributors and committers, so if you want to become a part of this project, check the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/britecharts/britecharts/blob/main/.github/CONTRIBUTING.md"},"contributing guide")," for ideas on contributing and get started today!"),(0,i.kt)("h2",{id:"code-of-conduct"},"Code of Conduct"),(0,i.kt)("p",null,"Britecharts is dedicated to building a welcoming, diverse, and safe community. We expect everyone participating in the Britecharts community to abide by our ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/britecharts/britecharts/blob/master/CODE_OF_CONDUCT.md"},"Code of Conduct"),". Please read it and follow it."),(0,i.kt)("h2",{id:"acknowledgments"},"Acknowledgments"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://dribbble.com/sundai"},"Sun Dai")," designs Britecharts, and two books inspired the code, ",(0,i.kt)("a",{parentName:"p",href:"https://bleedingedgepress.com/our-books/developing-a-d3-js-edge/"},"Developing a D3.js Edge")," and ",(0,i.kt)("a",{parentName:"p",href:"https://www.packtpub.com/web-development/mastering-d3js"},"Mastering D3.js"),". It also leveraged a significant number of examples and articles from the ",(0,i.kt)("a",{parentName:"p",href:"https://d3js.org/"},"D3.js")," community overall."),(0,i.kt)("h2",{id:"contributors-"},"Contributors \u2728"),(0,i.kt)("p",null,"Thanks goes to these wonderful people (",(0,i.kt)("a",{parentName:"p",href:"https://allcontributors.org/docs/en/emoji-key"},"emoji key"),"):"),(0,i.kt)("table",{class:"contributors-table"},(0,i.kt)("tr",null,(0,i.kt)("td",{align:"center"},(0,i.kt)("a",{href:"http://dalerasrorov.github.io/"},(0,i.kt)("img",{src:"https://avatars2.githubusercontent.com/u/9118852?v=4",width:"100px;",alt:""}),(0,i.kt)("br",null),(0,i.kt)("sub",null,(0,i.kt)("b",null,"Daler Asrorov"))),(0,i.kt)("br",null),(0,i.kt)("a",{href:"https://github.com/britecharts/britecharts/commits?author=DalerAsrorov",title:"Code"},"\ud83d\udcbb")," ",(0,i.kt)("a",{href:"https://github.com/britecharts/britecharts/commits?author=DalerAsrorov",title:"Documentation"},"\ud83d\udcd6")," ",(0,i.kt)("a",{href:"#ideas-DalerAsrorov",title:"Ideas, Planning, & Feedback"},"\ud83e\udd14")," ",(0,i.kt)("a",{href:"#maintenance-DalerAsrorov",title:"Maintenance"},"\ud83d\udea7")," ",(0,i.kt)("a",{href:"https://github.com/britecharts/britecharts/pulls?q=is%3Apr+reviewed-by%3ADalerAsrorov",title:"Reviewed Pull Requests"},"\ud83d\udc40")," ",(0,i.kt)("a",{href:"https://github.com/britecharts/britecharts/commits?author=DalerAsrorov",title:"Tests"},"\u26a0\ufe0f")),(0,i.kt)("td",{align:"center"},(0,i.kt)("a",{href:"https://github.com/ryanwholey"},(0,i.kt)("img",{src:"https://avatars0.githubusercontent.com/u/8100360?v=4",width:"100px;",alt:""}),(0,i.kt)("br",null),(0,i.kt)("sub",null,(0,i.kt)("b",null,"Ryan Wholey"))),(0,i.kt)("br",null),(0,i.kt)("a",{href:"https://github.com/britecharts/britecharts/commits?author=ryanwholey",title:"Code"},"\ud83d\udcbb")," ",(0,i.kt)("a",{href:"https://github.com/britecharts/britecharts/commits?author=ryanwholey",title:"Documentation"},"\ud83d\udcd6")," ",(0,i.kt)("a",{href:"#ideas-ryanwholey",title:"Ideas, Planning, & Feedback"},"\ud83e\udd14")," ",(0,i.kt)("a",{href:"#maintenance-ryanwholey",title:"Maintenance"},"\ud83d\udea7")," ",(0,i.kt)("a",{href:"https://github.com/britecharts/britecharts/pulls?q=is%3Apr+reviewed-by%3Aryanwholey",title:"Reviewed Pull Requests"},"\ud83d\udc40")," ",(0,i.kt)("a",{href:"https://github.com/britecharts/britecharts/commits?author=ryanwholey",title:"Tests"},"\u26a0\ufe0f")),(0,i.kt)("td",{align:"center"},(0,i.kt)("a",{href:"https://github.com/jchen85"},(0,i.kt)("img",{src:"https://avatars2.githubusercontent.com/u/14088460?v=4",width:"100px;",alt:""}),(0,i.kt)("br",null),(0,i.kt)("sub",null,(0,i.kt)("b",null,"jchen85"))),(0,i.kt)("br",null),(0,i.kt)("a",{href:"https://github.com/britecharts/britecharts/commits?author=jchen85",title:"Code"},"\ud83d\udcbb")," ",(0,i.kt)("a",{href:"#ideas-jchen85",title:"Ideas, Planning, & Feedback"},"\ud83e\udd14")," ",(0,i.kt)("a",{href:"#maintenance-jchen85",title:"Maintenance"},"\ud83d\udea7")," ",(0,i.kt)("a",{href:"https://github.com/britecharts/britecharts/pulls?q=is%3Apr+reviewed-by%3Ajchen85",title:"Reviewed Pull Requests"},"\ud83d\udc40")," ",(0,i.kt)("a",{href:"https://github.com/britecharts/britecharts/commits?author=jchen85",title:"Tests"},"\u26a0\ufe0f")),(0,i.kt)("td",{align:"center"},(0,i.kt)("a",{href:"https://github.com/ImADrafter"},(0,i.kt)("img",{src:"https://avatars3.githubusercontent.com/u/44379989?v=4",width:"100px;",alt:""}),(0,i.kt)("br",null),(0,i.kt)("sub",null,(0,i.kt)("b",null,"Marcos G\xf3mez"))),(0,i.kt)("br",null),(0,i.kt)("a",{href:"https://github.com/britecharts/britecharts/commits?author=ImADrafter",title:"Code"},"\ud83d\udcbb")),(0,i.kt)("td",{align:"center"},(0,i.kt)("a",{href:"https://github.com/ajdani"},(0,i.kt)("img",{src:"https://avatars1.githubusercontent.com/u/16606530?v=4",width:"100px;",alt:""}),(0,i.kt)("br",null),(0,i.kt)("sub",null,(0,i.kt)("b",null,"ajdani"))),(0,i.kt)("br",null),(0,i.kt)("a",{href:"https://github.com/britecharts/britecharts/issues?q=author%3Aajdani",title:"Bug reports"},"\ud83d\udc1b")," ",(0,i.kt)("a",{href:"https://github.com/britecharts/britecharts/commits?author=ajdani",title:"Code"},"\ud83d\udcbb")," ",(0,i.kt)("a",{href:"#maintenance-ajdani",title:"Maintenance"},"\ud83d\udea7")),(0,i.kt)("td",{align:"center"},(0,i.kt)("a",{href:"https://github.com/shayh"},(0,i.kt)("img",{src:"https://avatars3.githubusercontent.com/u/366321?v=4",width:"100px;",alt:""}),(0,i.kt)("br",null),(0,i.kt)("sub",null,(0,i.kt)("b",null,"shayh"))),(0,i.kt)("br",null),(0,i.kt)("a",{href:"https://github.com/britecharts/britecharts/commits?author=shayh",title:"Code"},"\ud83d\udcbb")))),(0,i.kt)("p",null,"This project follows the ",(0,i.kt)("a",{parentName:"p",href:"https://allcontributors.org"},"all-contributors")," specification. Contributions of any kind are welcome!"),(0,i.kt)("h2",{id:"license"},"License"),(0,i.kt)("p",null,'Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at'),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://www.apache.org/licenses/LICENSE-2.0"},"https://www.apache.org/licenses/LICENSE-2.0")),(0,i.kt)("p",null,'Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.'),(0,i.kt)("p",null,"Read more in the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/britecharts/britecharts/blob/main/LICENSE.md"},"license document")))}p.isMDXComponent=!0}}]);