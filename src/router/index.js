import Vue from 'vue';
import Router from 'vue-router';
import Country from '../components/Country';
import Home from '../components/Home';
import PageNotFound from '../components/PageNotFound';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      component: Home,
      name: 'home',
      path: '/'
    },
    { 
      component: Country,
      name: 'country',
      path: '/country/:name',
      props: true
     },
     {
      component: PageNotFound,
      name: '404',
      path: '/404'
     }
  ]
})