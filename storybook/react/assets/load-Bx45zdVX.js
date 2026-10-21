import{a as e,n as t,t as n}from"./rolldown-runtime-sJBDdmOt.js";import{D as r,E as i,J as a,O as o,S as s,T as c,Y as l,g as u,m as d,w as f,x as p}from"./useChart-DDUr6ndH.js";function ee(e,t){t||=[];var n=e?Math.min(t.length,e.length):0,r=t.slice(),i;return function(a){for(i=0;i<n;++i)r[i]=e[i]*(1-a)+t[i]*a;return r}}function m(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function te(e,t){for(var n=t?t.length:0,r=e?Math.min(n,e.length):0,i=Array(r),a=Array(n),o=0;o<r;++o)i[o]=y(e[o],t[o]);for(;o<n;++o)a[o]=t[o];return function(e){for(o=0;o<r;++o)a[o]=i[o](e);return a}}function h(){return(h=t((()=>{b()})))()}function g(e,t){var n=new Date;return e=+e,t=+t,function(r){return n.setTime(e*(1-r)+t*r),n}}function _(e,t){var n={},r={},i;for(i in(typeof e!=`object`||!e)&&(e={}),(typeof t!=`object`||!t)&&(t={}),t)i in e?n[i]=y(e[i],t[i]):r[i]=t[i];return function(e){for(i in n)r[i]=n[i](e);return r}}function v(){return(v=t((()=>{b()})))()}function y(e,t){var n=typeof t,o;return t==null||n===`boolean`?r(t):(n===`number`?f:n===`string`?(o=a(t))?(t=o,i):s:t instanceof a?i:t instanceof Date?g:m(t)?ee:Array.isArray(t)?te:typeof t.valueOf!=`function`&&typeof t.toString!=`function`||isNaN(t)?_:f)(e,t)}function b(){return(b=t((()=>{l(),c(),h(),v(),p(),o()})))()}var ne=n(((e,t,n)=>{(function(n){var r=typeof e==`object`&&e,i=typeof t==`object`&&t&&t.exports==r&&t,a=typeof global==`object`&&global;(a.global===a||a.window===a)&&(n=a);var o=function(e){this.message=e};o.prototype=Error(),o.prototype.name=`InvalidCharacterError`;var s=function(e){throw new o(e)},c=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`,l=/[\t\n\f\r ]/g,u={encode:function(e){e=String(e),/[^\0-\xFF]/.test(e)&&s(`The string to be encoded contains characters outside of the Latin1 range.`);for(var t=e.length%3,n=``,r=-1,i,a,o,l,u=e.length-t;++r<u;)i=e.charCodeAt(r)<<16,a=e.charCodeAt(++r)<<8,o=e.charCodeAt(++r),l=i+a+o,n+=c.charAt(l>>18&63)+c.charAt(l>>12&63)+c.charAt(l>>6&63)+c.charAt(l&63);return t==2?(i=e.charCodeAt(r)<<8,a=e.charCodeAt(++r),l=i+a,n+=c.charAt(l>>10)+c.charAt(l>>4&63)+c.charAt(l<<2&63)+`=`):t==1&&(l=e.charCodeAt(r),n+=c.charAt(l>>2)+c.charAt(l<<4&63)+`==`),n},decode:function(e){e=String(e).replace(l,``);var t=e.length;t%4==0&&(e=e.replace(/==?$/,``),t=e.length),(t%4==1||/[^+a-zA-Z0-9/]/.test(e))&&s(`Invalid character: the string to be decoded is not correctly encoded.`);for(var n=0,r,i,a=``,o=-1;++o<t;)i=c.indexOf(e.charAt(o)),r=n%4?r*64+i:i,n++%4&&(a+=String.fromCharCode(255&r>>(-2*n&6)));return a},version:`1.0.0`};if(typeof define==`function`&&typeof define.amd==`object`&&define.amd)define(function(){return u});else if(r&&!r.nodeType){if(i)i.exports=u;else for(var d in u)u.hasOwnProperty(d)&&(r[d]=u[d])}else n.base64=u})(n)})),x,S,C,w,T;function E(){return(E=t((()=>{x={BASE:!0,HEAD:!0,HTML:!0,META:!0,NOFRAME:!0,NOSCRIPT:!0,PARAM:!0,SCRIPT:!0,STYLE:!0,TITLE:!0},S=`A.ABBR.ADDRESS.AREA.ARTICLE.ASIDE.AUDIO.B.BASE.BDI.BDO.BLOCKQUOTE.BODY.BR.BUTTON.CANVAS.CAPTION.CENTER.CITE.CODE.COL.COLGROUP.COMMAND.DATALIST.DD.DEL.DETAILS.DFN.DIV.DL.DT.EM.EMBED.FIELDSET.FIGCAPTION.FIGURE.FONT.FOOTER.FORM.H1.H2.H3.H4.H5.H6.HEAD.HEADER.HGROUP.HR.HTML.I.IFRAME.IMG.INPUT.INS.KBD.LABEL.LEGEND.LI.LINK.MAP.MARK.MATH.MENU.META.METER.NAV.NOBR.NOSCRIPT.OBJECT.OL.OPTION.OPTGROUP.OUTPUT.P.PARAM.PRE.PROGRESS.Q.RP.RT.RUBY.S.SAMP.SCRIPT.SECTION.SELECT.SMALL.SOURCE.SPAN.STRONG.STYLE.SUB.SUMMARY.SUP.SVG.TABLE.TBODY.TD.TEXTAREA.TFOOT.TH.THEAD.TIME.TITLE.TR.TRACK.U.UL.VAR.VIDEO.WBR`.split(`.`),C=e=>{let t={},n=document.body.appendChild(document.createElement(e)),r=window.getComputedStyle(n);return Array.from(r).forEach(e=>{t[e]=r[e]}),document.body.removeChild(n),t},w=()=>{let e={};S.forEach(t=>{x[t]||(e[t]=C(t))});function t(t){return t=t.toUpperCase(),e[t]||(e[t]=C(t)),e[t]}function n(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return;let n=[],r=e.querySelectorAll(`*`);r.forEach((e,r)=>{if(!x[e.tagName]){let i=window.getComputedStyle(e),a=t(e.tagName),o=e.style;n[r]=o.cssText,Array.from(i).forEach(e=>{i[e]!==a[e]&&(o[e]=i[e])})}});let i=e.outerHTML;return r.forEach((e,t)=>{e.style.cssText=n[t]}),i}return n},T={initializeSerializer:w}})))()}function D(e,t,n){return L?(console.error(R),!1):ie(k.call(this,e,n)).then(e=>({canvas:A(this.width(),this.height()),img:e})).then(({canvas:e,img:n})=>re.call(n,e,t))}function O(e){return e.replace(`>`,`>${H.styleBackgroundString}`)}function k(e,t){if(!e)return;e.attr(`version`,1.1).attr(`xmlns`,`http://www.w3.org/2000/svg`);let n=T.initializeSerializer()(e.node());return n=P(n),n=ae.call(this,n,t,parseInt(e.attr(`width`),10)),n=O(n),n}function A(e,t){let n=document.createElement(`canvas`);return n.height=t,n.width=e,n}function j(e,t){let n=new Image;if(t){if(typeof t!=`function`)throw Error(`The callback provided should be a function, we got a ${typeof t} instead.`);t(n)}return n.src=`${H.imageSourceBase}${V(e)}`,n}function M(e,t){return t.getContext(`2d`).drawImage(e,0,0),t}function N(e,t=H.defaultFilename,n=`image/png`){let r=e.toDataURL(n),i=document.createElement(`a`);i.href=r,i.download=t,document.body.appendChild(i),i.click(),document.body.removeChild(i)}function P(e){return navigator.userAgent.search(`FireFox`)>-1?e.replace(/url.*&quot;\)/,`url(&quot;linearGradient[id*="-gradient-"]&quot;);`):e}function re(e,t){N(M(this,e),t)}function ie(e){return new Promise((t,n)=>{j(e,e=>{e.addEventListener(`load`,()=>t(e)),e.addEventListener(`error`,e=>n(e))})})}function ae(e,t,n){if(!t||!n)return e;let{grey:r}=d;return e=e.replace(/<g/,`<text x="${this.margin().left}" y="${H.titleTopOffset}" font-family="${H.titleFontFamily}" font-size="${H.titleFontSize}" fill="${r[6]}"> ${t} </text><g `),e}var F,I,L,R,z,B,V,H;function U(){return(U=t((()=>{F=e(ne(),1),u(),E(),I=typeof window<`u`,L=navigator.msSaveOrOpenBlob,R=`Sorry, this feature is not available for IE. If you require this to work, check this issue https://github.com/eventbrite/britecharts/pull/652`,z=`‘Helvetica Neue’, Helvetica, Arial, sans-serif`,B=I?window.btoa:F.default.encode,B||=F.default.encode,V=e=>B(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,function(e,t){return String.fromCharCode(Number(`0x`+t))})),H={styleClass:`britechartStyle`,defaultFilename:`britechart.png`,chartBackground:`white`,imageSourceBase:`data:image/svg+xml;base64,`,titleFontSize:`15px`,titleFontFamily:z,titleTopOffset:15,get styleBackgroundString(){return`<style>svg{background:${this.chartBackground};}</style>`}}})))()}var W,G,K,q,J,Y,X,Z,Q;function $(){return($=t((()=>{W=`
        <defs>
            <linearGradient id="lgrad" x1="0%" y1="50%" x2="100%" y2="50%" >
                <stop offset="0" stop-color="#ffffff" stop-opacity="0.8" />
                <stop offset="33.33%" stop-color="#ffffff" stop-opacity="0.8" />
                <stop offset="50%" stop-color="#ffffff" stop-opacity="0" />
                <stop offset="66.66%" stop-color="#ffffff" stop-opacity="0.8" />
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0.8" />
            </linearGradient>
        </defs>
    `,G=`
        <svg class="load-state bar-load-state" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 711 325">
            ${W}
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(-15 29)">
                    <g stroke="#EFF2F5" stroke-dasharray="4 4">
                        <path d="M.400592911 200.302477L710.674315 200.302477M.400592884 131.172748L710.674315 131.172748M.324410282 64.2071321L710.621499 64.2071321M.291004517.563888874L709.82431.563888889"/>
                    </g>
                    <g fill="#D2D6DF" transform="translate(63.08 11)">
                        <polygon points="-.08 176 23.92 176 23.92 255 -.08 255"/>
                        <polygon points="50.829 147 74.829 147 74.829 255 50.829 255"/>
                        <polygon points="254.465 0 278.465 0 278.465 255 254.465 255"/>
                        <polygon points="458.102 169 482.102 169 482.102 255 458.102 255"/>
                        <polygon points="152.647 82 176.647 82 176.647 255 152.647 255"/>
                        <polygon points="356.283 66 380.283 66 380.283 255 356.283 255"/>
                        <polygon points="559.92 229 583.92 229 583.92 255 559.92 255"/>
                        <polygon points="101.738 115 125.738 115 125.738 255 101.738 255"/>
                        <polygon points="305.374 42 329.374 42 329.374 255 305.374 255"/>
                        <polygon points="509.011 201 533.011 201 533.011 255 509.011 255"/>
                        <polygon points="203.556 19 227.556 19 227.556 255 203.556 255"/>
                        <polygon points="407.192 115 431.192 115 431.192 255 407.192 255"/>
                    </g>
                </g>
                <polygon fill="#D2D6DF" fill-rule="nonzero" points="0 295 711 295 711 294 0 294"/>
            </g>
            <rect class="chart-filter" fill="url(#lgrad)" x="-100%" y="0" width="300%" height="100%"></rect>
        </svg>
    `,K=`
        <svg class="load-state donut-load-state" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 376 331">
            ${W}
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(116 107)">
                    <circle cx="72" cy="72" r="72" stroke="#EFF2F5" stroke-linecap="round" stroke-width="9.6"/>
                    <path stroke="#D2D6DF" stroke-width="19.2" d="M126.153559,119.524055 C137.264629,106.845712 144,90.2321371 144,72.0444604 C144,32.2554036 111.764502,0 72,0"/>
                    <circle cx="72" cy="72" r="67.2" fill="#FFF"/>
                </g>
            </g>
            <rect class="chart-filter" fill="url(#lgrad)" x="-100%" y="0" width="300%" height="100%"></rect>
        </svg>
    `,q=`
        <svg
            class="load-state line-load-state"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 711 325"
        >
            ${W}
            <g transform="translate(-10 -10)">
                <path
                    id="chart-bg"
                    class="chart-bg"
                    style="stroke:#C3C6CF;"
                    d="M3.4,216.5h707.3 M3.4,160.5h707.3 M3.3,103.5h707.3 M3.3,48.5h707.6 M0.4,276.6H710H0.4z"
                />
                <polyline
                    id="chart-line"
                    class="chart-line"
                    style="stroke:#C3C6CF;stroke-width:4;fill:none;"
                    points="8.8,175.8 62.4,237.7 116.1,184.7 169.7,175.8 223.3,57 277,176.8 330.6,176.8 384.3,122.5 437.9,176.8 491.6,176.8 545.2,218.4 598.8,122.5 652.5,184.7 706.1,135.1 "
                />
            </g>
            <rect class="chart-filter" fill="url(#lgrad)" x="-100%" y="0" width="300%" height="100%"></rect>
        </svg>
    `,J=`
        <svg
            class="load-state stacked-area-load-state"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 711 325"
        >
            ${W}
            <path
                id="chart-bg"
                class="chart-bg"
                style="stroke:#C3C6CF;"
                d="M3.4,216.5h707.3 M3.4,160.5h707.3 M3.3,103.5h707.3 M3.3,48.5h707.6 M0.4,276.6H710H0.4z"
            />
            <g transform="translate(20 53)">
                <path
                    id="chart-area"
                    strokeLinecap="square"
                    d="M0.34233103,0.593688165 L709.977885,0.593688189"
                    transform="translate(.01 227.976)"
                />
                <path fill="#C3C6CF" d="M0.528124801,224.014648 L0.528124801,177.734375 L53.3834796,177.734375 C71.5390789,177.734375 86.8277373,168.972754 101.240241,151.662202 C112.578335,138.044258 121.139826,123.110227 136.974507,91.596773 C137.343842,90.8617404 139.300293,86.9654028 139.856735,85.8583549 C155.041692,55.6476711 163.354313,41.0906306 174.319873,27.7179171 C188.951312,9.87459412 204.885845,0.5 223.830634,0.5 C242.123071,0.5 257.291724,8.27027858 270.907992,23.1359289 C281.228683,34.4036118 289.135925,47.1272372 302.542017,72.085092 C303.275893,73.4513345 306.289669,79.0766612 307.063369,80.5168656 C321.41025,107.222876 330.088083,120.97663 341.470704,132.92446 C355.88994,148.05969 371.908861,155.792969 391.654853,155.792969 C412.142049,155.792969 428.763593,152.325614 442.880698,145.765582 C454.197328,140.506893 463.373931,133.679865 473.786035,123.626931 C476.528659,120.978915 486.44777,110.911455 488.791866,108.6483 C502.907223,95.0203436 514.194325,88.9355469 530.135322,88.9355469 C546.532652,88.9355469 559.505909,97.338499 575.973261,115.41103 C579.723508,119.526837 593.103621,135.086814 592.915496,134.871799 C605.09738,148.794859 614.368835,157.635549 625.072091,164.58539 C638.386599,173.230769 652.701021,177.734375 669.279853,177.734375 L673.779853,177.734375 L673.779853,224.014648 L0.528124801,224.014648 Z" />
            </g>
            <rect class="chart-filter" fill="url(#lgrad)" x="-100%" y="0" width="300%" height="100%"></rect>
        </svg>
    `,Y=`
        <svg
            class="load-state sparkline-load-state"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 711 325"
        >
            ${W}
            <g transform="translate(0 50)">
                <path fill="#C3C6CF" d="M0.528124801,224.014648 L0.528124801,177.734375 L53.3834796,177.734375 C71.5390789,177.734375 86.8277373,168.972754 101.240241,151.662202 C112.578335,138.044258 121.139826,123.110227 136.974507,91.596773 C137.343842,90.8617404 139.300293,86.9654028 139.856735,85.8583549 C155.041692,55.6476711 163.354313,41.0906306 174.319873,27.7179171 C188.951312,9.87459412 204.885845,0.5 223.830634,0.5 C242.123071,0.5 257.291724,8.27027858 270.907992,23.1359289 C281.228683,34.4036118 289.135925,47.1272372 302.542017,72.085092 C303.275893,73.4513345 306.289669,79.0766612 307.063369,80.5168656 C321.41025,107.222876 330.088083,120.97663 341.470704,132.92446 C355.88994,148.05969 371.908861,155.792969 391.654853,155.792969 C412.142049,155.792969 428.763593,152.325614 442.880698,145.765582 C454.197328,140.506893 463.373931,133.679865 473.786035,123.626931 C476.528659,120.978915 486.44777,110.911455 488.791866,108.6483 C502.907223,95.0203436 514.194325,88.9355469 530.135322,88.9355469 C546.532652,88.9355469 559.505909,97.338499 575.973261,115.41103 C579.723508,119.526837 593.103621,135.086814 592.915496,134.871799 C605.09738,148.794859 614.368835,157.635549 625.072091,164.58539 C638.386599,173.230769 652.701021,177.734375 669.279853,177.734375 L773.779853,177.734375 L773.77853,204.014648 L0.528124801,204.014648 Z"/>    
            </g>
            <rect class="chart-filter" fill="url(#lgrad)" x="-100%" y="0" width="300%" height="100%"></rect>
        </svg>
    `,X=()=>{let e=[];for(let t=0;t<5;t++)for(let n=0;n<12;n++)e.push(`<rect x="${n*56}" y="${t*56}" width="46" height="46" rx="2" fill="#C3C6CF" />`);return e.join(`
                `)},`${W}${X()}`,Z=`
        <svg
            class="load-state bullet-load-state"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 711 325"
        >
            ${W}
            <g transform="translate(0 118)">
                <rect width="711" height="64" rx="2" fill="#EFF2F5" />
                <rect y="18" width="430" height="28" rx="2" fill="#C3C6CF" />
                <rect x="556" y="8" width="6" height="48" rx="2" fill="#C3C6CF" />
            </g>
            <g fill="#EFF2F5" transform="translate(0 202)">
                <rect x="0" width="34" height="10" rx="2" />
                <rect x="169" width="34" height="10" rx="2" />
                <rect x="338" width="34" height="10" rx="2" />
                <rect x="507" width="34" height="10" rx="2" />
                <rect x="677" width="34" height="10" rx="2" />
            </g>
            <rect class="chart-filter" fill="url(#lgrad)" x="-100%" y="0" width="300%" height="100%"></rect>
        </svg>
    `,Q=`
        <svg
            class="load-state scatter-plot-load-state"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 711 325"
        >
            ${W}
            <g stroke="#EFF2F5" stroke-dasharray="4 4">
                <path d="M0 40.5L711 40.5M0 110.5L711 110.5M0 180.5L711 180.5M0 250.5L711 250.5" />
            </g>
            <g fill="#C3C6CF">
                <circle cx="62" cy="232" r="12" />
                <circle cx="118" cy="188" r="18" />
                <circle cx="171" cy="246" r="9" />
                <circle cx="214" cy="141" r="14" />
                <circle cx="263" cy="205" r="21" />
                <circle cx="319" cy="97" r="11" />
                <circle cx="352" cy="169" r="16" />
                <circle cx="408" cy="223" r="10" />
                <circle cx="447" cy="126" r="19" />
                <circle cx="502" cy="182" r="13" />
                <circle cx="549" cy="71" r="15" />
                <circle cx="587" cy="214" r="9" />
                <circle cx="631" cy="152" r="17" />
                <circle cx="676" cy="199" r="11" />
            </g>
            <g stroke="#EFF2F5" stroke-width="2">
                <path d="M0 290.5L711 290.5" />
            </g>
            <rect class="chart-filter" fill="url(#lgrad)" x="-100%" y="0" width="300%" height="100%"></rect>
        </svg>
    `})))()}export{q as a,J as c,b as d,y as f,$ as i,D as l,Z as n,Q as o,K as r,Y as s,G as t,U as u};