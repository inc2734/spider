export function NextArrow(target, args) {
  target.addEventListener('click', () => args.handleClick(), false);
  return this;
}
