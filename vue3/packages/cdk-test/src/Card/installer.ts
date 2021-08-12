import { App } from 'vue';
import MlCard from './index';

export default (app: App): void => {
  app.component('ml-card', MlCard);
};
