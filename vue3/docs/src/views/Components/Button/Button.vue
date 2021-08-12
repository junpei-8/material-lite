<template>
  <h1>Button<code>- [mlButton]</code></h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { Overview, Reference, Example } from './Pages';

export default defineComponent({
  name: 'Button',
  setup() {
    const route = useRoute();
    console.log(route.params.id)
  },
  components: {
  }
});
</script>


<style lang="scss">
</style>
