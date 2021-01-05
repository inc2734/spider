import { Slide } from './slide';

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

  args.initial ? this.active() : this.inactive();
  target.addEventListener('click', (event) => args.handleClick(event), false);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const slide = new Slide(mutation.target);
      slide.isActive() ? this.active() : this.inactive();
    });
  });

  observer.observe(
    args.relatedSlide.dom,
    {
      attributes: true,
      attributeFilter: ['data-active'],
    }
  );

  return this;
}
