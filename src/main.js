import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidationPlugin from './includes/validation';
import { firebaseApp, getAuth, onAuthStateChanged } from './includes/firebase';
import './assets/tailwind.css';
import './assets/main.css';

let app;
const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);
    app.use(store);
    app.use(router);
    app.use(VeeValidationPlugin);
    app.mount('#app');
  }
});
