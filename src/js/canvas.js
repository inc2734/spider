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

    this.updateActiveSlideIdsNumberOfRetrys = 10;
    this.updateActiveSlideIdsTimerId = undefined;

    this.slides.forEach((slide, index) => slide.setId(index));

    this.setCurrent(0);
    this.updateActiveSlideIds();

    let resizeTimerId = undefined;
    window.addEventListener(
      'resize',
      () => {
        clearTimeout(resizeTimerId);
        resizeTimerId = setTimeout(
          () => {
            this.setCurrent(0);
            this.updateActiveSlideIds();
          },
          250
        );
      },
      false
    );

    const observer = new MutationObserver(
      (mutation) => {
        this.moveTo(this.getCurrent());
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
    clearTimeout(this.updateActiveSlideIdsTimerId);

    const arrayUnique   = (array) => array.filter((value, index) => index === array.lastIndexOf(value));
    const slideYChecker = arrayUnique(this.slides.map((slide) => slide.top()));

    // If CSS is applied, the number of elements will be 1.
    if (1 < slideYChecker.length && 0 < this.updateActiveSlideIdsNumberOfRetrys) {
      this.updateActiveSlideIdsTimerId = setTimeout(() => this.updateActiveSlideIds(), 100);
      this.updateActiveSlideIdsNumberOfRetrys --;
      return;
    }

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

    const initFade = () => {
      this.canvas.removeEventListener('updateActiveSlideIds', initFade, false);

      this.slides.forEach((slide) => slide.style('left', ''));

      this.slides.forEach(
        (slide, index) => {
          const beforeSlide = this.slides[ index - 1 ];
          if (beforeSlide) {
            const canvasSpace = this.right() - (beforeSlide.left() + beforeSlide.offsetWidth());

            if (0 <= canvasSpace && this.right() <= slide.left()) {
              const distance               = this.right() - slide.left();
              const distancePerCanvasWidth = distance / this.offsetWidth();
              const spacePerCanvasWidth    = canvasSpace / this.offsetWidth();
              const newSlideLeft           = `${ (distancePerCanvasWidth + spacePerCanvasWidth) * 100 - 100 }%`;

              slide.style('left', newSlideLeft);
              slide.setHidden('true');
              return;
            }
          }
          slide.setHidden('false');
        }
      );
    };

    this.canvas.addEventListener('updateActiveSlideIds', initFade, false);
    window.addEventListener('resize', initFade, false);

    this.canvas.addEventListener(
      'fadeEnd',
      () => {
        this.updateActiveSlideIds();
      },
      false
    );
  }

  moveTo(current) {
    const currentSlide = new Slide(this.canvas.querySelector(`[data-id="${ current }"]`));
    if (! currentSlide) {
      return;
    }

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

    const prevInvisibleSlides = invisibleSlides.concat().reverse().filter((slide) => current > slide.getId());
    const nextInvisibleSlides = invisibleSlides.filter((slide) => current < slide.getId());

    prevInvisibleSlides.some(
      (slide) => {
        if (currentSlide.left() <= slide.left()) {
          return true;
        }
        slide.setHidden('false');
      }
    );

    nextInvisibleSlides.some(
      (slide) => {
        if (currentSlide.left() >= slide.left()) {
          return true;
        }
        slide.setHidden('false');
      }
    );

    addCustomEvent(this.canvas, 'fadeEnd');
  }

  getNewActiveSlideIds() {
    const newActiveSlideIds = [];

    this.slides.forEach(
      (slide) => {
        if (
          null === slide.getHidden() && this.left() <= slide.left() && this.right() > slide.left()
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

    this.canvas.addEventListener(
      'scroll',
      () => {
        clearTimeout(this.canvasScrollTimerId);
        this.canvasScrollTimerId = setTimeout(() => addCustomEvent(this.canvas, 'scrollEnd'), 100);
      },
      false
    );

    this.canvas.addEventListener(
      'scrollEnd',
      () => {
        this.updateCurrent();
        this.updateActiveSlideIds();
      },
      false
    );
  }

  /**
   * I'd really like to use this, but there are a lot of unsupported browsers, so I'll use an alternative code.
   *
   * @see https://developer.mozilla.org/ja/docs/Web/API/Element/scrollTo
   */
  moveTo(current) {
    const currentSlide = new Slide(this.canvas.querySelector(`[data-id="${ current }"]`));
    if (! currentSlide) {
      return;
    }

    const start = this.scrollLeft();
    const left  = start + (currentSlide.left() - this.left());

    clearInterval(this.smoothScrollToTimerId);

    const direction = 0 < left - start ? 'next' : left !== start ? 'prev' : false;
    if (! direction) return;

    const fps   = 1000 / 60;
    const range = left - start;
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

    this.slides.forEach(
      (slide) => {
        const slideLeft = slide.left();

        if (this.left() <= slideLeft && this.right() > slideLeft) {
          newActiveSlideIds.push(slide.getId());
        }
      }
    );

    return newActiveSlideIds;
  }

  updateCurrent() {
    const slideRelLeftList = [];

    this.slides.some(
      (slide, index) => {
        const slideRelLeft = slide.left() - this.left();;
        slideRelLeftList[ index ] = Math.abs(slideRelLeft);
        if (0 === slideRelLeft) {
          return true;
        }
      }
    );

    const min  = Math.min(...slideRelLeftList);
    const near = slideRelLeftList.indexOf(min);

    this.getCurrent() !== near && this.setCurrent(near);
    this.setScrollLeft(this.scrollLeft() + slideRelLeftList[ near ]);
  }
}

export function Canvas(canvas, args) {
  return new (args.fade ? FadeCanvas : SlideCanvas)(canvas, args);
}
