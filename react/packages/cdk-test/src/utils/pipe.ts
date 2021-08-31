export function classNamePipe(classNames: (string | null)[], baseClassName?: string): string {
  let entryClassName = '';
  
  const length = classNames.length;
  for (let i = 0; i < length; i++) {
    const name = classNames[i];
    if (name) {
      entryClassName += (' ' + name);
    }
  }

  entryClassName = baseClassName
    ? baseClassName + entryClassName
    : entryClassName.slice(1);

  return entryClassName;
}