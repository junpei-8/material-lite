<template>
  <div class="app-categories"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const gotoLink = (path: string) => {
      router.push('/guide/' + path);
    };

    return { gotoLink }
  }
})
</script>
