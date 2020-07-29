export function DotsWrapper(dotsWrapper, args) {
  this.updateCurrent = (ids) => {
    const oldDots = dotsWrapper.querySelectorAll(`${ args.dot }[aria-current="true"]`);
    oldDots.forEach((dot) => dot.setAttribute('aria-current', 'false'));

    ids.forEach(
     (id) => {
       const dot = dotsWrapper.querySelector(`${ args.dot }[data-id="${ id }"]`);
       if (dot) {
         dot.setAttribute('aria-current', 'true');
       }
     }
    );
  };

  const dots = dotsWrapper.querySelectorAll(args.dot);
  [].slice.call(dots).forEach((dot) => dot.addEventListener('click', (event) => args.handleClick(event), false));

  return this;
}
