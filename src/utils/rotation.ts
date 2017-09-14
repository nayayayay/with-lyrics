export interface Rotatable {
  getX: () => number;
  getY: () => number;
  getWidth: () => number;
  getHeight: () => number;
  getRotation: () => number;
}

export interface RotateSettings {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

export function degreesToRadians(degrees: number): number {
  if (degrees === 0) return 0;

  return degrees * (Math.PI / 180);
}

export function radiansToDegrees(radians: number): number {
  if (radians === 0) return 0;

  return radians * (180 / Math.PI);
}

export function rotate(context: CanvasRenderingContext2D, layer: Rotatable): void {
  if (layer.getRotation() === 0) return;

  const x: number = layer.getX() + layer.getWidth() / 2;
  const y: number = layer.getY() + layer.getHeight() / 2;

  context.translate(x, y);
  context.rotate(degreesToRadians(layer.getRotation()));
  context.translate(-x, -y);
}

export function rotateContext(context: CanvasRenderingContext2D, settings: RotateSettings): void {
  return rotate(context, <Rotatable>{
    getX: (): number => settings.x,
    getY: (): number => settings.y,
    getWidth: (): number => settings.width,
    getHeight: (): number => settings.height,
    getRotation: (): number => settings.rotation
  });
}
