import { App } from 'vue';
import MlCard from './Card.vue';

export default (app: App): void => {
  app.directive('mlCardImage', MlCard);
};
