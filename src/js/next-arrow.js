export function NextArrow(nextArrow, args) {
  nextArrow.addEventListener('click', () => args.handleClick(), false);
  return this;
}
