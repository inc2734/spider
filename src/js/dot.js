export function Dot(target, args) {
  this.active = () => {
    target.setAttribute('aria-current', 'true');
  }

  this.inactive = () => {
    target.removeAttribute('aria-current');
  }

  this.getId = () => {
    return Number(target.getAttribute('data-id'));
  }

  target.addEventListener('click', (event) => args.handleClick(event), false);

  return this;
}
