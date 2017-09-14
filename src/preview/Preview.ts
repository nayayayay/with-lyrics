import { Layer } from '../layers';

export interface PreviewOptions {
  audio: HTMLAudioElement;
  canvas: HTMLCanvasElement;
  layers?: Layer[];
}

export class Preview {
  protected readonly audio: HTMLAudioElement;
  protected readonly canvas: HTMLCanvasElement;
  protected readonly context: CanvasRenderingContext2D;
  protected layers: Layer[];
  protected animationFrame: number;
  protected playing: boolean;

  constructor(options: PreviewOptions) {
    const context: CanvasRenderingContext2D|null = options.canvas.getContext('2d');

    if (context === null) {
      throw new Error(`Could not load the canvas' 2D rendering context.`);
    }

    this.audio = options.audio;
    this.canvas = options.canvas;
    this.context = context;
    this.layers = options.layers || [];
    this.animationFrame = 0;
    this.playing = false;

    this.audio.addEventListener('playing', () => {
      this.play();
    });

    this.audio.addEventListener('pause', () => {
      this.stop();
    });
  }

  public getAudio(): HTMLAudioElement {
    return this.audio;
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  public getContext(): CanvasRenderingContext2D {
    return this.context;
  }

  public getLayers(): Layer[] {
    return this.layers;
  }

  public setLayers(layers: Layer[]): void {
    this.layers = layers;
  }

  public getAnimationFrame(): number {
    return this.animationFrame;
  }

  public isPlaying(): boolean {
    return this.playing;
  }

  public getCurrentTime(): number {
    return this.audio.currentTime;
  }

  public getDuration(): number {
    return this.audio.duration;
  }

  public addLayer(layer: Layer): void {
    this.layers.push(layer);
  }

  public draw(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const layer of this.layers) {
      if (layer.getStartTime() > this.audio.currentTime && layer.getEndTime() < this.audio.currentTime) {
        layer.render(this.context);
      }
    }
  }
  
  public play(): void {
    this.playing = true;
    this.render();
  }
  
  public stop(): void {
    cancelAnimationFrame(this.animationFrame);
    this.playing = false;
    this.animationFrame = 0;
  }

  protected render(): void {
    this.animationFrame = requestAnimationFrame(() => {
      this.render();
    });

    this.draw();
  }
}
