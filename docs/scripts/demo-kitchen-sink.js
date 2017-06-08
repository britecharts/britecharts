webpackJsonp([4,10],[
/* 0 */
/***/ (function(module, exports) {

	'use strict';
	
	function loadScript(name, fn) {
	    var head = document.getElementsByTagName('head')[0],
	        script = document.createElement('script');
	
	    script.type = 'text/javascript';
	    script.charset = 'utf-8';
	    script.defer = true;
	    script.src = name + '.js';
	    head.appendChild(script);
	    fn && fn();
	}
	window.onload = function () {
	
	    loadScript('/britecharts/scripts/demo-stacked-area');
	    loadScript('/britecharts/scripts/demo-bar');
	    loadScript('/britecharts/scripts/demo-donut');
	    loadScript('/britecharts/scripts/demo-line');
	    loadScript('/britecharts/scripts/demo-sparkline');
	    loadScript('/britecharts/scripts/demo-step');
	    loadScript('/britecharts/scripts/demo-brush');
	};

/***/ })
]);
//# sourceMappingURL=demo-kitchen-sink.js.map