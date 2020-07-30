import addCustomEvent from '@inc2734/add-custom-event';

import { Slide } from './slide';

class abstractCanvas {
  constructor(canvas, args) {
    this.canvas = canvas;
    this.args   = args;
    this.slides = [].slice.call(this.canvas.querySelectorAll(this.args.slide)).map((slide) => new Slide(slide));

    this.activeSlideIds = [];
    this.history = [];
    this.historyActiveSlideIds = [];

    // If CSS is applied, the number of elements will be 1.
    let updateActiveSlideIdsNumberOfRetrys = 10;
    let updateActiveSlideIdsTimerId = undefined;
    const initActiveSlideIds = () => {
      clearTimeout(updateActiveSlideIdsTimerId);

      const arrayUnique   = (array) => array.filter((value, index) => index === array.lastIndexOf(value));
      const slideYChecker = arrayUnique(this.slides.map((slide) => slide.top()));

      if (1 < slideYChecker.length && 0 < updateActiveSlideIdsNumberOfRetrys) {
        updateActiveSlideIdsTimerId = setTimeout(initActiveSlideIds, 100);
        updateActiveSlideIdsNumberOfRetrys --;
        return;
      }

      this.updateActiveSlideIds();
    };

    this.setCurrent(0);
    initActiveSlideIds();

    this.resizeTimerId = undefined;
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize, false);

    const observer = new MutationObserver(
      (mutation) => {
        const currentSlideDom = this.canvas.querySelector(`[data-id="${ this.getCurrent() }"]`);
        if (! currentSlideDom) {
          return;
        }

        const currentSlide = new Slide(currentSlideDom);
        if (! currentSlide) {
          return;
        }

        this.moveTo(currentSlide);
      }
    );

    observer.observe(
      this.canvas,
      {
        attributes: true,
        attributeFilter: ['data-current']
      }
    );
  }

  handleResize() {
    clearTimeout(this.resizeTimerId);
    this.resizeTimerId = setTimeout(
      () => {
        this.setCurrent(0);
        this.updateActiveSlideIds();
      },
      250
    );
  }

  scrollLeft() {
    return this.canvas.scrollLeft;
  }

  offsetWidth() {
    return this.canvas.offsetWidth;
  }

  left() {
    return this.canvas.getBoundingClientRect().left;
  }

  right() {
    return this.left() + this.offsetWidth();
  }

  setCurrent(index) {
    const newCurrent = Number(index);
    this.canvas.setAttribute('data-current', newCurrent);
    this.history.push(newCurrent);
  }

  getCurrent() {
    return Number(this.canvas.getAttribute('data-current'));
  }

  getSlide(index) {
    return this.slides[ index ];
  }

  getActiveSlideIds() {
    return this.activeSlideIds;
  }

  moveTo(current) {
    throw new Error('abstractCanvas.moveTo is abstract method. Override it with the child class.');
  }

  getNewActiveSlideIds() {
    throw new Error('abstractCanvas.moveTo is abstract method. Override it with the child class.');
  }

  /**
   * If CSS is not applied, retry.
   */
  updateActiveSlideIds() {
    const newActiveSlideIds = this.getNewActiveSlideIds();
    if (JSON.stringify(this.historyActiveSlideIds.slice(-1)[0]) === JSON.stringify(newActiveSlideIds)) {
      return;
    }

    this.activeSlideIds = newActiveSlideIds;
    this.historyActiveSlideIds.push(newActiveSlideIds);
    addCustomEvent(this.canvas, 'updateActiveSlideIds');
  }
}

class FadeCanvas extends abstractCanvas {
  constructor(canvas, args) {
    super(canvas, args);

    this.initFade = this.initFade.bind(this);
    this.initFade();
    window.addEventListener('resize', this.initFade, false);
  }

  initFade() {
    this.slides.forEach((slide) => slide.style('left', ''));

    this.slides.forEach(
      (slide, index) => {
        const canvasRight = this.right();
        const canvasWidth = this.offsetWidth();
        const beforeSlide = this.getSlide( index - 1 );

        if (beforeSlide) {
          const slideLeft   = slide.left();
          const canvasSpace = canvasRight - (beforeSlide.left() + beforeSlide.offsetWidth());

          if (canvasRight <= slideLeft) {
            const distance               = canvasRight - slideLeft;
            const distancePerCanvasWidth = distance / canvasWidth;
            const spacePerCanvasWidth    = canvasSpace / canvasWidth;
            const diffPercent            = distancePerCanvasWidth + spacePerCanvasWidth - 1;
            const newSlideLeft           = `${ (diffPercent * canvasWidth) }px`;

            slide.style('left', newSlideLeft);
            slide.setHidden('true');
            return;
          }
        }
        slide.setHidden('false');
      }
    );
  }

  moveTo(currentSlide) {
    if ('false' === currentSlide.getHidden()) {
      return;
    }

    const visibleSlides = [].slice.call(
      this.canvas.querySelectorAll('[data-hidden="false"]')
    ).map((slide) => new Slide(slide));

    const invisibleSlides = [].slice.call(
      this.canvas.querySelectorAll('[data-hidden="true"]')
    ).map((slide) => new Slide(slide));

    visibleSlides.forEach((slide) => slide.setHidden('true'));
    currentSlide.setHidden('false');

    const current          = this.getCurrent();
    const currentSlideLeft = currentSlide.left();

    const prevInvisibleSlides = invisibleSlides.concat().reverse().filter((slide) => current > slide.getId());
    const nextInvisibleSlides = invisibleSlides.filter((slide) => current < slide.getId());

    prevInvisibleSlides.some(
      (slide) => {
        if (currentSlideLeft <= slide.left()) {
          return true;
        }
        slide.setHidden('false');
      }
    );

    nextInvisibleSlides.some(
      (slide) => {
        if (currentSlideLeft >= slide.left()) {
          return true;
        }
        slide.setHidden('false');
      }
    );

    this.updateActiveSlideIds();
    addCustomEvent(this.canvas, 'fadeEnd');
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

    this.setScrollLeft = (left) => this.canvas.scrollLeft = left;
    this.setScrollLeft(0);

    this.handleScroll = this.handleScroll.bind(this);
    this.canvas.addEventListener('scroll', this.handleScroll, false);
  }

  handleScroll() {
    clearTimeout(this.canvasScrollTimerId);

    this.canvasScrollTimerId = setTimeout(
      () => {
        this.updateActiveSlideIds();
        this.setCurrentForWheel();
        addCustomEvent(this.canvas, 'scrollEnd');
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
    this.canvas.style.scrollSnapType = 'none';

    const easeOutCirc = (x) => Math.sqrt(1 - Math.pow(x - 1, 2));

    let count = 0;
    this.smoothScrollToTimerId = setInterval(
      () => {
        count += Math.abs(step);
        this.setScrollLeft(start + range * easeOutCirc(count / Math.abs(range)))

        if (Math.abs(range) <= count) {
          clearInterval(this.smoothScrollToTimerId);
          this.canvas.style.scrollSnapType = '';
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
