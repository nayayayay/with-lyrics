export interface LayerOptions {
  startTime?: number;
  endTime?: number;
}

export interface LayerRenderer {
  render: (context: CanvasRenderingContext2D) => void;
};

export abstract class Layer implements LayerRenderer {
  protected startTime: number;
  protected endTime: number;

  constructor(options?: LayerOptions) {
    options = options || {};

    this.startTime = options.startTime || 0;
    this.endTime = options.endTime || 0;
  }

  public getStartTime(): number {
    return this.startTime;
  }

  public setStartTime(startTime: number): void {
    this.startTime = startTime;
  }

  public getEndTime(): number {
    return this.endTime;
  }

  public setEndTime(endTime: number): void {
    this.endTime = endTime;
  }

  public render(context: CanvasRenderingContext2D): void {
  }
}
