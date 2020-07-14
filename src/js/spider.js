import addCustomEvent from '@inc2734/add-custom-event';

import { Canvas } from './canvas';
import { PrevArrow } from './prev-arrow';
import { NextArrow } from './next-arrow';
import { DotsWrapper } from './dots-wrapper';

const newSpiders = (sliders, options) => {
  const spiders = [];

  [].slice.call(sliders).forEach(
    (slider) => {
      const spider = new Spider(slider, options);
      if (!! spider) {
        spiders.push(spider);
      }
    }
  );

  return spiders;
};

const newSpider = (target, options) => {
  if ('true' === target.getAttribute('data-initialized')) {
    return;
  }

  const canvas = target.querySelector(options.canvas);
  if (! canvas) {
    return;
  }

  const prevArrow   = target.querySelector(options.prevArrow);
  const nextArrow   = target.querySelector(options.nextArrow);
  const dotsWrapper = target.querySelector(options.dotsWrapper);

  return new function() {
    this.target  = target
    this.options = options;

    this.canvas = new Canvas(
      canvas,
      {
        slide: this.options.slide,
        fade: 'true' === target.getAttribute('data-fade'),
      }
    );

    this.prev = () => {
      const current = this.canvas.getCurrent();
      0 < current && this.canvas.setCurrent(current - 1);
    };

    this.next = () => {
      const current = this.canvas.getCurrent();
      this.canvas.slides.length - 1 > current && this.canvas.setCurrent(current + 1)
    }

    this.moveTo = (index) => {
      const current = this.canvas.getCurrent();
      !! this.canvas.slides[ index ] && this.canvas.setCurrent(index);
    };

    if (prevArrow) {
      this.prevArrow = new PrevArrow(
        prevArrow,
        {
          handleClick: this.prev,
        }
      );
    }

    if (nextArrow) {
      this.nextArrow = new NextArrow(
        nextArrow,
        {
          handleClick: this.next,
        }
      );
    }

    if (dotsWrapper) {
      this.dotsWrapper = new DotsWrapper(
        dotsWrapper,
        {
          numberOfSlides: this.canvas.slides.length,
          dot: this.options.dot,
          handleClick: (event) => this.canvas.setCurrent(event.currentTarget.getAttribute('data-id')),
        }
      );

      this.dotsWrapper.updateCurrent(this.canvas.getActiveSlideIds());
      canvas.addEventListener('updateActiveSlideIds', () => this.dotsWrapper.updateCurrent(this.canvas.getActiveSlideIds()), false);
    }

    target.setAttribute('data-initialized', 'true');
    addCustomEvent(target, 'initialized');
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
    dotsWrapper: '.spider__dots',
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
