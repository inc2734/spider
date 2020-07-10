import addCustomEvent from '@inc2734/add-custom-event';

export const Canvas = (canvas, args) => {
  canvas.scrollLeft = 0;
  canvas.setAttribute('data-current', 0);

  let canvasScrollTimerId = undefined;

  [].slice.call(args.slides).forEach(
    (slide, index) => {
      slide.setAttribute('data-id', index);
    }
  );

  const scrollLock = (left) => {
    canvas.scrollLeft = left;
  };

  const updateCurrent = () => {
    const canvasX       = canvas.getBoundingClientRect().left;
    const slideRelXList = [];

    [].slice.call(args.slides).some(
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
    const nearSlide  = args.slides[ near ];
    const nearSlideX = nearSlide.getBoundingClientRect().left;

    canvas.setAttribute('data-current', nearSlide.getAttribute('data-id'));
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
};
