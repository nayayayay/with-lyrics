import { Layer, LayerOptions } from './Layer';
import { checkExtension, Rotatable, rotate } from '../utils';

export interface ImageOptions extends LayerOptions {
  filePath: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rotation?: number;
}

export class ImageLayer extends Layer implements Rotatable {
  protected filePath: string;
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;
  protected rotation: number;
  protected ratio: number[];
  protected image: HTMLImageElement;
  protected ready: boolean;

  constructor(options: ImageOptions) {
    if (checkExtension(options.filePath, ['jpg', 'jpeg', 'png', 'bmp']) === false) {
      throw new Error(`Invalid file extension ${options.filePath}.`)
    }

    super(options);
    this.filePath = options.filePath;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 0;
    this.height = options.height || 0;
    this.rotation = options.rotation || 0;
    this.ratio = [0, 0];
    this.image = new Image();
    this.ready = false;

    this.image.addEventListener('load', () => {
      this.ready = true;
      
      if (this.width !== this.image.width) {
        this.ratio[0] = this.width !== 0 ? this.width / this.image.width : this.image.width;
      }

      if (this.height !== this.image.height) {
        this.ratio[1] = this.height !== 0 ? this.height / this.image.height : this.image.height;
      }
    });

    this.image.src = this.filePath;
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

  public getWidth(): number {
    return this.width;
  }

  public setWidth(width: number): void {
    this.width = width;
    this.ratio[0] = this.width / this.image.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public setHeight(height: number): void {
    this.height = height;
    this.ratio[1] = this.height / this.image.height;
  }

  public getRotation(): number {
    return this.rotation;
  }

  public setRotation(rotation: number): void {
    this.rotation = rotation;
  }
  
  public getRatio(): number[] {
    return [...this.ratio];
  }

  public setRatio(ratio: number[]): void {
    this.ratio = [...ratio];
  }

  public setFixedRatio(ratio: number): void {
    this.ratio[0] = ratio;
    this.ratio[1] = ratio;
    this.width = this.ratio[0] / this.image.width;
    this.height = this.ratio[1] / this.image.height;
  }

  public getImage(): HTMLImageElement {
    return this.image;
  }

  public isReady(): boolean {
    return this.ready;
  }

  public render(context: CanvasRenderingContext2D): void {
    context.save();
    context.scale(this.ratio[0], this.ratio[1]);
    rotate(context, this);
    context.drawImage(this.image, this.x, this.y);
    context.restore();
  }
}
