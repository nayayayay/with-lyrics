import { Shape, ShapeOptions } from './Shape';
import { rotateContext } from '../utils';

export interface CircleOptions extends ShapeOptions {
  radius?: number;
  rotation?: number;
}

export class Circle extends Shape {
  protected radius: number;
  protected rotation: number;

  constructor(options?: CircleOptions) {
    options = options || {};

    super(options);
    this.radius = options.radius !== undefined ? options.radius : 50;
    this.rotation = options.rotation || 0;
  }

  public getRadius(): number {
    return this.radius;
  }

  public setRadius(radius: number): void {
    this.radius = radius;
  }

  public getRotation(): number {
    return this.rotation;
  }

  public setRotation(rotation: number): void {
    this.rotation = rotation;
  }

  public render(context: CanvasRenderingContext2D): void {
    context.save();
    rotateContext(context, {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2,
      rotation: this.rotation
    });

    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    
    if (this.fill) {
      context.fillStyle = this.colour.render(context);
      context.fill();
    } else {
      context.strokeStyle = this.colour.render(context);
      context.stroke();
    }

    context.restore();
  }
}
