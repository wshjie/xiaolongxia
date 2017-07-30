import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import goods from './components/goods/goods';
import seller from './components/seller/seller';
import ratings from './components/ratings/ratings';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.component('app', App)

var routes = [
	{path:'/seller',component:seller},
	{path:'/goods',component:goods},
	{path:'/ratings',component:ratings}
]

var router = new VueRouter({
	routes,
	linkActiveClass: 'active'	
});

router.push('/goods');//vue2.0新增变化

var app = new Vue({router}).$mount("#all")


