import addCustomEvent from '@inc2734/add-custom-event';

export function Canvas(canvas, args) {
  this.slides = canvas.querySelectorAll(args.slide);

  this.setCurrent = (index) => {
    canvas.setAttribute('data-current', index);
  };

  this.getCurrent = () => {
    return Number(canvas.getAttribute('data-current'));
  };

  canvas.scrollLeft = 0;
  this.setCurrent(0);

  let canvasScrollTimerId = undefined;

  [].slice.call(this.slides).forEach(
    (slide, index) => {
      slide.setAttribute('data-id', index);
    }
  );

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

    const step = (left - start) / 20;
    let beforeCanvasScrollLeft = start;
    canvas.style.scrollSnapType = 'none';

    smoothScrollToTimerId = setInterval(
      () => {
        canvas.scrollLeft = canvas.scrollLeft + step;

        if (
          'next' === direction && left <= canvas.scrollLeft
          || 'prev' === direction && left >= canvas.scrollLeft
          || beforeCanvasScrollLeft === canvas.scrollLeft
        ) {
          clearInterval(smoothScrollToTimerId);
          canvas.style.scrollSnapType = '';
          canvas.scrollLeft = left;
        }

        beforeCanvasScrollLeft = canvas.scrollLeft;
      },
      10
    );
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

      smoothScrollTo(canvas.scrollLeft + currentSlideRelX);
    }
  );

  observer.observe(
    canvas,
    {
      attributes: true,
      attributeFilter: ['data-current']
    }
  );

  const scrollLock = (left) => {
    canvas.scrollLeft = left;
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

    const min        = Math.min(...slideRelXList);
    const near       = slideRelXList.indexOf(min);
    const nearSlide  = this.slides[ near ];
    const nearSlideX = nearSlide.getBoundingClientRect().left;

    this.setCurrent(nearSlide.getAttribute('data-id'));
    scrollLock(canvas.scrollLeft + slideRelXList[ near ]);
  };

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
    },
    false
  );

  return this;
}
