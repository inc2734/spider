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
          threshold: [0.75, 1],
        }
      );
      this.slides.forEach((slide) => {
        activeSlideIdsObserver.observe(slide.dom);
      });

      const visibleSlideIdsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const slide = new Slide(entry.target);
            if (entry.isIntersecting) {
              slide.visible();
            } else {
              slide.invisible();
            }
          });
        },
        {
          root: this.dom,
          rootMargin: "0px -1px",
          threshold: [0],
        }
      );
      this.slides.forEach((slide) => {
        visibleSlideIdsObserver.observe(slide.dom);
      });
    }
  }

  handleScroll() {
    clearTimeout(this.canvasScrollTimerId);
    if (this.isDrag) {
      return;
    }

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

  handleMousedown(event) {
    clearTimeout(this.canvasScrollTimerId);
  }

  handleMousemove(event) {
    this.setScrollLeft(this.dragStartScrollLeft + this.dragStartX - event.clientX);
  }

  handleMouseup(event) {
    const dragEndTime   = new Date;
    const timeTaken     = dragEndTime.getTime() - this.dragStartTime.getTime();
    const distanceMoved = event.clientX - this.dragStartX;

    if (300 > timeTaken) {
      const newLeft = this.scrollLeft() - (distanceMoved / timeTaken) * 100;
      this.moveToLeft(newLeft);
    }
  }

  afterHandleMouseup() {
    this.handleScroll();
  }

  setCurrentForWheel() {
    const reducer = (accumulator, slide) => {
      const accumulatorDisplaySize = accumulator.offsetWidth() - Math.abs(this.left() - accumulator.left());
      const slideDisplaySize       = slide.offsetWidth() - Math.abs(this.left() - slide.left());

      return slideDisplaySize > accumulatorDisplaySize
        ? slide
        : accumulator;
    };
    const nearlySlide = this.slides.reduce(reducer);
    this.setCurrent(nearlySlide.getId());
    addCustomEvent(this.dom, 'setCurrentForWheel');
  }

  moveTo(currentSlide) {
    const start = this.scrollLeft();
    const maxScrollVoulme = this.scrollWidth() - this.offsetWidth();

    let goto = start + (currentSlide.left() - this.left());
    if (maxScrollVoulme < goto) {
      goto = maxScrollVoulme;
    } else if (0 > goto) {
      goto = 0;
    }

    this.moveToLeft(goto);
  }

  /**
   * I'd really like to use this, but there are a lot of unsupported browsers, so I'll use an alternative code.
   *
   * @see https://developer.mozilla.org/ja/docs/Web/API/Element/scrollTo
   */
  moveToLeft(left) {
    const start = this.scrollLeft();

    clearInterval(this.smoothScrollToTimerId);

    const direction = 0 < left - start ? 'next' : left !== start ? 'prev' : false;
    if (! direction) return;

    const fps   = 1000 / 60;
    const range = left - start;
    if (0 === range) return;

    const step = range / fps; // Scrolling volume per interval
    const durationPerDistance = this.args.container.getDuration() || 1000;

    // @see https://www.geeksforgeeks.org/fabric-js-easeoutcirc-method/
    // const easeOutCirc = (duration, startValue, displacement, interval) => displacement * Math.sqrt(1 - (duration = duration / interval - 1) * duration) + startValue;

    // @see https://www.geeksforgeeks.org/fabric-js-easeoutcubic-method/
    // const easeOutCubic = (duration, startValue, displacement, interval) => displacement * ((duration = duration / interval - 1) * duration * duration + 1) + startValue;

    // @see https://www.geeksforgeeks.org/fabric-js-easeoutquad-method/
    const easeOutQuad = (duration, startValue, displacement, interval) => -displacement * (duration /= interval) * (duration - 2) + startValue;

    let count = 0;
    let prevLeft = start;
    this.smoothScrollToTimerId = setInterval(
      () => {
        count += Math.abs(step);
        const newLeft = easeOutQuad(count, start, range, durationPerDistance * Math.abs(range / 750));

        if (
          'next' === direction && newLeft <= left && newLeft >= prevLeft
          || 'prev' === direction && newLeft >= left && newLeft <= prevLeft
        ) {
          this.setScrollLeft(newLeft);
          prevLeft = newLeft;
        } else {
          clearInterval(this.smoothScrollToTimerId);
          this.setScrollLeft(left);
        }
      },
      fps
    );
  }
}
