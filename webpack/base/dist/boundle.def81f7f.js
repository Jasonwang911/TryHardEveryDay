!function(e){var n={};function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=n,o.d=function(t,r,e){o.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:e})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(r,t){if(1&t&&(r=o(r)),8&t)return r;if(4&t&&"object"==typeof r&&r&&r.__esModule)return r;var e=Object.create(null);if(o.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:r}),2&t&&"string"!=typeof r)for(var n in r)o.d(e,n,function(t){return r[t]}.bind(null,n));return e},o.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(r,"a",r),r},o.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},o.p="",o(o.s=2)}([function(t,r){t.exports=function(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}},function(t,r,e){t.exports=e(5)},function(t,r,e){"use strict";e.r(r);var n,o=e(0),i=e.n(o),a=e(3);console.log(a);log(n=function t(){i()(this,t),this.a=1})},function(t,r,i){"use strict";i.r(r),function(t){var r=i(1),e=i.n(r),n=(i(0),e.a.mark(o));i(6),t.exports="jason wang";function o(t){return e.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,1;case 2:case"end":return t.stop()}},n)}console.log(o().next())}.call(this,i(4)(t))},function(t,r){t.exports=function(t){if(!t.webpackPolyfill){var r=Object.create(t);r.children||(r.children=[]),Object.defineProperty(r,"loaded",{enumerable:!0,get:function(){return r.l}}),Object.defineProperty(r,"id",{enumerable:!0,get:function(){return r.i}}),Object.defineProperty(r,"exports",{enumerable:!0}),r.webpackPolyfill=1}return r}},function(t,r,e){var n=function(a){"use strict";var u,t=Object.prototype,l=t.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},o=r.iterator||"@@iterator",e=r.asyncIterator||"@@asyncIterator",n=r.toStringTag||"@@toStringTag";function c(t,r,e,n){var i,a,c,u,o=r&&r.prototype instanceof g?r:g,f=Object.create(o.prototype),l=new P(n||[]);return f._invoke=(i=t,a=e,c=l,u=h,function(t,r){if(u===y)throw new Error("Generator is already running");if(u===d){if("throw"===t)throw r;return S()}for(c.method=t,c.arg=r;;){var e=c.delegate;if(e){var n=j(e,c);if(n){if(n===v)continue;return n}}if("next"===c.method)c.sent=c._sent=c.arg;else if("throw"===c.method){if(u===h)throw u=d,c.arg;c.dispatchException(c.arg)}else"return"===c.method&&c.abrupt("return",c.arg);u=y;var o=s(i,a,c);if("normal"===o.type){if(u=c.done?d:p,o.arg===v)continue;return{value:o.arg,done:c.done}}"throw"===o.type&&(u=d,c.method="throw",c.arg=o.arg)}}),f}function s(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}a.wrap=c;var h="suspendedStart",p="suspendedYield",y="executing",d="completed",v={};function g(){}function i(){}function f(){}var m={};m[o]=function(){return this};var w=Object.getPrototypeOf,b=w&&w(w(k([])));b&&b!==t&&l.call(b,o)&&(m=b);var x=f.prototype=g.prototype=Object.create(m);function L(t){["next","throw","return"].forEach(function(r){t[r]=function(t){return this._invoke(r,t)}})}function E(u,f){var r;this._invoke=function(e,n){function t(){return new f(function(t,r){!function r(t,e,n,o){var i=s(u[t],u,e);if("throw"!==i.type){var a=i.arg,c=a.value;return c&&"object"==typeof c&&l.call(c,"__await")?f.resolve(c.__await).then(function(t){r("next",t,n,o)},function(t){r("throw",t,n,o)}):f.resolve(c).then(function(t){a.value=t,n(a)},function(t){return r("throw",t,n,o)})}o(i.arg)}(e,n,t,r)})}return r=r?r.then(t,t):t()}}function j(t,r){var e=t.iterator[r.method];if(e===u){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=u,j(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var n=s(e,t.iterator,r.arg);if("throw"===n.type)return r.method="throw",r.arg=n.arg,r.delegate=null,v;var o=n.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=u),r.delegate=null,v):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function O(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function _(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function P(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function k(r){if(r){var t=r[o];if(t)return t.call(r);if("function"==typeof r.next)return r;if(!isNaN(r.length)){var e=-1,n=function t(){for(;++e<r.length;)if(l.call(r,e))return t.value=r[e],t.done=!1,t;return t.value=u,t.done=!0,t};return n.next=n}}return{next:S}}function S(){return{value:u,done:!0}}return i.prototype=x.constructor=f,f.constructor=i,f[n]=i.displayName="GeneratorFunction",a.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===i||"GeneratorFunction"===(r.displayName||r.name))},a.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,f):(t.__proto__=f,n in t||(t[n]="GeneratorFunction")),t.prototype=Object.create(x),t},a.awrap=function(t){return{__await:t}},L(E.prototype),E.prototype[e]=function(){return this},a.AsyncIterator=E,a.async=function(t,r,e,n,o){void 0===o&&(o=Promise);var i=new E(c(t,r,e,n),o);return a.isGeneratorFunction(r)?i:i.next().then(function(t){return t.done?t.value:i.next()})},L(x),x[n]="Generator",x[o]=function(){return this},x.toString=function(){return"[object Generator]"},a.keys=function(e){var n=[];for(var t in e)n.push(t);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},a.values=k,P.prototype={constructor:P,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=u,this.done=!1,this.delegate=null,this.method="next",this.arg=u,this.tryEntries.forEach(_),!t)for(var r in this)"t"===r.charAt(0)&&l.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=u)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function t(t,r){return i.type="throw",i.arg=e,n.next=t,r&&(n.method="next",n.arg=u),!!r}for(var r=this.tryEntries.length-1;0<=r;--r){var o=this.tryEntries[r],i=o.completion;if("root"===o.tryLoc)return t("end");if(o.tryLoc<=this.prev){var a=l.call(o,"catchLoc"),c=l.call(o,"finallyLoc");if(a&&c){if(this.prev<o.catchLoc)return t(o.catchLoc,!0);if(this.prev<o.finallyLoc)return t(o.finallyLoc)}else if(a){if(this.prev<o.catchLoc)return t(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return t(o.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;0<=e;--e){var n=this.tryEntries[e];if(n.tryLoc<=this.prev&&l.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=r&&r<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=r,o?(this.method="next",this.next=o.finallyLoc,v):this.complete(i)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),v},finish:function(t){for(var r=this.tryEntries.length-1;0<=r;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),_(e),v}},catch:function(t){for(var r=this.tryEntries.length-1;0<=r;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;_(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,e){return this.delegate={iterator:k(t),resultName:r,nextLoc:e},"next"===this.method&&(this.arg=u),v}},a}(t.exports);try{regeneratorRuntime=n}catch(t){Function("r","regeneratorRuntime = r")(n)}},function(t,r,e){}]);