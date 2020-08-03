export function PrevArrow(target, args) {
  target.addEventListener('click', () => args.handleClick(), false);
  return this;
}
