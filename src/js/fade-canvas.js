import addCustomEvent from '@inc2734/add-custom-event';

import { abstractCanvas } from './abstract-canvas';
import { Slide } from './slide';

export class FadeCanvas extends abstractCanvas {
  constructor(canvas, args) {
    super(canvas, args);

    this.dragStartX = undefined;
    this.isDrag     = false;

    this.handleMousedown = this.handleMousedown.bind(this);
    this.dom.addEventListener('mousedown', this.handleMousedown, false);

    this.handleMouseup = this.handleMouseup.bind(this);
    this.dom.addEventListener('mouseup', this.handleMouseup, false);
    this.dom.addEventListener('mouseleave', this.handleMouseup, false);

    // Slides active/inactive ovserver
    canvas.addEventListener(
      'updateCurrent',
      () => {
        this.getSlides().forEach((slide) => {
          this.getCurrent() === slide.getId() ? slide.active() : slide.inactive();
        });
      },
      false
    );
  }

  beforeInit() {
  }

  afterInit() {
    this.slides.forEach(
      (slide, index) => {
        if (0 === index) {
          slide.active();
          return;
        }
        slide.style('left', `${ index * -1 * 100}%`);
        slide.inactive();
      }
    );
  }

  handleMousedown(event) {
    event.preventDefault();
    event.stopPropagation();

    this.dragStartX = event.clientX;
    this.isDrag     = true;
  }

  handleMouseup(event) {
    event.preventDefault();
    event.stopPropagation();

    if (! this.isDrag) {
      return;
    }

    const distanceMoved = event.clientX - this.dragStartX;
    const current       = this.getCurrent();

    if (0 < distanceMoved) {
      0 < current && this.setCurrent(current - 1);
    } else if (0 > distanceMoved) {
      this.getSlides().length - 1 > current && this.setCurrent(current + 1);
    }

    this.dragStartX = undefined;
    this.isDrag     = false;
  }

  moveTo(currentSlide) {
    if (! currentSlide.isActive()) {
      return;
    }

    const visibleSlides = [].slice.call(
      this.dom.querySelectorAll('[data-active="false"]')
    ).map((slide) => new Slide(slide));

    visibleSlides.forEach((slide) => slide.inactive());
    currentSlide.active();

    const fadeEnd = () => {
      currentSlide.dom.removeEventListener('transitionend', fadeEnd, false);
      addCustomEvent(this.dom, 'fadeEnd');
    };
    currentSlide.dom.addEventListener('transitionend', fadeEnd, false);
  }
}
