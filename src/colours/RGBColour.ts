import { Colour } from './Colour';

export interface RGBColourOptions {
  red?: number;
  green?: number;
  blue?: number;
  alpha?: number;
}

export class RGBColour extends Colour {
  protected red: number;
  protected green: number;
  protected blue: number;
  protected alpha: number;

  constructor(options?: RGBColourOptions) {
    options = options || {};

    super();
    this.red = options.red !== undefined ? this.clampColour(options.red) : 0;
    this.green = options.green !== undefined ? this.clampColour(options.green) : 0;
    this.blue = options.blue !== undefined ? this.clampColour(options.blue) : 0;
    this.alpha = options.alpha !== undefined ? this.clampAlpha(options.alpha) : 1;
  }

  public getRed(): number {
    return this.red;
  }

  public setRed(red: number): void {
    this.red = this.clampColour(red);
  }

  public getGreen(): number {
    return this.green;
  }

  public setGreen(green: number): void {
    this.green = this.clampColour(green);
  }

  public getBlue(): number {
    return this.blue;
  }

  public setBlue(blue: number): void {
    this.blue = this.clampColour(blue);
  }

  public getAlpha(): number {
    return this.alpha;
  }

  public setAlpha(alpha: number) {
    this.alpha = this.clampAlpha(alpha);
  }

  public toRGBString(): string {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  public toRGBAString(): string {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
  }

  public render(context: CanvasRenderingContext2D): string {
    return this.toRGBAString();
  }

  protected clampColour(colour: number): number {
    if (colour < 0) {
      return 0;
    }

    if (colour > 255) {
      return 255;
    }

    return colour;
  }

  protected clampAlpha(alpha: number): number {
    if (alpha < 0) {
      return 0;
    }

    if (alpha > 1) {
      return 1;
    }

    return alpha;
  }
}
