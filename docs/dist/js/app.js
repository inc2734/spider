!function(){"use strict";function t(t,i,n){return i=s(i),function(t,e){if(e&&("object"==typeof e||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return l(t)}(t,e()?Reflect.construct(i,n||[],s(t).constructor):i.apply(t,n))}function e(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(e=function(){return!!t})()}function i(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var i=t[Symbol.toPrimitive];if(void 0!==i){var n=i.call(t,e||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==typeof e?e:String(e)}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,i(r.key),r)}}function o(t,e,i){return e&&r(t.prototype,e),i&&r(t,i),Object.defineProperty(t,"prototype",{writable:!1}),t}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&u(t,e)}function s(t){return s=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},s(t)}function u(t,e){return u=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},u(t,e)}function l(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function c(t){return function(t){if(Array.isArray(t))return d(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return d(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);"Object"===i&&t.constructor&&(i=t.constructor.name);if("Map"===i||"Set"===i)return Array.from(t);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return d(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function f(t,e){var i,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=arguments.length>4&&void 0!==arguments[4]&&arguments[4];try{i=new CustomEvent(e,{bubbles:r,cancelable:o,detail:n})}catch(t){(i=document.createEvent("CustomEvent")).initCustomEvent(e,r,o,n)}t.dispatchEvent(i)}function h(t){var e=this;t&&(this.dom=t,this.getId=function(){return Number(t.getAttribute("data-id"))},this.top=function(){return e.dom.getBoundingClientRect().top},this.left=function(){return e.dom.getBoundingClientRect().left},this.right=function(){return e.left()+e.offsetWidth()},this.offsetWidth=function(){return e.dom.offsetWidth},this.style=function(t,i){e.dom.style[t]=i},this.active=function(){e.dom.setAttribute("data-active","true")},this.inactive=function(){e.dom.removeAttribute("data-active")},this.visible=function(){e.dom.setAttribute("data-visible","true")},this.invisible=function(){e.dom.removeAttribute("data-visible")},this.isActive=function(){return"true"===e.dom.getAttribute("data-active")},this.isVisible=function(){return"true"===e.dom.getAttribute("data-visible")})}var v=function(t){throw new Error("".concat(t," is abstract method. Override it with the child class."))},g=function(){function t(e,i){var r=this;n(this,t),this.dom=e,this.args=i,this.slides=[].slice.call(this.dom.querySelectorAll(this.args.slide)).map((function(t){return new h(t)})),this.historyActiveSlideIds=[],this.dragStartX=void 0,this.dragStartScrollLeft=void 0,this.dragStartTime=void 0,this.isDrag=!1;var o=10,a=void 0,s=function t(){clearTimeout(a);var e,i=(e=r.slides.map((function(t){return t.top()}))).filter((function(t,i){return i===e.lastIndexOf(t)}));if(1<i.length&&0<o)return a=setTimeout(t,100),void o--;r.dragStartX=void 0,r.dragStartScrollLeft=void 0,r.dragStartTime=void 0,r.isDrag=!1,r.dom.classList.remove("is-dragging"),r.beforeInit();var n=r.contentWidth();r.setCurrent(r.getSlide(0).getId()),r.args.container.setProperty("--spider--reference-width","".concat(r.referenceWidth(),"px")),r.args.container.setProperty("--spider--canvas-width",n),r.afterInit()};s();var u=document.body.clientWidth;window.addEventListener("resize",(function(){var t=document.body.clientWidth;u!==t&&(u=t,setTimeout(s,250))}),!1),new MutationObserver((function(){var t=r.getCurrentSlide();t&&(f(r.dom,"updateCurrent"),r.moveTo(t))})).observe(this.dom,{attributes:!0,attributeFilter:["data-current"]}),this._handleMousedown=this._handleMousedown.bind(this),this.dom.addEventListener("mousedown",this._handleMousedown,!1),this._handleMousemove=this._handleMousemove.bind(this),this.dom.addEventListener("mousemove",this._handleMousemove,!1),this._handleMouseup=this._handleMouseup.bind(this),this.dom.addEventListener("mouseup",this._handleMouseup,!1),this.dom.addEventListener("mouseleave",this._handleMouseup,!1)}return o(t,[{key:"_handleMousedown",value:function(t){t.preventDefault(),t.stopPropagation(),this.dragStartX=t.clientX,this.dragStartScrollLeft=this.scrollLeft(),this.dragStartTime=new Date,this.isDrag=!0,this.handleMousedown(t)}},{key:"handleMousedown",value:function(t){}},{key:"_handleMousemove",value:function(t){t.preventDefault(),t.stopPropagation(),this.isDrag&&(this.dom.classList.add("is-dragging"),this.handleMousemove(t))}},{key:"handleMousemove",value:function(t){}},{key:"_handleMouseup",value:function(t){t.preventDefault(),t.stopPropagation(),this.isDrag&&(this.handleMouseup(t),this.dragStartX=void 0,this.dragStartScrollLeft=void 0,this.dragStartTime=void 0,this.isDrag=!1,this.dom.classList.remove("is-dragging"),this.afterHandleMouseup())}},{key:"handleMouseup",value:function(t){}},{key:"afterHandleMouseup",value:function(){}},{key:"scrollLeft",value:function(){return this.dom.scrollLeft}},{key:"contentWidth",value:function(){return this.dom.style.paddingRight&&this.dom.style.paddingLeft?"calc(".concat(this.dom.clientWidth,"px - ").concat(this.dom.style.paddingRight," - ").concat(this.dom.style.paddingLeft,")"):this.dom.style.paddingRight?"calc(".concat(this.dom.clientWidth,"px - ").concat(this.dom.style.paddingRight,")"):this.dom.style.paddingLeft?"calc(".concat(this.dom.clientWidth,"px - ").concat(this.dom.style.paddingLeft,")"):"".concat(this.dom.clientWidth,"px")}},{key:"offsetWidth",value:function(){return this.dom.offsetWidth}},{key:"scrollWidth",value:function(){return this.dom.scrollWidth}},{key:"referenceWidth",value:function(){return this.args.reference.clientWidth}},{key:"referenceOffsetWidth",value:function(){return this.args.reference.offsetWidth}},{key:"referenceLeft",value:function(){return this.args.reference.getBoundingClientRect().left}},{key:"left",value:function(){var t=this.referenceWidth(),e=this.referenceOffsetWidth(),i=this.referenceLeft();return i+(e-t)/2+(this.slides[0].left()-i+this.scrollLeft())}},{key:"setCurrent",value:function(t){this.dom.setAttribute("data-current",Number(t))}},{key:"getCurrent",value:function(){return Number(this.dom.getAttribute("data-current"))}},{key:"getSlides",value:function(){return this.slides}},{key:"getSlide",value:function(t){return this.slides[t]}},{key:"getSlideById",value:function(t){return this.getSlides().find((function(e){return e.getId()===Number(t)}))}},{key:"getCurrentSlide",value:function(){return this.getSlideById(this.getCurrent())}},{key:"getPrevSlide",value:function(){var t=this.getCurrent(),e=this.getSlide(this.getSlides().findIndex((function(e){return t===e.getId()}))-1);return e||this.getSlide(this.getSlides().length-1)}},{key:"getNextSlide",value:function(){var t,e,i=c(this.getSlides()),n=c(this.getActiveSlides());if(1>i.length||1>n.length)return this.getSlide(0);if((null==i||null===(t=i[i.length-1])||void 0===t?void 0:t.getId())===(null==n||null===(e=n[n.length-1])||void 0===e?void 0:e.getId()))return this.getSlide(0);var r=this.getCurrent(),o=this.getSlide(i.findIndex((function(t){return r===t.getId()}))+1);return o||this.getSlide(0)}},{key:"getActiveSlides",value:function(){return this.getSlides().filter((function(t){return t.isActive()}))}},{key:"getVisibleSlides",value:function(){return this.getSlides().filter((function(t){return t.isVisible()}))}},{key:"setCurrentForWheel",value:function(){v("abstractCanvas.setCurrentForWheel")}},{key:"moveTo",value:function(t){v("abstractCanvas.moveTo")}},{key:"beforeInit",value:function(){}},{key:"afterInit",value:function(){}}]),t}(),m=function(e){function i(e,r){var o;if(n(this,i),(o=t(this,i,[e,r])).smoothScrollToTimerId=void 0,o.canvasScrollTimerId=void 0,o.setScrollLeft=function(t){return o.dom.scrollLeft=t},o.setScrollLeft(0),o.handleScroll=o.handleScroll.bind(l(o)),o.dom.addEventListener("scroll",o.handleScroll,!1),"undefined"!=typeof IntersectionObserver){var a=new IntersectionObserver((function(t){t.forEach((function(t){var e=new h(t.target);t.isIntersecting?e.active():e.inactive()}))}),{root:o.dom,rootMargin:"0px",threshold:[.5,1]}),s=new IntersectionObserver((function(t){t.forEach((function(t){var e=new h(t.target);t.isIntersecting?e.visible():e.invisible()}))}),{root:o.dom,rootMargin:"0px -1px",threshold:[0]});o.getSlides().forEach((function(t){a.observe(t.dom),s.observe(t.dom)}))}return o}return a(i,e),o(i,[{key:"afterInit",value:function(){this.dom.classList.remove("is-scrolling")}},{key:"handleScroll",value:function(){var t=this;clearTimeout(this.canvasScrollTimerId),this.isDrag||(this.dom.classList.add("is-scrolling"),this.canvasScrollTimerId=setTimeout((function(){var e=t.left(),i=t.getCurrentSlide().left();1<Math.abs(e-i)&&t.setCurrentForWheel(),f(t.dom,"scrollEnd"),t.dom.classList.remove("is-scrolling")}),250))}},{key:"handleMousedown",value:function(t){clearTimeout(this.canvasScrollTimerId)}},{key:"handleMousemove",value:function(t){this.setScrollLeft(this.dragStartScrollLeft+this.dragStartX-t.clientX)}},{key:"handleMouseup",value:function(t){var e=(new Date).getTime()-this.dragStartTime.getTime(),i=t.clientX-this.dragStartX;if(300>e){var n=this.scrollLeft()-i/e*100;this.moveToLeft(n)}}},{key:"afterHandleMouseup",value:function(){this.handleScroll()}},{key:"setCurrentForWheel",value:function(){var t=this,e=this.getSlides().reduce((function(e,i){var n=e.offsetWidth()-Math.abs(t.left()-e.left());return i.offsetWidth()-Math.abs(t.left()-i.left())>n?i:e}));this.setCurrent(e.getId()),f(this.dom,"setCurrentForWheel")}},{key:"moveTo",value:function(t){var e=this.scrollLeft()+(t.left()-this.left());this.moveToLeft(e)}},{key:"moveToLeft",value:function(t){var e=this,i=this.scrollLeft();clearInterval(this.smoothScrollToTimerId);var n=0<t-i?"next":t!==i&&"prev";if(n){var r=1e3/60,o=t-i;if(0!==o){var a=o/r,s=getComputedStyle(this.dom).getPropertyValue("--spider--transition-duration").trim(),u=s.match(/ms$/)?Number(s.replace("ms","")):s.match(/s$/)?1e3*Number(s.replace("s","")):1e3,l=0,c=i;this.smoothScrollToTimerId=setInterval((function(){var r=function(t,e,i,n){return i*((t=t/n-1)*t*t+1)+e}(l+=Math.abs(a),i,o,u*Math.abs(o/750));"next"===n&&r<=t&&r>=c||"prev"===n&&r>=t&&r<=c?(e.setScrollLeft(r),c=r):(clearInterval(e.smoothScrollToTimerId),e.setScrollLeft(t))}),r)}}}}]),i}(g),p=function(e){function i(e,r){var o;return n(this,i),o=t(this,i,[e,r]),e.addEventListener("updateCurrent",(function(){o.getSlides().forEach((function(t){o.getCurrent()===t.getId()?t.active():t.inactive()}))}),!1),o}return a(i,e),o(i,[{key:"afterInit",value:function(){this.dom.classList.remove("is-fading"),this.slides.forEach((function(t,e){0!==e?(t.style("left","".concat(-1*e*100,"%")),t.inactive()):t.active()}))}},{key:"handleMouseup",value:function(t){var e=t.clientX-this.dragStartX;if(0<e){var i=this.getPrevSlide();i&&this.setCurrent(i.getId())}else if(0>e){var n=this.getNextSlide();n&&this.setCurrent(n.getId())}}},{key:"moveTo",value:function(t){var e=this;if(t.isActive()){this.dom.classList.add("is-fading"),[].slice.call(this.dom.querySelectorAll('[data-active="false"]')).map((function(t){return new h(t)})).forEach((function(t){return t.inactive()})),t.active();t.dom.addEventListener("transitionend",(function i(){t.dom.removeEventListener("transitionend",i,!1),f(e.dom,"fadeEnd"),e.dom.classList.remove("is-fading")}),!1)}}}]),i}(g);function y(t,e){return t.addEventListener("click",(function(){return e.handleClick()}),!1),this}function b(t,e){return t.addEventListener("click",(function(){return e.handleClick()}),!1),this}function S(t,e){return t.addEventListener("click",(function(){return e.handleClick()}),!1),this}function w(t,e){return t.addEventListener("click",(function(){return e.handleClick()}),!1),this}function L(t,e){var i=this;return this.active=function(){t.setAttribute("aria-current","true")},this.inactive=function(){t.removeAttribute("aria-current")},e.initial?this.active():this.inactive(),t.addEventListener("click",(function(t){return e.handleClick(t)}),!1),new MutationObserver((function(t){t.forEach((function(t){new h(t.target).isActive()?i.active():i.inactive()}))})).observe(e.relatedSlide.dom,{attributes:!0,attributeFilter:["data-active"]}),this}function k(t){var e=this;t&&(this.dom=t,this.getInterval=function(){return Number(e.dom.getAttribute("data-interval"))},this.getDuration=function(){return Number(e.dom.getAttribute("data-duration"))},this.getFade=function(){return"true"===e.dom.getAttribute("data-fade")},this.getShuffle=function(){return"true"===e.dom.getAttribute("data-shuffle")},this.setInitialized=function(t){return t&&f(e.dom,"initialized"),e.dom.setAttribute("data-initialized",t?"true":"false")},this.setProperty=function(t,i){e.dom.style.setProperty(t,i)})}var A=function(t,e){var i=[];return[].slice.call(t).forEach((function(t){var n=t.getAttribute("data-initialized");if("false"===n||!n){var r=new C(t,e);r.initialized&&i.push(r)}})),i},I=function(t,e){return new function(){var i=this,n=t.cloneNode(!0),r=void 0,o=void 0;this.stopAutoPlay=function(){clearInterval(o),t.classList.remove("is-auto-playing")},this.startAutoPlay=function(e){i.stopAutoPlay(),o=setInterval((function(){i.next()}),e),t.classList.add("is-auto-playing")},this.initialized=!1,this.destroy=function(){var e=n.cloneNode(!0);t.parentNode.insertBefore(e,t),t.remove(),t=e,i.initialized=!1},this.init=function(){if(!i.initialized){var n=new k(t),o=t.querySelector(e.root);if(o){var a=n.getDuration();a&&n.setProperty("--spider--transition-duration","".concat(a/1e3,"s"));var s=t.querySelector(e.canvas);if(s){var u=t.querySelector(e.reference)||o;if(u){var l=t.querySelector(e.prevArrow),d=t.querySelector(e.nextArrow),f=t.querySelector(e.startButton),h=t.querySelector(e.stopButton),v=t.querySelector(e.dots);if(n.getShuffle()){var g=[].slice.call(s.querySelectorAll(e.slide)),A=[].slice.call(v.querySelectorAll(e.dot));(function(t){for(var e=c(t),i=e.length-1;i>0;i--){var n=Math.floor(Math.random()*(i+1)),r=[e[n],e[i]];e[i]=r[0],e[n]=r[1]}return e})(g.keys()).forEach((function(t){s.appendChild(s.removeChild(g[t])),v.appendChild(v.removeChild(A[t]))}))}var I=n.getFade()?p:m;r=new I(s,{slide:e.slide,reference:u,container:n});var C=n.getInterval();0<C&&(i.startAutoPlay(C),s.addEventListener("mousedown",(function(){var e=t.classList.contains("is-auto-playing");i.stopAutoPlay(),e&&["mouseup","mouseout"].forEach((function(t){s.addEventListener(t,(function e(){i.startAutoPlay(C),s.removeEventListener(t,e,!1)}),!1)}))}),!1)),l&&new y(l,{handleClick:function(){i.stopAutoPlay(),i.prev();var t=n.getInterval();0<t&&i.startAutoPlay(t)}}),d&&new b(d,{handleClick:function(){i.stopAutoPlay(),i.next();var t=n.getInterval();0<t&&i.startAutoPlay(t)}}),f&&new S(f,{handleClick:function(){var t=n.getInterval();0<t&&i.startAutoPlay(t)}}),h&&new w(h,{handleClick:function(){i.stopAutoPlay()}}),v&&[].slice.call(v.querySelectorAll(e.dot)).forEach((function(t){new L(t,{initial:r.getCurrent()===Number(t.getAttribute("data-id")),relatedSlide:r.getSlideById(t.getAttribute("data-id")),handleClick:function(t){i.stopAutoPlay(),i.moveTo(t.currentTarget.getAttribute("data-id"));var e=n.getInterval();0<e&&i.startAutoPlay(e)}})})),i.initialized=!0,n.setInitialized(i.initialized)}}}}},this.prev=function(){i.moveTo(r.getPrevSlide().getId())},this.next=function(){i.moveTo(r.getNextSlide().getId())},this.moveTo=function(t){r&&r.setCurrent(t)};var a=new IntersectionObserver((function(t){t.forEach((function(t){t.isIntersecting&&(i.init(),a.disconnect())}))}),{rootMargin:"500px",threshold:[0]});return a.observe(t),this}};function C(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i={root:".spider",reference:".spider__reference",canvas:".spider__canvas",slide:".spider__slide",prevArrow:'.spider__arrow[data-direction="prev"]',nextArrow:'.spider__arrow[data-direction="next"]',startButton:".spider__start",stopButton:".spider__stop",dots:".spider__dots",dot:".spider__dot"},n={};for(var r in i)n[r]=void 0!==e[r]?e[r]:i[r];if("string"==typeof t){if(t.match(/^#/)){var o=document.querySelector(t);if(!o)return;return I(o,n)}var a=document.querySelectorAll(t);if(1>a.length)return;return A(a,n)}return!0==t instanceof NodeList?A(t,n):!0==t instanceof HTMLElement?I(t,n):void 0}document.addEventListener("DOMContentLoaded",(function(){new C(".spider-container"),new C("#using-id-selector")}),!1)}();
