import { abstractCanvas } from './abstract-canvas';
import { Slide } from './slide';

export class FadeCanvas extends abstractCanvas {
  constructor(canvas, args) {
    super(canvas, args);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const current = Number(mutation.target.getAttribute('data-current'));
        this.slides.forEach((slide) => {
          current === slide.getId() ? slide.active() : slide.inactive();
        });
      });
    });

    observer.observe(
      this.target,
      {
        attributes: true,
        attributeFilter: ['data-current']
      }
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
