import {
  ReactElement,
  ReactHTML,
  ReactNode,
  ReactSVG,
  Attributes,
  ClassAttributes,
  HTMLAttributes,
  SVGAttributes,
  DOMAttributes,
  InputHTMLAttributes,
  FunctionComponent,
  ClassType,
  ClassicComponent,
  ComponentClass,
  ComponentState,
  ClassicComponentClass,
  Component
} from 'react';
import { Falsy, FalsyObject } from './index';


type AddPrefix<K extends string, CK extends string = Capitalize<K>> = `ml${CK}`

type removePrefix<K extends string> =
  K extends AddPrefix<K, infer CK> ? CK : '';

// type AddPrefixToObject<T extends { [key: string]: any }> = { // @ts-ignore
//   [K in AddPrefix<keyof T>]: T[Uncapitalize<removePrefix<K>>]
// }

export type AddPrefixToObject<T extends { [key: string]: any }> = { // @ts-ignore
  [K in AddPrefix<keyof T>]?: T[Uncapitalize<removePrefix<K>>] | Falsy;
}

export type DirectiveDOMElementProps =
  ({
    type: 'input';
    children?: ReactNode;
  }  & InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement>)|
  ({
    type: keyof ReactHTML;
    children?: ReactNode;
  } & HTMLAttributes<HTMLElement> & ClassAttributes<HTMLElement>) |
  ({
    type: keyof ReactSVG;
    children?: ReactNode;
  } & SVGAttributes<SVGElement> & ClassAttributes<SVGElement>) |
  ({
    type: string;
    children?: ReactNode;
  } & DOMAttributes<HTMLElement> & ClassAttributes<Element>);


export type DirectiveCustomComponentProps =
  ({
    type: FunctionComponent<{}>,
    children?: ReactNode;
  } & Attributes) |
  ({
    type: ClassType<{}, ClassicComponent<{}, ComponentState>, ClassicComponentClass>
    children?: ReactNode;
  } & ClassAttributes<ClassicComponent<{}, ComponentState>>) |
  ({
    type: ClassType<{}, Component<{}, ComponentState>, ComponentClass>,
    children?: ReactNode;
  } & ClassAttributes<Component<{}, ComponentState>>) |
  ({
    type: FunctionComponent | ComponentClass | string,
    children?: ReactNode;
  } & Attributes);

export type MlDirectiveProps<P = {}> =
  ({
    type: string;
    children: ReactElement<any, any>;
    name?: 'string' 
  }) |
  ({
    type?: undefined;
    children: ReactElement<any, any>;
  } & FalsyObject<P>)
