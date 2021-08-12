<template>
<div class="app-categories">
  <h1>CDK</h1>

  <ml-card @click="gotoLink('portal')">
    Portal
  </ml-card>

  <ml-card @click="gotoLink('straight-tracker')">
    Straight Tracker
  </ml-card>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const gotoLink = (path: string) => {
      router.push('/cdk/' + path);
    };

    return { gotoLink }
  }
})
</script>