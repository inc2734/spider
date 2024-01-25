import addCustomEvent from '@inc2734/add-custom-event';

import { Slide } from './slide';

const abstractMethodOverrideError = (methodName) => {
  throw new Error(`${ methodName } is abstract method. Override it with the child class.`);
};

export class abstractCanvas {
  constructor(target, args) {
    this.dom                   = target;
    this.args                  = args;
    this.slides                = [].slice.call(this.dom.querySelectorAll(this.args.slide)).map((slide) => new Slide(slide));
    this.historyActiveSlideIds = [];

    this.dragStartX          = undefined;
    this.dragStartScrollLeft = undefined;
    this.dragStartTime       = undefined;
    this.isDrag              = false;

    // If CSS is applied, the number of elements will be 1.
    let initNumberOfRetrys = 10;
    let initTimerId        = undefined;
    const init             = () => {
      clearTimeout(initTimerId);

      const arrayUnique   = (array) => array.filter((value, index) => index === array.lastIndexOf(value));
      const slideYChecker = arrayUnique(this.slides.map((slide) => slide.top()));

      if (1 < slideYChecker.length && 0 < initNumberOfRetrys) {
        initTimerId = setTimeout(init, 100);
        initNumberOfRetrys --;
        return;
      }

      this.dragStartX          = undefined;
      this.dragStartScrollLeft = undefined;
      this.dragStartTime       = undefined;
      this.isDrag              = false;
      this.dom.classList.remove('is-dragging');

      this.beforeInit();

      // const width = `${ Math.floor(this.offsetWidth()) }px`;
      const width = this.contentWidth();
      this.setCurrent(this.getSlide(0).getId());
      this.args.container.setProperty('--spider--reference-width', `${ this.referenceWidth() }px`);
      this.args.container.setProperty('--spider--canvas-width', width);
      this.afterInit();
    };
    init();

    let documentWidth = document.body.clientWidth;
    window.addEventListener('resize', () => {
      const newDocumentWidth = document.body.clientWidth;
      if (documentWidth !== newDocumentWidth) {
        documentWidth = newDocumentWidth;
        setTimeout(init, 250);
      }
    }, false);

    const observer = new MutationObserver(
      () => {
        const currentSlide = this.getCurrentSlide();
        if (! currentSlide) {
          return;
        }

        addCustomEvent(this.dom, 'updateCurrent');
        this.moveTo(currentSlide);
      }
    );

    observer.observe(
      this.dom,
      {
        attributes: true,
        attributeFilter: ['data-current']
      }
    );

    this._handleMousedown = this._handleMousedown.bind(this);
    this.dom.addEventListener('mousedown', this._handleMousedown, false);

    this._handleMousemove = this._handleMousemove.bind(this);
    this.dom.addEventListener('mousemove', this._handleMousemove, false);

    this._handleMouseup = this._handleMouseup.bind(this);
    this.dom.addEventListener('mouseup', this._handleMouseup, false);
    this.dom.addEventListener('mouseleave', this._handleMouseup, false);
  }

  _handleMousedown(event) {
    event.preventDefault();
    event.stopPropagation();

    this.dragStartX          = event.clientX;
    this.dragStartScrollLeft = this.scrollLeft();
    this.dragStartTime       = new Date;
    this.isDrag              = true;

    this.handleMousedown(event);
  }

  handleMousedown(event) {
  }

  _handleMousemove(event) {
    event.preventDefault();
    event.stopPropagation();

    if (! this.isDrag) {
      return;
    }

    this.dom.classList.add('is-dragging');
    this.handleMousemove(event);
  }

  handleMousemove(event) {
  }

  _handleMouseup(event) {
    event.preventDefault();
    event.stopPropagation();

    if (! this.isDrag) {
      return;
    }

    this.handleMouseup(event);

    this.dragStartX          = undefined;
    this.dragStartScrollLeft = undefined;
    this.dragStartTime       = undefined;
    this.isDrag              = false;
    this.dom.classList.remove('is-dragging');

    this.afterHandleMouseup();
  }

  handleMouseup(event) {
  }

  afterHandleMouseup() {
  };

  scrollLeft() {
    return this.dom.scrollLeft;
  }

  contentWidth() {
    if ( this.dom.style.paddingRight && this.dom.style.paddingLeft ) {
      return `calc(${ this.dom.clientWidth }px - ${ this.dom.style.paddingRight } - ${ this.dom.style.paddingLeft })`;
    } else if ( this.dom.style.paddingRight ) {
      return `calc(${ this.dom.clientWidth }px - ${ this.dom.style.paddingRight })`;
    } else if ( this.dom.style.paddingLeft ) {
      return `calc(${ this.dom.clientWidth }px - ${ this.dom.style.paddingLeft })`;
    } else {
      return `${ this.dom.clientWidth }px`;
    }
  }

  offsetWidth() {
    return this.dom.offsetWidth;
  }

  scrollWidth() {
    return this.dom.scrollWidth;
  }

  referenceWidth() {
    return this.args.reference.clientWidth;
  }

  referenceOffsetWidth() {
    return this.args.reference.offsetWidth;
  }

  referenceLeft() {
    return this.args.reference.getBoundingClientRect().left;
  }

  left() {
    const referenceWidth       = this.referenceWidth();
    const referenceOffsetWidth = this.referenceOffsetWidth();
    const referenceLeft        = this.referenceLeft();
    const canvasPadding        = this.slides[0].left() - referenceLeft + this.scrollLeft();
    return referenceLeft + ((referenceOffsetWidth - referenceWidth) / 2) + canvasPadding;
  }

  setCurrent(index) {
    this.dom.setAttribute('data-current', Number(index));
  }

  getCurrent() {
    return Number(this.dom.getAttribute('data-current'));
  }

  getSlides() {
    return this.slides;
  }

  getSlide(index) {
    return this.slides[ index ];
  }

  getSlideById(id) {
    return this.getSlides().find((slide) => slide.getId() === Number(id));
  }

  getCurrentSlide() {
    return this.getSlideById(this.getCurrent());
  }

  getPrevSlide() {
    const current   = this.getCurrent();
    const prevSlide = this.getSlide(this.getSlides().findIndex((slide) => current === slide.getId()) - 1);
    return !! prevSlide
      ? prevSlide
      : this.getSlide(this.getSlides().length - 1);
  }

  getNextSlide() {
    const allSlides    = [...this.getSlides()];
    const activeSlides = [...this.getActiveSlides()];

    if (1 > allSlides.length || 1 > activeSlides.length) {
      return this.getSlide(0);
    }

    if (allSlides?.[allSlides.length - 1]?.getId() === activeSlides?.[activeSlides.length - 1]?.getId()) {
      return this.getSlide(0);
    }

    const current   = this.getCurrent();
    const nextSlide = this.getSlide(allSlides.findIndex((slide) => current === slide.getId()) + 1);
    return !! nextSlide
      ? nextSlide
      : this.getSlide(0);
  }

  getActiveSlides() {
    return this.getSlides().filter((slide) => slide.isActive());
  }

  getVisibleSlides() {
    return this.getSlides().filter((slide) => slide.isVisible());
  }

  setCurrentForWheel() {
    abstractMethodOverrideError('abstractCanvas.setCurrentForWheel');
  }

  moveTo(current) {
    abstractMethodOverrideError('abstractCanvas.moveTo');
  }

  beforeInit() {
  }

  afterInit() {
  }
}
