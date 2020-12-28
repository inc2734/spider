import { Slide } from './slide';

const abstractMethodOverrideError = (methodName) => {
  throw new Error(`${ methodName } is abstract method. Override it with the child class.`);
};

export class abstractCanvas {
  constructor(target, args) {
    this.target = target;
    this.args   = args;
    this.slides = [].slice.call(this.target.querySelectorAll(this.args.slide)).map((slide) => new Slide(slide));
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
        const currentSlideDom = this.target.querySelector(`[data-id="${ this.getCurrent() }"]`);
        if (! currentSlideDom) {
          return;
        }

        const currentSlide = this.slides[ this.getCurrent() ];
        if (! currentSlide) {
          return;
        }

        this.moveTo(currentSlide);
      }
    );

    observer.observe(
      this.target,
      {
        attributes: true,
        attributeFilter: ['data-current']
      }
    );
  }

  scrollLeft() {
    return this.target.scrollLeft;
  }

  offsetWidth() {
    return this.target.offsetWidth;
  }

  left() {
    return this.target.getBoundingClientRect().left;
  }

  right() {
    return this.left() + this.offsetWidth();
  }

  setWidth(width) {
    this.target.style.width = width;
  }

  setCurrent(index) {
    this.target.setAttribute('data-current', Number(index));
  }

  getCurrent() {
    return Number(this.target.getAttribute('data-current'));
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
