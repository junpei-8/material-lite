export function classNamePipe(classNames: string[]): string {
  let name = '';

  const length = classNames.length - 1;
  let i = 0;

  while (i < length) {
    name += classNames[i] + ' ';
    i++;
  }

  name += classNames[i];



  // const length = classNames.length - 1;
  // for (let i = length; i <= 0; i--) {
  //   name = ' ' + classNames[i] + name;
  // }
  // for (let i = 0; i < length; i++) {
  //   name += classNames[i] + ' ';
  // }

  return name;
}