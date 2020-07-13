import addCustomEvent from '@inc2734/add-custom-event';

export function Canvas(canvas, args) {
  this.slides = canvas.querySelectorAll(args.slide);

  this.setCurrent = (index) => {
    canvas.setAttribute('data-current', index);
  };

  this.getCurrent = () => {
    return Number(canvas.getAttribute('data-current'));
  };

  this.setScrollLeft = (left) => {
    canvas.scrollLeft = left;
  };

  /**
   * I'd really like to use this, but there are a lot of unsupported browsers, so I'll use an alternative code.
   *
   * @see https://developer.mozilla.org/ja/docs/Web/API/Element/scrollTo
   */
  let smoothScrollToTimerId;
  const smoothScrollTo = (left) => {
    clearInterval(smoothScrollToTimerId);

    const start = canvas.scrollLeft;
    const direction = 0 < left - start ? 'next' : left !== start ? 'prev' : false;
    if (! direction) return;

    const fps   = 1000 / 60;
    const range = left - start;
    if (0 === range) return;

    const step = range / fps; // Scrolling volume per interval

    let beforeCanvasScrollLeft = start;
    canvas.style.scrollSnapType = 'none';

    const easeOutCirc = (x) => Math.sqrt(1 - Math.pow(x - 1, 2));

    let count = 0;
    smoothScrollToTimerId = setInterval(
      () => {
        count += Math.abs(step);
        this.setScrollLeft(start + range * easeOutCirc(count / Math.abs(range)))

        if (Math.abs(range) <= count) {
          clearInterval(smoothScrollToTimerId);
          canvas.style.scrollSnapType = '';
          this.setScrollLeft(left);
        }
      },
      fps
    );
  };

  const fade = (currentSlide) => {
    const visibleSlides = canvas.querySelectorAll('[data-hidden="false"]');
    [].slice.call(visibleSlides).forEach((slide) => slide.setAttribute('data-hidden', 'true'));

    currentSlide.setAttribute('data-hidden', 'false');
  };

  const observer = new MutationObserver(
    () => {
      const current      = this.getCurrent();
      const currentSlide = this.slides[ current ];
      if (! currentSlide) {
        return;
      }

      const currentSlideX    = currentSlide.getBoundingClientRect().left;
      const canvasX          = canvas.getBoundingClientRect().left;
      const currentSlideRelX = currentSlideX - canvasX;

      if (args.fade) {
        fade(currentSlide);
      } else {
        smoothScrollTo(canvas.scrollLeft + currentSlideRelX);
      }
    }
  );

  observer.observe(
    canvas,
    {
      attributes: true,
      attributeFilter: ['data-current']
    }
  );

  let activeSlideIds = [];
  this.getActiveSlideIds = () => activeSlideIds;

  /**
   * If CSS is not applied, retry.
   */
  let updateActiveSlideIdsNumberOfRetrys = 10;
  let updateActiveSlideIdsTimerId        = undefined;
  const updateActiveSlideIds = () => {
    clearTimeout(updateActiveSlideIdsTimerId);

    const newActiveSlideIds = [];
    const slideYChecker     = [];
    const arrayUnique       = (array) => array.filter((value, index) => index === array.lastIndexOf(value));

    const canvasLeft  = canvas.getBoundingClientRect().left;
    const canvasRight = canvasLeft + canvas.offsetWidth;

    [].slice.call(this.slides).forEach(
      (slide, index) => {
        const slideLeft = slide.getBoundingClientRect().left;

        slideYChecker.push(slide.getBoundingClientRect().top);

        if (canvasLeft <= slideLeft && canvasRight > slideLeft) {
          newActiveSlideIds.push(slide.getAttribute('data-id'));
        }
      }
    );

    // If CSS is applied, the number of elements will be 1.
    if (1 < arrayUnique(slideYChecker).length && 0 < updateActiveSlideIdsNumberOfRetrys) {
      updateActiveSlideIdsTimerId = setTimeout(updateActiveSlideIds, 100);
      updateActiveSlideIdsNumberOfRetrys --;
      return;
    }

    activeSlideIds = newActiveSlideIds;
    console.log(activeSlideIds);
    addCustomEvent(canvas, 'updateActiveSlideIds')
  };

  const scrollLock = (left) => {
    this.setScrollLeft(left);
  };

  const updateCurrent = () => {
    const canvasX       = canvas.getBoundingClientRect().left;
    const slideRelXList = [];

    [].slice.call(this.slides).some(
      (slide, index) => {
        const slideX    = slide.getBoundingClientRect().left;
        const slideRelX = slideX - canvasX;
        slideRelXList[ index ] = Math.abs(slideRelX);
        if (0 === slideRelX) {
          return true;
        }
      }
    );

    const min  = Math.min(...slideRelXList);
    const near = slideRelXList.indexOf(min);

    this.getCurrent() !== near && this.setCurrent(near);
    scrollLock(canvas.scrollLeft + slideRelXList[ near ]);
  };

  this.setScrollLeft(0);
  this.setCurrent(0);

  [].slice.call(this.slides).forEach(
    (slide, index) => {
      slide.setAttribute('data-id', index);
    }
  );

  updateActiveSlideIds();

  if (args.fade) {
    const initFade = () => {
      canvas.removeEventListener('updateActiveSlideIds', initFade, false);

      const canvasX = canvas.getBoundingClientRect().left;
      const canvasWidth = canvas.offsetWidth;

      [].slice.call(this.slides).forEach(
        (slide, index) => {
          const slideX = slide.getBoundingClientRect().left;
          const slideRelx = slideX - canvasX;

          if (canvasWidth <= slideRelx) {
            if (0 < index) {
              slide.style.left = `${ index * 100 * -1 }%`;
              slide.setAttribute('data-hidden', 'true');
            }
          }
        }
      );
    };
    canvas.addEventListener('updateActiveSlideIds', initFade, false);
  }

  let canvasScrollTimerId = undefined;
  canvas.addEventListener(
    'scroll',
    () => {
      clearTimeout(canvasScrollTimerId);
      canvasScrollTimerId = setTimeout(() => addCustomEvent(canvas, 'scrollEnd'), 100);
    },
    false
  );

  canvas.addEventListener(
    'scrollEnd',
    () => {
      updateCurrent();
      updateActiveSlideIds(); // @todo fade のときはスクロールしないからこれが発火しない
    },
    false
  );

  return this;
}
