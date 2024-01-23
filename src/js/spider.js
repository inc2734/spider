import addCustomEvent from '@inc2734/add-custom-event';

import { SlideCanvas } from './slide-canvas';
import { FadeCanvas } from './fade-canvas';
import { PrevArrow } from './prev-arrow';
import { NextArrow } from './next-arrow';
import { Dot } from './dot';

function spiderContainer(target) {
  if (! target) {
    return;
  }

  this.dom = target;

  this.getInterval = () => {
    return Number(this.dom.getAttribute('data-interval'));
  };

  this.getDuration = () => {
    return Number(this.dom.getAttribute('data-duration'));
  };

  this.getFade = () => {
    return 'true' === this.dom.getAttribute('data-fade');
  };

  this.getShuffle = () => {
    return 'true' === this.dom.getAttribute('data-shuffle');
  };

  this.setInitialized = (value) => {
    if (!! value) {
      addCustomEvent(this.dom, 'initialized');
    }
    return this.dom.setAttribute('data-initialized', !! value ? 'true' : 'false');
  };

  this.setProperty = (property, value) => {
    this.dom.style.setProperty(property, value);
  };
}

const newSpiders = (sliders, options) => {
  const spiders = [];

  [].slice.call(sliders).forEach(
    (slider) => {
      const initialized = slider.getAttribute('data-initialized');
      if ('false' === initialized || ! initialized) {
        const spider = new Spider(slider, options);
        if (!! spider.initialized) {
          spiders.push(spider);
        }
      }
    }
  );

  return spiders;
};

const newSpider = (target, options) => {
  return new function() {
    const _clonedTarget = target.cloneNode(true);

    let canvas    = undefined;
    let prevArrow = undefined;
    let nextArrow = undefined;

    let autoSlideTimerId = undefined;

    const stopAutoSlide = () => {
      clearInterval(autoSlideTimerId);
    };

    const startAutoSlide = (interval) => {
      stopAutoSlide();
      autoSlideTimerId = setInterval(
        () => {
          this.next();
        },
        interval
      );
    };

    this.initialized = false;

    this.destroy = () => {
      const _clone = _clonedTarget.cloneNode(true);
      target.parentNode.insertBefore(_clone, target);
      target.remove();
      target = _clone;
      this.initialized = false;
    };

    this.init = () => {
      if (this.initialized) {
        return;
      }

      const container = new spiderContainer(target);

      const root = target.querySelector(options.root);
      if (! root ) {
        return;
      }

      const duration = container.getDuration();
      if ( !! duration ) {
        container.setProperty('--spider--transition-duration', `${ duration / 1000 }s`);
      }

      let _canvas = target.querySelector(options.canvas);
      if (! _canvas) {
        return;
      }

      const _reference = target.querySelector(options.reference) || root;
      if (! _reference) {
        return;
      }

      const _prevArrow = target.querySelector(options.prevArrow);
      const _nextArrow = target.querySelector(options.nextArrow);
      const _dots      = target.querySelector(options.dots);

      if (container.getShuffle()) {
        const shuffle = (array) => {
          const newArray = [...array];
          for (let i = newArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
          }
          return newArray;
        };

        const slidesDom = [].slice.call(_canvas.querySelectorAll(options.slide));
        const dotsDom   = [].slice.call(_dots.querySelectorAll(options.dot));

        const shuffledSlidesDomKeys = shuffle(slidesDom.keys());
        shuffledSlidesDomKeys.forEach((i) => {
          _canvas.appendChild(_canvas.removeChild(slidesDom[i]));
          _dots.appendChild(_dots.removeChild(dotsDom[i]));
        });
      }

      const canvasClass = container.getFade()
        ? FadeCanvas
        : SlideCanvas;

      canvas = new canvasClass(
        _canvas,
        {
          slide: options.slide,
          reference: _reference,
          container,
        }
      );

      const interval = container.getInterval();
      if (0 < interval) {
        startAutoSlide(interval);

        ['mousedown'].forEach(
          (type) => _canvas.addEventListener(type, () => stopAutoSlide(), false)
        );

        ['mouseup', 'mouseleave'].forEach(
          (type) => _canvas.addEventListener(type, () => startAutoSlide(interval), false)
        );
      }

      if (!! _prevArrow) {
        prevArrow = new PrevArrow(
          _prevArrow,
          {
            handleClick: () => {
              stopAutoSlide();

              this.prev();

              const interval = container.getInterval();
              0 < interval && startAutoSlide(interval);
            },
          }
        );
      }

      if (!! _nextArrow) {
        nextArrow = new NextArrow(
          _nextArrow,
          {
            handleClick: () => {
              stopAutoSlide();

              this.next();

              const interval = container.getInterval();
              0 < interval && startAutoSlide(interval);
            },
          }
        );
      }

      if (!! _dots) {
        [].slice.call(_dots.querySelectorAll(options.dot)).forEach(
          (_dot) => {
            const dot = new Dot(
              _dot,
              {
                initial: canvas.getCurrent() === Number(_dot.getAttribute('data-id')),
                relatedSlide: canvas.getSlideById(_dot.getAttribute('data-id')),
                handleClick: (event) => {
                  stopAutoSlide();

                  this.moveTo(event.currentTarget.getAttribute('data-id'));

                  const interval = container.getInterval();
                  0 < interval && startAutoSlide(interval);
                },
              }
            );
          }
        );
      }

      this.initialized = true;
      container.setInitialized(this.initialized);
    };

    this.prev = () => {
      this.moveTo(canvas.getPrevSlide().getId());
    };

    this.next = () => {
      this.moveTo(canvas.getNextSlide().getId());
    };

    this.moveTo = (id) => {
      !! canvas && canvas.setCurrent(id);
    };

    const initObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.init();
            initObserver.disconnect();
          }
        });
      },
      {
        rootMargin: "500px",
        threshold: [0],
      }
    );
    initObserver.observe(target);
    return this;
  }
};

/**
 * @param { string || object } target  Target class name
 * @param { object } args
 */
export default function Spider(target, args = {}) {
  const defaultOptions = {
    root: '.spider',
    reference: '.spider__reference',
    canvas: '.spider__canvas',
    slide: '.spider__slide',
    prevArrow: '.spider__arrow[data-direction="prev"]',
    nextArrow: '.spider__arrow[data-direction="next"]',
    dots: '.spider__dots',
    dot: '.spider__dot',
  };

  const options = {};
  for (const key in defaultOptions) {
    options[ key ] = 'undefined' !== typeof args[ key ]
      ? args[ key ]
      : defaultOptions[key];
  }

  if ('string' === typeof target) {
    if (target.match(/^#/)) {
      const slider = document.querySelector(target);
      if (! slider) {
        return;
      }
      return newSpider(slider, options);
    } else {
      const sliders = document.querySelectorAll(target);
      if (1 > sliders.length) {
        return;
      }
      return newSpiders(sliders, options);
    }
  } else if (true === target instanceof NodeList) {
    return newSpiders(target, options);
  } else if (true === target instanceof HTMLElement) {
    return newSpider(target, options);
  }
}
