export const DotsWrapper = (dotsWrapper, args) => {
  const createDot = (className, index) => {
    const dot  = document.createElement('button');
    const text = document.createTextNode(index);
    dot.appendChild(text);
    dot.classList.add(className);
    dot.setAttribute('data-index', index);
    return dot;
  };

  for (let i = 0; i < args.numberOfSlides; i ++) {
    const dot = createDot(args.dot.slice(1), i);
    dotsWrapper.appendChild(dot);
    dot.addEventListener('click', (event) => args.handleClick(event), false);
  }

  const observer = new MutationObserver(
    () => {
      const current = args.canvas.getAttribute('data-current');
      const oldDot  = dotsWrapper.querySelector(`${ args.dot }[aria-current="true"]`);
      const newDot  = dotsWrapper.querySelector(`${ args.dot }[data-index="${ current }"]`);
      !! oldDot && oldDot.setAttribute('aria-current', 'false');
      !! newDot && newDot.setAttribute('aria-current', 'true');
    }
  );

  observer.observe(
    args.canvas,
    {
      attributes: true,
      attributeFilter: ['data-current']
    }
  );
}
