import addCustomEvent from '@inc2734/add-custom-event';

export const Canvas = (canvas, args) => {
  canvas.scrollLeft = 0;
  canvas.setAttribute('data-current', 0);

  let canvasScrollTimerId = undefined;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(
        (entry) => {
          if (0 >= canvas.scrollLeft) {
            return;
          }

          const current     = Number(canvas.getAttribute('data-current'));
          const entrySlideX = entry.boundingClientRect.left;

          let newCurrent = current;
          if (! entry.isIntersecting && 0 > entrySlideX) { // next
            newCurrent = Number(entry.target.getAttribute('data-id')) + 1;
          } else if (entry.isIntersecting && 0 > entrySlideX) { // prev
            newCurrent = Number(entry.target.getAttribute('data-id'));
          }

          canvas.setAttribute('data-current', newCurrent);
        }
      );
    },
    {
      root: canvas,
      rootMargin: '0px',
      threshold: 0,
    }
  );
  [].slice.call(args.slides).forEach(
    (slide, index) => {
      slide.setAttribute('data-id', index);
      observer.observe(slide);
    }
  );

  const scrollLock = () => {
    const canvasX   = canvas.getBoundingClientRect().left;
    const slideXList = [];
    [].slice.call(args.slides).forEach(
      (slide, index) => {
        const slideX = slide.getBoundingClientRect().left;
        slideXList[ index ] = Math.abs(slideX - canvasX);
      }
    );

    if (-1 !== slideXList.indexOf(0)) {
      return;
    }

    const min  = Math.min(...slideXList);
    const near = slideXList.indexOf(min);
    const nearSlide  = args.slides[ near ];
    const nearSlideX = nearSlide.getBoundingClientRect().left;
    if (nearSlide) {
      canvas.scrollLeft += (nearSlideX - canvasX);
    }
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
      scrollLock();
    },
    false
  );
};
