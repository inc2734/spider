import addCustomEvent from '@inc2734/add-custom-event';

import { abstractCanvas } from './abstract-canvas';
import { Slide } from './slide';

export class SlideCanvas extends abstractCanvas {
  constructor(canvas, args) {
    super(canvas, args);

    this.smoothScrollToTimerId = undefined;
    this.canvasScrollTimerId   = undefined;

    this.setScrollLeft = (left) => this.dom.scrollLeft = left;
    this.setScrollLeft(0);

    this.handleScroll = this.handleScroll.bind(this);
    this.dom.addEventListener('scroll', this.handleScroll, false);

    // Slides active/inactive ovserver
    if ('undefined' !== typeof IntersectionObserver) {
      const activeSlideIdsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const slide = new Slide(entry.target);
            if (entry.isIntersecting) {
              slide.active();
            } else {
              slide.inactive();
            }
          });
        },
        {
          root: this.dom,
          rootMargin: "0px -1.5px",
          threshold: [0.5, 1],
        }
      );
      this.slides.forEach((slide) => {
        activeSlideIdsObserver.observe(slide.dom);
      });
    }
  }

  beforeInit() {
  }

  afterInit() {
  }

  handleScroll() {
    clearTimeout(this.canvasScrollTimerId);

    this.canvasScrollTimerId = setTimeout(
      () => {
        const canvasLeft       = this.left();
        const currentSlideLeft = this.getSlide(this.getCurrent()).left();
        const diff             = Math.abs(canvasLeft - currentSlideLeft);
        if (1 < diff) {
          this.setCurrentForWheel();
        }
        addCustomEvent(this.dom, 'scrollEnd');
      },
      500
    );
  }

  setCurrentForWheel() {
    const reducer = (accumulator, slide) => {
      if (0 > accumulator.left()) {
        return slide;
      }
      if (0 > slide.left()) {
        return accumulator;
      }
      return accumulator.left() > slide.left() ? slide : accumulator;
    };
    const nearlySlide = this.slides.reduce(reducer);
    this.setCurrent(nearlySlide.getId());
    addCustomEvent(this.dom, 'setCurrentForWheel');
  }

  /**
   * I'd really like to use this, but there are a lot of unsupported browsers, so I'll use an alternative code.
   *
   * @see https://developer.mozilla.org/ja/docs/Web/API/Element/scrollTo
   */
  moveTo(currentSlide) {
    const start = this.scrollLeft();
    const left  = start + (currentSlide.left() - this.left());

    clearInterval(this.smoothScrollToTimerId);

    const direction = 0 < left - start ? 'next' : left !== start ? 'prev' : false;
    if (! direction) return;

    const fps   = 1000 / 60;
    const range = left - start;
    if (0 === range) return;

    const step = range / fps; // Scrolling volume per interval

    //this.dom.style.scrollSnapType = 'none';

    const easeOutCirc = (x) => Math.sqrt(1 - Math.pow(x - 1, 2));

    let count = 0;
    this.smoothScrollToTimerId = setInterval(
      () => {
        count += Math.abs(step);
        this.setScrollLeft(start + range * easeOutCirc(count / Math.abs(range)))

        if (Math.abs(range) <= count) {
          clearInterval(this.smoothScrollToTimerId);
          this.setScrollLeft(left);
          //this.dom.style.scrollSnapType = '';
        }
      },
      fps
    );
  }
}
