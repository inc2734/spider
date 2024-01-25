export function StartButton(target, args) {
  target.addEventListener('click', () => args.handleClick(), false);
  return this;
}
