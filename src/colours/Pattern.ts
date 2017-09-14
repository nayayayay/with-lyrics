import { Colour } from './Colour';
import { checkExtension } from '../utils';

export type Repeat = 'repeat'|'repeat-x'|'repeat-y'|'no-repeat';

export interface PatternOptions {
  filePath: string;
  repeat?: Repeat;
}

export class Pattern extends Colour {
  protected readonly image: HTMLImageElement;
  protected repeat: Repeat;
  protected ready: boolean;

  constructor(options: PatternOptions) {
    if (checkExtension(options.filePath, ['jpg', 'jpeg', 'png', 'bitmap']) === false) {
      throw new Error(`Invalid file extension ${options.filePath}.`);
    }

    super();
    this.image = new Image();
    this.repeat = options.repeat || 'repeat';
    this.ready = false;

    this.image.addEventListener('load', () => {
      this.ready = true;
    });

    this.image.src = options.filePath;
  }

  public getImage(): HTMLImageElement {
    return this.image;
  }

  public getRepeat(): Repeat {
    return this.repeat;
  }

  public setRepeat(repeat: Repeat): void {
    this.repeat = repeat;
  }

  public isReady(): boolean {
    return this.ready;
  }

  public render(context: CanvasRenderingContext2D): CanvasPattern {
    return context.createPattern(this.image, this.repeat);
  }
}
