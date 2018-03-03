import 'vuetify/dist/vuetify.min.css';

import * as firebase from 'firebase';

import Vuetify from 'vuetify';
import Vue from 'vue';
import store from './store/index';
import App from './App';
import router from './router';
import newCard from './components/Decks/Card';
import myAlert from './components/Shared/MyAlert';


Vue.use(Vuetify, {
  theme: {
    primary: '#47CAF9',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
});

Vue.component('new-card', newCard);
Vue.component('my-alert', myAlert);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    const config = {
      apiKey: 'AIzaSyBS0E1SCL7fkJZcOqcNemtzm1S6hiZG7MQ',
      authDomain: 'trelloclone-242f9.firebaseapp.com',
      databaseURL: 'https://trelloclone-242f9.firebaseio.com',
      projectId: 'trelloclone-242f9',
      storageBucket: 'trelloclone-242f9.appspot.com',
      messagingSenderId: '943119875123',
    };
    firebase.initializeApp(config);
  },
});
