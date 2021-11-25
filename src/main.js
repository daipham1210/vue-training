import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import installElementPlus from './plugins/element'
import mitt from 'mitt'

const app = createApp(App)
installElementPlus(app)
const emitter = mitt();
app.config.globalProperties.emitter = emitter;
app.use(store)
app.use(router)
app.mount('#app')