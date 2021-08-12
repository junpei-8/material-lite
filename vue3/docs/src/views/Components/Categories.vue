<template>
<div class="app-categories">
  <h1 v-mlCardImage="{test: 'abc'}">Components</h1>

  <ml-card variant="stroked" routerLink="/components/button">
    <div class="app-categories-title">Button</div>
  </ml-card>

  <ml-card variant="stroked" routerLink="/components/card">
    <div class="app-categories-title">Card</div>
  </ml-card>

  <ml-card variant="stroked" routerLink="/components/ripple">
    <div class="app-categories-title">Ripple</div>
  </ml-card>

  <ml-card variant="stroked" routerLink="/components/slide-toggle">
    <div class="app-categories-title">Slide toggle</div>
  </ml-card>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { MlCardImage } from '@material-lite/vue3/CardCommon'

export default defineComponent({
  directives: {
    'mlCardImage': MlCardImage
  },
  setup() {
    const router = useRouter();
    const gotoLink = (path: string) => {
      router.push('/components/' + path);
    };

    return { gotoLink }
  }
})
</script>