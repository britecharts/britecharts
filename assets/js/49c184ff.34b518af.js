"use strict";(self.webpackChunk_britecharts_docs=self.webpackChunk_britecharts_docs||[]).push([[3297],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>m});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var o=n.createContext({}),c=function(e){var t=n.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},p=function(e){var t=c(e.components);return n.createElement(o.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(a),m=r,h=u["".concat(o,".").concat(m)]||u[m]||d[m]||i;return a?n.createElement(h,l(l({ref:t},p),{},{components:a})):n.createElement(h,l({ref:t},p))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,l=new Array(i);l[0]=u;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s.mdxType="string"==typeof e?e:r,l[1]=s;for(var c=2;c<i;c++)l[c]=a[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},4642:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var n=a(3117),r=(a(7294),a(3905));const i={sidebar_position:3},l="API Guidelines",s={unversionedId:"topics/api-guidelines",id:"topics/api-guidelines",title:"API Guidelines",description:"Creating new features and charts for Britecharts is easy. However, naming the API methods is hard. We have created these API guidelines to help our contributors choose proper accessor and variable names.",source:"@site/docs/topics/api-guidelines.md",sourceDirName:"topics",slug:"/topics/api-guidelines",permalink:"/docs/topics/api-guidelines",draft:!1,editUrl:"https://github.com/britecharts/britecharts/edit/main/website/docs/topics/api-guidelines.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Code Standards",permalink:"/docs/topics/code-standards"},next:{title:"Code and Project Structure",permalink:"/docs/topics/code-structure"}},o={},c=[{value:"General Considerations",id:"general-considerations",level:3},{value:"Variable and function names length",id:"variable-and-function-names-length",level:3},{value:"Event dispatchers",id:"event-dispatchers",level:3},{value:"Booleans",id:"booleans",level:3},{value:"Commands",id:"commands",level:3},{value:"Data labels",id:"data-labels",level:3},{value:"Formats",id:"formats",level:3},{value:"Ticks and Axis",id:"ticks-and-axis",level:3}],p={toc:c};function d(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"api-guidelines"},"API Guidelines"),(0,r.kt)("p",null,"Creating new features and charts for Britecharts is easy. However, naming the API methods is hard. We have created these API guidelines to help our contributors choose proper accessor and variable names."),(0,r.kt)("p",null,"The guidelines help developers improve the consistency of the library and lower the entry barrier to start contributing to Britecharts. They also help reviewers at the time of doing code reviews, and they facilitate an efficient code review process."),(0,r.kt)("h3",{id:"general-considerations"},"General Considerations"),(0,r.kt)("p",null,'Variable and accessor names should be camel cased (eg. "shouldBeCamelCase"), and we try to use only one word that is the same as the internal variable we are using. Variables are nouns, while commands are verbs.'),(0,r.kt)("p",null,"For example: ",(0,r.kt)("em",{parentName:"p"},"height, width, margin, title"),"."),(0,r.kt)("h3",{id:"variable-and-function-names-length"},"Variable and function names length"),(0,r.kt)("p",null,"We will follow the 'Scope Rule':"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Variable names:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"short in small scopes (d)"),(0,r.kt)("li",{parentName:"ul"},"long in large scopes (percentageLabelMargin)"))),(0,r.kt)("li",{parentName:"ul"},"Functions names:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"short in large scopes like public commands (hide, width)"),(0,r.kt)("li",{parentName:"ul"},"long in small scopes (drawVerticalExtendedLine)")))),(0,r.kt)("h3",{id:"event-dispatchers"},"Event dispatchers"),(0,r.kt)("p",null,"The custom events that are attached to the charts always are prefixed with \u2018on\u2019."),(0,r.kt)("p",null,"As in: ",(0,r.kt)("em",{parentName:"p"},".on('customHover')")),(0,r.kt)("h3",{id:"booleans"},"Booleans"),(0,r.kt)("p",null,"We want them to be predicates. They are prefixed with one of the following:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"should"),(0,r.kt)("li",{parentName:"ul"},"has"),(0,r.kt)("li",{parentName:"ul"},"is")),(0,r.kt)("p",null,"As in: ",(0,r.kt)("em",{parentName:"p"},"isAnimated, hasFixedHighlightedSlice"),"."),(0,r.kt)("h3",{id:"commands"},"Commands"),(0,r.kt)("p",null,"Commands must be verbs and be constructed into a single word if possible"),(0,r.kt)("p",null,"As in: ",(0,r.kt)("em",{parentName:"p"},"hide, show, exportChart")),(0,r.kt)("h3",{id:"data-labels"},"Data labels"),(0,r.kt)("p",null,"For API entries that configure the keys of the input data, we use the property name and the suffix \u2018label\u2019."),(0,r.kt)("p",null,"As in: ",(0,r.kt)("em",{parentName:"p"},"dateLabel, valueLabel")),(0,r.kt)("h3",{id:"formats"},"Formats"),(0,r.kt)("p",null,"A simple name with the property name and \u2018format\u2019 suffix."),(0,r.kt)("p",null,"As in: ",(0,r.kt)("em",{parentName:"p"},"numberFormat, xLabelFormat")),(0,r.kt)("h3",{id:"ticks-and-axis"},"Ticks and Axis"),(0,r.kt)("p",null,"We use the axis name followed by the 'axis' and \u2018ticks\u2019 suffix:"),(0,r.kt)("p",null,"As in: ",(0,r.kt)("em",{parentName:"p"},"xTicks, yTicks")))}d.isMDXComponent=!0}}]);