!function(){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,function(t){t=function(t,e){if("object"!=typeof t||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0===n)return("string"===e?String:Number)(t);n=n.call(t,e||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}(t,"string");return"symbol"==typeof t?t:String(t)}(i.key),i)}}function t(t,e,n){e&&i(t.prototype,e),n&&i(t,n),Object.defineProperty(t,"prototype",{writable:!1})}function e(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&n(t,e)}function o(t){return(o=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function n(t,e){return(n=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t})(t,e)}function a(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function c(n){var i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}();return function(){var t,e=o(n),e=(t=i?(t=o(this).constructor,Reflect.construct(e,arguments,t)):e.apply(this,arguments),this);if(t&&("object"==typeof t||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return a(e)}}function s(t){return function(t){if(Array.isArray(t))return l(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return l(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Map"===(n="Object"===n&&t.constructor?t.constructor.name:n)||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function d(t,e,n,i,r){var o,n=2<arguments.length&&void 0!==n?n:{},i=!(3<arguments.length&&void 0!==i)||i,r=4<arguments.length&&void 0!==r&&r;try{o=new CustomEvent(e,{bubbles:i,cancelable:r,detail:n})}catch(t){(o=document.createEvent("CustomEvent")).initCustomEvent(e,i,r,n)}t.dispatchEvent(o)}function f(t){var n=this;t&&(this.dom=t,this.getId=function(){return Number(t.getAttribute("data-id"))},this.top=function(){return n.dom.getBoundingClientRect().top},this.left=function(){return n.dom.getBoundingClientRect().left},this.right=function(){return n.left()+n.offsetWidth()},this.offsetWidth=function(){return n.dom.offsetWidth},this.style=function(t,e){n.dom.style[t]=e},this.active=function(){n.dom.setAttribute("data-active","true")},this.inactive=function(){n.dom.removeAttribute("data-active")},this.visible=function(){n.dom.setAttribute("data-visible","true")},this.invisible=function(){n.dom.removeAttribute("data-visible")},this.isActive=function(){return"true"===n.dom.getAttribute("data-active")})}function h(t){throw new Error("".concat(t," is abstract method. Override it with the child class."))}var v=function(){function a(t,e){function i(){var n;if(clearTimeout(s),1<(n=r.slides.map(function(t){return t.top()})).filter(function(t,e){return e===n.lastIndexOf(t)}).length&&0<o)return s=setTimeout(i,100),void o--;r.dragStartX=void 0,r.dragStartScrollLeft=void 0,r.dragStartTime=void 0,r.isDrag=!1,r.dom.classList.remove("is-dragging"),r.setWidth(""),r.beforeInit();var t=r.contentWidth();r.setWidth(t),r.setCurrent(0),r.args.container.setProperty("--spider-reference-width","".concat(r.referenceWidth(),"px")),r.args.container.setProperty("--spider-canvas-width",t),r.afterInit()}var r=this,o=(u(this,a),this.dom=t,this.args=e,this.slides=[].slice.call(this.dom.querySelectorAll(this.args.slide)).map(function(t){return new f(t)}),this.historyActiveSlideIds=[],this.dragStartX=void 0,this.dragStartScrollLeft=void 0,this.dragStartTime=void 0,this.isDrag=!1,10),s=void 0,n=(i(),document.body.clientWidth);window.addEventListener("resize",function(){var t=document.body.clientWidth;n!==t&&(n=t,setTimeout(i,250))},!1),new MutationObserver(function(){var t;!r.dom.querySelector('[data-id="'.concat(r.getCurrent(),'"]'))||(t=r.slides[r.getCurrent()])&&(d(r.dom,"updateCurrent"),r.moveTo(t))}).observe(this.dom,{attributes:!0,attributeFilter:["data-current"]}),this._handleMousedown=this._handleMousedown.bind(this),this.dom.addEventListener("mousedown",this._handleMousedown,!1),this._handleMousemove=this._handleMousemove.bind(this),this.dom.addEventListener("mousemove",this._handleMousemove,!1),this._handleMouseup=this._handleMouseup.bind(this),this.dom.addEventListener("mouseup",this._handleMouseup,!1),this.dom.addEventListener("mouseleave",this._handleMouseup,!1)}return t(a,[{key:"_handleMousedown",value:function(t){t.preventDefault(),t.stopPropagation(),this.dragStartX=t.clientX,this.dragStartScrollLeft=this.scrollLeft(),this.dragStartTime=new Date,this.isDrag=!0,this.handleMousedown(t)}},{key:"handleMousedown",value:function(t){}},{key:"_handleMousemove",value:function(t){t.preventDefault(),t.stopPropagation(),this.isDrag&&(this.dom.classList.add("is-dragging"),this.handleMousemove(t))}},{key:"handleMousemove",value:function(t){}},{key:"_handleMouseup",value:function(t){t.preventDefault(),t.stopPropagation(),this.isDrag&&(this.handleMouseup(t),this.dragStartX=void 0,this.dragStartScrollLeft=void 0,this.dragStartTime=void 0,this.isDrag=!1,this.dom.classList.remove("is-dragging"),this.afterHandleMouseup())}},{key:"handleMouseup",value:function(t){}},{key:"afterHandleMouseup",value:function(){}},{key:"scrollLeft",value:function(){return this.dom.scrollLeft}},{key:"contentWidth",value:function(){return"calc(".concat(this.dom.clientWidth,"px - ").concat(this.dom.style.paddingRight||"0px"," - ").concat(this.dom.style.paddingLeft||"0px",")")}},{key:"offsetWidth",value:function(){return this.dom.offsetWidth}},{key:"scrollWidth",value:function(){return this.dom.scrollWidth}},{key:"referenceWidth",value:function(){return this.args.reference.clientWidth}},{key:"referenceOffsetWidth",value:function(){return this.args.reference.offsetWidth}},{key:"referenceLeft",value:function(){return this.args.reference.getBoundingClientRect().left}},{key:"left",value:function(){var t=this.referenceWidth(),e=this.referenceOffsetWidth(),n=this.referenceLeft();return n+(e-t)/2+(this.slides[0].left()-n+this.scrollLeft())}},{key:"setWidth",value:function(t){this.dom.style.width=t}},{key:"setCurrent",value:function(t){this.dom.setAttribute("data-current",Number(t))}},{key:"getCurrent",value:function(){return Number(this.dom.getAttribute("data-current"))}},{key:"getSlides",value:function(){return this.slides}},{key:"getSlide",value:function(t){return this.slides[t]}},{key:"setCurrentForWheel",value:function(){h("abstractCanvas.setCurrentForWheel")}},{key:"moveTo",value:function(t){h("abstractCanvas.moveTo")}},{key:"beforeInit",value:function(){}},{key:"afterInit",value:function(){}}]),a}(),m=function(){e(s,v);var o=c(s);function s(t,e){var n,i,r;return u(this,s),(n=o.call(this,t,e)).smoothScrollToTimerId=void 0,n.canvasScrollTimerId=void 0,n.setScrollLeft=function(t){return n.dom.scrollLeft=t},n.setScrollLeft(0),n.handleScroll=n.handleScroll.bind(a(n)),n.dom.addEventListener("scroll",n.handleScroll,!1),"undefined"!=typeof IntersectionObserver&&(i=new IntersectionObserver(function(t){t.forEach(function(t){var e=new f(t.target);t.isIntersecting?e.active():e.inactive()})},{root:n.dom,rootMargin:"0px -1.5px",threshold:[.75,1]}),n.slides.forEach(function(t){i.observe(t.dom)}),r=new IntersectionObserver(function(t){t.forEach(function(t){var e=new f(t.target);t.isIntersecting?e.visible():e.invisible()})},{root:n.dom,rootMargin:"0px -1px",threshold:[0]}),n.slides.forEach(function(t){r.observe(t.dom)})),n}return t(s,[{key:"afterInit",value:function(){this.dom.classList.remove("is-scrolling")}},{key:"handleScroll",value:function(){var n=this;clearTimeout(this.canvasScrollTimerId),this.isDrag||(this.dom.classList.add("is-scrolling"),this.canvasScrollTimerId=setTimeout(function(){var t=n.left(),e=n.getSlide(n.getCurrent()).left();1<Math.abs(t-e)&&n.setCurrentForWheel(),d(n.dom,"scrollEnd"),n.dom.classList.remove("is-scrolling")},250))}},{key:"handleMousedown",value:function(t){clearTimeout(this.canvasScrollTimerId)}},{key:"handleMousemove",value:function(t){this.setScrollLeft(this.dragStartScrollLeft+this.dragStartX-t.clientX)}},{key:"handleMouseup",value:function(t){var e=(new Date).getTime()-this.dragStartTime.getTime(),t=t.clientX-this.dragStartX;e<300&&(t=this.scrollLeft()-t/e*100,this.moveToLeft(t))}},{key:"afterHandleMouseup",value:function(){this.handleScroll()}},{key:"setCurrentForWheel",value:function(){var n=this,t=this.slides.reduce(function(t,e){return t.offsetWidth()-Math.abs(n.left()-t.left())<e.offsetWidth()-Math.abs(n.left()-e.left())?e:t});this.setCurrent(t.getId()),d(this.dom,"setCurrentForWheel")}},{key:"moveTo",value:function(t){var e=this.scrollLeft(),n=this.scrollWidth()-this.offsetWidth(),e=e+(t.left()-this.left());n<e?e=n:(e<0||0===t.getId())&&(e=0),this.moveToLeft(e)}},{key:"moveToLeft",value:function(r){var o,s,t,a,u,c,l=this,d=this.scrollLeft(),f=(clearInterval(this.smoothScrollToTimerId),0<r-d?"next":r!==d&&"prev");!f||0!=(o=r-d)&&(s=o/(1e3/60),t=getComputedStyle(this.dom).getPropertyValue("--spider--transition-duration").trim(),a=t.match(/ms$/)?Number(t.replace("ms","")):t.match(/s$/)?1e3*Number(t.replace("s","")):1e3,u=0,c=d,this.smoothScrollToTimerId=setInterval(function(){u+=Math.abs(s);t=u,e=d,i=o,n=a*Math.abs(o/750);var t,e,n,i=i*((t=t/n-1)*t*t+1)+e;"next"===f&&i<=r&&c<=i||"prev"===f&&r<=i&&i<=c?(l.setScrollLeft(i),c=i):(clearInterval(l.smoothScrollToTimerId),l.setScrollLeft(r))},1e3/60))}}]),s}(),g=function(){e(r,v);var i=c(r);function r(t,e){var n;return u(this,r),n=i.call(this,t,e),t.addEventListener("updateCurrent",function(){n.getSlides().forEach(function(t){n.getCurrent()===t.getId()?t.active():t.inactive()})},!1),n}return t(r,[{key:"afterInit",value:function(){this.dom.classList.remove("is-fading"),this.slides.forEach(function(t,e){0===e?t.active():(t.style("left","".concat(-1*e*100,"%")),t.inactive())})}},{key:"handleMouseup",value:function(t){var t=t.clientX-this.dragStartX,e=this.getCurrent();0<t?0<e&&this.setCurrent(e-1):t<0&&this.getSlides().length-1>e&&this.setCurrent(e+1)}},{key:"moveTo",value:function(e){var n=this;e.isActive()&&(this.dom.classList.add("is-fading"),[].slice.call(this.dom.querySelectorAll('[data-active="false"]')).map(function(t){return new f(t)}).forEach(function(t){return t.inactive()}),e.active(),e.dom.addEventListener("transitionend",function t(){e.dom.removeEventListener("transitionend",t,!1),d(n.dom,"fadeEnd"),n.dom.classList.remove("is-fading")},!1))}}]),r}();function p(t,e){return t.addEventListener("click",function(){return e.handleClick()},!1),this}function y(t,e){return t.addEventListener("click",function(){return e.handleClick()},!1),this}function b(t,e){var n=this;return this.active=function(){t.setAttribute("aria-current","true")},this.inactive=function(){t.removeAttribute("aria-current")},this.getId=function(){return Number(t.getAttribute("data-id"))},e.initial?this.active():this.inactive(),t.addEventListener("click",function(t){return e.handleClick(t)},!1),new MutationObserver(function(t){t.forEach(function(t){new f(t.target).isActive()?n.active():n.inactive()})}).observe(e.relatedSlide.dom,{attributes:!0,attributeFilter:["data-active"]}),this}function S(t){var n=this;t&&(this.dom=t,this.getInterval=function(){return Number(n.dom.getAttribute("data-interval"))},this.getDuration=function(){return Number(n.dom.getAttribute("data-duration"))},this.getFade=function(){return"true"===n.dom.getAttribute("data-fade")},this.setInitialized=function(t){return t&&d(n.dom,"initialized"),n.dom.setAttribute("data-initialized",t?"true":"false")},this.setProperty=function(t,e){n.dom.style.setProperty(t,e)})}function w(t,n){var i=[];return[].slice.call(t).forEach(function(t){var e=t.getAttribute("data-initialized");"false"!==e&&e||(e=new k(t,n)).initialized&&i.push(e)}),i}function L(d,f){return new function(){function a(t){l(),n=setInterval(function(){var t=c.getSlides().filter(function(t){return t.isActive()}),e=s(c.getSlides()).pop();t.includes(e)?u.moveTo(0):u.next()},t)}var u=this,e=d.cloneNode(!0),c=void 0,n=void 0,l=function(){clearInterval(n)},i=(this.initialized=!1,this.destroy=function(){var t=e.cloneNode(!0);d.parentNode.insertBefore(t,d),d.remove(),d=t,u.initialized=!1},this.init=function(){var e,n,t,i,r,o,s;u.initialized||(e=new S(d),(o=d.querySelector(f.root))&&((t=e.getDuration())&&e.setProperty("--spider--transition-duration","".concat(t/1e3,"s")),(n=d.querySelector(f.canvas))&&(t=d.querySelector(f.reference)||o)&&(o=d.querySelector(f.prevArrow),i=d.querySelector(f.nextArrow),r=d.querySelectorAll(f.dot),o&&new p(o,{handleClick:function(){l(),u.prev();var t=e.getInterval();0<t&&a(t)}}),i&&new y(i,{handleClick:function(){l(),u.next();var t=e.getInterval();0<t&&a(t)}}),o=e.getFade()?g:m,c=new o(n,{slide:f.slide,reference:t,container:e}),0<(s=e.getInterval())&&(a(s),["mousedown"].forEach(function(t){return n.addEventListener(t,function(){return l()},!1)}),["mouseup","mouseleave"].forEach(function(t){return n.addEventListener(t,function(){return a(s)},!1)})),0<r.length&&[].slice.call(r).forEach(function(t){new b(t,{initial:c.getCurrent()===Number(t.getAttribute("data-id")),relatedSlide:c.getSlide(Number(t.getAttribute("data-id"))),handleClick:function(t){l(),u.moveTo(t.currentTarget.getAttribute("data-id"));t=e.getInterval();0<t&&a(t)}})}),u.initialized=!0,e.setInitialized(u.initialized))))},this.prev=function(){var n,t=!1!==(t=!!c&&c.getCurrent())&&(0===t?c.getSlides().length-1:(s(c.getSlides()).some(function(t,e){if(t.isActive())return n=e-1,!0}),n));!1!==r(t)&&u.moveTo(t)},this.next=function(){var n,t=!1!==(!!c&&c.getCurrent())&&(s(c.getSlides()).pop().isActive()?0:(s(c.getSlides()).some(function(t,e){if(t.isActive())return n=e+1,!0}),n));!1!==r(t)&&u.moveTo(t)},this.moveTo=function(t){c&&c.getSlide(t)&&c.setCurrent(t)},new IntersectionObserver(function(t){t.forEach(function(t){t.isIntersecting&&(u.init(),i.disconnect())})},{rootMargin:"500px",threshold:[0]}));return i.observe(d),this}}function k(t){var e,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},i={root:".spider",reference:".spider__reference",canvas:".spider__canvas",slide:".spider__slide",prevArrow:'.spider__arrow[data-direction="prev"]',nextArrow:'.spider__arrow[data-direction="next"]',dot:".spider__dot"},r={};for(e in i)r[e]=(void 0!==n[e]?n:i)[e];if("string"!=typeof t)return!0==t instanceof NodeList?w(t,r):!0==t instanceof HTMLElement?L(t,r):void 0;if(t.match(/^#/)){var o=document.querySelector(t);if(o)return L(o,r)}else{o=document.querySelectorAll(t);if(!(o.length<1))return w(o,r)}}document.addEventListener("DOMContentLoaded",function(){k(".spider-container"),k("#using-id-selector")},!1)}();
