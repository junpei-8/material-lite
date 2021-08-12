import { noop } from './noop';

export const styling = {
  inject: (style: string) => {
    const head = document.head || document.getElementsByTagName('head')[0];
    head.insertAdjacentHTML('beforeend', '<style>' + style + '</style>')
  }
} as const;

export function deleteMlStyleInjector(): void {
  // @ts-ignore
  styling.inject = noop;
}
