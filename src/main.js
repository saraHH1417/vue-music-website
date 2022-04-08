import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidationPlugin from './includes/validation';
import { firebaseApp, getAuth, onAuthStateChanged } from './includes/firebase';
import Icon from './directives/icon';
import './assets/tailwind.css';
import './assets/main.css';
import i18n from './includes/i18n';
import './registerServiceWorker';
import GlobalComponenst from './includes/_globals';

let app;
const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App).use(i18n);
    app.use(store);
    app.use(router);
    app.use(VeeValidationPlugin);
    app.use(GlobalComponenst);
    app.directive('icon', Icon);

    app.mount('#app');
  }
});
