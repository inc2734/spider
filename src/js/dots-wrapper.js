export function DotsWrapper(dotsWrapper, args) {
  this.updateCurrent = (ids) => {
    const oldDots = dotsWrapper.querySelectorAll(`${ args.dot }[aria-current="true"]`);
    oldDots.forEach((dot) => dot.setAttribute('aria-current', 'false'));

    ids.forEach(
     (id) => {
       const dot = dotsWrapper.querySelector(`${ args.dot }[data-id="${ id }"]`);
       dot.setAttribute('aria-current', 'true');
     }
    );
  };

  const createDot = (className, index) => {
    const dot  = document.createElement('button');
    const text = document.createTextNode(index);
    dot.appendChild(text);
    dot.classList.add(className);
    dot.setAttribute('data-id', index);
    return dot;
  };

  for (let i = 0; i < args.numberOfSlides; i ++) {
    const dot = createDot(args.dot.slice(1), i);
    dotsWrapper.appendChild(dot);
    dot.addEventListener('click', (event) => args.handleClick(event), false);
  }

  return this;
}
