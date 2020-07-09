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

    /**
     * I'd really like to use this, but there are a lot of unsupported browsers, so I'll use an alternative code.
     *
     * @see https://developer.mozilla.org/ja/docs/Web/API/Element/scrollTo
     */
    let smoothScrollToTimerId;
    const smoothScrollTo = (left) => {
      clearInterval(smoothScrollToTimerId);

      const start = this.canvas.scrollLeft;
      const direction = 0 < left - start ? 'next' : left !== start ? 'prev' : false;
      if (! direction) return;

      const step = (left - start) / 20;
      let beforeCanvasScrollLeft = start;
      this.canvas.style.scrollSnapType = 'none';

      smoothScrollToTimerId = setInterval(
        () => {
          this.canvas.scrollLeft = this.canvas.scrollLeft + step;

          if (
            'next' === direction && left <= this.canvas.scrollLeft
            || 'prev' === direction && left >= this.canvas.scrollLeft
            || beforeCanvasScrollLeft === this.canvas.scrollLeft
          ) {
            clearInterval(smoothScrollToTimerId);
            this.canvas.style.scrollSnapType = '';
            this.canvas.scrollLeft = left;
          }

          beforeCanvasScrollLeft = this.canvas.scrollLeft;
        },
        10
      );
    };

    this.prev = () => {
      const current   = Number(this.canvas.getAttribute('data-current'));
      this.moveTo(current - 1);
    };

    this.next = () => {
      const current   = Number(this.canvas.getAttribute('data-current'));
      this.moveTo(current + 1);
    }

    this.moveTo = (index) => {
      const current = Number(this.canvas.getAttribute('data-current'));
      if (current === index) {
        return;
      }

      const nextItem  = this.slides[ index ] || this.slides[ current ];
      const canvasX   = this.canvas.getBoundingClientRect().left;
      const nextItemX = nextItem.getBoundingClientRect().left;

      smoothScrollTo(this.canvas.scrollLeft + nextItemX - canvasX);
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
