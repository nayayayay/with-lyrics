import { Shape, ShapeOptions } from './Shape';
import { rotateContext } from '../utils';

export type FontStyle = 'normal'|'italic'|'oblique';
export type FontVariant = 'normal'|'small-caps';
export type FontWeight = 'normal'|'bold'|'bolder'|'lighter'|100|200|300|400|500|600|700|800|900;

export interface TextLayerOptions extends ShapeOptions {
  text?: string;
  fontStyle?: FontStyle;
  fontVariant?: FontVariant;
  fontWeight?: FontWeight;
  fontSize?: number;
  fontFamily?: string;
  rotation?: number;
}

export class TextLayer extends Shape {
  protected text: string;
  protected fontStyle: FontStyle;
  protected fontVariant: FontVariant;
  protected fontWeight: FontWeight;
  protected fontSize: number;
  protected fontFamily: string;
  protected rotation: number;

  constructor(options?: TextLayerOptions) {
    options = options || {};

    super(options);
    this.text = options.text || '';
    this.fontStyle = options.fontStyle || 'normal';
    this.fontVariant = options.fontVariant || 'normal';
    this.fontWeight = options.fontWeight || 'normal';
    this.fontSize = options.fontSize || 12;
    this.fontFamily = options.fontFamily || 'Arial';
    this.rotation = options.rotation || 0;
  }

  public getText(): string {
    return this.text;
  }

  public setText(text: string): void {
    this.text = text;
  }

  public getFontStyle(): FontStyle {
    return this.fontStyle;
  }

  public setFontStyle(fontStyle: FontStyle): void {
    this.fontStyle = fontStyle;
  }

  public getFontVariant(): FontVariant {
    return this.fontVariant;
  }

  public setFontVariant(fontVariant: FontVariant): void {
    this.fontVariant = fontVariant;
  }

  public getFontWeight(): FontWeight {
    return this.fontWeight;
  }

  public setFontWeight(fontWeight: FontWeight): void {
    this.fontWeight = fontWeight;
  }

  public getFontSize(): number {
    return this.fontSize;
  }

  public setFontSize(fontSize: number): void {
    this.fontSize = fontSize;
  }

  public getFontFamily(): string {
    return this.fontFamily;
  }

  public setFontFamily(fontFamily: string): void {
    this.fontFamily = fontFamily;
  }

  public getRotation(): number {
    return this.rotation;
  }

  public setRotation(rotation: number): void {
    this.rotation = rotation;
  }

  public render(context: CanvasRenderingContext2D): void {
    context.textBaseline = 'top';
    context.font = (
      `${this.fontStyle} ${this.fontVariant} ${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`
    );

    context.save();
    rotateContext(context, {
      x: this.x,
      y: this.y,
      width: context.measureText(this.text).width,
      height: this.fontSize,
      rotation: this.rotation
    });

    if (this.fill) {
      context.fillStyle = this.colour.render(context);
      context.fillText(this.text, this.x, this.y);
    } else {
      context.strokeStyle = this.colour.render(context);
      context.strokeText(this.text, this.x, this.y);
    }
  }
}
