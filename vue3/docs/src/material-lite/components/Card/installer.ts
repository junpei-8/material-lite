import { App } from 'vue';
import { default as MlCard } from './Card.vue';

export default (app: App): void => {
  app.component('ml-card', MlCard)
};
