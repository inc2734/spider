export function StopButton(target, args) {
  target.addEventListener('click', () => args.handleClick(), false);
  return this;
}
