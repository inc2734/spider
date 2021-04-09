import addCustomEvent from '@inc2734/add-custom-event';

import { Canvas } from './canvas';
import { PrevArrow } from './prev-arrow';
import { NextArrow } from './next-arrow';
import { Dot } from './dot';

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

    const getInterval = () => {
      return Number(target.getAttribute('data-interval'));
    };

    const getFade = () => {
      return 'true' === target.getAttribute('data-fade');
    };

    let autoSlideTimerId = undefined;
    const stopAutoSlide = () => clearTimeout(autoSlideTimerId);
    const startAutoSlide = (interval) => {
      if (! canvas) {
        return;
      }

      if (0 >= interval) {
        return;
      }

      const autoSlide = () => {
        const activeSlides = canvas.getSlides().filter((slide) => slide.isActive());
        const lastSlide = [...canvas.getSlides()].pop();
        if (activeSlides.includes(lastSlide)) {
          this.moveTo(0);
        } else {
          this.next();
        }
        autoSlideTimerId = setTimeout(autoSlide, interval);
      };

      autoSlideTimerId = setTimeout(autoSlide, interval);
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

      const _canvas = target.querySelector(options.canvas);
      if (! _canvas) {
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

      canvas = new Canvas(
        _canvas,
        {
          slide: options.slide,
          fade: getFade(),
        }
      );

      if (!! canvas) {
        const interval = getInterval();
        if (0 < interval) {
          startAutoSlide(interval);

          _canvas.addEventListener(
            'setCurrentForWheel',
            () => {
              stopAutoSlide();
              startAutoSlide(interval);
            },
            false
          );
        }
      }

      if (!! canvas && 0 < _dots.length) {
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
      target.setAttribute('data-initialized', 'true');
      addCustomEvent(target, 'initialized');
    };

    this.prev = () => {
      const current = !! canvas && canvas.getCurrent();
      if (false === current) {
        return;
      }

      if (0 === current) {
        return;
      }

      const goto = current - 1;
      this.moveTo(goto);
    };

    this.next = () => {
      const current = !! canvas && canvas.getCurrent();
      if (false === current) {
        return;
      }

      const lastSlide = [...canvas.getSlides()].pop();
      if (lastSlide.isActive()) {
        return;
      }
      if (current === lastSlide.getId()) {
        return;
      }

      const goto = current + 1;
      this.moveTo(goto);
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
