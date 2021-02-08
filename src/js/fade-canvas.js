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

  moveTo(currentSlide) {
    if (! currentSlide.isActive()) {
      return;
    }

    const visibleSlides = [].slice.call(
      this.target.querySelectorAll('[data-active="false"]')
    ).map((slide) => new Slide(slide));

    visibleSlides.forEach((slide) => slide.inactive());
    currentSlide.active();
  }
}
