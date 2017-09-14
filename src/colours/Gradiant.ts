import { Colour } from './Colour';
import { RGBColour } from './RGBColour';

export type StopColour = {
  offset: number;
  colour: RGBColour;
};

export interface GradiantOptions {
  x0?: number;
  y0?: number;
  x1?: number;
  y1?: number;
  startColour?: RGBColour;
  endColour?: RGBColour;
}

export abstract class Gradiant extends Colour {
  protected x0: number;
  protected y0: number;
  protected x1: number;
  protected y1: number;
  protected startColour: RGBColour;
  protected stopColours: StopColour[];
  protected endColour: RGBColour;

  constructor(options?: GradiantOptions) {
    options = options || {};

    super();
    this.x0 = options.x0 || 0;
    this.y0 = options.y0 || 0;
    this.x1 = options.x1 || 0;
    this.y1 = options.y1 || 0;
    this.startColour = options.startColour || new RGBColour({
      red: 0,
      green: 0,
      blue: 0
    });
    this.stopColours = [];
    this.endColour = options.endColour || new RGBColour({
      red: 255,
      green: 255,
      blue: 255
    });
  }

  public getX0(): number {
    return this.x0;
  }

  public setX0(x0: number): void {
    this.x0 = x0;
  }

  public getY0(): number {
    return this.y0;
  }

  public setY0(y0: number): void {
    this.y0 = y0;
  }

  public getX1(): number {
    return this.x1;
  }

  public setX1(x1: number): void {
    this.x1 = x1;
  }

  public getY1(): number {
    return this.y1;
  }

  public setY1(y1: number): void {
    this.y1 = y1;
  }

  public getStartColour(): RGBColour {
    return this.startColour;
  }

  public setStartColour(startColour: RGBColour): void {
    this.startColour = startColour;
  }

  public getStopColours(): StopColour[] {
    return this.stopColours;
  }

  public setStopColours(stopColours: StopColour[]): void {
    this.stopColours = [];

    for (const stopColour of stopColours) {
      this.stopColours.push(this.normaliseStopColour(stopColour));
    }
  }

  public getEndColour(): RGBColour {
    return this.endColour;
  }

  public setEndColour(endColour: RGBColour): void {
    this.endColour = endColour;
  }

  public addStopColour(stopColour: StopColour): void {
    this.stopColours.push(this.normaliseStopColour(stopColour));
  }

  public clearStopColours(): void {
    this.stopColours = [];
  }

  protected normaliseStopColour(stopColour: StopColour): StopColour {
    if (stopColour.offset < 0) {
      stopColour.offset = 0;
    } else if (stopColour.offset > 1) {
      stopColour.offset = 1;
    }

    return stopColour;
  }
}
