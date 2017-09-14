import { Layer, LayerOptions } from './Layer';
import { Colour, RGBColour } from '../colours';

export interface ShapeOptions extends LayerOptions {
  x?: number;
  y?: number;
  colour?: Colour;
  fill?: boolean;
};

export class Shape extends Layer {
  protected x: number;
  protected y: number;
  protected colour: Colour;
  protected fill: boolean;

  constructor(options?: ShapeOptions) {
    options = options || {};

    super(options);
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.colour = options.colour || new RGBColour();
    this.fill = options.fill !== undefined ? options.fill : true;
  }

  public getX(): number {
    return this.x;
  }

  public setX(x: number): void {
    this.x = x;
  }

  public getY(): number {
    return this.y;
  }

  public setY(y: number): void {
    this.y = y;
  }

  public getColour(): Colour {
    return this.colour;
  }

  public setColour(colour: Colour): void {
    this.colour = colour;
  }

  public getFill(): boolean {
    return this.fill;
  }

  public setFill(fill: boolean): void {
    this.fill = fill;
  }
}
