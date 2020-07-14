export function Slide(slide) {
  if (! slide) {
    return;
  }

  this.dom = slide;

  this.setId = (id) => {
    slide.setAttribute('data-id', id);
  };

  this.getId = () => {
    return Number(slide.getAttribute('data-id'));
  };

  this.top = () => {
    return slide.getBoundingClientRect().top;
  };

  this.left = () => {
    return slide.getBoundingClientRect().left;
  };

  this.offsetWidth = () => {
    return slide.offsetWidth;
  };

  this.style = (property, value) => {
    slide.style[ property ] = value;
  };

  this.setHidden = (hidden) => {
    slide.setAttribute('data-hidden', hidden);
  };

  this.getHidden = () => {
    return slide.getAttribute('data-hidden');
  }
}
