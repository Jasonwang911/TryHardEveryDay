import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

function render() {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')  // 这里还是挂载到自己的html中，基座会拿到这个挂载后的html
}

export async function bootstrap(props) {

}

export async function  mount(props) {

}

export async function unmount(props) {

}