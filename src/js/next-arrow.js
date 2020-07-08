export const NextArrow = (nextArrow, args) => {
  nextArrow.addEventListener('click', () => args.handleClick(), false);
};
