;(function(){var x=Function('return this')();if(!x.fest)x.fest={};x.fest['static/components/MovieDescription/MovieDescription.tmpl']=function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_element_stack = [],__fest_short_tags = {"area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true},__fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,__fest_htmlchars = /[&<>"]/g,__fest_htmlchars_test = /[&<>"]/,__fest_jshash = {"\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E"},__fest_htmlhash = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"},__fest_escapeJS = function __fest_escapeJS(value) {
		if (typeof value === 'string') {
			if (__fest_jschars_test.test(value)) {
				return value.replace(__fest_jschars, __fest_replaceJS);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceJS = function __fest_replaceJS(chr) {
		return __fest_jshash[chr];
	},__fest_escapeHTML = function __fest_escapeHTML(value) {
		if (typeof value === 'string') {
			if (__fest_htmlchars_test.test(value)) {
				return value.replace(__fest_htmlchars, __fest_replaceHTML);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceHTML = function __fest_replaceHTML(chr) {
		return __fest_htmlhash[chr];
	},__fest_extend = function __fest_extend(dest, src) {
		for (var key in src) {
			if (src.hasOwnProperty(key)) {
				dest[key] = src[key];
			}
		}
	},__fest_param = function __fest_param(fn) {
		fn.param = true;
		return fn;
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}var moviesData=__fest_context;__fest_buf+=("<style type=\"text\/css\">.movie-poster-description {\n    display: inline-block;\n    width: 50%;\n    height: 50%;\n    border: 3px solid red; \/* Белая рамка *\/\n    border-radius: 10px; \/* Радиус скругления *\/\n    \/*margin-bottom: 4px;*\/\n    color: white;\n}\n\n.description {\n    color: white;\n    border: 3px solid red; \/* Белая рамка *\/\n    border-radius: 10px; \/* Радиус скругления *\/\n}\n\n.px-10 {\n    padding-left: 10px;\n    padding-right: 10px;\n}\n\n.mlb-4 {\n    margin-left: 4px;\n    margin-bottom: 4px;\n}\n</style><div class=\"d-flex w-1170 align-center\"><div class=\"movie-poster-description\"><img alt=\"\" src=\"http:\/\/95.163.249.116:8080");try{__fest_buf+=(__fest_escapeHTML(moviesData.PathToAvatar))}catch(e){__fest_log_error(e.message + "9");}__fest_buf+=("\"/></div><div><div class=\"red-border mlb-4 px-10\"><h2 align=\"left\">");try{__fest_buf+=(__fest_escapeHTML(moviesData.Name))}catch(e){__fest_log_error(e.message + "17");}__fest_buf+=("</h2><p align=\"justify\">");try{__fest_buf+=(__fest_escapeHTML(moviesData.Description))}catch(e){__fest_log_error(e.message + "20");}__fest_buf+=("</p></div><div class=\"d-flex flex-row\"><div class=\"red-border mlb-4 px-10\" style=\"padding-bottom: 10px\"><h2 align=\"left\">Оценка</h2><form method=\"POST\"><select class=\"custom-select\"><option selected=\"true\" disabled=\"true\">Оцените фильм</option><option value=\"1\">1</option><option value=\"2\">2</option><option value=\"3\">3</option><option value=\"4\">4</option><option value=\"5\">5</option><option value=\"6\">6</option><option value=\"7\">7</option><option value=\"8\">8</option><option value=\"9\">9</option><option value=\"10\">10</option></select><button>Оценить</button></form></div><div class=\"red-border mlb-4 px-10\" style=\"padding-bottom: 10px\"><h2 align=\"left\">Рейтинг фильма:</h2><h2 align=\"left\">");try{__fest_buf+=(__fest_escapeHTML(moviesData.Rating))}catch(e){__fest_log_error(e.message + "45");}__fest_buf+=("\/10</h2></div></div></div></div>\u003E");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}})();