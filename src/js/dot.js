export function Dot(target, args) {
  this.updateCurrent = (ids) => {
    target.setAttribute('aria-current', 'false');

    const id = Number(target.getAttribute('data-id'));
    if (-1 !== ids.indexOf(id)) {
      target.setAttribute('aria-current', 'true');
    }
  };

  target.addEventListener('click', (event) => args.handleClick(event), false);

  return this;
}
