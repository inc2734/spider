import addCustomEvent from '@inc2734/add-custom-event';

class abstractCanvas {
  constructor(canvas, args) {
    this.canvas = canvas;
    this.args   = args;
    this.slides = this.canvas.querySelectorAll(this.args.slide);

    this.activeSlideIds = [];
    this.updateActiveSlideIdsNumberOfRetrys = 10;
    this.updateActiveSlideIdsTimerId = undefined;

    [].slice.call(this.slides).forEach(
      (slide, index) => {
        slide.setAttribute('data-id', index);
      }
    );

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
        const current      = this.getCurrent();
        const currentSlide = this.canvas.querySelector(`[data-id="${ current }"]`);
        if (! currentSlide) {
          return;
        }

        this.moveTo(current);
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
    this.canvas.setAttribute('data-current', index);
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
    const slideYChecker = arrayUnique([].slice.call(this.slides).map((slide) => slide.getBoundingClientRect().top));

    const newActiveSlideIds = this.getNewActiveSlideIds();

    // If CSS is applied, the number of elements will be 1.
    if (1 < slideYChecker.length && 0 < this.updateActiveSlideIdsNumberOfRetrys) {
      this.updateActiveSlideIdsTimerId = setTimeout(() => this.updateActiveSlideIds(), 100);
      this.updateActiveSlideIdsNumberOfRetrys --;
      return;
    }

    this.activeSlideIds = newActiveSlideIds;
    addCustomEvent(this.canvas, 'updateActiveSlideIds')
  }
}

class FadeCanvas extends abstractCanvas {
  constructor(canvas, args) {
    super(canvas, args);

    const initFade = () => {
      this.canvas.removeEventListener('updateActiveSlideIds', initFade, false);

      [].slice.call(this.slides).forEach((slide) => slide.style.left = '');

      [].slice.call(this.slides).forEach(
        (slide, index) => {
          const beforeSlide = this.slides[ index - 1 ];
          if (beforeSlide) {
            const slideLeft        = slide.getBoundingClientRect().left;
            const beforeSlideLeft  = beforeSlide.getBoundingClientRect().left;
            const beforeSlideRight = beforeSlideLeft + slide.offsetWidth;
            const canvasSpace      = this.right() - beforeSlideRight;

            if (0 <= canvasSpace && this.right() <= slideLeft) {
              const distance               = this.right() - slideLeft;
              const distancePerCanvasWidth = distance / this.offsetWidth();
              const spacePerCanvasWidth    = canvasSpace / this.offsetWidth();
              const newSlideLeft           = `${ (distancePerCanvasWidth + spacePerCanvasWidth) * 100 - 100 }%`;

              slide.style.left = newSlideLeft;
              slide.setAttribute('data-hidden', 'true');
              return;
            }
          }
          slide.setAttribute('data-hidden', 'false');
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
    const currentSlide = this.canvas.querySelector(`[data-id="${ current }"]`);
    if (! currentSlide) {
      return;
    }

    if ('false' === currentSlide.getAttribute('data-hidden')) {
      return;
    }

    const visibleSlides   = this.canvas.querySelectorAll('[data-hidden="false"]');
    const invisibleSlides = this.canvas.querySelectorAll('[data-hidden="true"]');

    [].slice.call(visibleSlides).forEach((slide) => slide.setAttribute('data-hidden', 'true'));
    currentSlide.setAttribute('data-hidden', 'false');

    const prevInvisibleSlides = [].slice.call(invisibleSlides).reverse().filter(
      (slide) => current > Number(slide.getAttribute('data-id'))
    );

    const nextInvisibleSlides = [].slice.call(invisibleSlides).filter(
      (slide) => current < Number(slide.getAttribute('data-id'))
    );

    const currentX = currentSlide.getBoundingClientRect().left;

    prevInvisibleSlides.some(
      (slide, index) => {
        const slideX = slide.getBoundingClientRect().left;
        if (currentX <= slideX) {
          return true;
        }
        slide.setAttribute('data-hidden', 'false');
      }
    );

    nextInvisibleSlides.some(
      (slide, index) => {
        const slideX = slide.getBoundingClientRect().left;
        if (currentX >= slideX) {
          return true;
        }
        slide.setAttribute('data-hidden', 'false');
      }
    );

    addCustomEvent(this.canvas, 'fadeEnd');
  }

  getNewActiveSlideIds() {
    const newActiveSlideIds = [];

    [].slice.call(this.slides).forEach(
      (slide) => {
        const slideHidden = slide.getAttribute('data-hidden');
        const slideLeft   = slide.getBoundingClientRect().left;

        if (null === slideHidden && this.left() <= slideLeft && this.right() > slideLeft || 'false' === slideHidden) {
          newActiveSlideIds.push(slide.getAttribute('data-id'));
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
    const currentSlide = this.canvas.querySelector(`[data-id="${ current }"]`);
    if (! currentSlide) {
      return;
    }

    const start            = this.scrollLeft();
    const currentSlideX    = currentSlide.getBoundingClientRect().left;
    const currentSlideRelX = currentSlideX - this.left();;
    const left             = start + currentSlideRelX;

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

    [].slice.call(this.slides).forEach(
      (slide) => {
        const slideLeft = slide.getBoundingClientRect().left;

        if (this.left() <= slideLeft && this.right() > slideLeft) {
          newActiveSlideIds.push(slide.getAttribute('data-id'));
        }
      }
    );

    return newActiveSlideIds;
  }

  updateCurrent() {
    const slideRelXList = [];

    [].slice.call(this.slides).some(
      (slide, index) => {
        const slideX    = slide.getBoundingClientRect().left;
        const slideRelX = slideX - this.left();
        slideRelXList[ index ] = Math.abs(slideRelX);
        if (0 === slideRelX) {
          return true;
        }
      }
    );

    const min  = Math.min(...slideRelXList);
    const near = slideRelXList.indexOf(min);

    this.getCurrent() !== near && this.setCurrent(near);
    this.setScrollLeft(this.scrollLeft() + slideRelXList[ near ]);
  }
}

export function Canvas(canvas, args) {
  return new (args.fade ? FadeCanvas : SlideCanvas)(canvas, args);
}
