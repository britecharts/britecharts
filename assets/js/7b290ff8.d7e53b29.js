"use strict";(self.webpackChunk_britecharts_docs=self.webpackChunk_britecharts_docs||[]).push([[5484],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(r),m=a,h=d["".concat(s,".").concat(m)]||d[m]||u[m]||o;return r?n.createElement(h,i(i({ref:t},p),{},{components:r})):n.createElement(h,i({ref:t},p))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},3911:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var n=r(3117),a=(r(7294),r(3905));const o={sidebar_position:2},i="@britecharts/docs",l={unversionedId:"packages/docs-readme",id:"packages/docs-readme",title:"@britecharts/docs",description:"Documentation package to create the documentation site for Britecharts, built using Docusaurus 2.",source:"@site/docs/packages/docs-readme.md",sourceDirName:"packages",slug:"/packages/docs-readme",permalink:"/britecharts/docs/packages/docs-readme",draft:!1,editUrl:"https://github.com/britecharts/britecharts/edit/main/website/docs/packages/docs-readme.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"@britecharts/core",permalink:"/britecharts/docs/packages/core-readme"},next:{title:"@britecharts/wrappers",permalink:"/britecharts/docs/packages/wrappers-readme"}},s={},c=[{value:"Usage",id:"usage",level:2},{value:"Installation",id:"installation",level:2},{value:"Local Development",id:"local-development",level:3},{value:"Build",id:"build",level:3},{value:"Deployment*",id:"deployment",level:3}],p={toc:c};function u(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"britechartsdocs"},"@britecharts/docs"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Documentation package to create the ",(0,a.kt)("a",{parentName:"p",href:"/"},"documentation site")," for Britecharts, built using ",(0,a.kt)("a",{parentName:"p",href:"https://docusaurus.io/"},"Docusaurus 2"),".")),(0,a.kt)("h2",{id:"usage"},"Usage"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"@britecharts/docs")," will extract the updated docs from the other packages when running ",(0,a.kt)("inlineCode",{parentName:"p"},"yarn start"),". "),(0,a.kt)("p",null,"You can see ",(0,a.kt)("a",{parentName:"p",href:"/"},"here")," the production site deployed."),(0,a.kt)("h2",{id:"installation"},"Installation"),(0,a.kt)("p",null,"To install the dependencies, just run:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"$ yarn\n")),(0,a.kt)("h3",{id:"local-development"},"Local Development"),(0,a.kt)("p",null,"To start developing this documentation site, run:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"$ yarn start\n")),(0,a.kt)("p",null,"This command does several things:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Copies over the Readme from the root package"),(0,a.kt)("li",{parentName:"ul"},"Generates the API from the ",(0,a.kt)("inlineCode",{parentName:"li"},"@britecharts/core")," chart comments"),(0,a.kt)("li",{parentName:"ul"},"Starts a local development server and opens up a browser window ")),(0,a.kt)("p",null,"Changes in the markdown files of this package and configuration are reflected live without having to restart the server. However, to update the docs with the latest comments from the packages or the readme, you will need to re-run ",(0,a.kt)("inlineCode",{parentName:"p"},"yarn start"),"."),(0,a.kt)("h3",{id:"build"},"Build"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"$ yarn build\n")),(0,a.kt)("p",null,"This command generates static content into the ",(0,a.kt)("inlineCode",{parentName:"p"},"build")," directory and can be served using any static contents hosting service."),(0,a.kt)("h3",{id:"deployment"},"Deployment*"),(0,a.kt)("p",null,"Using SSH:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"$ USE_SSH=true yarn deploy\n")),(0,a.kt)("p",null,"Not using SSH:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"$ GIT_USER=<Your GitHub username> yarn deploy\n")),(0,a.kt)("p",null,"If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the ",(0,a.kt)("inlineCode",{parentName:"p"},"gh-pages")," branch."))}u.isMDXComponent=!0}}]);