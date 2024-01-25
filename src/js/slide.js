export function Slide(target) {
  if (! target) {
    return;
  }

  this.dom = target;

  this.getId = () => {
    return Number(target.getAttribute('data-id'));
  };

  this.top = () => {
    return this.dom.getBoundingClientRect().top;
  };

  this.left = () => {
    return this.dom.getBoundingClientRect().left;
  };

  this.right = () => {
    return this.left() + this.offsetWidth();
  };

  this.offsetWidth = () => {
    return this.dom.offsetWidth;
  };

  this.style = (property, value) => {
    this.dom.style[ property ] = value;
  };

  this.active = () => {
    this.dom.setAttribute('data-active', 'true');
  }

  this.inactive = () => {
    this.dom.removeAttribute('data-active');
  }

  this.visible = () => {
    this.dom.setAttribute('data-visible', 'true');
  }

  this.invisible = () => {
    this.dom.removeAttribute('data-visible');
  }

  this.isActive = () => {
    return 'true' === this.dom.getAttribute('data-active');
  }

  this.isVisible = () => {
    return 'true' === this.dom.getAttribute('data-visible');
  }
}
