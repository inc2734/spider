export function DotsWrapper(dotsWrapper, args) {
  this.updateCurrent = (index) => {
    const oldDot = dotsWrapper.querySelector(`${ args.dot }[aria-current="true"]`);
    const newDot = dotsWrapper.querySelector(`${ args.dot }[data-id="${ index }"]`);
    !! oldDot && oldDot.setAttribute('aria-current', 'false');
    !! newDot && newDot.setAttribute('aria-current', 'true');
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
