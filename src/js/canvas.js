import addCustomEvent from '@inc2734/add-custom-event';

import { Slide } from './slide';

const abstractMethodOverrideError = (methodName) => {
  throw new Error(`${ methodName } is abstract method. Override it with the child class.`);
};

class abstractCanvas {
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

      this.beforeInit();
      this.setCurrent(0);
      this.updateActiveSlideIds();
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

  getActiveSlideIds() {
    return JSON.parse(this.target.getAttribute('data-active-slide-ids'));
  }

  setActiveSlideIds(ids) {
    this.target.setAttribute('data-active-slide-ids', JSON.stringify(ids));
  }

  updateActiveSlideIds() {
    const newActiveSlideIds = this.getNewActiveSlideIds();
    if (JSON.stringify(this.historyActiveSlideIds.slice(-1)[0]) === JSON.stringify(newActiveSlideIds)) {
      return;
    }

    this.historyActiveSlideIds.push(newActiveSlideIds);
    this.setActiveSlideIds(newActiveSlideIds)
  }

  moveTo(current) {
    abstractMethodOverrideError('abstractCanvas.moveTo');
  }

  getNewActiveSlideIds() {
    abstractMethodOverrideError('abstractCanvas.getNewActiveSlideIds');
  }

  beforeInit() {
    abstractMethodOverrideError('abstractCanvas.beforeInit');
  }

  afterInit() {
    abstractMethodOverrideError('abstractCanvas.afterInit');
  }
}

class FadeCanvas extends abstractCanvas {
  constructor(canvas, args) {
    super(canvas, args);
  }

  beforeInit() {
  }

  afterInit() {
    this.slides.forEach(
      (slide, index) => {
        if (0 === index) {
          slide.setHidden(false);
          return;
        }
        slide.style('left', `${ index * -1 * 100}%`);
        slide.setHidden(true);
      }
    );
  }

  moveTo(currentSlide) {
    if ('false' === currentSlide.getHidden()) {
      return;
    }

    const visibleSlides = [].slice.call(
      this.target.querySelectorAll('[data-hidden="false"]')
    ).map((slide) => new Slide(slide));

    visibleSlides.forEach((slide) => slide.setHidden('true'));
    currentSlide.setHidden('false');

    this.updateActiveSlideIds();
  }

  getNewActiveSlideIds() {
    const newActiveSlideIds = [];
    const canvasLeft  = Math.round(this.left());
    const canvasRight = Math.round(this.right());

    this.slides.forEach(
      (slide) => {
        const slideLeft = Math.round(slide.left());
        if (
          null === slide.getHidden() && canvasLeft <= slideLeft && canvasRight > slideLeft
          || 'false' === slide.getHidden()
        ) {
          newActiveSlideIds.push(slide.getId());
        }
      }
    );

    return newActiveSlideIds;
  }
}

class SlideCanvas extends abstractCanvas {
  constructor(canvas, args) {
    super(canvas, args);

    this.smoothScrollToTimerId = undefined;;
    this.canvasScrollTimerId   = undefined;

    this.setScrollLeft = (left) => this.target.scrollLeft = left;
    this.setScrollLeft(0);

    this.handleScroll = this.handleScroll.bind(this);
    this.target.addEventListener('scroll', this.handleScroll, false);
  }

  beforeInit() {
  }

  afterInit() {
  }

  handleScroll() {
    clearTimeout(this.canvasScrollTimerId);

    this.canvasScrollTimerId = setTimeout(
      () => {
        this.updateActiveSlideIds();
        this.setCurrentForWheel();
        addCustomEvent(this.target, 'scrollEnd');
      },
      250
    );
  }

  setCurrentForWheel() {
    const canvasLeft = this.left();
    this.slides.some(
      (slide, index) => {
        const slideRelLeft = Math.round(Math.abs(slide.left() - canvasLeft));
        if (0 === slideRelLeft) {
          this.setCurrent(slide.getId());
          return true;
        }
      }
    );
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
    const range = Math.round(left - start);
    if (0 === range) return;

    const step = range / fps; // Scrolling volume per interval

    let beforeCanvasScrollLeft = start;
    this.target.style.scrollSnapType = 'none';

    const easeOutCirc = (x) => Math.sqrt(1 - Math.pow(x - 1, 2));

    let count = 0;
    this.smoothScrollToTimerId = setInterval(
      () => {
        count += Math.abs(step);
        this.setScrollLeft(start + range * easeOutCirc(count / Math.abs(range)))

        if (Math.abs(range) <= count) {
          clearInterval(this.smoothScrollToTimerId);
          this.target.style.scrollSnapType = '';
          this.setScrollLeft(left);
        }
      },
      fps
    );
  }

  getNewActiveSlideIds() {
    const newActiveSlideIds = [];
    const canvasLeft  = Math.round(this.left());
    const canvasRight = Math.round(this.right());

    this.slides.forEach(
      (slide) => {
        const slideLeft = Math.round(slide.left());

        if (canvasLeft <= slideLeft && canvasRight > slideLeft) {
          newActiveSlideIds.push(slide.getId());
        }
      }
    );

    return newActiveSlideIds;
  }
}

export function Canvas(canvas, args) {
  return new (args.fade ? FadeCanvas : SlideCanvas)(canvas, args);
}
