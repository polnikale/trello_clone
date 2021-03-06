import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Profile from '@/components/User/Profile';
import Signin from '@/components/User/Signin';
import Signup from '@/components/User/Signup';
import Decks from '@/components/Decks/Decks';
import Deck from '@/components/Decks/Deck';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/decks',
      name: 'Decks',
      component: Decks,
    },
    {
      path: '/deck/:id',
      name: 'Deck',
      component: Deck,
      props: true,
    },
  ],
});
