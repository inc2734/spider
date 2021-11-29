!function(){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function t(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}function e(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&n(t,e)}function i(t){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function n(t,e){return(n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function u(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function c(n){var r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}();return function(){var t,e=i(n);return function(t,e){if(e&&("object"==typeof e||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return u(t)}(this,r?(t=i(this).constructor,Reflect.construct(e,arguments,t)):e.apply(this,arguments))}}function o(t){return function(t){if(Array.isArray(t))return a(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return a(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Map"===(n="Object"===n&&t.constructor?t.constructor.name:n)||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function l(t,e,n,r,i){var o,n=2<arguments.length&&void 0!==n?n:{},r=!(3<arguments.length&&void 0!==r)||r,i=4<arguments.length&&void 0!==i&&i;try{o=new CustomEvent(e,{bubbles:r,cancelable:i,detail:n})}catch(t){(o=document.createEvent("CustomEvent")).initCustomEvent(e,r,i,n)}t.dispatchEvent(o)}function d(t){var n=this;t&&(this.dom=t,this.getId=function(){return Number(t.getAttribute("data-id"))},this.top=function(){return n.dom.getBoundingClientRect().top},this.left=function(){return n.dom.getBoundingClientRect().left},this.right=function(){return n.left()+n.offsetWidth()},this.offsetWidth=function(){return n.dom.offsetWidth},this.style=function(t,e){n.dom.style[t]=e},this.active=function(){n.dom.setAttribute("data-active","true")},this.inactive=function(){n.dom.removeAttribute("data-active")},this.visible=function(){n.dom.setAttribute("data-visible","true")},this.invisible=function(){n.dom.removeAttribute("data-visible")},this.isActive=function(){return"true"===n.dom.getAttribute("data-active")})}function f(t){throw new Error("".concat(t," is abstract method. Override it with the child class."))}var h=function(){function n(t,e){var r=this;s(this,n),this.dom=t,this.args=e,this.slides=[].slice.call(this.dom.querySelectorAll(this.args.slide)).map(function(t){return new d(t)}),this.historyActiveSlideIds=[],this.dragStartX=void 0,this.dragStartScrollLeft=void 0,this.dragStartTime=void 0,this.isDrag=!1;function i(){var n;if(clearTimeout(a),1<(n=r.slides.map(function(t){return t.top()})).filter(function(t,e){return e===n.lastIndexOf(t)}).length&&0<o)return a=setTimeout(i,100),void o--;r.dragStartX=void 0,r.dragStartScrollLeft=void 0,r.dragStartTime=void 0,r.isDrag=!1,r.dom.classList.remove("is-dragging"),r.setWidth(""),r.beforeInit();var t="".concat(Math.floor(r.offsetWidth()),"px");r.setWidth(t),r.setCurrent(0),r.args.container.setProperty("--spider-reference-width","".concat(r.referenceWidth(),"px")),r.args.container.setProperty("--spider-canvas-width",t),r.afterInit()}var o=10,a=void 0;i(),window.addEventListener("resize",function(){return setTimeout(i,250)},!1),new MutationObserver(function(){var t;!r.dom.querySelector('[data-id="'.concat(r.getCurrent(),'"]'))||(t=r.slides[r.getCurrent()])&&(l(r.dom,"updateCurrent"),r.moveTo(t))}).observe(this.dom,{attributes:!0,attributeFilter:["data-current"]}),this._handleMousedown=this._handleMousedown.bind(this),this.dom.addEventListener("mousedown",this._handleMousedown,!1),this._handleMousemove=this._handleMousemove.bind(this),this.dom.addEventListener("mousemove",this._handleMousemove,!1),this._handleMouseup=this._handleMouseup.bind(this),this.dom.addEventListener("mouseup",this._handleMouseup,!1),this.dom.addEventListener("mouseleave",this._handleMouseup,!1)}return t(n,[{key:"_handleMousedown",value:function(t){t.preventDefault(),t.stopPropagation(),this.dragStartX=t.clientX,this.dragStartScrollLeft=this.scrollLeft(),this.dragStartTime=new Date,this.isDrag=!0,this.handleMousedown(t)}},{key:"handleMousedown",value:function(t){}},{key:"_handleMousemove",value:function(t){t.preventDefault(),t.stopPropagation(),this.isDrag&&(this.dom.classList.add("is-dragging"),this.handleMousemove(t))}},{key:"handleMousemove",value:function(t){}},{key:"_handleMouseup",value:function(t){t.preventDefault(),t.stopPropagation(),this.isDrag&&(this.handleMouseup(t),this.dragStartX=void 0,this.dragStartScrollLeft=void 0,this.dragStartTime=void 0,this.isDrag=!1,this.dom.classList.remove("is-dragging"),this.afterHandleMouseup())}},{key:"handleMouseup",value:function(t){}},{key:"afterHandleMouseup",value:function(){}},{key:"scrollLeft",value:function(){return this.dom.scrollLeft}},{key:"offsetWidth",value:function(){return this.dom.offsetWidth}},{key:"scrollWidth",value:function(){return this.dom.scrollWidth}},{key:"referenceWidth",value:function(){return this.args.reference.clientWidth}},{key:"referenceOffsetWidth",value:function(){return this.args.reference.offsetWidth}},{key:"referenceLeft",value:function(){return this.args.reference.getBoundingClientRect().left}},{key:"left",value:function(){var t=this.referenceWidth(),e=this.referenceOffsetWidth();return this.referenceLeft()+(e-t)/2}},{key:"setWidth",value:function(t){this.dom.style.width=t}},{key:"setCurrent",value:function(t){this.dom.setAttribute("data-current",Number(t))}},{key:"getCurrent",value:function(){return Number(this.dom.getAttribute("data-current"))}},{key:"getSlides",value:function(){return this.slides}},{key:"getSlide",value:function(t){return this.slides[t]}},{key:"setCurrentForWheel",value:function(){f("abstractCanvas.setCurrentForWheel")}},{key:"moveTo",value:function(t){f("abstractCanvas.moveTo")}},{key:"beforeInit",value:function(){}},{key:"afterInit",value:function(){}}]),n}(),v=function(){e(a,h);var o=c(a);function a(t,e){var n,r,i;return s(this,a),(n=o.call(this,t,e)).smoothScrollToTimerId=void 0,n.canvasScrollTimerId=void 0,n.setScrollLeft=function(t){return n.dom.scrollLeft=t},n.setScrollLeft(0),n.handleScroll=n.handleScroll.bind(u(n)),n.dom.addEventListener("scroll",n.handleScroll,!1),"undefined"!=typeof IntersectionObserver&&(r=new IntersectionObserver(function(t){t.forEach(function(t){var e=new d(t.target);t.isIntersecting?e.active():e.inactive()})},{root:n.dom,rootMargin:"0px -1.5px",threshold:[.75,1]}),n.slides.forEach(function(t){r.observe(t.dom)}),i=new IntersectionObserver(function(t){t.forEach(function(t){var e=new d(t.target);t.isIntersecting?e.visible():e.invisible()})},{root:n.dom,rootMargin:"0px -1px",threshold:[0]}),n.slides.forEach(function(t){i.observe(t.dom)})),n}return t(a,[{key:"handleScroll",value:function(){var n=this;clearTimeout(this.canvasScrollTimerId),this.isDrag||(this.canvasScrollTimerId=setTimeout(function(){var t=n.left(),e=n.getSlide(n.getCurrent()).left();1<Math.abs(t-e)&&n.setCurrentForWheel(),l(n.dom,"scrollEnd")},500))}},{key:"handleMousedown",value:function(t){clearTimeout(this.canvasScrollTimerId)}},{key:"handleMousemove",value:function(t){this.setScrollLeft(this.dragStartScrollLeft+this.dragStartX-t.clientX)}},{key:"handleMouseup",value:function(t){var e=(new Date).getTime()-this.dragStartTime.getTime(),t=t.clientX-this.dragStartX;e<300&&(e=this.scrollLeft()-t/e*100,this.moveToLeft(e))}},{key:"afterHandleMouseup",value:function(){this.handleScroll()}},{key:"setCurrentForWheel",value:function(){var n=this,t=this.slides.reduce(function(t,e){return t.offsetWidth()-Math.abs(n.left()-t.left())<e.offsetWidth()-Math.abs(n.left()-e.left())?e:t});this.setCurrent(t.getId()),l(this.dom,"setCurrentForWheel")}},{key:"moveTo",value:function(t){var e=this.scrollLeft(),n=this.scrollWidth()-this.offsetWidth(),t=e+(t.left()-this.left());n<t?t=n:t<0&&(t=0),this.moveToLeft(t)}},{key:"moveToLeft",value:function(i){var o=this,a=this.scrollLeft();clearInterval(this.smoothScrollToTimerId);var s,u,c,l,d,f=0<i-a?"next":i!==a&&"prev";!f||0!=(s=i-a)&&(u=s/(1e3/60),c=this.args.container.getDuration()||1e3,l=0,d=a,this.smoothScrollToTimerId=setInterval(function(){l+=Math.abs(u);var t,e,n,r,e=(t=l,e=a,n=s,r=c*Math.abs(s/750),n*Math.sqrt(1-(t=t/r-1)*t)+e);"next"===f&&e<=i&&d<=e||"prev"===f&&i<=e&&e<=d?(o.setScrollLeft(e),d=e):(clearInterval(o.smoothScrollToTimerId),o.setScrollLeft(i))},1e3/60))}}]),a}(),m=function(){e(i,h);var r=c(i);function i(t,e){var n;return s(this,i),n=r.call(this,t,e),t.addEventListener("updateCurrent",function(){n.getSlides().forEach(function(t){n.getCurrent()===t.getId()?t.active():t.inactive()})},!1),n}return t(i,[{key:"afterInit",value:function(){this.slides.forEach(function(t,e){0!==e?(t.style("left","".concat(-1*e*100,"%")),t.inactive()):t.active()})}},{key:"handleMouseup",value:function(t){var e=t.clientX-this.dragStartX,t=this.getCurrent();0<e?0<t&&this.setCurrent(t-1):e<0&&this.getSlides().length-1>t&&this.setCurrent(t+1)}},{key:"moveTo",value:function(e){var t,n=this;e.isActive()&&(t=this.args.container.getDuration()||200,this.dom.style.setProperty("--spider-duration","".concat(t/1e3,"s")),[].slice.call(this.dom.querySelectorAll('[data-active="false"]')).map(function(t){return new d(t)}).forEach(function(t){return t.inactive()}),e.active(),t=function t(){e.dom.removeEventListener("transitionend",t,!1),l(n.dom,"fadeEnd")},e.dom.addEventListener("transitionend",t,!1))}}]),i}();function g(t,e){return t.addEventListener("click",function(){return e.handleClick()},!1),this}function p(t,e){return t.addEventListener("click",function(){return e.handleClick()},!1),this}function y(t,e){var n=this;return this.active=function(){t.setAttribute("aria-current","true")},this.inactive=function(){t.removeAttribute("aria-current")},this.getId=function(){return Number(t.getAttribute("data-id"))},e.initial?this.active():this.inactive(),t.addEventListener("click",function(t){return e.handleClick(t)},!1),new MutationObserver(function(t){t.forEach(function(t){new d(t.target).isActive()?n.active():n.inactive()})}).observe(e.relatedSlide.dom,{attributes:!0,attributeFilter:["data-active"]}),this}function b(t){var n=this;t&&(this.dom=t,this.getInterval=function(){return Number(n.dom.getAttribute("data-interval"))},this.getDuration=function(){return Number(n.dom.getAttribute("data-duration"))},this.getFade=function(){return"true"===n.dom.getAttribute("data-fade")},this.setInitialized=function(t){return t&&l(n.dom,"initialized"),n.dom.setAttribute("data-initialized",t?"true":"false")},this.setProperty=function(t,e){n.dom.style.setProperty(t,e)})}function S(t,e){var n=[];return[].slice.call(t).forEach(function(t){t=new k(t,e);t.initialized&&n.push(t)}),n}function w(d,f){return new function(){function s(t){l(),n=setInterval(function(){var t=c.getSlides().filter(function(t){return t.isActive()}),e=o(c.getSlides()).pop();t.includes(e)?u.moveTo(0):u.next()},t)}var u=this,e=d.cloneNode(!0),c=void 0,n=void 0,l=function(){clearInterval(n)};return this.initialized=!1,this.destroy=function(){var t=e.cloneNode(!0);d.parentNode.insertBefore(t,d),d.remove(),d=t,u.initialized=!1},this.init=function(){var e,n,t,r,i,o,a;u.initialized||(e=new b(d),!(n=d.querySelector(f.canvas))||(t=d.querySelector(f.reference)||d.querySelector(f.root))&&(r=d.querySelector(f.prevArrow),o=d.querySelector(f.nextArrow),i=d.querySelectorAll(f.dot),r&&new g(r,{handleClick:function(){l(),u.prev();var t=e.getInterval();0<t&&s(t)}}),o&&new p(o,{handleClick:function(){l(),u.next();var t=e.getInterval();0<t&&s(t)}}),o=e.getFade()?m:v,c=new o(n,{slide:f.slide,reference:t,container:e}),0<(a=e.getInterval())&&(s(a),["mousedown"].forEach(function(t){return n.addEventListener(t,function(){return l()},!1)}),["mouseup","mouseleave"].forEach(function(t){return n.addEventListener(t,function(){return s(a)},!1)})),0<i.length&&[].slice.call(i).forEach(function(t){new y(t,{initial:c.getCurrent()===Number(t.getAttribute("data-id")),relatedSlide:c.getSlide(Number(t.getAttribute("data-id"))),handleClick:function(t){l(),u.moveTo(t.currentTarget.getAttribute("data-id"));t=e.getInterval();0<t&&s(t)}})}),u.initialized=!0,e.setInitialized(u.initialized)))},this.prev=function(){var t,t=!1!==(t=!!c&&c.getCurrent())&&(0!==t&&t-1);!1!==typeof t&&u.moveTo(t)},this.next=function(){var t=function(){var t=!!c&&c.getCurrent();if(!1===t)return!1;var e=o(c.getSlides()).pop();return!e.isActive()&&(t!==e.getId()&&t+1)}();!1!==typeof t&&u.moveTo(t)},this.moveTo=function(t){c&&c.getSlide(t)&&c.setCurrent(t)},this.init(),this}}function k(t){var e,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},r={root:".spider",reference:".spider__reference",canvas:".spider__canvas",slide:".spider__slide",prevArrow:'.spider__arrow[data-direction="prev"]',nextArrow:'.spider__arrow[data-direction="next"]',dot:".spider__dot"},i={};for(e in r)i[e]=(void 0!==n[e]?n:r)[e];if("string"!=typeof t)return!0==t instanceof NodeList?S(t,i):!0==t instanceof HTMLElement?w(t,i):void 0;if(t.match(/^#/)){var o=document.querySelector(t);if(o)return w(o,i)}else{t=document.querySelectorAll(t);if(!(t.length<1))return S(t,i)}}document.addEventListener("DOMContentLoaded",function(){k(".spider-container"),k("#using-id-selector")},!1)}();
