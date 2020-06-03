import Vue from 'vue'
import Vuex from 'vuex'
import urls from './router'
import VueRouter from 'vue-router'
import App from './App'
import QGVueComponents from '../src'
/*import {modules} from '../src/store'*/
/* import QGVueComponents from '../dist/qg-vue-components.js'*/
/* import '../dist/qg-vue-components.css'*/
Vue.use(QGVueComponents)
Vue.use(VueRouter)
import attachFastClick from "fastclick";
attachFastClick.attach(document.body,{tapDelay:1});

const modules=QGVueComponents.store.modules

const router = new VueRouter({
	mode: 'history',
	routes: urls
})

let store = new Vuex.Store({
    modules:{
    	qg:modules
	}
})
require('./qg-tongji.service')
export default new Vue({
	el: 'app',
	router,
    store,
	render: h => h(App)
});
/*
创建新的store
 import Vuex from 'vuex'
 import {modules} from '../src/store'
 let store = new Vuex.Store({
 modules
 })
 */

/*
or
 import {store,modules} from '../src/store'
 */
