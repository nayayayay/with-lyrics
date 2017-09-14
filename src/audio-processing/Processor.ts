import { AudioAnalyser } from './AudioAnalyser';

export interface ProcessorOptions {
  audioAnalyser: AudioAnalyser;
  onStart?: Function;
  onProcess?: Function;
  onStop?: Function;
}

export class Processor {
  protected readonly audioAnalyser: AudioAnalyser;
  protected readonly audio: HTMLAudioElement;
  protected readonly frequencyData: Uint8Array[];
  protected readonly domainData: Uint8Array[];
  protected onStart: Function;
  protected onProcess: Function;
  protected onStop: Function;
  protected animationFrame: number;
  protected started: boolean;
  protected processing: boolean;
  protected stopped: boolean;

  constructor(options: ProcessorOptions) {
    this.audioAnalyser = options.audioAnalyser;
    this.audio = this.audioAnalyser.getAudio();
    this.frequencyData = [];
    this.domainData = [];
    this.onStart = options.onStart || function() {};
    this.onProcess = options.onProcess || function() {};
    this.onStop = options.onStop || function() {};
    this.animationFrame = 0;
    this.started = false;
    this.processing = false;
    this.stopped = false;
  }

  public getAudioAnalyser(): AudioAnalyser {
    return this.audioAnalyser;
  }

  public getAudio(): HTMLAudioElement {
    return this.audio;
  }

  public getFrequencyData(): Uint8Array[] {
    return this.frequencyData;
  }

  public getDomainData(): Uint8Array[] {
    return this.domainData;
  }
  
  public setOnStart(onStart: Function): void {
    this.onStart = onStart;
  }

  public setOnProcess(onProcess: Function): void {
    this.onProcess = onProcess;
  }

  public setOnStop(onStop: Function): void {
    this.onStop = onStop;
  }

  public isStarted(): boolean {
    return this.started;
  }

  public isProcessing(): boolean {
    return this.processing;
  }

  public isStopped(): boolean {
    return this.stopped;
  }

  public start(): void {
    this.audio.currentTime = 0;

    this.audio.addEventListener('pause', () => {
      cancelAnimationFrame(this.animationFrame);
      this.processing = false;
      this.stopped = true;
      this.stop();
    });
    
    this.audio.play().then(() => {
      this.started = true;
      this.processing = true;
      this.stopped = false;
      this.onStart();
      this.process();
    });
  }

  protected process(): void {
    this.onProcess();
    this.frequencyData.push(this.audioAnalyser.getFrequencyData());
    this.domainData.push(this.audioAnalyser.getDomainData());
    
    this.animationFrame = requestAnimationFrame(() => {
      this.process();
    })
  }

  protected stop(): void {
    this.onStop();
    this.animationFrame = 0;
    this.audio.currentTime = 0;
  }
}
