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
  const canvas = target.querySelector(options.canvas);
  if (! canvas) {
    return;
  }

  return new function() {
    this.target      = target
    this.options     = options;
    this.canvas      = canvas;
    this.slides      = this.canvas.querySelectorAll(this.options.slide);
    this.prevArrow   = target.querySelector(this.options.prevArrow);
    this.nextArrow   = target.querySelector(this.options.nextArrow);
    this.dotsWrapper = target.querySelector(this.options.dotsWrapper);

    this.prev = () => {
      const current  = Number(this.canvas.getAttribute('data-current'));
      const prevItem = this.slides[ current - 1 ] || this.slides[ current ];

      this.canvas.scrollTo(
        {
          left: this.canvas.scrollLeft + prevItem.getBoundingClientRect().left,
          behavior: 'smooth',
        }
      );
    };

    this.next = () => {
      const current  = Number(this.canvas.getAttribute('data-current'));
      const nextItem = this.slides[ current + 1 ] || this.slides[ current ];

      this.canvas.scrollTo(
        {
          left: this.canvas.scrollLeft + nextItem.getBoundingClientRect().left,
          behavior: 'smooth',
        }
      );
    }

    this.moveTo = (index) => {
      const nextItem = this.slides[ index ] || this.slides[ current ];

      this.canvas.scrollTo(
        {
          left: this.canvas.scrollLeft + nextItem.getBoundingClientRect().left,
          behavior: 'smooth',
        }
      );
    };

    if (this.prevArrow) {
      PrevArrow(
        this.prevArrow,
        {
          handleClick: this.prev,
        }
      );
    }

    if (this.nextArrow) {
      NextArrow(
        this.nextArrow,
        {
          handleClick: this.next,
        }
      );
    }

    if (this.dotsWrapper) {
      DotsWrapper(
        this.dotsWrapper,
        {
          numberOfSlides: this.slides.length,
          canvas: this.canvas,
          dot: this.options.dot,
          handleClick: (event) => this.moveTo(event.currentTarget.getAttribute('data-index')),
        }
      );
    }

    Canvas(
      this.canvas,
      {
        slides: this.slides,
      }
    );

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
    const sliders = document.querySelectorAll(target);
    if (1 > sliders.length) {
      return;
    }

    return newSpiders(sliders, options);
  } else if (true === target instanceof NodeList) {
    return newSpiders(target, options);
  } else if (true === target instanceof HTMLElement) {
    return newSpider(target, options);
  }
}
