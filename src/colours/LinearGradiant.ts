import { Gradiant } from './Gradiant';

export class LinearGradiant extends Gradiant {
  public render(context: CanvasRenderingContext2D): CanvasGradient {
    const gradiant = context.createLinearGradient(this.x0, this.y0, this.x1, this.y1);

    gradiant.addColorStop(0, this.startColour.toRGBAString());
    gradiant.addColorStop(1, this.endColour.toRGBAString());

    for (const stopColour of this.stopColours) {
      gradiant.addColorStop(stopColour.offset, stopColour.colour.toRGBAString());
    }

    return gradiant;
  }
}
