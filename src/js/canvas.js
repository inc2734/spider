import { SlideCanvas } from './slide-canvas';
import { FadeCanvas } from './fade-canvas';

export function Canvas(canvas, args) {
  return new (args.fade ? FadeCanvas : SlideCanvas)(canvas, args);
}
