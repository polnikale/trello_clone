import 'vuetify/dist/vuetify.min.css';
import Vuetify from 'vuetify';
import Vue from 'vue';
import store from './store/index';
import App from './App';
import router from './router';
import newCard from './components/Decks/Card';


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

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
