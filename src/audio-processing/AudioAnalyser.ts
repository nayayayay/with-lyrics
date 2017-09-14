export interface AudioAnalyserOptions {
  audio: HTMLAudioElement;
  fftSize?: number;
}

export class AudioAnalyser {
  protected readonly audio: HTMLAudioElement;
  protected readonly audioContext: AudioContext;
  protected readonly stream: MediaStreamAudioSourceNode;
  protected readonly analyser: AnalyserNode;
  protected readonly data: Uint8Array;

  constructor(options: AudioAnalyserOptions) {
    this.audio = options.audio;
    this.audioContext = new AudioContext();
    this.stream = this.audioContext.createMediaElementSource(this.audio);
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = options.fftSize || 1024;
    this.data = new Uint8Array(this.analyser.frequencyBinCount);

    this.stream.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
  }

  public getAudio(): HTMLAudioElement {
    return this.audio;
  }

  public getAudioContext(): AudioContext {
    return this.audioContext;
  }

  public getStream(): MediaStreamAudioSourceNode {
    return this.stream;
  }

  public getAnalyser(): AnalyserNode {
    return this.analyser;
  }

  public getFrequencyBinCount(): number {
    return this.analyser.frequencyBinCount;
  }

  public getFrequencyData(): Uint8Array {
    this.analyser.getByteFrequencyData(this.data);

    return new Uint8Array(this.data);
  }

  public getDomainData(): Uint8Array {
    this.analyser.getByteTimeDomainData(this.data);

    return new Uint8Array(this.data);
  }
}
