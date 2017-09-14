import { Shape, ShapeOptions } from './Shape';
import { Rotatable, rotate } from '../utils';

export interface RectangleOptions extends ShapeOptions {
  width?: number;
  height?: number;
  rotation?: number;
}

export class Rectangle extends Shape implements Rotatable {
  protected width: number;
  protected height: number;
  protected rotation: number;

  constructor(options?: RectangleOptions) {
    options = options || {};

    super(options);
    this.width = options.width !== undefined ? options.width : 200;
    this.height = options.height !== undefined ? options.height : 150;
    this.rotation = options.rotation || 0;
  }

  public getWidth(): number {
    return this.width;
  }

  public setWidth(width: number): void {
    this.width = width;
  }

  public getHeight(): number {
    return this.height;
  }

  public setHeight(height: number): void {
    this.height = height;
  }

  public getRotation(): number {
    return this.rotation;
  }

  public setRotation(rotation: number): void {
    this.rotation = rotation;
  }

  public render(context: CanvasRenderingContext2D): void {
    context.save();
    rotate(context, this);

    if (this.fill) {
      context.fillStyle = this.colour.render(context);
      context.strokeRect(this.x, this.y, this.width, this.height);
    } else {
      context.strokeStyle = this.colour.render(context);
      context.strokeRect(this.x, this.y, this.width, this.height);
    }

    context.restore();
  }
}
