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
    let dots      = undefined;

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
            handleClick: this.prev,
          }
        );
      }

      if (!! _nextArrow) {
        nextArrow = new NextArrow(
          _nextArrow,
          {
            handleClick: this.next,
          }
        );
      }

      if (0 < _dots.length) {
        [].slice.call(_dots).forEach(
          (_dot) => {
            const dot = new Dot(
              _dot,
              {
                handleClick: (event) => canvas.setCurrent(event.currentTarget.getAttribute('data-id')),
              }
            );

            const observer = new MutationObserver(
              (mutation) => {
                dot.updateCurrent(canvas.getActiveSlideIds());
              }
            );

            observer.observe(
              _canvas,
              {
                attributes: true,
                attributeFilter: ['data-active-slide-ids'],
              }
            );
          }
        );
      }

      canvas = new Canvas(
        _canvas,
        {
          slide: options.slide,
          fade: 'true' === target.getAttribute('data-fade'),
        }
      );

      this.initialized = true;
      target.setAttribute('data-initialized', 'true');
      addCustomEvent(target, 'initialized');
    };

    this.prev = () => {
      const current = !! canvas && canvas.getCurrent();
      if (false === current) {
        return;
      }

      if (0 < current) {
        const goto = current - 1;
        canvas.setCurrent(goto);

        if ('false' === canvas.getSlide(goto).getHidden()) {
          this.prev();
        }
      }
    };

    this.next = () => {
      const current = !! canvas && canvas.getCurrent();
      if (false === current) {
        return;
      }

      if (canvas.slides.length - 1 > current) {
        const goto = current + 1;
        canvas.setCurrent(goto);

        if ('false' === canvas.getSlide(goto).getHidden()) {
          this.next();
        }
      }
    }

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
