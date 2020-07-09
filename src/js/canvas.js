import addCustomEvent from '@inc2734/add-custom-event';

export const Canvas = (canvas, args) => {
  canvas.scrollLeft = 0;
  canvas.setAttribute('data-current', 0);

  let canvasScrollTimerId = undefined;

  const updateCurrent = () => {
    const canvasX = canvas.getBoundingClientRect().left;
    [].slice.call(args.slides).forEach(
      (item, index) => {
        const itemX = item.getBoundingClientRect().left;
        if (canvasX === itemX) {
          canvas.setAttribute('data-current', index);
          return;
        }
      }
    );
  };

  const scrollLock = () => {
    const canvasX   = canvas.getBoundingClientRect().left;
    const itemXList = [];
    [].slice.call(args.slides).forEach(
      (item, index) => {
        const itemX = item.getBoundingClientRect().left;
        itemXList[ index ] = Math.abs(itemX - canvasX);
      }
    );

    if (-1 !== itemXList.indexOf(0)) {
      return;
    }

    const min  = Math.min(...itemXList);
    const near = itemXList.indexOf(min);
    const nearItem  = args.slides[ near ];
    const nearItemX = nearItem.getBoundingClientRect().left;
    if (nearItem) {
      canvas.scrollLeft += (nearItemX - canvasX);
    }
  };

  let test = 0;
  canvas.addEventListener(
    'scroll',
    () => {
      clearTimeout(canvasScrollTimerId);

      canvasScrollTimerId = setTimeout(
        () => {
          test ++;
          console.log(test);
          addCustomEvent(canvas, 'scrollEnd');
        },
        100
      );
    },
    false
  );

  canvas.addEventListener(
    'scrollEnd',
    () => {
      updateCurrent();
      scrollLock();
    },
    false
  );
};
