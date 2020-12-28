!function(){"use strict";function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function t(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}function e(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&r(t,e)}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function r(t,e){return(r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function a(o){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}();return function(){var t,e,r,n,i=c(o);return e=a?(t=c(this).constructor,Reflect.construct(i,arguments,t)):i.apply(this,arguments),r=this,!(n=e)||"object"!=typeof n&&"function"!=typeof n?s(r):n}}function i(t){return function(t){if(Array.isArray(t))return o(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function d(t,e,r,n,i){var o,a=2<arguments.length&&void 0!==r?r:{},u=!(3<arguments.length&&void 0!==n)||n,c=4<arguments.length&&void 0!==i&&i;try{o=new CustomEvent(e,{bubbles:u,cancelable:c,detail:a})}catch(t){(o=document.createEvent("CustomEvent")).initCustomEvent(e,u,c,a)}t.dispatchEvent(o)}function v(t){var r=this;t&&(this.dom=t,this.getId=function(){return Number(t.getAttribute("data-id"))},this.top=function(){return r.dom.getBoundingClientRect().top},this.left=function(){return r.dom.getBoundingClientRect().left},this.right=function(){return r.left()+r.offsetWidth()},this.offsetWidth=function(){return r.dom.offsetWidth},this.style=function(t,e){r.dom.style[t]=e},this.active=function(){r.dom.setAttribute("data-active","true")},this.inactive=function(){r.dom.removeAttribute("data-active","true")},this.isActive=function(){return"true"===r.dom.getAttribute("data-active")})}function l(t){throw new Error("".concat(t," is abstract method. Override it with the child class."))}var f=function(){function r(t,e){var n=this;u(this,r),this.target=t,this.args=e,this.slides=[].slice.call(this.target.querySelectorAll(this.args.slide)).map(function(t){return new v(t)}),this.historyActiveSlideIds=[];function i(){var r;if(clearTimeout(a),1<(r=n.slides.map(function(t){return t.top()})).filter(function(t,e){return e===r.lastIndexOf(t)}).length&&0<o)return a=setTimeout(i,100),void o--;n.setWidth(""),n.beforeInit(),n.setWidth("".concat(Math.floor(n.offsetWidth()),"px")),n.setCurrent(0),n.afterInit()}var o=10,a=void 0;i(),window.addEventListener("resize",function(){return setTimeout(i,250)},!1),new MutationObserver(function(){var t;!n.target.querySelector('[data-id="'.concat(n.getCurrent(),'"]'))||(t=n.slides[n.getCurrent()])&&n.moveTo(t)}).observe(this.target,{attributes:!0,attributeFilter:["data-current"]})}return t(r,[{key:"scrollLeft",value:function(){return this.target.scrollLeft}},{key:"offsetWidth",value:function(){return this.target.offsetWidth}},{key:"left",value:function(){return this.target.getBoundingClientRect().left}},{key:"right",value:function(){return this.left()+this.offsetWidth()}},{key:"setWidth",value:function(t){this.target.style.width=t}},{key:"setCurrent",value:function(t){this.target.setAttribute("data-current",Number(t))}},{key:"getCurrent",value:function(){return Number(this.target.getAttribute("data-current"))}},{key:"getSlides",value:function(){return this.slides}},{key:"getSlide",value:function(t){return this.slides[t]}},{key:"moveTo",value:function(){l("abstractCanvas.moveTo")}},{key:"beforeInit",value:function(){l("abstractCanvas.beforeInit")}},{key:"afterInit",value:function(){l("abstractCanvas.afterInit")}}]),r}(),h=function(){e(o,f);var i=a(o);function o(t,e){var r;u(this,o),(r=i.call(this,t,e)).smoothScrollToTimerId=void 0,r.canvasScrollTimerId=void 0,r.setScrollLeft=function(t){return r.target.scrollLeft=t},r.setScrollLeft(0),r.handleScroll=r.handleScroll.bind(s(r)),r.target.addEventListener("scroll",r.handleScroll,!1);var n=new IntersectionObserver(function(t){t.forEach(function(t){var e=new v(t.target);t.isIntersecting?r.slides[e.getId()].active():r.slides[e.getId()].inactive()})},{root:r.target,rootMargin:"0px -1px",threshold:0});return r.slides.forEach(function(t){n.observe(t.dom)}),r}return t(o,[{key:"beforeInit",value:function(){}},{key:"afterInit",value:function(){}},{key:"handleScroll",value:function(){var t=this;clearTimeout(this.canvasScrollTimerId),this.canvasScrollTimerId=setTimeout(function(){t.setCurrentForWheel(),d(t.target,"scrollEnd")},250)}},{key:"setCurrentForWheel",value:function(){var t=this.slides.reduce(function(t,e){return t.left()<0||!(e.left()<0)&&t.left()>e.left()?e:t});this.setCurrent(t.getId())}},{key:"moveTo",value:function(t){var e,r,n,i=this,o=this.scrollLeft(),a=o+(t.left()-this.left());clearInterval(this.smoothScrollToTimerId),(0<a-o?"next":a!==o&&"prev")&&(0!=(e=a-o)&&(r=e/(1e3/60),n=0,this.smoothScrollToTimerId=setInterval(function(){var t;n+=Math.abs(r),i.setScrollLeft(o+e*(t=n/Math.abs(e),Math.sqrt(1-Math.pow(t-1,2)))),Math.abs(e)<=n&&(clearInterval(i.smoothScrollToTimerId),i.setScrollLeft(a))},1e3/60)))}}]),o}(),g=function(){e(i,f);var n=a(i);function i(t,e){var r;return u(this,i),r=n.call(this,t,e),new MutationObserver(function(t){t.forEach(function(t){var e=Number(t.target.getAttribute("data-current"));r.slides.forEach(function(t){e===t.getId()?t.active():t.inactive()})})}).observe(r.target,{attributes:!0,attributeFilter:["data-current"]}),r}return t(i,[{key:"beforeInit",value:function(){}},{key:"afterInit",value:function(){this.slides.forEach(function(t,e){0!==e?(t.style("left","".concat(-1*e*100,"%")),t.inactive()):t.active()})}},{key:"moveTo",value:function(t){t.isActive()&&([].slice.call(this.target.querySelectorAll('[data-active="false"]')).map(function(t){return new v(t)}).forEach(function(t){return t.inactive()}),t.active())}}]),i}();function b(t,e){return new(e.fade?g:h)(t,e)}function m(t,e){return t.addEventListener("click",function(){return e.handleClick()},!1),this}function y(t,e){return t.addEventListener("click",function(){return e.handleClick()},!1),this}function p(t,e){return this.active=function(){t.setAttribute("aria-current","true")},this.inactive=function(){t.removeAttribute("aria-current")},this.getId=function(){return Number(t.getAttribute("data-id"))},t.addEventListener("click",function(t){return e.handleClick(t)},!1),this}var w=function(t,r){var n=[];return[].slice.call(t).forEach(function(t){var e=new I(t,r);e.initialized&&n.push(e)}),n},S=function(l,f){return new function(){function o(){return Number(l.getAttribute("data-interval"))}function a(){return clearTimeout(r)}function u(e){a(),s&&(e<=0||(r=setTimeout(function t(){s.getCurrent()===i(s.getSlides()).pop().getId()?c.moveTo(0):c.next(),r=setTimeout(t,e)},e)))}var c=this,e=l.cloneNode(!0),s=void 0,r=void 0;return this.initialized=!1,this.destroy=function(){var t=e.cloneNode(!0);l.parentNode.insertBefore(t,l),l.remove(),l=t,c.initialized=!1},this.init=function(){var t,e,r,n,i;c.initialized||(t=l.querySelector(f.canvas))&&(e=l.querySelector(f.prevArrow),r=l.querySelector(f.nextArrow),n=l.querySelectorAll(f.dot),e&&new m(e,{handleClick:function(){a(),c.prev();var t=o();0<t&&u(t)}}),r&&new y(r,{handleClick:function(){a(),c.next();var t=o();0<t&&u(t)}}),!(s=new b(t,{slide:f.slide,fade:"true"===l.getAttribute("data-fade")}))||0<(i=o())&&u(i),s&&0<n.length&&[].slice.call(n).forEach(function(t){var e=new p(t,{handleClick:function(t){a(),s.setCurrent(t.currentTarget.getAttribute("data-id"));var e=o();0<e&&u(e)}});s.getCurrent()===e.getId()?e.active():e.inactive(),new MutationObserver(function(t){t.forEach(function(t){new v(t.target).isActive()?e.active():e.inactive()})}).observe(s.getSlide(e.getId()).dom,{attributes:!0,attributeFilter:["data-active"]})}),c.initialized=!0,l.setAttribute("data-initialized","true"),d(l,"initialized"))},this.prev=function(){var t,e=!!s&&s.getCurrent();!1!==e&&0<e&&(t=e-1,s.setCurrent(t),s.getSlide(t).isActive()&&c.prev())},this.next=function(){var t,e=!!s&&s.getCurrent();!1!==e&&s.slides.length-1>e&&(t=e+1,s.setCurrent(t),s.getSlide(t).isActive()&&c.next())},this.moveTo=function(t){s&&s.getSlide(t)&&s.setCurrent(t)},this.init(),this}};function I(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},r={canvas:".spider__canvas",slide:".spider__slide",prevArrow:'.spider__arrow[data-direction="prev"]',nextArrow:'.spider__arrow[data-direction="next"]',dot:".spider__dot"},n={};for(var i in r)n[i]=void 0!==e[i]?e[i]:r[i];if("string"!=typeof t)return!0==t instanceof NodeList?w(t,n):!0==t instanceof HTMLElement?S(t,n):void 0;if(t.match(/^#/)){var o=document.querySelector(t);if(!o)return;return S(o,n)}var a=document.querySelectorAll(t);return a.length<1?void 0:w(a,n)}document.addEventListener("DOMContentLoaded",function(){new I(".spider-container"),new I("#using-id-selector")},!1)}();
