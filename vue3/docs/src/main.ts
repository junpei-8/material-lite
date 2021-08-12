import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import MlCard from '@material-lite/vue3/Card/installer'

createApp(App)
  .use(router)
  .use(MlCard)
  .mount('#app');