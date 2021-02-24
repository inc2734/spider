!function(){"use strict";function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function t(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}function e(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&n(t,e)}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function n(t,e){return(n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function u(o){var u=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}();return function(){var t,e,n,r,i=c(o);return e=u?(t=c(this).constructor,Reflect.construct(i,arguments,t)):i.apply(this,arguments),n=this,!(r=e)||"object"!=typeof r&&"function"!=typeof r?s(n):r}}function i(t){return function(t){if(Array.isArray(t))return o(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function d(t,e,n,r,i){var o,u=2<arguments.length&&void 0!==n?n:{},a=!(3<arguments.length&&void 0!==r)||r,c=4<arguments.length&&void 0!==i&&i;try{o=new CustomEvent(e,{bubbles:a,cancelable:c,detail:u})}catch(t){(o=document.createEvent("CustomEvent")).initCustomEvent(e,a,c,u)}t.dispatchEvent(o)}function l(t){var n=this;t&&(this.dom=t,this.getId=function(){return Number(t.getAttribute("data-id"))},this.top=function(){return n.dom.getBoundingClientRect().top},this.left=function(){return n.dom.getBoundingClientRect().left},this.right=function(){return n.left()+n.offsetWidth()},this.offsetWidth=function(){return n.dom.offsetWidth},this.style=function(t,e){n.dom.style[t]=e},this.active=function(){n.dom.setAttribute("data-active","true")},this.inactive=function(){n.dom.removeAttribute("data-active","true")},this.isActive=function(){return"true"===n.dom.getAttribute("data-active")})}function f(t){throw new Error("".concat(t," is abstract method. Override it with the child class."))}var v=function(){function n(t,e){var r=this;a(this,n),this.dom=t,this.args=e,this.slides=[].slice.call(this.dom.querySelectorAll(this.args.slide)).map(function(t){return new l(t)}),this.historyActiveSlideIds=[];function i(){var n;if(clearTimeout(u),1<(n=r.slides.map(function(t){return t.top()})).filter(function(t,e){return e===n.lastIndexOf(t)}).length&&0<o)return u=setTimeout(i,100),void o--;r.setWidth(""),r.beforeInit(),r.setWidth("".concat(Math.floor(r.offsetWidth()),"px")),r.setCurrent(0),r.afterInit()}var o=10,u=void 0;i(),window.addEventListener("resize",function(){return setTimeout(i,250)},!1),new MutationObserver(function(){var t;!r.dom.querySelector('[data-id="'.concat(r.getCurrent(),'"]'))||(t=r.slides[r.getCurrent()])&&(d(r.dom,"updateCurrent"),r.moveTo(t))}).observe(this.dom,{attributes:!0,attributeFilter:["data-current"]})}return t(n,[{key:"scrollLeft",value:function(){return this.dom.scrollLeft}},{key:"offsetWidth",value:function(){return this.dom.offsetWidth}},{key:"left",value:function(){return this.dom.getBoundingClientRect().left}},{key:"right",value:function(){return this.left()+this.offsetWidth()}},{key:"setWidth",value:function(t){this.dom.style.width=t}},{key:"setCurrent",value:function(t){this.dom.setAttribute("data-current",Number(t))}},{key:"getCurrent",value:function(){return Number(this.dom.getAttribute("data-current"))}},{key:"getSlides",value:function(){return this.slides}},{key:"getSlide",value:function(t){return this.slides[t]}},{key:"moveTo",value:function(){f("abstractCanvas.moveTo")}},{key:"beforeInit",value:function(){f("abstractCanvas.beforeInit")}},{key:"afterInit",value:function(){f("abstractCanvas.afterInit")}}]),n}(),h=function(){e(o,v);var i=u(o);function o(t,e){var n,r;return a(this,o),(n=i.call(this,t,e)).smoothScrollToTimerId=void 0,n.canvasScrollTimerId=void 0,n.setScrollLeft=function(t){return n.dom.scrollLeft=t},n.setScrollLeft(0),n.handleScroll=n.handleScroll.bind(s(n)),n.dom.addEventListener("scroll",n.handleScroll,!1),"undefined"!=typeof IntersectionObserver&&(r=new IntersectionObserver(function(t){t.forEach(function(t){var e=new l(t.target);t.isIntersecting?n.slides[e.getId()].active():n.slides[e.getId()].inactive()})},{root:n.dom,rootMargin:"0px -1px",threshold:0}),n.slides.forEach(function(t){r.observe(t.dom)})),n}return t(o,[{key:"beforeInit",value:function(){}},{key:"afterInit",value:function(){}},{key:"handleScroll",value:function(){var t=this;clearTimeout(this.canvasScrollTimerId),this.canvasScrollTimerId=setTimeout(function(){0!==t.getSlide(t.getCurrent()).left()&&t.setCurrentForWheel(),d(t.dom,"scrollEnd")},500)}},{key:"setCurrentForWheel",value:function(){var t=this.slides.reduce(function(t,e){return t.left()<0||!(e.left()<0)&&t.left()>e.left()?e:t});this.setCurrent(t.getId()),d(this.dom,"setCurrentForWheel")}},{key:"moveTo",value:function(t){var e,n,r,i=this,o=this.scrollLeft(),u=o+(t.left()-this.left());clearInterval(this.smoothScrollToTimerId),(0<u-o?"next":u!==o&&"prev")&&(0!=(e=u-o)&&(n=e/(1e3/60),r=0,this.smoothScrollToTimerId=setInterval(function(){var t;r+=Math.abs(n),i.setScrollLeft(o+e*(t=r/Math.abs(e),Math.sqrt(1-Math.pow(t-1,2)))),Math.abs(e)<=r&&(clearInterval(i.smoothScrollToTimerId),i.setScrollLeft(u))},1e3/60)))}}]),o}(),m=function(){e(i,v);var r=u(i);function i(t,e){var n;return a(this,i),n=r.call(this,t,e),t.addEventListener("updateCurrent",function(){n.getSlides().forEach(function(t){n.getCurrent()===t.getId()?t.active():t.inactive()})},!1),n}return t(i,[{key:"beforeInit",value:function(){}},{key:"afterInit",value:function(){this.slides.forEach(function(t,e){0!==e?(t.style("left","".concat(-1*e*100,"%")),t.inactive()):t.active()})}},{key:"moveTo",value:function(e){var n=this;e.isActive()&&([].slice.call(this.dom.querySelectorAll('[data-active="false"]')).map(function(t){return new l(t)}).forEach(function(t){return t.inactive()}),e.active(),e.dom.addEventListener("transitionend",function t(){e.dom.removeEventListener("transitionend",t,!1),d(n.dom,"fadeEnd")},!1))}}]),i}();function b(t,e){return new(e.fade?m:h)(t,e)}function y(t,e){return t.addEventListener("click",function(){return e.handleClick()},!1),this}function p(t,e){return t.addEventListener("click",function(){return e.handleClick()},!1),this}function g(t,e){var n=this;return this.active=function(){t.setAttribute("aria-current","true")},this.inactive=function(){t.removeAttribute("aria-current")},this.getId=function(){return Number(t.getAttribute("data-id"))},e.initial?this.active():this.inactive(),t.addEventListener("click",function(t){return e.handleClick(t)},!1),new MutationObserver(function(t){t.forEach(function(t){new l(t.target).isActive()?n.active():n.inactive()})}).observe(e.relatedSlide.dom,{attributes:!0,attributeFilter:["data-active"]}),this}var w=function(t,n){var r=[];return[].slice.call(t).forEach(function(t){var e=new C(t,n);e.initialized&&r.push(e)}),r},S=function(l,f){return new function(){function o(){return Number(l.getAttribute("data-interval"))}function u(){return clearTimeout(n)}function a(e){s&&(e<=0||(n=setTimeout(function t(){s.getCurrent()===i(s.getSlides()).pop().getId()?c.moveTo(0):c.next(),n=setTimeout(t,e)},e)))}var c=this,e=l.cloneNode(!0),s=void 0,n=void 0;return this.initialized=!1,this.destroy=function(){var t=e.cloneNode(!0);l.parentNode.insertBefore(t,l),l.remove(),l=t,c.initialized=!1},this.init=function(){var t,e,n,r,i;c.initialized||(t=l.querySelector(f.canvas))&&(e=l.querySelector(f.prevArrow),n=l.querySelector(f.nextArrow),r=l.querySelectorAll(f.dot),e&&new y(e,{handleClick:function(){u(),c.prev();var t=o();0<t&&a(t)}}),n&&new p(n,{handleClick:function(){u(),c.next();var t=o();0<t&&a(t)}}),!(s=new b(t,{slide:f.slide,fade:"true"===l.getAttribute("data-fade")}))||0<(i=o())&&(a(i),t.addEventListener("setCurrentForWheel",function(){u(),a(i)},!1)),s&&0<r.length&&[].slice.call(r).forEach(function(t){new g(t,{initial:s.getCurrent()===Number(t.getAttribute("data-id")),relatedSlide:s.getSlide(Number(t.getAttribute("data-id"))),handleClick:function(t){u(),c.moveTo(t.currentTarget.getAttribute("data-id"));var e=o();0<e&&a(e)}})}),c.initialized=!0,l.setAttribute("data-initialized","true"),d(l,"initialized"))},this.prev=function(){var t,e=!!s&&s.getCurrent();!1!==e&&0!==e&&(t=e-1,c.moveTo(t))},this.next=function(){var t,e,n=!!s&&s.getCurrent();!1!==n&&((t=i(s.getSlides()).pop()).isActive()||n!==t.getId()&&(e=n+1,c.moveTo(e)))},this.moveTo=function(t){s&&s.getSlide(t)&&s.setCurrent(t)},this.init(),this}};function C(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n={canvas:".spider__canvas",slide:".spider__slide",prevArrow:'.spider__arrow[data-direction="prev"]',nextArrow:'.spider__arrow[data-direction="next"]',dot:".spider__dot"},r={};for(var i in n)r[i]=void 0!==e[i]?e[i]:n[i];if("string"!=typeof t)return!0==t instanceof NodeList?w(t,r):!0==t instanceof HTMLElement?S(t,r):void 0;if(t.match(/^#/)){var o=document.querySelector(t);if(!o)return;return S(o,r)}var u=document.querySelectorAll(t);return u.length<1?void 0:w(u,r)}document.addEventListener("DOMContentLoaded",function(){new C(".spider-container"),new C("#using-id-selector")},!1)}();
