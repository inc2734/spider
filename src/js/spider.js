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

  this.getFade = () => {
    return 'true' === this.dom.getAttribute('data-fade');
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
      const spider = new Spider(slider, options);
      if (!! spider.initialized) {
        spiders.push(spider);
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
          const activeSlides = canvas.getSlides().filter((slide) => slide.isActive());
          const lastSlide = [...canvas.getSlides()].pop();
          if (activeSlides.includes(lastSlide)) {
            this.moveTo(0);
          } else {
            this.next();
          }
        },
        interval
      );
    };

    const getPrev = () => {
      const current = !! canvas && canvas.getCurrent();
      if (false === current) {
        return false;
      }

      if (0 === current) {
        return false;
      }

      return current - 1;
    };

    const getNext = () => {
      const current = !! canvas && canvas.getCurrent();
      if (false === current) {
        return false;
      }

      const lastSlide = [...canvas.getSlides()].pop();
      if (lastSlide.isActive()) {
        return false;
      }
      if (current === lastSlide.getId()) {
        return false;
      }

      return current + 1;
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

      const _canvas = target.querySelector(options.canvas);
      if (! _canvas) {
        return;
      }

      const _reference = target.querySelector(options.reference) || target.querySelector(options.root);
      if (! _reference) {
        return;
      }

      const _prevArrow = target.querySelector(options.prevArrow);
      const _nextArrow = target.querySelector(options.nextArrow);
      const _dots      = target.querySelectorAll(options.dot);

      if (!! _prevArrow) {
        prevArrow = new PrevArrow(
          _prevArrow,
          {
            handleClick: () => {
              stopAutoSlide();

              this.prev();

              const interval = getInterval();
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

              const interval = getInterval();
              0 < interval && startAutoSlide(interval);
            },
          }
        );
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

      if (0 < _dots.length) {
        [].slice.call(_dots).forEach(
          (_dot) => {
            const dot = new Dot(
              _dot,
              {
                initial: canvas.getCurrent() === Number(_dot.getAttribute('data-id')),
                relatedSlide: canvas.getSlide(Number(_dot.getAttribute('data-id'))),
                handleClick: (event) => {
                  stopAutoSlide();

                  this.moveTo(event.currentTarget.getAttribute('data-id'));

                  const interval = getInterval();
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
      const prev = getPrev();
      if (false === typeof prev) {
        return;
      }

      this.moveTo(prev);
    };

    this.next = () => {
      const next = getNext();
      if (false === typeof next) {
        return;
      }

      this.moveTo(next);
    };

    this.moveTo = (index) => {
      !! canvas && !! canvas.getSlide(index) && canvas.setCurrent(index);
    };

    this.init();
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
