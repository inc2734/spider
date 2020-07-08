export const PrevArrow = (prevArrow, args) => {
  prevArrow.addEventListener('click', () => args.handleClick(), false);
};
