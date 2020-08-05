export function Slide(target) {
  if (! target) {
    return;
  }

  this.dom = target;

  this.getId = () => {
    return Number(target.getAttribute('data-id'));
  };

  this.top = () => {
    return target.getBoundingClientRect().top;
  };

  this.left = () => {
    return target.getBoundingClientRect().left;
  };

  this.offsetWidth = () => {
    return target.offsetWidth;
  };

  this.style = (property, value) => {
    target.style[ property ] = value;
  };

  this.setHidden = (hidden) => {
    if (null === hidden) {
      target.removeAttribute('data-hidden');
    } else {
      target.setAttribute('data-hidden', hidden);
    }
  };

  this.getHidden = () => {
    return target.getAttribute('data-hidden');
  }
}
