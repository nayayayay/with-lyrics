import { Gradiant, GradiantOptions } from './Gradiant';

export interface RadialGradiantOptions extends GradiantOptions {
  r0?: number;
  r1?: number;
}

export class RadialGradiant extends Gradiant {
  protected r0: number;
  protected r1: number;

  constructor(options?: RadialGradiantOptions) {
    options = options || {};

    super(options);
    this.r0 = options.r0 || 0;
    this.r1 = options.r1 || 0;
  }

  public getR0(): number {
    return this.r0;
  }

  public setR0(r0: number): void {
    this.r0 = r0;
  }

  public getR1(): number {
    return this.r1;
  }

  public setR1(r1: number): void {
    this.r1 = r1;
  }

  public render(context: CanvasRenderingContext2D): CanvasGradient {
    const gradiant = context.createRadialGradient(this.x0, this.y0, this.r0, this.x1, this.y1, this.r1);

    gradiant.addColorStop(0, this.startColour.toRGBAString());
    gradiant.addColorStop(1, this.endColour.toRGBAString());

    for (const stopColour of this.stopColours) {
      gradiant.addColorStop(stopColour.offset, stopColour.colour.toRGBAString());
    }

    return gradiant;
  }
}
