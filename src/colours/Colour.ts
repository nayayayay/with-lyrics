export type ColourType = string|CanvasGradient|CanvasPattern;

export interface ColourRenderer {
  render: (context: CanvasRenderingContext2D) => ColourType;
}

export abstract class Colour implements ColourRenderer {
  public render(context: CanvasRenderingContext2D): ColourType {
    return '#000000';
  }
}
