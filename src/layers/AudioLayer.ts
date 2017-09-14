import { Layer, LayerOptions } from './Layer';
import { checkExtension } from '../utils';

export interface AudioLayerOptions extends LayerOptions {
  filePath: string;
}

export class AudioLayer extends Layer {
  protected filePath: string;
  protected audio: HTMLAudioElement;
  protected ready: boolean;

  constructor(options: AudioLayerOptions) {
    if (checkExtension(options.filePath, ['mp3', 'aac', 'wav', 'm4a']) === false) {
      throw new Error(`Invalid file extension ${options.filePath}.`);
    }

    super(options);
    this.filePath = options.filePath;
    this.audio = new Audio();
    this.ready = false;

    this.audio.controls = true;
    this.audio.addEventListener('load', () => {
      this.ready = true;
    });
    this.audio.src = this.filePath;
  }

  public getFilePath(): string {
    return this.filePath;
  }

  public setFilePath(filePath: string): void {
    this.filePath = filePath;
  }

  public getAudio(): HTMLAudioElement {
    return this.audio;
  }

  public isReady(): boolean {
    return this.ready;
  }
}
