
<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export interface MlCardProps {
  tag?: string;
}

export default defineComponent({
  name: 'ml-card',
  props: {
    variant: {
      type: String,
      default: 'raised'
    }
  },
  setup(props) {
    const className = computed((): string => (
      'ml-card'
      + ' ml-' + props.variant + '-card'
    ))
    return { className }
  }
})
</script>

<style lang="scss">
@import './Card.scss';
</style>