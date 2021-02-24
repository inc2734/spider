import addCustomEvent from '@inc2734/add-custom-event';

import { Slide } from './slide';

const abstractMethodOverrideError = (methodName) => {
  throw new Error(`${ methodName } is abstract method. Override it with the child class.`);
};

export class abstractCanvas {
  constructor(target, args) {
    this.dom    = target;
    this.args   = args;
    this.slides = [].slice.call(this.dom.querySelectorAll(this.args.slide)).map((slide) => new Slide(slide));
    this.historyActiveSlideIds = [];

    // If CSS is applied, the number of elements will be 1.
    let initNumberOfRetrys = 10;
    let initTimerId = undefined;
    const init = () => {
      clearTimeout(initTimerId);

      const arrayUnique   = (array) => array.filter((value, index) => index === array.lastIndexOf(value));
      const slideYChecker = arrayUnique(this.slides.map((slide) => slide.top()));

      if (1 < slideYChecker.length && 0 < initNumberOfRetrys) {
        initTimerId = setTimeout(init, 100);
        initNumberOfRetrys --;
        return;
      }

      this.setWidth('');
      this.beforeInit();
      this.setWidth(`${ Math.floor(this.offsetWidth()) }px`);
      this.setCurrent(0);
      this.afterInit();
    };
    init();

    window.addEventListener('resize', () => setTimeout(init, 250), false);

    const observer = new MutationObserver(
      () => {
        const currentSlideDom = this.dom.querySelector(`[data-id="${ this.getCurrent() }"]`);
        if (! currentSlideDom) {
          return;
        }

        const currentSlide = this.slides[ this.getCurrent() ];
        if (! currentSlide) {
          return;
        }

        addCustomEvent(this.dom, 'updateCurrent');
        this.moveTo(currentSlide);
      }
    );

    observer.observe(
      this.dom,
      {
        attributes: true,
        attributeFilter: ['data-current']
      }
    );
  }

  scrollLeft() {
    return this.dom.scrollLeft;
  }

  offsetWidth() {
    return this.dom.offsetWidth;
  }

  left() {
    return this.dom.getBoundingClientRect().left;
  }

  right() {
    return this.left() + this.offsetWidth();
  }

  setWidth(width) {
    this.dom.style.width = width;
  }

  setCurrent(index) {
    this.dom.setAttribute('data-current', Number(index));
  }

  getCurrent() {
    return Number(this.dom.getAttribute('data-current'));
  }

  getSlides() {
    return this.slides;
  }

  getSlide(index) {
    return this.slides[ index ];
  }

  moveTo(current) {
    abstractMethodOverrideError('abstractCanvas.moveTo');
  }

  beforeInit() {
    abstractMethodOverrideError('abstractCanvas.beforeInit');
  }

  afterInit() {
    abstractMethodOverrideError('abstractCanvas.afterInit');
  }
}
