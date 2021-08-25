import { classNamePipe } from './pipe';


export interface MlDirectiveProps {
  element: JSX.Element;
}

export function createDirectiveProps(elementProps?: any, classList?: string[]): [any, (string | JSX.Element)[]?] {
  let children;

  if (elementProps) {
    if (classList) {
      elementProps = {
        ...elementProps,
        className: classNamePipe(classList, elementProps.className)
      }
    }

    const childrenRef = elementProps.children;
    if (childrenRef) {
      children = Array.isArray(childrenRef)
        ? childrenRef
        : [childrenRef];
    }
  }

  return [elementProps, children];
}
