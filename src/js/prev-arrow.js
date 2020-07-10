export function PrevArrow(prevArrow, args) {
  prevArrow.addEventListener('click', () => args.handleClick(), false);
  return this;
}
