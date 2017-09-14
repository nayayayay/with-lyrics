export function getExtension(filename: string): string {
  const extracts = filename.split('.');
  const extension = extracts[extracts.length - 1];

  return extracts.length > 1 ? extension.toLocaleLowerCase() : '';
}

export function checkExtension(filename: string, extensions: string[]): boolean {
  const fileExtension = getExtension(filename);

  for (const extension of extensions) {
    if (extension.toLocaleLowerCase() === fileExtension) {
      return true;
    }
  }

  return false;
}
