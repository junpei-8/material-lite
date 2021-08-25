export function classNamePipe(classNames: string[], headClassName?: string): string {
  let name = headClassName ? headClassName + ' ' :  '';

  const length = classNames.length - 1;
  let i = 0;

  while (i < length) {
    name += classNames[i] + ' ';
    i++;
  }

  name += classNames[i];

  return name;
}