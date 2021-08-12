import { Directive } from 'vue';
import { Falsy } from '@material-lite/vue3-cdk/utils';

function updateElStyle(el: Element, props: MlCardImageProps): void {
  console.log(el, props);
}

export interface MlCardImageProps {
  size?: 'xl' | 'lg' | 'md' | 'sm' | Falsy
}

export const MlCardImage = {
  beforeMount(el, binding): void {
    updateElStyle(el, binding.value)
  },
  updated(el, binding): void {
    const newValue = binding.value;
    if (newValue !== binding.oldValue) {
      updateElStyle(el, newValue);
    }
  },
} as Directive<Element, MlCardImageProps>;