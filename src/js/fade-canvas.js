import addCustomEvent from '@inc2734/add-custom-event';

import { abstractCanvas } from './abstract-canvas';
import { Slide } from './slide';

export class FadeCanvas extends abstractCanvas {
  constructor(canvas, args) {
    super(canvas, args);

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

  afterInit() {
    this.dom.classList.remove('is-fading');

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

  handleMouseup(event) {
    const distanceMoved = event.clientX - this.dragStartX;

    if (0 < distanceMoved) {
      const prevSlide = this.getPrevSlide();
      !! prevSlide && this.setCurrent(prevSlide.getId());
    } else if (0 > distanceMoved) {
      const nextSlide = this.getNextSlide();
      !! nextSlide && this.setCurrent(nextSlide.getId());
    }
  }

  moveTo(currentSlide) {
    if (! currentSlide.isActive()) {
      return;
    }

    this.dom.classList.add('is-fading');

    const visibleSlides = [].slice.call(
      this.dom.querySelectorAll('[data-active="false"]')
    ).map((slide) => new Slide(slide));

    visibleSlides.forEach((slide) => slide.inactive());
    currentSlide.active();

    const fadeEnd = () => {
      currentSlide.dom.removeEventListener('transitionend', fadeEnd, false);
      addCustomEvent(this.dom, 'fadeEnd');
      this.dom.classList.remove('is-fading');
    };
    currentSlide.dom.addEventListener('transitionend', fadeEnd, false);
  }
}
