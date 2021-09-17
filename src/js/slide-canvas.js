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

    this.dragStartX = undefined;
    this.dragStartScrollLeft = undefined;
    this.dragStartTime = undefined;
    this.isDrag = false;
    this.handleMousedown = this.handleMousedown.bind(this);
    this.dom.addEventListener('mousedown', this.handleMousedown, false);
    this.handleMousemove = this.handleMousemove.bind(this);
    this.dom.addEventListener('mousemove', this.handleMousemove, false);
    this.handleMouseup = this.handleMouseup.bind(this);
    this.dom.addEventListener('mouseup', this.handleMouseup, false);
    this.dom.addEventListener('mouseleave', this.handleMouseup, false);

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
    event.preventDefault();
    event.stopPropagation();

    clearTimeout(this.canvasScrollTimerId);
    this.dragStartX = event.clientX;
    this.dragStartScrollLeft = this.scrollLeft();
    this.dragStartTime = new Date;
    this.isDrag = true;
  }

  handleMousemove(event) {
    event.preventDefault();
    event.stopPropagation();

    if (! this.isDrag) {
      return;
    }

    this.setScrollLeft(this.dragStartScrollLeft + this.dragStartX - event.clientX);
  }

  handleMouseup(event) {
    event.preventDefault();
    event.stopPropagation();

    if (! this.isDrag) {
      return;
    }

    const dragEndTime = new Date;
    const timeTaken = dragEndTime.getTime() - this.dragStartTime.getTime();
    const distanceMoved = Math.abs(event.clientX - this.dragStartX);

    if (300 > timeTaken) {
      const direction = 0 < this.dragStartX - event.clientX ? 'next' : event.clientX !== this.dragStartX ? 'prev' : false;
      let newLeft = false;
      if ('next' === direction) {
        newLeft = this.scrollLeft() + (distanceMoved / timeTaken) * 100;
      } else if ('prev' === direction) {
        newLeft = this.scrollLeft() - (distanceMoved / timeTaken) * 100;
      }
      if (false !== newLeft) {
        this.moveToLeft(newLeft);
      }
    }

    this.dragStartX = undefined;
    this.dragStartScrollLeft = undefined;
    this.dragStartTime = undefined;
    this.isDrag = false;

    this.handleScroll();
  }

  setCurrentForWheel() {
    const reducer = (accumulator, slide) => {
      const accumulatorDisplaySize = accumulator.offsetWidth() - Math.abs(this.left() - accumulator.left());
      const slideDisplaySize = slide.offsetWidth() - Math.abs(this.left() - slide.left());

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
    const left  = start + (currentSlide.left() - this.left());
    this.moveToLeft(left);
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

    //this.dom.style.scrollSnapType = 'none';

    const easeOutCirc = (x) => Math.sqrt(1 - Math.pow(x - 1, 2));

    let count = 0;
    let prevLeft = start;
    this.smoothScrollToTimerId = setInterval(
      () => {
        count += Math.abs(step);
        const newLeft = start + range * easeOutCirc(count / Math.abs(range));

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
